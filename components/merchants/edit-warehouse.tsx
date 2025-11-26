"use client";

import { useState, useEffect } from "react";
import { Stack, TextInput, Button, Group } from "@mantine/core";
import { Warehouse } from "@/types/warehouse";

interface EditWarehouseFormProps {
  warehouse: Warehouse;
  onSubmit: (data: { name: string; address: string; phone: string }) => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function EditWarehouseForm({ warehouse, onSubmit, onCancel, loading }: EditWarehouseFormProps) {
  const [formData, setFormData] = useState({
    name: warehouse.name,
    address: warehouse.address,
    phone: warehouse.phone,
  });

  useEffect(() => {
    setFormData({
      name: warehouse.name,
      address: warehouse.address,
      phone: warehouse.phone,
    });
  }, [warehouse]);

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Stack gap="md">
      <TextInput
        label="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.currentTarget.value })}
      />
      <TextInput
        label="Address"
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.currentTarget.value })}
      />
      <TextInput
        label="Phone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.currentTarget.value })}
      />
      <Group justify="flex-end" mt="md">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} loading={loading}>Save Changes</Button>
      </Group>
    </Stack>
  );
}