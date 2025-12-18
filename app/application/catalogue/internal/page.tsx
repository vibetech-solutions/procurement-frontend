"use client";

import { ContentContainer } from "@/components/layout/content-container";
import ProductsView from "@/components/shared/catalogue/products/view/main";
import { getProducts } from "@/lib/redux/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  catalogueCategories,
  catalogueItems,
  nonTangibleCatalogueItems,
  nonTangibleCategories,
} from "@/lib/utils/constants";
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
  ActionIcon,
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
  IconEye,
  IconFilter,
  IconGrid3x3,
  IconPlus,
  IconPlane,
  IconPackage,
  IconChevronDown,
  IconBulb,
  IconCheck,
  IconX,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

const recommendedProducts = [
  {
    id: "REC-001",
    name: "Wireless Presentation Remote",
    description:
      "Bluetooth presentation remote with laser pointer for conference rooms",
    category: "Electronics",
    estimatedPrice: "KES 3,500",
    requestedBy: "John Doe",
    requestDate: "2024-01-15",
    reason: "Needed for client presentations in meeting rooms",
    status: "pending",
    type: "product",
  },
  {
    id: "REC-002",
    name: "Ergonomic Standing Desk Converter",
    description:
      "Adjustable standing desk converter for health and productivity",
    category: "Office Furniture",
    estimatedPrice: "KES 25,000",
    requestedBy: "Jane Smith",
    requestDate: "2024-01-14",
    reason: "To improve employee wellness and reduce back strain",
    status: "pending",
    type: "product",
  },
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
    type: "service",
  },
];

