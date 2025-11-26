"use client"

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
} from "@mantine/core"
import { IconSearch, IconEye, IconHammer, IconCurrencyDollar } from "@tabler/icons-react"
import Link from "next/link"

const externalAuctions = [
  {
    id: "EXT-DA-001",
    title: "Government Office Equipment Disposal",
    description: "Surplus computers, printers, and office furniture",
    startDate: "2025-02-10",
    endDate: "2025-02-24",
    status: "Open for Bidding",
    estimatedValue: "KES 150,000",
    currentBid: "KES 85,000",
    organizer: "Ministry of Finance",
  },
  {
    id: "EXT-DA-002",
    title: "University Laboratory Equipment",
    description: "Scientific equipment including microscopes, centrifuges, and lab furniture",
    startDate: "2025-02-05",
    endDate: "2025-02-20",
    status: "Open for Bidding",
    estimatedValue: "KES 200,000",
    currentBid: "KES 125,000",
    organizer: "University of Nairobi",
  },
]

function getAuctionStatusColor(status: string) {
  switch (status) {
    case "Open for Bidding": return "green"
    case "Draft": return "gray"
    case "Bidding Closed": return "orange"
    case "Awarded": return "blue"
    case "Completed": return "green"
    case "Cancelled": return "red"
    default: return "gray"
  }
}

export default function ExternalAuctionsPage() {

  return (
    <Stack gap="lg">
      <div>
        <Title order={2} mb="xs">
          External Disposal Auctions
        </Title>
        <Text c="dimmed" size="sm">
          Browse and bid on disposal auctions from other organizations
        </Text>
      </div>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group mb="md" gap="md">
          <TextInput
            placeholder="Search external auctions..."
            leftSection={<IconSearch size={16} />}
            style={{ flex: 1 }}
          />
          <Select
            placeholder="Status"
            data={["All", "Open for Bidding", "Bidding Closed", "Awarded", "Completed"]}
            w={200}
          />
        </Group>

        <Table highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Auction ID</Table.Th>
              <Table.Th>Title</Table.Th>
              <Table.Th>Organizer</Table.Th>
              <Table.Th>Bidding Period</Table.Th>
              <Table.Th>Estimated Value</Table.Th>
              <Table.Th>Current Bid</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {externalAuctions.map((auction) => (
              <Table.Tr key={auction.id}>
                <Table.Td>
                  <Text size="sm" fw={600}>
                    {auction.id}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <IconHammer size={14} />
                    <Text size="sm">{auction.title}</Text>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{auction.organizer}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">
                    {auction.startDate} - {auction.endDate}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" fw={600}>
                    {auction.estimatedValue}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Group gap="xs">
                    <IconCurrencyDollar size={14} />
                    <Text size="sm" fw={600} c="blue">
                      {auction.currentBid}
                    </Text>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Badge variant="light" color={getAuctionStatusColor(auction.status)}>
                    {auction.status}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Link href={`/application/disposal-auctions/external/${auction.id}`}>
                    <ActionIcon variant="subtle" color="blue">
                      <IconEye size={16} />
                    </ActionIcon>
                  </Link>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>
    </Stack>
  )
}