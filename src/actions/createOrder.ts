'use server'

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function createOrder(productId: string, price: number) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) return

  const userId = (session.user as any).id

  // NO DUPLICATE CHECK
  const existingOrder = await prisma.order.findFirst({
    where: {
      userId: userId,
      status: { in: ['PENDING', 'PROCESSING'] }
    }
  })

  if (existingOrder) {
    console.log("User already has an active order")
    return // Or return error object
  }

  await prisma.order.create({
    data: {
      userId,
      totalAmount: price,
      items: {
        create: [{ productId, quantity: 1 }]
      }
    }
  })

  revalidatePath('/dashboard')
}
