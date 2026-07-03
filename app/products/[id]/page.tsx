import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { ArrowDownToLine, ArrowUpFromLine, Settings2 } from 'lucide-react'

// Mock data — will come from Supabase later
const mockProducts = [
  { id: '1', name: 'Arabica Beans - Dark Roast', category: 'Coffee Beans', barcode: '8901234567', currentStock: 2, minimumStock: 10, supplier: 'Bean Traders Co.', status: 'critical' },
  { id: '2', name: 'Oat Milk (1L)', category: 'Dairy & Alternatives', barcode: '8901234568', currentStock: 6, minimumStock: 15, supplier: 'Fresh Farms', status: 'low' },
]

const mockHistory = [
  { id: 'h1', type: 'in', quantity: 20, reason: 'Delivery', date: '2 days ago' },
  { id: 'h2', type: 'out', quantity: 4, reason: 'Used in Production', date: '1 day ago' },
  { id: 'h3', type: 'adjustment', quantity: 2, reason: 'Correction', date: '10 hours ago' },
]

const statusStyles: Record<string, string> = {
  ok: 'bg-success/10 text-success border-success/30',
  low: 'bg-warning/10 text-warning border-warning/30',
  critical: 'bg-destructive/10 text-destructive border-destructive/30',
}

const movementIcon: Record<string, { icon: typeof ArrowDownToLine; color: string }> = {
  in: { icon: ArrowDownToLine, color: 'text-success' },
  out: { icon: ArrowUpFromLine, color: 'text-destructive' },
  adjustment: { icon: Settings2, color: 'text-muted-foreground' },
}

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  const product = mockProducts.find((p) => p.id === params.id)

  if (!product) {
    return <div>Product not found.</div>
  }

  const stockPercent = Math.min(100, Math.round((product.currentStock / product.minimumStock) * 100))

  return (
    <div className="space-y-4 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-lg font-semibold">{product.name}</h2>
          <p className="text-sm text-muted-foreground">{product.category}</p>
        </div>
        <Button variant="outline">Edit Product</Button>
      </div>

      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Stock Level</span>
            <Badge variant="outline" className={statusStyles[product.status]}>
              {product.status}
            </Badge>
          </div>
          <Progress value={stockPercent} />
          <p className="text-xs text-muted-foreground">
            {product.currentStock} in stock · minimum {product.minimumStock}
          </p>

          <div className="pt-2 border-t border-border text-sm space-y-1">
            <p className="font-mono-data text-muted-foreground">Barcode: {product.barcode}</p>
            <p className="text-muted-foreground">Supplier: {product.supplier}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Stock History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockHistory.map((entry) => {
            const { icon: Icon, color } = movementIcon[entry.type]
            return (
              <div key={entry.id} className="flex items-center gap-3">
                <div className={`p-2 rounded-full bg-muted ${color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{entry.reason}</p>
                  <p className="text-xs text-muted-foreground">
                    {entry.type === 'in' ? '+' : entry.type === 'out' ? '-' : '±'}
                    {entry.quantity} units
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">{entry.date}</span>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}