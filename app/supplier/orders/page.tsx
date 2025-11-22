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
  Tooltip,
  Modal,
  Button,
} from "@mantine/core";
import { IconSearch, IconEye, IconTruck, IconCheck, IconClock, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

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
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deliveryModalOpen, setDeliveryModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [deliveryStatus, setDeliveryStatus] = useState("");
  
  const activeOrders = supplierOrders.filter(order => order.status !== "Delivered");
  const completedOrders = supplierOrders.filter(order => order.status === "Delivered");

  const handleDelete = (orderId: string) => {
    setSelectedOrder(orderId);
    setDeleteModalOpen(true);
  };

  const handleUpdateDelivery = (orderId: string) => {
    setSelectedOrder(orderId);
    setDeliveryModalOpen(true);
  };

  const confirmDelete = () => {
    console.log("Deleting order:", selectedOrder);
    setDeleteModalOpen(false);
    setSelectedOrder(null);
  };

  const confirmDeliveryUpdate = () => {
    console.log("Updating delivery status:", selectedOrder, deliveryStatus);
    setDeliveryModalOpen(false);
    setSelectedOrder(null);
    setDeliveryStatus("");
  };

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
                          <Tooltip label="View Order">
                            <ActionIcon variant="subtle" color="blue" component={Link} href={`/supplier/orders/${order.id}`}>
                              <IconEye size={16} />
                            </ActionIcon>
                          </Tooltip>
                          <Tooltip label="Update Delivery">
                            <ActionIcon variant="subtle" color="green" onClick={() => handleUpdateDelivery(order.id)}>
                              <IconTruck size={16} />
                            </ActionIcon>
                          </Tooltip>
                          <Tooltip label="Delete Order">
                            <ActionIcon variant="subtle" color="red" onClick={() => handleDelete(order.id)}>
                              <IconTrash size={16} />
                            </ActionIcon>
                          </Tooltip>
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
                        <Group gap="xs">
                          <Tooltip label="View Order">
                            <ActionIcon variant="subtle" color="blue" component={Link} href={`/supplier/orders/${order.id}`}>
                              <IconEye size={16} />
                            </ActionIcon>
                          </Tooltip>
                          <Tooltip label="Delete Order">
                            <ActionIcon variant="subtle" color="red" onClick={() => handleDelete(order.id)}>
                              <IconTrash size={16} />
                            </ActionIcon>
                          </Tooltip>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Tabs.Panel>
          </Tabs>
        </Card>

        <Modal
          opened={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          title="Delete Order"
          centered
        >
          <Text mb="md">
            Are you sure you want to delete this order? This action cannot be undone.
          </Text>
          <Group justify="flex-end">
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button color="red" onClick={confirmDelete}>
              Delete
            </Button>
          </Group>
        </Modal>

        <Modal
          opened={deliveryModalOpen}
          onClose={() => setDeliveryModalOpen(false)}
          title="Update Delivery Status"
          centered
        >
          <Stack gap="md">
            <Select
              label="Delivery Status"
              placeholder="Select new status"
              value={deliveryStatus}
              onChange={(value) => setDeliveryStatus(value || "")}
              data={["In Progress", "In Transit", "Delivered"]}
              required
            />
            <Group justify="flex-end">
              <Button variant="outline" onClick={() => setDeliveryModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={confirmDeliveryUpdate} disabled={!deliveryStatus}>
                Update Status
              </Button>
            </Group>
          </Stack>
        </Modal>
      </Stack>
    </ContentContainer>
  );
}