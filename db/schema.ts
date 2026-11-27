import {
  pgTable,
  pgEnum,
  uuid,
  text,
  integer,
  boolean,
  date,
  timestamp,
  jsonb,
  real,
  index,
  primaryKey,
  type AnyPgColumn,
} from 'drizzle-orm/pg-core'

// ---------------------------------------------------------------------------
// Afridyn admin schema. Ported from Milo Motors (simonrockp-byte/milo-motors)
// and adapted: sites + products + shop order requests instead of vehicles and
// job cards, and seven document types. See docs/ADMIN_BUILD_PLAN.md.
//
// Conventions:
// - Ids are UUIDs generated on the device that created the row, so records
//   made offline keep the same id once synced. defaultRandom() only covers
//   rows created server-side (e.g. shop order requests).
// - Money is integer ngwee (K 1.00 = 100). Never store kwacha floats.
// - Synced tables carry version/updatedAt/deletedAt: pull returns rows with
//   updatedAt > cursor, deletes are tombstones, version guards last-write-wins.
// ---------------------------------------------------------------------------

export const userRoleEnum = pgEnum('user_role', ['owner', 'staff'])
export const clientTypeEnum = pgEnum('client_type', ['individual', 'company'])
export const documentTypeEnum = pgEnum('document_type', [
  'quotation',
  'proforma',
  'invoice',
  'receipt',
  'delivery_note',
  'credit_note',
])
export const documentStatusEnum = pgEnum('document_status', [
  'draft',
  'sent',
  'accepted',
  'partially_paid',
  'paid',
  'delivered',
  'void',
])
export const orderRequestStatusEnum = pgEnum('order_request_status', ['new', 'seen', 'quoted', 'closed'])
export const paymentMethodEnum = pgEnum('payment_method', [
  'cash',
  'bank_transfer',
  'airtel_money',
  'mtn_momo',
  'zamtel_kwacha',
  'cheque',
  'card',
])
// TOT: turnover tax, no tax line on documents (Afridyn today).
// VAT16: 16% VAT line, for if the company registers for VAT later.
export const taxModeEnum = pgEnum('tax_mode', ['TOT', 'VAT16'])
// Number series: QT-2026-A-0001, PF-…, INV-…, RC-…, DN-…, CN-…
export const numberSeriesEnum = pgEnum('number_series', ['QT', 'PF', 'INV', 'RC', 'DN', 'CN'])

const timestamps = {
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}

const syncColumns = {
  ...timestamps,
  version: integer('version').notNull().default(1),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}

// ---------------------------------------------------------------------------
// People & devices
// ---------------------------------------------------------------------------

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').unique(),
  phone: text('phone').unique(),
  role: userRoleEnum('role').notNull().default('staff'),
  passwordHash: text('password_hash').notNull(),
  // bcrypt hash of a short PIN, cached on the device for offline unlock.
  pinHash: text('pin_hash'),
  active: boolean('active').notNull().default(true),
  ...syncColumns,
})

// Each install of the PWA registers as a device with a short code (A, B, …)
// used in its document numbers, so devices can number offline without colliding.
export const devices = pgTable('devices', {
  id: uuid('id').primaryKey(),
  userId: uuid('user_id').references(() => users.id),
  code: text('code').notNull().unique(),
  label: text('label'),
  lastSeenAt: timestamp('last_seen_at', { withTimezone: true }),
  ...timestamps,
})

export const deviceCounters = pgTable(
  'device_counters',
  {
    deviceId: uuid('device_id')
      .notNull()
      .references(() => devices.id),
    series: numberSeriesEnum('series').notNull(),
    year: integer('year').notNull(),
    seq: integer('seq').notNull().default(0),
  },
  (t) => [primaryKey({ columns: [t.deviceId, t.series, t.year] })],
)

// ---------------------------------------------------------------------------
// Clients & sites
// ---------------------------------------------------------------------------

export const clients = pgTable(
  'clients',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(), // company or person
    type: clientTypeEnum('type').notNull().default('company'),
    contactPerson: text('contact_person'),
    phone: text('phone'), // E.164, e.g. +260977244549
    whatsapp: text('whatsapp'),
    email: text('email'),
    tpin: text('tpin'),
    address: text('address'),
    notes: text('notes'),
    ...syncColumns,
  },
  (t) => [index('clients_name_idx').on(t.name), index('clients_updated_idx').on(t.updatedAt)],
)

// A client's operating location (mine, plant, office) that documents and
// deliveries can be addressed to.
export const sites = pgTable(
  'sites',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    clientId: uuid('client_id')
      .notNull()
      .references(() => clients.id),
    name: text('name').notNull(),
    location: text('location'),
    contactPerson: text('contact_person'),
    phone: text('phone'),
    notes: text('notes'),
    ...syncColumns,
  },
  (t) => [index('sites_client_idx').on(t.clientId), index('sites_updated_idx').on(t.updatedAt)],
)

