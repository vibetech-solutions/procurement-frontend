"use client";

import { ContentContainer } from "@/components/layout/content-container";
import { supplierQuotations } from "@/lib/utils/constants";
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
} from "@mantine/core";
import { IconSearch, IconEye } from "@tabler/icons-react";

function getStatusColor(status: string) {
  switch (status) {
    case "Accepted":
      return "green";
    case "Pending Review":
      return "orange";
    case "Rejected":
      return "red";
    default:
      return "gray";
  }
}

export default function SupplierQuotationsPage() {
  return (
    <ContentContainer>
      <Stack gap="lg">
        <div>
          <Title order={2} mb="xs">
            My Quotations
          </Title>
          <Text c="dimmed" size="sm">
            Track your submitted quotations and their status
          </Text>
        </div>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group mb="md" gap="md">
            <TextInput
              placeholder="Search quotations..."
              leftSection={<IconSearch size={16} />}
              style={{ flex: 1 }}
            />
            <Select
              placeholder="Status"
              data={["All Status", "Pending Review", "Accepted", "Rejected"]}
              w={180}
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
                <Table.Th>Quotation ID</Table.Th>
                <Table.Th>RFQ ID</Table.Th>
                <Table.Th>Title</Table.Th>
                <Table.Th>Client</Table.Th>
                <Table.Th>Amount</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Submitted Date</Table.Th>
                <Table.Th>Valid Until</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {supplierQuotations.map((quotation) => (
                <Table.Tr key={quotation.id}>
                  <Table.Td>
                    <Text size="sm" fw={600}>
                      {quotation.id}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm">{quotation.rfqId}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm">{quotation.title}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm">{quotation.client}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm" fw={600}>
                      {quotation.amount}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Badge variant="light" color={getStatusColor(quotation.status)}>
                      {quotation.status}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm" c="dimmed">
                      {quotation.submittedDate}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm" c="dimmed">
                      {quotation.validUntil}
                    </Text>
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
        </Card>
      </Stack>
    </ContentContainer>
  );
}