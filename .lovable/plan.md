

## Newsletter / Broadcast Email System for Win The Night

### Summary

Build an email subscriber system using Lovable's built-in email infrastructure. Visitors subscribe by entering their email. Admins can compose and send branded update emails to all subscribers from the admin dashboard. A "Sent Emails" history tab lets admins preview, edit, and resend past broadcasts.

### What Gets Built

1. **Database: `newsletter_subscribers` table** — stores email, optional name, active status, subscribed_at. RLS: anyone can insert (subscribe), admins can read all, users can read/update their own row.

2. **Database: `broadcast_emails` table** — stores sent broadcasts (subject, body HTML, sent_at, sent_by, recipient_count). RLS: admin-only read/write. This powers the "Sent Emails" history.

3. **Email infrastructure setup** — set up the email infra and scaffold transactional email templates on the verified `notify.maestrobuilder.app` domain.

4. **Two email templates:**
   - `welcome-subscriber` — branded WTN confirmation email sent on subscribe ("Thanks for subscribing to Win The Night updates!")
   - `broadcast-update` — branded template for admin broadcasts, accepts dynamic subject/body content via templateData

5. **Subscribe form component** — simple email input + button, placed in the CTA section or footer. Inserts into `newsletter_subscribers` and triggers the welcome email via `send-transactional-email`.

6. **Admin: Broadcast Composer tab** — new tab on `/admin` with:
   - Subject line input
   - Rich text / markdown body composer
   - "Send to All Subscribers" button
   - Loops through active subscribers, calling `send-transactional-email` for each with unique idempotency keys
   - Saves the broadcast to `broadcast_emails` table after sending

7. **Admin: Sent Emails tab** — new tab on `/admin` showing:
   - List of all past broadcasts from `broadcast_emails` table
   - Each entry shows subject, date sent, recipient count
   - Click to expand/preview the full email content
   - "Edit & Resend" button that pre-fills the composer with the old subject/body so the admin can modify and re-send

8. **Unsubscribe page** — required compliance page at `/unsubscribe` (or whichever path the scaffold tool assigns). Branded to match the site.

### Technical Details

- Email domain `notify.maestrobuilder.app` is already verified and ready
- Will call `setup_email_infra` then `scaffold_transactional_email` to create the sending pipeline
- Welcome email is a true transactional email (1:1, triggered by the subscriber's action)
- Broadcast sends loop on the client/admin side, calling `send-transactional-email` once per subscriber with unique idempotency keys — each send is individually queued and retried
- `broadcast_emails` table stores a snapshot of each broadcast for the admin history/resend feature
- All email templates use WTN branding: dark neon-blue theme accents on white (#fff) email body background

### Files Created/Modified

- **Migration**: `newsletter_subscribers` table, `broadcast_emails` table + RLS
- **New templates**: `supabase/functions/_shared/transactional-email-templates/welcome-subscriber.tsx`, `broadcast-update.tsx`, updated `registry.ts`
- **New component**: `src/components/NewsletterSubscribe.tsx`
- **New page**: `src/pages/Unsubscribe.tsx` (or assigned path)
- **Modified**: `src/pages/Admin.tsx` (add Broadcast Composer + Sent Emails tabs)
- **Modified**: `src/pages/Index.tsx` or `src/components/Footer.tsx` (add subscribe form)
- **Modified**: `src/App.tsx` (add unsubscribe route)