// ---------------------------------------------------------------------------
// Shop catalogue
// ---------------------------------------------------------------------------

export const products = pgTable(
  'products',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    sku: text('sku').unique(),
    name: text('name').notNull(),
    brand: text('brand'),
    category: text('category'),
    description: text('description'),
    unit: text('unit').notNull().default('each'), // each, box, litre, metre…
    price: integer('price'), // ngwee; null = "price on request"
    inStock: boolean('in_stock').notNull().default(true),
    photos: jsonb('photos').$type<string[]>().notNull().default([]), // Blob URLs
    published: boolean('published').notNull().default(false),
    sortOrder: integer('sort_order').notNull().default(0),
    ...syncColumns,
  },
  (t) => [
    index('products_category_idx').on(t.category),
    index('products_published_idx').on(t.published),
    index('products_updated_idx').on(t.updatedAt),
  ],
)

// ---------------------------------------------------------------------------
// Documents
// ---------------------------------------------------------------------------

export type LineItem = {
  id: string
  productId?: string
  sku?: string
  description: string
  unit?: string
  qty: number // may be fractional (2.5 m, 1.5 h)
  unitPrice: number // ngwee
  /** Delivery notes: quantity actually delivered (defaults to qty). */
  deliveredQty?: number
}

// Copied onto the document when issued, so a PDF regenerated later still shows
// what the client was actually given even if the client record changes.
export type ClientSnapshot = {
  name: string
  contactPerson?: string
  phone?: string
  email?: string
  address?: string
  tpin?: string
}

export type SiteSnapshot = { name: string; location?: string; contactPerson?: string; phone?: string }

export const documents = pgTable(
  'documents',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    type: documentTypeEnum('type').notNull(),
    number: text('number').notNull().unique(),
    status: documentStatusEnum('status').notNull().default('draft'),

    clientId: uuid('client_id')
      .notNull()
      .references(() => clients.id),
    siteId: uuid('site_id').references(() => sites.id),
    clientSnapshot: jsonb('client_snapshot').$type<ClientSnapshot>().notNull(),
    siteSnapshot: jsonb('site_snapshot').$type<SiteSnapshot>(),
    clientPoNumber: text('client_po_number'),

    issueDate: date('issue_date').notNull(),
    validUntil: date('valid_until'), // quotations, proformas
    dueDate: date('due_date'), // invoices

    items: jsonb('items').$type<LineItem[]>().notNull().default([]),
    discount: integer('discount').notNull().default(0), // ngwee
    subtotal: integer('subtotal').notNull().default(0), // ngwee
    taxMode: taxModeEnum('tax_mode').notNull().default('TOT'),
    taxAmount: integer('tax_amount').notNull().default(0), // ngwee, 0 under TOT
    total: integer('total').notNull().default(0), // ngwee

    notes: text('notes'),
    terms: text('terms'),

    // Convert-forward chain: quotation → proforma → invoice → receipt, and
    // invoice → delivery note / credit note.
    sourceDocumentId: uuid('source_document_id').references((): AnyPgColumn => documents.id),
    convertedToId: uuid('converted_to_id').references((): AnyPgColumn => documents.id),
    // Receipts: the payment this receipt confirms. Revenue is counted from payments.
    paymentId: uuid('payment_id'),
    // Credit notes: why the credit was issued.
    creditReason: text('credit_reason'),
    // Delivery notes: who signed for the goods, and a photo of the signed copy.
    receivedByName: text('received_by_name'),
    receivedAt: timestamp('received_at', { withTimezone: true }),
    signaturePhotoUrl: text('signature_photo_url'),

    // Public /d/[token] view (and accept, for quotations) link.
    shareToken: text('share_token').unique(),
    sentAt: timestamp('sent_at', { withTimezone: true }),
    acceptedAt: timestamp('accepted_at', { withTimezone: true }),
    voidedAt: timestamp('voided_at', { withTimezone: true }),
    voidReason: text('void_reason'),

    createdBy: uuid('created_by').references(() => users.id),
    deviceId: uuid('device_id').references(() => devices.id),
    ...syncColumns,
  },
  (t) => [
    index('documents_client_idx').on(t.clientId),
    index('documents_type_status_idx').on(t.type, t.status),
    index('documents_issue_date_idx').on(t.issueDate),
    index('documents_updated_idx').on(t.updatedAt),
  ],
)

