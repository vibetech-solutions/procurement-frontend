"use client";

import { ContentContainer } from "@/components/layout/content-container";
import {
  Card,
  Text,
  Group,
  Button,
  Stack,
  Title,
  TextInput,
  Textarea,
  NumberInput,
  Select,
  ActionIcon,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconDeviceFloppy,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface EditCatalogueItemProps {
  params: { item_id: string };
}

export default function EditCatalogueItem({ params }: EditCatalogueItemProps) {
  const router = useRouter();
  const { item_id } = params;

  // Mock data - replace with actual API call
  const [formData, setFormData] = useState({
    name: "Ergonomic Office Chair",
    category: "Furniture",
    supplier: "Office Pro Ltd",
    price: "38999",
    description: "Premium ergonomic chair with lumbar support, adjustable height, and breathable mesh back. Perfect for long working hours with maximum comfort and support.",
    inStock: true,
  });

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving item:", formData);
    router.push(`/application/catalogue/${item_id}`);
  };

  return (
    <ContentContainer>
      <Stack gap="lg">
        <Group>
          <ActionIcon variant="subtle" size="lg" onClick={() => router.back()}>
            <IconArrowLeft size={20} />
          </ActionIcon>
          <div>
            <Title order={2}>Edit Product</Title>
            <Text c="dimmed" size="sm">Product {item_id}</Text>
          </div>
        </Group>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="md">
            <TextInput
              label="Product Name"
              placeholder="Enter product name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <Group grow>
              <Select
                label="Category"
                placeholder="Select category"
                value={formData.category}
                onChange={(value) => setFormData({ ...formData, category: value || "" })}
                data={[
                  "Furniture",
                  "Electronics",
                  "Office Supplies",
                  "Stationery",
                  "Equipment",
                ]}
                required
              />
              <TextInput
                label="Supplier"
                placeholder="Enter supplier name"
                value={formData.supplier}
                onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                required
              />
            </Group>

            <NumberInput
              label="Price (KES)"
              placeholder="Enter price"
              value={parseFloat(formData.price)}
              onChange={(value) => setFormData({ ...formData, price: value?.toString() || "0" })}
              min={0}
              required
            />

            <Textarea
              label="Description"
              placeholder="Enter product description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              minRows={3}
              required
            />

            <Select
              label="Stock Status"
              value={formData.inStock ? "In Stock" : "Out of Stock"}
              onChange={(value) => setFormData({ ...formData, inStock: value === "In Stock" })}
              data={["In Stock", "Out of Stock"]}
              required
            />

            <Group justify="flex-end" mt="md">
              <Button variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button leftSection={<IconDeviceFloppy size={16} />} onClick={handleSave}>
                Save Changes
              </Button>
            </Group>
          </Stack>
        </Card>
      </Stack>
    </ContentContainer>
  );
}