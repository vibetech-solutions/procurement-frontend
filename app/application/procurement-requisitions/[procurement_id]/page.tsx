"use client"

import { procurementDetails, procurementToPurchaseOrderMap } from "@/lib/utils/constants"
import { getPriorityColor } from "@/lib/utils/helpers"
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
  ActionIcon,
  Avatar,
  TextInput,
  ScrollArea,
} from "@mantine/core"
import { IconArrowLeft, IconFileText, IconMessage, IconChevronDown, IconSend, IconDownload, IconEye } from "@tabler/icons-react"
import Link from "next/link"
import { useState } from "react"

function getStatusColor(status: string) {
  switch (status) {
    case "RFQ Sent":
      return "blue"
    case "PO Created":
      return "green"
    case "Awaiting Delivery":
      return "orange"
    default:
      return "gray"
  }
}

function formatCurrency(amount: number) {
  return `KES ${amount.toLocaleString()}`
}

export default function ViewProcurement() {
  const [viewingService, setViewingService] = useState<string | null>(null)
  const [chatExpanded, setChatExpanded] = useState(false)
  const [chatMessage, setChatMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Mike Davis",
      role: "Procurement Officer",
      message: "Hi! I've reviewed your requisition. The laptops are available but there might be a delay with the office chairs. Would you like to proceed with partial fulfillment?",
      timestamp: "2025-01-16 10:30 AM",
      isOfficer: true
    },
    {
      id: 2,
      sender: "Demo User",
      role: "Requester",
      message: "Yes, please proceed with the laptops. How long would the delay be for the chairs?",
      timestamp: "2025-01-16 11:15 AM",
      isOfficer: false
    },
    {
      id: 3,
      sender: "Mike Davis",
      role: "Procurement Officer",
      message: "The chairs should be available within 2 weeks. I'll create a separate order for them once they're in stock.",
      timestamp: "2025-01-16 11:45 AM",
      isOfficer: true
    }
  ])
  const procurement = procurementDetails
  const purchaseOrderId = procurementToPurchaseOrderMap[procurement.id]

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Group>
          <Button
            variant="subtle"
            leftSection={<IconArrowLeft size={16} />}
            component={Link}
            href="/application/procurement-requisitions"
          >
            Back to Procurement
          </Button>
        </Group>
      </Group>

      <Card shadow="sm" padding="xl" radius="md" withBorder>
        <Stack gap="lg">
          {/* Header */}
          <Group justify="space-between" align="flex-start">
            <div>
              <Title order={2} mb="xs">
                {procurement.title}
              </Title>
              <Text size="lg" fw={600} c="blue">
                {procurement.id}
              </Text>
            </div>
            <Group gap="sm">
              <Badge size="lg" variant="light" color={getStatusColor(procurement.procurementStatus)}>
                {procurement.procurementStatus}
              </Badge>
              <Badge size="lg" variant="dot" color={getPriorityColor(procurement.priority)}>
                {procurement.priority}
              </Badge>
            </Group>
          </Group>

          <Divider />

          {/* Details Grid */}
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap="md">
                <div>
                  <Text size="sm" c="dimmed">Requester</Text>
                  <Text fw={500}>{procurement.requester}</Text>
                </div>
                <div>
                  <Text size="sm" c="dimmed">Department</Text>
                  <Text fw={500}>{procurement.department}</Text>
                </div>
                <div>
                  <Text size="sm" c="dimmed">Cost Center</Text>
                  <Text fw={500}>{procurement.costCenter}</Text>
                </div>
                <div>
                  <Text size="sm" c="dimmed">Procurement Officer</Text>
                  <Text fw={500}>{procurement.procurementOfficer}</Text>
                </div>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap="md">
                <div>
                  <Text size="sm" c="dimmed">Submitted Date</Text>
                  <Text fw={500}>{procurement.submittedDate}</Text>
                </div>
                <div>
                  <Text size="sm" c="dimmed">Approved Date</Text>
                  <Text fw={500}>{procurement.approvedDate}</Text>
                </div>
                <div>
                  <Text size="sm" c="dimmed">Procurement Start Date</Text>
                  <Text fw={500}>{procurement.procurementStartDate}</Text>
                </div>
                <div>
                  <Text size="sm" c="dimmed">Requested Delivery</Text>
                  <Text fw={500}>{procurement.requestedDeliveryDate}</Text>
                </div>
              </Stack>
            </Grid.Col>
          </Grid>

          <Divider />

          {/* Business Justification */}
          <div>
            <Title order={4} mb="md">
              Business Justification
            </Title>
            <Text size="sm" c="dimmed">
              {procurement.businessJustification}
            </Text>
          </div>

          <Divider />

          {/* Items Table */}
          <div>
            <Group justify="space-between" mb="md">
              <Title order={4}>
                Items
              </Title>
            </Group>
            
            {viewingService && (() => {
              const service = procurement.items.find(item => item.id === viewingService);
              if (!service) return null;
              return (
                <div>
                  <Group justify="space-between" mb="md">
                    <Text fw={600}>Booking Details - {service.name}</Text>
                    <Button size="xs" variant="outline" onClick={() => setViewingService(null)}>
                      Back to Items
                    </Button>
                  </Group>
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
                  </div>
                </div>
              );
            })()}

            {!viewingService && (
              <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Item</Table.Th>
                  <Table.Th>Category</Table.Th>
                  <Table.Th>Supplier</Table.Th>
                  <Table.Th style={{ textAlign: 'center' }}>Quantity</Table.Th>
                  <Table.Th style={{ textAlign: 'right' }}>Unit Price</Table.Th>
                  <Table.Th style={{ textAlign: 'right' }}>Total</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {procurement.items.map((item) => (
                  <Table.Tr key={item.id}>
                    <Table.Td>
                      <div 
                        style={{ cursor: item.id.startsWith('SRV-') ? 'pointer' : 'default' }}
                        onClick={() => item.id.startsWith('SRV-') && setViewingService(item.id)}
                      >
                        <Text fw={500}>{item.name}</Text>
                        {item.id.startsWith('SRV-') && (
                          <Badge size="xs" variant="light" color="blue" mt={2}>
                            Service - Click to view details
                          </Badge>
                        )}
                      </div>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm">{item.category}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm">{item.supplier}</Text>
                    </Table.Td>
                    <Table.Td style={{ textAlign: 'center' }}>
                      <Text>{item.quantity}</Text>
                    </Table.Td>
                    <Table.Td style={{ textAlign: 'right' }}>
                      <Text>{formatCurrency(item.unitPrice)}</Text>
                    </Table.Td>
                    <Table.Td style={{ textAlign: 'right' }}>
                      <Text fw={500}>{formatCurrency(item.total)}</Text>
                    </Table.Td>
                  </Table.Tr>
                ))}
                </Table.Tbody>
              </Table>
            )}
          </div>

          {!viewingService && (
            <>
              <Divider />
              {/* Totals */}
              <Group justify="flex-end">
                <Stack gap="xs" style={{ minWidth: 250 }}>
                  <Group justify="space-between">
                    <Text>Subtotal:</Text>
                    <Text>{formatCurrency(procurement.subtotal)}</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text>Tax (18%):</Text>
                    <Text>{formatCurrency(procurement.tax)}</Text>
                  </Group>
                  <Divider />
                  <Group justify="space-between">
                    <Text fw={600} size="lg">Total:</Text>
                    <Text fw={600} size="lg">{formatCurrency(procurement.total)}</Text>
                  </Group>
                </Stack>
              </Group>
            </>
          )}

          {/* Footer */}
          <Group justify="space-between" mt="xl" pt="md" style={{ borderTop: '1px solid #e9ecef' }}>
            <div>
              <Text size="sm" c="dimmed">Delivery Location</Text>
              <Text fw={500}>{procurement.deliveryLocation}</Text>
            </div>
            {purchaseOrderId && (
              <div style={{ textAlign: 'right' }}>
                <Text size="sm" c="dimmed">Purchase Order</Text>
                <Text fw={500} c="blue">{purchaseOrderId}</Text>
              </div>
            )}
          </Group>
        </Stack>
      </Card>

      {/* Documents Card */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title order={4} mb="md">
          Associated Documents
        </Title>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Document Type</Table.Th>
              <Table.Th>Document ID</Table.Th>
              <Table.Th>Created Date</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td>
                <Group gap="xs">
                  <IconFileText size={16} />
                  <Text fw={500}>Purchase Order</Text>
                </Group>
              </Table.Td>
              <Table.Td>
                <Text c="blue" fw={500}>{purchaseOrderId || 'PO-2025-001'}</Text>
              </Table.Td>
              <Table.Td>
                <Text size="sm">Jan 16, 2025</Text>
              </Table.Td>
              <Table.Td>
                <Badge color="green" variant="light">Active</Badge>
              </Table.Td>
              <Table.Td>
                <Group gap="xs">
                  <ActionIcon
                    variant="subtle"
                    color="blue"
                    component={Link}
                    href={`/application/purchase-orders/${purchaseOrderId || 'PO-2025-001'}`}
                  >
                    <IconEye size={16} />
                  </ActionIcon>
                  <ActionIcon variant="subtle" color="gray">
                    <IconDownload size={16} />
                  </ActionIcon>
                </Group>
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>
                <Group gap="xs">
                  <IconFileText size={16} />
                  <Text fw={500}>RFQ Document</Text>
                </Group>
              </Table.Td>
              <Table.Td>
                <Text c="blue" fw={500}>RFQ-2025-007</Text>
              </Table.Td>
              <Table.Td>
                <Text size="sm">Jan 15, 2025</Text>
              </Table.Td>
              <Table.Td>
                <Badge color="blue" variant="light">Sent</Badge>
              </Table.Td>
              <Table.Td>
                <Group gap="xs">
                  <ActionIcon variant="subtle" color="blue">
                    <IconEye size={16} />
                  </ActionIcon>
                  <ActionIcon variant="subtle" color="gray">
                    <IconDownload size={16} />
                  </ActionIcon>
                </Group>
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>
                <Group gap="xs">
                  <IconFileText size={16} />
                  <Text fw={500}>Quotation</Text>
                </Group>
              </Table.Td>
              <Table.Td>
                <Text c="blue" fw={500}>QUO-2025-012</Text>
              </Table.Td>
              <Table.Td>
                <Text size="sm">Jan 16, 2025</Text>
              </Table.Td>
              <Table.Td>
                <Badge color="green" variant="light">Received</Badge>
              </Table.Td>
              <Table.Td>
                <Group gap="xs">
                  <ActionIcon variant="subtle" color="blue">
                    <IconEye size={16} />
                  </ActionIcon>
                  <ActionIcon variant="subtle" color="gray">
                    <IconDownload size={16} />
                  </ActionIcon>
                </Group>
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Card>
      
      {/* Floating Chat Widget */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        width: chatExpanded ? '350px' : '60px',
        height: chatExpanded ? '450px' : '60px',
        transition: 'all 0.3s ease'
      }}>
        {chatExpanded ? (
          <Card shadow="lg" padding="md" radius="md" withBorder style={{ height: '100%' }}>
            <Group justify="space-between" mb="md">
              <Group gap="xs">
                <IconMessage size={18} />
                <Text size="sm" fw={500}>Procurement Chat</Text>
              </Group>
              <ActionIcon 
                variant="subtle" 
                size="sm"
                onClick={() => setChatExpanded(false)}
              >
                <IconChevronDown size={16} />
              </ActionIcon>
            </Group>
            
            <ScrollArea h={280} mb="md">
              <Stack gap="sm">
                {messages.map((msg) => (
                  <div key={msg.id}>
                    <Group gap="xs" mb={4}>
                      <Avatar size={20} radius="xl" color={msg.isOfficer ? "blue" : "cyan"}>
                        {msg.sender.split(' ').map(n => n[0]).join('')}
                      </Avatar>
                      <div>
                        <Text size="xs" fw={500}>{msg.sender}</Text>
                      </div>
                      <Text size="xs" c="dimmed" ml="auto">{msg.timestamp.split(' ')[1]}</Text>
                    </Group>
                    <Card 
                      p="xs" 
                      ml={24}
                      style={{ 
                        backgroundColor: msg.isOfficer ? '#f0f8ff' : '#f8f9fa',
                        border: '1px solid #e9ecef'
                      }}
                    >
                      <Text size="xs">{msg.message}</Text>
                    </Card>
                  </div>
                ))}
              </Stack>
            </ScrollArea>
            
            <Group gap="xs">
              <TextInput
                placeholder="Type message..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.currentTarget.value)}
                size="xs"
                style={{ flex: 1 }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && chatMessage.trim()) {
                    const newMessage = {
                      id: messages.length + 1,
                      sender: "Demo User",
                      role: "Requester",
                      message: chatMessage.trim(),
                      timestamp: new Date().toLocaleString(),
                      isOfficer: false
                    };
                    setMessages([...messages, newMessage]);
                    setChatMessage("");
                  }
                }}
              />
              <ActionIcon 
                variant="filled" 
                size="sm"
                disabled={!chatMessage.trim()}
                onClick={() => {
                  if (chatMessage.trim()) {
                    const newMessage = {
                      id: messages.length + 1,
                      sender: "Demo User",
                      role: "Requester",
                      message: chatMessage.trim(),
                      timestamp: new Date().toLocaleString(),
                      isOfficer: false
                    };
                    setMessages([...messages, newMessage]);
                    setChatMessage("");
                  }
                }}
              >
                <IconSend size={12} />
              </ActionIcon>
            </Group>
          </Card>
        ) : (
          <ActionIcon
            size={60}
            radius="xl"
            variant="filled"
            color="blue"
            onClick={() => setChatExpanded(true)}
            style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
          >
            <IconMessage size={24} />
          </ActionIcon>
        )}
      </div>
    </Stack>
  )
}