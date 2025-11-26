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
  Table,
  Modal,
  Checkbox,
  NumberInput,
} from "@mantine/core"
import { IconArrowLeft, IconEdit, IconTrash, IconEye, IconCurrencyDollar, IconCalendar, IconScale } from "@tabler/icons-react"
import Link from "next/link"
import { useState } from "react"

interface InternalAuctionDetailProps {
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

const mockBids = [
  { id: "BID-001", bidder: "ABC Company", amount: 45000, amountText: "KES 45,000", date: "2025-01-20 10:30 AM", status: "Active", email: "procurement@abc.co.ke", phone: "+254 700 123 456", notes: "We can deliver within 2 weeks" },
  { id: "BID-002", bidder: "XYZ Ltd", amount: 42000, amountText: "KES 42,000", date: "2025-01-20 09:15 AM", status: "Outbid", email: "bids@xyz.co.ke", phone: "+254 700 234 567", notes: "Immediate pickup available" },
  { id: "BID-003", bidder: "Tech Solutions", amount: 40000, amountText: "KES 40,000", date: "2025-01-19 04:45 PM", status: "Outbid", email: "offers@techsol.co.ke", phone: "+254 700 345 678", notes: "Bulk purchase discount applied" },
]

export default function InternalAuctionDetailPage({ params }: InternalAuctionDetailProps) {
  const auction = disposalAuctions.find(a => a.id === params.id) || disposalAuctions[0]
  const [viewBidsModal, setViewBidsModal] = useState(false)
  const [compareMode, setCompareMode] = useState(false)
  const [selectedBids, setSelectedBids] = useState<string[]>([])
  const [counterOffer, setCounterOffer] = useState<{ [key: string]: number }>({})
  const [selectedBid, setSelectedBid] = useState<string | null>(null)

  return (
    <Stack gap="lg">
      <Group>
        <Link href="/application/disposal-auctions/internal">
          <ActionIcon variant="subtle" size="lg">
            <IconArrowLeft size={20} />
          </ActionIcon>
        </Link>
        <div>
          <Title order={2}>{auction.title}</Title>
          <Text c="dimmed" size="sm">Internal Auction {auction.id}</Text>
        </div>
      </Group>

      <Grid gutter="lg">
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="md">
              <Title order={4}>Auction Details</Title>
              <Group>
                <Link href={`/application/disposal-auctions/internal/${params.id}/edit`}>
                  <Button leftSection={<IconEdit size={16} />} variant="outline" size="sm">
                    Edit Auction
                  </Button>
                </Link>
                <Button leftSection={<IconTrash size={16} />} color="red" variant="outline" size="sm">
                  Cancel Auction
                </Button>
              </Group>
            </Group>
            
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
            </Stack>
          </Card>

          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="md">
              <Title order={4}>Received Bids ({mockBids.length})</Title>
              <Button leftSection={<IconScale size={16} />} variant="outline" size="sm" onClick={() => setCompareMode(!compareMode)}>
                Compare Bids
              </Button>
            </Group>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  {compareMode && <Table.Th>Select</Table.Th>}
                  <Table.Th>Bidder</Table.Th>
                  <Table.Th>Bid Amount</Table.Th>
                  <Table.Th>Date & Time</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {mockBids.slice(0, 3).map((bid) => (
                  <Table.Tr key={bid.id}>
                    {compareMode && (
                      <Table.Td>
                        <Checkbox
                          checked={selectedBids.includes(bid.id)}
                          onChange={(e) => {
                            if (e.currentTarget.checked) {
                              setSelectedBids([...selectedBids, bid.id])
                            } else {
                              setSelectedBids(selectedBids.filter(id => id !== bid.id))
                            }
                          }}
                        />
                      </Table.Td>
                    )}
                    <Table.Td>
                      <Text size="sm" fw={500}>{bid.bidder}</Text>
                      <Text size="xs" c="dimmed">{bid.id}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm" fw={600} c={bid.status === "Active" ? "green" : "dimmed"}>
                        {bid.amountText}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm">{bid.date}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Badge variant="light" color={bid.status === "Active" ? "green" : "gray"}>
                        {bid.status}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <ActionIcon variant="subtle" color="blue" onClick={() => {
                        setSelectedBid(bid.id)
                        setViewBidsModal(true)
                      }}>
                        <IconEye size={16} />
                      </ActionIcon>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
            {compareMode && selectedBids.length > 1 && (
              <Group justify="center" mt="md">
                <Button onClick={() => setViewBidsModal(true)}>
                  Compare Selected Bids ({selectedBids.length})
                </Button>
              </Group>
            )}
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={4} mb="md">Auction Summary</Title>
            <Stack gap="md">
              <div>
                <Text size="sm" fw={500} mb="xs">Highest Bid</Text>
                <Group gap="xs">
                  <IconCurrencyDollar size={16} />
                  <Text size="sm" fw={600} c="green">{auction.highestBid}</Text>
                </Group>
              </div>
              
              <div>
                <Text size="sm" fw={500} mb="xs">Total Bids</Text>
                <Text size="sm" c="dimmed">{mockBids.length} bids received</Text>
              </div>

              <div>
                <Text size="sm" fw={500} mb="xs">Leading Bidder</Text>
                <Text size="sm" c="dimmed">{mockBids[0]?.bidder}</Text>
              </div>

              {auction.status === "Open for Bidding" && (
                <Button fullWidth color="orange">
                  Close Bidding
                </Button>
              )}
              
              {auction.status === "Bidding Closed" && (
                <Button fullWidth color="green">
                  Award to Winner
                </Button>
              )}
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>

      <Modal opened={viewBidsModal} onClose={() => {
        setViewBidsModal(false)
        setSelectedBid(null)
      }} title={selectedBid ? `Bid Details - ${mockBids.find(b => b.id === selectedBid)?.bidder}` : "Auction Bids"} size="xl">
        {selectedBid ? (
          <Stack gap="md">
            {(() => {
              const bid = mockBids.find(b => b.id === selectedBid)
              if (!bid) return null
              return (
                <>
                  <Grid gutter="md">
                    <Grid.Col span={6}>
                      <Text size="sm" fw={500} mb="xs">Bidder Information</Text>
                      <Text fw={600}>{bid.bidder}</Text>
                      <Text size="sm" c="dimmed">{bid.email}</Text>
                      <Text size="sm" c="dimmed">{bid.phone}</Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text size="sm" fw={500} mb="xs">Bid Details</Text>
                      <Text fw={600} c={bid.status === "Active" ? "green" : "dimmed"}>{bid.amountText}</Text>
                      <Text size="sm" c="dimmed">{bid.date}</Text>
                      <Badge variant="light" color={bid.status === "Active" ? "green" : "gray"}>
                        {bid.status}
                      </Badge>
                    </Grid.Col>
                  </Grid>
                  <div>
                    <Text size="sm" fw={500} mb="xs">Bidder Notes</Text>
                    <Text size="sm">{bid.notes}</Text>
                  </div>
                  <div>
                    <Text size="sm" fw={500} mb="xs">Counter Offer</Text>
                    <NumberInput
                      placeholder="Enter counter offer amount"
                      value={counterOffer[bid.id] || ''}
                      onChange={(value) => setCounterOffer({...counterOffer, [bid.id]: typeof value === 'number' ? value : 0})}
                      min={0}
                      thousandSeparator=","
                      w={200}
                    />
                  </div>
                  <Group justify="flex-end">
                    <Button variant="outline" onClick={() => setSelectedBid(null)}>Back to All Bids</Button>
                    <Button>Send Counter Offer</Button>
                    <Button color="green">Accept Bid</Button>
                  </Group>
                </>
              )
            })()}
          </Stack>
        ) : compareMode && selectedBids.length > 1 ? (
          <Stack gap="md">
            <Title order={4}>Bid Comparison</Title>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Criteria</Table.Th>
                  {selectedBids.map(bidId => {
                    const bid = mockBids.find(b => b.id === bidId)
                    return <Table.Th key={bidId}>{bid?.bidder}</Table.Th>
                  })}
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td fw={500}>Bid Amount</Table.Td>
                  {selectedBids.map(bidId => {
                    const bid = mockBids.find(b => b.id === bidId)
                    return (
                      <Table.Td key={bidId}>
                        <Text fw={600} c={bid?.status === "Active" ? "green" : "dimmed"}>
                          {bid?.amountText}
                        </Text>
                      </Table.Td>
                    )
                  })}
                </Table.Tr>
                <Table.Tr>
                  <Table.Td fw={500}>Contact</Table.Td>
                  {selectedBids.map(bidId => {
                    const bid = mockBids.find(b => b.id === bidId)
                    return (
                      <Table.Td key={bidId}>
                        <Text size="sm">{bid?.email}</Text>
                        <Text size="xs" c="dimmed">{bid?.phone}</Text>
                      </Table.Td>
                    )
                  })}
                </Table.Tr>
                <Table.Tr>
                  <Table.Td fw={500}>Bid Date</Table.Td>
                  {selectedBids.map(bidId => {
                    const bid = mockBids.find(b => b.id === bidId)
                    return <Table.Td key={bidId}><Text size="sm">{bid?.date}</Text></Table.Td>
                  })}
                </Table.Tr>
                <Table.Tr>
                  <Table.Td fw={500}>Notes</Table.Td>
                  {selectedBids.map(bidId => {
                    const bid = mockBids.find(b => b.id === bidId)
                    return <Table.Td key={bidId}><Text size="sm">{bid?.notes}</Text></Table.Td>
                  })}
                </Table.Tr>
                <Table.Tr>
                  <Table.Td fw={500}>Counter Offer</Table.Td>
                  {selectedBids.map(bidId => (
                    <Table.Td key={bidId}>
                      <NumberInput
                        placeholder="Enter amount"
                        value={counterOffer[bidId] || ''}
                        onChange={(value) => setCounterOffer({...counterOffer, [bidId]: typeof value === 'number' ? value : 0})}
                        min={0}
                        thousandSeparator=","
                        size="sm"
                      />
                    </Table.Td>
                  ))}
                </Table.Tr>
              </Table.Tbody>
            </Table>
            <Group justify="flex-end">
              <Button variant="outline" onClick={() => {
                setCompareMode(false)
                setSelectedBids([])
              }}>Back to All Bids</Button>
              <Button>Send Counter Offers</Button>
            </Group>
          </Stack>
        ) : null}
      </Modal>
    </Stack>
  )
}