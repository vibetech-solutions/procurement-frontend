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
  Tooltip,
  Modal,
  Button,
} from "@mantine/core";
import { IconSearch, IconEye, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

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
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState<string | null>(null);

  const handleDelete = (quotationId: string) => {
    setSelectedQuotation(quotationId);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    console.log("Deleting quotation:", selectedQuotation);
    setDeleteModalOpen(false);
    setSelectedQuotation(null);
  };

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
                    <Group gap="xs">
                      <Tooltip label="View Quotation">
                        <ActionIcon variant="subtle" color="blue" component={Link} href={`/supplier/quotations/${quotation.id}`}>
                          <IconEye size={16} />
                        </ActionIcon>
                      </Tooltip>
                      <Tooltip label="Delete Quotation">
                        <ActionIcon variant="subtle" color="red" onClick={() => handleDelete(quotation.id)}>
                          <IconTrash size={16} />
                        </ActionIcon>
                      </Tooltip>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Card>

        <Modal
          opened={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          title="Delete Quotation"
          centered
        >
          <Text mb="md">
            Are you sure you want to delete this quotation? This action cannot be undone.
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
      </Stack>
    </ContentContainer>
  );
}