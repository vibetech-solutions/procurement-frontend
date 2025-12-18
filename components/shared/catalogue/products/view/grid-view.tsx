import { getStockStatusConfig } from "@/lib/utils/helpers";
import { Product } from "@/types/product";

type CatalogItem = Product | {
  id: string;
  name: string;
  category: string;
  supplier: string;
  price: string;
  description: string;
  inStock: boolean;
  image?: string;
};
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Grid,
  Group,
  Image,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import {
  IconEdit,
  IconEye,
  IconHeart,
  IconPlane,
  IconShoppingCart,
} from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

const ProductGridView = ({
  currentItems,
  activeTab,
}: {
  currentItems: CatalogItem[];
  activeTab: string;
}) => {
  return (
    <Grid gutter="md">
      {currentItems.map((item) => {
        const stockStatus =
          "stock_status" in item
            ? getStockStatusConfig(item.stock_status)
            : null;
        const StatusIcon = stockStatus?.icon;

        return (
          <Grid.Col
            key={item.id}
            span={{ base: 12, sm: 6, lg: 4 }}
          >
            <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
              {activeTab === "inventory" ? (
                <Card.Section style={{ position: "relative" }}>
                  <Image
                    src={
                      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/storage/${item.image}` ||
                      "/placeholder.svg"
                    }
                    height={180}
                    alt={item.name}
                  />
                  <Group
                    gap="xs"
                    style={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                    }}
                  >
                    <ActionIcon variant="filled" color="blue" size="sm">
                      <Link href={`/application/catalogue/${item.id}`}>
                        <IconEye size={16} />
                      </Link>
                    </ActionIcon>
                    <ActionIcon variant="filled" color="orange" size="sm">
                      <Link
                        href={`/application/catalogue/${item.id}/edit`}
                      >
                        <IconEdit size={16} />
                      </Link>
                    </ActionIcon>
                  </Group>
                </Card.Section>
              ) : (
                <Card.Section
                  p="md"
                  style={{
                    minHeight: 120,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f8f9fa",
                  }}
                >
                  <Link
                    href={`/application/cart/non-tangible/${item.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Group>
                      <IconPlane size={32} color="#228be6" />
                      <Text size="sm" c="blue" fw={500}>
                        Click to edit service
                      </Text>
                    </Group>
                  </Link>
                </Card.Section>
              )}
              <Stack gap="xs" mt="md">
                <Group justify="space-between" align="flex-start">
                  <div style={{ flex: 1 }}>
                    <Text fw={600} size="sm" lineClamp={2}>
                      {item.name}
                    </Text>
                    <Text size="xs" c="dimmed" mt={4}>
                      {"product_code" in item
                        ? item.product_code
                        : item.id}
                    </Text>
                  </div>
                  <ActionIcon variant="subtle" color="gray">
                    <IconHeart size={18} />
                  </ActionIcon>
                </Group>

                {/* Stock Status and Current Stock */}
                {activeTab === "inventory" &&
                  "stock_status" in item &&
                  stockStatus && (
                    <Group justify="space-between" gap="xs">
                      <Tooltip
                        label={`Current stock: ${
                          "current_stock" in item
                            ? item.current_stock
                            : 0
                        } units`}
                      >
                        <Badge
                          size="sm"
                          variant="light"
                          color={stockStatus.color}
                          leftSection={StatusIcon && <StatusIcon size={12} />}
                        >
                          {stockStatus.label}
                        </Badge>
                      </Tooltip>
                      {"current_stock" in item && (
                        <Text size="xs" c="dimmed" fw={500}>
                          Stock: {item.current_stock} units
                        </Text>
                      )}
                    </Group>
                  )}

                <Text size="xs" c="dimmed" lineClamp={2}>
                  {item.description}
                </Text>
                <Group justify="space-between" mt="xs">
                  <div>
                    <Text size="xs" c="dimmed">
                      Suppliers
                    </Text>
                    <Text size="xs" fw={500}>
                      {"suppliers" in item && item.suppliers?.length > 0
                        ? item.suppliers
                            .slice(0, 3)
                            .map((s) => s.company_name || s.name)
                            .join(", ")
                        : "No suppliers"}
                    </Text>
                  </div>
                  <Text size="lg" fw={700} c="cyan">
                    {"base_price" in item
                      ? `KES ${item.base_price?.toLocaleString()}`
                      : item.price}
                  </Text>
                </Group>
                <Button
                  leftSection={<IconShoppingCart size={16} />}
                  variant="filled"
                  fullWidth
                  disabled={
                    "stock_status" in item &&
                    item.stock_status === "out_of_stock"
                  }
                  mt="md"
                >
                  Add to Cart
                </Button>
              </Stack>
            </Card>
          </Grid.Col>
        );
      })}
    </Grid>
  );
};

export default ProductGridView;
