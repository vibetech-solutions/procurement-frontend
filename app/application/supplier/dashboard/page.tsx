"use client";

import { ContentContainer } from "@/components/layout/content-container";
import { supplierDashboardStats, supplierRecentActivity } from "@/lib/utils/constants";
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
  IconFileText,
  IconClipboardList,
  IconTruck,
  IconClock,
  IconEye,
  IconPlus,
} from "@tabler/icons-react";
import Link from "next/link";

export default function SupplierDashboardPage() {
  return (
    <ContentContainer>
      <Stack gap="lg">
        <div>
          <Title order={2} mb="xs">
            Supplier Dashboard
          </Title>
          <Text c="dimmed" size="sm">
            Welcome back! Here&apos;s your business overview.
          </Text>
        </div>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
          {supplierDashboardStats.map((stat) => (
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
                {supplierRecentActivity.map((activity) => (
                  <Paper key={activity.id} p="md" withBorder>
                    <Group justify="space-between" wrap="nowrap">
                      <div>
                        <Group gap="xs" mb={4}>
                          <Text fw={500}>{activity.id}</Text>
                          <Badge
                            size="sm"
                            variant="dot"
                            color={
                              activity.status === "Quotation Submitted"
                                ? "green"
                                : activity.status === "Pending Response"
                                ? "orange"
                                : activity.status === "In Transit"
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
                        <Text size="xs" fw={500} mt={2}>
                          {activity.amount}
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
                <Paper p="md" withBorder style={{ cursor: "pointer" }} component={Link} href="/application/supplier/catalogue">
                  <Group>
                    <IconEye size={20} />
                    <Text size="sm">Manage Catalogue</Text>
                  </Group>
                </Paper>
                <Paper p="md" withBorder style={{ cursor: "pointer" }} component={Link} href="/application/supplier/rfqs">
                  <Group>
                    <IconFileText size={20} />
                    <Text size="sm">View RFQs</Text>
                  </Group>
                </Paper>
                <Paper p="md" withBorder style={{ cursor: "pointer" }} component={Link} href="/application/supplier/quotations">
                  <Group>
                    <IconClipboardList size={20} />
                    <Text size="sm">Submit Quotations</Text>
                  </Group>
                </Paper>
                <Paper p="md" withBorder style={{ cursor: "pointer" }} component={Link} href="/application/supplier/orders">
                  <Group>
                    <IconTruck size={20} />
                    <Text size="sm">Track Orders</Text>
                  </Group>
                </Paper>
                <Paper p="md" withBorder style={{ cursor: "pointer" }} component={Link} href="/application/supplier/catalogue/new">
                  <Group>
                    <IconPlus size={20} />
                    <Text size="sm">Add New Item</Text>
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