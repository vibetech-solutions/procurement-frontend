"use client";

import {
  Container,
  Title,
  Text,
  Button,
  Stack,
  Group,
  Card,
  SimpleGrid,
  Box,
  Badge,
  Modal,
  Grid,
  NumberInput,
  Divider,
} from "@mantine/core";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { notifications } from "@mantine/notifications";
import { IconHammer, IconEye, IconCurrencyDollar, IconCalendar, IconBuilding } from "@tabler/icons-react";
import Link from "next/link";
import { LandingNavbar } from "@/components/landing-navbar";
import { landingPageFeatures } from "@/lib/utils/constants";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { RootState } from "@/lib/redux/store";
import { useEffect, useState } from "react";
import { fetchUser } from "@/lib/redux/features/auth/authSlice";
import { getLandingActionText } from "@/lib/utils/helpers";

const featuredAuctions = [
  {
    id: "EXT-DA-001",
    title: "Government Office Equipment Disposal",
    description: "Surplus computers, printers, and office furniture from government offices. Items are in good working condition and suitable for small businesses or startups.",
    organizer: "Ministry of Finance",
    location: "Nairobi, Kenya",
    startDate: "2025-02-10",
    endDate: "2025-02-24",
    estimatedValue: "KES 150,000",
    currentBid: "KES 85,000",
    status: "Open for Bidding",
  },
  {
    id: "EXT-DA-002",
    title: "University Laboratory Equipment",
    description: "Scientific equipment including microscopes, centrifuges, and lab furniture from university upgrade. All items tested and in working condition.",
    organizer: "University of Nairobi",
    location: "Nairobi, Kenya",
    startDate: "2025-02-05",
    endDate: "2025-02-20",
    estimatedValue: "KES 200,000",
    currentBid: "KES 125,000",
    status: "Open for Bidding",
  },
  {
    id: "INT-DA-001",
    title: "Old Office Equipment Auction",
    description: "Disposal of obsolete computers and furniture from office modernization project.",
    organizer: "Procurement Solutions Ltd",
    location: "Nairobi, Kenya",
    startDate: "2025-02-01",
    endDate: "2025-02-15",
    estimatedValue: "KES 75,000",
    currentBid: "KES 45,000",
    status: "Open for Bidding",
  },
];

function getAuctionStatusColor(status: string) {
  switch (status) {
    case "Open for Bidding": return "green"
    case "Bidding Closed": return "orange"
    case "Awarded": return "blue"
    default: return "gray"
  }
}

