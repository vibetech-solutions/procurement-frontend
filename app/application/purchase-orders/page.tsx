"use client"

import { purchaseOrders } from "@/lib/utils/constants"
import {
  Card,
  Text,
  Group,
  Stack,
  Title,
  Badge,
  Table,
  TextInput,
  Select,
  ActionIcon,
} from "@mantine/core"
import { IconSearch, IconEye, IconPrinter } from "@tabler/icons-react"
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

export default function PurchaseOrders() {
  return (
    <Stack gap="lg">
      <div>
        <Title order={2} mb="xs">
          Purchase Orders
        </Title>
        <Text c="dimmed" size="sm">
          View and manage purchase orders created from approved requisitions
        </Text>
      </div>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group mb="md" gap="md">
          <TextInput
            placeholder="Search purchase orders..."
            leftSection={<IconSearch size={16} />}
            style={{ flex: 1 }}
          />
          <Select
            placeholder="Status"
            data={["All", "Pending Delivery", "In Transit", "Delivered"]}
            w={180}
          />
          <Select
            placeholder="Department"
            data={["All", "IT", "Marketing", "HR", "Operations", "Finance"]}
            w={150}
          />
        </Group>

        <Table highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>PO Number</Table.Th>
              <Table.Th>Title</Table.Th>
              <Table.Th>Supplier</Table.Th>
              <Table.Th>Requester</Table.Th>
              <Table.Th>Department</Table.Th>
              <Table.Th>Amount</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Expected Delivery</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {purchaseOrders.map((po) => (
              <Table.Tr key={po.id}>
                <Table.Td>
                  <Text size="sm" fw={600}>
                    {po.id}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{po.title}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{po.supplier}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{po.requester}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{po.department}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" fw={600}>
                    {po.amount}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Badge variant="light" color={getStatusColor(po.status)}>
                    {po.status}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" c="dimmed">
                    {po.expectedDelivery}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <ActionIcon variant="subtle" color="blue" component={Link} href={`/application/purchase-orders/${po.id}`}>
                      <IconEye size={16} />
                    </ActionIcon>
                    <ActionIcon variant="subtle" color="green">
                      <IconPrinter size={16} />
                    </ActionIcon>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>
    </Stack>
  )
}