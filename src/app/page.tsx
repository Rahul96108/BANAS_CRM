import { prisma } from "@/lib/prisma"
import { createOrder } from "@/actions/createOrder"

export default async function Home() {
  const products = await prisma.product.findMany()

  return (
    <main className="max-w-7xl mx-auto p-8">
      {/* Hero Banner */}
      <section className="bg-banas-blue text-white rounded-2xl p-12 mb-12 text-center shadow-lg">
        <h1 className="text-4xl font-bold mb-4 text-white">Fresh From The Farm</h1>
        <p className="text-blue-100">Premium dairy products for your family.</p>
      </section>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all">
            <div className="h-40 bg-gray-50 rounded-lg mb-4 flex items-center justify-center text-gray-400 font-medium">
              Product Image
            </div>
            
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
              <span className="text-lg font-bold text-banas-blue">₹{product.price}</span>
            </div>
            
            <form action={async () => {
              'use server'
              await createOrder(product.id, product.price)
            }}>
              <button className="w-full btn-primary">
                Order Now
              </button>
            </form>
          </div>
        ))}
      </div>
    </main>
  )
}
