'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

// Mock products — will come from Supabase later
const mockProducts = [
  { id: '1', name: 'Arabica Beans' },
  { id: '2', name: 'Oat Milk' },
  { id: '3', name: 'Paper Cups' },
]

export default function StockOutPage() {
  const [productId, setProductId] = useState('')
  const [quantity, setQuantity] = useState('')
  const [reason, setReason] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    console.log({ productId, quantity, reason, type: 'out' })

    setProductId('')
    setQuantity('')
    setReason('')
  }

  return (
    <div className="space-y-4">
      <h2 className="font-heading text-lg font-semibold">Stock Out</h2>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Log outgoing stock</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium mb-1">Product</label>
              <select
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                required
                className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="">Select a product...</option>
                {mockProducts.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Quantity</label>
              <Input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Reason</label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
                className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="">Select a reason...</option>
                <option value="usage">Used in Production</option>
                <option value="waste">Waste / Spoilage</option>
                <option value="damage">Damaged</option>
                <option value="correction">Correction</option>
              </select>
            </div>

            <Button type="submit">Log Stock Out</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}