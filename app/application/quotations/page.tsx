"use client"

import { quotations } from "@/lib/utils/constants"
import { createPurchaseOrderFromQuotation } from "@/lib/utils/quotation-processor"
import {
  Card,
  Text,
  Group,
  Stack,
  Title,
  Badge,
  Table,
  TextInput,
  Select,
  ActionIcon,
  Modal,
  Button,
} from "@mantine/core"
import { IconSearch, IconEye, IconCheck, IconX } from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState } from "react"

function getStatusColor(status: string) {
  switch (status) {
    case "Pending Review":
      return "orange"
    case "Accepted":
      return "green"
    case "Rejected":
      return "red"
    default:
      return "gray"
  }
}





export default function QuotationsPage() {
  const router = useRouter()
  const [rejectModalOpen, setRejectModalOpen] = useState(false)
  const [approveModalOpen, setApproveModalOpen] = useState(false)
  
  const handleAcceptQuotation = () => {
    setApproveModalOpen(true)
  }

  const handleRejectQuotation = () => {
    setRejectModalOpen(true)
  }

  const confirmReject = () => {
    setRejectModalOpen(false)
    // Handle rejection logic
  }

  const confirmApprove = () => {
    createPurchaseOrderFromQuotation("QUO-2025-001")
    setApproveModalOpen(false)
    router.push('/application/procurement-requisitions')
  }

  return (
    <Stack gap="lg">
      <div>
        <Title order={2} mb="xs">
          Quotations
        </Title>
        <Text c="dimmed" size="sm">
          Review and manage supplier quotations
        </Text>
      </div>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group mb="md" gap="md">
          <TextInput
            placeholder="Search quotations..."
            leftSection={<IconSearch size={16} />}
            style={{ flex: 1 }}
          />
          <Select
            placeholder="Status"
            data={["All", "Pending Review", "Accepted", "Rejected"]}
            w={180}
          />
        </Group>

        <Table highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Quotation ID</Table.Th>
              <Table.Th>RFQ ID</Table.Th>
              <Table.Th>Supplier</Table.Th>
              <Table.Th>Amount</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Submitted Date</Table.Th>
              <Table.Th>Valid Until</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {quotations.map((quotation) => (
              <Table.Tr key={quotation.id}>
                <Table.Td>
                  <Text size="sm" fw={600}>
                    {quotation.id}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{quotation.rfqId}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{quotation.supplier}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" fw={600}>
                    {quotation.amount}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Badge variant="light" color={getStatusColor(quotation.status)}>
                    {quotation.status}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" c="dimmed">
                    {quotation.submittedDate}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" c="dimmed">
                    {quotation.validUntil}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <Link href={`/application/quotations/${quotation.id}`}>
                      <ActionIcon variant="subtle" color="blue">
                        <IconEye size={16} />
                      </ActionIcon>
                    </Link>
                    {quotation.status === "Pending Review" && (
                      <>
                        <ActionIcon 
                          variant="subtle" 
                          color="green"
                          onClick={handleAcceptQuotation}
                        >
                          <IconCheck size={16} />
                        </ActionIcon>
                        <ActionIcon 
                          variant="subtle" 
                          color="red"
                          onClick={handleRejectQuotation}
                        >
                          <IconX size={16} />
                        </ActionIcon>
                      </>
                    )}
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>

      <Modal opened={rejectModalOpen} onClose={() => setRejectModalOpen(false)} title="Reject Quotation" centered>
        <Stack gap="md">
          <Text>Are you sure you want to reject this quotation? This action cannot be undone.</Text>
          <Group justify="flex-end" gap="md">
            <Button variant="outline" onClick={() => setRejectModalOpen(false)}>Cancel</Button>
            <Button color="red" onClick={confirmReject}>Reject</Button>
          </Group>
        </Stack>
      </Modal>

      <Modal
        opened={approveModalOpen}
        onClose={() => setApproveModalOpen(false)}
        title="Accept Quotation"
        centered
      >
        <Stack gap="md">
          <Text size="sm">Are you sure you want to accept this quotation?</Text>
          <Group justify="flex-end" gap="sm">
            <Button variant="outline" onClick={() => setApproveModalOpen(false)}>
              Cancel
            </Button>
            <Button color="green" onClick={confirmApprove}>
              Accept
            </Button>
          </Group>
        </Stack>
      </Modal>


    </Stack>
  )
}