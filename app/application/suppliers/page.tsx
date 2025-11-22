"use client"

import { suppliers } from "@/lib/utils/constants"
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
import { IconSearch, IconPlus, IconEye } from "@tabler/icons-react"
import { useRouter } from "next/navigation"

export default function SuppliersPage() {
  const router = useRouter()

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <div>
          <Title order={2} mb="xs">
            Supplier Management
          </Title>
          <Text c="dimmed" size="sm">
            Manage suppliers and their contracts
          </Text>
        </div>
        <Button leftSection={<IconPlus size={16} />}>
          Add Supplier
        </Button>
      </Group>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group mb="md" gap="md">
          <TextInput
            placeholder="Search suppliers..."
            leftSection={<IconSearch size={16} />}
            style={{ flex: 1 }}
          />
          <Select
            placeholder="Category"
            data={["All", "IT Equipment", "Furniture", "Office Supplies", "Marketing"]}
            w={180}
          />
        </Group>

        <Table highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Supplier ID</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Categories</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {suppliers.map((supplier) => (
              <Table.Tr key={supplier.id}>
                <Table.Td>
                  <Text size="sm" fw={600}>
                    {supplier.id}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{supplier.name}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{supplier.email}</Text>
                </Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    {supplier.categories.map((category, index) => (
                      <Badge key={index} variant="light" size="sm">
                        {category}
                      </Badge>
                    ))}
                  </Group>
                </Table.Td>
                <Table.Td>
                  <ActionIcon variant="subtle" color="blue" onClick={() => router.push(`/application/suppliers/${supplier.id}`)}>
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