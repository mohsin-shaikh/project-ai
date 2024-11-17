import { nanoid } from "nanoid"
import { z } from "zod"

import { startRunnable } from "@/ai"

const InputBodySchema = z.object({
  message: z.string().min(1),
  chatId: z.string().optional(),
})

type InputBodyType = z.infer<typeof InputBodySchema>

export async function POST(req: Request) {
  const { message, chatId }: InputBodyType = await req.json()
  const result = InputBodySchema.safeParse({ message, chatId })

  if (!result.success) {
    return Response.json({ data: null, error: result?.error }, { status: 500 })
  }
  const res = await startRunnable(message, chatId ?? nanoid())

  return Response.json({ data: JSON.stringify(res) })
}
