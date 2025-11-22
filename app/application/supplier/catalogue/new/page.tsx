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
  Select,
  NumberInput,
  Textarea,
  Grid,
  FileInput,
} from "@mantine/core";
import { IconArrowLeft, IconUpload, IconDeviceFloppy } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

export default function NewSupplierCatalogueItemPage() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: 0,
    stock: 0,
    minOrderQty: 1,
    leadTime: "",
    description: "",
    specifications: "",
    status: "Active",
  });

  const handleSubmit = () => {
    console.log("Creating new catalogue item:", formData);
    // Handle form submission
  };

  return (
    <ContentContainer>
      <Stack gap="lg">
        <Group justify="space-between">
          <Group>
            <Button
              variant="subtle"
              leftSection={<IconArrowLeft size={16} />}
              component={Link}
              href="/application/supplier/catalogue"
            >
              Back to Catalogue
            </Button>
            <div>
              <Title order={2}>Add New Item</Title>
              <Text c="dimmed" size="sm">
                Add a new product to your catalogue
              </Text>
            </div>
          </Group>
        </Group>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="lg">
            <Title order={4}>Product Information</Title>
            
            <Grid gutter="md">
              <Grid.Col span={8}>
                <TextInput
                  label="Product Name"
                  placeholder="Enter product name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <Select
                  label="Category"
                  placeholder="Select category"
                  value={formData.category}
                  onChange={(value) => setFormData({...formData, category: value || ""})}
                  data={["IT Equipment", "Office Supplies", "Furniture", "Software", "Hardware"]}
                  required
                />
              </Grid.Col>
              
              <Grid.Col span={12}>
                <Textarea
                  label="Description"
                  placeholder="Enter product description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  required
                />
              </Grid.Col>
              
              <Grid.Col span={12}>
                <Textarea
                  label="Specifications"
                  placeholder="Enter technical specifications"
                  value={formData.specifications}
                  onChange={(e) => setFormData({...formData, specifications: e.target.value})}
                  rows={3}
                />
              </Grid.Col>
            </Grid>

            <Title order={4} mt="lg">Pricing & Inventory</Title>
            
            <Grid gutter="md">
              <Grid.Col span={4}>
                <NumberInput
                  label="Unit Price (KES)"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={(value) => setFormData({...formData, price: Number(value) || 0})}
                  min={0}
                  decimalScale={2}
                  required
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <NumberInput
                  label="Current Stock"
                  placeholder="0"
                  value={formData.stock}
                  onChange={(value) => setFormData({...formData, stock: Number(value) || 0})}
                  min={0}
                  required
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <NumberInput
                  label="Minimum Order Quantity"
                  placeholder="1"
                  value={formData.minOrderQty}
                  onChange={(value) => setFormData({...formData, minOrderQty: Number(value) || 1})}
                  min={1}
                  required
                />
              </Grid.Col>
              
              <Grid.Col span={6}>
                <TextInput
                  label="Lead Time"
                  placeholder="e.g., 3-5 days"
                  value={formData.leadTime}
                  onChange={(e) => setFormData({...formData, leadTime: e.target.value})}
                  required
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Select
                  label="Status"
                  value={formData.status}
                  onChange={(value) => setFormData({...formData, status: value || "Active"})}
                  data={["Active", "Inactive", "Out of Stock"]}
                  required
                />
              </Grid.Col>
            </Grid>

            <Title order={4} mt="lg">Product Images</Title>
            
            <FileInput
              label="Upload Product Images"
              placeholder="Choose files"
              leftSection={<IconUpload size={16} />}
              accept="image/*"
              multiple
            />

            <Group justify="flex-end" gap="md" mt="xl">
              <Button
                variant="outline"
                component={Link}
                href="/application/supplier/catalogue"
              >
                Cancel
              </Button>
              <Button
                leftSection={<IconDeviceFloppy size={16} />}
                onClick={handleSubmit}
              >
                Save Item
              </Button>
            </Group>
          </Stack>
        </Card>
      </Stack>
    </ContentContainer>
  );
}