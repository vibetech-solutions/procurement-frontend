"use client"

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
} from "@mantine/core"
import { RichTextEditor } from "@mantine/tiptap"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { IconArrowLeft, IconHammer, IconCurrencyDollar, IconCalendar, IconBuilding } from "@tabler/icons-react"
import Link from "next/link"
import { useState } from "react"

interface ExternalAuctionDetailProps {
  params: { id: string }
}

const externalAuctions = [
  {
    id: "EXT-DA-001",
    title: "Government Office Equipment Disposal",
    description: "Surplus computers, printers, and office furniture from government offices. Items are in good working condition and suitable for small businesses or startups.",
    startDate: "2025-02-10",
    endDate: "2025-02-24",
    status: "Open for Bidding",
    estimatedValue: "KES 150,000",
    currentBid: "KES 85,000",
    organizer: "Ministry of Finance",
    location: "Nairobi, Kenya",
    userBid: null,
  },
  {
    id: "EXT-DA-002",
    title: "University Laboratory Equipment",
    description: "Scientific equipment including microscopes, centrifuges, and lab furniture from university upgrade. All items tested and in working condition.",
    startDate: "2025-02-05",
    endDate: "2025-02-20",
    status: "Open for Bidding",
    estimatedValue: "KES 200,000",
    currentBid: "KES 125,000",
    organizer: "University of Nairobi",
    location: "Nairobi, Kenya",
    userBid: {
      amount: "KES 120,000",
      notes: "<p>We are interested in the <strong>microscopes</strong> and <strong>centrifuges</strong> for our research facility.</p><ul><li>Can arrange immediate pickup</li><li>Have experience with similar equipment</li></ul>",
      submittedAt: "2025-02-08",
      status: "Active"
    },
  },
]

function getAuctionStatusColor(status: string) {
  switch (status) {
    case "Open for Bidding": return "green"
    case "Bidding Closed": return "orange"
    case "Awarded": return "blue"
    case "Completed": return "green"
    default: return "gray"
  }
}

export default function ExternalAuctionDetailPage({ params }: ExternalAuctionDetailProps) {
  const auction = externalAuctions.find(a => a.id === params.id) || externalAuctions[0]
  const [bidAmount, setBidAmount] = useState<number | string>("")
  const bidNotesEditor = useEditor({
    extensions: [StarterKit],
    content: "",
    immediatelyRender: false,
  })

  const canBid = auction.status === "Open for Bidding" && !auction.userBid
  const hasBid = !!auction.userBid

  return (
    <Stack gap="lg">
      <Group>
        <Link href="/application/disposal-auctions/external">
          <ActionIcon variant="subtle" size="lg">
            <IconArrowLeft size={20} />
          </ActionIcon>
        </Link>
        <div>
          <Title order={2}>{auction.title}</Title>
          <Text c="dimmed" size="sm">External Auction {auction.id}</Text>
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
                    <IconBuilding size={16} />
                    <Text size="sm" fw={500}>Organizer</Text>
                  </Group>
                  <Text size="sm" c="dimmed">{auction.organizer}</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Group gap="xs" mb="sm">
                    <IconCalendar size={16} />
                    <Text size="sm" fw={500}>Location</Text>
                  </Group>
                  <Text size="sm" c="dimmed">{auction.location}</Text>
                </Grid.Col>
              </Grid>

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
                <Text size="sm" fw={500} mb="xs">Current Highest Bid</Text>
                <Group gap="xs">
                  <IconCurrencyDollar size={16} />
                  <Text size="sm" fw={600} c="blue">{auction.currentBid}</Text>
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
                Place Your Bid
              </Group>
            </Title>
            
            {hasBid ? (
              <Stack gap="md">
                <Badge variant="light" color="blue" size="lg" fullWidth>
                  Bid Submitted
                </Badge>
                <div>
                  <Text size="sm" fw={500} mb="xs">Your Bid</Text>
                  <Text size="lg" fw={600} c="blue">{auction.userBid?.amount}</Text>
                </div>
                <div>
                  <Text size="sm" fw={500} mb="xs">Submitted On</Text>
                  <Text size="sm" c="dimmed">{auction.userBid?.submittedAt}</Text>
                </div>
                <div>
                  <Text size="sm" fw={500} mb="xs">Your Notes</Text>
                  <div dangerouslySetInnerHTML={{ __html: auction.userBid?.notes || "No notes provided" }} />
                </div>
                <Button variant="outline" fullWidth>
                  Update Bid
                </Button>
              </Stack>
            ) : canBid ? (
              <Stack gap="md">
                <NumberInput
                  label="Your Bid Amount (KES)"
                  placeholder="Enter your bid"
                  value={bidAmount}
                  onChange={setBidAmount}
                  min={0}
                  thousandSeparator=","
                  description="Must be higher than current bid"
                />
                <div>
                  <Text size="sm" fw={500} mb="xs">Bid Notes (Optional)</Text>
                  <RichTextEditor editor={bidNotesEditor}>
                    <RichTextEditor.Toolbar sticky stickyOffset={60}>
                      <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Bold />
                        <RichTextEditor.Italic />
                        <RichTextEditor.Underline />
                        <RichTextEditor.Strikethrough />
                        <RichTextEditor.ClearFormatting />
                      </RichTextEditor.ControlsGroup>

                      <RichTextEditor.ControlsGroup>
                        <RichTextEditor.BulletList />
                        <RichTextEditor.OrderedList />
                      </RichTextEditor.ControlsGroup>
                    </RichTextEditor.Toolbar>

                    <RichTextEditor.Content />
                  </RichTextEditor>
                </div>
                <Button fullWidth disabled={!bidAmount}>
                  Submit Bid
                </Button>
                <Text size="xs" c="dimmed" ta="center">
                  By submitting a bid, you agree to the auction terms and conditions
                </Text>
              </Stack>
            ) : (
              <Text size="sm" c="dimmed" ta="center">
                Bidding is not available for this auction
              </Text>
            )}
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={4} mb="md">Auction Information</Title>
            <Stack gap="sm">
              <div>
                <Text size="xs" c="dimmed">Auction ID</Text>
                <Text size="sm" fw={500}>{auction.id}</Text>
              </div>
              <div>
                <Text size="xs" c="dimmed">Organizer</Text>
                <Text size="sm" fw={500}>{auction.organizer}</Text>
              </div>
              <div>
                <Text size="xs" c="dimmed">Bidding Ends</Text>
                <Text size="sm" fw={500}>{auction.endDate}</Text>
              </div>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Stack>
  )
}