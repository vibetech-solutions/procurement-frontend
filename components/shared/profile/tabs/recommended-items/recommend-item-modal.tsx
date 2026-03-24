import { fetchCategories } from "@/lib/redux/features/products/categories/categoriesSlice";
import { fetchServiceCategories } from "@/lib/redux/features/services/categories/serviceCategoriesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { Button, Group, Modal, Tabs } from "@mantine/core";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { IconPackage, IconPlane } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import RecommendProductsForm from "./modal/products-form";
import RecommendedServicesForm from "./modal/services-form";

const RecommendItemModal = ({
  modalOpen,
  handleClose,
  itemType,
  setItemType,
}: {
  modalOpen: boolean;
  handleClose: () => void;
  itemType: "goods" | "services";
  setItemType: (type: "goods" | "services") => void;
}) => {
  const [servicesAttachments, setServicesAttachments] = useState<File[]>([]);

  const servicesEditor = useEditor({
    extensions: [StarterKit],
    content: "",
    immediatelyRender: false,
  });

  return (
    <Modal
      opened={modalOpen}
      onClose={handleClose}
      title="Recommend an Item"
      size="xl"
      centered
    >
      <Tabs
        value={itemType}
        onChange={(value) => setItemType(value! as "goods" | "services")}
      >
        <Tabs.List>
          <Tabs.Tab value="goods" leftSection={<IconPackage size={16} />}>
            Goods
          </Tabs.Tab>
          <Tabs.Tab value="services" leftSection={<IconPlane size={16} />}>
            Services
          </Tabs.Tab>
        </Tabs.List>

        <RecommendProductsForm />

        <RecommendedServicesForm />
      </Tabs>

      <Group justify="flex-end" gap="sm" mt="md">
        <Button variant="outline" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            /* TODO: dispatch recommend item action */
          }}
        >
          Submit Recommendation
        </Button>
      </Group>
    </Modal>
  );
};

export default RecommendItemModal;
