# Afridyn Admin — Build Plan

An installable, offline-first admin PWA at **afridyn.world/admin** for Afridyn Engineering Limited. It produces all of the company's commercial documents and is the backend for the online shop. Only authorised users can sign in.

It is modelled on **Milo Motors** (`simonrockp-byte/milo-motors`), which already runs this exact pattern in production. Those parts are ported, not reinvented. Milo in turn proved patterns from `miamor-investments-liimited-` and `supermarket-pos`.

## Decisions (confirmed 2026-11-27)

| Topic | Decision |
|---|---|
| Tax | **Turnover tax: no VAT line** on documents, same as Milo. A `taxMode: TOT \| VAT16` setting stays available in case Afridyn registers for VAT later. |
| Documents | Quotation, **Proforma invoice**, Invoice, Receipt, **Delivery note**, **Credit note**, **Client statement** |
| Store | Products, prices, stock flag and photos are managed in admin. The shop gets a real cart; "Place order" creates an **order request** in admin, which staff turn into a quotation or proforma in one tap. No online card payment. |
| Offline | **Offline-first like Milo**: Dexie outbox, sync engine, Serwist service worker, offline PIN unlock. |
| Access | `/admin` behind login: email + password online, PIN to unlock offline. Starts with one **owner** account; staff accounts later (the schema supports them now). |
| Contact | +260 977 244 549 everywhere (`lib/site.ts`). |

## What replaces what

The current `/admin` is a **demo UI with made-up data** (no login, no database). It is replaced entirely. The public site (`/`, `/shop`) keeps its design, and `/shop` switches from hard-coded products to the database.

## Stack additions (to this Next.js 16 app)

| Concern | Choice (as in Milo) |
|---|---|
| DB | Neon Postgres + Drizzle ORM, postgres.js driver (interactive transactions for sync) |
| Local DB | Dexie (IndexedDB), mirroring the server tables |
| Service worker | Serwist. **Marketing chunks (three.js, 3D hero) are excluded from the precache**, so installing the admin stays light. |
| PDF | `@react-pdf/renderer`, generated on the device (works offline, small crisp files for WhatsApp) |
| Files | Vercel Blob: product photos, logo, signed delivery-note photos |
| Auth | HMAC session cookie, `proxy.ts` allowlist guard on `/admin/*` and admin APIs, bcrypt password + PIN hashes |
| Fonts | Self-hosted with `next/font/local`. This removes the build-time Google Fonts fetch that intermittently failed Vercel builds (2026-11-27). |
| Validation / tests | zod, Vitest, Playwright (including an offline test) |

## Data model (Postgres, mirrored in Dexie)

Every row has a client-generated UUID `id`, plus `version`, `updatedAt` and `deletedAt` (tombstone). Money is stored as **integer ngwee** and shown as `K 1,250.00`.

- `users`: name, email, role `owner | staff`, password hash, PIN hash, active
- `devices`: user, device code (A, B, C…), last seen
- `clients`: company or individual, contact person, phone/WhatsApp (+260), email, **TPIN**, address, notes
- `sites`: client, site name (e.g. a mine or plant), location. Delivery notes and documents can target a site.
- `products` (shop catalogue): SKU, name, brand, category, description, unit, price, `inStock`, photos, `published`, sort order
- `documents`: type `quotation | proforma | invoice | receipt | delivery_note | credit_note`, number, status (`draft | sent | accepted | partially_paid | paid | delivered | void`), client, site, issue date, valid-until/due date, client PO number, items (jsonb: product ref or free text, description, qty, unit, unit price), discount, totals, notes, terms, `sourceDocumentId`/`convertedToId`, `shareToken`, createdBy, device
- `payments` (append-only): document, amount, method (Cash, Bank transfer, Airtel Money, MTN MoMo, Zamtel Kwacha, Cheque), **paid by**, reference, paid at, received by
- `order_requests` (from the shop): contact details, company, cart lines (product, qty, price at time of order), message, status `new | seen | quoted | closed`, linked document
- Also: `push_subscriptions`, `settings` (a single row: business profile, logo, TPIN, PACRA, ZPPA, bank and MoMo details, default terms per document type, `taxMode`), `sync_ops`, `sync_conflicts`, `audit_log`

