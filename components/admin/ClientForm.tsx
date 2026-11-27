import { saveClient } from '@/lib/admin/actions'
import type { ClientRow } from '@/db/schema'
import { Field } from './ui'
import { SubmitButton } from './SubmitButton'

export function ClientForm({ client, returnTo }: { client?: ClientRow; returnTo?: string }) {
  return (
    <form action={saveClient} className="ax-panel p-6 md:p-8 space-y-5 max-w-3xl">
      {client && <input type="hidden" name="id" value={client.id} />}
      {returnTo && <input type="hidden" name="returnTo" value={returnTo} />}
      <div className="grid md:grid-cols-[2fr_1fr] gap-5">
        <Field label="Client / company name" name="name" defaultValue={client?.name} required placeholder="e.g. Konkola Copper Mines Plc" />
        <Field label="Type" name="type" as="select" defaultValue={client?.type ?? 'company'}>
          <option value="company">Company</option>
          <option value="individual">Individual</option>
        </Field>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Contact person" name="contactPerson" defaultValue={client?.contactPerson} />
        <Field label="Email" name="email" type="email" defaultValue={client?.email} />
        <Field label="Phone" name="phone" type="tel" defaultValue={client?.phone} placeholder="+260 9XX XXX XXX" />
        <Field label="WhatsApp (if different)" name="whatsapp" type="tel" defaultValue={client?.whatsapp} />
        <Field label="TPIN" name="tpin" defaultValue={client?.tpin} />
        <Field label="Address" name="address" defaultValue={client?.address} />
      </div>
      <Field label="Notes" name="notes" as="textarea" defaultValue={client?.notes} />
      <SubmitButton>{client ? 'Save changes' : 'Create client'}</SubmitButton>
    </form>
  )
}
