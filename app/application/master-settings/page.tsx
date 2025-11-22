"use client"

import { masterSettings, catalogueCategories, nonTangibleCategories, currencies } from "@/lib/utils/constants"
import {
  Card,
  Text,
  Group,
  Button,
  Stack,
  Title,
  TextInput,
  Select,
  NumberInput,
  Tabs,
  Table,
  ActionIcon,
  Modal,
  Badge,
} from "@mantine/core"
import { IconSettings, IconCurrencyDollar, IconCategory, IconTrash, IconPlus, IconEdit } from "@tabler/icons-react"
import { useState } from "react"

export default function MasterSettingsPage() {
  const [activeTab, setActiveTab] = useState<string | null>("general")
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)
  const [newCategory, setNewCategory] = useState("")

  const [categoryType, setCategoryType] = useState<"goods" | "services">("goods")

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      console.log(`Adding ${categoryType} category:`, newCategory)
      setNewCategory("")
      setCategoryModalOpen(false)
    }
  }

  const handleDeleteCategory = (category: string) => {
    console.log("Deleting category:", category)
  }

  return (
    <Stack gap="lg">
      <div>
        <Title order={2} mb="xs">
          Master Settings
        </Title>
        <Text c="dimmed" size="sm">
          Configure system-wide settings and manage categories
        </Text>
      </div>

      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="general" leftSection={<IconSettings size={16} />}>
            General Settings
          </Tabs.Tab>
          <Tabs.Tab value="categories" leftSection={<IconCategory size={16} />}>
            Categories
          </Tabs.Tab>
          <Tabs.Tab value="approvals" leftSection={<IconCurrencyDollar size={16} />}>
            Approval Limits
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="general" pt="md">
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={4} mb="md">General Configuration</Title>
            <Stack gap="md">
              <Group grow>
                <TextInput
                  label="Company Name"
                  defaultValue={masterSettings.companyName}
                />
                <Select
                  label="Default Currency"
                  data={currencies}
                  defaultValue={masterSettings.currency}
                />
              </Group>
              <NumberInput
                label="Tax Rate (%)"
                defaultValue={masterSettings.taxRate}
                min={0}
                max={100}
                decimalScale={2}
              />
              <Group justify="flex-end">
                <Button>Save Changes</Button>
              </Group>
            </Stack>
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="categories" pt="md">
          <Stack gap="md">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Group justify="space-between" mb="md">
                <Title order={4}>Goods Categories</Title>
                <Button 
                  leftSection={<IconPlus size={16} />} 
                  size="sm"
                  onClick={() => {
                    setCategoryType("goods")
                    setCategoryModalOpen(true)
                  }}
                >
                  Add Category
                </Button>
              </Group>
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Category Name</Table.Th>
                    <Table.Th>Items Count</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {catalogueCategories.slice(1).map((category) => (
                    <Table.Tr key={category}>
                      <Table.Td>{category}</Table.Td>
                      <Table.Td>
                        <Badge variant="light" size="sm">12</Badge>
                      </Table.Td>
                      <Table.Td>
                        <Group gap="xs">
                          <ActionIcon variant="subtle" color="blue">
                            <IconEdit size={16} />
                          </ActionIcon>
                          <ActionIcon variant="subtle" color="red" onClick={() => handleDeleteCategory(category)}>
                            <IconTrash size={16} />
                          </ActionIcon>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Card>

            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Group justify="space-between" mb="md">
                <Title order={4}>Service Categories</Title>
                <Button 
                  leftSection={<IconPlus size={16} />} 
                  size="sm"
                  onClick={() => {
                    setCategoryType("services")
                    setCategoryModalOpen(true)
                  }}
                >
                  Add Category
                </Button>
              </Group>
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Category Name</Table.Th>
                    <Table.Th>Services Count</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {nonTangibleCategories.slice(1).map((category) => (
                    <Table.Tr key={category}>
                      <Table.Td>{category}</Table.Td>
                      <Table.Td>
                        <Badge variant="light" size="sm">8</Badge>
                      </Table.Td>
                      <Table.Td>
                        <Group gap="xs">
                          <ActionIcon variant="subtle" color="blue">
                            <IconEdit size={16} />
                          </ActionIcon>
                          <ActionIcon variant="subtle" color="red" onClick={() => handleDeleteCategory(category)}>
                            <IconTrash size={16} />
                          </ActionIcon>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Card>
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="approvals" pt="md">
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={4} mb="md">Approval Limits</Title>
            <Stack gap="md">
              <NumberInput
                label="Manager Approval Limit (KES)"
                defaultValue={masterSettings.approvalLimits.manager}
                thousandSeparator=","
              />
              <NumberInput
                label="Director Approval Limit (KES)"
                defaultValue={masterSettings.approvalLimits.director}
                thousandSeparator=","
              />
              <NumberInput
                label="CEO Approval Limit (KES)"
                defaultValue={masterSettings.approvalLimits.ceo}
                thousandSeparator=","
              />
              <Group justify="flex-end">
                <Button>Save Changes</Button>
              </Group>
            </Stack>
          </Card>
        </Tabs.Panel>
      </Tabs>

      <Modal
        opened={categoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
        title={`Add ${categoryType === "goods" ? "Goods" : "Service"} Category`}
      >
        <Stack gap="md">
          <TextInput
            label="Category Name"
            placeholder="Enter category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <Group justify="flex-end" gap="sm">
            <Button variant="outline" onClick={() => setCategoryModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCategory} disabled={!newCategory.trim()}>
              Add Category
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  )
}