"use client"

import {
  Card,
  Text,
  Group,
  Button,
  Stack,
  Title,
  Badge,
  Table,
  Divider,
  Grid,
  Modal,
  Tabs,
  Radio,
  Textarea,
} from "@mantine/core"
import { IconArrowLeft, IconChevronDown, IconChevronRight } from "@tabler/icons-react"
import { useState } from "react"
import Link from "next/link"

const rfqData = {
  id: "RFQ-001",
  title: "IT Infrastructure Upgrade",
  status: "Open",
  sentDate: "2025-01-15",
  dueDate: "2025-01-25",
  description: "Server hardware and networking equipment for data center upgrade",
  requester: "Mike Davis",
  department: "IT"
}

const quotations = [
  {
    id: "Q-001",
    supplier: "TechCorp Solutions",
    amount: 15499.99,
    status: "Submitted",
    submittedDate: "2025-01-18",
    validUntil: "2025-02-15",
    items: [
      { name: "Dell Server R740", quantity: 2, unitPrice: 5500.00, total: 11000.00 },
      { name: "Network Switch", quantity: 1, unitPrice: 2499.99, total: 2499.99 },
      { name: "SRV-003 - Flight Booking Service", quantity: 1, unitPrice: 2000.00, total: 2000.00 }
    ]
  },
  {
    id: "Q-002", 
    supplier: "Digital Systems Ltd",
    amount: 14750.00,
    status: "Submitted",
    submittedDate: "2025-01-19",
    validUntil: "2025-02-10",
    items: [
      { name: "HP Server DL380", quantity: 2, unitPrice: 5200.00, total: 10400.00 },
      { name: "Cisco Switch", quantity: 1, unitPrice: 2350.00, total: 2350.00 },
      { name: "SRV-004 - Hotel Accommodation", quantity: 1, unitPrice: 2000.00, total: 2000.00 }
    ]
  },
  {
    id: "Q-003",
    supplier: "Enterprise Tech",
    amount: 16200.00,
    status: "Pending",
    submittedDate: "-",
    validUntil: "2025-01-25",
    items: []
  }
]

function getStatusColor(status: string) {
  switch (status) {
    case "Open": return "blue"
    case "Closed": return "gray"
    default: return "gray"
  }
}

function getQuotationStatusColor(status: string) {
  switch (status) {
    case "Submitted": return "green"
    case "Pending": return "orange"
    default: return "gray"
  }
}

function formatCurrency(amount: number) {
  return `KES ${amount.toLocaleString()}`
}

