"use client"

import { catalogueItems } from "@/lib/utils/constants"
import {
  Card,
  Text,
  Group,
  Button,
  Stack,
  Title,
  ActionIcon,
  TextInput,
  NumberInput,
  Select,
  Table,
  Modal,
  Textarea,
  Tabs,
  Grid,
  Badge,
} from "@mantine/core"
import { DateInput } from "@mantine/dates"
import { RichTextEditor } from "@mantine/tiptap"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { IconArrowLeft, IconDeviceFloppy, IconPlus, IconTrash, IconSearch } from "@tabler/icons-react"
import Link from "next/link"
import { useState } from "react"

interface AuctionItem {
  id: string
  name: string
  description: string
  condition: string
  estimatedValue: number
}

export default function NewAuctionPage() {
  const [formData, setFormData] = useState({
    title: "",
    estimatedValue: "",
    startDate: null as Date | null,
    endDate: null as Date | null,
    status: "Draft",
  })
  const [items, setItems] = useState<AuctionItem[]>([])
  const [modalOpened, setModalOpened] = useState(false)
  const [selectedCatalogueItem, setSelectedCatalogueItem] = useState<string | null>(null)
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    condition: "Good",
    estimatedValue: "",
    category: "",
  })

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    immediatelyRender: false,
  })

  const addItem = () => {
    if (selectedCatalogueItem === null) {
      // Adding new item
      if (newItem.name && newItem.estimatedValue) {
        const item: AuctionItem = {
          id: `ITEM-${Date.now()}`,
          name: newItem.name,
          description: newItem.description,
          condition: newItem.condition,
          estimatedValue: parseFloat(newItem.estimatedValue),
        }
        setItems([...items, item])
        setNewItem({ name: "", description: "", condition: "Good", estimatedValue: "", category: "" })
        setModalOpened(false)
        setSelectedCatalogueItem(null)
      }
    } else {
      // Adding from catalogue
      const catalogueItem = catalogueItems.find(item => item.id === selectedCatalogueItem)
      if (catalogueItem) {
        const item: AuctionItem = {
          id: `ITEM-${Date.now()}`,
          name: catalogueItem.name,
          description: catalogueItem.description,
          condition: "Good",
          estimatedValue: parseFloat(catalogueItem.price.replace(/[^0-9]/g, '')),
        }
        setItems([...items, item])
        setModalOpened(false)
        setSelectedCatalogueItem(null)
      }
    }
  }

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const handleSubmit = () => {
    console.log("Creating auction:", { ...formData, description: editor?.getHTML(), items })
    // Handle form submission here
    // router.push("/application/disposal-auctions/internal")
  }

  return (
    <Stack gap="lg">
      <Group>
        <Link href="/application/disposal-auctions/internal">
          <ActionIcon variant="subtle" size="lg">
            <IconArrowLeft size={20} />
          </ActionIcon>
        </Link>
        <div>
          <Title order={2}>Create New Disposal Auction</Title>
          <Text c="dimmed" size="sm">Set up a new auction for disposal of surplus items</Text>
        </div>
      </Group>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="md">
          <TextInput
            label="Auction Title"
            placeholder="Enter auction title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <div>
            <Text size="sm" fw={500} mb="xs">Description *</Text>
            <RichTextEditor editor={editor}>
              <RichTextEditor.Toolbar sticky stickyOffset={60}>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Bold />
                  <RichTextEditor.Italic />
                  <RichTextEditor.Underline />
                  <RichTextEditor.Strikethrough />
                </RichTextEditor.ControlsGroup>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.BulletList />
                  <RichTextEditor.OrderedList />
                </RichTextEditor.ControlsGroup>
              </RichTextEditor.Toolbar>
              <RichTextEditor.Content />
            </RichTextEditor>
          </div>

          <NumberInput
            label="Estimated Value (KES)"
            placeholder="Enter estimated value"
            value={formData.estimatedValue}
            onChange={(value) => setFormData({ ...formData, estimatedValue: value?.toString() || "" })}
            min={0}
            thousandSeparator=","
            required
          />

          <Group grow>
            <DateInput
              label="Bidding Start Date"
              placeholder="Select start date"
              value={formData.startDate}
              onChange={(date) => setFormData({ ...formData, startDate: date ? new Date(date) : null })}
              required
            />
            <DateInput
              label="Bidding End Date"
              placeholder="Select end date"
              value={formData.endDate}
              onChange={(date) => setFormData({ ...formData, endDate: date ? new Date(date) : null })}
              required
            />
          </Group>

          <Select
            label="Initial Status"
            value={formData.status}
            onChange={(value) => setFormData({ ...formData, status: value || "Draft" })}
            data={["Draft", "Open for Bidding"]}
          />

          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="md">
              <Title order={4}>Auction Items</Title>
              <Button leftSection={<IconPlus size={16} />} onClick={() => setModalOpened(true)}>
                Add Item
              </Button>
            </Group>

            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Item Name</Table.Th>
                  <Table.Th>Description</Table.Th>
                  <Table.Th>Condition</Table.Th>
                  <Table.Th>Est. Value</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {items.map((item) => (
                  <Table.Tr key={item.id}>
                    <Table.Td>{item.name}</Table.Td>
                    <Table.Td>{item.description}</Table.Td>
                    <Table.Td>{item.condition}</Table.Td>
                    <Table.Td>KES {item.estimatedValue.toLocaleString()}</Table.Td>
                    <Table.Td>
                      <ActionIcon color="red" onClick={() => removeItem(item.id)}>
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Card>

          <Modal
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
            title="Add Auction Item"
            size="xl"
            centered
          >
            <Tabs value={selectedCatalogueItem === null ? 'new' : 'internal'} onChange={(value) => {
              if (value === 'new') setSelectedCatalogueItem(null);
              else setSelectedCatalogueItem('existing');
            }}>
              <Tabs.List>
                <Tabs.Tab value="new">Add New Item</Tabs.Tab>
                <Tabs.Tab value="internal">From Internal Catalog</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="new" pt="md">
                <Grid gutter="md">
                  <Grid.Col span={6}>
                    <TextInput
                      label="Item Name"
                      placeholder="Enter item name"
                      value={newItem.name}
                      onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                      required
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Select
                      label="Category"
                      placeholder="Select category"
                      data={['Furniture', 'IT Equipment', 'Office Supplies', 'Vehicles', 'Machinery']}
                      value={newItem.category}
                      onChange={(value) => setNewItem({ ...newItem, category: value || '' })}
                      required
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Select
                      label="Condition"
                      value={newItem.condition}
                      onChange={(value) => setNewItem({ ...newItem, condition: value || "Good" })}
                      data={["Excellent", "Good", "Fair", "Poor"]}
                      required
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <NumberInput
                      label="Estimated Value (KES)"
                      placeholder="Enter estimated value"
                      value={newItem.estimatedValue}
                      onChange={(value) => setNewItem({ ...newItem, estimatedValue: value?.toString() || "" })}
                      min={0}
                      thousandSeparator=","
                      required
                    />
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <Textarea
                      label="Description"
                      placeholder="Enter item description"
                      value={newItem.description}
                      onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                      rows={3}
                    />
                  </Grid.Col>
                </Grid>
              </Tabs.Panel>

              <Tabs.Panel value="internal" pt="md">
                <Stack gap="md">
                  <TextInput
                    placeholder="Search inventory items..."
                    leftSection={<IconSearch size={16} />}
                    mb="md"
                  />
                  
                  <Table highlightOnHover>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>Item</Table.Th>
                        <Table.Th>Category</Table.Th>
                        <Table.Th>Price</Table.Th>
                        <Table.Th>Status</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {catalogueItems.map((item) => (
                        <Table.Tr 
                          key={item.id} 
                          style={{ cursor: 'pointer', backgroundColor: selectedCatalogueItem === item.id ? 'var(--mantine-color-blue-0)' : undefined }}
                          onClick={() => setSelectedCatalogueItem(item.id)}
                        >
                          <Table.Td>
                            <Text fw={500} size="sm">{item.name}</Text>
                            <Text size="xs" c="dimmed">{item.id}</Text>
                          </Table.Td>
                          <Table.Td>
                            <Badge variant="light" size="sm">{item.category}</Badge>
                          </Table.Td>
                          <Table.Td>
                            <Text size="sm" fw={600} c="cyan">{item.price}</Text>
                          </Table.Td>
                          <Table.Td>
                            <Badge variant="light" color={item.inStock ? "green" : "red"}>
                              {item.inStock ? "In Stock" : "Out of Stock"}
                            </Badge>
                          </Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                </Stack>
              </Tabs.Panel>
            </Tabs>

            <Group justify="flex-end" gap="sm" mt="md">
              <Button variant="outline" onClick={() => setModalOpened(false)}>
                Cancel
              </Button>
              <Button 
                onClick={addItem} 
                disabled={
                  selectedCatalogueItem === 'existing' || 
                  (selectedCatalogueItem === null && (!newItem.name || !newItem.estimatedValue))
                }
              >
                Add Item
              </Button>
            </Group>
          </Modal>

          <Group justify="flex-end" mt="md">
            <Link href="/application/disposal-auctions/internal">
              <Button variant="outline">
                Cancel
              </Button>
            </Link>
            <Button 
              leftSection={<IconDeviceFloppy size={16} />}
              onClick={handleSubmit}
              disabled={!formData.title || !editor?.getHTML() || !formData.estimatedValue || items.length === 0}
            >
              Create Auction
            </Button>
          </Group>
        </Stack>
      </Card>
    </Stack>
  )
}