"use client"

import { suppliers, contracts } from "@/lib/utils/constants"
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
  Table,
} from "@mantine/core"
import { IconArrowLeft, IconMail, IconEye, IconPlus } from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface SupplierDetailProps {
  params: { id: string }
}

export default function SupplierDetailPage({ params }: SupplierDetailProps) {
  const router = useRouter()
  const supplier = suppliers.find(s => s.id === params.id) || suppliers[0]
  const supplierContracts = contracts.filter(c => c.supplier === supplier.name)

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
      <Group>
        <ActionIcon variant="subtle" size="lg" onClick={() => router.back()}>
          <IconArrowLeft size={20} />
        </ActionIcon>
        <div>
          <Title order={2}>{supplier.name}</Title>
          <Text c="dimmed" size="sm">Supplier {supplier.id}</Text>
        </div>
      </Group>

      <Grid gutter="lg">
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={4} mb="md">Supplier Information</Title>
            <Grid>
              <Grid.Col span={6}>
                <Text size="sm" fw={500} mb="xs">Supplier Name</Text>
                <Text size="sm" c="dimmed" mb="md">{supplier.name}</Text>
                <Group gap="xs" mb="sm">
                  <IconMail size={16} />
                  <Text size="sm" fw={500}>Email</Text>
                </Group>
                <Text size="sm" c="dimmed">{supplier.email}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text size="sm" fw={500} mb="xs">Categories</Text>
                <Group gap="xs">
                  {supplier.categories.map((category, index) => (
                    <Badge key={index} variant="light" size="sm">
                      {category}
                    </Badge>
                  ))}
                </Group>
              </Grid.Col>
            </Grid>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={4} mb="md">Quick Actions</Title>
            <Stack gap="sm">
              <Button variant="light" fullWidth>
                Create RFQ
              </Button>
              <Button 
                variant="light" 
                fullWidth
component={Link}
                href={`/application/contracts/new?type=supplier-agreement&supplierId=${supplier.id}&supplierName=${encodeURIComponent(supplier.name)}&supplierEmail=${encodeURIComponent(supplier.email)}`}
              >
                New Contract
              </Button>
              <Button variant="light" fullWidth>
                View Quotations
              </Button>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="space-between" mb="md">
          <Title order={4}>Contracts</Title>
          <Button 
            leftSection={<IconPlus size={16} />} 
            size="sm"
            component={Link}
            href={`/application/contracts/new?type=supplier-agreement&supplierId=${supplier.id}&supplierName=${encodeURIComponent(supplier.name)}&supplierEmail=${encodeURIComponent(supplier.email)}`}
          >
            New Contract
          </Button>
        </Group>
        
        <Table highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Contract ID</Table.Th>
              <Table.Th>Title</Table.Th>
              <Table.Th>Value</Table.Th>
              <Table.Th>Start Date</Table.Th>
              <Table.Th>End Date</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {supplierContracts.length > 0 ? (
              supplierContracts.map((contract) => (
                <Table.Tr key={contract.id}>
                  <Table.Td>
                    <Text size="sm" fw={600}>
                      {contract.id}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm">{contract.title}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm" fw={600}>
                      {contract.value}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm">{contract.startDate}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm">{contract.endDate}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Badge variant="light" color={getStatusColor(contract.status)}>
                      {contract.status}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Link href={`/application/contracts/${contract.id}`}>
                      <ActionIcon variant="subtle" color="blue">
                        <IconEye size={16} />
                      </ActionIcon>
                    </Link>
                  </Table.Td>
                </Table.Tr>
              ))
            ) : (
              <Table.Tr>
                <Table.Td colSpan={7}>
                  <Text size="sm" c="dimmed" ta="center">
                    No contracts found for this supplier
                  </Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Card>
    </Stack>
  )
}