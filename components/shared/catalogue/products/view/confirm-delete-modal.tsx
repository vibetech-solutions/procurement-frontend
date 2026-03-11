import { deleteProduct } from "@/lib/redux/features/products/productsSlice"; // adjust path as needed
import { useAppDispatch } from "@/lib/redux/hooks";
import { Button, Group, Modal, Text } from "@mantine/core";
import { IconAlertTriangle, IconTrash } from "@tabler/icons-react";
import React, { useState } from "react";

interface ConfirmDeleteModalProps {
  opened: boolean;
  onClose: () => void;
  itemId: string | number;
  itemName?: string;
  title?: string;
  description?: string;
}

const ConfirmDeleteModal = ({
  opened,
  onClose,
  itemId,
  itemName,
  title = "Confirm Delete",
  description,
}: ConfirmDeleteModalProps) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const result = await dispatch(deleteProduct(itemId));
      if (deleteProduct.fulfilled.match(result)) {
        onClose();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group gap="xs">
          <IconAlertTriangle size={20} color="var(--mantine-color-red-6)" />
          <Text fw={600} size="md">
            {title}
          </Text>
        </Group>
      }
      centered
      size="sm"
    >
      <Text size="sm" c="dimmed">
        {description ?? (
          <>
            Are you sure you want to delete{" "}
            {itemName ? (
              <Text component="span" fw={600} c="dark">
                {itemName}
              </Text>
            ) : (
              "this item"
            )}
            ? This action <strong>cannot be undone</strong>.
          </>
        )}
      </Text>

      <Group justify="flex-end" mt="lg" gap="sm">
        <Button variant="default" onClick={onClose} disabled={loading}>
          Cancel
        </Button>

        <Button
          color="red"
          leftSection={<IconTrash size={16} />}
          onClick={handleDelete}
          loading={loading}
        >
          Delete
        </Button>
      </Group>
    </Modal>
  );
};

export default ConfirmDeleteModal;
