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
import { useState, useEffect } from "react";

interface EditCatalogueItemProps {
  params: { item_id: string };
}

export default function EditSupplierCatalogueItem({ params }: EditCatalogueItemProps) {
  const router = useRouter();
  const { item_id } = params;

  // Find item in both inventory and non-tangible items
  const inventoryItem = supplierCatalogueItems.find(item => item.id === item_id);
  const serviceItem = supplierNonTangibleItems.find(item => item.id === item_id);
  
  const item = inventoryItem || serviceItem;
  const isInventoryItem = !!inventoryItem;

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    supplier: "",
    price: "",
    description: "",
    status: "",
    stock: 0,
    minOrderQty: 1,
    leadTime: "",
    specifications: "",
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        category: item.category,
        supplier: 'supplier' in item ? item.supplier : 'Tech Solutions Inc',
        price: isInventoryItem ? (item as typeof supplierCatalogueItems[0]).price.toString() : (typeof item.price === 'string' ? item.price : item.price.toString()),
        description: item.description,
        status: isInventoryItem ? (item as typeof supplierCatalogueItems[0]).status : ('inStock' in item && item.inStock ? "Available" : "Unavailable"),
        stock: isInventoryItem ? (item as typeof supplierCatalogueItems[0]).stock : 0,
        minOrderQty: isInventoryItem ? (item as typeof supplierCatalogueItems[0]).minOrderQty : 1,
        leadTime: isInventoryItem ? (item as typeof supplierCatalogueItems[0]).leadTime : "",
        specifications: isInventoryItem && 'specifications' in item ? (item as typeof supplierCatalogueItems[0]).specifications : "",
      });
    }
  }, [item, isInventoryItem]);

  if (!item) {
    return (
      <ContentContainer>
        <Text>Item not found</Text>
      </ContentContainer>
    );
  }

  const handleSave = () => {
    console.log("Saving item:", formData);
    router.push(`/supplier/catalogue/${item_id}`);
  };

  return (
    <ContentContainer>
      <Stack gap="lg">
        <Group>
          <ActionIcon variant="subtle" size="lg" onClick={() => router.back()}>
            <IconArrowLeft size={20} />
          </ActionIcon>
          <div>
            <Title order={2}>Edit {isInventoryItem ? "Product" : "Service"}</Title>
            <Text c="dimmed" size="sm">Item {item_id}</Text>
          </div>
        </Group>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="md">
            <TextInput
              label="Item Name"
              placeholder="Enter item name"
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
                data={isInventoryItem 
                  ? ["IT Equipment", "Office Supplies", "Furniture"]
                  : ["Travel", "Transport", "Professional Services", "Marketing"]
                }
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

            {isInventoryItem ? (
              <NumberInput
                label="Price (KES)"
                placeholder="Enter price"
                value={parseFloat(formData.price)}
                onChange={(value) => setFormData({ ...formData, price: value?.toString() || "0" })}
                min={0}
                required
              />
            ) : (
              <TextInput
                label="Price"
                placeholder="e.g., From KES 15,000"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            )}

            <Textarea
              label="Description"
              placeholder="Enter item description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                    onChange={(value) => setFormData({ ...formData, stock: Number(value) || 0 })}
                    min={0}
                  />
                  <NumberInput
                    label="Min Order Quantity"
                    placeholder="Enter minimum order quantity"
                    value={formData.minOrderQty}
                    onChange={(value) => setFormData({ ...formData, minOrderQty: Number(value) || 1 })}
                    min={1}
                  />
                </Group>

                <Group grow>
                  <TextInput
                    label="Lead Time"
                    placeholder="e.g., 3-5 days"
                    value={formData.leadTime}
                    onChange={(e) => setFormData({ ...formData, leadTime: e.target.value })}
                  />
                  <Select
                    label="Status"
                    value={formData.status}
                    onChange={(value) => setFormData({ ...formData, status: value || "" })}
                    data={["Active", "Out of Stock", "Discontinued"]}
                    required
                  />
                </Group>

                <Textarea
                  label="Specifications"
                  placeholder="Enter technical specifications"
                  value={formData.specifications}
                  onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
                  minRows={2}
                />
              </>
            )}

            {!isInventoryItem && (
              <Select
                label="Availability"
                value={formData.status}
                onChange={(value) => setFormData({ ...formData, status: value || "" })}
                data={["Available", "Unavailable"]}
                required
              />
            )}

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