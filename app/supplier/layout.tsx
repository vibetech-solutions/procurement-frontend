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
  NavLink,
  CheckIcon,

  Center,
  Loader,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconSettings,
  IconLogout,
  IconUser,
  IconChevronDown,
  IconBell,

} from "@tabler/icons-react";
import { ThemeToggle } from "../../components/theme-toggle";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { RootState } from "@/lib/redux/store";
import { getInitials } from "@/lib/utils/helpers";
import { useEffect, useState } from "react";
import { fetchUser, logout } from "@/lib/redux/features/auth/authSlice";
import { notifications } from "@mantine/notifications";
import { supplierNavItems } from "@/lib/utils/constants";
import DocumentsNotUploaded from "@/components/shared/documents-not-uploaded";

export default function SupplierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, { toggle }] = useDisclosure();
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state: RootState) => state.auth);
  const [loadingTimeout, setLoadingTimeout] = useState(false);

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
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
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

  useEffect(() => {
    dispatch(fetchUser());

    const timeout = setTimeout(() => {
      setLoadingTimeout(true);
    }, 10000);

    return () => clearTimeout(timeout);
  }, [dispatch]);

  const {
    certificate_of_registration,
    bank_letter,
    code_of_conduct,
    vendor_verification_form,
    commercial_assessment_form,
    vat_certificate,
    annual_returns,
    organisation_structure,
  } = user || {};

  if ((loading && !loadingTimeout) || (!user && !loadingTimeout)) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader size="xl" />
      </Center>
    );
  }

  // If loading timed out or user is still null, redirect to login
  if (loadingTimeout && !user) {
    router.push("/auth/login");
    return null;
  }

  if (
    !certificate_of_registration ||
    !bank_letter ||
    !code_of_conduct ||
    !vendor_verification_form ||
    !commercial_assessment_form ||
    !vat_certificate ||
    !annual_returns ||
    !organisation_structure
  ) {
    return (
      <DocumentsNotUploaded
        certificate_of_registration={certificate_of_registration}
        bank_letter={bank_letter}
        code_of_conduct={code_of_conduct}
        vendor_verification_form={vendor_verification_form}
        commercial_assessment_form={commercial_assessment_form}
        vat_certificate={vat_certificate}
        annual_returns={annual_returns}
        organisation_structure={organisation_structure}
      />
    );
  }

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
          </Group>

          <Group gap="md">
            <ThemeToggle />
            <UnstyledButton>
              <IconBell size={20} stroke={1.5} />
            </UnstyledButton>

            <Menu shadow="md" width={260}>
              <Menu.Target>
                <UnstyledButton>
                  <Group gap={7}>
                    <Avatar size={32} radius="xl" color="blue">
                      {getInitials(user?.company_name || "", true)}
                    </Avatar>
                    <IconChevronDown size={16} stroke={1.5} />
                  </Group>
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>
                  {user?.company_name || "N/A"}
                  <Text size="xs" c="dimmed" fw={400}>
                    {user?.email || "N/A"}
                  </Text>
                  <Text size="xs" c="dimmed" fw={400}>
                    {user?.roles?.[0]?.name || "N/A"}
                  </Text>
                </Menu.Label>
                <Menu.Divider />

                <Menu.Label>Account</Menu.Label>
                <Menu.Item
                  leftSection={
                    <IconUser style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  <Link href={"/supplier/profile"}>Profile</Link>
                </Menu.Item>
                <Menu.Item
                  leftSection={
                    <IconSettings style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  <Link href={"/supplier/settings"}>Settings</Link>
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
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <ScrollArea h="100%" scrollbarSize={0}>
          {supplierNavItems.map((item) => (
            <NavLink
              key={item.href}
              component={Link}
              href={item.href}
              label={item.label}
              leftSection={<item.icon size={20} stroke={1.5} />}
              active={pathname === item.href}
              variant="filled"
              mb={4}
            />
          ))}
        </ScrollArea>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
