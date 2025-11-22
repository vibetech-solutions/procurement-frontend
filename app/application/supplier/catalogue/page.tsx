"use client";

import { ContentContainer } from "@/components/layout/content-container";
import { supplierCatalogueItems } from "@/lib/utils/constants";
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
} from "@mantine/core";
import { IconSearch, IconEye, IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import Link from "next/link";

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
          <Button leftSection={<IconPlus size={16} />} component={Link} href="/application/supplier/catalogue/new">
            Add New Item
          </Button>
        </Group>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group mb="md" gap="md">
            <TextInput
              placeholder="Search items..."
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
                      <ActionIcon variant="subtle" color="blue" component={Link} href={`/application/supplier/catalogue/${item.id}`}>
                        <IconEye size={16} />
                      </ActionIcon>
                      <ActionIcon variant="subtle" color="orange" component={Link} href={`/application/supplier/catalogue/${item.id}/edit`}>
                        <IconEdit size={16} />
                      </ActionIcon>
                      <ActionIcon variant="subtle" color="red">
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
    </ContentContainer>
  );
}