import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Package, AlertTriangle, DollarSign, Activity, ArrowDownToLine, ArrowUpFromLine, Settings2 } from 'lucide-react'

// Mock data — will be replaced with Supabase queries
const overview = {
  totalProducts: 42,
  lowStockItems: 5,
  totalInventoryValue: 18420,
  todaysMovements: 12,
}

const lowStockAlerts = [
  { id: 1, name: 'Arabica Beans - Dark Roast', current: 2, minimum: 10, status: 'critical' },
  { id: 2, name: 'Oat Milk (1L)', current: 6, minimum: 15, status: 'low' },
  { id: 3, name: 'Paper Cups (12oz)', current: 8, minimum: 20, status: 'low' },
]

const recentActivity = [
  { id: 1, type: 'in', product: 'Arabica Beans - Dark Roast', quantity: 20, time: '10 min ago' },
  { id: 2, type: 'out', product: 'Oat Milk (1L)', quantity: 4, time: '32 min ago' },
  { id: 3, type: 'adjustment', product: 'Paper Cups (12oz)', quantity: 8, time: '1 hr ago' },
  { id: 4, type: 'out', product: 'Vanilla Syrup', quantity: 2, time: '2 hr ago' },
]

const statusStyles: Record<string, string> = {
  critical: 'bg-destructive/10 text-destructive border-destructive/30',
  low: 'bg-warning/10 text-warning border-warning/30',
}

const activityIcon: Record<string, { icon: typeof ArrowDownToLine; color: string }> = {
  in: { icon: ArrowDownToLine, color: 'text-success' },
  out: { icon: ArrowUpFromLine, color: 'text-destructive' },
  adjustment: { icon: Settings2, color: 'text-muted-foreground' },
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Overview cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Products</CardTitle>
            <Package className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-heading font-semibold">{overview.totalProducts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Low Stock Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-heading font-semibold">{overview.lowStockItems}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Inventory Value</CardTitle>
            <DollarSign className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-heading font-semibold">
              ${overview.totalInventoryValue.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Today's Movements</CardTitle>
            <Activity className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-heading font-semibold">{overview.todaysMovements}</div>
          </CardContent>
        </Card>
      </div>

      {/* Low stock alerts + Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-base flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              Low Stock Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {lowStockAlerts.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-md border border-border p-3"
              >
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.current} in stock · min {item.minimum}
                  </p>
                </div>
                <Badge variant="outline" className={statusStyles[item.status]}>
                  {item.status === 'critical' ? 'Critical' : 'Low'}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-base flex items-center gap-2">
              <Activity className="h-4 w-4 text-accent" />
              Recent Stock Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((entry) => {
              const { icon: Icon, color } = activityIcon[entry.type]
              return (
                <div key={entry.id} className="flex items-center gap-3">
                  <div className={`p-2 rounded-full bg-muted ${color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{entry.product}</p>
                    <p className="text-xs text-muted-foreground">
                      {entry.type === 'in' ? 'Stock in' : entry.type === 'out' ? 'Stock out' : 'Adjustment'} ·{' '}
                      {entry.quantity} units
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{entry.time}</span>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}