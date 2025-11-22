"use client";

import { useState, use } from "react";
import {
  Container,
  Paper,
  Title,
  Text,
  PasswordInput,
  Button,
  Stack,
  Anchor,
  Center,
  Group,
  Box,
  Input,
} from "@mantine/core";
import {
  IconLock,
  IconArrowLeft,
  IconCheck,
  IconAt,
} from "@tabler/icons-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { useSearchParams } from "next/navigation";
import clientaxiosinstance from "@/lib/services/clientaxiosinstance";
import { notifications } from "@mantine/notifications";

interface PageProps {
  params: Promise<{
    token: string;
  }>;
}

export default function ResetPasswordPage({ params }: PageProps) {
  const { token } = use(params);
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      notifications.show({
        title: "Error",
        message: "Passwords do not match",
        color: "red",
      });
      return;
    }

    setLoading(true);
    try {
      await clientaxiosinstance.get("/sanctum/csrf-cookie");
      await clientaxiosinstance.post("/reset-password", {
        token,
        email,
        password,
        password_confirmation: confirmPassword,
      });
      setSuccess(true);
      notifications.show({
        title: "Success",
        message: "Password reset successfully",
        color: "green",
        icon: <IconCheck size={16} />,
      });
    } catch (error) {
      notifications.show({
        title: "Error",
        message:
          error instanceof Error ? error.message : "Failed to reset password",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
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
                Password Reset Successful
              </Title>
              <Text c="dimmed" size="sm">
                Your password has been successfully reset
              </Text>
            </div>

            <Paper withBorder shadow="md" p={30} radius="md">
              <Stack gap="md" align="center">
                <IconCheck size={48} color="var(--mantine-color-green-6)" />
                <Text ta="center">
                  You can now sign in with your new password
                </Text>
                <Button component={Link} href="/auth/login" fullWidth>
                  Go to Login
                </Button>
              </Stack>
            </Paper>
          </Stack>
        </Container>
      </div>
    );
  }

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
              Reset Your Password
            </Title>
            <Text c="dimmed" size="sm">
              Enter your new password below
            </Text>
          </div>

          <Paper withBorder shadow="md" p={30} radius="md">
            <form onSubmit={handleSubmit}>
              <Stack gap="md">
                <Input
                  leftSection={<IconAt size={16} />}
                  readOnly
                  value={email!}
                />

                <PasswordInput
                  label="New Password"
                  placeholder="Enter your new password"
                  leftSection={<IconLock size={16} />}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <PasswordInput
                  label="Confirm New Password"
                  placeholder="Confirm your new password"
                  leftSection={<IconLock size={16} />}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={
                    confirmPassword && password !== confirmPassword
                      ? "Passwords do not match"
                      : null
                  }
                />

                <Button fullWidth type="submit" loading={loading}>
                  Reset Password
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
