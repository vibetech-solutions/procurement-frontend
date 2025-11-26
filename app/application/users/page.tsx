"use client";

import {
  deleteUser,
  fetchUsers,
} from "@/lib/redux/features/merchants/merchantSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { getRoleColor } from "@/lib/utils/helpers";
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
  Avatar,
  Modal,
  Center,
  Loader,
  Alert,
  Pagination,
} from "@mantine/core";
import {
  IconSearch,
  IconPlus,
  IconEye,
  IconEdit,
  IconTrash,
  IconAlertCircle,
} from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { notifications } from "@mantine/notifications";
import { fetchUser } from "@/lib/redux/features/auth/authSlice";

let ITEMS_PER_PAGE = 10;

export default function UsersPage() {
  const dispatch = useAppDispatch();

  const { users, usersLoading, usersError } = useAppSelector(
    (state) => state.merchants
  );

  const { user: currentUser } = useAppSelector((state) => state.auth);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string | null>("All");

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, roleFilter]);

  if (currentUser) {
    ITEMS_PER_PAGE = currentUser.settings.items_per_page;
  }

  const filteredUsers = useMemo(() => {
    if (!users) return [];

    return users.filter((user) => {
      const matchesSearch =
        searchQuery === "" ||
        user.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole =
        !roleFilter ||
        roleFilter === "All" ||
        user.roles[0]?.name === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, searchQuery, roleFilter]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, currentPage]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  const handleDeleteClick = (userId: number) => {
    setUserToDelete(userId);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!userToDelete) return;

    setIsDeleting(true);
    try {
      const result = await dispatch(deleteUser(userToDelete));
      if (deleteUser.fulfilled.match(result)) {
        notifications.show({
          title: "Success",
          message: "User deleted successfully",
          color: "green",
        });
        setDeleteModalOpen(false);
        setUserToDelete(null);

        if (paginatedUsers.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      } else {
        const errorMessage =
          (typeof result.payload === "string" ? result.payload : null) ||
          result.error?.message ||
          "Failed to delete user";
        notifications.show({
          title: "Error",
          message: String(errorMessage),
          color: "red",
        });
      }
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : "Failed to delete user";
      notifications.show({
        title: "Error",
        message: errorMessage,
        color: "red",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setRoleFilter("All");
  };

  if (usersLoading) {
    return (
      <Center h={400}>
        <Stack align="center" gap="md">
          <Loader size="lg" />
          <Text c="dimmed">Loading users...</Text>
        </Stack>
      </Center>
    );
  }

  if (usersError) {
    return (
      <Alert
        icon={<IconAlertCircle size={16} />}
        title="Error Loading Users"
        color="red"
        variant="filled"
      >
        {usersError}
        <Button
          variant="white"
          size="xs"
          mt="md"
          onClick={() => dispatch(fetchUsers())}
        >
          Retry
        </Button>
      </Alert>
    );
  }

  return (
    <>
      <Modal
        opened={deleteModalOpen}
        onClose={() => !isDeleting && setDeleteModalOpen(false)}
        title="Delete User"
        centered
        closeOnClickOutside={!isDeleting}
        closeOnEscape={!isDeleting}
      >
        <Stack gap="md">
          <Text>Are you sure you want to delete this user?</Text>
          <Text size="sm" c="dimmed">
            This action cannot be undone.
          </Text>
          <Group justify="flex-end" mt="md">
            <Button
              variant="outline"
              onClick={() => setDeleteModalOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              color="red"
              onClick={handleDelete}
              loading={isDeleting}
              leftSection={<IconTrash size={16} />}
            >
              Delete User
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Stack gap="lg">
        <Group justify="space-between">
          <div>
            <Title order={2} mb="xs">
              User Management
            </Title>
            <Text c="dimmed" size="sm">
              Manage system users and their permissions
            </Text>
          </div>
          <Button
            leftSection={<IconPlus size={16} />}
            component={Link}
            href="/application/users/new"
          >
            Add User
          </Button>
        </Group>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group mb="md" gap="md" align="flex-end">
            <TextInput
              placeholder="Search users..."
              leftSection={<IconSearch size={16} />}
              style={{ flex: 1 }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
            />
            <Select
              placeholder="Role"
              data={[
                "All",
                "Admin",
                "Manager",
                "Procurement Officer",
                "Employee",
              ]}
              w={180}
              value={roleFilter}
              onChange={setRoleFilter}
              clearable
            />
            {(searchQuery || roleFilter !== "All") && (
              <Button variant="light" onClick={handleClearFilters}>
                Clear Filters
              </Button>
            )}
          </Group>

          {filteredUsers.length === 0 ? (
            <Center py="xl">
              <Stack align="center" gap="xs">
                <Text c="dimmed" size="lg">
                  No users found
                </Text>
                <Text c="dimmed" size="sm">
                  Try adjusting your filters
                </Text>
              </Stack>
            </Center>
          ) : (
            <>
              <Table highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>User</Table.Th>
                    <Table.Th>Role</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {paginatedUsers.map((user) => (
                    <Table.Tr key={user.id}>
                      <Table.Td>
                        <Group gap="sm">
                          <Avatar size={32} radius="xl" color="cyan">
                            {(user.first_name + " " + user.last_name)
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </Avatar>
                          <div>
                            <Text size="sm" fw={500}>
                              {user.first_name} {user.last_name}
                            </Text>
                            <Text size="xs" c="dimmed">
                              {user.email}
                            </Text>
                          </div>
                        </Group>
                      </Table.Td>
                      <Table.Td>
                        <Badge
                          variant="light"
                          color={getRoleColor(
                            user.roles[0]?.name || "Employee"
                          )}
                        >
                          {user.roles[0]?.name || "No Role"}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Group gap="xs">
                          <ActionIcon
                            variant="subtle"
                            color="blue"
                            component="a"
                            href={`/application/users/${user.id}`}
                            aria-label="View user"
                          >
                            <IconEye size={16} />
                          </ActionIcon>
                          <ActionIcon
                            variant="subtle"
                            color="yellow"
                            component="a"
                            href={`/application/users/${user.id}/edit`}
                            aria-label="Edit user"
                          >
                            <IconEdit size={16} />
                          </ActionIcon>
                          <ActionIcon
                            variant="subtle"
                            color="red"
                            onClick={() => handleDeleteClick(user.id)}
                            aria-label="Delete user"
                          >
                            <IconTrash size={16} />
                          </ActionIcon>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>

              {totalPages > 1 && (
                <Group justify="space-between" mt="md">
                  <Text size="sm" c="dimmed">
                    Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
                    {Math.min(
                      currentPage * ITEMS_PER_PAGE,
                      filteredUsers.length
                    )}{" "}
                    of {filteredUsers.length} users
                  </Text>
                  <Pagination
                    value={currentPage}
                    onChange={setCurrentPage}
                    total={totalPages}
                  />
                </Group>
              )}
            </>
          )}
        </Card>
      </Stack>
    </>
  );
}
