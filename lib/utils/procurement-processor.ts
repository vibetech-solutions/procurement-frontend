import { getStockLevel } from './constants'

export interface RequisitionItem {
  id: string
  name: string
  category: string
  quantity: number
  unitPrice: number
  totalPrice: number
  stockLevel?: number
}

export interface ProcessingResult {
  inStockItems: RequisitionItem[]
  outOfStockItems: RequisitionItem[]
  materialReceiptId?: string
  rfqIds?: string[]
}

export class ProcurementProcessor {
  static analyzeRequisition(items: RequisitionItem[]): ProcessingResult {
    const itemsWithStock = items.map(item => ({
      ...item,
      stockLevel: getStockLevel(item.id)
    }))

    const inStockItems = itemsWithStock.filter(item => 
      (item.stockLevel || 0) >= item.quantity
    )
    
    const outOfStockItems = itemsWithStock.filter(item => 
      (item.stockLevel || 0) < item.quantity
    )

    return {
      inStockItems,
      outOfStockItems
    }
  }

  static async createMaterialReceipt(
    requisitionId: string, 
    items: RequisitionItem[]
  ): Promise<string> {
    // Generate material receipt ID
    const mrId = `MR-${Date.now()}`
    
    // In a real app, this would make an API call
    console.log(`Creating material receipt ${mrId} for requisition ${requisitionId}`)
    console.log('Items:', items)
    
    return mrId
  }

  static async createRFQ(
    requisitionId: string, 
    items: RequisitionItem[]
  ): Promise<string[]> {
    // Generate RFQ IDs (could be multiple RFQs for different suppliers)
    const rfqIds = [`RFQ-${Date.now()}`]
    
    // In a real app, this would make API calls to create RFQs
    console.log(`Creating RFQs ${rfqIds.join(', ')} for requisition ${requisitionId}`)
    console.log('Items:', items)
    
    return rfqIds
  }

  static async processRequisition(
    requisitionId: string, 
    items: RequisitionItem[]
  ): Promise<ProcessingResult> {
    const analysis = this.analyzeRequisition(items)
    
    let materialReceiptId: string | undefined
    let rfqIds: string[] | undefined

    // Create material receipt for in-stock items
    if (analysis.inStockItems.length > 0) {
      materialReceiptId = await this.createMaterialReceipt(
        requisitionId, 
        analysis.inStockItems
      )
    }

    // Create RFQ for out-of-stock items
    if (analysis.outOfStockItems.length > 0) {
      rfqIds = await this.createRFQ(
        requisitionId, 
        analysis.outOfStockItems
      )
    }

    return {
      ...analysis,
      materialReceiptId,
      rfqIds
    }
  }
}