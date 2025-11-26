"use client";

import { useState } from "react";
import { Stack, TextInput, Button, Group } from "@mantine/core";

interface AddWarehouseFormProps {
  onSubmit: (data: { name: string; address: string; phone: string }) => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function AddWarehouseForm({ onSubmit, onCancel, loading }: AddWarehouseFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Stack gap="md">
      <TextInput
        label="Name"
        placeholder="Enter warehouse name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.currentTarget.value })}
      />
      <TextInput
        label="Address"
        placeholder="Enter warehouse address"
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.currentTarget.value })}
      />
      <TextInput
        label="Phone"
        placeholder="Enter phone number"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.currentTarget.value })}
      />
      <Group justify="flex-end" mt="md">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} loading={loading}>Add Warehouse</Button>
      </Group>
    </Stack>
  );
}