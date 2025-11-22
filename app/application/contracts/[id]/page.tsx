"use client"

import { contracts } from "@/lib/utils/constants"
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
} from "@mantine/core"
import { IconArrowLeft, IconDownload, IconEdit } from "@tabler/icons-react"
import { useRouter } from "next/navigation"

interface ContractDetailProps {
  params: { id: string }
}

export default function ContractDetailPage({ params }: ContractDetailProps) {
  const router = useRouter()
  const contract = contracts.find(c => c.id === params.id) || contracts[0]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "green"
      case "Draft": return "gray"
      case "Under Review": return "orange"
      case "Expired": return "red"
      case "Terminated": return "red"
      default: return "gray"
    }
  }

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Group>
          <ActionIcon variant="subtle" size="lg" onClick={() => router.back()}>
            <IconArrowLeft size={20} />
          </ActionIcon>
          <div>
            <Title order={2}>{contract.title}</Title>
            <Text c="dimmed" size="sm">Contract {contract.id}</Text>
          </div>
        </Group>
        <Group>
          <Button leftSection={<IconEdit size={16} />} variant="outline">
            Edit
          </Button>
          <Button leftSection={<IconDownload size={16} />} variant="outline">
            Download
          </Button>
        </Group>
      </Group>

      <Grid gutter="lg">
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={4} mb="md">Contract Details</Title>
            <Grid>
              <Grid.Col span={6}>
                <Text size="sm" fw={500} mb="xs">Supplier</Text>
                <Text size="sm" c="dimmed" mb="md">{contract.supplier}</Text>
                <Text size="sm" fw={500} mb="xs">Contract Value</Text>
                <Text size="sm" fw={600}>{contract.value}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text size="sm" fw={500} mb="xs">Start Date</Text>
                <Text size="sm" c="dimmed" mb="md">{contract.startDate}</Text>
                <Text size="sm" fw={500} mb="xs">End Date</Text>
                <Text size="sm" c="dimmed">{contract.endDate}</Text>
              </Grid.Col>
            </Grid>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={4} mb="md">Status</Title>
            <Badge size="lg" variant="light" color={getStatusColor(contract.status)} mb="md">
              {contract.status}
            </Badge>
            {contract.renewalDate && (
              <>
                <Text size="sm" fw={500} mb="xs">Renewal Date</Text>
                <Text size="sm" c="dimmed">{contract.renewalDate}</Text>
              </>
            )}
          </Card>
        </Grid.Col>
      </Grid>
    </Stack>
  )
}