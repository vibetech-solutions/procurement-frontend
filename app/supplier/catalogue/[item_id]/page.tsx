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
  Grid,
  ActionIcon,
  Image,
  Divider,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconEdit,
  IconTrash,
  IconPackage,
  IconPlane,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";

interface CatalogueItemProps {
  params: { item_id: string };
}

export default function SupplierCatalogueItem({ params }: CatalogueItemProps) {
  const router = useRouter();
  const { item_id } = params;

  // Find item in both inventory and non-tangible items
  const inventoryItem = supplierCatalogueItems.find(item => item.id === item_id);
  const serviceItem = supplierNonTangibleItems.find(item => item.id === item_id);
  
  const item = inventoryItem || serviceItem;
  const isInventoryItem = !!inventoryItem;

  if (!item) {
    return (
      <ContentContainer>
        <Text>Item not found</Text>
      </ContentContainer>
    );
  }

  return (
    <ContentContainer>
      <Stack gap="lg">
        <Group justify="space-between">
          <Group>
            <ActionIcon variant="subtle" size="lg" onClick={() => router.back()}>
              <IconArrowLeft size={20} />
            </ActionIcon>
            <div>
              <Title order={2}>{item.name}</Title>
              <Text c="dimmed" size="sm">
                {item.id} • {isInventoryItem ? "Product" : "Service"}
              </Text>
            </div>
          </Group>
          <Group>
            <Button
              leftSection={<IconEdit size={16} />}
              variant="outline"
              onClick={() => router.push(`/supplier/catalogue/${item_id}/edit`)}
            >
              Edit Item
            </Button>
            <Button variant="outline" color="red" leftSection={<IconTrash size={16} />}>
              Delete Item
            </Button>
          </Group>
        </Group>

        <Grid gutter="lg">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="md">
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                {isInventoryItem ? (
                  <Image
                    src="/placeholder.svg"
                    height={400}
                    alt={item.name}
                    radius="md"
                  />
                ) : (
                  <div style={{ 
                    height: 400, 
                    backgroundColor: "#f8f9fa", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    borderRadius: "8px"
                  }}>
                    <Group>
                      <IconPlane size={48} color="#228be6" />
                      <div>
                        <Text size="lg" fw={600} c="blue">Service</Text>
                        <Text size="sm" c="dimmed">Service-based offering</Text>
                      </div>
                    </Group>
                  </div>
                )}
              </Card>
              
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Title order={4} mb="md">Item Information</Title>
                <Stack gap="xs">
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">Category:</Text>
                    <Badge variant="light" size="sm">{item.category}</Badge>
                  </Group>
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">Supplier:</Text>
                    <Text size="sm" fw={500}>{'supplier' in item ? item.supplier : 'Tech Solutions Inc'}</Text>
                  </Group>
                  {isInventoryItem && (
                    <>
                      <Group justify="space-between">
                        <Text size="sm" c="dimmed">Stock Level:</Text>
                        <Badge
                          variant="light"
                          color={(item as typeof supplierCatalogueItems[0]).stock > 10 ? "green" : (item as typeof supplierCatalogueItems[0]).stock > 0 ? "orange" : "red"}
                        >
                          {(item as typeof supplierCatalogueItems[0]).stock} units
                        </Badge>
                      </Group>
                      <Group justify="space-between">
                        <Text size="sm" c="dimmed">Min Order Qty:</Text>
                        <Text size="sm">{(item as typeof supplierCatalogueItems[0]).minOrderQty}</Text>
                      </Group>
                      <Group justify="space-between">
                        <Text size="sm" c="dimmed">Lead Time:</Text>
                        <Text size="sm">{(item as typeof supplierCatalogueItems[0]).leadTime}</Text>
                      </Group>
                    </>
                  )}
                </Stack>
              </Card>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="md">
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="space-between" mb="md">
                  <Badge size="lg" variant="light" color={
                    isInventoryItem 
                      ? ((item as typeof supplierCatalogueItems[0]).status === "Active" ? "green" : "red")
                      : (('inStock' in item && item.inStock) ? "green" : "red")
                  }>
                    {isInventoryItem ? (item as typeof supplierCatalogueItems[0]).status : (('inStock' in item && item.inStock) ? "Available" : "Unavailable")}
                  </Badge>
                  <Group gap="xs">
                    {isInventoryItem ? <IconPackage size={20} /> : <IconPlane size={20} />}
                  </Group>
                </Group>
                
                <Text size="xl" fw={700} c="cyan" mb="md">
                  {isInventoryItem ? `KES ${(item as typeof supplierCatalogueItems[0]).price.toLocaleString()}` : item.price}
                </Text>
                
                <Text size="sm" mb="md">
                  {item.description}
                </Text>
                
                {isInventoryItem && 'specifications' in item && (
                  <>
                    <Divider my="md" />
                    <div>
                      <Text size="sm" fw={600} mb="xs">Specifications</Text>
                      <Text size="sm" c="dimmed">{(item as typeof supplierCatalogueItems[0]).specifications}</Text>
                    </div>
                  </>
                )}
              </Card>

              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Stack gap="md">
                  <Group>
                    {isInventoryItem ? <IconPackage size={20} /> : <IconPlane size={20} />}
                    <Text fw={600}>Item Type</Text>
                  </Group>
                  <Text size="sm" c="dimmed">
                    {isInventoryItem 
                      ? "This is a physical product that can be stocked and shipped."
                      : "This is a service that is delivered digitally or through service provision."
                    }
                  </Text>
                </Stack>
              </Card>
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </ContentContainer>
  );
}