"use client";

import { ContentContainer } from "@/components/layout/content-container";
import { supplierOrders } from "@/lib/utils/constants";
import {
  Card,
  Text,
  Group,
  Stack,
  Title,
  Badge,
  Table,
  ActionIcon,
  Divider,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { useParams } from "next/navigation";

function getStatusColor(status: string) {
  switch (status) {
    case "Delivered":
      return "green";
    case "In Progress":
      return "blue";
    case "In Transit":
      return "cyan";
    case "Pending":
      return "orange";
    default:
      return "gray";
  }
}

export default function ViewOrderPage() {
  const params = useParams();
  const id = params.id as string;
  
  const order = supplierOrders.find(o => o.id === id);

  if (!order) {
    return (
      <ContentContainer>
        <Text>Order not found</Text>
      </ContentContainer>
    );
  }

  // Mock order items
  const orderItems = [
    {
      id: "1",
      name: "Dell XPS 15 Laptop",
      quantity: 3,
      unitPrice: 194999,
      total: 584997,
    },
    {
      id: "2",
      name: "Wireless Mouse",
      quantity: 3,
      unitPrice: 3899,
      total: 11697,
    },
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.16;
  const total = subtotal + tax;

  return (
    <ContentContainer>
      <Stack gap="lg">
        <Group>
          <ActionIcon variant="subtle" component={Link} href="/supplier/orders">
            <IconArrowLeft size={16} />
          </ActionIcon>
          <div>
            <Title order={2}>{order.title}</Title>
            <Text c="dimmed" size="sm">
              {order.id} • {order.client}
            </Text>
          </div>
        </Group>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="md">
            <Group justify="space-between">
              <Text fw={600} size="lg">Order Details</Text>
              <Badge variant="light" color={getStatusColor(order.status)}>
                {order.status}
              </Badge>
            </Group>

            <Group>
              <div>
                <Text size="xs" c="dimmed">Order Date</Text>
                <Text size="sm">{order.orderDate}</Text>
              </div>
              <div>
                <Text size="xs" c="dimmed">Delivery Date</Text>
                <Text size="sm">{order.deliveryDate}</Text>
              </div>
              {order.deliveredDate && (
                <div>
                  <Text size="xs" c="dimmed">Delivered Date</Text>
                  <Text size="sm">{order.deliveredDate}</Text>
                </div>
              )}
              <div>
                <Text size="xs" c="dimmed">Total Amount</Text>
                <Text size="sm" fw={600}>{order.amount}</Text>
              </div>
              <div>
                <Text size="xs" c="dimmed">Items Count</Text>
                <Text size="sm">{order.items}</Text>
              </div>
            </Group>

            <Divider />

            <div>
              <Text fw={600} mb="md">Order Items</Text>
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Item</Table.Th>
                    <Table.Th>Quantity</Table.Th>
                    <Table.Th>Unit Price (KES)</Table.Th>
                    <Table.Th>Total (KES)</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {orderItems.map((item) => (
                    <Table.Tr key={item.id}>
                      <Table.Td>
                        <Text size="sm" fw={500}>{item.name}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">{item.quantity}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">{item.unitPrice.toLocaleString()}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm" fw={600}>{item.total.toLocaleString()}</Text>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>

              <Group justify="flex-end" mt="md">
                <Stack gap="xs" align="flex-end">
                  <Group>
                    <Text size="sm">Subtotal:</Text>
                    <Text size="sm" fw={600}>KES {subtotal.toLocaleString()}</Text>
                  </Group>
                  <Group>
                    <Text size="sm">Tax (16%):</Text>
                    <Text size="sm" fw={600}>KES {tax.toLocaleString()}</Text>
                  </Group>
                  <Group>
                    <Text size="lg" fw={700}>Total:</Text>
                    <Text size="lg" fw={700} c="cyan">KES {total.toLocaleString()}</Text>
                  </Group>
                </Stack>
              </Group>
            </div>
          </Stack>
        </Card>
      </Stack>
    </ContentContainer>
  );
}