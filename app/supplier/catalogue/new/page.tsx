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
  Badge,
} from "@mantine/core";
import { IconArrowLeft, IconDeviceFloppy, IconPackage, IconPlane } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function NewSupplierCatalogueItemPage() {
  const searchParams = useSearchParams();
  const itemType = searchParams.get('type') || 'inventory';
  const isInventoryItem = itemType === 'inventory';

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: isInventoryItem ? 0 : "",
    stock: 0,
    minOrderQty: 1,
    leadTime: "",
    description: "",
    specifications: "",
    status: isInventoryItem ? "Active" : "Available",
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
              href="/supplier/catalogue"
            >
              Back to Catalogue
            </Button>
            <div>
              <Group align="center" gap="sm">
                <Title order={2}>Add New {isInventoryItem ? "Product" : "Service"}</Title>
                <Badge leftSection={isInventoryItem ? <IconPackage size={12} /> : <IconPlane size={12} />} variant="light">
                  {isInventoryItem ? "Physical Product" : "Service"}
                </Badge>
              </Group>
              <Text c="dimmed" size="sm">
                Add a new {isInventoryItem ? "product" : "service"} to your catalogue
              </Text>
            </div>
          </Group>
        </Group>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="lg">
          <Stack gap="md">
            <TextInput
              label={`${isInventoryItem ? "Product" : "Service"} Name`}
              placeholder={`Enter ${isInventoryItem ? "product" : "service"} name`}
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />

            <Group grow>
              <Select
                label="Category"
                placeholder="Select category"
                value={formData.category}
                onChange={(value) => setFormData({...formData, category: value || ""})}
                data={isInventoryItem 
                  ? ["IT Equipment", "Office Supplies", "Furniture"]
                  : ["Travel", "Transport", "Professional Services", "Marketing"]
                }
                required
              />
              <TextInput
                label="Supplier"
                placeholder="Enter supplier name"
                value="Tech Solutions Inc"
                disabled
              />
            </Group>

            {isInventoryItem ? (
              <NumberInput
                label="Price (KES)"
                placeholder="Enter price"
                value={formData.price as number}
                onChange={(value) => setFormData({...formData, price: Number(value) || 0})}
                min={0}
                required
              />
            ) : (
              <TextInput
                label="Price"
                placeholder="e.g., From KES 15,000"
                value={formData.price as string}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                required
              />
            )}

            <Textarea
              label="Description"
              placeholder={`Enter ${isInventoryItem ? "product" : "service"} description`}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              minRows={3}
              required
            />

            {isInventoryItem && (
              <>
                <Group grow>
                  <NumberInput
                    label="Stock Level"
                    placeholder="Enter stock quantity"
                    value={formData.stock}
                    onChange={(value) => setFormData({...formData, stock: Number(value) || 0})}
                    min={0}
                  />
                  <NumberInput
                    label="Min Order Quantity"
                    placeholder="Enter minimum order quantity"
                    value={formData.minOrderQty}
                    onChange={(value) => setFormData({...formData, minOrderQty: Number(value) || 1})}
                    min={1}
                  />
                </Group>

                <Group grow>
                  <TextInput
                    label="Lead Time"
                    placeholder="e.g., 3-5 days"
                    value={formData.leadTime}
                    onChange={(e) => setFormData({...formData, leadTime: e.target.value})}
                  />
                  <Select
                    label="Status"
                    value={formData.status}
                    onChange={(value) => setFormData({...formData, status: value || ""})}
                    data={["Active", "Out of Stock", "Discontinued"]}
                    required
                  />
                </Group>

                <Textarea
                  label="Specifications"
                  placeholder="Enter technical specifications"
                  value={formData.specifications}
                  onChange={(e) => setFormData({...formData, specifications: e.target.value})}
                  minRows={2}
                />
              </>
            )}

            {!isInventoryItem && (
              <Select
                label="Availability"
                value={formData.status}
                onChange={(value) => setFormData({...formData, status: value || ""})}
                data={["Available", "Unavailable"]}
                required
              />
            )}
          </Stack>



            <Group justify="flex-end" gap="md" mt="xl">
              <Button
                variant="outline"
                component={Link}
                href="/supplier/catalogue"
              >
                Cancel
              </Button>
              <Button
                leftSection={<IconDeviceFloppy size={16} />}
                onClick={handleSubmit}
              >
                Save {isInventoryItem ? "Item" : "Service"}
              </Button>
            </Group>
          </Stack>
        </Card>
      </Stack>
    </ContentContainer>
  );
}