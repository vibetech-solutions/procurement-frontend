"use client"

import { purchaseOrderDetails } from "@/lib/utils/constants"
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
  Paper,
} from "@mantine/core"
import { IconPrinter, IconArrowLeft } from "@tabler/icons-react"
import Link from "next/link"

function getStatusColor(status: string) {
  switch (status) {
    case "Pending Delivery":
      return "orange"
    case "In Transit":
      return "blue"
    case "Delivered":
      return "green"
    default:
      return "gray"
  }
}

function formatCurrency(amount: number) {
  return `KES ${amount.toLocaleString()}`
}

export default function ViewPurchaseOrder() {
  const po = purchaseOrderDetails

  const handlePrint = () => {
    window.print()
  }

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Group>
          <Button
            variant="subtle"
            leftSection={<IconArrowLeft size={16} />}
            component={Link}
            href="/application/purchase-orders"
          >
            Back to Purchase Orders
          </Button>
        </Group>
        <Button leftSection={<IconPrinter size={16} />} onClick={handlePrint}>
          Print Purchase Order
        </Button>
      </Group>

      <Paper shadow="sm" p="xl" radius="md" withBorder className="print:shadow-none print:border-0">
        {/* Header */}
        <Stack gap="lg">
          <Group justify="space-between" align="flex-start">
            <div>
              <Title order={1} size="h2" mb="xs">
                Purchase Order
              </Title>
              <Text size="xl" fw={600} c="blue">
                {po.id}
              </Text>
            </div>
            <div style={{ textAlign: 'right' }}>
              <Text size="sm" c="dimmed">
                Created Date
              </Text>
              <Text fw={500}>{po.createdDate}</Text>
              <Text size="sm" c="dimmed" mt="xs">
                Expected Delivery
              </Text>
              <Text fw={500}>{po.expectedDelivery}</Text>
            </div>
          </Group>

          <Badge size="lg" variant="light" color={getStatusColor(po.status)} w="fit-content">
            {po.status}
          </Badge>

          <Divider />

          {/* Details Grid */}
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Card withBorder>
                <Title order={4} mb="md">
                  Supplier Information
                </Title>
                <Stack gap="xs">
                  <Text fw={600}>{po.supplier.name}</Text>
                  <Text size="sm" c="dimmed">{po.supplier.address}</Text>
                  <Text size="sm">Contact: {po.supplier.contact}</Text>
                  <Text size="sm">Email: {po.supplier.email}</Text>
                  <Text size="sm">Phone: {po.supplier.phone}</Text>
                </Stack>
              </Card>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Card withBorder>
                <Title order={4} mb="md">
                  Delivery Information
                </Title>
                <Stack gap="xs">
                  <div>
                    <Text size="sm" c="dimmed">Requester</Text>
                    <Text fw={500}>{po.requester}</Text>
                  </div>
                  <div>
                    <Text size="sm" c="dimmed">Department</Text>
                    <Text fw={500}>{po.department}</Text>
                  </div>
                  <div>
                    <Text size="sm" c="dimmed">Cost Center</Text>
                    <Text fw={500}>{po.costCenter}</Text>
                  </div>
                  <div>
                    <Text size="sm" c="dimmed">Delivery Location</Text>
                    <Text fw={500}>{po.deliveryLocation}</Text>
                  </div>
                </Stack>
              </Card>
            </Grid.Col>
          </Grid>

          <Divider />

          {/* Items Table */}
          <div>
            <Title order={4} mb="md">
              Items
            </Title>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Item</Table.Th>
                  <Table.Th>Description</Table.Th>
                  <Table.Th style={{ textAlign: 'center' }}>Quantity</Table.Th>
                  <Table.Th style={{ textAlign: 'right' }}>Unit Price</Table.Th>
                  <Table.Th style={{ textAlign: 'right' }}>Total</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {po.items.map((item) => (
                  <Table.Tr key={item.id}>
                    <Table.Td>
                      <Text fw={500}>{item.name}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm" c="dimmed">{item.description}</Text>
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
          </div>

          <Divider />

          {/* Totals */}
          <Group justify="flex-end">
            <Stack gap="xs" style={{ minWidth: 250 }}>
              <Group justify="space-between">
                <Text>Subtotal:</Text>
                <Text>{formatCurrency(po.subtotal)}</Text>
              </Group>
              <Group justify="space-between">
                <Text>Tax (18%):</Text>
                <Text>{formatCurrency(po.tax)}</Text>
              </Group>
              <Divider />
              <Group justify="space-between">
                <Text fw={600} size="lg">Total:</Text>
                <Text fw={600} size="lg">{formatCurrency(po.total)}</Text>
              </Group>
            </Stack>
          </Group>

          <Divider />

          {/* Terms */}
          <div>
            <Title order={4} mb="md">
              Terms & Conditions
            </Title>
            <Text size="sm" c="dimmed">
              {po.terms}
            </Text>
          </div>

          {/* Footer */}
          <Group justify="space-between" mt="xl" pt="md" style={{ borderTop: '1px solid #e9ecef' }}>
            <div>
              <Text size="sm" c="dimmed">Procurement Officer</Text>
              <Text fw={500}>{po.procurementOfficer}</Text>
            </div>
            <div style={{ textAlign: 'right' }}>
              <Text size="sm" c="dimmed">Related Requisition</Text>
              <Text fw={500}>{po.requisitionId}</Text>
            </div>
          </Group>
        </Stack>
      </Paper>
    </Stack>
  )
}