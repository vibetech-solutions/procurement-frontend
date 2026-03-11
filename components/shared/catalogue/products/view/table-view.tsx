import { useAppSelector } from "@/lib/redux/hooks";
import { ActionIcon, Badge, Button, Group, Table, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconEdit,
  IconEye,
  IconHeart,
  IconShoppingCart,
  IconTrash,
} from "@tabler/icons-react";
import Link from "next/link";
import React, { useState } from "react";
import ConfirmDeleteModal from "./confirm-delete-modal";

const ProductTableView = ({ activeTab }: { activeTab: string }) => {
  const { products } = useAppSelector((state) => state.products);

  const [opened, { open, close }] = useDisclosure(false);
  const [selectedItem, setSelectedItem] = useState<{
    id: string | number;
    name: string;
  } | null>(null);

  const handleDeleteClick = (id: string | number, name: string) => {
    setSelectedItem({ id, name });
    open();
  };

  return (
    <>
      <ConfirmDeleteModal
        opened={opened}
        onClose={close}
        itemId={selectedItem?.id ?? ""}
        itemName={selectedItem?.name}
        title="Delete Product"
      />

      <Table highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Item</Table.Th>
            <Table.Th>Category</Table.Th>
            <Table.Th>Supplier</Table.Th>
            <Table.Th>Price</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {products.map((item) => (
            <React.Fragment key={item.id}>
              <Table.Tr>
                <Table.Td>
                  <div>
                    <Text fw={500} size="sm">
                      {item.name}
                    </Text>

                    <Text size="xs" c="dimmed">
                      {"product_code" in item ? item.product_code : item.id}
                    </Text>

                    <Text size="xs" c="dimmed" lineClamp={1}>
                      {item.description}
                    </Text>
                  </div>
                </Table.Td>

                <Table.Td>
                  <Badge variant="light" size="sm">
                    {"category" in item && typeof item.category === "object"
                      ? item.category.name
                      : item.category}
                  </Badge>
                </Table.Td>

                <Table.Td>
                  <Text size="sm">
                    {"suppliers" in item && item.suppliers?.length > 0
                      ? item.suppliers
                          .slice(0, 3)
                          .map((s) => s.company_name || s.name)
                          .join(", ")
                      : "No suppliers"}
                  </Text>
                </Table.Td>

                <Table.Td>
                  <Text size="sm" fw={600} c="cyan">
                    KES {item.base_price?.toLocaleString()}
                  </Text>
                </Table.Td>

                <Table.Td>
                  <Group gap="xs">
                    <ActionIcon variant="subtle" color="blue">
                      <Link
                        href={
                          activeTab === "inventory"
                            ? `/application/catalogue/${item.id}`
                            : `/application/cart/non-tangible/${item.id}`
                        }
                      >
                        <IconEye size={16} />
                      </Link>
                    </ActionIcon>

                    <ActionIcon variant="subtle" color="orange">
                      <Link href={`/application/catalogue/${item.id}/edit`}>
                        <IconEdit size={16} />
                      </Link>
                    </ActionIcon>

                    <ActionIcon variant="subtle" color="gray">
                      <IconHeart size={16} />
                    </ActionIcon>

                    <ActionIcon
                      variant="subtle"
                      color="red"
                      onClick={() => handleDeleteClick(item.id, item.name)}
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Group>
                </Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Td colSpan={5}>
                  <Button
                    fullWidth
                    size="xs"
                    leftSection={<IconShoppingCart size={14} />}
                  >
                    Add to Cart
                  </Button>
                </Table.Td>
              </Table.Tr>
            </React.Fragment>
          ))}
        </Table.Tbody>
      </Table>
    </>
  );
};

export default ProductTableView;
