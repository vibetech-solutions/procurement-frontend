"use client";

import { ContentContainer } from "@/components/layout/content-container";
import { catalogueCategories, catalogueItems, nonTangibleCatalogueItems, nonTangibleCategories } from "@/lib/utils/constants";
import {
  TextInput,
  Select,
  Grid,
  Card,
  Text,
  Group,
  Badge,
  Button,
  Stack,
  Title,
  Paper,
  Image,
  ActionIcon,
  Pagination,
  MultiSelect,
  RangeSlider,
  Accordion,
  Table,
  Tabs,
  Menu,
  Modal,
} from "@mantine/core";
import {
  IconSearch,
  IconShoppingCart,
  IconHeart,
  IconEye,
  IconFilter,
  IconGrid3x3,
  IconList,
  IconPlus,
  IconPlane,
  IconPackage,
  IconChevronDown,
  IconEdit,
  IconBulb,
  IconCheck,
  IconX,
} from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

// Mock recommended items data
const recommendedProducts = [
  {
    id: "REC-001",
    name: "Wireless Presentation Remote",
    description: "Bluetooth presentation remote with laser pointer for conference rooms",
    category: "Electronics",
    estimatedPrice: "KES 3,500",
    requestedBy: "John Doe",
    requestDate: "2024-01-15",
    reason: "Needed for client presentations in meeting rooms",
    status: "pending",
    type: "product"
  },
  {
    id: "REC-002", 
    name: "Ergonomic Standing Desk Converter",
    description: "Adjustable standing desk converter for health and productivity",
    category: "Office Furniture",
    estimatedPrice: "KES 25,000",
    requestedBy: "Jane Smith",
    requestDate: "2024-01-14",
    reason: "To improve employee wellness and reduce back strain",
    status: "pending",
    type: "product"
  }
];

const recommendedServices = [
  {
    id: "REC-003",
    name: "Cloud Storage Backup Service",
    description: "Monthly cloud backup service for critical business data",
    category: "IT Services",
    estimatedPrice: "KES 8,000/month",
    requestedBy: "Mike Johnson",
    requestDate: "2024-01-13",
    reason: "Need reliable backup solution for data security compliance",
    status: "pending",
    type: "service"
  }
];

