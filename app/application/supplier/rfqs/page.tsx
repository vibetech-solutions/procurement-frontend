"use client";

import { ContentContainer } from "@/components/layout/content-container";
import { supplierRFQs } from "@/lib/utils/constants";
import {
  Card,
  Text,
  Group,
  Button,
  Stack,
  Title,
  Badge,
  Table,
  TextInput,
  Select,
  ActionIcon,
  Tabs,
} from "@mantine/core";
import { IconSearch, IconEye, IconFileText, IconClock, IconCheck } from "@tabler/icons-react";
import Link from "next/link";

function getStatusColor(status: string) {
  switch (status) {
    case "Responded":
      return "green";
    case "Pending Response":
      return "orange";
    case "Draft":
      return "blue";
    case "Expired":
      return "red";
    default:
      return "gray";
  }
}

export default function SupplierRFQsPage() {
  const pendingRFQs = supplierRFQs.filter(rfq => rfq.status === "Pending Response");
  const respondedRFQs = supplierRFQs.filter(rfq => rfq.status === "Responded");
  const draftRFQs = supplierRFQs.filter(rfq => rfq.status === "Draft");

  return (
    <ContentContainer>
      <Stack gap="lg">
        <div>
          <Title order={2} mb="xs">
            Request for Quotations (RFQs)
          </Title>
          <Text c="dimmed" size="sm">
            Manage incoming RFQs and submit your quotations
          </Text>
        </div>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Tabs defaultValue="pending">
            <Tabs.List>
              <Tabs.Tab value="pending" leftSection={<IconClock size={16} />}>
                Pending ({pendingRFQs.length})
              </Tabs.Tab>
              <Tabs.Tab value="responded" leftSection={<IconCheck size={16} />}>
                Responded ({respondedRFQs.length})
              </Tabs.Tab>
              <Tabs.Tab value="draft" leftSection={<IconFileText size={16} />}>
                Draft ({draftRFQs.length})
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="pending" pt="md">
              <Group mb="md" gap="md">
                <TextInput
                  placeholder="Search RFQs..."
                  leftSection={<IconSearch size={16} />}
                  style={{ flex: 1 }}
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
                    <Table.Th>RFQ ID</Table.Th>
                    <Table.Th>Title</Table.Th>
                    <Table.Th>Client</Table.Th>
                    <Table.Th>Items</Table.Th>
                    <Table.Th>Est. Value</Table.Th>
                    <Table.Th>Due Date</Table.Th>
                    <Table.Th>Status</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {pendingRFQs.map((rfq) => (
                    <Table.Tr key={rfq.id}>
                      <Table.Td>
                        <Text size="sm" fw={600}>
                          {rfq.id}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">{rfq.title}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">{rfq.client}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge variant="light" size="sm">
                          {rfq.items} items
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm" fw={600}>
                          {rfq.estimatedValue}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm" c="dimmed">
                          {rfq.dueDate}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge variant="light" color={getStatusColor(rfq.status)}>
                          {rfq.status}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Group gap="xs">
                          <ActionIcon variant="subtle" color="blue" component={Link} href={`/application/supplier/rfqs/${rfq.id}`}>
                            <IconEye size={16} />
                          </ActionIcon>
                          <Button size="xs" variant="filled">
                            Submit Quote
                          </Button>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Tabs.Panel>

            <Tabs.Panel value="responded" pt="md">
              <Table highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>RFQ ID</Table.Th>
                    <Table.Th>Title</Table.Th>
                    <Table.Th>Client</Table.Th>
                    <Table.Th>Items</Table.Th>
                    <Table.Th>Est. Value</Table.Th>
                    <Table.Th>Response Date</Table.Th>
                    <Table.Th>Status</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {respondedRFQs.map((rfq) => (
                    <Table.Tr key={rfq.id}>
                      <Table.Td>
                        <Text size="sm" fw={600}>
                          {rfq.id}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">{rfq.title}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">{rfq.client}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge variant="light" size="sm">
                          {rfq.items} items
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm" fw={600}>
                          {rfq.estimatedValue}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm" c="dimmed">
                          {rfq.receivedDate}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge variant="light" color={getStatusColor(rfq.status)}>
                          {rfq.status}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <ActionIcon variant="subtle" color="blue" component={Link} href={`/application/supplier/rfqs/${rfq.id}`}>
                          <IconEye size={16} />
                        </ActionIcon>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Tabs.Panel>

            <Tabs.Panel value="draft" pt="md">
              <Table highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>RFQ ID</Table.Th>
                    <Table.Th>Title</Table.Th>
                    <Table.Th>Client</Table.Th>
                    <Table.Th>Items</Table.Th>
                    <Table.Th>Est. Value</Table.Th>
                    <Table.Th>Due Date</Table.Th>
                    <Table.Th>Status</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {draftRFQs.map((rfq) => (
                    <Table.Tr key={rfq.id}>
                      <Table.Td>
                        <Text size="sm" fw={600}>
                          {rfq.id}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">{rfq.title}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">{rfq.client}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge variant="light" size="sm">
                          {rfq.items} items
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm" fw={600}>
                          {rfq.estimatedValue}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm" c="dimmed">
                          {rfq.dueDate}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge variant="light" color={getStatusColor(rfq.status)}>
                          {rfq.status}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Group gap="xs">
                          <ActionIcon variant="subtle" color="blue" component={Link} href={`/application/supplier/rfqs/${rfq.id}`}>
                            <IconEye size={16} />
                          </ActionIcon>
                          <Button size="xs" variant="outline">
                            Continue
                          </Button>
                        </Group>
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