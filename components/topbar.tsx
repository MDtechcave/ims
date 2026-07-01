'use client'

import { Bell } from 'lucide-react'

export default function Topbar() {
  // Placeholder count — will come from Supabase low-stock query later
  const lowStockCount = 3

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 shrink-0">
      <h1 className="font-heading text-xl font-semibold text-foreground">Dashboard</h1>

      <button
        className="relative p-2 rounded-full hover:bg-muted transition-colors"
        aria-label={`Notifications, ${lowStockCount} low stock alerts`}
      >
        <Bell className="h-5 w-5 text-foreground" />
        {lowStockCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-destructive text-white text-[10px] font-semibold flex items-center justify-center">
            {lowStockCount}
          </span>
        )}
      </button>
    </header>
  )
}