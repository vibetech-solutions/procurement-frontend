"use client";

import { fetchUser } from "@/lib/redux/features/merchants/merchantSlice";
import { fetchUser as fetchCurrentUser } from "@/lib/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { getRoleColor, mapDateFormat } from "@/lib/utils/helpers";
import {
  Card,
  Text,
  Group,
  Button,
  Stack,
  Title,
  Badge,
  Grid,
  ActionIcon,
  Avatar,
  Table,
  Tabs,
  LoadingOverlay,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconEdit,
  IconShield,
  IconFileText,
  IconClock,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { use } from "react";
import { format } from "date-fns";

const userActivity = [
  {
    action: "Approved requisition REQ-2025-001",
    date: "2025-01-20 14:25",
    type: "approval",
  },
  {
    action: "Created requisition REQ-2025-005",
    date: "2025-01-19 10:15",
    type: "create",
  },
  { action: "Logged in to system", date: "2025-01-19 09:00", type: "login" },
];

const userRequisitions = [
  {
    id: "REQ-2025-001",
    title: "Office Equipment",
    status: "Approved",
    amount: "KES 50,000",
    date: "2025-01-15",
  },
  {
    id: "REQ-2025-005",
    title: "IT Hardware",
    status: "Pending",
    amount: "KES 120,000",
    date: "2025-01-19",
  },
];

export default function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string | null>("profile");
  const dispatch = useAppDispatch();

  const { id } = use(params);

  const { user, userLoading, userError } = useAppSelector(
    (state) => state.merchants
  );

  const {
    user: currentUser,
    userLoading: currentUserLoading,
    userError: currentUserError,
  } = useAppSelector((state) => state.merchants);

  useEffect(() => {
    dispatch(fetchUser(parseInt(id)));
    dispatch(fetchCurrentUser());
  }, [dispatch, id]);

  if (userLoading || currentUserLoading) return <LoadingOverlay />;

  if (userError || currentUserError)
    return (
      <div>
        Error: {userError!} Second Error: {currentUserError}
      </div>
    );

  const userFormat = mapDateFormat(currentUser?.settings?.date_format);

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Group>
          <ActionIcon variant="subtle" size="lg" onClick={() => router.back()}>
            <IconArrowLeft size={20} />
          </ActionIcon>
          <div>
            <Title order={2}>
              {user.first_name} {user.last_name}{" "}
            </Title>
            <Text c="dimmed" size="sm">
              User {user.user_code}
            </Text>
          </div>
        </Group>
        <Button
          leftSection={<IconEdit size={16} />}
          variant="outline"
          onClick={() => router.push(`/application/users/${user.id}/edit`)}
        >
          Edit User
        </Button>
      </Group>

      <Grid gutter="lg">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Stack align="center" gap="md">
              <Avatar size={80} radius="xl" color="cyan">
                {(user.first_name + "" + user.last_name)
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Avatar>
              <div style={{ textAlign: "center" }}>
                <Text fw={600} size="lg">
                  {user.first_name} {user.last_name}
                </Text>
                <Text c="dimmed" size="sm">
                  {user.email}
                </Text>
                {user.roles?.[0] && (
                  <Badge
                    variant="light"
                    color={getRoleColor(user.roles[0].name)}
                    mt="xs"
                  >
                    {user.roles[0].name}
                  </Badge>
                )}
              </div>
              <Group gap="xs" mt="md">
                <Text size="xs" c="dimmed">
                  Since {user.created_at && !isNaN(new Date(user.created_at).getTime()) 
                    ? format(new Date(user.created_at), userFormat) 
                    : 'N/A'}
                </Text>
              </Group>
            </Stack>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 8 }}>
          <Tabs value={activeTab} onChange={setActiveTab}>
            <Tabs.List>
              <Tabs.Tab
                value="profile"
                leftSection={<IconFileText size={16} />}
              >
                Profile
              </Tabs.Tab>
              <Tabs.Tab value="roles" leftSection={<IconShield size={16} />}>
                Roles
              </Tabs.Tab>
              <Tabs.Tab value="activity" leftSection={<IconClock size={16} />}>
                Activity
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="profile" pt="md">
              <Stack gap="md">
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Title order={4} mb="md">
                    User Information
                  </Title>
                  <Grid>
                    <Grid.Col span={6}>
                      <Text size="sm" fw={500} mb="xs">
                        Phone
                      </Text>
                      <Text size="sm" c="dimmed">
                        {user.phone}
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text size="sm" fw={500} mb="xs">
                        Last Login
                      </Text>
                      <Text size="sm" c="dimmed" mb="md">
                        N/A
                      </Text>
                      <Text size="sm" fw={500} mb="xs">
                        Join Date
                      </Text>
                      <Text size="sm" c="dimmed">
                        {user.created_at && !isNaN(new Date(user.created_at).getTime()) 
                          ? format(new Date(user.created_at), userFormat) 
                          : 'N/A'}
                      </Text>
                    </Grid.Col>
                  </Grid>
                </Card>

                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Title order={4} mb="md">
                    Recent Requisitions
                  </Title>
                  <Table>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>ID</Table.Th>
                        <Table.Th>Title</Table.Th>
                        <Table.Th>Status</Table.Th>
                        <Table.Th>Amount</Table.Th>
                        <Table.Th>Date</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {userRequisitions.map((req) => (
                        <Table.Tr key={req.id}>
                          <Table.Td>{req.id}</Table.Td>
                          <Table.Td>{req.title}</Table.Td>
                          <Table.Td>
                            <Badge variant="light" size="sm">
                              {req.status}
                            </Badge>
                          </Table.Td>
                          <Table.Td>{req.amount}</Table.Td>
                          <Table.Td>{req.date}</Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                </Card>
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="roles" pt="md">
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Title order={4} mb="md">
                  User Roles
                </Title>
                <Stack gap="md">
                  {user.roles?.length > 0 ? (
                    user.roles.map((role, index) => (
                      <Group key={index} justify="space-between">
                        <Group gap="sm">
                          <IconShield size={16} color="blue" />
                          <div>
                            <Text size="sm" fw={500}>
                              {role.name}
                            </Text>
                            <Text size="xs" c="dimmed">
                              Active role
                            </Text>
                          </div>
                        </Group>
                        <Badge variant="light" color="green" size="sm">
                          Active
                        </Badge>
                      </Group>
                    ))
                  ) : (
                    <Text c="dimmed">No roles assigned</Text>
                  )}
                </Stack>
              </Card>
            </Tabs.Panel>

            <Tabs.Panel value="activity" pt="md">
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Title order={4} mb="md">
                  Recent Activity
                </Title>
                <Stack gap="md">
                  {userActivity.map((activity, index) => (
                    <Group key={index} gap="sm">
                      <IconClock size={16} />
                      <div style={{ flex: 1 }}>
                        <Text size="sm">{activity.action}</Text>
                        <Text size="xs" c="dimmed">
                          {activity.date}
                        </Text>
                      </div>
                    </Group>
                  ))}
                </Stack>
              </Card>
            </Tabs.Panel>
          </Tabs>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
