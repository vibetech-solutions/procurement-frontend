"use client";

import { ContentContainer } from "@/components/layout/content-container";
import { useAppSelector } from "@/lib/redux/hooks";
import {
  Card,
  Text,
  Group,
  Button,
  Stack,
  Title,
  Image,
  ActionIcon,
  NumberInput,
  Divider,
  Paper,
  Grid,
  Tabs,
  Badge,
  Modal,
  TextInput,
  Select,
  Textarea,
  Checkbox,
} from "@mantine/core";
import {
  IconTrash,
  IconArrowRight,
  IconPackage,
  IconPlane,
  IconDeviceFloppy,
} from "@tabler/icons-react";
import { useState } from "react";

export default function CartPage() {
  const [activeTab, setActiveTab] = useState<string | null>("inventory");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [proceedModalOpen, setProceedModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CartService | null>(null);
  const [selectedService, setSelectedService] = useState<string>("");

  const { products, services } = useAppSelector((state) => state.cart);

  const inventorySubtotal = products.reduce(
    (sum, item) => sum + item.product.base_price * item.quantity,
    0,
  );
  const nonTangibleSubtotal = services.reduce(
    (sum, item) => sum + item.service.base_price * item.quantity,
    0,
  );
  const subtotal = inventorySubtotal + nonTangibleSubtotal;
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const totalItems = products.length + services.length;

  return (
    <ContentContainer>
      <Stack gap="lg">
        <div>
          <Title order={2} mb="xs">
            Request Cart
          </Title>
          <Text c="dimmed" size="sm">
            Review your items before creating a requisition
          </Text>
        </div>

        <Grid gutter="lg">
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Group justify="space-between" mb="md">
                <Text fw={600} size="lg">
                  Cart Items ({totalItems})
                </Text>
                <Button variant="subtle" color="red" size="xs">
                  Clear Cart
                </Button>
              </Group>

              <Tabs value={activeTab} onChange={setActiveTab}>
                <Tabs.List>
                  <Tabs.Tab
                    value="inventory"
                    leftSection={<IconPackage size={16} />}
                  >
                    Inventory Items ({products.length})
                  </Tabs.Tab>
                  <Tabs.Tab
                    value="services"
                    leftSection={<IconPlane size={16} />}
                  >
                    Non-Tangibles ({services.length})
                  </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="inventory" pt="md">
                  <Stack gap="md">
                    {products.map((item) => (
                      <Paper key={item.product.id} p="md" withBorder>
                        <Group align="flex-start" wrap="nowrap">
                          <div
                            style={{ width: 100, height: 100, flexShrink: 0 }}
                          >
                            <Image
                              src={item.product.image || "/placeholder.svg"}
                              alt={item.product.name}
                              fit="contain"
                              radius="md"
                              width="100%"
                              height="100%"
                            />
                          </div>

                          <Stack gap="xs" style={{ flex: 1 }}>
                            <div>
                              <Text fw={600} size="sm">
                                {item.product.name}
                              </Text>
                              <Text size="xs" c="dimmed">
                                {item.product.id} • {item.product.category.name}
                              </Text>
                              <Text size="xs" c="dimmed" mt={4}>
                                Supplier:{" "}
                                {item.product.suppliers[0].company_name}
                              </Text>
                            </div>

                            <Group justify="space-between" align="flex-end">
                              <Group gap="md">
                                <div>
                                  <Text size="xs" c="dimmed" mb={4}>
                                    Quantity
                                  </Text>
                                  <NumberInput
                                    defaultValue={item.quantity}
                                    min={1}
                                    max={100}
                                    w={100}
                                    size="xs"
                                  />
                                </div>
                                <div>
                                  <Text size="xs" c="dimmed" mb={4}>
                                    Unit Price
                                  </Text>
                                  <Text size="sm" fw={600}>
                                    KES{" "}
                                    {item.product.base_price.toLocaleString()}
                                  </Text>
                                </div>
                                <div>
                                  <Text size="xs" c="dimmed" mb={4}>
                                    Total
                                  </Text>
                                  <Text size="sm" fw={700} c="cyan">
                                    KES{" "}
                                    {(
                                      item.product.base_price * item.quantity
                                    ).toLocaleString()}
                                  </Text>
                                </div>
                              </Group>

                              <ActionIcon
                                variant="subtle"
                                color="red"
                                size="lg"
                              >
                                <IconTrash size={18} />
                              </ActionIcon>
                            </Group>
                          </Stack>
                        </Group>
                      </Paper>
                    ))}
                  </Stack>
                </Tabs.Panel>

                <Tabs.Panel value="services" pt="md">
                  <Stack gap="md">
                    {services.map((item) => (
                      <Paper
                        key={item.service.id}
                        p="md"
                        withBorder
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setSelectedItem(item);
                          setEditModalOpen(true);
                        }}
                      >
                        <Stack gap="xs">
                          <div>
                            <Text fw={600} size="sm">
                              {item.service.name}
                            </Text>
                            <Text size="xs" c="dimmed">
                              {item.service.id} • {item.service.category.name}
                            </Text>
                            <Group justify="space-between" align="flex-start">
                              <div>
                                <Text size="xs" c="dimmed" mt={4}>
                                  Supplier:{" "}
                                  {
                                    item.service.sellable.suppliers[0]
                                      .company_name
                                  }
                                </Text>
                                {item.service.description && (
                                  <Text size="xs" c="dimmed" mt={2}>
                                    {item.service.description}
                                  </Text>
                                )}
                              </div>
                              <Badge size="xs" variant="light" color="blue">
                                Click to edit
                              </Badge>
                            </Group>
                          </div>

                          <Group justify="space-between" align="flex-end">
                            <Group gap="md">
                              <div>
                                <Text size="xs" c="dimmed" mb={4}>
                                  Quantity
                                </Text>
                                <NumberInput
                                  defaultValue={item.quantity}
                                  min={1}
                                  max={100}
                                  w={100}
                                  size="xs"
                                />
                              </div>
                              <div>
                                <Text size="xs" c="dimmed" mb={4}>
                                  Unit Price
                                </Text>
                                <Text size="sm" fw={600}>
                                  KES {item.service.base_price.toLocaleString()}
                                </Text>
                              </div>
                              <div>
                                <Text size="xs" c="dimmed" mb={4}>
                                  Total
                                </Text>
                                <Text size="sm" fw={700} c="cyan">
                                  KES{" "}
                                  {(
                                    item.service.base_price * item.quantity
                                  ).toLocaleString()}
                                </Text>
                              </div>
                            </Group>

                            <ActionIcon variant="subtle" color="red" size="lg">
                              <IconTrash size={18} />
                            </ActionIcon>
                          </Group>
                        </Stack>
                      </Paper>
                    ))}
                  </Stack>
                </Tabs.Panel>
              </Tabs>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="md">
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Text fw={600} size="lg" mb="md">
                  Order Summary
                </Text>

                <Stack gap="sm">
                  <Group justify="space-between">
                    <Text size="sm">Subtotal</Text>
                    <Text size="sm" fw={500}>
                      KES {subtotal.toLocaleString()}
                    </Text>
                  </Group>
                  <Group justify="space-between">
                    <Text size="sm">Tax (16%)</Text>
                    <Text size="sm" fw={500}>
                      KES {tax.toLocaleString()}
                    </Text>
                  </Group>
                  <Divider />
                  <Group justify="space-between">
                    <Text size="md" fw={600}>
                      Total
                    </Text>
                    <Text size="lg" fw={700} c="cyan">
                      KES {total.toLocaleString()}
                    </Text>
                  </Group>
                </Stack>

                <Button
                  leftSection={<IconArrowRight size={16} />}
                  variant="filled"
                  fullWidth
                  size="lg"
                  mt="xl"
                  onClick={() => {
                    setSelectedService(
                      services[0]?.service.id.toString() || "",
                    );
                    setProceedModalOpen(true);
                  }}
                >
                  Proceed to Requisition
                </Button>
              </Card>

              <Card shadow="sm" padding="md" radius="md" withBorder>
                <Text size="sm" fw={600} mb="xs">
                  Need Help?
                </Text>
                <Text size="xs" c="dimmed" mb="md">
                  Contact procurement support for assistance with your request.
                </Text>
                <Button variant="light" size="xs" fullWidth>
                  Contact Support
                </Button>
              </Card>
            </Stack>
          </Grid.Col>
        </Grid>

        <Modal
          opened={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          title={`Edit Booking - ${selectedItem?.service.name}`}
          size="lg"
        >
          {selectedItem && (
            <Stack gap="md">
              <Group grow>
                <NumberInput label="Quantity" min={1} max={100} />
                <TextInput label="Duration (days)" />
              </Group>

              <Group grow>
                <TextInput label="Start Date" type="date" />
                <TextInput label="End Date" type="date" />
              </Group>

              {selectedItem.service.category.name === "Travel" &&
                selectedItem.service.name.includes("Flight") && (
                  <>
                    <Group grow>
                      <TextInput label="From" placeholder="Departure city" />
                      <TextInput label="To" placeholder="Destination city" />
                    </Group>
                    <Select
                      label="Flight Type"
                      data={["Economy", "Business", "First Class"]}
                    />
                  </>
                )}

              {selectedItem.service.category.name === "Travel" &&
                selectedItem.service.name.includes("Hotel") && (
                  <Group grow>
                    <Select
                      label="Room Type"
                      data={["Standard", "Deluxe", "Suite", "Executive"]}
                    />
                    <NumberInput label="Number of Guests" min={1} max={10} />
                  </Group>
                )}

              {selectedItem.service.category.name === "Transport" &&
                selectedItem.service.name.includes("Car") && (
                  <Select
                    label="Car Type"
                    data={[
                      "Economy",
                      "Compact",
                      "Mid-size",
                      "Full-size",
                      "SUV",
                      "Luxury",
                    ]}
                  />
                )}

              <Textarea
                label="Special Notes"
                rows={3}
                placeholder="Any special requirements or notes..."
              />

              <Group justify="flex-end" mt="md">
                <Button
                  variant="outline"
                  onClick={() => setEditModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  leftSection={<IconDeviceFloppy size={16} />}
                  onClick={() => setEditModalOpen(false)}
                >
                  Save Booking
                </Button>
              </Group>
            </Stack>
          )}
        </Modal>

        <Modal
          opened={proceedModalOpen}
          onClose={() => setProceedModalOpen(false)}
          title="Select Items for Requisition"
          size="lg"
        >
          <Stack gap="md">
            <Text size="sm" c="dimmed">
              Choose which items to include in your requisition
            </Text>

            {products.length > 0 && (
              <>
                <Text fw={600} size="sm">
                  Inventory Items
                </Text>
                <Stack gap="xs">
                  {products.map((item) => (
                    <Paper key={item.product.id} p="sm" withBorder>
                      <Group justify="space-between">
                        <div>
                          <Text size="sm" fw={500}>
                            {item.product.name}
                          </Text>
                          <Text size="xs" c="dimmed">
                            Qty: {item.quantity}
                          </Text>
                        </div>
                        <Text size="sm" fw={600}>
                          KES{" "}
                          {(
                            item.product.base_price * item.quantity
                          ).toLocaleString()}
                        </Text>
                      </Group>
                    </Paper>
                  ))}
                </Stack>
              </>
            )}

            {products.length > 0 && services.length > 0 && <Divider />}

            {services.length > 0 && (
              <>
                <Group justify="space-between" align="center">
                  <Text fw={600} size="sm">
                    Non-Tangible Services
                  </Text>
                  <Button
                    size="xs"
                    variant="light"
                    onClick={() => {
                      window.location.href = "/application/requisitions/new";
                    }}
                  >
                    Proceed with All Services
                  </Button>
                </Group>
                <Stack gap="xs">
                  {services.map((item) => (
                    <Paper key={item.service.id} p="sm" withBorder>
                      <Group justify="space-between">
                        <Group>
                          <Checkbox
                            checked={
                              selectedService === item.service.id.toString()
                            }
                            onChange={() => {
                              setSelectedService(
                                selectedService === item.service.id.toString()
                                  ? ""
                                  : item.service.id.toString(),
                              );
                            }}
                          />
                          <div>
                            <Text size="sm" fw={500}>
                              {item.service.name}
                            </Text>
                            <Text size="xs" c="dimmed">
                              Qty: {item.quantity}
                            </Text>
                          </div>
                        </Group>
                        <Text size="sm" fw={600}>
                          KES{" "}
                          {(
                            item.service.base_price * item.quantity
                          ).toLocaleString()}
                        </Text>
                      </Group>
                    </Paper>
                  ))}
                </Stack>
              </>
            )}

            <Group justify="flex-end" mt="md">
              <Button
                variant="outline"
                onClick={() => setProceedModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  window.location.href = "/application/requisitions/new";
                }}
              >
                Proceed with All
              </Button>
              <Button
                variant="filled"
                disabled={!selectedService}
                onClick={() => {
                  window.location.href = "/application/requisitions/new";
                }}
              >
                Proceed with Selected
              </Button>
            </Group>
          </Stack>
        </Modal>
      </Stack>
    </ContentContainer>
  );
}
