import { z } from 'zod'
import { setSessionCookie } from '@/lib/auth/server'
import { ensureOpenModeUser, isOpenMode, registerDevice } from '@/lib/auth/open-mode'

// One-click sign-in for OPEN TEST MODE (see lib/auth/open-mode.ts). Refuses as
// soon as a real account exists.
const bodySchema = z.object({ deviceId: z.uuid(), deviceLabel: z.string().max(100).optional() })

export async function POST(request: Request) {
  const parsed = bodySchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) return Response.json({ error: 'Bad request.' }, { status: 400 })
  if (!(await isOpenMode().catch(() => false))) {
    return Response.json({ error: 'Test mode is closed. Sign in with your account.' }, { status: 403 })
  }
  const user = await ensureOpenModeUser()
  const deviceCode = await registerDevice(parsed.data.deviceId, user.id, parsed.data.deviceLabel)
  await setSessionCookie(user.id, parsed.data.deviceId)
  return Response.json({ user, deviceCode })
}
