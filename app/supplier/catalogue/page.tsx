"use client";

import { ContentContainer } from "@/components/layout/content-container";
import { supplierCatalogueItems, supplierNonTangibleItems } from "@/lib/utils/constants";
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
  Tabs,
  Menu,
  Tooltip,
} from "@mantine/core";
import { IconSearch, IconEye, IconEdit, IconPlus, IconTrash, IconPackage, IconPlane, IconChevronDown } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

function getStatusColor(status: string) {
  switch (status) {
    case "Active":
      return "green";
    case "Out of Stock":
      return "red";
    case "Discontinued":
      return "gray";
    default:
      return "blue";
  }
}

export default function SupplierCataloguePage() {
  const [activeTab, setActiveTab] = useState<string | null>('inventory');

  return (
    <ContentContainer>
      <Stack gap="lg">
        <Group justify="space-between">
          <div>
            <Title order={2} mb="xs">
              My Catalogue
            </Title>
            <Text c="dimmed" size="sm">
              Manage your product catalogue and inventory
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
                component={Link}
                href="/supplier/catalogue/new?type=inventory"
              >
                Product
              </Menu.Item>
              <Menu.Item
                leftSection={<IconPlane size={16} />}
                component={Link}
                href="/supplier/catalogue/new?type=service"
              >
                Service
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>

        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Tab value="inventory" leftSection={<IconPackage size={16} />}>
              Products ({supplierCatalogueItems.length})
            </Tabs.Tab>
            <Tabs.Tab value="services" leftSection={<IconPlane size={16} />}>
              Services ({supplierNonTangibleItems.length})
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="inventory" pt="md">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Group mb="md" gap="md">
                <TextInput
                  placeholder="Search products..."
                  leftSection={<IconSearch size={16} />}
                  style={{ flex: 1 }}
                />
                <Select
                  placeholder="Category"
                  data={["All Categories", "IT Equipment", "Office Supplies", "Furniture"]}
                  w={180}
                />
                <Select
                  placeholder="Status"
                  data={["All Status", "Active", "Out of Stock", "Discontinued"]}
                  w={150}
                />
              </Group>

              <Table highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Item ID</Table.Th>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Category</Table.Th>
                    <Table.Th>Price</Table.Th>
                    <Table.Th>Stock</Table.Th>
                    <Table.Th>Min Order</Table.Th>
                    <Table.Th>Lead Time</Table.Th>
                    <Table.Th>Status</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {supplierCatalogueItems.map((item) => (
                    <Table.Tr key={item.id}>
                      <Table.Td>
                        <Text size="sm" fw={600}>
                          {item.id}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <div>
                          <Text size="sm" fw={500}>
                            {item.name}
                          </Text>
                          <Text size="xs" c="dimmed" lineClamp={1}>
                            {item.description}
                          </Text>
                        </div>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">{item.category}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm" fw={600}>
                          KES {item.price.toLocaleString()}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge
                          variant="light"
                          color={item.stock > 10 ? "green" : item.stock > 0 ? "orange" : "red"}
                        >
                          {item.stock}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">{item.minOrderQty}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">{item.leadTime}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge variant="light" color={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Group gap="xs">
                          <Tooltip label="View Product">
                            <ActionIcon variant="subtle" color="blue" component={Link} href={`/supplier/catalogue/${item.id}`}>
                              <IconEye size={16} />
                            </ActionIcon>
                          </Tooltip>
                          <Tooltip label="Edit Product">
                            <ActionIcon variant="subtle" color="orange" component={Link} href={`/supplier/catalogue/${item.id}/edit`}>
                              <IconEdit size={16} />
                            </ActionIcon>
                          </Tooltip>
                          <Tooltip label="Delete Product">
                            <ActionIcon variant="subtle" color="red">
                              <IconTrash size={16} />
                            </ActionIcon>
                          </Tooltip>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Card>
          </Tabs.Panel>

          <Tabs.Panel value="services" pt="md">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Group mb="md" gap="md">
                <TextInput
                  placeholder="Search services..."
                  leftSection={<IconSearch size={16} />}
                  style={{ flex: 1 }}
                />
                <Select
                  placeholder="Category"
                  data={["All Categories", "Travel", "Transport", "Professional Services", "Marketing"]}
                  w={180}
                />
                <Select
                  placeholder="Status"
                  data={["All Status", "Active", "Inactive"]}
                  w={150}
                />
              </Group>

              <Table highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Service ID</Table.Th>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Category</Table.Th>
                    <Table.Th>Price</Table.Th>
                    <Table.Th>Availability</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {supplierNonTangibleItems.map((item) => (
                    <Table.Tr key={item.id}>
                      <Table.Td>
                        <Text size="sm" fw={600}>
                          {item.id}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <div>
                          <Text size="sm" fw={500}>
                            {item.name}
                          </Text>
                          <Text size="xs" c="dimmed" lineClamp={1}>
                            {item.description}
                          </Text>
                        </div>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">{item.category}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm" fw={600}>
                          {item.price}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge variant="light" color={item.inStock ? "green" : "red"}>
                          {item.inStock ? "Available" : "Unavailable"}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Group gap="xs">
                          <Tooltip label="View Service">
                            <ActionIcon variant="subtle" color="blue" component={Link} href={`/supplier/catalogue/${item.id}`}>
                              <IconEye size={16} />
                            </ActionIcon>
                          </Tooltip>
                          <Tooltip label="Edit Service">
                            <ActionIcon variant="subtle" color="orange" component={Link} href={`/supplier/catalogue/${item.id}/edit`}>
                              <IconEdit size={16} />
                            </ActionIcon>
                          </Tooltip>
                          <Tooltip label="Delete Service">
                            <ActionIcon variant="subtle" color="red">
                              <IconTrash size={16} />
                            </ActionIcon>
                          </Tooltip>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Card>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </ContentContainer>
  );
}