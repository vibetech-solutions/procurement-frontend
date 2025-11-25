"use client";

import { use, useState } from "react";
import {
  Container,
  Title,
  Text,
  Button,
  Stack,
  Card,
  Badge,
  Group,
  ActionIcon,
  Grid,
  Divider,
  Timeline,
  Modal,
  Textarea,
  Table,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconEdit,
  IconSignature,
  IconDownload,
  IconArchive,
  IconCheck,
  IconX,
  IconFileText,
  IconClock,
} from "@tabler/icons-react";
import Link from "next/link";

// Mock contract data
const contractDetails = {
  id: "CNT-2025-001",
  title: "Office Supplies Agreement",
  type: "Supplier Agreement",
  counterparty: "Office Pro Ltd",
  value: "KES 500,000",
  status: "Active",
  startDate: "2025-01-01",
  endDate: "2025-12-31",
  owner: "John Doe",
  stage: "Signed",
  priority: "Medium",
  description: "Annual agreement for office supplies including stationery, printing materials, and basic office equipment.",
  terms: "Net 30 payment terms. Delivery within 5 business days. Quality guarantee for 6 months.",
  createdDate: "2024-12-15",
  signedDate: "2025-01-01",
  renewalDate: "2025-10-01",
};

const contractHistory = [
  {
    title: "Contract Signed",
    description: "Contract signed by both parties",
    timestamp: "2025-01-01 14:30",
    user: "John Doe",
    status: "completed",
  },
  {
    title: "Legal Review Completed",
    description: "Legal team approved the contract terms",
    timestamp: "2024-12-28 16:45",
    user: "Legal Team",
    status: "completed",
  },
  {
    title: "Contract Sent for Approval",
    description: "Contract submitted for management approval",
    timestamp: "2024-12-20 09:15",
    user: "John Doe",
    status: "completed",
  },
  {
    title: "Contract Created",
    description: "Initial contract draft created",
    timestamp: "2024-12-15 11:00",
    user: "John Doe",
    status: "completed",
  },
];

const contractDocuments = [
  {
    name: "Main Contract Agreement",
    type: "PDF",
    size: "2.4 MB",
    uploadDate: "2024-12-15",
    version: "v2.1",
  },
  {
    name: "Signed Contract",
    type: "PDF", 
    size: "2.6 MB",
    uploadDate: "2025-01-01",
    version: "Final",
  },
  {
    name: "Terms & Conditions",
    type: "PDF",
    size: "1.2 MB", 
    uploadDate: "2024-12-15",
    version: "v1.0",
  },
];

function getStatusColor(status: string) {
  switch (status) {
    case "Active": return "green";
    case "Pending Approval": return "orange";
    case "Draft": return "gray";
    case "Expired": return "red";
    default: return "blue";
  }
}

