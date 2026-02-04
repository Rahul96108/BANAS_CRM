import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // 1. Create a Test Customer
  const password = await bcrypt.hash('user123', 10)
  await prisma.user.upsert({
    where: { email: 'user@gmail.com' },
    update: {},
    create: {
      email: 'user@gmail.com',
      name: 'Rohan Sharma',
      password,
      role: 'CUSTOMER',
    },
  })

  // 2. Create Products
  const products = [
    { name: 'Amul Gold Milk (500ml)', price: 32, stock: 100 },
    { name: 'Amul Taaza (500ml)', price: 26, stock: 100 },
    { name: 'Amul Ghee (1L)', price: 650, stock: 50 },
    { name: 'Banas Butter (500g)', price: 280, stock: 40 },
    { name: 'Amul Kool (Bottle)', price: 25, stock: 200 },
    { name: 'Premium Paneer (200g)', price: 90, stock: 30 },
  ]

  for (const p of products) {
    await prisma.product.create({ data: p })
  }

  console.log('✅ Database seeded with Banas products!')
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())
