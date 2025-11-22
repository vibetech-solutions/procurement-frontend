"use client";

import type React from "react";

import {
  AppShell,
  Burger,
  Group,
  Text,
  Avatar,
  Menu,
  UnstyledButton,
  rem,
  ScrollArea,

  CheckIcon,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconSettings,
  IconLogout,
  IconUser,
  IconChevronDown,
  IconBell,
  IconHelp,
  IconCheck,
  IconAlertCircle,
  IconInfoCircle,
  IconExclamationMark,
  IconHeart,
} from "@tabler/icons-react";
import { ThemeToggle } from "../theme-toggle";
import { Navigation } from "../navigation";
import { useRouter } from "next/navigation";
import { notifications } from "@/lib/utils/constants";
import { notifications as toast } from "@mantine/notifications";

import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { RootState } from "@/lib/redux/store";
import { useEffect } from "react";
import { fetchUser, logout } from "@/lib/redux/features/auth/authSlice";
import { getInitials } from "@/lib/utils/helpers";

interface AppShellLayoutProps {
  children: React.ReactNode;
}

export function AppShellLayout({ children }: AppShellLayoutProps) {
  const [opened, { toggle }] = useDisclosure();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { user, loading } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!user && !loading) {
      dispatch(fetchUser());
    }
  }, [dispatch, user, loading]);

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      toast.show({
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
      toast.show({
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
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 280,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Text size="xl" fw={700}>
              ProcurementHub
            </Text>
            <Text size="sm" c="dimmed">
              Enterprise
            </Text>
          </Group>

          <Group gap="md">
            <ThemeToggle />

            {user && (
              <>
                <UnstyledButton component={Link} href="/application/help">
                  <IconHelp size={20} stroke={1.5} />
                </UnstyledButton>
                <UnstyledButton component={Link} href="/application/wishlist">
                  <IconHeart size={20} stroke={1.5} />
                </UnstyledButton>

                <Menu shadow="md" width={320}>
                  <Menu.Target>
                    <UnstyledButton style={{ position: "relative" }}>
                      <IconBell size={20} stroke={1.5} />
                      {notifications.some((n) => !n.read) && (
                        <div
                          style={{
                            position: "absolute",
                            top: -2,
                            right: -2,
                            width: 8,
                            height: 8,
                            backgroundColor: "var(--mantine-color-red-6)",
                            borderRadius: "50%",
                          }}
                        />
                      )}
                    </UnstyledButton>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Label>
                      Notifications (
                      {notifications.filter((n) => !n.read).length} unread)
                    </Menu.Label>
                    <Menu.Divider />
                    {notifications.slice(0, 5).map((notification) => {
                      const getIcon = () => {
                        switch (notification.type) {
                          case "success":
                            return (
                              <IconCheck
                                size={16}
                                color="var(--mantine-color-green-6)"
                              />
                            );
                          case "warning":
                            return (
                              <IconExclamationMark
                                size={16}
                                color="var(--mantine-color-yellow-6)"
                              />
                            );
                          case "error":
                            return (
                              <IconAlertCircle
                                size={16}
                                color="var(--mantine-color-red-6)"
                              />
                            );
                          default:
                            return (
                              <IconInfoCircle
                                size={16}
                                color="var(--mantine-color-blue-6)"
                              />
                            );
                        }
                      };
                      return (
                        <Menu.Item
                          key={notification.id}
                          leftSection={getIcon()}
                          style={{
                            opacity: notification.read ? 0.7 : 1,
                            backgroundColor: notification.read
                              ? "transparent"
                              : "var(--mantine-color-blue-0)",
                          }}
                        >
                          <div>
                            <Text size="sm" fw={500} lineClamp={1}>
                              {notification.title}
                            </Text>
                            <Text size="xs" c="dimmed" lineClamp={2}>
                              {notification.message}
                            </Text>
                            <Text size="xs" c="dimmed" mt={2}>
                              {notification.time}
                            </Text>
                          </div>
                        </Menu.Item>
                      );
                    })}
                    <Menu.Divider />
                    <Menu.Item
                      component={Link}
                      href="/application/notifications"
                    >
                      <Text size="sm" ta="center" c="blue">
                        View all notifications
                      </Text>
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>

                <Menu shadow="md" width={260}>
                  <Menu.Target>
                    <UnstyledButton>
                      <Group gap={7}>
                        <Avatar size={32} radius="xl" color="cyan">
                          {user.company_name
                            ? getInitials(user.company_name, true)
                            : getInitials(
                                `${user.first_name || ""} ${
                                  user.last_name || ""
                                }`
                              )}
                        </Avatar>
                        <IconChevronDown size={16} stroke={1.5} />
                      </Group>
                    </UnstyledButton>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Label>
                      {user.company_name ??
                        (user.first_name || "") + (user.last_name || "")}
                      <Text size="xs" c="dimmed" fw={400}>
                        {user.email}
                      </Text>
                      <Text size="xs" c="dimmed" fw={400}>
                        {user.roles?.[0]?.name}
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
                        <IconSettings
                          style={{ width: rem(14), height: rem(14) }}
                        />
                      }
                    >
                      Settings
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item
                      color="red"
                      leftSection={
                        <IconLogout
                          style={{ width: rem(14), height: rem(14) }}
                        />
                      }
                      onClick={handleLogout}
                    >
                      Logout
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </>
            )}
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <ScrollArea h="100%" scrollbarSize={0}>
          <Navigation />
        </ScrollArea>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
