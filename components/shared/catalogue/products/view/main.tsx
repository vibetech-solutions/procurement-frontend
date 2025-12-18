import { Button, Grid, Group, Pagination, Stack, Text } from "@mantine/core";
import { IconGrid3x3, IconList } from "@tabler/icons-react";
import React from "react";
import ProductGridView from "./grid-view";
import ProductTableView from "./table-view";
import { Product } from "@/types/product";

type CatalogItem = Product | {
  id: string;
  name: string;
  category: string;
  supplier: string;
  price: string;
  description: string;
  inStock: boolean;
};

interface ProductsViewProps {
  currentItems: CatalogItem[];
  activeTab: string;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  pagination: { last_page: number };
}

const ProductsView = ({
  currentItems,
  activeTab,
  viewMode,
  setViewMode,
  pagination,
}: ProductsViewProps) => {
  return (
    <Grid.Col span={{ base: 12, md: 9 }}>
      <Stack gap="md">
        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            Showing {currentItems.length} items
          </Text>
          <Group gap="xs">
            <Button
              variant={viewMode === "grid" ? "filled" : "subtle"}
              size="xs"
              leftSection={<IconGrid3x3 size={14} />}
              onClick={() => setViewMode("grid")}
            >
              Grid
            </Button>
            <Button
              variant={viewMode === "list" ? "filled" : "subtle"}
              size="xs"
              leftSection={<IconList size={14} />}
              onClick={() => setViewMode("list")}
            >
              List
            </Button>
          </Group>
        </Group>

        {viewMode === "grid" ? (
          <ProductGridView currentItems={currentItems} activeTab={activeTab} />
        ) : (
          <ProductTableView activeTab={activeTab} currentItems={currentItems} />
        )}

        <Group justify="center" mt="xl">
          <Pagination total={pagination.last_page} />
        </Group>
      </Stack>
    </Grid.Col>
  );
};

export default ProductsView;