**Statements** are generated, not stored: invoices, credit notes and payments for a client over a date range, with opening balance, running balance and amount due.

**Numbering (offline-safe):** `QT | PF | INV | RC | DN | CN - YYYY - {device} - {seq}`, for example `INV-2026-A-0042`. Each device has its own counter and the server enforces uniqueness.

**Document flow:**
```
order request ─┐
               ├─► Quotation ─► Proforma ─► Invoice ─► Receipt (payments)
client call ───┘                              │
                                              ├─► Delivery note (qty delivered, received-by name + signature photo)
                                              └─► Credit note (reduces balance; never edits the invoice)
```
Once a document is sent or paid, its items are **locked**. Changes go through payments, credit notes, or void and reissue. This also keeps offline sync conflict-free.

## Admin PWA screens

1. **Dashboard:** new shop order requests, open quotes, unpaid invoice balances, this month's turnover, recent receipts.
2. **Documents:** list with type and status filters; editor with a client/site picker, product search (fills price), free lines, discount and terms; view with PDF preview, **Share to WhatsApp** (the actual PDF file), download, copy share link `/d/[token]`, convert forward, record payment, void.
3. **PDF templates:** a copper/blueprint-styled letterhead with logo, PACRA/TPIN/ZPPA, bank/MoMo details, terms and a signature/stamp block. The delivery note has received-by, signature and date fields.
4. **Clients and sites:** search, detail page with documents, payments and balance, and a **Generate statement** action.
5. **Products:** catalogue management with photo upload; changes appear on `/shop`.
6. **Order requests:** in-app popup plus Web Push on new shop orders, and one tap to turn a request into a client plus a draft quotation.
7. **Reports (owner):** monthly turnover (for the ZRA turnover-tax return), outstanding balances, top products and services.
8. **Settings (owner):** business profile, payment details, default terms, tax mode, users and PINs, devices.

## Shop changes

- Products load from the database (published only). Photos come from Blob uploads, which replaces the hotlinked BigCommerce images.
- A real cart (kept in localStorage) with a checkout form (name, company, phone, email, delivery site, message). It posts to `/api/order-requests` (honeypot + rate limit) and shows a confirmation and a WhatsApp follow-up link.
- Prices show "from" or "on request" when no price is set.

## Phases

**Phase 0: Foundations**
- Neon DB via the Vercel Marketplace (needs the owner; see "You need to do" below).
- Drizzle schema + migrations; self-hosted fonts; auth (login, session, proxy guard, owner seed); `.env.example`; CI (typecheck, lint, test, build).

**Phase 1: Documents**
- Port Milo's documents, numbering, money, PDF, share and payment code; add the four new types and statements.
- Clients and sites.

**Phase 2: Offline**
- Port the Dexie local DB, outbox and sync push/pull, the Serwist service worker, PIN unlock, the sync status pill and the conflict review screen.

**Phase 3: Store backend**
- Products admin with Blob uploads; `/shop` on the DB; cart, checkout and order requests; push notifications.

**Phase 4: Reports, settings, polish**
- Reports and settings, then an end-to-end test including offline, and deploy.

## You need to do

1. **Create the database.** In Vercel → project **afridyn** → Storage → Create → **Neon (Postgres)**, connected to Production and Preview. This sets `DATABASE_URL` automatically.
2. **Create a Blob store** in the same Storage tab (it sets `BLOB_READ_WRITE_TOKEN`).
3. **Choose the owner login email.** The password is set by you on first run, never sent to anyone.
4. **Supply** bank and mobile-money payment details and the default terms for quotes and invoices, to print on documents.
