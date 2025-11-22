"use client"

import {
  Card,
  Text,
  Group,
  Button,
  Stack,
  Title,
  SimpleGrid,
  Select,
  Paper,
  Progress,
  Grid,
} from "@mantine/core"
import { 
  IconDownload, 
  IconChartBar, 
  IconFileText, 
  IconTrendingUp, 
  IconUsers,
  IconShoppingCart,
  IconClock
} from "@tabler/icons-react"

const reportTypes = [
  {
    title: "Procurement Summary",
    description: "Overview of all procurement activities",
    icon: IconChartBar,
    color: "blue",
  },
  {
    title: "Spending Analysis",
    description: "Department-wise spending breakdown",
    icon: IconTrendingUp,
    color: "green",
  },
  {
    title: "Supplier Performance",
    description: "Supplier delivery and quality metrics",
    icon: IconUsers,
    color: "orange",
  },
  {
    title: "Requisition Status",
    description: "Status of all requisitions by period",
    icon: IconFileText,
    color: "purple",
  },
]

const quickStats = [
  { label: "Total Spend (YTD)", value: "KES 2,847,392", color: "blue" },
  { label: "Active Suppliers", value: "24", color: "green" },
  { label: "Avg. Processing Time", value: "3.2 days", color: "orange" },
  { label: "Cost Savings", value: "12.5%", color: "teal" },
]

export default function ReportsPage() {
  const handleGenerateReport = (reportType: string) => {
    console.log('Generating report:', reportType)
  }

  const handleDownloadReport = (reportType: string) => {
    console.log('Downloading report:', reportType)
  }

  return (
    <Stack gap="lg">
      <div>
        <Title order={2} mb="xs">
          Reports & Analytics
        </Title>
        <Text c="dimmed" size="sm">
          Generate and download procurement reports
        </Text>
      </div>

      {/* Quick Stats */}
      <SimpleGrid cols={{ base: 2, md: 4 }} spacing="lg">
        {quickStats.map((stat) => (
          <Card key={stat.label} shadow="sm" padding="lg" radius="md" withBorder>
            <Text size="sm" c="dimmed" mb="xs">
              {stat.label}
            </Text>
            <Text size="xl" fw={700} c={stat.color}>
              {stat.value}
            </Text>
          </Card>
        ))}
      </SimpleGrid>

      <Grid gutter="lg">
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="lg">
              <Title order={3}>Available Reports</Title>
              <Group gap="sm">
                <Select
                  placeholder="Period"
                  data={["This Month", "Last Month", "This Quarter", "Last Quarter", "This Year"]}
                  w={150}
                />
                <Select
                  placeholder="Department"
                  data={["All", "IT", "Marketing", "HR", "Operations", "Finance"]}
                  w={150}
                />
              </Group>
            </Group>

            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
              {reportTypes.map((report) => (
                <Paper key={report.title} p="md" withBorder>
                  <Group mb="md">
                    <report.icon size={24} color={`var(--mantine-color-${report.color}-6)`} />
                    <div style={{ flex: 1 }}>
                      <Text fw={600} size="sm">
                        {report.title}
                      </Text>
                      <Text size="xs" c="dimmed">
                        {report.description}
                      </Text>
                    </div>
                  </Group>
                  <Group gap="xs">
                    <Button 
                      size="xs" 
                      variant="light" 
                      color={report.color}
                      onClick={() => handleGenerateReport(report.title)}
                    >
                      Generate
                    </Button>
                    <Button 
                      size="xs" 
                      variant="outline" 
                      color={report.color}
                      leftSection={<IconDownload size={14} />}
                      onClick={() => handleDownloadReport(report.title)}
                    >
                      Download
                    </Button>
                  </Group>
                </Paper>
              ))}
            </SimpleGrid>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Stack gap="md">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={4} mb="md">
                Department Spending
              </Title>
              <Stack gap="sm">
                <div>
                  <Group justify="space-between" mb="xs">
                    <Text size="sm">IT</Text>
                    <Text size="sm" fw={600}>65%</Text>
                  </Group>
                  <Progress value={65} color="blue" size="sm" />
                </div>
                <div>
                  <Group justify="space-between" mb="xs">
                    <Text size="sm">Operations</Text>
                    <Text size="sm" fw={600}>25%</Text>
                  </Group>
                  <Progress value={25} color="green" size="sm" />
                </div>
                <div>
                  <Group justify="space-between" mb="xs">
                    <Text size="sm">Marketing</Text>
                    <Text size="sm" fw={600}>10%</Text>
                  </Group>
                  <Progress value={10} color="orange" size="sm" />
                </div>
              </Stack>
            </Card>

            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={4} mb="md">
                Recent Activity
              </Title>
              <Stack gap="sm">
                <Paper p="sm" withBorder>
                  <Group gap="xs">
                    <IconShoppingCart size={16} />
                    <div>
                      <Text size="sm" fw={500}>PO-2025-001 Created</Text>
                      <Text size="xs" c="dimmed">2 hours ago</Text>
                    </div>
                  </Group>
                </Paper>
                <Paper p="sm" withBorder>
                  <Group gap="xs">
                    <IconFileText size={16} />
                    <div>
                      <Text size="sm" fw={500}>REQ-2025-008 Approved</Text>
                      <Text size="xs" c="dimmed">4 hours ago</Text>
                    </div>
                  </Group>
                </Paper>
                <Paper p="sm" withBorder>
                  <Group gap="xs">
                    <IconClock size={16} />
                    <div>
                      <Text size="sm" fw={500}>RFQ-2025-003 Expired</Text>
                      <Text size="xs" c="dimmed">1 day ago</Text>
                    </div>
                  </Group>
                </Paper>
              </Stack>
            </Card>
          </Stack>
        </Grid.Col>
      </Grid>
    </Stack>
  )
}