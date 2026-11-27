import { saveDocument, type DocInput } from '@/lib/admin/actions'
import { authErrorResponse, requireUser } from '@/lib/auth/server'

// Stable endpoint for the offline outbox (lib/admin/outbox.ts). Unlike a server
// action id, this URL survives new deployments, so drafts saved offline before
// an update still sync afterwards. saveDocument re-checks the session itself.
export async function POST(request: Request) {
  try {
    await requireUser()
  } catch (e) {
    return authErrorResponse(e) ?? Response.json({ error: 'Error' }, { status: 500 })
  }
  const input = (await request.json().catch(() => null)) as DocInput | null
  if (!input || typeof input !== 'object') return Response.json({ error: 'Bad request.' }, { status: 400 })
  try {
    const res = await saveDocument(input)
    if ('error' in res) return Response.json(res, { status: 422 })
    return Response.json(res)
  } catch (e) {
    console.error('outbox sync failed', e)
    return Response.json({ error: 'Server error while saving.' }, { status: 500 })
  }
}
