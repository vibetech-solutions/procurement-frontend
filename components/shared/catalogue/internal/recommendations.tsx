import {
  recommendedProducts,
  recommendedServices,
} from "@/lib/utils/constants";
import {
  ActionIcon,
  Badge,
  Group,
  Paper,
  Table,
  Tabs,
  Text,
} from "@mantine/core";
import {
  IconCheck,
  IconEye,
  IconPackage,
  IconPlane,
  IconX,
} from "@tabler/icons-react";
import React, { Dispatch, SetStateAction } from "react";

const RecommendationsTab = ({
  recommendationTab,
  setRecommendationTab,
  handleViewRecommendation,
  handleApproveRecommendation,
  handleRejectRecommendation,
}: {
  recommendationTab: string | null;
  setRecommendationTab: Dispatch<SetStateAction<string | null>>;
  handleViewRecommendation: (id: string) => void;
  handleApproveRecommendation: (id: string) => void;
  handleRejectRecommendation: (id: string) => void;
}) => {
  return (
    <Tabs.Panel value="recommendations" pt="md">
      <Tabs value={recommendationTab} onChange={setRecommendationTab}>
        <Tabs.List>
          <Tabs.Tab value="products" leftSection={<IconPackage size={16} />}>
            Products ({recommendedProducts.length})
          </Tabs.Tab>
          <Tabs.Tab value="services" leftSection={<IconPlane size={16} />}>
            Services ({recommendedServices.length})
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="products" pt="md">
          <Paper p="md" withBorder>
            <Text size="sm" c="dimmed" mb="md">
              Review product recommendations from users. Approve to add to
              catalog or reject with feedback.
            </Text>
            <Table highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Item Details</Table.Th>
                  <Table.Th>Requested By</Table.Th>
                  <Table.Th>Reason</Table.Th>
                  <Table.Th>Est. Price</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {recommendedProducts.map((item) => (
                  <Table.Tr key={item.id}>
                    <Table.Td>
                      <div>
                        <Text fw={500} size="sm">
                          {item.name}
                        </Text>
                        <Text size="xs" c="dimmed">
                          {item.id}
                        </Text>
                        <Text size="xs" c="dimmed" lineClamp={2}>
                          {item.description}
                        </Text>
                        <Badge variant="light" size="xs" mt={4}>
                          {item.category}
                        </Badge>
                      </div>
                    </Table.Td>
                    <Table.Td>
                      <div>
                        <Text size="sm">{item.requestedBy}</Text>
                        <Text size="xs" c="dimmed">
                          {item.requestDate}
                        </Text>
                      </div>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm" lineClamp={3}>
                        {item.reason}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm" fw={600} c="cyan">
                        {item.estimatedPrice}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Group gap="xs">
                        <ActionIcon
                          variant="subtle"
                          color="blue"
                          size="sm"
                          onClick={() => handleViewRecommendation(item.id)}
                        >
                          <IconEye size={14} />
                        </ActionIcon>
                        <ActionIcon
                          variant="filled"
                          color="green"
                          size="sm"
                          onClick={() => handleApproveRecommendation(item.id)}
                        >
                          <IconCheck size={14} />
                        </ActionIcon>
                        <ActionIcon
                          variant="filled"
                          color="red"
                          size="sm"
                          onClick={() => handleRejectRecommendation(item.id)}
                        >
                          <IconX size={14} />
                        </ActionIcon>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Paper>
        </Tabs.Panel>

        <Tabs.Panel value="services" pt="md">
          <Paper p="md" withBorder>
            <Text size="sm" c="dimmed" mb="md">
              Review service recommendations from users. Approve to add to
              catalog or reject with feedback.
            </Text>
            <Table highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Service Details</Table.Th>
                  <Table.Th>Requested By</Table.Th>
                  <Table.Th>Reason</Table.Th>
                  <Table.Th>Est. Price</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {recommendedServices.map((item) => (
                  <Table.Tr key={item.id}>
                    <Table.Td>
                      <div>
                        <Text fw={500} size="sm">
                          {item.name}
                        </Text>
                        <Text size="xs" c="dimmed">
                          {item.id}
                        </Text>
                        <Text size="xs" c="dimmed" lineClamp={2}>
                          {item.description}
                        </Text>
                        <Badge variant="light" size="xs" mt={4}>
                          {item.category}
                        </Badge>
                      </div>
                    </Table.Td>
                    <Table.Td>
                      <div>
                        <Text size="sm">{item.requestedBy}</Text>
                        <Text size="xs" c="dimmed">
                          {item.requestDate}
                        </Text>
                      </div>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm" lineClamp={3}>
                        {item.reason}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm" fw={600} c="cyan">
                        {item.estimatedPrice}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Group gap="xs">
                        <ActionIcon
                          variant="subtle"
                          color="blue"
                          size="sm"
                          onClick={() => handleViewRecommendation(item.id)}
                        >
                          <IconEye size={14} />
                        </ActionIcon>
                        <ActionIcon
                          variant="filled"
                          color="green"
                          size="sm"
                          onClick={() => handleApproveRecommendation(item.id)}
                        >
                          <IconCheck size={14} />
                        </ActionIcon>
                        <ActionIcon
                          variant="filled"
                          color="red"
                          size="sm"
                          onClick={() => handleRejectRecommendation(item.id)}
                        >
                          <IconX size={14} />
                        </ActionIcon>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Paper>
        </Tabs.Panel>
      </Tabs>
    </Tabs.Panel>
  );
};

export default RecommendationsTab;
