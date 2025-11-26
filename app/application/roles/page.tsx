"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Title,
  Table,
  Group,
  ActionIcon,
  Text,
  TextInput,
  LoadingOverlay,
  Stack,
  Card,
  Flex,
} from "@mantine/core";
import { IconSearch, IconEye } from "@tabler/icons-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { fetchRoles } from "@/lib/redux/features/merchants/merchantSlice";

export default function RolesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useAppDispatch();

  const { roles, rolesLoading } = useAppSelector((state) => state.merchants);

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const filteredRoles = roles.filter((role) => {
    const matchesSearch = role.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  if (rolesLoading) {
    return (
      <Container size="xl" style={{ position: "relative", minHeight: "200px" }}>
        <LoadingOverlay visible />
      </Container>
    );
  }

  return (
    <Container size="xl" py="md">
      <Stack gap="lg">
        {/* Header */}
        <Flex justify="space-between" align="center" wrap="wrap" gap="md">
          <div>
            <Title order={2} mb={4}>
              Roles Management
            </Title>
            <Text c="dimmed" size="sm">
              Manage user roles and permissions for your organization
            </Text>
          </div>
        </Flex>

        {/* Filters */}
        <Card withBorder p="md">
          <Group gap="md">
            <TextInput
              placeholder="Search roles..."
              leftSection={<IconSearch size={16} />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.currentTarget.value)}
              style={{ flex: 1, minWidth: 200 }}
            />
          </Group>
        </Card>

        {/* Table */}
        <Card withBorder p={0}>
          <Table highlightOnHover striped>
            <Table.Thead>
              <Table.Tr>
                <Table.Th style={{ fontWeight: 600 }}>Role Name</Table.Th>
                <Table.Th style={{ fontWeight: 600, textAlign: "center" }}>
                  Actions
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filteredRoles.length > 0 ? (
                filteredRoles.map((role) => (
                  <Table.Tr key={role.id}>
                    <Table.Td>
                      <div>
                        <Text fw={500} size="sm">
                          {role.name}
                        </Text>
                      </div>
                    </Table.Td>
                    <Table.Td>
                      <Group gap={4} justify="center">
                        <ActionIcon
                          component={Link}
                          href={`/application/roles/${role.id}`}
                          variant="subtle"
                          color="blue"
                          size="sm"
                        >
                          <IconEye size={14} />
                        </ActionIcon>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))
              ) : (
                <Table.Tr>
                  <Table.Td colSpan={4}>
                    <Text ta="center" c="dimmed" py="xl">
                      {searchTerm
                        ? "No roles found matching your search"
                        : "No roles available"}
                    </Text>
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </Card>
      </Stack>
    </Container>
  );
}
