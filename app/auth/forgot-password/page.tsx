"use client";

import {
  Container,
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Stack,
  Anchor,
  Center,
  Group,
  Box,
} from "@mantine/core";
import {
  IconMail,
  IconArrowLeft,
  IconBuilding,
  IconCheck,
} from "@tabler/icons-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState } from "react";
import clientaxiosinstance from "@/lib/services/clientaxiosinstance";
import { notifications } from "@mantine/notifications";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    try {
      await clientaxiosinstance.get("/sanctum/csrf-cookie");
      const response = await clientaxiosinstance.post("/forgot-password", {
        email,
      });
      notifications.show({
        title: "Success",
        message: response.data.status,
        color: "green",
        autoClose: 5000,
        withCloseButton: true,
        icon: <IconCheck size={16} />,
        position: "bottom-right",
      });
    } catch (e) {
      notifications.show({
        title: "Error",
        message: e instanceof Error ? e.message : "An error occurred",
        color: "red",
        autoClose: 5000,
        withCloseButton: true,
        icon: <IconBuilding size={16} />,
        position: "bottom-right",
      });
    }
    setLoading(false);
  };
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor:
          "light-dark(var(--mantine-color-white), var(--mantine-color-dark-7))",
      }}
    >
      <Box style={{ position: "absolute", top: 20, right: 20 }}>
        <ThemeToggle />
      </Box>
      <Container size={420} py={80}>
        <Stack gap="lg">
          <div style={{ textAlign: "center" }}>
            <Title order={1} mb="xs">
              Forgot Password?
            </Title>
            <Text c="dimmed" size="sm">
              Enter your email address and we&apos;ll send you a link to reset
              your password
            </Text>
          </div>

          <Paper withBorder shadow="md" p={30} radius="md">
            <form onSubmit={handleSubmit}>
              <Stack gap="md">
                <TextInput
                  label="Email Address"
                  placeholder="your@email.com"
                  leftSection={<IconMail size={16} />}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <Button fullWidth type="submit" disabled={loading}>
                  Send Reset Link
                </Button>
              </Stack>
            </form>

            <Center mt="lg">
              <Anchor component={Link} href="/auth/login" size="sm">
                <Group gap={5}>
                  <IconArrowLeft size={16} />
                  Back to login
                </Group>
              </Anchor>
            </Center>
          </Paper>
        </Stack>
      </Container>
    </div>
  );
}
