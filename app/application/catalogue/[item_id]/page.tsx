"use client";

import { ContentContainer } from "@/components/layout/content-container";
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
  NumberInput,
  Divider,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconShoppingCart,
  IconHeart,
  IconShare,
  IconEdit,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CatalogueItemProps {
  params: { item_id: string };
}

export default function CatalogueItem({ params }: CatalogueItemProps) {
  const router = useRouter();
  const { item_id } = params;
  const [quantity, setQuantity] = useState(1);

  // Mock data - replace with actual API call
  const item = {
    id: item_id,
    name: "Ergonomic Office Chair",
    category: "Furniture",
    supplier: "Office Pro Ltd",
    price: "KES 38,999",
    description: "Premium ergonomic chair with lumbar support, adjustable height, and breathable mesh back. Perfect for long working hours with maximum comfort and support.",
    image: "/ergonomic-office-chair.png",
    inStock: true,
    specifications: [
      { label: "Material", value: "Mesh and Fabric" },
      { label: "Weight Capacity", value: "300 lbs" },
      { label: "Dimensions", value: "26\" W x 26\" D x 40-44\" H" },
      { label: "Warranty", value: "5 years" },
    ],
    supplierDetails: {
      name: "Office Pro Ltd",
      contact: "+254 700 123 456",
      email: "sales@officepro.co.ke",
      location: "Nairobi, Kenya",
      rating: 4.5,
      deliveryTime: "3-5 business days",
    },
  };

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
              <Text c="dimmed" size="sm">Item {item.id}</Text>
            </div>
          </Group>
          <Button
            leftSection={<IconEdit size={16} />}
            variant="outline"
            onClick={() => router.push(`/application/catalogue/${item_id}/edit`)}
          >
            Edit Item
          </Button>
        </Group>

        <Grid gutter="lg">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="md">
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Image
                  src={item.image || "/placeholder.svg"}
                  height={400}
                  alt={item.name}
                  radius="md"
                />
              </Card>
              
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Title order={4} mb="md">Supplier Information</Title>
                <Stack gap="xs">
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">Company:</Text>
                    <Text size="sm" fw={500}>{item.supplierDetails.name}</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">Contact:</Text>
                    <Text size="sm">{item.supplierDetails.contact}</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">Email:</Text>
                    <Text size="sm">{item.supplierDetails.email}</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">Location:</Text>
                    <Text size="sm">{item.supplierDetails.location}</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">Rating:</Text>
                    <Text size="sm" fw={500}>{item.supplierDetails.rating}/5.0</Text>
                  </Group>
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">Delivery Time:</Text>
                    <Text size="sm">{item.supplierDetails.deliveryTime}</Text>
                  </Group>
                </Stack>
              </Card>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="md">
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="space-between" mb="md">
                  <Badge size="lg" variant="light" color={item.inStock ? "green" : "red"}>
                    {item.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                  <Group gap="xs">
                    <ActionIcon variant="subtle">
                      <IconHeart size={18} />
                    </ActionIcon>
                    <ActionIcon variant="subtle">
                      <IconShare size={18} />
                    </ActionIcon>
                  </Group>
                </Group>
                
                <Text size="xl" fw={700} c="cyan" mb="md">
                  {item.price}
                </Text>
                
                <Text size="sm" mb="md">
                  {item.description}
                </Text>
                
                <Group gap="xs" mb="md">
                  <Text size="sm" c="dimmed">Category:</Text>
                  <Badge variant="light" size="sm">{item.category}</Badge>
                </Group>
                
                <Group gap="xs" mb="md">
                  <Text size="sm" c="dimmed">Supplier:</Text>
                  <Text size="sm" fw={500}>{item.supplier}</Text>
                </Group>
                
                <Divider my="md" />
                
                <Group gap="md" mb="md">
                  <Text size="sm" fw={500}>Quantity:</Text>
                  <NumberInput
                    value={quantity}
                    onChange={(value) => setQuantity(typeof value === 'number' ? value : 1)}
                    min={1}
                    max={99}
                    w={100}
                  />
                </Group>
                
                <Button
                  leftSection={<IconShoppingCart size={16} />}
                  fullWidth
                  size="md"
                  disabled={!item.inStock}
                >
                  Add to Cart
                </Button>
              </Card>

              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Title order={4} mb="md">Specifications</Title>
                <Stack gap="xs">
                  {item.specifications.map((spec, index) => (
                    <Group key={index} justify="space-between">
                      <Text size="sm" c="dimmed">{spec.label}:</Text>
                      <Text size="sm" fw={500}>{spec.value}</Text>
                    </Group>
                  ))}
                </Stack>
              </Card>
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </ContentContainer>
  );
}