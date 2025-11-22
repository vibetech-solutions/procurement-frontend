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
} from "@mantine/core"
import { IconArrowLeft, IconCheck, IconX } from "@tabler/icons-react"
import { useState } from "react"
import Link from "next/link"

const quotationData = {
  id: "Q-001",
  rfqId: "RFQ-001",
  supplier: "TechCorp Solutions",
  amount: 15499.99,
  status: "Pending Review",
  submittedDate: "2025-01-18",
  validUntil: "2025-02-15",
  items: [
    { name: "Dell Server R740", quantity: 2, unitPrice: 5500.00, total: 11000.00, stockLevel: 0, isLowestPrice: true, selectionReason: "" },
    { name: "Network Switch", quantity: 1, unitPrice: 2499.99, total: 2499.99, stockLevel: 5, isLowestPrice: false, selectionReason: "Better warranty terms and local support" },
    { name: "Installation Service", quantity: 1, unitPrice: 2000.00, total: 2000.00, stockLevel: 0, isLowestPrice: true, selectionReason: "" }
  ]
}

function getStatusColor(status: string) {
  switch (status) {
    case "Pending Review": return "orange"
    case "Accepted": return "green"
    case "Rejected": return "red"
    default: return "gray"
  }
}

function formatCurrency(amount: number) {
  return `KES ${amount.toLocaleString()}`
}

export default function QuotationDetailPage() {
  const [rejectModalOpen, setRejectModalOpen] = useState(false)
  const [approveModalOpen, setApproveModalOpen] = useState(false)

  const handleReject = () => {
    setRejectModalOpen(false)
    // Handle rejection logic
  }

  const handleApprove = () => {
    setApproveModalOpen(false)
    // Handle approval logic
  }

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Button
          variant="subtle"
          leftSection={<IconArrowLeft size={16} />}
          component={Link}
          href="/application/quotations"
        >
          Back to Quotations
        </Button>
      </Group>

      <Card shadow="sm" padding="xl" radius="md" withBorder>
        <Stack gap="lg">
          <Group justify="space-between" align="flex-start">
            <div>
              <Title order={2} mb="xs">
                Quotation {quotationData.id}
              </Title>
              <Text size="lg" fw={600} c="blue">
                RFQ: {quotationData.rfqId}
              </Text>
            </div>
            <Badge size="lg" variant="light" color={getStatusColor(quotationData.status)}>
              {quotationData.status}
            </Badge>
          </Group>

          <Divider />

          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap="md">
                <div>
                  <Text size="sm" c="dimmed">Supplier</Text>
                  <Text fw={500}>{quotationData.supplier}</Text>
                </div>
                <div>
                  <Text size="sm" c="dimmed">Total Amount</Text>
                  <Text fw={600} size="lg">{formatCurrency(quotationData.amount)}</Text>
                </div>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap="md">
                <div>
                  <Text size="sm" c="dimmed">Submitted Date</Text>
                  <Text fw={500}>{quotationData.submittedDate}</Text>
                </div>
                <div>
                  <Text size="sm" c="dimmed">Valid Until</Text>
                  <Text fw={500}>{quotationData.validUntil}</Text>
                </div>
              </Stack>
            </Grid.Col>
          </Grid>

          <Divider />

          <div>
            <Title order={4} mb="md">
              Items
            </Title>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Item</Table.Th>
                  <Table.Th>Quantity</Table.Th>
                  <Table.Th style={{ textAlign: 'right' }}>Unit Price</Table.Th>
                  <Table.Th style={{ textAlign: 'right' }}>Total</Table.Th>
                  <Table.Th>Selection Context</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {quotationData.items.map((item, index) => (
                  <Table.Tr key={index}>
                    <Table.Td>
                      <Text fw={500}>{item.name}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Text>{item.quantity}</Text>
                    </Table.Td>
                    <Table.Td style={{ textAlign: 'right' }}>
                      <Text>{formatCurrency(item.unitPrice)}</Text>
                    </Table.Td>
                    <Table.Td style={{ textAlign: 'right' }}>
                      <Text fw={500}>{formatCurrency(item.total)}</Text>
                    </Table.Td>
                    <Table.Td>
                      {item.isLowestPrice ? (
                        <Badge size="sm" variant="light" color="green">Lowest Price</Badge>
                      ) : (
                        <Stack gap={4}>
                          <Badge size="sm" variant="light" color="orange">Not Lowest Price</Badge>
                          {item.selectionReason && (
                            <Text size="xs" c="dimmed">{item.selectionReason}</Text>
                          )}
                        </Stack>
                      )}
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </div>

          <Divider />

          <Group justify="flex-end" gap="md">
            <Button variant="outline" color="red" leftSection={<IconX size={16} />} onClick={() => setRejectModalOpen(true)}>
              Reject
            </Button>
            <Button variant="filled" color="green" leftSection={<IconCheck size={16} />} onClick={() => setApproveModalOpen(true)}>
              Approve
            </Button>
          </Group>
        </Stack>
      </Card>

      <Modal opened={rejectModalOpen} onClose={() => setRejectModalOpen(false)} title="Reject Quotation" centered>
        <Stack gap="md">
          <Text>Are you sure you want to reject this quotation? This action cannot be undone.</Text>
          <Group justify="flex-end" gap="md">
            <Button variant="outline" onClick={() => setRejectModalOpen(false)}>Cancel</Button>
            <Button color="red" onClick={handleReject}>Reject</Button>
          </Group>
        </Stack>
      </Modal>

      <Modal
        opened={approveModalOpen}
        onClose={() => setApproveModalOpen(false)}
        title="Approve Quotation"
        centered
      >
        <Stack gap="md">
          <Text size="sm">Are you sure you want to approve this quotation?</Text>
          <Group justify="flex-end" gap="sm">
            <Button variant="outline" onClick={() => setApproveModalOpen(false)}>
              Cancel
            </Button>
            <Button color="green" onClick={handleApprove}>
              Approve
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  )
}