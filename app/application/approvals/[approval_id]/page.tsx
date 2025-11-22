"use client"

import { requisitionDetails, timeline } from "@/lib/utils/constants"
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
  Textarea,
  Timeline,
  Avatar,
} from "@mantine/core"
import { IconCheck, IconX, IconArrowBack, IconFileText } from "@tabler/icons-react"
import { useState } from "react"

export default function ApprovalDetailPage() {
  const [comment, setComment] = useState("");
  const [viewingService, setViewingService] = useState<string | null>(null);
  
  const subtotal = requisitionDetails.items.reduce((sum, item) => sum + item.total, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  const handleRequestChanges = () => {
    if (!comment.trim()) return;
    // Handle request changes logic here
  };

  return (
    <Stack gap="lg">
        <Group justify="space-between">
          <Group>
            <Button variant="subtle" leftSection={<IconArrowBack size={16} />} component="a" href="/application/approvals">
              Back to Approvals
            </Button>
            <div>
              <Title order={2} mb="xs">
                {requisitionDetails.title}
              </Title>
              <Text c="dimmed" size="sm">
                {requisitionDetails.id}
              </Text>
            </div>
          </Group>
          <Badge size="lg" variant="light" color="orange">
            {requisitionDetails.status}
          </Badge>
        </Group>

        <Grid gutter="lg">
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Stack gap="md">
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Text fw={600} size="lg" mb="md">
                  Requisition Details
                </Text>

                <Grid gutter="md">
                  <Grid.Col span={6}>
                    <Text size="xs" c="dimmed">
                      Requester
                    </Text>
                    <Group gap="xs" mt={4}>
                      <Avatar size="sm" radius="xl" color="cyan">
                        JD
                      </Avatar>
                      <Text size="sm" fw={500}>
                        {requisitionDetails.requester}
                      </Text>
                    </Group>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Text size="xs" c="dimmed">
                      Department
                    </Text>
                    <Text size="sm" fw={500} mt={4}>
                      {requisitionDetails.department}
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Text size="xs" c="dimmed">
                      Cost Center
                    </Text>
                    <Text size="sm" fw={500} mt={4}>
                      {requisitionDetails.costCenter}
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Text size="xs" c="dimmed">
                      Priority
                    </Text>
                    <Badge size="sm" variant="dot" color="orange" mt={4}>
                      {requisitionDetails.priority}
                    </Badge>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Text size="xs" c="dimmed">
                      Submitted Date
                    </Text>
                    <Text size="sm" fw={500} mt={4}>
                      {requisitionDetails.submittedDate}
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Text size="xs" c="dimmed">
                      Requested Delivery
                    </Text>
                    <Text size="sm" fw={500} mt={4}>
                      {requisitionDetails.requestedDeliveryDate}
                    </Text>
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <Text size="xs" c="dimmed">
                      Delivery Location
                    </Text>
                    <Text size="sm" fw={500} mt={4}>
                      {requisitionDetails.deliveryLocation}
                    </Text>
                  </Grid.Col>
                </Grid>

                <Divider my="md" />

                <div>
                  <Text size="sm" fw={600} mb="xs">
                    Business Justification
                  </Text>
                  <Text size="sm" c="dimmed">
                    {requisitionDetails.businessJustification}
                  </Text>
                </div>
              </Card>

              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="space-between" mb="md">
                  <Text fw={600} size="lg">
                    Items ({requisitionDetails.items.length})
                  </Text>
                </Group>
                
                {viewingService && (() => {
                  const service = requisitionDetails.items.find(item => item.id === viewingService);
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
                      <Table.Th>Qty</Table.Th>
                      <Table.Th>Unit Price</Table.Th>
                      <Table.Th>Total</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {requisitionDetails.items.map((item) => (
                      <Table.Tr key={item.id}>
                        <Table.Td>
                          <div 
                            style={{ cursor: item.id.startsWith('SRV-') ? 'pointer' : 'default' }}
                            onClick={() => item.id.startsWith('SRV-') && setViewingService(item.id)}
                          >
                            <Text size="sm" fw={500}>
                              {item.name}
                            </Text>
                            <Text size="xs" c="dimmed">
                              {item.id}
                            </Text>
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
                        <Table.Td>
                          <Text size="sm">{item.quantity}</Text>
                        </Table.Td>
                        <Table.Td>
                          <Text size="sm">${item.unitPrice.toFixed(2)}</Text>
                        </Table.Td>
                        <Table.Td>
                          <Text size="sm" fw={600}>
                            ${item.total.toFixed(2)}
                          </Text>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                    </Table.Tbody>
                  </Table>
                )}

                {!viewingService && (
                  <>
                    <Divider my="md" />
                    <Stack gap="xs">
                      <Group justify="space-between">
                        <Text size="sm">Subtotal</Text>
                        <Text size="sm" fw={500}>
                          ${subtotal.toFixed(2)}
                        </Text>
                      </Group>
                      <Group justify="space-between">
                        <Text size="sm">Tax (10%)</Text>
                        <Text size="sm" fw={500}>
                          ${tax.toFixed(2)}
                        </Text>
                      </Group>
                      <Divider />
                      <Group justify="space-between">
                        <Text size="md" fw={600}>
                          Total
                        </Text>
                        <Text size="lg" fw={700} c="cyan">
                          ${total.toFixed(2)}
                        </Text>
                      </Group>
                    </Stack>
                  </>
                )}
              </Card>

              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Text fw={600} size="lg" mb="md">
                  Approval Decision
                </Text>

                <Textarea
                  label="Comments/Description"
                  placeholder="Add comments, feedback, or describe changes needed for the requester..."
                  rows={4}
                  mb="md"
                  description="Use this field to provide feedback for approval or request specific changes."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />

                <Group gap="md">
                  <Button leftSection={<IconCheck size={16} />} color="green" size="lg" flex={1}>
                    Approve
                  </Button>
                  <Button 
                    leftSection={<IconFileText size={16} />} 
                    color="yellow" 
                    variant="light" 
                    size="lg" 
                    flex={1}
                    onClick={handleRequestChanges}
                    disabled={!comment.trim()}
                  >
                    Request Changes
                  </Button>
                  <Button leftSection={<IconX size={16} />} color="red" variant="light" size="lg" flex={1}>
                    Reject 
                  </Button>
                </Group>
              </Card>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="md">
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Text fw={600} size="lg" mb="md">
                  Approval Timeline
                </Text>

                <Timeline active={1} bulletSize={24} lineWidth={2}>
                  {timeline.map((event, index) => (
                    <Timeline.Item
                      key={index}
                      bullet={<event.icon size={12} />}
                      title={event.title}
                      color={event.color}
                    >
                      <Text size="xs" c="dimmed" mt={4}>
                        {event.description}
                      </Text>
                      <Text size="xs" c="dimmed" mt={4}>
                        {event.date}
                      </Text>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </Card>

              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Text fw={600} size="lg" mb="md">
                  Quick Actions
                </Text>
                <Stack gap="sm">
                  <Button variant="light" size="sm" fullWidth>
                    Download PDF
                  </Button>
                  <Button variant="light" size="sm" fullWidth>
                    Contact Requester
                  </Button>
                  <Button variant="light" size="sm" fullWidth>
                    View Catalogue Items
                  </Button>
                </Stack>
              </Card>
            </Stack>
          </Grid.Col>
        </Grid>
    </Stack>
  )
}