export default function InternalCatalogPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeTab, setActiveTab] = useState<string | null>("inventory");
  const [recommendationTab, setRecommendationTab] = useState<string | null>(
    "products"
  );
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState<
    (typeof recommendedProducts)[0] | null
  >(null);
  const dispatch = useAppDispatch();

  const { products, pagination } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts(1));
  }, [dispatch]);

  const currentItems =
    activeTab === "inventory" ? products || [] : nonTangibleCatalogueItems;
  const currentCategories =
    activeTab === "inventory" ? catalogueCategories : nonTangibleCategories;

  const handleApproveRecommendation = (id: string) => {
    console.log("Approving recommendation:", id);
  };

  const handleRejectRecommendation = (id: string) => {
    console.log("Rejecting recommendation:", id);
  };

  const handleViewRecommendation = (id: string) => {
    const allRecommendations = [...recommendedProducts, ...recommendedServices];
    const item = allRecommendations.find((rec) => rec.id === id);
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
              <Button
                leftSection={<IconPlus size={16} />}
                rightSection={<IconChevronDown size={16} />}
              >
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
            <Tabs.Tab
              value="recommendations"
              leftSection={<IconBulb size={16} />}
            >
              Recommended Items (
              {recommendedProducts.length + recommendedServices.length})
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
                <Tabs.Tab
                  value="products"
                  leftSection={<IconPackage size={16} />}
                >
                  Products ({recommendedProducts.length})
                </Tabs.Tab>
                <Tabs.Tab
                  value="services"
                  leftSection={<IconPlane size={16} />}
                >
                  Services ({recommendedServices.length})
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="products" pt="md">
                <Paper p="md" withBorder>
                  <Text size="sm" c="dimmed" mb="md">
                    Review product recommendations from users. Approve to add to
                    catalog or reject with feedback.
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
                              <Text fw={500} size="sm">
                                {item.name}
                              </Text>
                              <Text size="xs" c="dimmed">
                                {item.id}
                              </Text>
                              <Text size="xs" c="dimmed" lineClamp={2}>
                                {item.description}
                              </Text>
                              <Badge variant="light" size="xs" mt={4}>
                                {item.category}
                              </Badge>
                            </div>
                          </Table.Td>
                          <Table.Td>
                            <div>
                              <Text size="sm">{item.requestedBy}</Text>
                              <Text size="xs" c="dimmed">
                                {item.requestDate}
                              </Text>
                            </div>
                          </Table.Td>
                          <Table.Td>
                            <Text size="sm" lineClamp={3}>
                              {item.reason}
                            </Text>
                          </Table.Td>
                          <Table.Td>
                            <Text size="sm" fw={600} c="cyan">
                              {item.estimatedPrice}
                            </Text>
                          </Table.Td>
                          <Table.Td>
                            <Group gap="xs">
                              <ActionIcon
                                variant="subtle"
                                color="blue"
                                size="sm"
                                onClick={() =>
                                  handleViewRecommendation(item.id)
                                }
                              >
                                <IconEye size={14} />
                              </ActionIcon>
                              <ActionIcon
                                variant="filled"
                                color="green"
                                size="sm"
                                onClick={() =>
                                  handleApproveRecommendation(item.id)
                                }
                              >
                                <IconCheck size={14} />
                              </ActionIcon>
                              <ActionIcon
                                variant="filled"
                                color="red"
                                size="sm"
                                onClick={() =>
                                  handleRejectRecommendation(item.id)
                                }
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
                    Review service recommendations from users. Approve to add to
                    catalog or reject with feedback.
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
                              <Text fw={500} size="sm">
                                {item.name}
                              </Text>
                              <Text size="xs" c="dimmed">
                                {item.id}
                              </Text>
                              <Text size="xs" c="dimmed" lineClamp={2}>
                                {item.description}
                              </Text>
                              <Badge variant="light" size="xs" mt={4}>
                                {item.category}
                              </Badge>
                            </div>
                          </Table.Td>
                          <Table.Td>
                            <div>
                              <Text size="sm">{item.requestedBy}</Text>
                              <Text size="xs" c="dimmed">
                                {item.requestDate}
                              </Text>
                            </div>
                          </Table.Td>
                          <Table.Td>
                            <Text size="sm" lineClamp={3}>
                              {item.reason}
                            </Text>
                          </Table.Td>
                          <Table.Td>
                            <Text size="sm" fw={600} c="cyan">
                              {item.estimatedPrice}
                            </Text>
                          </Table.Td>
                          <Table.Td>
                            <Group gap="xs">
                              <ActionIcon
                                variant="subtle"
                                color="blue"
                                size="sm"
                                onClick={() =>
                                  handleViewRecommendation(item.id)
                                }
                              >
                                <IconEye size={14} />
                              </ActionIcon>
                              <ActionIcon
                                variant="filled"
                                color="green"
                                size="sm"
                                onClick={() =>
                                  handleApproveRecommendation(item.id)
                                }
                              >
                                <IconCheck size={14} />
                              </ActionIcon>
                              <ActionIcon
                                variant="filled"
                                color="red"
                                size="sm"
                                onClick={() =>
                                  handleRejectRecommendation(item.id)
                                }
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

        {activeTab !== "recommendations" && (
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

                  <Accordion.Item value="base_price">
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
                      Stock Status
                    </Accordion.Control>
                    <Accordion.Panel>
                      <MultiSelect
                        data={[
                          { value: "in_stock", label: "In Stock" },
                          { value: "low_stock", label: "Low Stock" },
                          { value: "out_of_stock", label: "Out of Stock" },
                          { value: "overstock", label: "Overstock" },
                        ]}
                        placeholder="Select stock status"
                        clearable
                      />
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              </Card>
            </Grid.Col>

            <ProductsView
              currentItems={currentItems}
              viewMode={viewMode}
              setViewMode={setViewMode}
              activeTab={activeTab!}
              pagination={pagination}
            />
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
                  <Text fw={600} size="lg">
                    {selectedRecommendation.name}
                  </Text>
                  <Text size="sm" c="dimmed">
                    {selectedRecommendation.id}
                  </Text>
                </div>
                <Badge variant="light">{selectedRecommendation.category}</Badge>
              </Group>

              <Paper p="md" withBorder>
                <Text fw={500} mb="xs">
                  Description
                </Text>
                <Text size="sm">{selectedRecommendation.description}</Text>
              </Paper>

              <Grid>
                <Grid.Col span={6}>
                  <Paper p="md" withBorder>
                    <Text fw={500} mb="xs">
                      Requested By
                    </Text>
                    <Text size="sm">{selectedRecommendation.requestedBy}</Text>
                    <Text size="xs" c="dimmed">
                      {selectedRecommendation.requestDate}
                    </Text>
                  </Paper>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Paper p="md" withBorder>
                    <Text fw={500} mb="xs">
                      Estimated Price
                    </Text>
                    <Text size="lg" fw={600} c="cyan">
                      {selectedRecommendation.estimatedPrice}
                    </Text>
                  </Paper>
                </Grid.Col>
              </Grid>

              <Paper p="md" withBorder>
                <Text fw={500} mb="xs">
                  Specifications
                </Text>
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
