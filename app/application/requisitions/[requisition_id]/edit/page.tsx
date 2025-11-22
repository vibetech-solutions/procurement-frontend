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
  Select,
  Table,
  ActionIcon,
  NumberInput,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconDeviceFloppy,
  IconTrash,
  IconPlus,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface EditRequisitionProps {
  params: { requisition_id: string };
}

export default function EditRequisition({ params }: EditRequisitionProps) {
  const router = useRouter();
  const { requisition_id } = params;

  const [formData, setFormData] = useState({
    title: "Q1 Office Equipment",
    description: "Quarterly office equipment procurement for the general department",
    justification: "Required to support new team members and replace aging equipment",
    priority: "High",
    items: [
      { id: "CAT-001", name: "Ergonomic Office Chair", category: "Furniture", quantity: 2, unitPrice: 38999 },
      { id: "CAT-002", name: "Laptop - Dell XPS 15", category: "IT Equipment", quantity: 1, unitPrice: 194999 },
      { id: "CAT-003", name: "Printer Paper (500 sheets)", category: "Office Supplies", quantity: 5, unitPrice: 1689 },
    ],
  });

  const updateItem = (index: number, field: string, value: string | number) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData({ ...formData, items: newItems });
  };

  const removeItem = (index: number) => {
    setFormData({ ...formData, items: formData.items.filter((_, i) => i !== index) });
  };

  const totalAmount = formData.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);

  return (
    <ContentContainer>
      <Stack gap="lg">
        <Group justify="space-between">
          <Group>
            <ActionIcon variant="subtle" size="lg" onClick={() => router.back()}>
              <IconArrowLeft size={20} />
            </ActionIcon>
            <div>
              <Title order={2}>Edit Requisition</Title>
              <Text c="dimmed" size="sm">Requisition {requisition_id}</Text>
            </div>
          </Group>
          <Group>
            <Button variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button leftSection={<IconDeviceFloppy size={16} />}>
              Save Changes
            </Button>
          </Group>
        </Group>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={4} mb="md">Request Information</Title>
          <Stack gap="md">
            <TextInput
              label="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <Textarea
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
            <Textarea
              label="Business Justification"
              value={formData.justification}
              onChange={(e) => setFormData({ ...formData, justification: e.target.value })}
              rows={3}
            />
            <Select
              label="Priority"
              value={formData.priority}
              onChange={(value) => setFormData({ ...formData, priority: value || "Medium" })}
              data={["Low", "Medium", "High", "Urgent"]}
            />
          </Stack>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between" mb="md">
            <Title order={4}>Items</Title>
            <Button size="sm" leftSection={<IconPlus size={16} />} variant="light">
              Add Item
            </Button>
          </Group>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Item</Table.Th>
                <Table.Th>Category</Table.Th>
                <Table.Th>Quantity</Table.Th>
                <Table.Th>Unit Price</Table.Th>
                <Table.Th>Total</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {formData.items.map((item, index) => (
                <Table.Tr key={item.id}>
                  <Table.Td>
                    <Text size="sm" fw={500}>{item.name}</Text>
                    <Text size="xs" c="dimmed">{item.id}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm">{item.category}</Text>
                  </Table.Td>
                  <Table.Td>
                    <NumberInput
                      value={item.quantity}
                      onChange={(value) => updateItem(index, "quantity", value || 1)}
                      min={1}
                      size="sm"
                      w={80}
                    />
                  </Table.Td>
                  <Table.Td>
                    <NumberInput
                      value={item.unitPrice}
                      onChange={(value) => updateItem(index, "unitPrice", value || 0)}
                      min={0}
                      decimalScale={2}
                      fixedDecimalScale
                      prefix="KES "
                      size="sm"
                      w={100}
                    />
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm" fw={600}>${(item.quantity * item.unitPrice).toFixed(2)}</Text>
                  </Table.Td>
                  <Table.Td>
                    <ActionIcon color="red" variant="subtle" onClick={() => removeItem(index)}>
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
          <Group justify="flex-end" mt="md">
            <Text size="lg" fw={700}>Total: ${totalAmount.toFixed(2)}</Text>
          </Group>
        </Card>
      </Stack>
    </ContentContainer>
  );
}
