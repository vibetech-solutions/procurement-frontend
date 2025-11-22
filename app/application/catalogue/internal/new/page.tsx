"use client";

import { ContentContainer } from "@/components/layout/content-container";
import {
  Card,
  Text,
  Group,
  Button,
  Stack,
  Title,
  TextInput,
  Textarea,
  Select,
  NumberInput,
  ActionIcon,
  FileInput,
  Grid,
  MultiSelect,
  Image,
  Tabs,
  Loader,
} from "@mantine/core";
import { RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import {
  IconArrowLeft,
  IconDeviceFloppy,
  IconUpload,
  IconX,
  IconPackage,
  IconPlane,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewInternalCatalogItem() {
  const router = useRouter();
  const [itemType, setItemType] = useState<string | null>('inventory');
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    suppliers: [] as string[],
    price: 0,
    description: "",
    specifications: "",
    serviceTerms: "",
    taxStatus: "taxable",
    taxType: "inclusive",
    taxMethod: "percentage",
    taxValue: 16,
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: formData.specifications || '<p></p>',
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setFormData(prev => ({ ...prev, specifications: editor.getHTML() }));
    },
  });

  const serviceTermsEditor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: formData.serviceTerms || '<p></p>',
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setFormData(prev => ({ ...prev, serviceTerms: editor.getHTML() }));
    },
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [serviceAttachments, setServiceAttachments] = useState<File[]>([]);

  const handleImageUpload = (file: File | null) => {
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const suppliers = [
    "Office Pro Ltd",
    "Tech Solutions Inc",
    "Supplies Direct",
    "Kenya Stationery Ltd",
    "Digital Solutions Kenya",
  ];

  return (
    <ContentContainer>
      <Stack gap="lg">
        <Group justify="space-between">
          <Group>
            <ActionIcon
              variant="subtle"
              size="lg"
              onClick={() => router.back()}
            >
              <IconArrowLeft size={20} />
            </ActionIcon>
            <div>
              <Title order={2}>Add New Internal Catalog Item</Title>
              <Text c="dimmed" size="sm">
                Create a new item in the internal procurement catalog
              </Text>
            </div>
          </Group>
          <Group>
            <Button variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button leftSection={<IconDeviceFloppy size={16} />}>
              Save Item
            </Button>
          </Group>
        </Group>

        <Tabs value={itemType} onChange={setItemType}>
          <Tabs.List>
            <Tabs.Tab value="inventory" leftSection={<IconPackage size={16} />}>
              Product
            </Tabs.Tab>
            <Tabs.Tab value="service" leftSection={<IconPlane size={16} />}>
              Service
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="inventory" pt="md">
            <Grid gutter="lg">
              <Grid.Col span={{ base: 12, md: 8 }}>
                <Stack gap="lg">
                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Title order={4} mb="md">
                      Product Information
                    </Title>
                    <Stack gap="md">
                      <TextInput
                        label="Product Name"
                        placeholder="e.g., Ergonomic Office Chair"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                      <Grid gutter="md">
                        <Grid.Col span={6}>
                          <Select
                            label="Category"
                            placeholder="Select category"
                            data={[
                              "Office Supplies",
                              "IT Equipment",
                              "Furniture",
                              "Marketing Materials",
                              "Safety Equipment",
                            ]}
                            value={formData.category}
                            onChange={(value) =>
                              setFormData({ ...formData, category: value || "" })
                            }
                            required
                          />
                        </Grid.Col>
                        <Grid.Col span={6}>
                          <NumberInput
                            label="Price (KES)"
                            placeholder="0"
                            value={formData.price}
                            onChange={(value) =>
                              setFormData({
                                ...formData,
                                price: typeof value === "number" ? value : 0,
                              })
                            }
                            min={0}
                            prefix="KES "
                            thousandSeparator=","
                            required
                          />
                        </Grid.Col>
                      </Grid>
                      <Textarea
                        label="Description"
                        placeholder="Detailed description of the item..."
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({ ...formData, description: e.target.value })
                        }
                        rows={4}
                        required
                      />
                      <div>
                        <Text size="sm" fw={500} mb="xs">
                          Specifications
                        </Text>
                        {!editor ? (
                          <Group justify="center" p="xl">
                            <Loader size="sm" />
                            <Text size="sm" c="dimmed">Loading editor...</Text>
                          </Group>
                        ) : (
                          <RichTextEditor editor={editor}>
                            <RichTextEditor.Toolbar sticky stickyOffset={60}>
                              <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Bold />
                                <RichTextEditor.Italic />
                                <RichTextEditor.Underline />
                                <RichTextEditor.Strikethrough />
                                <RichTextEditor.ClearFormatting />
                                <RichTextEditor.Highlight />
                                <RichTextEditor.Code />
                              </RichTextEditor.ControlsGroup>

                              <RichTextEditor.ControlsGroup>
                                <RichTextEditor.H1 />
                                <RichTextEditor.H2 />
                                <RichTextEditor.H3 />
                                <RichTextEditor.H4 />
                              </RichTextEditor.ControlsGroup>

                              <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Blockquote />
                                <RichTextEditor.Hr />
                                <RichTextEditor.BulletList />
                                <RichTextEditor.OrderedList />
                                <RichTextEditor.Subscript />
                                <RichTextEditor.Superscript />
                              </RichTextEditor.ControlsGroup>

                              <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Link />
                                <RichTextEditor.Unlink />
                              </RichTextEditor.ControlsGroup>

                              <RichTextEditor.ControlsGroup>
                                <RichTextEditor.AlignLeft />
                                <RichTextEditor.AlignCenter />
                                <RichTextEditor.AlignJustify />
                                <RichTextEditor.AlignRight />
                              </RichTextEditor.ControlsGroup>

                              <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Control
                                  onClick={() => document.getElementById('attachment-input')?.click()}
                                  aria-label="Insert attachment"
                                  title="Insert attachment"
                                >
                                  <IconUpload size={16} />
                                </RichTextEditor.Control>
                              </RichTextEditor.ControlsGroup>
                            </RichTextEditor.Toolbar>

                            <RichTextEditor.Content style={{ minHeight: '200px' }} />
                          </RichTextEditor>
                        )}
                        <FileInput
                          id="attachment-input"
                          style={{ display: 'none' }}
                          multiple
                          onChange={(files) => {
                            if (files) {
                              setAttachments([...attachments, ...files]);
                              files.forEach(file => {
                                const link = `<p><a href="#" data-file="${file.name}">${file.name}</a> (${(file.size / 1024).toFixed(1)} KB)</p>`;
                                editor?.commands.insertContent(link);
                              });
                            }
                          }}
                        />
                        {attachments.length > 0 && (
                          <div style={{ marginTop: '8px' }}>
                            <Text size="xs" c="dimmed">Attachments ({attachments.length}):</Text>
                            {attachments.map((file, index) => (
                              <Group key={index} gap="xs" mt="xs">
                                <Text size="xs">{file.name}</Text>
                                <Text size="xs" c="dimmed">({(file.size / 1024).toFixed(1)} KB)</Text>
                                <ActionIcon
                                  size="xs"
                                  color="red"
                                  variant="subtle"
                                  onClick={() => setAttachments(attachments.filter((_, i) => i !== index))}
                                >
                                  <IconX size={12} />
                                </ActionIcon>
                              </Group>
                            ))}
                          </div>
                        )}
                      </div>
                    </Stack>
                  </Card>

                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Title order={4} mb="md">
                      Supplier
                    </Title>
                    <Stack gap="md">
                      <MultiSelect
                        label="Select Suppliers"
                        placeholder="Choose one or more suppliers"
                        data={suppliers}
                        value={formData.suppliers}
                        onChange={(value) =>
                          setFormData({ ...formData, suppliers: value })
                        }
                        searchable
                        required
                      />
                    </Stack>
                  </Card>
                </Stack>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 4 }}>
                <Stack gap="md">
                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Title order={4} mb="md">
                      Product Image
                    </Title>
                    <Stack gap="md">
                      {imagePreview && (
                        <div style={{ position: "relative" }}>
                          <Image
                            src={imagePreview}
                            alt="Item preview"
                            h={200}
                            w="100%"
                            fit="cover"
                            radius="md"
                          />
                          <ActionIcon
                            size="sm"
                            color="red"
                            variant="filled"
                            style={{
                              position: "absolute",
                              top: 8,
                              right: 8,
                            }}
                            onClick={() => {
                              setImageFile(null);
                              setImagePreview(null);
                            }}
                          >
                            <IconX size={12} />
                          </ActionIcon>
                        </div>
                      )}
                      <FileInput
                        label="Upload Image"
                        placeholder="Select image file"
                        leftSection={<IconUpload size={16} />}
                        accept="image/*"
                        value={imageFile}
                        onChange={handleImageUpload}
                      />
                      <Text size="xs" c="dimmed">
                        Recommended: 400x400px, max 2MB
                      </Text>
                    </Stack>
                  </Card>

                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Title order={4} mb="md">
                      Tax Details
                    </Title>
                    <Stack gap="md">
                      <Select
                        label="Tax Status"
                        value={formData.taxStatus}
                        onChange={(value) =>
                          setFormData({
                            ...formData,
                            taxStatus: value || "taxable",
                          })
                        }
                        data={[
                          { value: "taxable", label: "Taxable" },
                          { value: "exempt", label: "Tax Exempt" },
                        ]}
                      />
                      {formData.taxStatus === "taxable" && (
                        <>
                          <Select
                            label="Tax Type"
                            value={formData.taxType}
                            onChange={(value) =>
                              setFormData({
                                ...formData,
                                taxType: value || "inclusive",
                              })
                            }
                            data={[
                              { value: "inclusive", label: "Inclusive" },
                              { value: "exclusive", label: "Exclusive" },
                            ]}
                          />
                          <NumberInput
                            label="Tax Percentage (%)"
                            value={formData.taxValue}
                            onChange={(value) =>
                              setFormData({
                                ...formData,
                                taxValue: typeof value === "number" ? value : 0,
                              })
                            }
                            min={0}
                            max={100}
                            suffix="%"
                          />
                        </>
                      )}
                      <Text size="xs" c="dimmed">
                        Standard VAT rate in Kenya is 16%
                      </Text>
                    </Stack>
                  </Card>
                </Stack>
              </Grid.Col>
            </Grid>
          </Tabs.Panel>

          <Tabs.Panel value="service" pt="md">
            <Grid gutter="lg">
              <Grid.Col span={{ base: 12, md: 8 }}>
                <Stack gap="lg">
                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Title order={4} mb="md">
                      Service Information
                    </Title>
                    <Stack gap="md">
                      <TextInput
                        label="Service Name"
                        placeholder="e.g., Flight Booking Service"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                      <Grid gutter="md">
                        <Grid.Col span={6}>
                          <Select
                            label="Category"
                            placeholder="Select category"
                            data={[
                              "Travel",
                              "Transport",
                              "Professional Services",
                              "Consulting",
                              "Training",
                              "Marketing",
                            ]}
                            value={formData.category}
                            onChange={(value) =>
                              setFormData({ ...formData, category: value || "" })
                            }
                            required
                          />
                        </Grid.Col>
                        <Grid.Col span={6}>
                          <NumberInput
                            label="Base Price (KES)"
                            placeholder="0"
                            value={formData.price}
                            onChange={(value) =>
                              setFormData({
                                ...formData,
                                price: typeof value === "number" ? value : 0,
                              })
                            }
                            min={0}
                            prefix="From KES "
                            thousandSeparator=","
                            required
                          />
                        </Grid.Col>
                      </Grid>
                      <Textarea
                        label="Service Description"
                        placeholder="Detailed description of the service offered..."
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({ ...formData, description: e.target.value })
                        }
                        rows={4}
                        required
                      />
                      <div>
                        <Text size="sm" fw={500} mb="xs">
                          Service Terms
                        </Text>
                        {!serviceTermsEditor ? (
                          <Group justify="center" p="xl">
                            <Loader size="sm" />
                            <Text size="sm" c="dimmed">Loading editor...</Text>
                          </Group>
                        ) : (
                          <RichTextEditor editor={serviceTermsEditor}>
                            <RichTextEditor.Toolbar sticky stickyOffset={60}>
                              <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Bold />
                                <RichTextEditor.Italic />
                                <RichTextEditor.Underline />
                                <RichTextEditor.Strikethrough />
                                <RichTextEditor.ClearFormatting />
                                <RichTextEditor.Highlight />
                                <RichTextEditor.Code />
                              </RichTextEditor.ControlsGroup>

                              <RichTextEditor.ControlsGroup>
                                <RichTextEditor.H1 />
                                <RichTextEditor.H2 />
                                <RichTextEditor.H3 />
                                <RichTextEditor.H4 />
                              </RichTextEditor.ControlsGroup>

                              <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Blockquote />
                                <RichTextEditor.Hr />
                                <RichTextEditor.BulletList />
                                <RichTextEditor.OrderedList />
                                <RichTextEditor.Subscript />
                                <RichTextEditor.Superscript />
                              </RichTextEditor.ControlsGroup>

                              <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Link />
                                <RichTextEditor.Unlink />
                              </RichTextEditor.ControlsGroup>

                              <RichTextEditor.ControlsGroup>
                                <RichTextEditor.AlignLeft />
                                <RichTextEditor.AlignCenter />
                                <RichTextEditor.AlignJustify />
                                <RichTextEditor.AlignRight />
                              </RichTextEditor.ControlsGroup>

                              <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Control
                                  onClick={() => document.getElementById('service-attachment-input')?.click()}
                                  aria-label="Insert attachment"
                                  title="Insert attachment"
                                >
                                  <IconUpload size={16} />
                                </RichTextEditor.Control>
                              </RichTextEditor.ControlsGroup>
                            </RichTextEditor.Toolbar>

                            <RichTextEditor.Content style={{ minHeight: '150px' }} />
                          </RichTextEditor>
                        )}
                        <FileInput
                          id="service-attachment-input"
                          style={{ display: 'none' }}
                          multiple
                          onChange={(files) => {
                            if (files) {
                              setServiceAttachments([...serviceAttachments, ...files]);
                              files.forEach(file => {
                                const link = `<p><a href="#" data-file="${file.name}">${file.name}</a> (${(file.size / 1024).toFixed(1)} KB)</p>`;
                                serviceTermsEditor?.commands.insertContent(link);
                              });
                            }
                          }}
                        />
                        {serviceAttachments.length > 0 && (
                          <div style={{ marginTop: '8px' }}>
                            <Text size="xs" c="dimmed">Attachments ({serviceAttachments.length}):</Text>
                            {serviceAttachments.map((file, index) => (
                              <Group key={index} gap="xs" mt="xs">
                                <Text size="xs">{file.name}</Text>
                                <Text size="xs" c="dimmed">({(file.size / 1024).toFixed(1)} KB)</Text>
                                <ActionIcon
                                  size="xs"
                                  color="red"
                                  variant="subtle"
                                  onClick={() => setServiceAttachments(serviceAttachments.filter((_, i) => i !== index))}
                                >
                                  <IconX size={12} />
                                </ActionIcon>
                              </Group>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {/* Category-specific fields for services */}
                      {formData.category === 'Travel' && (
                        <Grid gutter="md">
                          <Grid.Col span={12}><Text size="sm" fw={500} c="blue">Travel Details</Text></Grid.Col>
                          <Grid.Col span={6}>
                            <Select label="Travel Type" data={['Domestic', 'International', 'Multi-city']} />
                          </Grid.Col>
                          <Grid.Col span={6}>
                            <TextInput label="Destination" placeholder="City, Country" />
                          </Grid.Col>
                          <Grid.Col span={6}>
                            <TextInput label="Travel Date" type="date" />
                          </Grid.Col>
                          <Grid.Col span={6}>
                            <NumberInput label="Number of Travelers" min={1} max={20} defaultValue={1} />
                          </Grid.Col>
                          <Grid.Col span={12}>
                            <Textarea label="Travel Purpose" placeholder="Business meeting, conference, training, etc." rows={2} />
                          </Grid.Col>
                        </Grid>
                      )}
                    </Stack>
                  </Card>

                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Title order={4} mb="md">
                      Service Provider
                    </Title>
                    <Stack gap="md">
                      <MultiSelect
                        label="Select Service Providers"
                        placeholder="Choose one or more providers"
                        data={[
                          "Kenya Airways",
                          "Serena Hotels",
                          "Avis Kenya",
                          "Corporate Training Ltd",
                          "Business Consulting Kenya",
                        ]}
                        value={formData.suppliers}
                        onChange={(value) =>
                          setFormData({ ...formData, suppliers: value })
                        }
                        searchable
                        required
                      />
                    </Stack>
                  </Card>
                </Stack>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 4 }}>
                <Stack gap="md">
                  <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Title order={4} mb="md">
                      Tax Details
                    </Title>
                    <Stack gap="md">
                      <Select
                        label="Tax Status"
                        value={formData.taxStatus}
                        onChange={(value) =>
                          setFormData({
                            ...formData,
                            taxStatus: value || "exempt",
                          })
                        }
                        data={[
                          { value: "exempt", label: "Tax Exempt" },
                          { value: "taxable", label: "Taxable" },
                        ]}
                      />
                      {formData.taxStatus === "taxable" && (
                        <>
                          <Select
                            label="Tax Type"
                            value={formData.taxType}
                            onChange={(value) =>
                              setFormData({
                                ...formData,
                                taxType: value || "inclusive",
                              })
                            }
                            data={[
                              { value: "inclusive", label: "Inclusive" },
                              { value: "exclusive", label: "Exclusive" },
                            ]}
                          />
                          <NumberInput
                            label="Tax Percentage (%)"
                            value={formData.taxValue}
                            onChange={(value) =>
                              setFormData({
                                ...formData,
                                taxValue: typeof value === "number" ? value : 0,
                              })
                            }
                            min={0}
                            max={100}
                            suffix="%"
                          />
                        </>
                      )}
                      <Text size="xs" c="dimmed">
                        Most services are tax-exempt in Kenya
                      </Text>
                    </Stack>
                  </Card>
                </Stack>
              </Grid.Col>
            </Grid>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </ContentContainer>
  );
}