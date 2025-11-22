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
  TextInput,
  Select,
  ActionIcon,
  Tabs,
} from "@mantine/core";
import { IconSearch, IconEye, IconTruck, IconCheck, IconClock } from "@tabler/icons-react";

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

export default function SupplierOrdersPage() {
  const activeOrders = supplierOrders.filter(order => order.status !== "Delivered");
  const completedOrders = supplierOrders.filter(order => order.status === "Delivered");

  return (
    <ContentContainer>
      <Stack gap="lg">
        <div>
          <Title order={2} mb="xs">
            Purchase Orders
          </Title>
          <Text c="dimmed" size="sm">
            Manage and track your purchase orders
          </Text>
        </div>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Tabs defaultValue="active">
            <Tabs.List>
              <Tabs.Tab value="active" leftSection={<IconClock size={16} />}>
                Active ({activeOrders.length})
              </Tabs.Tab>
              <Tabs.Tab value="completed" leftSection={<IconCheck size={16} />}>
                Completed ({completedOrders.length})
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="active" pt="md">
              <Group mb="md" gap="md">
                <TextInput
                  placeholder="Search orders..."
                  leftSection={<IconSearch size={16} />}
                  style={{ flex: 1 }}
                />
                <Select
                  placeholder="Status"
                  data={["All Status", "In Progress", "In Transit", "Pending"]}
                  w={150}
                />
                <Select
                  placeholder="Client"
                  data={["All Clients", "Procurement Solutions Ltd"]}
                  w={200}
                />
              </Group>

              <Table highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>PO ID</Table.Th>
                    <Table.Th>Title</Table.Th>
                    <Table.Th>Client</Table.Th>
                    <Table.Th>Items</Table.Th>
                    <Table.Th>Amount</Table.Th>
                    <Table.Th>Order Date</Table.Th>
                    <Table.Th>Delivery Date</Table.Th>
                    <Table.Th>Status</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {activeOrders.map((order) => (
                    <Table.Tr key={order.id}>
                      <Table.Td>
                        <Text size="sm" fw={600}>
                          {order.id}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">{order.title}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">{order.client}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge variant="light" size="sm">
                          {order.items} items
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm" fw={600}>
                          {order.amount}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm" c="dimmed">
                          {order.orderDate}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm" c="dimmed">
                          {order.deliveryDate}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge variant="light" color={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Group gap="xs">
                          <ActionIcon variant="subtle" color="blue">
                            <IconEye size={16} />
                          </ActionIcon>
                          <ActionIcon variant="subtle" color="green">
                            <IconTruck size={16} />
                          </ActionIcon>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Tabs.Panel>

            <Tabs.Panel value="completed" pt="md">
              <Table highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>PO ID</Table.Th>
                    <Table.Th>Title</Table.Th>
                    <Table.Th>Client</Table.Th>
                    <Table.Th>Items</Table.Th>
                    <Table.Th>Amount</Table.Th>
                    <Table.Th>Order Date</Table.Th>
                    <Table.Th>Delivered Date</Table.Th>
                    <Table.Th>Status</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {completedOrders.map((order) => (
                    <Table.Tr key={order.id}>
                      <Table.Td>
                        <Text size="sm" fw={600}>
                          {order.id}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">{order.title}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">{order.client}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge variant="light" size="sm">
                          {order.items} items
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm" fw={600}>
                          {order.amount}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm" c="dimmed">
                          {order.orderDate}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm" c="dimmed">
                          {order.deliveredDate}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge variant="light" color={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <ActionIcon variant="subtle" color="blue">
                          <IconEye size={16} />
                        </ActionIcon>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Tabs.Panel>
          </Tabs>
        </Card>
      </Stack>
    </ContentContainer>
  );
}