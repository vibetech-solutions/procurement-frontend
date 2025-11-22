"use client";

import { ContentContainer } from "@/components/layout/content-container";
import { dashboardRecentActivity, dashboardStats } from "@/lib/utils/constants";
import {
  Grid,
  Card,
  Text,
  Group,
  Badge,
  SimpleGrid,
  Stack,
  Title,
  Paper,
} from "@mantine/core";
import {
  IconShoppingCart,
  IconFileText,
  IconChecklist,
  IconTrendingUp,
  IconClock,
} from "@tabler/icons-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <ContentContainer>
      <Stack gap="lg">
        <div>
          <Title order={2} mb="xs">
            Dashboard
          </Title>
          <Text c="dimmed" size="sm">
            Welcome back! Here&apos;s your procurement overview.
          </Text>
        </div>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
          {dashboardStats.map((stat) => (
            <Card
              key={stat.title}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
            >
              <Group justify="space-between" mb="xs">
                <stat.icon
                  size={24}
                  stroke={1.5}
                  color={`var(--mantine-color-${stat.color}-6)`}
                />
                <Badge color={stat.color} variant="light">
                  Active
                </Badge>
              </Group>
              <Text size="xl" fw={700} mt="md">
                {stat.value}
              </Text>
              <Text size="sm" c="dimmed" mt={4}>
                {stat.title}
              </Text>
            </Card>
          ))}
        </SimpleGrid>

        <Grid gutter="lg">
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Group justify="space-between" mb="md">
                <Text fw={600} size="lg">
                  Recent Activity
                </Text>
                <Badge variant="light">Last 7 days</Badge>
              </Group>
              <Stack gap="md">
                {dashboardRecentActivity.map((activity) => (
                  <Paper key={activity.id} p="md" withBorder component={Link} href={`/application/requisitions/${activity.id}`} style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>
                    <Group justify="space-between" wrap="nowrap">
                      <div>
                        <Group gap="xs" mb={4}>
                          <Text fw={500}>{activity.id}</Text>
                          <Badge
                            size="sm"
                            variant="dot"
                            color={
                              activity.status === "Approved"
                                ? "green"
                                : activity.status === "Pending Approval"
                                ? "orange"
                                : activity.status === "In Review"
                                ? "blue"
                                : "gray"
                            }
                          >
                            {activity.status}
                          </Badge>
                        </Group>
                        <Text size="sm" c="dimmed">
                          {activity.title}
                        </Text>
                      </div>
                      <Group gap="xs">
                        <IconClock size={16} stroke={1.5} />
                        <Text size="xs" c="dimmed">
                          {activity.date}
                        </Text>
                      </Group>
                    </Group>
                  </Paper>
                ))}
              </Stack>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Text fw={600} size="lg" mb="md">
                Quick Actions
              </Text>
              <Stack gap="sm">
                <Paper p="md" withBorder style={{ cursor: "pointer" }} component={Link} href="/application/catalogue">
                  <Group>
                    <IconShoppingCart size={20} />
                    <Text size="sm">Browse Catalogue</Text>
                  </Group>
                </Paper>
                <Paper p="md" withBorder style={{ cursor: "pointer" }} component={Link} href="/application/requisitions/new">
                  <Group>
                    <IconFileText size={20} />
                    <Text size="sm">Create Requisition</Text>
                  </Group>
                </Paper>
                <Paper p="md" withBorder style={{ cursor: "pointer" }} component={Link} href="/application/approvals">
                  <Group>
                    <IconChecklist size={20} />
                    <Text size="sm">Review Approvals</Text>
                  </Group>
                </Paper>
                <Paper p="md" withBorder style={{ cursor: "pointer" }} component={Link} href="/application/reports">
                  <Group>
                    <IconTrendingUp size={20} />
                    <Text size="sm">View Reports</Text>
                  </Group>
                </Paper>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Stack>
    </ContentContainer>
  );
}
