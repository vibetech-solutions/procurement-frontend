import {
  computeTax,
  computeTotal,
  formatCurrency,
} from "@/components/shared/catalogue/services/utils/constants";
import { useAppSelector } from "@/lib/redux/hooks";
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Divider,
  Grid,
  Group,
  Loader,
  NumberInput,
  Paper,
  Stack,
  Table,
  Tabs,
  Text,
} from "@mantine/core";
import {
  IconPackage,
  IconPlane,
  IconPlus,
  IconSearch,
  IconTrash,
} from "@tabler/icons-react";
import React from "react";

const Requisitionsummary = ({
  setAddItemModalOpen,
  viewingService,
  setViewingService,
  updateItemQuantity,
  removeItem,
  total,
  tax,
  subtotal,
  setEditingService,
  setEditServiceQuantity,
  setEditServiceFormData,
  setEditServiceModalOpen,
  items,
}: {
  setAddItemModalOpen: (v: boolean) => void;
  viewingService: string | null;
  setViewingService: (v: string | null) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  total: number;
  tax: number;
  subtotal: number;
  setEditingService: (v: CartService) => void;
  setEditServiceQuantity: (v: number) => void;
  setEditServiceFormData: (v: Record<string, CustomFieldValueType>) => void;
  setEditServiceModalOpen: (v: boolean) => void;
  items: RequisitionItem[];
}) => {
  const { products: cartProducts, productDetails } = useAppSelector(
    (state) => state.products_cart,
  );
  const {
    services: cartServices,
    serviceDetails,
    servicesLoading,
  } = useAppSelector((state) => state.services_cart);
  return (
    <Stack gap="md" mt="xl">
      <Paper p="md" withBorder>
        <Text fw={600} mb="md">
          Requisition Summary
        </Text>
        <Grid gutter="sm">
          <Grid.Col span={6}>
            <Text size="xs" c="dimmed">
              Title
            </Text>
            <Text size="sm">Q1 Office Equipment</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="xs" c="dimmed">
              Priority
            </Text>
            <Badge size="sm" color="orange">
              High
            </Badge>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="xs" c="dimmed">
              Cost Center
            </Text>
            <Text size="sm">IT</Text>
          </Grid.Col>
          <Grid.Col span={6}>
            <Text size="xs" c="dimmed">
              Delivery Location
            </Text>
            <Text size="sm">Main Office - Building A</Text>
          </Grid.Col>
        </Grid>
      </Paper>

      <Card shadow="sm" padding="md" radius="md" withBorder>
        <Group justify="space-between" mb="md">
          <Text fw={600}>Items ({items.length})</Text>
          <Button
            size="xs"
            leftSection={<IconPlus size={14} />}
            onClick={() => setAddItemModalOpen(true)}
          >
            Add Item
          </Button>
        </Group>

        {viewingService &&
          (() => {
            const service = items.find((item) => item.id === viewingService);
            if (!service) return null;
            return (
              <Paper
                p="md"
                withBorder
                mb="md"
                style={{ backgroundColor: "#f8f9fa" }}
              >
                <Group justify="space-between" mb="md">
                  <Text fw={600}>Booking Details - {service.name}</Text>
                  <Button
                    size="xs"
                    variant="outline"
                    onClick={() => setViewingService(null)}
                  >
                    Back to Items
                  </Button>
                </Group>
                {service.name.includes("Flight") && (
                  <Grid gutter="md">
                    <Grid.Col span={6}>
                      <Text size="xs" c="dimmed">
                        From
                      </Text>
                      <Text size="sm" fw={500}>
                        Nairobi (NBO)
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text size="xs" c="dimmed">
                        To
                      </Text>
                      <Text size="sm" fw={500}>
                        Mombasa (MBA)
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text size="xs" c="dimmed">
                        Departure
                      </Text>
                      <Text size="sm" fw={500}>
                        Jan 25, 2025 - 09:00 AM
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text size="xs" c="dimmed">
                        Return
                      </Text>
                      <Text size="sm" fw={500}>
                        Jan 27, 2025 - 06:00 PM
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text size="xs" c="dimmed">
                        Class
                      </Text>
                      <Badge size="sm" variant="light">
                        Business
                      </Badge>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text size="xs" c="dimmed">
                        Passengers
                      </Text>
                      <Text size="sm" fw={500}>
                        1 Adult
                      </Text>
                    </Grid.Col>
                  </Grid>
                )}
                {service.name.includes("Hotel") && (
                  <Grid gutter="md">
                    <Grid.Col span={6}>
                      <Text size="xs" c="dimmed">
                        Hotel
                      </Text>
                      <Text size="sm" fw={500}>
                        Serena Beach Resort
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text size="xs" c="dimmed">
                        Location
                      </Text>
                      <Text size="sm" fw={500}>
                        Mombasa, Kenya
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text size="xs" c="dimmed">
                        Check-in
                      </Text>
                      <Text size="sm" fw={500}>
                        Jan 25, 2025
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text size="xs" c="dimmed">
                        Check-out
                      </Text>
                      <Text size="sm" fw={500}>
                        Jan 28, 2025
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text size="xs" c="dimmed">
                        Room Type
                      </Text>
                      <Badge size="sm" variant="light">
                        Deluxe Ocean View
                      </Badge>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text size="xs" c="dimmed">
                        Guests
                      </Text>
                      <Text size="sm" fw={500}>
                        2 Adults
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <Text size="xs" c="dimmed">
                        Duration
                      </Text>
                      <Text size="sm" fw={500}>
                        3 nights
                      </Text>
                    </Grid.Col>
                  </Grid>
                )}
                {service.name.includes("Car") && (
                  <Grid gutter="md">
                    <Grid.Col span={6}>
                      <Text size="xs" c="dimmed">
                        Vehicle
                      </Text>
                      <Text size="sm" fw={500}>
                        Toyota Camry
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text size="xs" c="dimmed">
                        Category
                      </Text>
                      <Badge size="sm" variant="light">
                        Mid-size
                      </Badge>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text size="xs" c="dimmed">
                        Pickup Date
                      </Text>
                      <Text size="sm" fw={500}>
                        Jan 25, 2025 - 09:00 AM
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text size="xs" c="dimmed">
                        Return Date
                      </Text>
                      <Text size="sm" fw={500}>
                        Jan 30, 2025 - 09:00 AM
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text size="xs" c="dimmed">
                        Pickup Location
                      </Text>
                      <Text size="sm" fw={500}>
                        Jomo Kenyatta Airport
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Text size="xs" c="dimmed">
                        Duration
                      </Text>
                      <Text size="sm" fw={500}>
                        5 days
                      </Text>
                    </Grid.Col>
                  </Grid>
                )}
              </Paper>
            );
          })()}

        {!viewingService && (
          <Tabs defaultValue="products">
            <Tabs.List mb="md">
              <Tabs.Tab
                value="products"
                leftSection={<IconPackage size={14} />}
              >
                Products ({cartProducts.length})
              </Tabs.Tab>
              <Tabs.Tab value="services" leftSection={<IconPlane size={14} />}>
                Services ({cartServices.length})
              </Tabs.Tab>
              <Tabs.Tab
                value="recommended"
                leftSection={<IconSearch size={14} />}
              >
                Recommended Items
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="products">
              {servicesLoading ? (
                <Group justify="center" p="md">
                  <Loader size="sm" />
                </Group>
              ) : cartProducts.length === 0 ? (
                <Text c="dimmed" size="sm" ta="center" py="md">
                  No products in cart.
                </Text>
              ) : (
                <Table>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Item</Table.Th>
                      <Table.Th>Qty</Table.Th>
                      <Table.Th>Unit Price</Table.Th>
                      <Table.Th>Tax</Table.Th>
                      <Table.Th>Total</Table.Th>
                      <Table.Th></Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {cartProducts.map((raw) => {
                      const p = productDetails[raw.product_id];
                      const id = `product-${raw.product_id}`;
                      const base = p ? Number(p.base_price) : 0;
                      const taxAmt = p ? computeTax(p) : 0;
                      const lineTotal = p ? computeTotal(p) * raw.quantity : 0;
                      const isInclusive = p?.sellable?.tax_type === "inclusive";
                      const isTaxable =
                        p?.sellable?.tax_status === "taxable" && taxAmt > 0;
                      return (
                        <Table.Tr key={id}>
                          <Table.Td>
                            <Text size="sm" fw={500}>
                              {p?.name ?? `Product #${raw.product_id}`}
                            </Text>
                            <Text size="xs" c="dimmed">
                              {p?.category?.name}
                            </Text>
                          </Table.Td>
                          <Table.Td>
                            <NumberInput
                              value={raw.quantity}
                              onChange={(v) =>
                                updateItemQuantity(id, Number(v) || 1)
                              }
                              min={1}
                              max={99}
                              size="xs"
                              w={80}
                            />
                          </Table.Td>
                          <Table.Td>{formatCurrency(base)}</Table.Td>
                          <Table.Td>
                            {isTaxable ? (
                              <Stack gap={2}>
                                <Text size="xs" fw={500}>
                                  {formatCurrency(taxAmt * raw.quantity)}
                                </Text>
                                <Badge
                                  size="xs"
                                  variant="dot"
                                  color={isInclusive ? "teal" : "orange"}
                                >
                                  {isInclusive ? "Inclusive" : "Exclusive"}
                                </Badge>
                              </Stack>
                            ) : (
                              <Text size="xs" c="dimmed">
                                —
                              </Text>
                            )}
                          </Table.Td>
                          <Table.Td fw={600}>
                            {formatCurrency(lineTotal)}
                          </Table.Td>
                          <Table.Td>
                            <ActionIcon
                              color="red"
                              variant="subtle"
                              onClick={() => removeItem(id)}
                            >
                              <IconTrash size={16} />
                            </ActionIcon>
                          </Table.Td>
                        </Table.Tr>
                      );
                    })}
                  </Table.Tbody>
                </Table>
              )}
            </Tabs.Panel>

            <Tabs.Panel value="services">
              {servicesLoading ? (
                <Group justify="center" p="md">
                  <Loader size="sm" />
                </Group>
              ) : cartServices.length === 0 ? (
                <Text c="dimmed" size="sm" ta="center" py="md">
                  No services in cart.
                </Text>
              ) : (
                <Table>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Service</Table.Th>
                      <Table.Th>Qty</Table.Th>
                      <Table.Th>Unit Price</Table.Th>
                      <Table.Th>Tax</Table.Th>
                      <Table.Th>Total</Table.Th>
                      <Table.Th></Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {cartServices.map((raw) => {
                      const s = serviceDetails[raw.service_id];
                      const id = `service-${raw.service_id}`;
                      const base = s ? Number(s.base_price) : 0;
                      const taxAmt = s ? computeTax(s) : 0;
                      const lineTotal = s ? computeTotal(s) * raw.quantity : 0;
                      const isInclusive = s?.sellable?.tax_type === "inclusive";
                      const isTaxable =
                        s?.sellable?.tax_status === "taxable" && taxAmt > 0;
                      const hasCustomFields =
                        (s?.category?.custom_fields?.length ?? 0) > 0;
                      return (
                        <Table.Tr
                          key={id}
                          style={{
                            cursor: hasCustomFields ? "pointer" : undefined,
                          }}
                          onClick={() => {
                            if (!s || !hasCustomFields) return;
                            setEditingService({
                              service: s,
                              quantity: raw.quantity,
                              custom_values: raw.custom_values ?? [],
                            });
                            setEditServiceQuantity(raw.quantity);
                            const record: Record<string, CustomFieldValueType> =
                              {};
                            (raw.custom_values ?? []).forEach(
                              ({ field_id, value }) => {
                                record[field_id] = value;
                              },
                            );
                            setEditServiceFormData(record);
                            setEditServiceModalOpen(true);
                          }}
                        >
                          <Table.Td>
                            <Text size="sm" fw={500}>
                              {s?.name ?? `Service #${raw.service_id}`}
                            </Text>
                            <Group gap={4} mt={2}>
                              <Text size="xs" c="dimmed">
                                {s?.category?.name}
                              </Text>
                              {hasCustomFields && (
                                <Badge size="xs" variant="light" color="blue">
                                  Click to edit
                                </Badge>
                              )}
                            </Group>
                          </Table.Td>
                          <Table.Td>
                            <NumberInput
                              value={raw.quantity}
                              onChange={(v) =>
                                updateItemQuantity(id, Number(v) || 1)
                              }
                              min={1}
                              max={99}
                              size="xs"
                              w={80}
                              onClick={(e) => e.stopPropagation()}
                            />
                          </Table.Td>
                          <Table.Td>{formatCurrency(base)}</Table.Td>
                          <Table.Td>
                            {isTaxable ? (
                              <Stack gap={2}>
                                <Text size="xs" fw={500}>
                                  {formatCurrency(taxAmt * raw.quantity)}
                                </Text>
                                <Badge
                                  size="xs"
                                  variant="dot"
                                  color={isInclusive ? "teal" : "orange"}
                                >
                                  {isInclusive ? "Inclusive" : "Exclusive"}
                                </Badge>
                              </Stack>
                            ) : (
                              <Text size="xs" c="dimmed">
                                —
                              </Text>
                            )}
                          </Table.Td>
                          <Table.Td fw={600}>
                            {formatCurrency(lineTotal)}
                          </Table.Td>
                          <Table.Td>
                            <ActionIcon
                              color="red"
                              variant="subtle"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeItem(id);
                              }}
                            >
                              <IconTrash size={16} />
                            </ActionIcon>
                          </Table.Td>
                        </Table.Tr>
                      );
                    })}
                  </Table.Tbody>
                </Table>
              )}
            </Tabs.Panel>

            <Tabs.Panel value="recommended">
              <Table highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Item</Table.Th>
                    <Table.Th>Category</Table.Th>
                    <Table.Th>Price</Table.Th>
                    <Table.Th></Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {[
                    {
                      id: "REC-001",
                      name: "Wireless Keyboard",
                      category: "IT Equipment",
                      price: 4500,
                    },
                    {
                      id: "REC-002",
                      name: "USB-C Hub",
                      category: "IT Equipment",
                      price: 3200,
                    },
                    {
                      id: "REC-003",
                      name: "Desk Organizer Set",
                      category: "Office Supplies",
                      price: 1800,
                    },
                    {
                      id: "REC-004",
                      name: "Monitor Stand",
                      category: "Furniture",
                      price: 6500,
                    },
                  ].map((rec) => (
                    <Table.Tr key={rec.id}>
                      <Table.Td>
                        <Text size="sm" fw={500}>
                          {rec.name}
                        </Text>
                        <Text size="xs" c="dimmed">
                          {rec.id}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge variant="light" size="sm">
                          {rec.category}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm" fw={600} c="cyan">
                          {formatCurrency(rec.price)}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Button
                          size="xs"
                          variant="light"
                          leftSection={<IconPlus size={12} />}
                        >
                          Add
                        </Button>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Tabs.Panel>
          </Tabs>
        )}

        {!viewingService && (
          <>
            <Divider my="md" />
            <Stack gap="xs">
              <Group justify="space-between">
                <Text size="sm">Subtotal</Text>
                <Text size="sm" fw={500}>
                  {formatCurrency(subtotal)}
                </Text>
              </Group>
              <Group justify="space-between">
                <Text size="sm">Tax</Text>
                <Text size="sm" fw={500}>
                  {formatCurrency(tax)}
                </Text>
              </Group>
              <Divider />
              <Group justify="space-between">
                <Text size="md" fw={600}>
                  Total
                </Text>
                <Text size="lg" fw={700} c="cyan">
                  {formatCurrency(total)}
                </Text>
              </Group>
            </Stack>
          </>
        )}
      </Card>
    </Stack>
  );
};

export default Requisitionsummary;
