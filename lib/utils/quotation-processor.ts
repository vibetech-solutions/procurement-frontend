export interface QuotationItem {
  name: string
  quantity: number
  stockLevel: number
}

export interface ProcessedQuotation {
  quotationId: string
  purchaseOrderId: string
  materialReceiptId?: string
  items: QuotationItem[]
}

export function processQuotationToPurchaseOrder(quotationId: string): ProcessedQuotation {
  // Generate new PO ID
  const poId = `PO-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`
  
  // Sample items from quotation
  const items: QuotationItem[] = [
    { name: "Dell Server R740", quantity: 2, stockLevel: 0 },
    { name: "Network Switch", quantity: 1, stockLevel: 5 },
    { name: "Installation Service", quantity: 1, stockLevel: 0 }
  ]
  
  return {
    quotationId,
    purchaseOrderId: poId,
    items
  }
}

export function createPurchaseOrderFromQuotation(quotationId: string) {
  const processed = processQuotationToPurchaseOrder(quotationId)
  
  // In a real app, this would make an API call
  console.log(`Creating PO ${processed.purchaseOrderId} from quotation ${quotationId}`)
  
  return processed
}