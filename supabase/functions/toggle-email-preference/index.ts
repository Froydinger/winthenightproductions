import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!

  // Verify the user is authenticated
  const authHeader = req.headers.get('Authorization')
  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  // Create anon client to verify the JWT
  const anonClient = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: authHeader } },
  })
  const { data: { user }, error: authError } = await anonClient.auth.getUser()
  if (authError || !user?.email) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  let body: { subscribed: boolean }
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const email = user.email.toLowerCase()
  const serviceClient = createClient(supabaseUrl, supabaseServiceKey)

  if (body.subscribed) {
    // Re-subscribe: upsert into newsletter_subscribers as active
    const { error: upsertError } = await serviceClient
      .from('newsletter_subscribers')
      .upsert(
        { email, active: true, unsubscribed_at: null },
        { onConflict: 'email' }
      )
    if (upsertError) {
      console.error('Failed to subscribe', upsertError)
      return new Response(JSON.stringify({ error: 'Failed to update preference' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Remove from suppressed list if present
    await serviceClient
      .from('suppressed_emails')
      .delete()
      .eq('email', email)

  } else {
    // Unsubscribe: mark inactive
    const { error: updateError } = await serviceClient
      .from('newsletter_subscribers')
      .update({ active: false, unsubscribed_at: new Date().toISOString() })
      .eq('email', email)
    if (updateError) {
      console.error('Failed to unsubscribe', updateError)
      return new Response(JSON.stringify({ error: 'Failed to update preference' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Add to suppressed list
    await serviceClient
      .from('suppressed_emails')
      .upsert(
        { email, reason: 'user_preference' },
        { onConflict: 'email' }
      )
  }

  return new Response(JSON.stringify({ success: true, subscribed: body.subscribed }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})
