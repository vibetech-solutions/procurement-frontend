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
  Modal,
  Checkbox,
} from "@mantine/core"
import { IconSearch, IconPlus, IconEye } from "@tabler/icons-react"
import Link from "next/link"
import { useState } from "react"

export default function SuppliersPage() {
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([])

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
        <Button leftSection={<IconPlus size={16} />} onClick={() => setAddModalOpen(true)}>
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
                  <Link href={`/application/suppliers/${supplier.id}`}>
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

      <Modal
        opened={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Add Suppliers"
        size="lg"
        centered
      >
        <Stack gap="md">
          <Text size="sm" c="dimmed">
            Select suppliers to add to your network:
          </Text>
          
          <TextInput
            placeholder="Search available suppliers..."
            leftSection={<IconSearch size={16} />}
            mb="md"
          />
          
          <Stack gap="xs" mah={400} style={{ overflowY: 'auto' }}>
            {suppliers.map((supplier) => (
              <Card key={supplier.id} withBorder p="sm">
                <Group justify="space-between">
                  <div>
                    <Text fw={500} size="sm">{supplier.name}</Text>
                    <Text size="xs" c="dimmed">{supplier.email}</Text>
                    <Group gap="xs" mt={4}>
                      {supplier.categories.slice(0, 2).map((category, index) => (
                        <Badge key={index} variant="light" size="xs">
                          {category}
                        </Badge>
                      ))}
                    </Group>
                  </div>
                  <Checkbox
                    checked={selectedSuppliers.includes(supplier.id)}
                    onChange={(e) => {
                      if (e.currentTarget.checked) {
                        setSelectedSuppliers([...selectedSuppliers, supplier.id])
                      } else {
                        setSelectedSuppliers(selectedSuppliers.filter(id => id !== supplier.id))
                      }
                    }}
                  />
                </Group>
              </Card>
            ))}
          </Stack>
          
          <Group justify="flex-end" gap="sm" mt="md">
            <Button variant="outline" onClick={() => setAddModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={() => {
                setAddModalOpen(false)
                setSelectedSuppliers([])
              }}
              disabled={selectedSuppliers.length === 0}
            >
              Add {selectedSuppliers.length} Supplier{selectedSuppliers.length !== 1 ? 's' : ''}
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  )
}