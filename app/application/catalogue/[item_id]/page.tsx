"use client";

import { ContentContainer } from "@/components/layout/content-container";
import { getProduct } from "@/lib/redux/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  Card,
  Text,
  Group,
  Button,
  Stack,
  Title,
  Badge,
  Grid,
  ActionIcon,
  Image,
  NumberInput,
  Divider,
  Skeleton,
  Tooltip,
  ThemeIcon,
  Box,
  Paper,
  Transition,
  Alert,
  Avatar,
  ScrollArea,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconShoppingCart,
  IconHeart,
  IconShare,
  IconEdit,
  IconStar,
  IconTruck,
  IconMapPin,
  IconPhone,
  IconMail,
  IconBuilding,
  IconPackage,
  IconChevronRight,
  IconAlertCircle,
  IconUsers,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

import "@mantine/tiptap/styles.css";
import { User } from "@/types/user";

// ── Helpers ───────────────────────────────────────────────────────────────────

function resolveImageUrl(path: string | null | undefined): string {
  if (!path) return "/placeholder.svg";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const base =
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ??
    "http://localhost:8000";
  return `${base}/storage/${path.replace(/^storage\//, "")}`;
}

interface CatalogueItemProps {
  params: Promise<{ item_id: string }>;
}

function ProductSkeleton() {
  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Group>
          <Skeleton height={36} width={36} radius="md" />
          <Stack gap={6}>
            <Skeleton height={28} width={220} radius="sm" />
            <Skeleton height={14} width={80} radius="sm" />
          </Stack>
        </Group>
        <Skeleton height={36} width={110} radius="md" />
      </Group>

      <Grid gutter="lg">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Stack gap="md">
            <Skeleton height={420} radius="lg" />
            <Card shadow="sm" padding="lg" radius="lg" withBorder>
              <Skeleton height={18} width={160} radius="sm" mb="md" />
              <Stack gap="sm">
                {[...Array(3)].map((_, i) => (
                  <Group key={i} justify="space-between">
                    <Skeleton height={14} width={80} radius="sm" />
                    <Skeleton height={14} width={120} radius="sm" />
                  </Group>
                ))}
              </Stack>
            </Card>
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Stack gap="md">
            <Card shadow="sm" padding="lg" radius="lg" withBorder>
              <Group justify="space-between" mb="md">
                <Skeleton height={26} width={90} radius="xl" />
                <Group gap="xs">
                  <Skeleton height={30} width={30} radius="md" />
                  <Skeleton height={30} width={30} radius="md" />
                </Group>
              </Group>
              <Skeleton height={40} width={140} radius="sm" mb="md" />
              <Skeleton height={14} width="100%" radius="sm" mb={6} />
              <Skeleton height={14} width="90%" radius="sm" mb={6} />
              <Skeleton height={14} width="75%" radius="sm" mb="md" />
              <Divider my="md" />
              <Group gap="md">
                <Skeleton height={36} width={100} radius="md" />
                <Skeleton height={42} radius="md" style={{ flex: 1 }} />
              </Group>
            </Card>
            <Card shadow="sm" padding="lg" radius="lg" withBorder>
              <Skeleton height={18} width={120} radius="sm" mb="md" />
              <Stack gap="sm">
                {[...Array(4)].map((_, i) => (
                  <Skeleton
                    key={i}
                    height={14}
                    width={`${85 - i * 8}%`}
                    radius="sm"
                  />
                ))}
              </Stack>
            </Card>
          </Stack>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}

// ── Supplier Card ─────────────────────────────────────────────────────────────

