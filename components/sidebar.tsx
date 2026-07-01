'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package, ArrowLeftRight, Users, Coffee } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Inventory', href: '/inventory', icon: Package },
  { label: 'Stock Movement', href: '/stock-movement', icon: ArrowLeftRight },
  { label: 'Suppliers', href: '/suppliers', icon: Users },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-sidebar text-sidebar-foreground flex flex-col shrink-0 min-h-screen">
      <div className="flex items-center gap-2 px-6 py-6">
        <Coffee className="h-6 w-6" />
        <span className="font-heading text-lg font-semibold">Brew IMS</span>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                active
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'hover:bg-sidebar-accent/60 text-sidebar-foreground/80'
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="px-6 py-4 text-xs text-sidebar-foreground/50 border-t border-sidebar-border">
        Brew IMS · Staff Console
      </div>
    </aside>
  )
}