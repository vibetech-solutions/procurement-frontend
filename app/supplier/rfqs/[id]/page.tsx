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
  ActionIcon,
  Divider,
} from "@mantine/core";
import { IconArrowLeft, IconFileText } from "@tabler/icons-react";
import Link from "next/link";
import { useParams } from "next/navigation";

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

export default function ViewRFQPage() {
  const params = useParams();
  const id = params.id as string;
  
  const rfq = supplierRFQs.find(r => r.id === id);

  if (!rfq) {
    return (
      <ContentContainer>
        <Text>RFQ not found</Text>
      </ContentContainer>
    );
  }

  // Mock RFQ items data
  const rfqItems = [
    {
      id: "1",
      name: "Dell XPS 15 Laptop",
      description: "High-performance business laptop",
      quantity: 3,
      specifications: "Intel i7, 16GB RAM, 512GB SSD",
    },
    {
      id: "2", 
      name: "Wireless Mouse",
      description: "Ergonomic wireless mouse",
      quantity: 3,
      specifications: "2.4GHz wireless, 1000 DPI",
    },
  ];

  return (
    <ContentContainer>
      <Stack gap="lg">
        <Group justify="space-between">
          <Group>
            <ActionIcon variant="subtle" component={Link} href="/supplier/rfqs">
              <IconArrowLeft size={16} />
            </ActionIcon>
            <div>
              <Title order={2}>{rfq.title}</Title>
              <Text c="dimmed" size="sm">
                {rfq.id} • {rfq.client}
              </Text>
            </div>
          </Group>
          {rfq.status === "Pending Response" && (
            <Button leftSection={<IconFileText size={16} />} component={Link} href={`/supplier/rfqs/${id}/quote`}>
              Submit Quote
            </Button>
          )}
        </Group>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="md">
            <Group justify="space-between">
              <Text fw={600} size="lg">RFQ Details</Text>
              <Badge variant="light" color={getStatusColor(rfq.status)}>
                {rfq.status}
              </Badge>
            </Group>

            <Group>
              <div>
                <Text size="xs" c="dimmed">Received Date</Text>
                <Text size="sm">{rfq.receivedDate}</Text>
              </div>
              <div>
                <Text size="xs" c="dimmed">Due Date</Text>
                <Text size="sm">{rfq.dueDate}</Text>
              </div>
              <div>
                <Text size="xs" c="dimmed">Estimated Value</Text>
                <Text size="sm" fw={600}>{rfq.estimatedValue}</Text>
              </div>
              <div>
                <Text size="xs" c="dimmed">Items Count</Text>
                <Text size="sm">{rfq.items}</Text>
              </div>
            </Group>

            <Divider />

            <div>
              <Text fw={600} mb="md">Requested Items</Text>
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Item</Table.Th>
                    <Table.Th>Description</Table.Th>
                    <Table.Th>Quantity</Table.Th>
                    <Table.Th>Specifications</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {rfqItems.map((item) => (
                    <Table.Tr key={item.id}>
                      <Table.Td>
                        <Text size="sm" fw={500}>{item.name}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm" c="dimmed">{item.description}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge variant="light">{item.quantity}</Badge>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">{item.specifications}</Text>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </div>
          </Stack>
        </Card>
      </Stack>
    </ContentContainer>
  );
}