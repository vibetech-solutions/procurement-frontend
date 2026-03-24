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
import { IconTrash } from "@tabler/icons-react";
import React from "react";

const RecommendedItemsTab = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { recommended_items: merchantsRecommendedItems } = useAppSelector(
    (state) => state.merchants_recommended_items,
  );

  const isMerchant = user?.roles?.[0]?.name === "MERCHANT";

  const getItemType = (item: any) => {
    if (item.category_type === "product_category" || item.product_category) {
      return "Product";
    }
    if (item.category_type === "service_category" || item.service_category) {
      return "Service";
    }
    return "Unknown";
  };

  const getItemTypeColor = (item: any) => {
    const type = getItemType(item);
    return type === "Product" ? "violet" : "cyan";
  };

  return (
    <Tabs.Panel value="recommended" pt="md">
      <Stack gap="md">
        <div>
          <Title order={4} mb="xs">
            {isMerchant
              ? "Items Recommended for Your Company"
              : "Items You Have Recommended"}
          </Title>
          <Text c="dimmed" size="sm" mb="md">
            {isMerchant
              ? "These are items recommended by users in the system for your company to add to the catalog"
              : "These are items you've suggested to be added to the system catalog. The catalog administrators will review them and decide whether to add them."}
          </Text>
        </div>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Type</Table.Th>
                <Table.Th>Category</Table.Th>
                <Table.Th>Est. Price</Table.Th>
                {isMerchant ? (
                  <Table.Th>Suggested By</Table.Th>
                ) : (
                  <Table.Th>Justification</Table.Th>
                )}
                <Table.Th>Status</Table.Th>
                <Table.Th>Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
            {merchantsRecommendedItems.length > 0 ? (
              <Table.Tbody>
                {merchantsRecommendedItems.map((item) => (
                  <Table.Tr key={item.id}>
                    <Table.Td>
                      <Text size="sm" fw={500}>
                        {item.name}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Badge
                        size="sm"
                        variant="filled"
                        color={getItemTypeColor(item)}
                      >
                        {getItemType(item)}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Badge size="sm" variant="light">
                        {item.product_category?.name ||
                          item.service_category?.name ||
                          "Uncategorized"}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm">KES {item.price}</Text>
                    </Table.Td>
                    <Table.Td>
                      {isMerchant ? (
                        <Text size="sm">
                          {item.recommender?.first_name}{" "}
                          {item.recommender?.last_name}
                        </Text>
                      ) : (
                        <Text size="xs">{item.reason}</Text>
                      )}
                    </Table.Td>
                    <Table.Td>
                      <Badge
                        color={item.product || item.service ? "green" : "blue"}
                        size="sm"
                      >
                        {item.product
                          ? "Approved (Product)"
                          : item.service
                            ? "Approved (Service)"
                            : "Pending Review"}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      {isMerchant ? (
                        <Button size="xs" variant="light">
                          Review
                        </Button>
                      ) : (
                        <ActionIcon
                          color="red"
                          variant="subtle"
                          size="sm"
                          disabled={!!(item.product || item.service)}
                        >
                          <IconTrash size={14} />
                        </ActionIcon>
                      )}
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            ) : (
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td colSpan={7} align="center">
                    <Text size="sm" c="dimmed">
                      No recommended items at the moment.
                    </Text>
                  </Table.Td>
                </Table.Tr>
              </Table.Tbody>
            )}
          </Table>
        </Card>
      </Stack>
    </Tabs.Panel>
  );
};

export default RecommendedItemsTab;
