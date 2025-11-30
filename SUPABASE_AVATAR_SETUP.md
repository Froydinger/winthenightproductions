# Supabase Avatar Storage Setup

The avatar upload feature requires a storage bucket in Supabase. If you're seeing "Bucket not found" errors, follow these steps:

## Option 1: Redeploy in Lovable (Recommended)

1. Go to your Lovable dashboard
2. Click "Deploy" or "Push to Supabase"
3. This should automatically apply the migration in `supabase/migrations/20251130230000_setup_avatar_storage.sql`

## Option 2: Manual Setup in Supabase Dashboard

If redeploying doesn't work, manually create the bucket:

### Step 1: Create the Bucket

1. Go to your Supabase project dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **"New bucket"**
4. Configure the bucket:
   - **Name**: `avatars`
   - **Public bucket**: ✅ Yes (check this box)
   - **File size limit**: 5242880 (5MB)
   - **Allowed MIME types**: `image/jpeg,image/jpg,image/png,image/webp,image/gif`
5. Click **"Create bucket"**

### Step 2: Set Storage Policies

1. In the Storage section, click on the `avatars` bucket
2. Go to the **"Policies"** tab
3. Click **"New policy"**

Add these 4 policies:

#### Policy 1: Public Read Access
```sql
CREATE POLICY "Avatar images are publicly accessible"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'avatars');
```

#### Policy 2: Authenticated Upload
```sql
CREATE POLICY "Users can upload their own avatar"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```

#### Policy 3: Authenticated Update
```sql
CREATE POLICY "Users can update their own avatar"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```

#### Policy 4: Authenticated Delete
```sql
CREATE POLICY "Users can delete their own avatar"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```

### Step 3: Test

1. Go back to your Updates page
2. Click the Settings icon (top right)
3. Try uploading an avatar
4. It should work now! ✅

## Troubleshooting

**Still getting errors?**
- Make sure you're signed in to the Updates page
- Check that the bucket name is exactly `avatars` (lowercase, no spaces)
- Verify the policies are active (green checkmark in Supabase)
- Clear your browser cache and try again

**Need help?**
The complete migration SQL is in: `supabase/migrations/20251130230000_setup_avatar_storage.sql`
