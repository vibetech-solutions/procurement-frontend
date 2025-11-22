"use client";

import { useState } from "react";
import {
  Container,
  Title,
  Paper,
  TextInput,
  Textarea,
  Button,
  Group,
  Stack,
  Checkbox,
  Text,
  Badge,
  Grid,
  Card,
  Select,
} from "@mantine/core";
import { IconPlus, IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";

const permissionCategories = {
  "Requisitions": [
    "Create Requisitions",
    "Edit Own Requisitions", 
    "View All Requisitions",
    "Approve Requisitions",
    "Reject Requisitions"
  ],
  "Procurement": [
    "Manage RFQs",
    "Create Purchase Orders",
    "Manage Suppliers",
    "View Quotations",
    "Approve Purchase Orders"
  ],
  "Inventory": [
    "View Inventory",
    "Update Stock Levels",
    "Manage Catalogue",
    "Create Material Receipts"
  ],
  "Financial": [
    "View Reports",
    "Manage Budgets", 
    "Approve Payments",
    "View Financial Data"
  ],
  "Administration": [
    "Manage Users",
    "Manage Roles",
    "System Settings",
    "Audit Logs"
  ]
};

export default function NewRolePage() {
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const handlePermissionChange = (permission: string, checked: boolean) => {
    if (checked) {
      setSelectedPermissions([...selectedPermissions, permission]);
    } else {
      setSelectedPermissions(selectedPermissions.filter(p => p !== permission));
    }
  };

  return (
    <Container size="lg">
      <Group mb="xl">
        <Button
          component={Link}
          href="/application/roles"
          variant="subtle"
          leftSection={<IconArrowLeft size={16} />}
        >
          Back to Roles
        </Button>
        <Title order={2}>Add New Role</Title>
      </Group>

      <Stack gap="lg">
        <Paper p="md">
          <Title order={4} mb="md">Basic Information</Title>
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="Role Name"
                placeholder="Enter role name"
                value={roleName}
                onChange={(e) => setRoleName(e.currentTarget.value)}
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                label="Status"
                value={status}
                onChange={(value) => setStatus(value || "Active")}
                data={["Active", "Inactive"]}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Textarea
                label="Description"
                placeholder="Describe the role and its responsibilities"
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
                rows={3}
              />
            </Grid.Col>
          </Grid>
        </Paper>

        <Paper p="md">
          <Group justify="space-between" mb="md">
            <Title order={4}>Permissions</Title>
            <Badge color="blue">{selectedPermissions.length} permissions selected</Badge>
          </Group>
          
          <Stack gap="md">
            {Object.entries(permissionCategories).map(([category, permissions]) => (
              <Card key={category} withBorder>
                <Text fw={500} mb="sm">{category}</Text>
                <Stack gap="xs">
                  {permissions.map((permission) => (
                    <Checkbox
                      key={permission}
                      label={permission}
                      checked={selectedPermissions.includes(permission)}
                      onChange={(e) => handlePermissionChange(permission, e.currentTarget.checked)}
                    />
                  ))}
                </Stack>
              </Card>
            ))}
          </Stack>
        </Paper>

        <Group justify="flex-end">
          <Button variant="outline" component={Link} href="/application/roles">
            Cancel
          </Button>
          <Button leftSection={<IconPlus size={16} />}>
            Create Role
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}