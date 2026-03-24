import { fetchServiceCategories } from "@/lib/redux/features/services/categories/serviceCategoriesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  Grid,
  NumberInput,
  Select,
  Tabs,
  Textarea,
  TextInput,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import EditorSection from "../editor-section";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const RecommendedServicesForm = () => {
  const {
    categories: serviceCategories,
    categoriesLoading: serviceCategoriesLoading,
  } = useAppSelector((state) => state.service_categories);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchServiceCategories(1));
  }, [dispatch]);
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    immediatelyRender: false,
  });

  const [attachments, setAttachments] = useState<File[]>([]);

  const handleAttachments = (files: File[]) => {
    setAttachments((prev) => [...prev, ...files]);
  };
  return (
    <Tabs.Panel value="services" pt="md">
      <Grid gutter="md">
        <Grid.Col span={6}>
          <TextInput
            label="Service Name"
            placeholder="Enter service name"
            required
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Select
            label="Service Category"
            placeholder="Select category"
            data={serviceCategories.map((c) => ({
              value: String(c.id),
              label: c.name,
            }))}
            disabled={serviceCategoriesLoading}
            required
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <NumberInput
            label="Estimated Base Price (KES)"
            placeholder="0"
            min={0}
            thousandSeparator=","
            required
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Textarea
            label="Service Description"
            placeholder="Brief description of the service"
            rows={2}
          />
        </Grid.Col>
        <EditorSection
          label="Service Requirements"
          attachmentInputId="recommend-services-attachment-input"
          editor={editor}
          attachments={attachments}
          setAttachments={setAttachments}
          handleAttachments={handleAttachments}
        />
      </Grid>
    </Tabs.Panel>
  );
};

export default RecommendedServicesForm;
