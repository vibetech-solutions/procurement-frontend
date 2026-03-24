import { fetchCategories } from "@/lib/redux/features/products/categories/categoriesSlice";
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
import { StarterKit } from "@tiptap/starter-kit";

const RecommendProductsForm = () => {
  const dispatch = useAppDispatch();
  const {
    categories: productCategories,
    categoriesLoading: productCategoriesLoading,
  } = useAppSelector((state) => state.product_categories);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    immediatelyRender: false,
  });

  const [attachments, setAttachments] = useState<File[]>([]);

  const handleAttachments = (files: File[]) => {
    setAttachments((prev) => [...prev, ...files]);
  };

  useEffect(() => {
    dispatch(fetchCategories(1));
  }, [dispatch]);
  return (
    <Tabs.Panel value="goods" pt="md">
      <Grid gutter="md">
        <Grid.Col span={6}>
          <TextInput label="Item Name" placeholder="Enter item name" required />
        </Grid.Col>
        <Grid.Col span={6}>
          <Select
            label="Category"
            placeholder="Select category"
            data={productCategories.map((c) => ({
              value: String(c.id),
              label: c.name,
            }))}
            disabled={productCategoriesLoading}
            required
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <NumberInput
            label="Estimated Unit Price (KES)"
            placeholder="0"
            min={0}
            thousandSeparator=","
            required
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Textarea
            label="Description"
            placeholder="Brief description of the item"
            rows={2}
          />
        </Grid.Col>
        <EditorSection
          label="Specifications"
          attachmentInputId="recommend-goods-attachment-input"
          editor={editor}
          attachments={attachments}
          setAttachments={setAttachments}
          handleAttachments={handleAttachments}
        />
      </Grid>
    </Tabs.Panel>
  );
};

export default RecommendProductsForm;
