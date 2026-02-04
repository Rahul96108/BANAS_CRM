import Link from 'next/link'
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export default async function Navbar() {
  const session = await getServerSession(authOptions)

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-banas-blue tracking-tight">
          BANAS DAIRY
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link href="/" className="link-blue">Shop</Link>
          
          {session ? (
            <>
              <Link href="/dashboard" className="link-blue">My Orders</Link>
              {/* Optional: Add Admin Link if role is ADMIN */}
              <div className="w-8 h-8 rounded-full bg-banas-blue-light flex items-center justify-center text-banas-blue font-bold">
                {session.user?.name?.[0] || "U"}
              </div>
            </>
          ) : (
            <Link href="/login" className="btn-primary">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
