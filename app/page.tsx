"use client";

import {
  Container,
  Title,
  Text,
  Button,
  Stack,
  Group,
  Card,
  SimpleGrid,
  Box,
} from "@mantine/core";
import Link from "next/link";
import { LandingNavbar } from "@/components/landing-navbar";
import { landingPageFeatures } from "@/lib/utils/constants";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { RootState } from "@/lib/redux/store";
import { useEffect } from "react";
import { fetchUser } from "@/lib/redux/features/auth/authSlice";
import { getLandingActionText } from "@/lib/utils/helpers";

export default function LandingPage() {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <Box
      style={{
        minHeight: "100vh",
        backgroundColor:
          "light-dark(var(--mantine-color-white), var(--mantine-color-dark-7))",
      }}
    >
      <LandingNavbar />
      <Container size="lg" py="xl">
        <Stack gap="xl" align="center" ta="center">
          <Stack gap="md" maw={600}>
            <Title order={1} size="3rem" fw={900} c="dimmed">
              Procurement Catalogue System
            </Title>
            <Text size="xl" c="dimmed">
              Streamline your organization&apos;s procurement process with our
              comprehensive catalogue management and requisition platform
            </Text>
          </Stack>

          <Group gap="md">
            {user && (
              <Button
                component={Link}
                href="/application/dashboard"
                size="lg"
                radius="md"
              >
                Go to Dashboard
              </Button>
            )}
            <Button
              component={Link}
              href={getLandingActionText(user?.roles?.[0]?.name || '').action}
              variant="outline"
              size="lg"
              radius="md"
            >
              {getLandingActionText(user?.roles?.[0]?.name || '').text}
            </Button>
          </Group>

          <SimpleGrid
            cols={{ base: 1, sm: 2, lg: 4 }}
            spacing="lg"
            mt="xl"
            w="100%"
          >
            {landingPageFeatures.map((feature) => (
              <Card
                key={feature.title}
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                h="100%"
              >
                <Stack align="center" ta="center" gap="md">
                  <feature.icon
                    size={48}
                    stroke={1.5}
                    color="var(--mantine-color-cyan-6)"
                  />
                  <Title order={3} size="h4">
                    {feature.title}
                  </Title>
                  <Text size="sm" c="dimmed">
                    {feature.description}
                  </Text>
                </Stack>
              </Card>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}