export default function LandingPage() {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const [selectedAuction, setSelectedAuction] = useState<typeof featuredAuctions[0] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [bidAmount, setBidAmount] = useState<number | string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const bidNotesEditor = useEditor({
    extensions: [StarterKit],
    content: "",
    immediatelyRender: false,
  });

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleViewDetails = (auction: typeof featuredAuctions[0]) => {
    setSelectedAuction(auction);
    setModalOpen(true);
    setBidAmount("");
    bidNotesEditor?.commands.setContent("");
  };

  const handleSubmitBid = async () => {
    if (!bidAmount || !selectedAuction) return;
    
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      notifications.show({
        title: "Bid Submitted Successfully",
        message: `Your bid of KES ${bidAmount.toLocaleString()} has been submitted for ${selectedAuction.title}`,
        color: "green",
      });
      
      setModalOpen(false);
      setBidAmount("");
      bidNotesEditor?.commands.setContent("");
    } catch {
      notifications.show({
        title: "Error",
        message: "Failed to submit bid. Please try again.",
        color: "red",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      style={{
        minHeight: "100vh",
        backgroundColor:
          "light-dark(var(--mantine-color-white), var(--mantine-color-dark-7))",
      }}
    >
      <LandingNavbar />
      <Container size="lg" py="xl">
        <Stack gap="xl" align="center" ta="center">
          <Stack gap="md" maw={600}>
            <Title order={1} size="3rem" fw={900} c="dimmed">
              Procurement Catalogue System
            </Title>
            <Text size="xl" c="dimmed">
              Streamline your organization&apos;s procurement process with our
              comprehensive catalogue management and requisition platform
            </Text>
          </Stack>

          <Group gap="md">
            {user && (
              <Button
                component={Link}
                href="/application/dashboard"
                size="lg"
                radius="md"
              >
                Go to Dashboard
              </Button>
            )}
            <Button
              component={Link}
              href={getLandingActionText(user?.roles?.[0]?.name || '').action}
              variant="outline"
              size="lg"
              radius="md"
            >
              {getLandingActionText(user?.roles?.[0]?.name || '').text}
            </Button>
          </Group>

          <SimpleGrid
            cols={{ base: 1, sm: 2, lg: 4 }}
            spacing="lg"
            mt="xl"
            w="100%"
          >
            {landingPageFeatures.map((feature) => (
              <Card
                key={feature.title}
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                h="100%"
              >
                <Stack align="center" ta="center" gap="md">
                  <feature.icon
                    size={48}
                    stroke={1.5}
                    color="var(--mantine-color-cyan-6)"
                  />
                  <Title order={3} size="h4">
                    {feature.title}
                  </Title>
                  <Text size="sm" c="dimmed">
                    {feature.description}
                  </Text>
                </Stack>
              </Card>
            ))}
          </SimpleGrid>

          <Stack gap="lg" mt="xl" w="100%">
            <Group justify="space-between" align="center">
              <div>
                <Title order={2} size="2rem">
                  <Group gap="sm">
                    <IconHammer size={32} color="var(--mantine-color-cyan-6)" />
                    Auction Marketplace
                  </Group>
                </Title>
                <Text size="lg" c="dimmed" mt="xs">
                  Discover disposal auctions and bidding opportunities
                </Text>
              </div>
              {user && (
                <Button
                  component={Link}
                  href="/application/disposal-auctions"
                  variant="outline"
                  size="md"
                >
                  View All Auctions
                </Button>
              )}
            </Group>

            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
              {featuredAuctions.map((auction) => (
                <Card key={auction.id} shadow="sm" padding="lg" radius="md" withBorder>
                  <Stack gap="md">
                    <Group justify="space-between" align="flex-start">
                      <div style={{ flex: 1 }}>
                        <Text size="lg" fw={600} lineClamp={2}>
                          {auction.title}
                        </Text>
                        <Text size="sm" c="dimmed" mt="xs">
                          {auction.organizer}
                        </Text>
                      </div>
                      <Badge variant="light" color={getAuctionStatusColor(auction.status)}>
                        {auction.status}
                      </Badge>
                    </Group>

                    <Stack gap="xs">
                      <Group justify="space-between">
                        <Text size="sm" c="dimmed">Estimated Value</Text>
                        <Text size="sm" fw={500}>{auction.estimatedValue}</Text>
                      </Group>
                      <Group justify="space-between">
                        <Text size="sm" c="dimmed">Current Bid</Text>
                        <Group gap="xs">
                          <IconCurrencyDollar size={14} />
                          <Text size="sm" fw={600} c="blue">{auction.currentBid}</Text>
                        </Group>
                      </Group>
                      <Group justify="space-between">
                        <Text size="sm" c="dimmed">Ends</Text>
                        <Group gap="xs">
                          <IconCalendar size={14} />
                          <Text size="sm">{auction.endDate}</Text>
                        </Group>
                      </Group>
                    </Stack>

                    <Group justify="flex-end" mt="md">
                      <Button
                        onClick={() => handleViewDetails(auction)}
                        size="sm"
                        leftSection={<IconEye size={16} />}
                      >
                        View Details
                      </Button>
                    </Group>
                  </Stack>
                </Card>
              ))}
            </SimpleGrid>
          </Stack>
        </Stack>
      </Container>

      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedAuction?.title}
        size="lg"
        centered
      >
        {selectedAuction && (
          <Stack gap="md">
            <div>
              <Text size="sm" fw={500} mb="xs">Description</Text>
              <Text size="sm" c="dimmed">{selectedAuction.description}</Text>
            </div>
            
            <Grid>
              <Grid.Col span={6}>
                <Group gap="xs" mb="sm">
                  <IconBuilding size={16} />
                  <Text size="sm" fw={500}>Organizer</Text>
                </Group>
                <Text size="sm" c="dimmed">{selectedAuction.organizer}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Group gap="xs" mb="sm">
                  <IconCalendar size={16} />
                  <Text size="sm" fw={500}>Location</Text>
                </Group>
                <Text size="sm" c="dimmed">{selectedAuction.location}</Text>
              </Grid.Col>
            </Grid>

            <Grid>
              <Grid.Col span={6}>
                <Group gap="xs" mb="sm">
                  <IconCalendar size={16} />
                  <Text size="sm" fw={500}>Bidding Period</Text>
                </Group>
                <Text size="sm" c="dimmed">{selectedAuction.startDate} - {selectedAuction.endDate}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Group gap="xs" mb="sm">
                  <IconCurrencyDollar size={16} />
                  <Text size="sm" fw={500}>Estimated Value</Text>
                </Group>
                <Text size="sm" c="dimmed">{selectedAuction.estimatedValue}</Text>
              </Grid.Col>
            </Grid>

            <div>
              <Text size="sm" fw={500} mb="xs">Current Status</Text>
              <Badge variant="light" color={getAuctionStatusColor(selectedAuction.status)}>
                {selectedAuction.status}
              </Badge>
            </div>

            <div>
              <Text size="sm" fw={500} mb="xs">Current Highest Bid</Text>
              <Group gap="xs">
                <IconCurrencyDollar size={16} />
                <Text size="sm" fw={600} c="blue">{selectedAuction.currentBid}</Text>
              </Group>
            </div>

            {user ? (
              <>
                <Divider my="md" />
                
                <div>
                  <Text size="lg" fw={600} mb="md">Place Your Bid</Text>
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
                  </Stack>
                </div>

                <Group justify="flex-end" mt="md">
                  <Button
                    variant="outline"
                    onClick={() => setModalOpen(false)}
                    disabled={isSubmitting}
                  >
                    Close
                  </Button>
                  <Button
                    onClick={handleSubmitBid}
                    disabled={!bidAmount}
                    loading={isSubmitting}
                  >
                    Submit Bid
                  </Button>
                </Group>
              </>
            ) : (
              <Group justify="flex-end" mt="md">
                <Button
                  variant="outline"
                  onClick={() => setModalOpen(false)}
                >
                  Close
                </Button>
                <Button
                  component={Link}
                  href="/auth/login"
                  onClick={() => setModalOpen(false)}
                >
                  Login to Bid
                </Button>
              </Group>
            )}
          </Stack>
        )}
      </Modal>
    </Box>
  );
}
