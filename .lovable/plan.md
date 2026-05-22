# Simplify subscription/account info to single Pro shout-out tier

## What changes

Collapse support offerings down to:
- **One-time donation** — any amount (kept as-is)
- **Pro Supporter — $10/mo** — perk is a shout-out on the podcast + name on the Pro Supporters wall on the site. No ArcAi, no Arcana, no other product access.

Remove the $3/mo "Supporter" tier and all references to ArcAi™ Pro / Arcana™ Notes Pro as paid perks.

## File-by-file

### `src/components/SupportModal.tsx`
- Delete the `supporter` tier object ($3/mo).
- Rewrite the `pro` tier:
  - `label`: "Pro Supporter"
  - `price`: "$10/mo"
  - `description`: "Monthly shout-out on the podcast + your name on the Pro Supporters wall. That's it — pure support, full credit."
  - Keep existing `priceId: price_1TB5D3AB32948AKDJTYd74X4` and subscription mode.
- Keep one-time donation block unchanged.

### `src/pages/Support.tsx`
- Update hero/CTA subtitle: "Donate once or subscribe from $3/mo" → "Donate once or become a $10/mo Pro Supporter".
- Pro Supporters Wall copy stays; tighten subtitle to mention the shout-out perk.

### `supabase/functions/list-pro-supporters/index.ts`
- Remove the two legacy `PRO_PRODUCT_IDS` entries (`prod_UAtIOiu4df3Rso` ArcAi Pro current, `prod_U4U5QGmibWU8wD` ArcAi Pro legacy) so only WTN Pro Supporter price (`price_1TB5D3AB32948AKDJTYd74X4`) qualifies.
- Drop the `source: "arcai" | "arcai_legacy"` branching; everyone is now `source: "wtn_pro"`.
- Keep dedupe-by-name behavior.

### `src/pages/Terms.tsx`
- "Pro Supporter Subscription" section: remove the line about creating accounts on Arcana Notes and ArcAi. Replace with: the subscription provides a recurring shout-out on the podcast and a public listing on the Pro Supporters wall.
- Billing/cancellation paragraphs stay (still a $10/mo Stripe subscription).
- Search-and-replace any remaining "ArcAi" / "Arcana Notes" mentions tied to the paid plan.

### `src/pages/Privacy.tsx`
- Remove sentences about sharing data with Arcana Notes / ArcAi for account creation.
- Keep Stripe payment-data language; we still only share what Stripe needs.

## Not touched
- Stripe products/prices themselves — the existing $10 price keeps working; no Stripe API calls needed.
- One-time donations flow, `create-checkout` edge function, Dashboard page (no billing UI there today), AuthDialog.
- Header/Lander/About copy (no paid-tier mentions found there).

## Risks
- Anyone currently on the legacy $3 Supporter subscription stays billed in Stripe; this PR only hides the option from new signups. Call out to user that legacy subs should be cancelled in Stripe Dashboard if desired.
- Existing ArcAi Pro subscribers will stop appearing on the Pro Supporters wall once `list-pro-supporters` filters them out — intentional per the new positioning.
