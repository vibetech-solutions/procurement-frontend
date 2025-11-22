"use client";

import {
  Group,
  Text,
  UnstyledButton,
  Avatar,
  Menu,
  rem,
  Button,
  CheckIcon,
} from "@mantine/core";
import {
  IconUser,
  IconSettings,
  IconLogout,
  IconChevronDown,
  IconHelp,
  IconBell,
} from "@tabler/icons-react";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { RootState } from "@/lib/redux/store";
import { useEffect } from "react";
import { fetchUser, logout } from "@/lib/redux/features/auth/authSlice";
import { getInitials } from "@/lib/utils/helpers";
import { User } from "@/types/user";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

export function LandingNavbar() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { user, loading } = useAppSelector(
    (state: RootState) => state.auth
  ) as { user: User | null; loading: boolean };

  useEffect(() => {
    if (!user && !loading) {
      dispatch(fetchUser());
    }
  }, [dispatch, user, loading]);

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      notifications.show({
        title: "Success",
        message: "Logged out Successfully",
        color: "green",
        autoClose: 5000,
        withCloseButton: true,
        icon: <CheckIcon size={16} />,
        position: "bottom-right",
      });
      router.push("/auth/login");
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong";
      notifications.show({
        title: "Error",
        message: errorMessage,
        color: "red",
        autoClose: 5000,
        withCloseButton: true,
        icon: <CheckIcon size={16} />,
        position: "bottom-right",
      });
    }
  };

  return (
    <Group
      h={60}
      px="md"
      justify="space-between"
      style={{ borderBottom: "1px solid var(--mantine-color-gray-3)" }}
    >
      <Group></Group>

      <Group gap="md">
        <ThemeToggle />

        {user ? (
          <>
            <UnstyledButton>
              <IconHelp size={20} stroke={1.5} />
            </UnstyledButton>
            <UnstyledButton>
              <IconBell size={20} stroke={1.5} />
            </UnstyledButton>

            <Menu shadow="md" width={260}>
              <Menu.Target>
                <UnstyledButton>
                  <Group gap={7}>
                    <Avatar size={32} radius="xl" color="cyan">
                      {getInitials(
                        user.company_name ??
                          (user.first_name || "") + (user.last_name || "")
                      )}
                    </Avatar>
                    <IconChevronDown size={16} stroke={1.5} />
                  </Group>
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>
                  <Text size="xs" c="dimmed" fw={400}>
                    {user.email}
                  </Text>
                </Menu.Label>
                <Menu.Divider />

                <Menu.Label>Account</Menu.Label>
                <Menu.Item
                  component={Link}
                  href="/application/profile"
                  leftSection={
                    <IconUser style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Profile
                </Menu.Item>
                <Menu.Item
                  component={Link}
                  href="/application/master-settings"
                  leftSection={
                    <IconSettings style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Settings
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  color="red"
                  leftSection={
                    <IconLogout style={{ width: rem(14), height: rem(14) }} />
                  }
                  onClick={handleLogout}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </>
        ) : (
          <Group gap="sm">
            <Button component={Link} href="/auth/login" variant="subtle">
              Login
            </Button>
            <Button component={Link} href="/auth/register">
              Sign Up
            </Button>
          </Group>
        )}
      </Group>
    </Group>
  );
}
