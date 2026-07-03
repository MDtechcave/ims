import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Mail, Phone } from 'lucide-react'

// Mock data — will come from Supabase later
const mockSuppliers = [
  { id: 's1', name: 'Bean Traders Co.', contactName: 'Sipho Nkosi', email: 'sipho@beantraders.co.za', phone: '011 234 5678' },
  { id: 's2', name: 'Fresh Farms', contactName: 'Lerato Mokoena', email: 'lerato@freshfarms.co.za', phone: '021 345 6789' },
  { id: 's3', name: 'PackIt Supplies', contactName: 'David Chen', email: 'david@packit.co.za', phone: '031 456 7890' },
]

const mockProducts = [
  { id: '1', name: 'Arabica Beans', supplierId: 's1' },
  { id: '2', name: 'Robusta Beans', supplierId: 's1' },
  { id: '3', name: 'Oat Milk', supplierId: 's2' },
  { id: '4', name: 'Whole Milk', supplierId: 's2' },
  { id: '5', name: 'Paper Cups', supplierId: 's3' },
]

export default function SuppliersPage() {
  return (
    <div className="space-y-4">
      <h2 className="font-heading text-lg font-semibold">Suppliers</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockSuppliers.map((supplier) => {
          const linkedProducts = mockProducts.filter((p) => p.supplierId === supplier.id)

          return (
            <Card key={supplier.id}>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="font-medium">{supplier.name}</h3>
                  <Badge variant="outline">{linkedProducts.length} products</Badge>
                </div>

                <p className="text-sm text-muted-foreground">{supplier.contactName}</p>

                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-3.5 w-3.5" />
                    {supplier.email}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-3.5 w-3.5" />
                    {supplier.phone}
                  </div>
                </div>

                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-1">Linked products:</p>
                  <div className="flex flex-wrap gap-1">
                    {linkedProducts.map((p) => (
                      <Badge key={p.id} variant="secondary" className="text-xs">
                        {p.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}