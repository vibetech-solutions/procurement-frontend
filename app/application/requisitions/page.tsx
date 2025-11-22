"use client";

import { requisitions } from "@/lib/utils/constants";
import { getPriorityColor, getStatusColor } from "@/lib/utils/helpers";
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
  Menu,
  rem,
  Modal,
  Grid,
} from "@mantine/core";
import {
  IconSearch,
  IconPlus,
  IconEye,
  IconDots,
  IconDownload,
  IconTrash,
  IconEdit,
  IconGrid3x3,
  IconList,
  IconCheck,
  IconX,
} from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";



export default function RequisitionsPage() {
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedRequisition, setSelectedRequisition] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  const handleCancelRequest = (reqId: string) => {
    setSelectedRequisition(reqId);
    setCancelModalOpen(true);
  };

  const handleAcceptRequisition = (reqId: string) => {
    setSelectedRequisition(reqId);
    setApproveModalOpen(true);
  };

  const handleRejectRequisition = (reqId: string) => {
    setSelectedRequisition(reqId);
    setRejectModalOpen(true);
  };

  const confirmCancel = () => {
    // Handle cancel logic here
    console.log('Cancelling requisition:', selectedRequisition);
    setCancelModalOpen(false);
    setSelectedRequisition(null);
  };

  const confirmApprove = () => {
    setApproveModalOpen(false)
    setSelectedRequisition(null)
    // Handle acceptance logic
  };

  const confirmReject = () => {
    setRejectModalOpen(false)
    setSelectedRequisition(null)
    // Handle rejection logic
  };

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <div>
          <Title order={2} mb="xs">
            My Requisitions
          </Title>
          <Text c="dimmed" size="sm">
            Track and manage your procurement requests
          </Text>
        </div>
        <Button
          leftSection={<IconPlus size={16} />}
          component="a"
          href="/application/requisitions/new"
        >
          New Requisition
        </Button>
      </Group>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group mb="md" gap="md">
          <TextInput
            placeholder="Search requisitions..."
            leftSection={<IconSearch size={16} />}
            style={{ flex: 1 }}
          />
          <Select
            placeholder="Status"
            data={[
              "All",
              "Pending Approval",
              "Approved",
              "In Procurement",
              "Completed",
              "Rejected",
            ]}
            w={200}
          />
          <Select
            placeholder="Priority"
            data={["All", "Urgent", "High", "Medium", "Low"]}
            w={150}
          />
          <Group gap="xs">
            <Button 
              variant={viewMode === 'grid' ? 'filled' : 'subtle'} 
              size="xs"
              leftSection={<IconGrid3x3 size={14} />}
              onClick={() => setViewMode('grid')}
            >
              Grid
            </Button>
            <Button 
              variant={viewMode === 'list' ? 'filled' : 'subtle'} 
              size="xs"
              leftSection={<IconList size={14} />}
              onClick={() => setViewMode('list')}
            >
              List
            </Button>
          </Group>
        </Group>

        {viewMode === 'list' ? (
          <Table highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Requisition ID</Table.Th>
                <Table.Th>Title</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Priority</Table.Th>
                <Table.Th>Amount</Table.Th>
                <Table.Th>Created Date</Table.Th>
                <Table.Th>Approver</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {requisitions.map((req) => (
                <Table.Tr key={req.id}>
                  <Table.Td>
                    <Text size="sm" fw={600}>{req.id}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm">{req.title}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Badge variant="light" color={getStatusColor(req.status)}>
                      {req.status}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Badge size="sm" variant="dot" color={getPriorityColor(req.priority)}>
                      {req.priority}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm" fw={600}>{req.amount}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm" c="dimmed">{req.createdDate}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm">{req.approver}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <ActionIcon variant="subtle" color="blue">
                        <Link href={`/application/requisitions/${req.id}`}>
                          <IconEye size={16} />
                        </Link>
                      </ActionIcon>
                      <ActionIcon variant="subtle" color="yellow">
                        <Link href={`/application/requisitions/${req.id}/edit`}>
                          <IconEdit size={16} />
                        </Link>
                      </ActionIcon>
                      {req.status === "Approved" && (
                        <>
                          <ActionIcon 
                            variant="subtle" 
                            color="green"
                            onClick={() => handleAcceptRequisition(req.id)}
                          >
                            <IconCheck size={16} />
                          </ActionIcon>
                          <ActionIcon 
                            variant="subtle" 
                            color="red"
                            onClick={() => handleRejectRequisition(req.id)}
                          >
                            <IconX size={16} />
                          </ActionIcon>
                        </>
                      )}
                      <Menu shadow="md" width={200}>
                        <Menu.Target>
                          <ActionIcon variant="subtle" color="gray">
                            <IconDots size={16} />
                          </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Item
                            leftSection={
                              <IconDownload style={{ width: rem(14), height: rem(14) }} />
                            }
                          >
                            Download PDF
                          </Menu.Item>
                          <Menu.Item
                            color="red"
                            leftSection={
                              <IconTrash style={{ width: rem(14), height: rem(14) }} />
                            }
                            onClick={() => handleCancelRequest(req.id)}
                          >
                            Cancel Request
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        ) : (
          <Grid gutter="md">
            {requisitions.map((req) => (
              <Grid.Col key={req.id} span={{ base: 12, sm: 6, lg: 4 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
                  <Stack gap="md">
                    <Group justify="space-between">
                      <Text fw={600} size="sm">{req.id}</Text>
                      <Badge size="sm" variant="dot" color={getPriorityColor(req.priority)}>
                        {req.priority}
                      </Badge>
                    </Group>
                    <Text fw={500} lineClamp={2}>{req.title}</Text>
                    <Badge variant="light" color={getStatusColor(req.status)} w="fit-content">
                      {req.status}
                    </Badge>
                    <Group justify="space-between">
                      <div>
                        <Text size="xs" c="dimmed">Amount</Text>
                        <Text size="sm" fw={600}>{req.amount}</Text>
                      </div>
                      <div>
                        <Text size="xs" c="dimmed">Created</Text>
                        <Text size="sm">{req.createdDate}</Text>
                      </div>
                    </Group>
                    <Text size="xs" c="dimmed">Approver: {req.approver}</Text>
                    <Group gap="xs" mt="auto">
                      <ActionIcon variant="subtle" color="blue">
                        <Link href={`/application/requisitions/${req.id}`}>
                          <IconEye size={16} />
                        </Link>
                      </ActionIcon>
                      <ActionIcon variant="subtle" color="yellow">
                        <Link href={`/application/requisitions/${req.id}/edit`}>
                          <IconEdit size={16} />
                        </Link>
                      </ActionIcon>
                      {req.status === "Approved" && (
                        <>
                          <ActionIcon 
                            variant="subtle" 
                            color="green"
                            onClick={() => handleAcceptRequisition(req.id)}
                          >
                            <IconCheck size={16} />
                          </ActionIcon>
                          <ActionIcon 
                            variant="subtle" 
                            color="red"
                            onClick={() => handleRejectRequisition(req.id)}
                          >
                            <IconX size={16} />
                          </ActionIcon>
                        </>
                      )}
                      <Menu shadow="md" width={200}>
                        <Menu.Target>
                          <ActionIcon variant="subtle" color="gray">
                            <IconDots size={16} />
                          </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Item
                            leftSection={<IconDownload style={{ width: rem(14), height: rem(14) }} />}
                          >
                            Download PDF
                          </Menu.Item>
                          <Menu.Item
                            color="red"
                            leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                            onClick={() => handleCancelRequest(req.id)}
                          >
                            Cancel Request
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        )}
      </Card>

      <Modal
        opened={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        title="Cancel Requisition"
        centered
      >
        <Stack gap="md">
          <Text size="sm">
            Are you sure you want to cancel requisition {selectedRequisition}? This action cannot be undone.
          </Text>
          <Group justify="flex-end" gap="sm">
            <Button variant="outline" onClick={() => setCancelModalOpen(false)}>
              Keep Request
            </Button>
            <Button color="red" onClick={confirmCancel}>
              Cancel Request
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Modal opened={rejectModalOpen} onClose={() => setRejectModalOpen(false)} title="Reject Requisition" centered>
        <Stack gap="md">
          <Text>Are you sure you want to reject this requisition? This action cannot be undone.</Text>
          <Group justify="flex-end" gap="md">
            <Button variant="outline" onClick={() => setRejectModalOpen(false)}>Cancel</Button>
            <Button color="red" onClick={confirmReject}>Reject</Button>
          </Group>
        </Stack>
      </Modal>

      <Modal opened={approveModalOpen} onClose={() => setApproveModalOpen(false)} title="Accept Requisition" centered>
        <Stack gap="md">
          <Text>Are you sure you want to accept this requisition?</Text>
          <Group justify="flex-end" gap="md">
            <Button variant="outline" onClick={() => setApproveModalOpen(false)}>Cancel</Button>
            <Button color="green" onClick={confirmApprove}>Accept</Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
}