function SupplierRow({ supplier }: { supplier: User }) {
  const rows = [
    {
      icon: <IconPhone size={13} />,
      label: "Contact",
      value: supplier.phone,
    },
    { icon: <IconMail size={13} />, label: "Email", value: supplier.email },
    {
      icon: <IconMapPin size={13} />,
      label: "Location",
      value: supplier.address,
    },
  ].filter((r) => r.value);

  return (
    <Box>
      <Group gap="xs" mb="xs">
        <Avatar size="sm" radius="xl" color="cyan" variant="light">
          {supplier.company_name?.charAt(0).toUpperCase()}
        </Avatar>
        <Text size="sm" fw={600}>
          {supplier.company_name}
        </Text>
      </Group>

      <Stack gap={0} pl={4}>
        {rows.map(({ icon, label, value }, i) => (
          <Box key={label}>
            <Group justify="space-between" py={6}>
              <Group gap={5}>
                <Text
                  c="dimmed"
                  size="xs"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  {icon}
                </Text>
                <Text size="xs" c="dimmed">
                  {label}
                </Text>
              </Group>
              <Text size="xs" fw={500}>
                {value}
              </Text>
            </Group>
            {i < rows.length - 1 && <Divider />}
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CatalogueItem({ params }: CatalogueItemProps) {
  const router = useRouter();
  const { item_id } = use(params);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dispatch = useAppDispatch();

  const { product, productLoading, productError } = useAppSelector(
    (state) => state.products,
  );

  useEffect(() => {
    dispatch(getProduct(parseInt(item_id)));
  }, [dispatch, item_id]);

  useEffect(() => {
    if (!productLoading && product?.id) {
      const t = setTimeout(() => setMounted(true), 50);
      return () => clearTimeout(t);
    }
  }, [productLoading, product]);

  if (productLoading || !product?.id) {
    return (
      <ContentContainer>
        <ProductSkeleton />
      </ContentContainer>
    );
  }

  if (productError) {
    return (
      <ContentContainer>
        <Stack gap="md">
          <ActionIcon
            variant="light"
            size="lg"
            radius="md"
            onClick={() => router.back()}
          >
            <IconArrowLeft size={18} />
          </ActionIcon>
          <Alert
            icon={<IconAlertCircle size={18} />}
            title="Failed to load product"
            color="red"
            radius="md"
            variant="light"
          >
            {productError}
          </Alert>
        </Stack>
      </ContentContainer>
    );
  }

  const suppliers: User[] = Array.isArray(product.suppliers)
    ? product.suppliers
    : [];
  const categoryName: string =
    typeof product.category === "object" && product.category !== null
      ? (product.category as { name: string }).name
      : String(product.category ?? "");
  const imageUrl = resolveImageUrl(product.image);
  const price = product.base_price ?? product.base_price;

  return (
    <ContentContainer>
      <Transition
        mounted={mounted}
        transition="fade-up"
        duration={400}
        timingFunction="ease"
      >
        {(styles) => (
          <Stack gap="lg" style={styles}>
            {/* Header */}
            <Group justify="space-between" align="center">
              <Group gap="sm">
                <Tooltip label="Go back" position="bottom" withArrow>
                  <ActionIcon
                    variant="light"
                    size="lg"
                    radius="md"
                    onClick={() => router.back()}
                    aria-label="Go back"
                  >
                    <IconArrowLeft size={18} />
                  </ActionIcon>
                </Tooltip>
                <Box>
                  <Title order={2} lh={1.2}>
                    {product.name}
                  </Title>
                  <Text c="dimmed" size="xs" mt={2}>
                    Item {product.product_code}
                  </Text>
                </Box>
              </Group>
              <Button
                leftSection={<IconEdit size={15} />}
                variant="light"
                radius="md"
                onClick={() =>
                  router.push(`/application/catalogue/${item_id}/edit`)
                }
              >
                Edit Item
              </Button>
            </Group>

            <Grid gutter="lg">
              {/* Left column */}
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack gap="md">
                  {/* Image */}
                  <Card
                    shadow="sm"
                    padding={0}
                    radius="lg"
                    withBorder
                    style={{ overflow: "hidden" }}
                  >
                    <img
                      src={imageUrl}
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: 400,
                        objectFit: "cover",
                        display: "block",
                      }}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "/placeholder.svg";
                      }}
                    />
                  </Card>

                  {/* Suppliers */}
                  {suppliers.length > 0 && (
                    <Card shadow="sm" padding="lg" radius="lg" withBorder>
                      <Group gap="xs" mb="md">
                        <ThemeIcon
                          size="sm"
                          variant="light"
                          radius="sm"
                          color="cyan"
                        >
                          <IconUsers size={12} />
                        </ThemeIcon>
                        <Text fw={600} size="sm">
                          {suppliers.length === 1
                            ? "Supplier"
                            : `Suppliers (${suppliers.length})`}
                        </Text>
                      </Group>

                      <Stack gap="md">
                        {suppliers.map((supplier, i) => (
                          <Box key={supplier.id ?? i}>
                            <SupplierRow supplier={supplier} />
                            {i < suppliers.length - 1 && <Divider mt="md" />}
                          </Box>
                        ))}
                      </Stack>
                    </Card>
                  )}
                </Stack>
              </Grid.Col>

              {/* Right column */}
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack gap="md">
                  {/* Purchase card */}
                  <Card shadow="sm" padding="lg" radius="lg" withBorder>
                    <Group justify="space-between" mb="sm">
                      <Group gap={4}>
                        <Tooltip
                          label={
                            wishlisted
                              ? "Remove from wishlist"
                              : "Add to wishlist"
                          }
                          withArrow
                        >
                          <ActionIcon
                            variant={wishlisted ? "filled" : "subtle"}
                            color={wishlisted ? "red" : "gray"}
                            radius="md"
                            onClick={() => setWishlisted((w) => !w)}
                          >
                            <IconHeart size={16} />
                          </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Share" withArrow>
                          <ActionIcon variant="subtle" color="gray" radius="md">
                            <IconShare size={16} />
                          </ActionIcon>
                        </Tooltip>
                      </Group>
                    </Group>

                    <Text
                      size="2rem"
                      fw={800}
                      lh={1}
                      mb="sm"
                      variant="gradient"
                      gradient={{ from: "cyan", to: "blue", deg: 135 }}
                    >
                      KES {price}
                    </Text>

                    <Text size="sm" c="dimmed" lh={1.6} mb="md">
                      {product.description}
                    </Text>

                    {categoryName && (
                      <Group gap="xs" mb="sm">
                        <Text
                          size="xs"
                          c="dimmed"
                          tt="uppercase"
                          fw={600}
                          style={{ letterSpacing: "0.5px" }}
                        >
                          Category
                        </Text>
                        <Badge variant="dot" size="sm" color="cyan">
                          {categoryName}
                        </Badge>
                      </Group>
                    )}

                    {suppliers.length > 0 && (
                      <Group gap="xs" mb="lg" wrap="wrap">
                        <Text
                          size="xs"
                          c="dimmed"
                          tt="uppercase"
                          fw={600}
                          style={{ letterSpacing: "0.5px" }}
                        >
                          {suppliers.length === 1 ? "Supplier" : "Suppliers"}
                        </Text>
                        {suppliers.map((s, i) => (
                          <Badge
                            key={s.id ?? i}
                            variant="light"
                            size="sm"
                            color="gray"
                          >
                            {s.company_name}
                          </Badge>
                        ))}
                      </Group>
                    )}

                    <Divider mb="md" />

                    <Group justify="space-between" align="flex-end">
                      <Stack gap={4}>
                        <Text
                          size="xs"
                          c="dimmed"
                          fw={600}
                          tt="uppercase"
                          style={{ letterSpacing: "0.5px" }}
                        >
                          Quantity
                        </Text>
                        <NumberInput
                          value={quantity}
                          onChange={(value) =>
                            setQuantity(typeof value === "number" ? value : 1)
                          }
                          min={1}
                          max={99}
                          w={100}
                          radius="md"
                          size="sm"
                          styles={{
                            input: { fontWeight: 600, textAlign: "center" },
                          }}
                        />
                      </Stack>

                      <Button
                        leftSection={<IconShoppingCart size={16} />}
                        rightSection={<IconChevronRight size={14} />}
                        size="md"
                        radius="md"
                        flex={1}
                        ml="md"
                        variant="gradient"
                        gradient={{ from: "cyan", to: "blue", deg: 135 }}
                      >
                        Add to Cart
                      </Button>
                    </Group>
                  </Card>

                  {product.specifications && (
                    <Card shadow="sm" padding="lg" radius="lg" withBorder>
                      <Group gap="xs" mb="md">
                        <ThemeIcon
                          size="sm"
                          variant="light"
                          radius="sm"
                          color="cyan"
                        >
                          <IconPackage size={12} />
                        </ThemeIcon>
                        <Text fw={600} size="sm">
                          Specifications
                        </Text>
                      </Group>
                      <Paper
                        radius="md"
                        p="sm"
                        style={{
                          background: "var(--mantine-color-default-hover)",
                        }}
                      >
                        <div
                          className="ProseMirror"
                          style={{ fontSize: "var(--mantine-font-size-sm)" }}
                          dangerouslySetInnerHTML={{
                            __html: product.specifications,
                          }}
                        />
                      </Paper>
                    </Card>
                  )}
                </Stack>
              </Grid.Col>
            </Grid>
          </Stack>
        )}
      </Transition>
    </ContentContainer>
  );
}
