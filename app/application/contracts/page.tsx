"use client"

import { contracts } from "@/lib/utils/constants"
import {
  Card,
  Text,
  Group,
  Button,
  Stack,
  Title,
  Badge,
  Table,
  TextInput,
  Select,
  ActionIcon,
} from "@mantine/core"
import { IconSearch, IconPlus, IconEye, IconFileText, IconCalendar } from "@tabler/icons-react"
import { useRouter } from "next/navigation"

function getContractStatusColor(status: string) {
  switch (status) {
    case "Active": return "green"
    case "Draft": return "gray"
    case "Under Review": return "orange"
    case "Expired": return "red"
    case "Terminated": return "red"
    default: return "gray"
  }
}

export default function ContractsPage() {
  const router = useRouter()
  
  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <div>
          <Title order={2} mb="xs">
            Contract Management
          </Title>
          <Text c="dimmed" size="sm">
            Manage supplier contracts and agreements
          </Text>
        </div>
        <Button leftSection={<IconPlus size={16} />}>
          New Contract
        </Button>
      </Group>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group mb="md" gap="md">
          <TextInput
            placeholder="Search contracts..."
            leftSection={<IconSearch size={16} />}
            style={{ flex: 1 }}
          />
          <Select
            placeholder="Status"
            data={["All", "Draft", "Under Review", "Active", "Expired", "Terminated"]}
            w={180}
          />
        </Group>

        <Table highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Contract ID</Table.Th>
              <Table.Th>Title</Table.Th>
              <Table.Th>Supplier</Table.Th>
              <Table.Th>Value</Table.Th>
              <Table.Th>Start Date</Table.Th>
              <Table.Th>End Date</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {contracts.map((contract) => (
              <Table.Tr key={contract.id}>
                <Table.Td>
                  <Text size="sm" fw={600}>
                    {contract.id}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <IconFileText size={14} />
                    <Text size="sm">{contract.title}</Text>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{contract.supplier}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" fw={600}>
                    {contract.value}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{contract.startDate}</Text>
                </Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <IconCalendar size={14} />
                    <Text size="sm">{contract.endDate}</Text>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Badge variant="light" color={getContractStatusColor(contract.status)}>
                    {contract.status}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <ActionIcon variant="subtle" color="blue" onClick={() => router.push(`/application/contracts/${contract.id}`)}>
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