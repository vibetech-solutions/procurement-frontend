"use client";

import { useState } from "react";
import {
  Container,
  Title,
  Text,
  Button,
  Stack,
  Card,
  Table,
  Badge,
  Group,
  ActionIcon,
  TextInput,
  Select,
  Menu,
  Tabs,
} from "@mantine/core";
import {
  IconPlus,
  IconSearch,
  IconEye,
  IconEdit,
  IconSignature,
  IconDownload,
  IconDots,
  IconArchive,
  IconCheck,
  IconX,
} from "@tabler/icons-react";
import Link from "next/link";

// Mock contract data
const contracts = [
  {
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
  },
  {
    id: "CNT-2025-002", 
    title: "IT Equipment Lease",
    type: "Lease Agreement",
    counterparty: "Tech Solutions Inc",
    value: "KES 2,500,000",
    status: "Pending Approval",
    startDate: "2025-02-01",
    endDate: "2027-01-31",
    owner: "Jane Smith",
    stage: "Review",
    priority: "High",
  },
  {
    id: "CNT-2025-003",
    title: "Cleaning Services Contract",
    type: "Service Agreement", 
    counterparty: "Clean Corp",
    value: "KES 150,000",
    status: "Draft",
    startDate: "2025-03-01",
    endDate: "2025-08-31",
    owner: "Mike Johnson",
    stage: "Drafting",
    priority: "Low",
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

function getPriorityColor(priority: string) {
  switch (priority) {
    case "High": return "red";
    case "Medium": return "orange";
    case "Low": return "blue";
    default: return "gray";
  }
}

export default function ContractsPage() {
  const [activeTab, setActiveTab] = useState<string | null>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.counterparty.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "active") return matchesSearch && contract.status === "Active";
    if (activeTab === "pending") return matchesSearch && contract.status === "Pending Approval";
    if (activeTab === "draft") return matchesSearch && contract.status === "Draft";
    
    return matchesSearch;
  });

  return (
    <Container size="xl" py="md">
      <Stack gap="lg">
        {/* Header */}
        <Group justify="space-between">
          <div>
            <Title order={2} mb={4}>Contract Management</Title>
            <Text c="dimmed" size="sm">
              Manage your contract lifecycle from drafting to signing and renewal
            </Text>
          </div>
          <Button
            component={Link}
            href="/application/contracts/new"
            leftSection={<IconPlus size={16} />}
          >
            New Contract
          </Button>
        </Group>

        {/* Tabs */}
        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Tab value="all">All Contracts ({contracts.length})</Tabs.Tab>
            <Tabs.Tab value="active">Active ({contracts.filter(c => c.status === "Active").length})</Tabs.Tab>
            <Tabs.Tab value="pending">Pending Approval ({contracts.filter(c => c.status === "Pending Approval").length})</Tabs.Tab>
            <Tabs.Tab value="draft">Drafts ({contracts.filter(c => c.status === "Draft").length})</Tabs.Tab>
          </Tabs.List>
        </Tabs>

        {/* Filters */}
        <Card withBorder p="md">
          <Group gap="md">
            <TextInput
              placeholder="Search contracts..."
              leftSection={<IconSearch size={16} />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.currentTarget.value)}
              style={{ flex: 1, minWidth: 200 }}
            />
            <Select
              placeholder="Contract Type"
              data={["All Types", "Supplier Agreement", "Lease Agreement", "Service Agreement", "NDA"]}
              w={180}
            />
            <Select
              placeholder="Owner"
              data={["All Owners", "John Doe", "Jane Smith", "Mike Johnson"]}
              w={150}
            />
          </Group>
        </Card>

        {/* Contracts Table */}
        <Card withBorder p={0}>
          <Table highlightOnHover striped>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Contract Details</Table.Th>
                <Table.Th>Counterparty</Table.Th>
                <Table.Th>Value</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Dates</Table.Th>
                <Table.Th>Owner</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filteredContracts.map((contract) => (
                <Table.Tr key={contract.id}>
                  <Table.Td>
                    <div>
                      <Text fw={500} size="sm">{contract.title}</Text>
                      <Text size="xs" c="dimmed">{contract.id}</Text>
                      <Badge variant="light" size="xs" mt={2}>{contract.type}</Badge>
                    </div>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm">{contract.counterparty}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm" fw={600}>{contract.value}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Stack gap={4}>
                      <Badge color={getStatusColor(contract.status)} variant="light" size="sm">
                        {contract.status}
                      </Badge>
                      <Badge color={getPriorityColor(contract.priority)} variant="dot" size="xs">
                        {contract.priority}
                      </Badge>
                    </Stack>
                  </Table.Td>
                  <Table.Td>
                    <div>
                      <Text size="xs" c="dimmed">Start: {contract.startDate}</Text>
                      <Text size="xs" c="dimmed">End: {contract.endDate}</Text>
                    </div>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm">{contract.owner}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <ActionIcon
                        variant="subtle"
                        color="blue"
                        component={Link}
                        href={`/application/contracts/${contract.id}`}
                      >
                        <IconEye size={16} />
                      </ActionIcon>
                      <ActionIcon
                        variant="subtle"
                        color="orange"
                        component={Link}
                        href={`/application/contracts/${contract.id}/edit`}
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                      <Menu shadow="md" width={200}>
                        <Menu.Target>
                          <ActionIcon variant="subtle" color="gray">
                            <IconDots size={16} />
                          </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Item leftSection={<IconSignature size={14} />}>
                            Send for Signature
                          </Menu.Item>
                          <Menu.Item leftSection={<IconDownload size={14} />}>
                            Download PDF
                          </Menu.Item>
                          <Menu.Item leftSection={<IconArchive size={14} />}>
                            Archive
                          </Menu.Item>
                          {contract.status === "Pending Approval" && (
                            <>
                              <Menu.Divider />
                              <Menu.Item leftSection={<IconCheck size={14} />} color="green">
                                Approve
                              </Menu.Item>
                              <Menu.Item leftSection={<IconX size={14} />} color="red">
                                Reject
                              </Menu.Item>
                            </>
                          )}
                        </Menu.Dropdown>
                      </Menu>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Card>
      </Stack>
    </Container>
  );
}