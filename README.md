# UseWhich
Which AI tool to use for which job. Next.js 15 directory of AI tools & agent use cases.
- Edit tools in `lib/data.ts`; paid featured slugs go in `featuredSlugs`.
- Forms (`/api/subscribe`, `/api/submit`) forward to `FORM_WEBHOOK_URL` if set, else log to Vercel function logs.
- Checkout buttons on `/sponsor` are placeholders until Stripe is connected.