// Append-only. A mistaken payment is tombstoned (deletedAt), never edited.
export const payments = pgTable(
  'payments',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    documentId: uuid('document_id')
      .notNull()
      .references(() => documents.id),
    amount: integer('amount').notNull(), // ngwee
    method: paymentMethodEnum('method').notNull(),
    paidBy: text('paid_by'),
    reference: text('reference'),
    paidAt: date('paid_at').notNull(),
    receivedBy: uuid('received_by').references(() => users.id),
    deviceId: uuid('device_id').references(() => devices.id),
    ...syncColumns,
  },
  (t) => [index('payments_document_idx').on(t.documentId), index('payments_updated_idx').on(t.updatedAt)],
)

// ---------------------------------------------------------------------------
// Shop order requests
// ---------------------------------------------------------------------------

export type OrderLine = { productId: string; name: string; sku?: string; qty: number; unitPrice: number | null }

export const orderRequests = pgTable(
  'order_requests',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    company: text('company'),
    phone: text('phone').notNull(),
    email: text('email'),
    deliverySite: text('delivery_site'),
    message: text('message'),
    lines: jsonb('lines').$type<OrderLine[]>().notNull().default([]),
    status: orderRequestStatusEnum('status').notNull().default('new'),
    clientId: uuid('client_id').references(() => clients.id),
    documentId: uuid('document_id').references(() => documents.id),
    source: text('source').notNull().default('shop'),
    ...syncColumns,
  },
  (t) => [index('order_requests_status_idx').on(t.status), index('order_requests_updated_idx').on(t.updatedAt)],
)

export const pushSubscriptions = pgTable('push_subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id),
  deviceId: uuid('device_id').references(() => devices.id),
  endpoint: text('endpoint').notNull().unique(),
  p256dh: text('p256dh').notNull(),
  auth: text('auth').notNull(),
  ...timestamps,
})

// ---------------------------------------------------------------------------
// Business profile (single row, id = 1)
// ---------------------------------------------------------------------------

export const settings = pgTable('settings', {
  id: integer('id').primaryKey().default(1),
  businessName: text('business_name').notNull().default('Afridyn Engineering Limited'),
  tagline: text('tagline'),
  phone: text('phone').default('+260 977 244 549'),
  whatsapp: text('whatsapp').default('+260977244549'),
  email: text('email'),
  address: text('address').default('31 Salama Park, Lusaka, Zambia'),
  tpin: text('tpin').default('2004257975'),
  pacraNumber: text('pacra_number').default('120261040695'),
  zppaNumber: text('zppa_number').default('137269'),
  logoUrl: text('logo_url'),
  bankDetails: text('bank_details'),
  mobileMoneyDetails: text('mobile_money_details'),
  quoteTerms: text('quote_terms'),
  invoiceTerms: text('invoice_terms'),
  deliveryTerms: text('delivery_terms'),
  receiptFooter: text('receipt_footer'),
  quoteValidityDays: integer('quote_validity_days').notNull().default(30),
  invoiceDueDays: integer('invoice_due_days').notNull().default(30),
  taxMode: taxModeEnum('tax_mode').notNull().default('TOT'),
  vatRate: real('vat_rate').notNull().default(0.16),
  ...syncColumns,
})

// ---------------------------------------------------------------------------
// Sync bookkeeping
// ---------------------------------------------------------------------------

export const syncOps = pgTable('sync_ops', {
  opId: uuid('op_id').primaryKey(),
  deviceId: uuid('device_id').references(() => devices.id),
  entity: text('entity').notNull(),
  entityId: uuid('entity_id').notNull(),
  op: text('op').notNull(), // upsert | delete
  appliedAt: timestamp('applied_at', { withTimezone: true }).notNull().defaultNow(),
})

export const syncConflicts = pgTable('sync_conflicts', {
  id: uuid('id').primaryKey().defaultRandom(),
  opId: uuid('op_id').notNull().unique(),
  deviceId: uuid('device_id').references(() => devices.id),
  entity: text('entity').notNull(),
  entityId: uuid('entity_id').notNull(),
  payload: jsonb('payload').notNull(),
  reason: text('reason').notNull(),
  serverVersion: integer('server_version'),
  resolvedAt: timestamp('resolved_at', { withTimezone: true }),
  resolvedBy: uuid('resolved_by').references(() => users.id),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export const auditLog = pgTable(
  'audit_log',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').references(() => users.id),
    deviceId: uuid('device_id').references(() => devices.id),
    action: text('action').notNull(),
    entity: text('entity').notNull(),
    entityId: uuid('entity_id'),
    details: jsonb('details'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index('audit_log_entity_idx').on(t.entity, t.entityId)],
)

export type UserRow = typeof users.$inferSelect
export type ClientRow = typeof clients.$inferSelect
export type SiteRow = typeof sites.$inferSelect
export type ProductRow = typeof products.$inferSelect
export type DocumentRow = typeof documents.$inferSelect
export type PaymentRow = typeof payments.$inferSelect
export type OrderRequestRow = typeof orderRequests.$inferSelect
export type SettingsRow = typeof settings.$inferSelect
