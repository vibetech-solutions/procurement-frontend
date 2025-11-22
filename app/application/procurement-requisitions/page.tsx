"use client"

import { approvalsCompleted, approvalsInProcurement, approvalsPendingReview } from "@/lib/utils/constants"
import { getPriorityColor } from "@/lib/utils/helpers"
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
  Tabs,
  ActionIcon,
} from "@mantine/core"
import { IconSearch, IconEye, IconCheck, IconFileText, IconTruck } from "@tabler/icons-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ProcurementPage() {
  const router = useRouter()
  const handleProcessRequisition = (req: typeof approvalsPendingReview[0]) => {
    router.push(`/application/procurement-requisitions/${req.id}/process`)
  }



  return (
    <Stack gap="lg">
        <div>
          <Title order={2} mb="xs">
            Procurement
          </Title>
          <Text c="dimmed" size="sm">
            Manage approved requisitions and procurement processes
          </Text>
        </div>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Tabs defaultValue="pending">
            <Tabs.List>
              <Tabs.Tab value="pending" leftSection={<IconFileText size={16} />}>
                Pending Review ({approvalsPendingReview.length})
              </Tabs.Tab>
              <Tabs.Tab value="inprocurement" leftSection={<IconTruck size={16} />}>
                In Procurement ({approvalsInProcurement.length})
              </Tabs.Tab>
              <Tabs.Tab value="completed" leftSection={<IconCheck size={16} />}>
                Completed ({approvalsCompleted.length})
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="pending" pt="md">
              <Group mb="md" gap="md">
                <TextInput
                  placeholder="Search requisitions..."
                  leftSection={<IconSearch size={16} />}
                  style={{ flex: 1 }}
                />
                <Select
                  placeholder="Department"
                  data={["All", "IT", "Marketing", "HR", "Operations", "Finance"]}
                  w={150}
                />
                <Select placeholder="Priority" data={["All", "Urgent", "High", "Medium", "Low"]} w={150} />
              </Group>

              <Table highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Requisition ID</Table.Th>
                    <Table.Th>Title</Table.Th>
                    <Table.Th>Requester</Table.Th>
                    <Table.Th>Department</Table.Th>
                    <Table.Th>Priority</Table.Th>
                    <Table.Th>Amount</Table.Th>
                    <Table.Th>Approved By</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {approvalsPendingReview.map((req) => (
                    <Table.Tr key={req.id}>
                      <Table.Td>
                        <Text size="sm" fw={600}>
                          {req.id}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">{req.title}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">{req.requester}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">{req.department}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge size="sm" variant="dot" color={getPriorityColor(req.priority)}>
                          {req.priority}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm" fw={600}>
                          {req.amount}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">{req.approver}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Group gap="xs">
                          <ActionIcon variant="subtle" color="blue" component={Link} href={`/application/procurement-requisitions/${req.id}`}>
                            <IconEye size={16} />
                          </ActionIcon>
                          <Button size="xs" variant="filled" onClick={() => handleProcessRequisition(req)}>
                            Process
                          </Button>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Tabs.Panel>

            <Tabs.Panel value="inprocurement" pt="md">
              <Group mb="md" gap="md">
                <TextInput
                  placeholder="Search requisitions..."
                  leftSection={<IconSearch size={16} />}
                  style={{ flex: 1 }}
                />
                <Select
                  placeholder="Status"
                  data={["All", "RFQ Sent", "RFP Sent", "PO Created", "Awaiting Delivery"]}
                  w={180}
                />
              </Group>

              <Table highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Requisition ID</Table.Th>
                    <Table.Th>Title</Table.Th>
                    <Table.Th>Requester</Table.Th>
                    <Table.Th>Department</Table.Th>
                    <Table.Th>Priority</Table.Th>
                    <Table.Th>Amount</Table.Th>
                    <Table.Th>Status</Table.Th>
                    <Table.Th>Officer</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {approvalsInProcurement.map((req) => (
                    <Table.Tr key={req.id}>
                      <Table.Td>
                        <Text size="sm" fw={600}>
                          {req.id}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">{req.title}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">{req.requester}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">{req.department}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge size="sm" variant="dot" color={getPriorityColor(req.priority)}>
                          {req.priority}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm" fw={600}>
                          {req.amount}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge variant="light" color="blue">
                          {req.status}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">{req.procurementOfficer}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Group gap="xs">
                          <ActionIcon variant="subtle" color="blue" component={Link} href={`/application/procurement-requisitions/${req.id}`}>
                            <IconEye size={16} />
                          </ActionIcon>
                          <Button size="xs" variant="light">
                            Update
                          </Button>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Tabs.Panel>

            <Tabs.Panel value="completed" pt="md">
              <Group mb="md" gap="md">
                <TextInput
                  placeholder="Search completed requisitions..."
                  leftSection={<IconSearch size={16} />}
                  style={{ flex: 1 }}
                />
                <Select
                  placeholder="Department"
                  data={["All", "IT", "Marketing", "HR", "Operations", "Finance"]}
                  w={150}
                />
              </Group>

              <Table highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Requisition ID</Table.Th>
                    <Table.Th>Title</Table.Th>
                    <Table.Th>Requester</Table.Th>
                    <Table.Th>Department</Table.Th>
                    <Table.Th>Amount</Table.Th>
                    <Table.Th>Completed Date</Table.Th>
                    <Table.Th>Delivery Date</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {approvalsCompleted.map((req) => (
                    <Table.Tr key={req.id}>
                      <Table.Td>
                        <Text size="sm" fw={600}>
                          {req.id}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">{req.title}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">{req.requester}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">{req.department}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm" fw={600}>
                          {req.amount}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm" c="dimmed">
                          {req.completedDate}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm" c="dimmed">
                          {req.deliveryDate}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <ActionIcon variant="subtle" color="blue" component={Link} href={`/application/procurement-requisitions/${req.id}`}>
                          <IconEye size={16} />
                        </ActionIcon>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Tabs.Panel>
          </Tabs>
        </Card>




    </Stack>
  )
}