export default function ContractDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [approvalModalOpen, setApprovalModalOpen] = useState(false);
  const [rejectionModalOpen, setRejectionModalOpen] = useState(false);
  const [comments, setComments] = useState("");

  return (
    <Container size="xl" py="md">
      <Stack gap="lg">
        {/* Header */}
        <Group justify="space-between">
          <Group>
            <ActionIcon
              variant="subtle"
              component={Link}
              href="/application/contracts"
            >
              <IconArrowLeft size={20} />
            </ActionIcon>
            <div>
              <Title order={2}>{contractDetails.title}</Title>
              <Text c="dimmed" size="sm">{contractDetails.id}</Text>
            </div>
          </Group>
          <Group gap="sm">
            <Button
              variant="outline"
              leftSection={<IconEdit size={16} />}
              component={Link}
              href={`/application/contracts/${id}/edit`}
            >
              Edit
            </Button>
            <Button leftSection={<IconSignature size={16} />}>
              Send for Signature
            </Button>
          </Group>
        </Group>

        <Grid>
          {/* Main Content */}
          <Grid.Col span={8}>
            <Stack gap="lg">
              {/* Contract Overview */}
              <Card withBorder p="lg">
                <Group justify="space-between" mb="md">
                  <Title order={4}>Contract Overview</Title>
                  <Badge color={getStatusColor(contractDetails.status)} size="lg">
                    {contractDetails.status}
                  </Badge>
                </Group>
                
                <Grid>
                  <Grid.Col span={6}>
                    <Stack gap="sm">
                      <div>
                        <Text size="xs" c="dimmed">Counterparty</Text>
                        <Text fw={500}>{contractDetails.counterparty}</Text>
                      </div>
                      <div>
                        <Text size="xs" c="dimmed">Contract Type</Text>
                        <Text fw={500}>{contractDetails.type}</Text>
                      </div>
                      <div>
                        <Text size="xs" c="dimmed">Contract Value</Text>
                        <Text fw={600} c="blue">{contractDetails.value}</Text>
                      </div>
                    </Stack>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Stack gap="sm">
                      <div>
                        <Text size="xs" c="dimmed">Start Date</Text>
                        <Text fw={500}>{contractDetails.startDate}</Text>
                      </div>
                      <div>
                        <Text size="xs" c="dimmed">End Date</Text>
                        <Text fw={500}>{contractDetails.endDate}</Text>
                      </div>
                      <div>
                        <Text size="xs" c="dimmed">Owner</Text>
                        <Text fw={500}>{contractDetails.owner}</Text>
                      </div>
                    </Stack>
                  </Grid.Col>
                </Grid>

                <Divider my="md" />

                <div>
                  <Text size="sm" fw={500} mb="xs">Description</Text>
                  <Text size="sm" c="dimmed">{contractDetails.description}</Text>
                </div>

                <div>
                  <Text size="sm" fw={500} mb="xs" mt="md">Key Terms</Text>
                  <Text size="sm" c="dimmed">{contractDetails.terms}</Text>
                </div>
              </Card>

              {/* Documents */}
              <Card withBorder p="lg">
                <Title order={4} mb="md">Contract Documents</Title>
                <Table>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Document Name</Table.Th>
                      <Table.Th>Version</Table.Th>
                      <Table.Th>Size</Table.Th>
                      <Table.Th>Upload Date</Table.Th>
                      <Table.Th>Actions</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {contractDocuments.map((doc, index) => (
                      <Table.Tr key={index}>
                        <Table.Td>
                          <Group gap="xs">
                            <IconFileText size={16} />
                            <Text size="sm">{doc.name}</Text>
                          </Group>
                        </Table.Td>
                        <Table.Td>
                          <Badge variant="light" size="sm">{doc.version}</Badge>
                        </Table.Td>
                        <Table.Td>
                          <Text size="sm">{doc.size}</Text>
                        </Table.Td>
                        <Table.Td>
                          <Text size="sm">{doc.uploadDate}</Text>
                        </Table.Td>
                        <Table.Td>
                          <ActionIcon variant="subtle" color="blue">
                            <IconDownload size={16} />
                          </ActionIcon>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </Card>
            </Stack>
          </Grid.Col>

          {/* Sidebar */}
          <Grid.Col span={4}>
            <Stack gap="lg">
              {/* Quick Actions */}
              <Card withBorder p="md">
                <Title order={5} mb="md">Quick Actions</Title>
                <Stack gap="xs">
                  <Button variant="light" leftSection={<IconDownload size={16} />} fullWidth>
                    Download Contract
                  </Button>
                  <Button variant="light" leftSection={<IconSignature size={16} />} fullWidth>
                    Request Signature
                  </Button>
                  <Button variant="light" leftSection={<IconArchive size={16} />} fullWidth>
                    Archive Contract
                  </Button>
                  {contractDetails.status === "Pending Approval" && (
                    <>
                      <Button 
                        color="green" 
                        leftSection={<IconCheck size={16} />} 
                        fullWidth
                        onClick={() => setApprovalModalOpen(true)}
                      >
                        Approve
                      </Button>
                      <Button 
                        color="red" 
                        leftSection={<IconX size={16} />} 
                        fullWidth
                        onClick={() => setRejectionModalOpen(true)}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </Stack>
              </Card>

              {/* Contract Timeline */}
              <Card withBorder p="md">
                <Title order={5} mb="md">Contract History</Title>
                <Timeline active={contractHistory.length} bulletSize={24} lineWidth={2}>
                  {contractHistory.map((event, index) => (
                    <Timeline.Item
                      key={index}
                      bullet={<IconClock size={12} />}
                      title={event.title}
                    >
                      <Text c="dimmed" size="sm">{event.description}</Text>
                      <Text size="xs" c="dimmed" mt={4}>
                        {event.timestamp} • {event.user}
                      </Text>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </Card>
            </Stack>
          </Grid.Col>
        </Grid>

        {/* Approval Modal */}
        <Modal
          opened={approvalModalOpen}
          onClose={() => setApprovalModalOpen(false)}
          title="Approve Contract"
          centered
        >
          <Stack gap="md">
            <Text size="sm">
              Are you sure you want to approve this contract? This action will move the contract to the next stage.
            </Text>
            <Textarea
              label="Comments (Optional)"
              placeholder="Add any comments..."
              value={comments}
              onChange={(e) => setComments(e.currentTarget.value)}
            />
            <Group justify="flex-end" gap="sm">
              <Button variant="outline" onClick={() => setApprovalModalOpen(false)}>
                Cancel
              </Button>
              <Button color="green" onClick={() => setApprovalModalOpen(false)}>
                Approve Contract
              </Button>
            </Group>
          </Stack>
        </Modal>

        {/* Rejection Modal */}
        <Modal
          opened={rejectionModalOpen}
          onClose={() => setRejectionModalOpen(false)}
          title="Reject Contract"
          centered
        >
          <Stack gap="md">
            <Text size="sm">
              Please provide a reason for rejecting this contract. This will be sent back to the owner for revision.
            </Text>
            <Textarea
              label="Rejection Reason"
              placeholder="Explain why this contract is being rejected..."
              value={comments}
              onChange={(e) => setComments(e.currentTarget.value)}
              required
            />
            <Group justify="flex-end" gap="sm">
              <Button variant="outline" onClick={() => setRejectionModalOpen(false)}>
                Cancel
              </Button>
              <Button color="red" onClick={() => setRejectionModalOpen(false)}>
                Reject Contract
              </Button>
            </Group>
          </Stack>
        </Modal>
      </Stack>
    </Container>
  );
}