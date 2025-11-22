"use client"

import { rfqs } from "@/lib/utils/constants"
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
import { IconSearch, IconEye } from "@tabler/icons-react"
import { useRouter } from "next/navigation"

function getStatusColor(status: string) {
  switch (status) {
    case "Pending Response":
      return "orange"
    case "Responded":
      return "blue"
    case "Expired":
      return "red"
    default:
      return "gray"
  }
}

export default function RFQsPage() {
  const router = useRouter()

  return (
    <Stack gap="lg">
      <div>
        <Title order={2} mb="xs">
          Request for Quotations (RFQs)
        </Title>
        <Text c="dimmed" size="sm">
          Manage RFQs sent to suppliers
        </Text>
      </div>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group mb="md" gap="md">
          <TextInput
            placeholder="Search RFQs..."
            leftSection={<IconSearch size={16} />}
            style={{ flex: 1 }}
          />
          <Select
            placeholder="Status"
            data={["All", "Pending Response", "Responded", "Expired"]}
            w={180}
          />
        </Group>

        <Table highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>RFQ Number</Table.Th>
              <Table.Th>Title</Table.Th>
              <Table.Th>Requisition ID</Table.Th>
              <Table.Th>Supplier</Table.Th>
              <Table.Th>Amount</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Sent Date</Table.Th>
              <Table.Th>Due Date</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rfqs.map((rfq) => (
              <Table.Tr key={rfq.id}>
                <Table.Td>
                  <Text size="sm" fw={600}>
                    {rfq.id}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{rfq.title}</Text>
                </Table.Td>
                <Table.Td>
                  <Badge variant="outline" size="sm">{rfq.requisitionId}</Badge>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{rfq.supplier}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" fw={600}>
                    {rfq.amount}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Badge variant="light" color={getStatusColor(rfq.status)}>
                    {rfq.status}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" c="dimmed">
                    {rfq.sentDate}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" c="dimmed">
                    {rfq.dueDate}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <ActionIcon variant="subtle" color="blue" onClick={() => router.push(`/application/rfqs/${rfq.id}`)}>
                    <IconEye size={16} />
                  </ActionIcon>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>
    </Stack>
  )
}