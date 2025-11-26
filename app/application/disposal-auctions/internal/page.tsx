"use client"

import { disposalAuctions } from "@/lib/utils/constants"
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
} from "@mantine/core"
import { IconSearch, IconPlus, IconEye, IconHammer, IconCurrencyDollar } from "@tabler/icons-react"
import Link from "next/link"

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

export default function InternalAuctionsPage() {

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <div>
          <Title order={2} mb="xs">
            Our Disposal Auctions
          </Title>
          <Text c="dimmed" size="sm">
            Manage company disposal auctions for surplus and obsolete items
          </Text>
        </div>
        <Link href="/application/disposal-auctions/new">
          <Button leftSection={<IconPlus size={16} />}>
            New Auction
          </Button>
        </Link>
      </Group>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group mb="md" gap="md">
          <TextInput
            placeholder="Search auctions..."
            leftSection={<IconSearch size={16} />}
            style={{ flex: 1 }}
          />
          <Select
            placeholder="Status"
            data={["All", "Draft", "Open for Bidding", "Bidding Closed", "Awarded", "Completed", "Cancelled"]}
            w={200}
          />
        </Group>

        <Table highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Auction ID</Table.Th>
              <Table.Th>Title</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Bidding Period</Table.Th>
              <Table.Th>Estimated Value</Table.Th>
              <Table.Th>Highest Bid</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {disposalAuctions.map((auction) => (
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
                  <Text size="sm" lineClamp={2}>
                    {auction.description}
                  </Text>
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
                    <Text size="sm" fw={600} c="green">
                      {auction.highestBid}
                    </Text>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Badge variant="light" color={getAuctionStatusColor(auction.status)}>
                    {auction.status}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Link href={`/application/disposal-auctions/internal/${auction.id}`}>
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