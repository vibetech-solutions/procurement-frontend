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
} from "@mantine/core"
import { IconArrowLeft, IconCheck } from "@tabler/icons-react"
import Link from "next/link"

const materialReceiptData = {
  id: "MR-001",
  requisitionId: "REQ-2025-001",
  requester: "Demo User",
  department: "IT",
  status: "Pending",
  createdDate: "2025-01-20",
  receivedDate: "-",
  totalAmount: 116997,
  items: [
    { name: "Ergonomic Office Chair", quantity: 2, unitPrice: 38999, total: 77998, received: 0 },
    { name: "Laptop - Dell XPS 15", quantity: 1, unitPrice: 194999, total: 194999, received: 0 }
  ]
}

function getStatusColor(status: string) {
  switch (status) {
    case "Pending": return "orange"
    case "Received": return "green"
    case "Cancelled": return "red"
    default: return "gray"
  }
}

function formatCurrency(amount: number) {
  return `KES ${amount.toLocaleString()}`
}

export default function MaterialReceiptDetailPage() {
  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Button
          variant="subtle"
          leftSection={<IconArrowLeft size={16} />}
          component={Link}
          href="/application/material-receipts"
        >
          Back to Material Receipts
        </Button>
        {materialReceiptData.status === "Pending" && (
          <Button variant="filled" color="green" leftSection={<IconCheck size={16} />}>
            Mark as Received
          </Button>
        )}
      </Group>

      <Card shadow="sm" padding="xl" radius="md" withBorder>
        <Stack gap="lg">
          <Group justify="space-between" align="flex-start">
            <div>
              <Title order={2} mb="xs">
                Material Receipt {materialReceiptData.id}
              </Title>
              <Text size="lg" fw={600} c="blue">
                Requisition: {materialReceiptData.requisitionId}
              </Text>
            </div>
            <Badge size="lg" variant="light" color={getStatusColor(materialReceiptData.status)}>
              {materialReceiptData.status}
            </Badge>
          </Group>

          <Divider />

          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap="md">
                <div>
                  <Text size="sm" c="dimmed">Requester</Text>
                  <Text fw={500}>{materialReceiptData.requester}</Text>
                </div>
                <div>
                  <Text size="sm" c="dimmed">Department</Text>
                  <Text fw={500}>{materialReceiptData.department}</Text>
                </div>
                <div>
                  <Text size="sm" c="dimmed">Total Amount</Text>
                  <Text fw={600} size="lg">{formatCurrency(materialReceiptData.totalAmount)}</Text>
                </div>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap="md">
                <div>
                  <Text size="sm" c="dimmed">Created Date</Text>
                  <Text fw={500}>{materialReceiptData.createdDate}</Text>
                </div>
                <div>
                  <Text size="sm" c="dimmed">Received Date</Text>
                  <Text fw={500}>{materialReceiptData.receivedDate}</Text>
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
                  <Table.Th>Quantity Expected</Table.Th>
                  <Table.Th>Quantity Received</Table.Th>
                  <Table.Th style={{ textAlign: 'right' }}>Unit Price</Table.Th>
                  <Table.Th style={{ textAlign: 'right' }}>Total</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {materialReceiptData.items.map((item, index) => (
                  <Table.Tr key={index}>
                    <Table.Td>
                      <Text fw={500}>{item.name}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Text>{item.quantity}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Badge variant="light" color={item.received === item.quantity ? "green" : "orange"}>
                        {item.received}
                      </Badge>
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
          </div>
        </Stack>
      </Card>
    </Stack>
  )
}