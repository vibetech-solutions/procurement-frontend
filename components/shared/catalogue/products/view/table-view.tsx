import { getStockStatusConfig } from "@/lib/utils/helpers";
import { Product } from "@/types/product";
import {
  ActionIcon,
  Badge,
  Button,
  Group,
  Table,
  Text,
  Tooltip,
} from "@mantine/core";
import {
  IconEdit,
  IconEye,
  IconHeart,
  IconShoppingCart,
} from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

type CatalogItem = Product | {
  id: string;
  name: string;
  category: string;
  supplier: string;
  price: string;
  description: string;
  inStock: boolean;
};

const ProductTableView = ({
  activeTab,
  currentItems,
}: {
  currentItems: CatalogItem[];
  activeTab: string;
}) => {
  return (
    <Table highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Item</Table.Th>
          <Table.Th>Category</Table.Th>
          <Table.Th>Supplier</Table.Th>
          <Table.Th>Price</Table.Th>
          {activeTab === "inventory" && (
            <>
              <Table.Th>Stock</Table.Th>
              <Table.Th>Status</Table.Th>
            </>
          )}
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {currentItems.map((item) => {
          const stockStatus =
            "stock_status" in item
              ? getStockStatusConfig(item.stock_status)
              : null;
          const StatusIcon = stockStatus?.icon;

          return (
            <Table.Tr key={item.id}>
              <Table.Td>
                <div>
                  <Text fw={500} size="sm">
                    {item.name}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {"product_code" in item ? item.product_code : item.id}
                  </Text>
                  <Text size="xs" c="dimmed" lineClamp={1}>
                    {item.description}
                  </Text>
                </div>
              </Table.Td>
              <Table.Td>
                <Badge variant="light" size="sm">
                  {"category" in item && typeof item.category === 'object' ? item.category.name : item.category}
                </Badge>
              </Table.Td>
              <Table.Td>
                <Text size="sm">
                  {"suppliers" in item && item.suppliers?.length > 0
                    ? item.suppliers
                        .slice(0, 3)
                        .map((s) => s.company_name || s.name)
                        .join(", ")
                    : "No suppliers"}
                </Text>
              </Table.Td>
              <Table.Td>
                <Text size="sm" fw={600} c="cyan">
                  {"base_price" in item
                    ? `KES ${item.base_price?.toLocaleString()}`
                    : item.price}
                </Text>
              </Table.Td>
              {activeTab === "inventory" && (
                <>
                  <Table.Td>
                    <Text size="sm" fw={500}>
                      {"current_stock" in item
                        ? `${item.current_stock} units`
                        : "-"}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    {stockStatus && (
                      <Tooltip
                        label={`Current stock: ${
                          "current_stock" in item ? item.current_stock : 0
                        } units`}
                      >
                        <Badge
                          variant="light"
                          color={stockStatus.color}
                          leftSection={StatusIcon && <StatusIcon size={12} />}
                        >
                          {stockStatus.label}
                        </Badge>
                      </Tooltip>
                    )}
                  </Table.Td>
                </>
              )}
              <Table.Td>
                <Group gap="xs">
                  <ActionIcon variant="subtle" color="blue">
                    <Link
                      href={
                        activeTab === "inventory"
                          ? `/application/catalogue/${item.id}`
                          : `/application/cart/non-tangible/${item.id}`
                      }
                    >
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
                    disabled={
                      "stock_status" in item &&
                      item.stock_status === "out_of_stock"
                    }
                  >
                    Add to Cart
                  </Button>
                </Group>
              </Table.Td>
            </Table.Tr>
          );
        })}
      </Table.Tbody>
    </Table>
  );
};

export default ProductTableView;
