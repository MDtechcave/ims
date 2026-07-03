import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Mock data — will come from Supabase later
const mockMovements = [
  { id: 'm1', product: 'Arabica Beans', type: 'in', quantity: 20 },
  { id: 'm2', product: 'Arabica Beans', type: 'out', quantity: 15 },
  { id: 'm3', product: 'Oat Milk', type: 'in', quantity: 10 },
  { id: 'm4', product: 'Oat Milk', type: 'out', quantity: 8 },
  { id: 'm5', product: 'Paper Cups', type: 'out', quantity: 30 },
]

export default function ReportsPage() {
  const totalIn = mockMovements
    .filter((m) => m.type === 'in')
    .reduce((sum, m) => sum + m.quantity, 0)

  const totalOut = mockMovements
    .filter((m) => m.type === 'out')
    .reduce((sum, m) => sum + m.quantity, 0)

  return (
    <div className="space-y-4">
      <h2 className="font-heading text-lg font-semibold">Reports</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Stock In</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-heading font-semibold text-success">+{totalIn}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Stock Out</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-heading font-semibold text-destructive">-{totalOut}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">All Movements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {mockMovements.map((m) => (
            <div key={m.id} className="flex items-center justify-between text-sm border-b border-border last:border-0 py-2">
              <span>{m.product}</span>
              <span className={m.type === 'in' ? 'text-success' : 'text-destructive'}>
                {m.type === 'in' ? '+' : '-'}{m.quantity}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}