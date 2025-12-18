"use client";

import {
  masterSettings,
  nonTangibleCategories,
  currencies,
} from "@/lib/utils/constants";
import {
  Card,
  Text,
  Group,
  Button,
  Stack,
  Title,
  TextInput,
  Select,
  NumberInput,
  Tabs,
  Table,
  ActionIcon,
  Badge,
} from "@mantine/core";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import {
  IconSettings,
  IconCurrencyDollar,
  IconCategory,
  IconTrash,
  IconPlus,
  IconEdit,
} from "@tabler/icons-react";
import { useState } from "react";
import { useAppDispatch } from "@/lib/redux/hooks";
import CategoriesTable from "@/components/shared/catalogue/products/categories-table";
import { Category } from "@/types/category";
import AddCategoryModal from "@/components/shared/catalogue/add-category-modal";
import { createCategory } from "@/lib/redux/features/products/categories/categoriesSlice";
import { notifications } from "@mantine/notifications";

export default function MasterSettingsPage() {
  const [activeTab, setActiveTab] = useState<string | null>("general");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryImage, setCategoryImage] = useState<File | null>(null);
  const [categoryImagePreview, setCategoryImagePreview] = useState<
    string | null
  >(null);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const dispatch = useAppDispatch();

  const [categoryType, setCategoryType] = useState<"goods" | "services">(
    "goods"
  );

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: categoryDescription || "<p></p>",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setCategoryDescription(editor.getHTML());
    },
  });

  const handleImageUpload = (file: File | null) => {
    setCategoryImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) =>
        setCategoryImagePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setCategoryImagePreview(null);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      notifications.show({
        title: "Validation Error",
        message: "Category name is required",
        color: "red",
      });
      return;
    }

    setIsCreating(true);
    try {
      await dispatch(
        createCategory({
          name: newCategory,
          description: categoryDescription,
          image: categoryImage,
        })
      ).unwrap();

      notifications.show({
        title: "Success",
        message: "Category created successfully",
        color: "green",
      });

      setNewCategory("");
      setCategoryDescription("");
      setCategoryImage(null);
      setCategoryImagePreview(null);
      setAttachments([]);
      editor?.commands.setContent("<p></p>");
      setCategoryModalOpen(false);
    } catch (error) {
      notifications.show({
        title: "Error",
        message:
          (error as any)?.message ??
          "Failed to create category. Please try again.",
        color: "red",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteCategory = (category: Category) => {
    console.log("Deleting category:", category);
  };

  return (
    <Stack gap="lg">
      <div>
        <Title order={2} mb="xs">
          Master Settings
        </Title>
        <Text c="dimmed" size="sm">
          Configure system-wide settings and manage categories
        </Text>
      </div>

      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="general" leftSection={<IconSettings size={16} />}>
            General Settings
          </Tabs.Tab>
          <Tabs.Tab value="categories" leftSection={<IconCategory size={16} />}>
            Categories
          </Tabs.Tab>
          <Tabs.Tab
            value="approvals"
            leftSection={<IconCurrencyDollar size={16} />}
          >
            Approval Limits
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="general" pt="md">
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={4} mb="md">
              General Configuration
            </Title>
            <Stack gap="md">
              <Group grow>
                <TextInput
                  label="Company Name"
                  defaultValue={masterSettings.companyName}
                />
                <Select
                  label="Default Currency"
                  data={currencies}
                  defaultValue={masterSettings.currency}
                />
              </Group>
              <NumberInput
                label="Tax Rate (%)"
                defaultValue={masterSettings.taxRate}
                min={0}
                max={100}
                decimalScale={2}
              />
              <Group justify="flex-end">
                <Button>Save Changes</Button>
              </Group>
            </Stack>
          </Card>
        </Tabs.Panel>

        <Tabs.Panel value="categories" pt="md">
          <Tabs defaultValue="goods">
            <Tabs.List>
              <Tabs.Tab value="goods">Goods</Tabs.Tab>
              <Tabs.Tab value="services">Services</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="goods" pt="md">
              <CategoriesTable
                setCategoryType={setCategoryType}
                setCategoryModalOpen={setCategoryModalOpen}
                handleDeleteCategory={handleDeleteCategory}
              />
            </Tabs.Panel>

            <Tabs.Panel value="services" pt="md">
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="space-between" mb="md">
                  <Title order={4}>Service Categories</Title>
                  <Button
                    leftSection={<IconPlus size={16} />}
                    size="sm"
                    onClick={() => {
                      setCategoryType("services");
                      setCategoryModalOpen(true);
                    }}
                  >
                    Add Category
                  </Button>
                </Group>
                <Table>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Category Name</Table.Th>
                      <Table.Th>Services Count</Table.Th>
                      <Table.Th>Actions</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {nonTangibleCategories.slice(1).map((category) => (
                      <Table.Tr key={category}>
                        <Table.Td>{category}</Table.Td>
                        <Table.Td>
                          <Badge variant="light" size="sm">
                            8
                          </Badge>
                        </Table.Td>
                        <Table.Td>
                          <Group gap="xs">
                            <ActionIcon variant="subtle" color="blue">
                              <IconEdit size={16} />
                            </ActionIcon>
                            <ActionIcon
                              variant="subtle"
                              color="red"
                              onClick={() => handleDeleteCategory(category)}
                            >
                              <IconTrash size={16} />
                            </ActionIcon>
                          </Group>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </Card>
            </Tabs.Panel>
          </Tabs>
        </Tabs.Panel>

        <Tabs.Panel value="approvals" pt="md">
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={4} mb="md">
              Approval Limits
            </Title>
            <Stack gap="md">
              <NumberInput
                label="Manager Approval Limit (KES)"
                defaultValue={masterSettings.approvalLimits.manager}
                thousandSeparator=","
              />
              <NumberInput
                label="Director Approval Limit (KES)"
                defaultValue={masterSettings.approvalLimits.director}
                thousandSeparator=","
              />
              <NumberInput
                label="CEO Approval Limit (KES)"
                defaultValue={masterSettings.approvalLimits.ceo}
                thousandSeparator=","
              />
              <Group justify="flex-end">
                <Button>Save Changes</Button>
              </Group>
            </Stack>
          </Card>
        </Tabs.Panel>
      </Tabs>

      <AddCategoryModal
        categoryModalOpen={categoryModalOpen}
        setCategoryModalOpen={setCategoryModalOpen}
        categoryType={categoryType}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        categoryImagePreview={categoryImagePreview}
        setCategoryImage={setCategoryImage}
        setCategoryImagePreview={setCategoryImagePreview}
        categoryImage={categoryImage}
        handleImageUpload={handleImageUpload}
        editor={editor}
        setAttachments={setAttachments}
        attachments={attachments}
        handleAddCategory={handleAddCategory}
        isCreating={isCreating}
      />
    </Stack>
  );
}
