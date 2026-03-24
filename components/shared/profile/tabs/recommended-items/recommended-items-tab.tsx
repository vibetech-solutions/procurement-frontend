import { useAppSelector } from "@/lib/redux/hooks";
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Stack,
  Table,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import { IconPackage, IconPlane, IconTrash } from "@tabler/icons-react";
import React from "react";

const RecommendedItemsTab = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <Tabs.Panel value="recommended" pt="md">
      {user?.roles?.[0]?.name === "MERCHANT" ? (
        <Stack gap="md">
          <div>
            <Title order={4} mb="xs">
              Items Recommended for Your Company
            </Title>
            <Text c="dimmed" size="sm" mb="md">
              These are items recommended by users in the system for your
              company to add to the catalog
            </Text>
          </div>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Tabs defaultValue="products">
              <Tabs.List mb="md">
                <Tabs.Tab
                  value="products"
                  leftSection={<IconPackage size={14} />}
                >
                  📦 Products
                </Tabs.Tab>
                <Tabs.Tab
                  value="services"
                  leftSection={<IconPlane size={14} />}
                >
                  ✈️ Services
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="products">
                <Table>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Product Name</Table.Th>
                      <Table.Th>Category</Table.Th>
                      <Table.Th>Est. Price</Table.Th>
                      <Table.Th>Suggested By</Table.Th>
                      <Table.Th>Status</Table.Th>
                      <Table.Th>Action</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    <Table.Tr>
                      <Table.Td>
                        <Text size="sm" fw={500}>
                          Ergonomic Office Chair Pro
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge size="sm" variant="light">
                          Office Furniture
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">KES 8,500</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">John Doe</Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge color="blue" size="sm">
                          Pending
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Button size="xs" variant="light">
                          Review
                        </Button>
                      </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td>
                        <Text size="sm" fw={500}>
                          Wireless Keyboard & Mouse Set
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge size="sm" variant="light">
                          Peripherals
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">KES 3,500</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">Jane Smith</Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge color="green" size="sm">
                          Approved
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Button size="xs" variant="light" disabled>
                          Added
                        </Button>
                      </Table.Td>
                    </Table.Tr>
                  </Table.Tbody>
                </Table>
              </Tabs.Panel>

              <Tabs.Panel value="services">
                <Table>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Service Name</Table.Th>
                      <Table.Th>Category</Table.Th>
                      <Table.Th>Est. Price</Table.Th>
                      <Table.Th>Suggested By</Table.Th>
                      <Table.Th>Status</Table.Th>
                      <Table.Th>Action</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    <Table.Tr>
                      <Table.Td>
                        <Text size="sm" fw={500}>
                          Executive Car Rental (Weekly)
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge size="sm" variant="light">
                          Transport
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">KES 35,000</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">David Wilson</Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge color="blue" size="sm">
                          Pending
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Button size="xs" variant="light">
                          Review
                        </Button>
                      </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td>
                        <Text size="sm" fw={500}>
                          Professional Venue Setup & Catering
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge size="sm" variant="light">
                          Events
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">KES 150,000</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">Sarah Johnson</Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge color="green" size="sm">
                          Approved
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Button size="xs" variant="light" disabled>
                          Added
                        </Button>
                      </Table.Td>
                    </Table.Tr>
                  </Table.Tbody>
                </Table>
              </Tabs.Panel>
            </Tabs>
          </Card>
        </Stack>
      ) : (
        <Stack gap="md">
          <div>
            <Title order={4} mb="xs">
              Items You Have Recommended
            </Title>
            <Text c="dimmed" size="sm" mb="md">
              These are items you've suggested to be added to the system
              catalog. The catalog administrators will review them and decide
              whether to add them.
            </Text>
          </div>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Tabs defaultValue="products">
              <Tabs.List mb="md">
                <Tabs.Tab
                  value="products"
                  leftSection={<IconPackage size={14} />}
                >
                  📦 Products
                </Tabs.Tab>
                <Tabs.Tab
                  value="services"
                  leftSection={<IconPlane size={14} />}
                >
                  ✈️ Services
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="products">
                <Table>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Product Name</Table.Th>
                      <Table.Th>Category</Table.Th>
                      <Table.Th>Est. Price</Table.Th>
                      <Table.Th>Justification</Table.Th>
                      <Table.Th>Status</Table.Th>
                      <Table.Th>Action</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    <Table.Tr>
                      <Table.Td>
                        <Text size="sm" fw={500}>
                          Adjustable Monitor Stand with USB Ports
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge size="sm" variant="light">
                          Office Accessories
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">KES 5,200</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="xs">Needed for workstation setup</Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge color="blue" size="sm">
                          Pending Review
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <ActionIcon color="red" variant="subtle" size="sm">
                          <IconTrash size={14} />
                        </ActionIcon>
                      </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td>
                        <Text size="sm" fw={500}>
                          Portable Document Scanner
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge size="sm" variant="light">
                          IT Equipment
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">KES 12,500</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="xs">For document digitization</Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge color="green" size="sm">
                          Approved
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <ActionIcon
                          color="red"
                          variant="subtle"
                          size="sm"
                          disabled
                        >
                          <IconTrash size={14} />
                        </ActionIcon>
                      </Table.Td>
                    </Table.Tr>
                  </Table.Tbody>
                </Table>
              </Tabs.Panel>

              <Tabs.Panel value="services">
                <Table>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Service Name</Table.Th>
                      <Table.Th>Category</Table.Th>
                      <Table.Th>Est. Price</Table.Th>
                      <Table.Th>Justification</Table.Th>
                      <Table.Th>Status</Table.Th>
                      <Table.Th>Action</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    <Table.Tr>
                      <Table.Td>
                        <Text size="sm" fw={500}>
                          Team Building Event Planning
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge size="sm" variant="light">
                          Events
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">KES 75,000</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="xs">For annual company retreat</Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge color="blue" size="sm">
                          Pending Review
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <ActionIcon color="red" variant="subtle" size="sm">
                          <IconTrash size={14} />
                        </ActionIcon>
                      </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Td>
                        <Text size="sm" fw={500}>
                          IT Infrastructure Audit Service
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge size="sm" variant="light">
                          Professional Services
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">KES 45,000</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="xs">Security compliance check</Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge color="green" size="sm">
                          Approved
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <ActionIcon
                          color="red"
                          variant="subtle"
                          size="sm"
                          disabled
                        >
                          <IconTrash size={14} />
                        </ActionIcon>
                      </Table.Td>
                    </Table.Tr>
                  </Table.Tbody>
                </Table>
              </Tabs.Panel>
            </Tabs>
          </Card>
        </Stack>
      )}
    </Tabs.Panel>
  );
};

export default RecommendedItemsTab;
