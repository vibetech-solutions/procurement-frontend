"use client"

import { approvedRequests, pendingApprovals, rejectedRequests } from "@/lib/utils/constants"
import { getPriorityColor } from "@/lib/utils/helpers"
import { Card, Text, Group, Stack, Title, Badge, Table, TextInput, Select, Tabs, ActionIcon, Modal, Button, Textarea } from "@mantine/core"
import { IconSearch, IconEye, IconCheck, IconX, IconClock, IconFileText } from "@tabler/icons-react"
import { useState } from "react"
import { useRouter } from "next/navigation"



export default function ApprovalsPage() {
  const router = useRouter()
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [changesModalOpen, setChangesModalOpen] = useState(false);
  const [, setSelectedRequisition] = useState<string | null>(null);
  const [changesComment, setChangesComment] = useState("");

  const handleApprove = (reqId: string) => {
    setSelectedRequisition(reqId);
    setApproveModalOpen(true);
  };

  const handleReject = (reqId: string) => {
    setSelectedRequisition(reqId);
    setRejectModalOpen(true);
  };

  const handleRequestChanges = (reqId: string) => {
    setSelectedRequisition(reqId);
    setChangesModalOpen(true);
  };

  const confirmApprove = () => {
    setApproveModalOpen(false);
    setSelectedRequisition(null);
    router.push('/application/purchase-orders')
  };

  const confirmReject = () => {
    // Handle rejection logic here
    setRejectModalOpen(false);
    setSelectedRequisition(null);

  };

  const confirmRequestChanges = () => {
    if (!changesComment.trim()) return;
    // Handle request changes logic here
    setChangesModalOpen(false);
    setSelectedRequisition(null);
    setChangesComment("");
  };

  return (
    <>
    <Stack gap="lg">
        <div>
          <Title order={2} mb="xs">
            Approvals
          </Title>
          <Text c="dimmed" size="sm">
            Review and approve requisitions from your team
          </Text>
        </div>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Tabs defaultValue="pending">
            <Tabs.List>
              <Tabs.Tab value="pending" leftSection={<IconClock size={16} />}>
                Pending ({pendingApprovals.length})
              </Tabs.Tab>
              <Tabs.Tab value="approved" leftSection={<IconCheck size={16} />}>
                Approved ({approvedRequests.length})
              </Tabs.Tab>
              <Tabs.Tab value="rejected" leftSection={<IconX size={16} />}>
                Rejected ({rejectedRequests.length})
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
                    <Table.Th>Waiting</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {pendingApprovals.map((req) => (
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
                        <Badge variant="light" color={req.daysWaiting > 3 ? "red" : "gray"}>
                          {req.daysWaiting} days
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Group gap="xs">
                          <ActionIcon variant="subtle" color="blue" component="a" href={`/application/approvals/${req.id}`}>
                            <IconEye size={16} />
                          </ActionIcon>
                          <ActionIcon variant="filled" color="green" onClick={() => handleApprove(req.id)}>
                            <IconCheck size={16} />
                          </ActionIcon>
                          <ActionIcon variant="filled" color="yellow" onClick={() => handleRequestChanges(req.id)}>
                            <IconFileText size={16} />
                          </ActionIcon>
                          <ActionIcon variant="filled" color="red" onClick={() => handleReject(req.id)}>
                            <IconX size={16} />
                          </ActionIcon>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Tabs.Panel>

            <Tabs.Panel value="approved" pt="md">
              <Group mb="md" gap="md">
                <TextInput
                  placeholder="Search approved requisitions..."
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
                    <Table.Th>Priority</Table.Th>
                    <Table.Th>Amount</Table.Th>
                    <Table.Th>Approved Date</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {approvedRequests.map((req) => (
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
                        <Text size="sm" c="dimmed">
                          {req.approvedDate}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <ActionIcon variant="subtle" color="blue">
                          <IconEye size={16} />
                        </ActionIcon>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Tabs.Panel>

            <Tabs.Panel value="rejected" pt="md">
              <Group mb="md" gap="md">
                <TextInput
                  placeholder="Search rejected requisitions..."
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
                    <Table.Th>Rejected Date</Table.Th>
                    <Table.Th>Reason</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {rejectedRequests.map((req) => (
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
                          {req.rejectedDate}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="xs" c="dimmed" lineClamp={1}>
                          {req.reason}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <ActionIcon variant="subtle" color="blue">
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

    <Modal
      opened={approveModalOpen}
      onClose={() => setApproveModalOpen(false)}
      title="Approve Requisition"
      centered
    >
      <Stack gap="md">
        <Text size="sm">Are you sure you want to approve this requisition?</Text>
        <Group justify="flex-end" gap="sm">
          <Button variant="outline" onClick={() => setApproveModalOpen(false)}>
            Cancel
          </Button>
          <Button color="green" onClick={confirmApprove}>
            Approve
          </Button>
        </Group>
      </Stack>
    </Modal>

    <Modal
      opened={rejectModalOpen}
      onClose={() => setRejectModalOpen(false)}
      title="Reject Requisition"
      centered
    >
      <Stack gap="md">
        <Text size="sm">Are you sure you want to reject this requisition?</Text>

        <Group justify="flex-end" gap="sm">
          <Button variant="outline" onClick={() => setRejectModalOpen(false)}>
            Cancel
          </Button>
          <Button color="red" onClick={confirmReject}>
            Reject
          </Button>
        </Group>
      </Stack>
    </Modal>

    <Modal
      opened={changesModalOpen}
      onClose={() => setChangesModalOpen(false)}
      title="Request Changes"
      centered
    >
      <Stack gap="md">
        <Text size="sm">
          Please describe the changes needed for this requisition:
        </Text>
        <Textarea
          placeholder="Describe the changes required..."
          value={changesComment}
          onChange={(e) => setChangesComment(e.target.value)}
          rows={4}
          required
          error={!changesComment.trim() ? "Comment is required" : null}
        />
        <Group justify="flex-end" gap="sm">
          <Button variant="outline" onClick={() => setChangesModalOpen(false)}>
            Cancel
          </Button>
          <Button color="yellow" onClick={confirmRequestChanges} disabled={!changesComment.trim()}>
            Request Changes
          </Button>
        </Group>
      </Stack>
    </Modal>
    </>
  )
}
