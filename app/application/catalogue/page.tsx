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
  Tooltip,
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
} from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

export default function CataloguePage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState<string | null>('inventory');
  
  const currentItems = activeTab === 'inventory' ? catalogueItems : nonTangibleCatalogueItems;
  const currentCategories = activeTab === 'inventory' ? catalogueCategories : nonTangibleCategories;

  return (
    <ContentContainer>
      <Stack gap="lg">
        <Group justify="space-between">
          <div>
            <Title order={2} mb="xs">
              Catalogue
            </Title>
            <Text c="dimmed" size="sm">
              Browse and search for items in the procurement catalogue
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
                href="/application/catalogue/new?type=inventory"
              >
                Product
              </Menu.Item>
              <Menu.Item
                leftSection={<IconPlane size={16} />}
                component="a"
                href="/application/catalogue/new?type=service"
              >
                Service
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
        </Tabs>

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
                        max={2000}
                        step={50}
                        defaultValue={[0, 2000]}
                        marks={[
                          { value: 0, label: "$0" },
                          { value: 2000, label: "$2000" },
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
                              <Tooltip label="View Item">
                                <ActionIcon
                                  variant="filled"
                                  color="blue"
                                  size="sm"
                                  component={Link}
                                  href={`/application/catalogue/${item.id}`}
                                >
                                  <IconEye size={16} />
                                </ActionIcon>
                              </Tooltip>
                              <Tooltip label="Edit Item">
                                <ActionIcon
                                  variant="filled"
                                  color="orange"
                                  size="sm"
                                  component={Link}
                                  href={`/application/catalogue/${item.id}/edit`}
                                >
                                  <IconEdit size={16} />
                                </ActionIcon>
                              </Tooltip>
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
                            <Tooltip label="View Item">
                              <ActionIcon variant="subtle" color="blue" component={Link} href={activeTab === 'inventory' ? `/application/catalogue/${item.id}` : `/application/cart/non-tangible/${item.id}`}>
                                <IconEye size={16} />
                              </ActionIcon>
                            </Tooltip>
                            <Tooltip label="Edit Item">
                              <ActionIcon variant="subtle" color="orange" component={Link} href={`/application/catalogue/${item.id}/edit`}>
                                <IconEdit size={16} />
                              </ActionIcon>
                            </Tooltip>
                            <Tooltip label="Add to Wishlist">
                              <ActionIcon variant="subtle" color="gray">
                                <IconHeart size={16} />
                              </ActionIcon>
                            </Tooltip>
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
      </Stack>
    </ContentContainer>
  );
}
