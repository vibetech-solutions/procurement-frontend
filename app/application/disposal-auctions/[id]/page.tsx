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
  ActionIcon,
  Grid,
  NumberInput,
  Textarea,
} from "@mantine/core"
import { IconArrowLeft, IconHammer, IconCurrencyDollar, IconCalendar } from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface AuctionDetailProps {
  params: { id: string }
}

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

export default function AuctionDetailPage({ params }: AuctionDetailProps) {
  const router = useRouter()
  const auction = disposalAuctions.find(a => a.id === params.id) || disposalAuctions[0]
  const [bidAmount, setBidAmount] = useState<number | string>("")
  const [bidNotes, setBidNotes] = useState("")

  const canBid = auction.status === "Open for Bidding"

  return (
    <Stack gap="lg">
      <Group>
        <ActionIcon variant="subtle" size="lg" onClick={() => router.back()}>
          <IconArrowLeft size={20} />
        </ActionIcon>
        <div>
          <Title order={2}>{auction.title}</Title>
          <Text c="dimmed" size="sm">Auction {auction.id}</Text>
        </div>
      </Group>

      <Grid gutter="lg">
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={4} mb="md">Auction Details</Title>
            <Stack gap="md">
              <div>
                <Text size="sm" fw={500} mb="xs">Description</Text>
                <Text size="sm" c="dimmed">{auction.description}</Text>
              </div>
              
              <Grid>
                <Grid.Col span={6}>
                  <Group gap="xs" mb="sm">
                    <IconCalendar size={16} />
                    <Text size="sm" fw={500}>Bidding Period</Text>
                  </Group>
                  <Text size="sm" c="dimmed">{auction.startDate} - {auction.endDate}</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Group gap="xs" mb="sm">
                    <IconCurrencyDollar size={16} />
                    <Text size="sm" fw={500}>Estimated Value</Text>
                  </Group>
                  <Text size="sm" c="dimmed">{auction.estimatedValue}</Text>
                </Grid.Col>
              </Grid>

              <div>
                <Text size="sm" fw={500} mb="xs">Current Status</Text>
                <Badge variant="light" color={getAuctionStatusColor(auction.status)}>
                  {auction.status}
                </Badge>
              </div>

              <div>
                <Text size="sm" fw={500} mb="xs">Highest Bid</Text>
                <Group gap="xs">
                  <IconCurrencyDollar size={16} />
                  <Text size="sm" fw={600} c="green">{auction.highestBid}</Text>
                </Group>
              </div>
            </Stack>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={4} mb="md">
              <Group gap="xs">
                <IconHammer size={20} />
                Place Bid
              </Group>
            </Title>
            
            {canBid ? (
              <Stack gap="md">
                <NumberInput
                  label="Bid Amount (KES)"
                  placeholder="Enter your bid"
                  value={bidAmount}
                  onChange={setBidAmount}
                  min={0}
                  thousandSeparator=","
                />
                <Textarea
                  label="Notes (Optional)"
                  placeholder="Additional comments about your bid"
                  value={bidNotes}
                  onChange={(e) => setBidNotes(e.target.value)}
                  rows={3}
                />
                <Button fullWidth disabled={!bidAmount}>
                  Submit Bid
                </Button>
              </Stack>
            ) : (
              <Text size="sm" c="dimmed" ta="center">
                Bidding is not available for this auction
              </Text>
            )}
          </Card>
        </Grid.Col>
      </Grid>
    </Stack>
  )
}