"use client";

import { ContentContainer } from "@/components/layout/content-container";
import { getStatusColor, getPriorityColor } from "@/lib/utils/helpers";
import {
  Card,
  Text,
  Group,
  Button,
  Stack,
  Title,
  Badge,
  Table,
  Grid,
  ActionIcon,
  Avatar,
  Modal,
  TextInput,
  ScrollArea,
  Divider,
  Radio,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconDownload,
  IconUser,
  IconCalendar,
  IconCurrencyDollar,
  IconPackage,
  IconFileText,
  IconSend,
  IconMessage,
  IconChevronDown,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProcurementProcessor, type RequisitionItem } from "@/lib/utils/procurement-requisitions-processor";

interface ViewRequisitionProps {
  params: { requisition_id: string };
}

export default function ViewRequisition({ params }: ViewRequisitionProps) {
  const router = useRouter();
  const { requisition_id } = params;

  const [processModalOpen, setProcessModalOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatExpanded, setChatExpanded] = useState(false);
  const [inStockChoices, setInStockChoices] = useState<{[key: string]: 'use_stock' | 'purchase_new'}>({});
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
  ]);

  const requisitionItems: RequisitionItem[] = [
    { id: "CAT-001", name: "Ergonomic Office Chair", category: "Furniture", quantity: 2, unitPrice: 38999, totalPrice: 77998, stockLevel: 5 },
    { id: "CAT-002", name: "Laptop - Dell XPS 15", category: "IT Equipment", quantity: 1, unitPrice: 194999, totalPrice: 194999, stockLevel: 3 },
    { id: "CAT-003", name: "Printer Paper (500 sheets)", category: "Office Supplies", quantity: 5, unitPrice: 1689, totalPrice: 8445, stockLevel: 0 },
  ];

  const requisition = {
    id: requisition_id,
    title: "Q1 Office Equipment",
    status: "In Procurement",
    priority: "High",
    amount: "KES 281,443",
    createdDate: "2025-01-15",
    requestedBy: "Demo User",
    department: "General",
    approver: "John Smith",
    items: requisitionItems,
  };

  const analysis = ProcurementProcessor.analyzeRequisition(requisitionItems);
  const { inStockItems, outOfStockItems } = analysis;

  const handleProcessRequisition = () => {
    setProcessModalOpen(true);
  };

  const confirmProcess = async () => {
    setProcessing(true);
    try {
      const result = await ProcurementProcessor.processRequisition(
        requisition.id, 
        requisitionItems
      );
      
      console.log('Processing complete:', result);
      setProcessModalOpen(false);
      
      // Update requisition status to "In Procurement"
      // In a real app, this would be an API call
      console.log(`Requisition ${requisition.id} status updated to "In Procurement"`);
      
      // Navigate based on what was created
      if (result.materialReceiptId && result.rfqIds) {
        // Both created - stay on requisition page with success message
        alert(`Material Receipt ${result.materialReceiptId} and RFQ ${result.rfqIds[0]} created successfully`);
      } else if (result.materialReceiptId) {
        router.push(`/application/material-receipts/${result.materialReceiptId}`);
      } else if (result.rfqIds && result.rfqIds.length > 0) {
        router.push(`/application/rfqs/${result.rfqIds[0]}`);
      }
    } catch (error) {
      console.error('Error processing requisition:', error);
      alert('Error processing requisition. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ContentContainer>
      <Stack gap="lg">
        <Group justify="space-between">
          <Group>
            <ActionIcon variant="subtle" size="lg" onClick={() => router.back()}>
              <IconArrowLeft size={20} />
            </ActionIcon>
            <div>
              <Title order={2}>{requisition.title}</Title>
              <Text c="dimmed" size="sm">Requisition {requisition.id}</Text>
            </div>
          </Group>
          <Group>
            <Button leftSection={<IconDownload size={16} />} variant="outline">
              Export
            </Button>
            {requisition.status === "Approved" && (
              <Button 
                leftSection={<IconPackage size={16} />} 
                onClick={handleProcessRequisition}
              >
                Process Requisition
              </Button>
            )}
          </Group>
        </Group>

        <Grid gutter="lg">
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Stack gap="lg">
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Title order={4} mb="md">Request Details</Title>
                <Grid>
                  <Grid.Col span={6}>
                    <Group gap="xs" mb="sm">
                      <IconUser size={16} />
                      <Text size="sm" fw={500}>Requested By</Text>
                    </Group>
                    <Text size="sm" c="dimmed" mb="md">{requisition.requestedBy}</Text>
                    <Group gap="xs" mb="sm">
                      <IconCalendar size={16} />
                      <Text size="sm" fw={500}>Created Date</Text>
                    </Group>
                    <Text size="sm" c="dimmed">{requisition.createdDate}</Text>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Text size="sm" fw={500} mb="xs">Department</Text>
                    <Text size="sm" c="dimmed" mb="md">{requisition.department}</Text>
                    <Group gap="xs" mb="sm">
                      <IconCurrencyDollar size={16} />
                      <Text size="sm" fw={500}>Total Amount</Text>
                    </Group>
                    <Text size="sm" fw={600}>{requisition.amount}</Text>
                  </Grid.Col>
                </Grid>
              </Card>

              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Title order={4} mb="md">Requested Items</Title>
                <Table highlightOnHover>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Item</Table.Th>
                      <Table.Th>Category</Table.Th>
                      <Table.Th>Quantity</Table.Th>
                      <Table.Th>Unit Price</Table.Th>
                      <Table.Th>Stock Level</Table.Th>
                      <Table.Th>Total</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {requisition.items.map((item) => (
                      <Table.Tr key={item.id}>
                        <Table.Td>
                          {item.category === "Travel" || item.category === "Transport" || item.category === "Professional Services" ? (
                            <div>
                              <Text 
                                size="sm" 
                                fw={500}
                                style={{ cursor: "pointer", textDecoration: "underline" }}
                                c="blue"
                                onClick={() => router.push(`/application/cart/non-tangible/${item.id}`)}
                              >
                                {item.name}
                              </Text>
                              <Text size="xs" c="dimmed">{item.id}</Text>
                            </div>
                          ) : (
                            <div>
                              <Text size="sm" fw={500}>{item.name}</Text>
                              <Text size="xs" c="dimmed">{item.id}</Text>
                            </div>
                          )}
                        </Table.Td>
                        <Table.Td>
                          <Badge variant="light" size="sm">{item.category}</Badge>
                        </Table.Td>
                        <Table.Td><Text size="sm">{item.quantity}</Text></Table.Td>
                        <Table.Td><Text size="sm">KES {item.unitPrice.toLocaleString()}</Text></Table.Td>
                        <Table.Td>
                          <Badge 
                            variant="light" 
                            color={(item.stockLevel || 0) >= item.quantity ? "green" : "red"}
                            size="sm"
                          >
                            {item.stockLevel || 0}
                          </Badge>
                        </Table.Td>
                        <Table.Td><Text size="sm" fw={600}>KES {item.totalPrice.toLocaleString()}</Text></Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
                <Group justify="flex-end" mt="md">
                  <Text size="lg" fw={700}>Total: {requisition.amount}</Text>
                </Group>
              </Card>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={4} mb="md">Status</Title>
              <Group justify="space-between" mb="md">
                <Badge size="lg" variant="light" color={getStatusColor(requisition.status)}>
                  {requisition.status}
                </Badge>
                <Badge size="sm" variant="dot" color={getPriorityColor(requisition.priority)}>
                  {requisition.priority}
                </Badge>
              </Group>
              <Text size="sm" fw={500} mb="xs">Approver</Text>
              <Group gap="xs">
                <Avatar size={24} radius="xl" color="cyan">JS</Avatar>
                <Text size="sm">{requisition.approver}</Text>
              </Group>
              
              {requisition.status === "In Procurement" && inStockItems.length > 0 && (
                <div>
                  <Divider my="md" />
                  <Text size="sm" fw={500} mb="md">In-Stock Items Decision</Text>
                  <Stack gap="sm">
                    {inStockItems.map((item) => (
                      <Card key={item.id} p="sm" withBorder>
                        <Text size="sm" fw={500} mb="xs">{item.name}</Text>
                        <Text size="xs" c="dimmed" mb="sm">Stock: {item.stockLevel} | Needed: {item.quantity}</Text>
                        <Radio.Group
                          value={inStockChoices[item.id] || ''}
                          onChange={(value) => setInStockChoices(prev => ({...prev, [item.id]: value as 'use_stock' | 'purchase_new'}))}
                        >
                          <Stack gap="xs">
                            <Radio value="use_stock" label="Use in-stock items" size="sm" />
                            <Radio value="purchase_new" label="Purchase new items" size="sm" />
                          </Stack>
                        </Radio.Group>
                      </Card>
                    ))}
                  </Stack>
                </div>
              )}
            </Card>
          </Grid.Col>
        </Grid>

        <Modal 
          opened={processModalOpen} 
          onClose={() => setProcessModalOpen(false)} 
          title="Process Requisition" 
          size="lg"
        >
          <Stack gap="md">
            <Text fw={600}>Stock Analysis & Processing Plan</Text>
            
            {inStockItems.length > 0 && (
              <Card withBorder>
                <Group mb="md">
                  <IconPackage size={20} color="green" />
                  <Text fw={600} c="green">Material Receipt - In Stock Items</Text>
                </Group>
                <Table>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Item</Table.Th>
                      <Table.Th>Quantity</Table.Th>
                      <Table.Th>Stock</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {inStockItems.map((item) => (
                      <Table.Tr key={item.id}>
                        <Table.Td>{item.name}</Table.Td>
                        <Table.Td>{item.quantity}</Table.Td>
                        <Table.Td>
                          <Badge variant="light" color="green" size="sm">
                            {item.stockLevel}
                          </Badge>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </Card>
            )}

            {outOfStockItems.length > 0 && (
              <Card withBorder>
                <Group mb="md">
                  <IconFileText size={20} color="orange" />
                  <Text fw={600} c="orange">RFQ - Out of Stock Items</Text>
                </Group>
                <Table>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Item</Table.Th>
                      <Table.Th>Quantity</Table.Th>
                      <Table.Th>Stock</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {outOfStockItems.map((item) => (
                      <Table.Tr key={item.id}>
                        <Table.Td>{item.name}</Table.Td>
                        <Table.Td>{item.quantity}</Table.Td>
                        <Table.Td>
                          <Badge variant="light" color="red" size="sm">
                            {item.stockLevel}
                          </Badge>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </Card>
            )}

            <Text size="sm" c="dimmed" mt="md">
              This will create material receipts for in-stock items and RFQs for out-of-stock items.
            </Text>
            
            <Group justify="flex-end" gap="md">
              <Button variant="outline" onClick={() => setProcessModalOpen(false)} disabled={processing}>
                Cancel
              </Button>
              <Button onClick={confirmProcess} loading={processing}>
                {processing ? "Processing..." : "Process Requisition"}
              </Button>
            </Group>
          </Stack>
        </Modal>
        
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
    </ContentContainer>
  );
}
