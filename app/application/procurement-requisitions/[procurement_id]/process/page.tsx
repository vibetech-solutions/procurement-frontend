"use client";

import { ContentContainer } from "@/components/layout/content-container";
import { suppliers, approvalsPendingReview, procurementDetails, customerFeedback, noStockRequisitions } from "@/lib/utils/constants";
import {
  Card,
  Text,
  Group,
  Button,
  Stack,
  Title,
  Checkbox,
  ActionIcon,
  Badge,
  Avatar,
  TextInput,
  ScrollArea,
  Grid,
  MultiSelect,
  Select,
} from "@mantine/core";
import { IconArrowLeft, IconMessage, IconChevronDown, IconSend, IconCheck, IconX, IconAlertCircle } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProcessProcurementProps {
  params: { procurement_id: string };
}

export default function ProcessProcurement({ params }: ProcessProcurementProps) {
  const router = useRouter();
  const { procurement_id } = params;
  
  const [itemSuppliers, setItemSuppliers] = useState<{[key: string]: string[]}>({});
  const [itemDirectPO, setItemDirectPO] = useState<{[key: string]: boolean}>({});
  const [chatExpanded, setChatExpanded] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Mike Davis",
      role: "Procurement Officer",
      message: "I'm reviewing the supplier selections for this requisition. The items look good for procurement.",
      timestamp: "2025-01-16 10:30 AM",
      isOfficer: true
    },
    {
      id: 2,
      sender: "Demo User",
      role: "Requester",
      message: "Thanks! I've selected the preferred suppliers for each item. Please let me know if you need any changes.",
      timestamp: "2025-01-16 11:15 AM",
      isOfficer: false
    }
  ]);

  // Find the requisition (in real app, this would be an API call)
  const selectedRequisition = approvalsPendingReview.find(req => req.id === procurement_id);
  
  // Get items from procurement details (mock data)
  const items = procurementDetails.items;

  const handleProcurementSubmit = () => {
    // Logic will be implemented later
    console.log('Processing:', procurement_id, 'Item Suppliers:', itemSuppliers, 'Item Direct PO:', itemDirectPO);
    router.push('/application/procurement-requisitions');
  };



  if (!selectedRequisition) {
    return (
      <ContentContainer>
        <Text>Requisition not found</Text>
      </ContentContainer>
    );
  }

  return (
    <ContentContainer>
      <Stack gap="lg">
        <Group justify="space-between">
          <Group>
            <ActionIcon variant="subtle" size="lg" onClick={() => router.back()}>
              <IconArrowLeft size={20} />
            </ActionIcon>
            <div>
              <Title order={2}>Process Procurement</Title>
              <Text c="dimmed" size="sm">
                Manage procurement for requisition {procurement_id}
              </Text>
            </div>
          </Group>
        </Group>

        <Grid gutter="lg">
          <Grid.Col span={6}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={4} mb="md">Requisition Details</Title>
              <Stack gap="sm">
                <Text fw={600}>{selectedRequisition.title}</Text>
                <Text size="sm" c="dimmed">Requisition ID: {selectedRequisition.id}</Text>
                <Text size="sm" c="dimmed">Amount: {selectedRequisition.amount}</Text>
                <Text size="sm" c="dimmed">Department: {selectedRequisition.department}</Text>
                <Text size="sm" c="dimmed">Requester: {selectedRequisition.requester}</Text>
              </Stack>
            </Card>
          </Grid.Col>
          
          <Grid.Col span={6}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={4} mb="md">Customer Feedback</Title>
              {customerFeedback[procurement_id as keyof typeof customerFeedback] ? (
                <Stack gap="sm">
                  {customerFeedback[procurement_id as keyof typeof customerFeedback]?.itemFeedback.map((feedback) => (
                    <Card key={feedback.itemId} withBorder p="sm">
                      <Group justify="space-between" align="flex-start">
                        <div style={{ flex: 1 }}>
                          <Text size="sm" fw={500}>{feedback.itemName}</Text>
                          <Group gap="xs" mt={4}>
                            {feedback.inStock ? (
                              <Badge color="green" size="xs" leftSection={<IconCheck size={12} />}>
                                In Stock
                              </Badge>
                            ) : (
                              <Badge color="red" size="xs" leftSection={<IconX size={12} />}>
                                Out of Stock
                              </Badge>
                            )}
                            <Badge variant="light" size="xs">
                              {feedback.customerPreference}
                            </Badge>
                          </Group>
                          <Text size="xs" c="dimmed" mt={4}>{feedback.feedback}</Text>
                        </div>
                      </Group>
                    </Card>
                  ))}
                </Stack>
              ) : noStockRequisitions.includes(procurement_id) ? (
                <Group gap="sm">
                  <IconAlertCircle size={20} color="orange" />
                  <div>
                    <Text size="sm" fw={500} c="orange">No Items in Stock</Text>
                    <Text size="xs" c="dimmed">All items require RFQ process. You may proceed with supplier selection.</Text>
                  </div>
                </Group>
              ) : (
                <Text size="sm" c="dimmed">No customer feedback available for this requisition.</Text>
              )}
            </Card>
          </Grid.Col>
        </Grid>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="md">



            <Stack gap="md">
              <Group justify="space-between">
                <Text fw={500}>Select Suppliers for Items</Text>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const allSupplierIds = suppliers.map(s => s.id);
                    const newItemSuppliers: {[key: string]: string[]} = {};
                    items.forEach(item => {
                      if (!itemDirectPO[item.id]) {
                        newItemSuppliers[item.id] = allSupplierIds;
                      } else {
                        newItemSuppliers[item.id] = itemSuppliers[item.id] || [];
                      }
                    });
                    setItemSuppliers(newItemSuppliers);
                  }}
                >
                  Select All Suppliers (RFQ Items Only)
                </Button>
              </Group>
              {items.map((item) => (
                <Card key={item.id} withBorder p="md">
                  <Stack gap="sm">
                    <Group justify="space-between" align="flex-start">
                      <div style={{ flex: 1 }}>
                        <Text fw={500} size="sm">{item.name}</Text>
                        <Text size="xs" c="dimmed">{item.id}</Text>
                        <Badge variant="light" size="sm" mt="xs">{item.category}</Badge>
                        <Group gap="md" mt="xs">
                          <Text size="xs" c="dimmed">Qty: {item.quantity}</Text>
                          <Text size="xs" c="dimmed">Unit: KES {item.unitPrice.toLocaleString()}</Text>
                          <Text size="xs" fw={500}>Total: KES {item.total.toLocaleString()}</Text>
                        </Group>
                      </div>
                      <div style={{ width: 250 }}>
                        <Group gap="xs" mb={4}>
                          <Text size="xs" c="dimmed">Select Suppliers</Text>
                          {!itemDirectPO[item.id] && (
                            <Button
                              size="xs"
                              variant="subtle"
                              onClick={() => setItemSuppliers(prev => ({ 
                                ...prev, 
                                [item.id]: suppliers.map(s => s.id) 
                              }))}
                            >
                              Select All for Item
                            </Button>
                          )}
                        </Group>
                        {itemDirectPO[item.id] ? (
                          <Select
                            placeholder="Select supplier"
                            data={suppliers.map(s => ({ value: s.id, label: s.name }))}
                            value={(itemSuppliers[item.id] || [])[0] || null}
                            onChange={(value) => setItemSuppliers(prev => ({ 
                              ...prev, 
                              [item.id]: value ? [value] : [] 
                            }))}
                            searchable
                            clearable
                          />
                        ) : (
                          <MultiSelect
                            placeholder="Select suppliers"
                            data={suppliers.map(s => ({ value: s.id, label: s.name }))}
                            value={itemSuppliers[item.id] || []}
                            onChange={(values) => setItemSuppliers(prev => ({ ...prev, [item.id]: values }))}
                            searchable
                            clearable
                          />
                        )}
                      </div>
                    </Group>
                    
                    <Checkbox
                      label="Create Purchase Order directly (skip RFQ process)"
                      checked={itemDirectPO[item.id] || false}
                      onChange={(event) => {
                        const checked = event.currentTarget.checked;
                        setItemDirectPO(prev => ({ ...prev, [item.id]: checked }));
                        if (checked && itemSuppliers[item.id]?.length > 1) {
                          setItemSuppliers(prev => ({ 
                            ...prev, 
                            [item.id]: [itemSuppliers[item.id][0]] 
                          }));
                        }
                      }}
                    />
                  </Stack>
                </Card>
              ))}
            </Stack>

            <Text size="sm" c="dimmed">
              Items with direct PO will create purchase orders immediately. Items without direct PO will send RFQs to selected suppliers via email.
            </Text>

            <Group justify="flex-end" gap="sm">
              <Button variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button 
                onClick={handleProcurementSubmit}
                disabled={Object.keys(itemSuppliers).length === 0 || Object.values(itemSuppliers).some(suppliers => suppliers.length === 0)}
              >
                Process Items
              </Button>
            </Group>
          </Stack>
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
    </ContentContainer>
  );
}