export default function InternalCatalogPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState<string | null>('inventory');
  const [recommendationTab, setRecommendationTab] = useState<string | null>('products');
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState<typeof recommendedProducts[0] | null>(null);
  
  const currentItems = activeTab === 'inventory' ? catalogueItems : nonTangibleCatalogueItems;
  const currentCategories = activeTab === 'inventory' ? catalogueCategories : nonTangibleCategories;

  const handleApproveRecommendation = (id: string) => {
    console.log('Approving recommendation:', id);
  };

  const handleRejectRecommendation = (id: string) => {
    console.log('Rejecting recommendation:', id);
  };

  const handleViewRecommendation = (id: string) => {
    const allRecommendations = [...recommendedProducts, ...recommendedServices];
    const item = allRecommendations.find(rec => rec.id === id);
    setSelectedRecommendation(item || null);
    setViewModalOpen(true);
  };

  return (
    <ContentContainer>
      <Stack gap="lg">
        <Group justify="space-between">
          <div>
            <Title order={2} mb="xs">
              Internal Catalog
            </Title>
            <Text c="dimmed" size="sm">
              Browse and manage internal procurement catalog items
            </Text>
          </div>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Button leftSection={<IconPlus size={16} />} rightSection={<IconChevronDown size={16} />}>
                Add New Item
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={<IconPackage size={16} />}
                component="a"
                href="/application/catalogue/internal/new?type=inventory"
              >
                Inventory Item
              </Menu.Item>
              <Menu.Item
                leftSection={<IconPlane size={16} />}
                component="a"
                href="/application/catalogue/internal/new?type=service"
              >
                Non-Tangible Service
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>

        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Tab value="inventory" leftSection={<IconGrid3x3 size={16} />}>
              Products ({catalogueItems.length})
            </Tabs.Tab>
            <Tabs.Tab value="services" leftSection={<IconPlane size={16} />}>
              Services ({nonTangibleCatalogueItems.length})
            </Tabs.Tab>
            <Tabs.Tab value="recommendations" leftSection={<IconBulb size={16} />}>
              Recommended Items ({recommendedProducts.length + recommendedServices.length})
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="inventory" pt="md">
            <Paper p="md" withBorder>
              <Grid gutter="md">
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <TextInput
                    placeholder="Search items, suppliers, or categories..."
                    leftSection={<IconSearch size={16} />}
                    size="md"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                  <Select
                    placeholder="All Categories"
                    data={catalogueCategories}
                    size="md"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                  <Select
                    placeholder="Sort by"
                    data={[
                      "Relevance",
                      "Price: Low to High",
                      "Price: High to Low",
                      "Name A-Z",
                      "Name Z-A",
                    ]}
                    size="md"
                  />
                </Grid.Col>
              </Grid>
            </Paper>
          </Tabs.Panel>

          <Tabs.Panel value="services" pt="md">
            <Paper p="md" withBorder>
              <Grid gutter="md">
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <TextInput
                    placeholder="Search services, suppliers, or categories..."
                    leftSection={<IconSearch size={16} />}
                    size="md"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                  <Select
                    placeholder="All Categories"
                    data={nonTangibleCategories}
                    size="md"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                  <Select
                    placeholder="Sort by"
                    data={[
                      "Relevance",
                      "Price: Low to High",
                      "Price: High to Low",
                      "Name A-Z",
                      "Name Z-A",
                    ]}
                    size="md"
                  />
                </Grid.Col>
              </Grid>
            </Paper>
          </Tabs.Panel>

          <Tabs.Panel value="recommendations" pt="md">
            <Tabs value={recommendationTab} onChange={setRecommendationTab}>
              <Tabs.List>
                <Tabs.Tab value="products" leftSection={<IconPackage size={16} />}>
                  Products ({recommendedProducts.length})
                </Tabs.Tab>
                <Tabs.Tab value="services" leftSection={<IconPlane size={16} />}>
                  Services ({recommendedServices.length})
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="products" pt="md">
                <Paper p="md" withBorder>
                  <Text size="sm" c="dimmed" mb="md">
                    Review product recommendations from users. Approve to add to catalog or reject with feedback.
                  </Text>
                  <Table highlightOnHover>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>Item Details</Table.Th>
                        <Table.Th>Requested By</Table.Th>
                        <Table.Th>Reason</Table.Th>
                        <Table.Th>Est. Price</Table.Th>
                        <Table.Th>Actions</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {recommendedProducts.map((item) => (
                        <Table.Tr key={item.id}>
                          <Table.Td>
                            <div>
                              <Text fw={500} size="sm">{item.name}</Text>
                              <Text size="xs" c="dimmed">{item.id}</Text>
                              <Text size="xs" c="dimmed" lineClamp={2}>{item.description}</Text>
                              <Badge variant="light" size="xs" mt={4}>{item.category}</Badge>
                            </div>
                          </Table.Td>
                          <Table.Td>
                            <div>
                              <Text size="sm">{item.requestedBy}</Text>
                              <Text size="xs" c="dimmed">{item.requestDate}</Text>
                            </div>
                          </Table.Td>
                          <Table.Td>
                            <Text size="sm" lineClamp={3}>{item.reason}</Text>
                          </Table.Td>
                          <Table.Td>
                            <Text size="sm" fw={600} c="cyan">{item.estimatedPrice}</Text>
                          </Table.Td>
                          <Table.Td>
                            <Group gap="xs">
                              <ActionIcon
                                variant="subtle"
                                color="blue"
                                size="sm"
                                onClick={() => handleViewRecommendation(item.id)}
                              >
                                <IconEye size={14} />
                              </ActionIcon>
                              <ActionIcon
                                variant="filled"
                                color="green"
                                size="sm"
                                onClick={() => handleApproveRecommendation(item.id)}
                              >
                                <IconCheck size={14} />
                              </ActionIcon>
                              <ActionIcon
                                variant="filled"
                                color="red"
                                size="sm"
                                onClick={() => handleRejectRecommendation(item.id)}
                              >
                                <IconX size={14} />
                              </ActionIcon>
                            </Group>
                          </Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                </Paper>
              </Tabs.Panel>

              <Tabs.Panel value="services" pt="md">
                <Paper p="md" withBorder>
                  <Text size="sm" c="dimmed" mb="md">
                    Review service recommendations from users. Approve to add to catalog or reject with feedback.
                  </Text>
                  <Table highlightOnHover>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>Service Details</Table.Th>
                        <Table.Th>Requested By</Table.Th>
                        <Table.Th>Reason</Table.Th>
                        <Table.Th>Est. Price</Table.Th>
                        <Table.Th>Actions</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {recommendedServices.map((item) => (
                        <Table.Tr key={item.id}>
                          <Table.Td>
                            <div>
                              <Text fw={500} size="sm">{item.name}</Text>
                              <Text size="xs" c="dimmed">{item.id}</Text>
                              <Text size="xs" c="dimmed" lineClamp={2}>{item.description}</Text>
                              <Badge variant="light" size="xs" mt={4}>{item.category}</Badge>
                            </div>
                          </Table.Td>
                          <Table.Td>
                            <div>
                              <Text size="sm">{item.requestedBy}</Text>
                              <Text size="xs" c="dimmed">{item.requestDate}</Text>
                            </div>
                          </Table.Td>
                          <Table.Td>
                            <Text size="sm" lineClamp={3}>{item.reason}</Text>
                          </Table.Td>
                          <Table.Td>
                            <Text size="sm" fw={600} c="cyan">{item.estimatedPrice}</Text>
                          </Table.Td>
                          <Table.Td>
                            <Group gap="xs">
                              <ActionIcon
                                variant="subtle"
                                color="blue"
                                size="sm"
                                onClick={() => handleViewRecommendation(item.id)}
                              >
                                <IconEye size={14} />
                              </ActionIcon>
                              <ActionIcon
                                variant="filled"
                                color="green"
                                size="sm"
                                onClick={() => handleApproveRecommendation(item.id)}
                              >
                                <IconCheck size={14} />
                              </ActionIcon>
                              <ActionIcon
                                variant="filled"
                                color="red"
                                size="sm"
                                onClick={() => handleRejectRecommendation(item.id)}
                              >
                                <IconX size={14} />
                              </ActionIcon>
                            </Group>
                          </Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                </Paper>
              </Tabs.Panel>
            </Tabs>
          </Tabs.Panel>
        </Tabs>

        {activeTab !== 'recommendations' && (
        <Grid gutter="lg">
          <Grid.Col span={{ base: 12, md: 3 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
              <Text fw={600} size="lg" mb="md">
                Filters
              </Text>

              <Accordion variant="contained">
                <Accordion.Item value="category">
                  <Accordion.Control icon={<IconFilter size={16} />}>
                    Category
                  </Accordion.Control>
                  <Accordion.Panel>
                    <MultiSelect
                      data={currentCategories.slice(1)}
                      placeholder="Select categories"
                      searchable
                      clearable
                    />
                  </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="price">
                  <Accordion.Control icon={<IconFilter size={16} />}>
                    Price Range
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Stack gap="md">
                      <RangeSlider
                        min={0}
                        max={200000}
                        step={5000}
                        defaultValue={[0, 200000]}
                        marks={[
                          { value: 0, label: "KES 0" },
                          { value: 200000, label: "KES 200K" },
                        ]}
                      />
                    </Stack>
                  </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="supplier">
                  <Accordion.Control icon={<IconFilter size={16} />}>
                    Supplier
                  </Accordion.Control>
                  <Accordion.Panel>
                    <MultiSelect
                      data={[
                        "Office Pro Ltd",
                        "Tech Solutions Inc",
                        "Supplies Direct",
                      ]}
                      placeholder="Select suppliers"
                      searchable
                      clearable
                    />
                  </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="availability">
                  <Accordion.Control icon={<IconFilter size={16} />}>
                    Availability
                  </Accordion.Control>
                  <Accordion.Panel>
                    <MultiSelect
                      data={["In Stock", "Out of Stock"]}
                      placeholder="Select availability"
                      clearable
                    />
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 9 }}>
            <Stack gap="md">
              <Group justify="space-between">
                <Text size="sm" c="dimmed">
                  Showing {currentItems.length} items
                </Text>
                <Group gap="xs">
                  <Button 
                    variant={viewMode === 'grid' ? 'filled' : 'subtle'} 
                    size="xs"
                    leftSection={<IconGrid3x3 size={14} />}
                    onClick={() => setViewMode('grid')}
                  >
                    Grid
                  </Button>
                  <Button 
                    variant={viewMode === 'list' ? 'filled' : 'subtle'} 
                    size="xs"
                    leftSection={<IconList size={14} />}
                    onClick={() => setViewMode('list')}
                  >
                    List
                  </Button>
                </Group>
              </Group>

              {viewMode === 'grid' ? (
                <Grid gutter="md">
                  {currentItems.map((item) => (
                    <Grid.Col key={item.id} span={{ base: 12, sm: 6, lg: 4 }}>
                      <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
                        {activeTab === 'inventory' ? (
                          <Card.Section style={{ position: "relative" }}>
                            <Image
                              src={('image' in item ? item.image : null) || "/placeholder.svg"}
                              height={180}
                              alt={item.name}
                            />
                            <Group gap="xs" style={{ position: "absolute", top: 8, right: 8 }}>
                              <ActionIcon
                                variant="filled"
                                color="blue"
                                size="sm"
                              >
                                <Link href={`/application/catalogue/${item.id}`}>
                                  <IconEye size={16} />
                                </Link>
                              </ActionIcon>
                              <ActionIcon
                                variant="filled"
                                color="orange"
                                size="sm"
                              >
                                <Link href={`/application/catalogue/${item.id}/edit`}>
                                  <IconEdit size={16} />
                                </Link>
                              </ActionIcon>
                            </Group>
                          </Card.Section>
                        ) : (
                          <Card.Section p="md" style={{ minHeight: 120, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f8f9fa" }}>
                            <Link href={`/application/cart/non-tangible/${item.id}`} style={{ textDecoration: "none" }}>
                              <Group>
                                <IconPlane size={32} color="#228be6" />
                                <Text size="sm" c="blue" fw={500}>Click to edit service</Text>
                              </Group>
                            </Link>
                          </Card.Section>
                        )}
                        <Stack gap="xs" mt="md">
                          <Group justify="space-between" align="flex-start">
                            <div style={{ flex: 1 }}>
                              <Text fw={600} size="sm" lineClamp={2}>{item.name}</Text>
                              <Text size="xs" c="dimmed" mt={4}>{item.id}</Text>
                            </div>
                            <ActionIcon variant="subtle" color="gray">
                              <IconHeart size={18} />
                            </ActionIcon>
                          </Group>
                          <Badge size="sm" variant="light" color={item.inStock ? "green" : "red"}>
                            {item.inStock ? "In Stock" : "Out of Stock"}
                          </Badge>
                          <Text size="xs" c="dimmed" lineClamp={2}>{item.description}</Text>
                          <Group justify="space-between" mt="xs">
                            <div>
                              <Text size="xs" c="dimmed">Supplier</Text>
                              <Text size="xs" fw={500}>{item.supplier}</Text>
                            </div>
                            <Text size="lg" fw={700} c="cyan">{item.price}</Text>
                          </Group>
                          <Button
                            leftSection={<IconShoppingCart size={16} />}
                            variant="filled"
                            fullWidth
                            disabled={!item.inStock}
                            mt="md"
                          >
                            Add to Cart
                          </Button>
                        </Stack>
                      </Card>
                    </Grid.Col>
                  ))}
                </Grid>
              ) : (
                <Table highlightOnHover>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Item</Table.Th>
                      <Table.Th>Category</Table.Th>
                      <Table.Th>Supplier</Table.Th>
                      <Table.Th>Price</Table.Th>
                      <Table.Th>Status</Table.Th>
                      <Table.Th>Actions</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {currentItems.map((item) => (
                      <Table.Tr key={item.id}>
                        <Table.Td>
                          <div>
                            <Text fw={500} size="sm">{item.name}</Text>
                            <Text size="xs" c="dimmed">{item.id}</Text>
                            <Text size="xs" c="dimmed" lineClamp={1}>{item.description}</Text>
                          </div>
                        </Table.Td>
                        <Table.Td>
                          <Badge variant="light" size="sm">{item.category}</Badge>
                        </Table.Td>
                        <Table.Td>
                          <Text size="sm">{item.supplier}</Text>
                        </Table.Td>
                        <Table.Td>
                          <Text size="sm" fw={600} c="cyan">{item.price}</Text>
                        </Table.Td>
                        <Table.Td>
                          <Badge variant="light" color={item.inStock ? "green" : "red"}>
                            {item.inStock ? "In Stock" : "Out of Stock"}
                          </Badge>
                        </Table.Td>
                        <Table.Td>
                          <Group gap="xs">
                            <ActionIcon variant="subtle" color="blue">
                              <Link href={activeTab === 'inventory' ? `/application/catalogue/${item.id}` : `/application/cart/non-tangible/${item.id}`}>
                                <IconEye size={16} />
                              </Link>
                            </ActionIcon>
                            <ActionIcon variant="subtle" color="orange">
                              <Link href={`/application/catalogue/${item.id}/edit`}>
                                <IconEdit size={16} />
                              </Link>
                            </ActionIcon>
                            <ActionIcon variant="subtle" color="gray">
                              <IconHeart size={16} />
                            </ActionIcon>
                            <Button
                              size="xs"
                              leftSection={<IconShoppingCart size={14} />}
                              disabled={!item.inStock}
                            >
                              Add to Cart
                            </Button>
                          </Group>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              )}

              <Group justify="center" mt="xl">
                <Pagination total={10} />
              </Group>
            </Stack>
          </Grid.Col>
        </Grid>
        )}

        {/* View Recommendation Modal */}
        <Modal
          opened={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
          title="Item Recommendation Details"
          size="lg"
          centered
        >
          {selectedRecommendation && (
            <Stack gap="md">
              <Group justify="space-between">
                <div>
                  <Text fw={600} size="lg">{selectedRecommendation.name}</Text>
                  <Text size="sm" c="dimmed">{selectedRecommendation.id}</Text>
                </div>
                <Badge variant="light">{selectedRecommendation.category}</Badge>
              </Group>
              
              <Paper p="md" withBorder>
                <Text fw={500} mb="xs">Description</Text>
                <Text size="sm">{selectedRecommendation.description}</Text>
              </Paper>
              
              <Grid>
                <Grid.Col span={6}>
                  <Paper p="md" withBorder>
                    <Text fw={500} mb="xs">Requested By</Text>
                    <Text size="sm">{selectedRecommendation.requestedBy}</Text>
                    <Text size="xs" c="dimmed">{selectedRecommendation.requestDate}</Text>
                  </Paper>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Paper p="md" withBorder>
                    <Text fw={500} mb="xs">Estimated Price</Text>
                    <Text size="lg" fw={600} c="cyan">{selectedRecommendation.estimatedPrice}</Text>
                  </Paper>
                </Grid.Col>
              </Grid>
              
              <Paper p="md" withBorder>
                <Text fw={500} mb="xs">Specifications</Text>
                <Text size="sm">{selectedRecommendation.reason}</Text>
              </Paper>
              
              <Group justify="flex-end" gap="sm">
                <Button
                  variant="outline"
                  onClick={() => setViewModalOpen(false)}
                >
                  Close
                </Button>
                <Button
                  color="red"
                  onClick={() => {
                    handleRejectRecommendation(selectedRecommendation.id);
                    setViewModalOpen(false);
                  }}
                >
                  Reject
                </Button>
                <Button
                  color="green"
                  onClick={() => {
                    handleApproveRecommendation(selectedRecommendation.id);
                    setViewModalOpen(false);
                  }}
                >
                  Approve & Add to Catalog
                </Button>
              </Group>
            </Stack>
          )}
        </Modal>
      </Stack>
    </ContentContainer>
  );
}