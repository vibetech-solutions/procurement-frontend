"use client"

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
import Link from "next/link"
import { materialReceiptsData } from "@/lib/utils/constants"



function getStatusColor(status: string) {
  switch (status) {
    case "Pending": return "orange"
    case "Received": return "green"
    case "Cancelled": return "red"
    default: return "gray"
  }
}

export default function MaterialReceiptsPage() {

  return (
    <Stack gap="lg">
      <div>
        <Title order={2} mb="xs">
          Material Receipts
        </Title>
        <Text c="dimmed" size="sm">
          Track material receipts created from approved requisitions for in-stock items
        </Text>
      </div>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group mb="md" gap="md">
          <TextInput
            placeholder="Search material receipts..."
            leftSection={<IconSearch size={16} />}
            style={{ flex: 1 }}
          />
          <Select
            placeholder="Status"
            data={["All", "Pending", "Received", "Cancelled"]}
            w={150}
          />
        </Group>

        <Table highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Receipt ID</Table.Th>
              <Table.Th>Requisition ID</Table.Th>
              <Table.Th>Requester</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Amount</Table.Th>
              <Table.Th>Created Date</Table.Th>
              <Table.Th>Received Date</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {materialReceiptsData.map((receipt) => (
              <Table.Tr key={receipt.id}>
                <Table.Td>
                  <Text size="sm" fw={600}>
                    {receipt.id}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{receipt.requisitionId}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{receipt.requester}</Text>
                </Table.Td>
                <Table.Td>
                  <Badge variant="light" color={getStatusColor(receipt.status)}>
                    {receipt.status}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" fw={600}>
                    KES {receipt.totalAmount.toLocaleString()}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" c="dimmed">
                    {receipt.createdDate}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" c="dimmed">
                    {receipt.receivedDate}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Link href={`/application/material-receipts/${receipt.id}`}>
                    <ActionIcon variant="subtle" color="blue">
                      <IconEye size={16} />
                    </ActionIcon>
                  </Link>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>
    </Stack>
  )
}