"use client";

import { useState } from "react";
import {
  Container,
  Title,
  Paper,
  Table,
  Badge,
  Button,
  Group,
  ActionIcon,
  Text,
  TextInput,
  Select,
} from "@mantine/core";
import { IconPlus, IconEdit, IconTrash, IconSearch } from "@tabler/icons-react";
import Link from "next/link";

const roles = [
  {
    id: "ROLE-001",
    name: "Administrator",
    description: "Full system access and management",
    userCount: 3,
    permissions: ["All Permissions"],
    status: "Active",
  },
  {
    id: "ROLE-002", 
    name: "Procurement Manager",
    description: "Manage procurement processes and approvals",
    userCount: 5,
    permissions: ["Approve Requisitions", "Manage Suppliers", "Create Purchase Orders"],
    status: "Active",
  },
  {
    id: "ROLE-003",
    name: "Requester",
    description: "Create and submit requisitions",
    userCount: 25,
    permissions: ["Create Requisitions", "View Catalogue", "Track Orders"],
    status: "Active",
  },
  {
    id: "ROLE-004",
    name: "Finance Officer",
    description: "Financial oversight and budget management",
    userCount: 2,
    permissions: ["View Reports", "Manage Budgets", "Approve Payments"],
    status: "Active",
  },
];

export default function RolesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filteredRoles = roles.filter((role) => {
    const matchesSearch = role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         role.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || role.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Container size="xl">
      <Group justify="space-between" mb="xl">
        <Title order={2}>Roles Management</Title>
        <Button
          component={Link}
          href="/application/roles/new"
          leftSection={<IconPlus size={16} />}
        >
          Add Role
        </Button>
      </Group>

      <Paper p="md" mb="lg">
        <Group>
          <TextInput
            placeholder="Search roles..."
            leftSection={<IconSearch size={16} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.currentTarget.value)}
            style={{ flex: 1 }}
          />
          <Select
            placeholder="Filter by status"
            data={["Active", "Inactive"]}
            value={statusFilter}
            onChange={setStatusFilter}
            clearable
          />
        </Group>
      </Paper>

      <Paper>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Role Name</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Users</Table.Th>
              <Table.Th>Key Permissions</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {filteredRoles.map((role) => (
              <Table.Tr key={role.id}>
                <Table.Td>
                  <Text fw={500}>{role.name}</Text>
                  <Text size="sm" c="dimmed">{role.id}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{role.description}</Text>
                </Table.Td>
                <Table.Td>
                  <Badge variant="light" color="blue">
                    {role.userCount} users
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">
                    {role.permissions.slice(0, 2).join(", ")}
                    {role.permissions.length > 2 && ` +${role.permissions.length - 2} more`}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Badge color={role.status === "Active" ? "green" : "red"}>
                    {role.status}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <ActionIcon
                      component={Link}
                      href={`/application/roles/${role.id}`}
                      variant="subtle"
                      color="blue"
                    >
                      <IconEdit size={16} />
                    </ActionIcon>
                    <ActionIcon variant="subtle" color="red">
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Paper>
    </Container>
  );
}