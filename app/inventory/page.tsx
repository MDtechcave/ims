'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { Search, Plus, ArrowUpDown } from 'lucide-react'

const mockProducts = [
  { id: '1', name: 'Arabica Beans - Dark Roast', category: 'Coffee Beans', barcode: '8901234567', currentStock: 2, minimumStock: 10, supplier: 'Bean Traders Co.', status: 'critical' },
  { id: '2', name: 'Oat Milk (1L)', category: 'Dairy & Alternatives', barcode: '8901234568', currentStock: 6, minimumStock: 15, supplier: 'Fresh Farms', status: 'low' },
  { id: '3', name: 'Paper Cups (12oz)', category: 'Packaging', barcode: '8901234569', currentStock: 8, minimumStock: 20, supplier: 'PackIt Supplies', status: 'low' },
  { id: '4', name: 'Vanilla Syrup', category: 'Syrups', barcode: '8901234570', currentStock: 24, minimumStock: 8, supplier: 'FlavorWorks', status: 'ok' },
  { id: '5', name: 'Robusta Beans', category: 'Coffee Beans', barcode: '8901234571', currentStock: 40, minimumStock: 15, supplier: 'Bean Traders Co.', status: 'ok' },
  { id: '6', name: 'Whole Milk (1L)', category: 'Dairy & Alternatives', barcode: '8901234572', currentStock: 18, minimumStock: 10, supplier: 'Fresh Farms', status: 'ok' },
]

const statusStyles: Record<string, string> = {
  ok: 'bg-success/10 text-success border-success/30',
  low: 'bg-warning/10 text-warning border-warning/30',
  critical: 'bg-destructive/10 text-destructive border-destructive/30',
}

const statusLabel: Record<string, string> = {
  ok: 'OK',
  low: 'Low',
  critical: 'Critical',
}

type SortKey = 'name' | 'currentStock' | 'category'

export default function InventoryPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [sortKey, setSortKey] = useState<SortKey>('name')
  const [sortAsc, setSortAsc] = useState(true)

  const filtered = useMemo(() => {
    let result = mockProducts.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.barcode.includes(search)
      const matchesStatus = statusFilter === 'all' || p.status === statusFilter
      return matchesSearch && matchesStatus
    })

    result.sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      const cmp = typeof aVal === 'string' ? aVal.localeCompare(bVal as string) : (aVal as number) - (bVal as number)
      return sortAsc ? cmp : -cmp
    })

    return result
  }, [search, statusFilter, sortKey, sortAsc])

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortAsc(!sortAsc)
    } else {
      setSortKey(key)
      setSortAsc(true)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg font-semibold">Products</h2>
        <Button>
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or barcode..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex gap-2">
          {['all', 'ok', 'low', 'critical'].map((s) => (
            <Button
              key={s}
              variant={statusFilter === s ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter(s)}
            >
              {s === 'all' ? 'All' : statusLabel[s]}
            </Button>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="px-4 py-3 font-medium">
                    <button onClick={() => toggleSort('name')} className="flex items-center gap-1 hover:text-foreground">
                      Product Name <ArrowUpDown className="h-3.5 w-3.5" />
                    </button>
                  </th>
                  <th className="px-4 py-3 font-medium">
                    <button onClick={() => toggleSort('category')} className="flex items-center gap-1 hover:text-foreground">
                      Category <ArrowUpDown className="h-3.5 w-3.5" />
                    </button>
                  </th>
                  <th className="px-4 py-3 font-medium">Barcode</th>
                  <th className="px-4 py-3 font-medium">
                    <button onClick={() => toggleSort('currentStock')} className="flex items-center gap-1 hover:text-foreground">
                      Current Stock <ArrowUpDown className="h-3.5 w-3.5" />
                    </button>
                  </th>
                  <th className="px-4 py-3 font-medium">Min Stock</th>
                  <th className="px-4 py-3 font-medium">Supplier</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((product) => (
                  <tr key={product.id} className="border-b border-border last:border-0 hover:bg-muted/40">
                    <td className="px-4 py-3">
                      <Link href={`/products/${product.id}`} className="font-medium hover:underline">
                        {product.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{product.category}</td>
                    <td className="px-4 py-3 font-mono-data text-xs text-muted-foreground">{product.barcode}</td>
                    <td className="px-4 py-3">{product.currentStock}</td>
                    <td className="px-4 py-3 text-muted-foreground">{product.minimumStock}</td>
                    <td className="px-4 py-3 text-muted-foreground">{product.supplier}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={statusStyles[product.status]}>
                        {statusLabel[product.status]}
                      </Badge>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                      No products match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}