export default function RfqDetailPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [expandedRows, setExpandedRows] = useState<string[]>([])
  const [viewingService, setViewingService] = useState<string | null>(null)
  const [analysis, setAnalysis] = useState<{
    id: string;
    supplier: string;
    amount: number;
    priceScore: string;
    leadScore: string;
    ratingScore: string;
    overallScore: string;
    items: { name: string; quantity: number; unitPrice: number; total: number }[];
  }[]>([])
  const [selectedSuppliers, setSelectedSuppliers] = useState<{[itemName: string]: string}>({})
  const [selectionReasons, setSelectionReasons] = useState<{[itemName: string]: string}>({})

  const toggleRow = (quotationId: string) => {
    setExpandedRows(prev => 
      prev.includes(quotationId) 
        ? prev.filter(id => id !== quotationId)
        : [...prev, quotationId]
    )
  }

  const analyzeQuotations = () => {
    const weights = { price: 0.6, lead: 0.2, rating: 0.2 }
    const prices = quotations.map(q => q.amount)
    const minPrice = Math.min(...prices)
    
    const analyzed = quotations.map(q => {
      const priceScore = minPrice / q.amount
      const leadScore = 1 / (q.amount / 10000) // simplified lead scoring
      const ratingScore = 0.8 // default rating
      const overallScore = weights.price * priceScore + weights.lead * leadScore + weights.rating * ratingScore
      
      return {
        ...q,
        priceScore: priceScore.toFixed(3),
        leadScore: leadScore.toFixed(3), 
        ratingScore: ratingScore.toFixed(3),
        overallScore: overallScore.toFixed(3)
      }
    }).sort((a, b) => parseFloat(b.overallScore) - parseFloat(a.overallScore))
    
    setAnalysis(analyzed)
    setModalOpen(true)
  }

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Button
          variant="subtle"
          leftSection={<IconArrowLeft size={16} />}
          component={Link}
          href="/application/rfqs"
        >
          Back to RFQs
        </Button>
        <Button variant="filled" onClick={analyzeQuotations}>
          Analyse Quotations
        </Button>
      </Group>

      <Card shadow="sm" padding="xl" radius="md" withBorder>
        <Stack gap="lg">
          <Group justify="space-between" align="flex-start">
            <div>
              <Title order={2} mb="xs">
                {rfqData.title}
              </Title>
              <Text size="lg" fw={600} c="blue">
                {rfqData.id}
              </Text>
            </div>
            <Badge size="lg" variant="light" color={getStatusColor(rfqData.status)}>
              {rfqData.status}
            </Badge>
          </Group>

          <Divider />

          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap="md">
                <div>
                  <Text size="sm" c="dimmed">Requester</Text>
                  <Text fw={500}>{rfqData.requester}</Text>
                </div>
                <div>
                  <Text size="sm" c="dimmed">Department</Text>
                  <Text fw={500}>{rfqData.department}</Text>
                </div>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap="md">
                <div>
                  <Text size="sm" c="dimmed">Sent Date</Text>
                  <Text fw={500}>{rfqData.sentDate}</Text>
                </div>
                <div>
                  <Text size="sm" c="dimmed">Due Date</Text>
                  <Text fw={500}>{rfqData.dueDate}</Text>
                </div>
              </Stack>
            </Grid.Col>
          </Grid>

          <Divider />

          <div>
            <Title order={4} mb="md">
              Description
            </Title>
            <Text size="sm" c="dimmed">
              {rfqData.description}
            </Text>
          </div>

          <Divider />

          <div>
            <Title order={4} mb="md">
              Supplier Quotations
            </Title>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Quotation ID</Table.Th>
                  <Table.Th>Supplier</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th style={{ textAlign: 'right' }}>Amount</Table.Th>
                  <Table.Th>Submitted Date</Table.Th>
                  <Table.Th>Valid Until</Table.Th>
                  <Table.Th>Items</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {quotations.map((quotation) => (
                  <>
                    <Table.Tr key={quotation.id}>
                      <Table.Td>
                        <Text fw={500}>{quotation.id}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text>{quotation.supplier}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge variant="light" color={getQuotationStatusColor(quotation.status)}>
                          {quotation.status}
                        </Badge>
                      </Table.Td>
                      <Table.Td style={{ textAlign: 'right' }}>
                        <Text fw={500} c={(() => {
                          if (quotation.status !== "Submitted") return 'dark';
                          const submittedAmounts = quotations.filter(q => q.status === "Submitted").map(q => q.amount);
                          const minAmount = Math.min(...submittedAmounts);
                          const maxAmount = Math.max(...submittedAmounts);
                          return quotation.amount === minAmount ? 'green' : quotation.amount === maxAmount ? 'red' : 'dark';
                        })()}>
                          {quotation.status === "Submitted" ? formatCurrency(quotation.amount) : "-"}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm" c="dimmed">{quotation.submittedDate}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm" c="dimmed">{quotation.validUntil}</Text>
                      </Table.Td>
                      <Table.Td>
                        {quotation.items.length > 0 && (
                          <Button 
                            size="xs" 
                            variant="subtle" 
                            onClick={() => toggleRow(quotation.id)}
                            leftSection={expandedRows.includes(quotation.id) ? <IconChevronDown size={14} /> : <IconChevronRight size={14} />}
                          >
                            Items ({quotation.items.length})
                          </Button>
                        )}
                      </Table.Td>
                    </Table.Tr>
                    {expandedRows.includes(quotation.id) && quotation.items.length > 0 && (
                      <Table.Tr>
                        <Table.Td colSpan={7} style={{ padding: 0, backgroundColor: '#f8f9fa' }}>
                          <Table style={{ margin: 0 }}>
                            <Table.Thead>
                              <Table.Tr>
                                <Table.Th>Item</Table.Th>
                                <Table.Th>Quantity</Table.Th>
                                <Table.Th style={{ textAlign: 'right' }}>Unit Price</Table.Th>
                                <Table.Th style={{ textAlign: 'right' }}>Total</Table.Th>
                              </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                              {quotation.items.map((item, index: number) => (
                                <Table.Tr key={index}>
                                  <Table.Td>
                                    <div 
                                      style={{ cursor: item.name.includes('SRV-') ? 'pointer' : 'default' }}
                                      onClick={() => item.name.includes('SRV-') && setViewingService(`${quotation.id}-${index}`)}
                                    >
                                      {item.name}
                                      {item.name.includes('SRV-') && (
                                        <Badge size="xs" variant="light" color="blue" mt={2}>
                                          Service - Click to view details
                                        </Badge>
                                      )}
                                    </div>
                                  </Table.Td>
                                  <Table.Td>{item.quantity}</Table.Td>
                                  <Table.Td style={{ textAlign: 'right' }}>
                                    <Text c={(() => {
                                      const allItemPrices = quotations.flatMap(q => q.items.filter(i => i.name === item.name).map(i => i.unitPrice));
                                      if (allItemPrices.length <= 1) return 'dark';
                                      const minPrice = Math.min(...allItemPrices);
                                      const maxPrice = Math.max(...allItemPrices);
                                      return item.unitPrice === minPrice ? 'green' : item.unitPrice === maxPrice ? 'red' : 'dark';
                                    })()}>
                                      {formatCurrency(item.unitPrice)}
                                    </Text>
                                  </Table.Td>
                                  <Table.Td style={{ textAlign: 'right' }}>
                                    <Text fw={500} c={(() => {
                                      const allItemTotals = quotations.flatMap(q => q.items.filter(i => i.name === item.name).map(i => i.total));
                                      if (allItemTotals.length <= 1) return 'dark';
                                      const minTotal = Math.min(...allItemTotals);
                                      const maxTotal = Math.max(...allItemTotals);
                                      return item.total === minTotal ? 'green' : item.total === maxTotal ? 'red' : 'dark';
                                    })()}>
                                      {formatCurrency(item.total)}
                                    </Text>
                                  </Table.Td>
                                </Table.Tr>
                              ))}
                            </Table.Tbody>
                          </Table>
                        </Table.Td>
                      </Table.Tr>
                    )}
                  </>
                ))}
              </Table.Tbody>
            </Table>
          </div>
        </Stack>
      </Card>
      
      <Modal opened={modalOpen} onClose={() => setModalOpen(false)} title="Quotation Analysis" size="xl">
        <Tabs defaultValue="scores">
          <Tabs.List>
            <Tabs.Tab value="scores">Supplier Scores</Tabs.Tab>
            <Tabs.Tab value="items">Select by Item</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="scores" pt="md">
            <Stack gap="md">
              <Title order={4}>Analysis Results</Title>
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Vendor</Table.Th>
                    <Table.Th>Price Score</Table.Th>
                    <Table.Th>Lead Score</Table.Th>
                    <Table.Th>Rating Score</Table.Th>
                    <Table.Th>Overall Score</Table.Th>
                    <Table.Th>Rank</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {analysis.map((item, index) => (
                    <Table.Tr key={item.id}>
                      <Table.Td>{item.supplier}</Table.Td>
                      <Table.Td>{item.priceScore}</Table.Td>
                      <Table.Td>{item.leadScore}</Table.Td>
                      <Table.Td>{item.ratingScore}</Table.Td>
                      <Table.Td><Text fw={600}>{item.overallScore}</Text></Table.Td>
                      <Table.Td><Badge variant="light">{index + 1}</Badge></Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
              {analysis.length > 0 && (
                <Text size="sm" c="dimmed">
                  Best vendor: <Text span fw={600}>{analysis[0]?.supplier}</Text> with score <Text span fw={600}>{analysis[0]?.overallScore}</Text>
                </Text>
              )}
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="items" pt="md">
            <Stack gap="md">
              <Text size="sm" c="dimmed">Select the best supplier for each item based on price, quality, and delivery terms.</Text>
              
              {(() => {
                const allItems = new Set();
                quotations.forEach(q => {
                  q.items.forEach(item => allItems.add(item.name));
                });
                
                return Array.from(allItems).map((itemName) => {
                  const itemKey = String(itemName);
                  const supplierQuotes = quotations.map(q => {
                    const itemQuote = q.items.find(item => item.name === itemKey);
                    return {
                      supplier: q.supplier,
                      quotationId: q.id,
                      unitPrice: itemQuote?.unitPrice || null,
                      quantity: itemQuote?.quantity || null,
                      total: itemQuote?.total || null,
                      hasQuote: !!itemQuote
                    };
                  });
                  
                  return (
                    <Card key={itemKey} shadow="sm" padding="md" radius="md" withBorder>
                      <Stack gap="md">
                        <Title order={5}>{itemKey}</Title>
                        <Table>
                          <Table.Thead>
                            <Table.Tr>
                              <Table.Th>Select</Table.Th>
                              <Table.Th>Supplier</Table.Th>
                              <Table.Th>Unit Price</Table.Th>
                              <Table.Th>Quantity</Table.Th>
                              <Table.Th>Total</Table.Th>
                            </Table.Tr>
                          </Table.Thead>
                          <Table.Tbody>
                            {supplierQuotes.map((quote, index) => (
                              <Table.Tr key={`${quote.quotationId}-${index}`}>
                                <Table.Td>
                                  <Radio 
                                    name={`item-${itemKey}`}
                                    defaultChecked={quote.hasQuote && index === supplierQuotes.findIndex(q => q.hasQuote)}
                                    onChange={() => setSelectedSuppliers(prev => ({...prev, [itemKey]: quote.supplier}))}
                                  />
                                </Table.Td>
                                <Table.Td>
                                  <Text fw={500}>{quote.supplier}</Text>
                                  <Text size="xs" c="dimmed">{quote.quotationId}</Text>
                                </Table.Td>
                                <Table.Td>
                                  {quote.hasQuote ? (
                                    <Text c={(() => {
                                      const prices = supplierQuotes.filter(q => q.hasQuote).map(q => q.unitPrice!);
                                      const minPrice = Math.min(...prices);
                                      const maxPrice = Math.max(...prices);
                                      return quote.unitPrice === minPrice ? 'green' : quote.unitPrice === maxPrice ? 'red' : 'dark';
                                    })()}>
                                      {formatCurrency(quote.unitPrice!)}
                                    </Text>
                                  ) : <Text c="dimmed">No quote</Text>}
                                </Table.Td>
                                <Table.Td>
                                  {quote.hasQuote ? quote.quantity : <Text c="dimmed">-</Text>}
                                </Table.Td>
                                <Table.Td>
                                  {quote.hasQuote ? (
                                    <Text fw={600} c={(() => {
                                      const totals = supplierQuotes.filter(q => q.hasQuote).map(q => q.total!);
                                      const minTotal = Math.min(...totals);
                                      const maxTotal = Math.max(...totals);
                                      return quote.total === minTotal ? 'green' : quote.total === maxTotal ? 'red' : 'dark';
                                    })()}>
                                      {formatCurrency(quote.total!)}
                                    </Text>
                                  ) : <Text c="dimmed">-</Text>}
                                </Table.Td>
                              </Table.Tr>
                            ))}
                          </Table.Tbody>
                        </Table>
                        {(() => {
                          const selectedSupplier = selectedSuppliers[itemKey];
                          const lowestPriceSupplier = supplierQuotes.filter(q => q.hasQuote).reduce((min, quote) => 
                            quote.unitPrice! < min.unitPrice! ? quote : min
                          )?.supplier;
                          const isNotLowestPrice = selectedSupplier && selectedSupplier !== lowestPriceSupplier;
                          
                          return isNotLowestPrice && (
                            <Textarea
                              label="Reason for selection (required - not lowest price)"
                              placeholder="Explain why this supplier was chosen over the lowest price option..."
                              value={selectionReasons[itemKey] || ''}
                              onChange={(e) => setSelectionReasons(prev => ({...prev, [itemKey]: e.target.value}))}
                              required
                              mt="md"
                            />
                          );
                        })()}
                      </Stack>
                    </Card>
                  );
                });
              })()}
              
              <Group justify="flex-end" mt="md">
                <Button variant="outline" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="filled" color="green">
                  Create Purchase Orders
                </Button>
              </Group>
            </Stack>
          </Tabs.Panel>
        </Tabs>
      </Modal>

      <Modal opened={!!viewingService} onClose={() => setViewingService(null)} title="Service Booking Details" size="lg">
        {viewingService && (() => {
          // Parse the viewingService ID to get quotation and item index
          const parts = viewingService.split('-');
          let quotationId, itemIndex;
          
          if (viewingService.startsWith('analysis-')) {
            // Format: analysis-Q-001-2
            quotationId = `${parts[1]}-${parts[2]}`; // Q-001
            itemIndex = parseInt(parts[3]); // 2
          } else {
            // Format: Q-001-2
            quotationId = `${parts[0]}-${parts[1]}`; // Q-001
            itemIndex = parseInt(parts[2]); // 2
          }
          
          const isAnalysis = viewingService.startsWith('analysis-');
          const quotation = isAnalysis ? analysis.find(a => a.id === quotationId) : quotations.find(q => q.id === quotationId);
          const service = quotation?.items[itemIndex];
          
          if (!service) {
            return (
              <Stack gap="md">
                <Text>Debug Info:</Text>
                <Text size="sm">viewingService: {viewingService}</Text>
                <Text size="sm">quotationId: {quotationId}</Text>
                <Text size="sm">itemIndex: {itemIndex}</Text>
                <Text size="sm">isAnalysis: {isAnalysis.toString()}</Text>
                <Text size="sm">quotation found: {quotation ? 'Yes' : 'No'}</Text>
                <Text size="sm">items count: {quotation?.items.length || 0}</Text>
              </Stack>
            );
          }
          
          return (
            <Stack gap="md">
              <Text fw={600} size="lg">{service.name}</Text>
              <div style={{ backgroundColor: '#f8f9fa', padding: '16px', borderRadius: '8px' }}>
                {service.name.includes('Flight') && (
                  <Grid gutter="md">
                    <Grid.Col span={6}>
                      <Text size="xs" c="dimmed">From</Text>
                      <Text size="sm" fw={500}>Nairobi (NBO)</Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text size="xs" c="dimmed">To</Text>
                      <Text size="sm" fw={500}>Mombasa (MBA)</Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text size="xs" c="dimmed">Departure</Text>
                      <Text size="sm" fw={500}>Jan 25, 2025 - 09:00 AM</Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text size="xs" c="dimmed">Return</Text>
                      <Text size="sm" fw={500}>Jan 27, 2025 - 06:00 PM</Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text size="xs" c="dimmed">Class</Text>
                      <Badge size="sm" variant="light">Business</Badge>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text size="xs" c="dimmed">Passengers</Text>
                      <Text size="sm" fw={500}>1 Adult</Text>
                    </Grid.Col>
                  </Grid>
                )}
                {service.name.includes('Hotel') && (
                  <Grid gutter="md">
                    <Grid.Col span={6}>
                      <Text size="xs" c="dimmed">Hotel</Text>
                      <Text size="sm" fw={500}>Serena Beach Resort</Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text size="xs" c="dimmed">Location</Text>
                      <Text size="sm" fw={500}>Mombasa, Kenya</Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text size="xs" c="dimmed">Check-in</Text>
                      <Text size="sm" fw={500}>Jan 25, 2025</Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text size="xs" c="dimmed">Check-out</Text>
                      <Text size="sm" fw={500}>Jan 28, 2025</Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text size="xs" c="dimmed">Room Type</Text>
                      <Badge size="sm" variant="light">Deluxe Ocean View</Badge>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text size="xs" c="dimmed">Guests</Text>
                      <Text size="sm" fw={500}>2 Adults</Text>
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <Text size="xs" c="dimmed">Duration</Text>
                      <Text size="sm" fw={500}>3 nights</Text>
                    </Grid.Col>
                  </Grid>
                )}
                {service.name.includes('Car') && (
                  <Grid gutter="md">
                    <Grid.Col span={6}>
                      <Text size="xs" c="dimmed">Vehicle</Text>
                      <Text size="sm" fw={500}>Toyota Camry</Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text size="xs" c="dimmed">Category</Text>
                      <Badge size="sm" variant="light">Mid-size</Badge>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text size="xs" c="dimmed">Pickup Date</Text>
                      <Text size="sm" fw={500}>Jan 25, 2025 - 09:00 AM</Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text size="xs" c="dimmed">Return Date</Text>
                      <Text size="sm" fw={500}>Jan 30, 2025 - 09:00 AM</Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text size="xs" c="dimmed">Pickup Location</Text>
                      <Text size="sm" fw={500}>Jomo Kenyatta Airport</Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text size="xs" c="dimmed">Duration</Text>
                      <Text size="sm" fw={500}>5 days</Text>
                    </Grid.Col>
                  </Grid>
                )}
                {!service.name.includes('Flight') && !service.name.includes('Hotel') && !service.name.includes('Car') && (
                  <Text size="sm" c="dimmed">Service details not available for this type of service.</Text>
                )}
              </div>
            </Stack>
          );
        })()}
      </Modal>

    </Stack>
  )
}