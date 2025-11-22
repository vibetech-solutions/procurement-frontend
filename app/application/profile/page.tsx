"use client";

import { ContentContainer } from "@/components/layout/content-container";
import { ProfileSkeleton } from "@/components/skeletons/profile-skeleton";
import {
  editUserReq,
  fetchUser,
  logoutAll,
  uploadProfilePic,
} from "@/lib/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { RootState } from "@/lib/redux/store";
import clientaxiosinstance from "@/lib/services/clientaxiosinstance";
import { AppSettings } from "@/types/app-settings";

import {
  Card,
  Text,
  Group,
  Button,
  Stack,
  Title,
  TextInput,
  Select,
  Grid,
  Avatar,
  Badge,
  Divider,
  Switch,
  ActionIcon,
  FileInput,
  Tabs,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  IconUser,
  IconSettings,
  IconBell,
  IconShield,
  IconEdit,
  IconUpload,
  IconPhone,
  IconMail,
  IconBuilding,
  IconCalendar,
} from "@tabler/icons-react";
import { FormEvent, useEffect, useState } from "react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<string | null>("profile");
  const [editMode, setEditMode] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [settings, setSettings] = useState<AppSettings>({});

  const { user, loading } = useAppSelector((state: RootState) => state.auth);

  const [userSettings, setUserSettings] = useState({
    language: "",
    timezone: "",
    currency: "",
    date_format: "",
    show_dashboard_statistics: false,
    show_recent_activity: false,
    show_pending_approvals: false,
    auto_refresh_data: false,
    items_per_page: "10",
    email_notifications: true,
    sms_notifications: false,
    requisition_status_updates: true,
    approval_reminders: true,
    system_alerts: false,
    two_factor_auth: false,
    login_notifications: false,
  });

  const [userPassword, setUserPassword] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  const [isClient, setIsClient] = useState(false);

  const [settingsLoading, setSettingsLoading] = useState(false);

  const [editUser, setEditUser] = useState(() => {
    try {
      return user ? { ...user } : null;
    } catch (error) {
      console.error("Failed to initialize editUser:", error);
      return null;
    }
  });

  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [logoutAllLoading, setLogoutAllLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    setIsClient(true);
    dispatch(fetchUser()).catch(() => {
      notifications.show({
        title: "Error",
        message: "Failed to load user data",
        color: "red",
      });
    });
    const fetchSettings = async () => {
      await clientaxiosinstance.get("/sanctum/csrf-cookie");
      const response = await clientaxiosinstance.get("/api/settings");
      const settings = response.data;
      setSettings(settings);
    };
    fetchSettings().catch(() => {
      notifications.show({
        title: "Error",
        message: "Failed to load settings",
        color: "red",
      });
    });
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      try {
        setEditUser({ ...user });
        setUserSettings({
          language: user.settings?.language || "",
          timezone: user.settings?.timezone || "",
          currency: user.settings?.currency || "",
          date_format: user.settings?.date_format || "",
          show_dashboard_statistics:
            user.settings?.show_dashboard_statistics || false,
          show_recent_activity: user.settings?.show_recent_activity || false,
          show_pending_approvals:
            user.settings?.show_pending_approvals || false,
          auto_refresh_data: user.settings?.auto_refresh_data || false,
          items_per_page: user.settings?.items_per_page?.toString() || "10",
          email_notifications: user.settings?.email_notifications || true,
          sms_notifications: user.settings?.sms_notifications || false,
          requisition_status_updates:
            user.settings?.requisition_status_updates || true,
          approval_reminders: user.settings?.approval_reminders || true,
          system_alerts: user.settings?.system_alerts || false,
          two_factor_auth: user.settings?.two_factor_auth || false,
          login_notifications: user.settings?.login_notifications || false,
        });
      } catch (error) {
        console.error("Failed to update editUser:", error);
      }
    }
  }, [user]);

  const handleEdit = async (e: FormEvent) => {
    e.preventDefault();
    if (!editUser) return;

    setEditLoading(true);
    try {
      try {
        await clientaxiosinstance.get("/sanctum/csrf-cookie");
      } catch (csrfError) {
        console.warn("CSRF cookie fetch failed:", csrfError);
      }

      await dispatch(editUserReq(editUser)).unwrap();

      notifications.show({
        title: "Success",
        message: "Profile updated successfully",
        color: "green",
      });

      setEditMode(false);
    } catch (error: unknown) {
      let errorMessage = "Failed to update profile";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      } else if (error && typeof error === "object" && "message" in error) {
        errorMessage = String((error as { message: string }).message);
      }

      notifications.show({
        title: "Error",
        message: errorMessage,
        color: "red",
        autoClose: 5000,
        withCloseButton: true,
        position: "bottom-right",
      });
    } finally {
      setEditLoading(false);
    }
  };

  const handleSettingsUpdate = async () => {
    setSettingsLoading(true);
    try {
      await clientaxiosinstance.get("/sanctum/csrf-cookie");
      await clientaxiosinstance.post("/api/user/edit", {
        settings: {
          ...userSettings,
          items_per_page: parseInt(userSettings.items_per_page),
        },
      });

      notifications.show({
        title: "Success",
        message: "Settings updated successfully",
        color: "green",
      });

      dispatch(fetchUser());
    } catch {
      notifications.show({
        title: "Error",
        message: "Failed to update settings",
        color: "red",
      });
    } finally {
      setSettingsLoading(false);
    }
  };

  const handleProfilePicUpload = async () => {
    if (!profilePic) return;
    setUploadLoading(true);

    try {
      try {
        await clientaxiosinstance.get("/sanctum/csrf-cookie");
      } catch (csrfError) {
        console.warn("CSRF cookie fetch failed:", csrfError);
      }

      await dispatch(uploadProfilePic({ avatar: profilePic })).unwrap();

      notifications.show({
        title: "Success",
        message: "Profile picture updated successfully",
        color: "green",
      });

      dispatch(fetchUser());
      setProfilePic(null);
    } catch (error: unknown) {
      let errorMessage = "Failed to update profile";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      } else if (error && typeof error === "object" && "message" in error) {
        errorMessage = String((error as { message: string }).message);
      }

      notifications.show({
        title: "Error",
        message: errorMessage,
        color: "red",
        autoClose: 5000,
        withCloseButton: true,
        position: "bottom-right",
      });
    } finally {
      setUploadLoading(false);
    }
  };

  if (loading || !user || !editUser || !isClient) {
    return <ProfileSkeleton />;
  }

  const handleLogoutAll = async () => {
    setLogoutAllLoading(true);
    try {
      await dispatch(logoutAll()).unwrap();
      notifications.show({
        title: "Success",
        message: "Signed out of all devices successfully",
        color: "green",
      });
      window.location.href = "/auth/login";
    } catch {
      notifications.show({
        title: "Error",
        message: "Failed to sign out of all devices",
        color: "red",
      });
    } finally {
      setLogoutAllLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (
      !userPassword.current_password ||
      !userPassword.password ||
      !userPassword.password_confirmation
    ) {
      notifications.show({
        title: "Error",
        message: "Please fill in all password fields",
        color: "red",
      });
      return;
    }

    if (userPassword.password !== userPassword.password_confirmation) {
      notifications.show({
        title: "Error",
        message: "New passwords do not match",
        color: "red",
      });
      return;
    }

    setPasswordLoading(true);
    try {
      await clientaxiosinstance.get("/sanctum/csrf-cookie");
      await clientaxiosinstance.post("/change-password", userPassword);

      notifications.show({
        title: "Success",
        message: "Password updated successfully",
        color: "green",
      });

      setUserPassword({
        current_password: "",
        password: "",
        password_confirmation: "",
      });
    } catch (error: unknown) {
      const errorMessage =
        error &&
        typeof error === "object" &&
        "response" in error &&
        error.response &&
        typeof error.response === "object" &&
        "data" in error.response &&
        error.response.data &&
        typeof error.response.data === "object" &&
        "message" in error.response.data
          ? String(error.response.data.message)
          : "Failed to update password";

      notifications.show({
        title: "Error",
        message: errorMessage,
        color: "red",
      });
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <ContentContainer>
      <Stack gap="lg">
        <Group justify="space-between">
          <div>
            <Title order={2} mb="xs">
              My Profile
            </Title>
            <Text c="dimmed" size="sm">
              Manage your account settings and preferences
            </Text>
          </div>
        </Group>

        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Tab value="profile" leftSection={<IconUser size={16} />}>
              Profile
            </Tabs.Tab>
            <Tabs.Tab value="settings" leftSection={<IconSettings size={16} />}>
              Settings
            </Tabs.Tab>
            <Tabs.Tab
              value="notifications"
              leftSection={<IconBell size={16} />}
            >
              Notifications
            </Tabs.Tab>
            <Tabs.Tab value="security" leftSection={<IconShield size={16} />}>
              Security
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="profile" pt="md">
            <Grid gutter="lg">
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Stack align="center" gap="md">
                    <Avatar
                      size={120}
                      radius="xl"
                      color="cyan"
                      src={
                        user.avatar
                          ? `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/storage/${user.avatar}`
                          : null
                      }
                    >
                      {user.company_name
                        ? user.company_name
                            .split(" ")
                            .map((word) => word[0])
                            .join("")
                            .toUpperCase()
                        : `${user.first_name?.[0] || ""}${
                            user.last_name?.[0] || ""
                          }`.toUpperCase()}
                    </Avatar>
                    <div style={{ textAlign: "center" }}>
                      <Text fw={600} size="lg">
                        {user.company_name ||
                          `${user.first_name || ""} ${user.last_name || ""}`}
                      </Text>
                      <Badge variant="light" mt="xs">
                        {user.roles?.[0]?.name}
                      </Badge>
                    </div>
                    <FileInput
                      placeholder="Select photo"
                      leftSection={<IconUpload size={16} />}
                      accept="image/*"
                      size="xs"
                      value={profilePic}
                      onChange={setProfilePic}
                    />
                    {profilePic && (
                      <Button
                        size="xs"
                        onClick={handleProfilePicUpload}
                        loading={uploadLoading}
                        leftSection={<IconUpload size={14} />}
                      >
                        Upload Photo
                      </Button>
                    )}
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 8 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Group justify="space-between" mb="md">
                    <Title order={4}>Personal Information</Title>
                    <ActionIcon
                      variant="subtle"
                      onClick={() => setEditMode(!editMode)}
                    >
                      <IconEdit size={16} />
                    </ActionIcon>
                  </Group>

                  <form onSubmit={handleEdit}>
                    <Grid gutter="md">
                      {user.roles?.[0]?.name !== "MERCHANT" && (
                        <>
                          <Grid.Col span={6}>
                            <TextInput
                              label="First Name"
                              value={editUser.first_name || ""}
                              onChange={(e) =>
                                setEditUser((prev) =>
                                  prev
                                    ? {
                                        ...prev,
                                        first_name: e.target.value,
                                      }
                                    : null
                                )
                              }
                              disabled={!editMode}
                              leftSection={<IconUser size={16} />}
                            />
                          </Grid.Col>
                          <Grid.Col span={6}>
                            <TextInput
                              label="Last Name"
                              value={editUser.last_name || ""}
                              onChange={(e) =>
                                setEditUser((prev) =>
                                  prev
                                    ? {
                                        ...prev,
                                        last_name: e.target.value,
                                      }
                                    : null
                                )
                              }
                              disabled={!editMode}
                            />
                          </Grid.Col>
                        </>
                      )}
                      <Grid.Col span={6}>
                        <TextInput
                          label="Email"
                          value={editUser.email || ""}
                          onChange={(e) =>
                            setEditUser((prev) =>
                              prev
                                ? {
                                    ...prev,
                                    email: e.target.value,
                                  }
                                : null
                            )
                          }
                          disabled={!editMode}
                          leftSection={<IconMail size={16} />}
                        />
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <TextInput
                          label="Phone"
                          value={editUser.phone || ""}
                          onChange={(e) =>
                            setEditUser((prev) =>
                              prev
                                ? {
                                    ...prev,
                                    phone: e.target.value,
                                  }
                                : null
                            )
                          }
                          disabled={!editMode}
                          leftSection={<IconPhone size={16} />}
                        />
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <Select
                          label="Role"
                          value={user.roles?.[0]?.name || ""}
                          data={[
                            "MERCHANT",
                            "SUPPLIER",
                            "CATALOGUEADMIN",
                            "FINANCE",
                            "PRODUREMENT",
                            "APPROVER",
                            "USER",
                          ]}
                          disabled
                          leftSection={<IconBuilding size={16} />}
                        />
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <TextInput
                          label="Location"
                          value={editUser.address || ""}
                          onChange={(e) =>
                            setEditUser((prev) =>
                              prev
                                ? {
                                    ...prev,
                                    address: e.target.value,
                                  }
                                : null
                            )
                          }
                          disabled={!editMode}
                        />
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <TextInput
                          label="Employee ID"
                          value={user.user_code || ""}
                          disabled
                        />
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <TextInput
                          label="Join Date"
                          value={
                            user.created_at
                              ? new Date(user.created_at).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )
                              : ""
                          }
                          disabled
                          leftSection={<IconCalendar size={16} />}
                        />
                      </Grid.Col>
                      <Grid.Col span={12}>
                        <TextInput
                          label="User Name"
                          value={user.user_name || ""}
                          disabled
                          leftSection={<IconUser size={16} />}
                        />
                      </Grid.Col>
                    </Grid>

                    {editMode && (
                      <Group justify="flex-end" mt="md">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setEditMode(false);
                            setEditUser({ ...user });
                          }}
                          type="button"
                        >
                          Cancel
                        </Button>
                        <Button type="submit" loading={editLoading}>
                          Save Changes
                        </Button>
                      </Group>
                    )}
                  </form>
                </Card>
              </Grid.Col>
            </Grid>
          </Tabs.Panel>

          <Tabs.Panel value="settings" pt="md">
            <Grid gutter="lg">
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Title order={4} mb="md">
                    Preferences
                  </Title>
                  <Stack gap="md">
                    <Select
                      label="Language"
                      value={userSettings.language}
                      onChange={(value) =>
                        setUserSettings((prev) => ({
                          ...prev,
                          language: value || "",
                        }))
                      }
                      data={settings.languages || []}
                    />
                    <Select
                      label="Timezone"
                      value={userSettings.timezone}
                      onChange={(value) =>
                        setUserSettings((prev) => ({
                          ...prev,
                          timezone: value || "",
                        }))
                      }
                      data={settings.timezones || []}
                    />
                    <Select
                      label="Currency"
                      value={userSettings.currency}
                      onChange={(value) =>
                        setUserSettings((prev) => ({
                          ...prev,
                          currency: value || "",
                        }))
                      }
                      data={settings.currencies || []}
                    />
                    <Select
                      label="Date Format"
                      value={userSettings.date_format}
                      onChange={(value) =>
                        setUserSettings((prev) => ({
                          ...prev,
                          date_format: value || "",
                        }))
                      }
                      data={settings.date_formats || []}
                    />
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Title order={4} mb="md">
                    Dashboard Settings
                  </Title>
                  <Stack gap="md">
                    <Switch
                      label="Show dashboard statistics"
                      checked={userSettings?.show_dashboard_statistics ?? false}
                      onChange={(e) => {
                        if (!e?.target) return;
                        setUserSettings((prev) => ({
                          ...prev,
                          show_dashboard_statistics: e.target.checked,
                        }));
                      }}
                    />
                    <Switch
                      label="Show recent activity"
                      checked={userSettings?.show_recent_activity ?? false}
                      onChange={(e) => {
                        if (!e?.target) return;
                        setUserSettings((prev) => ({
                          ...prev,
                          show_recent_activity: e.target.checked,
                        }));
                      }}
                    />
                    <Switch
                      label="Show pending approvals"
                      checked={userSettings?.show_pending_approvals ?? false}
                      onChange={(e) => {
                        if (!e?.target) return;
                        setUserSettings((prev) => ({
                          ...prev,
                          show_pending_approvals: e.target.checked,
                        }));
                      }}
                    />
                    <Switch
                      label="Auto-refresh data"
                      checked={userSettings?.auto_refresh_data ?? false}
                      onChange={(e) => {
                        if (!e?.target) return;
                        setUserSettings((prev) => ({
                          ...prev,
                          auto_refresh_data: e.target.checked,
                        }));
                      }}
                    />
                    <Select
                      label="Items per page"
                      value={userSettings.items_per_page}
                      onChange={(value) => {
                        if (value) {
                          setUserSettings((prev) => ({
                            ...prev,
                            items_per_page: value,
                          }));
                        }
                      }}
                      data={[
                        { value: "10", label: "10 items" },
                        { value: "25", label: "25 items" },
                        { value: "50", label: "50 items" },
                      ]}
                    />
                  </Stack>
                  <Group justify="flex-end" mt="md">
                    <Button
                      onClick={handleSettingsUpdate}
                      loading={settingsLoading}
                    >
                      Save Settings
                    </Button>
                  </Group>
                </Card>
              </Grid.Col>
            </Grid>
          </Tabs.Panel>

          <Tabs.Panel value="notifications" pt="md">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Title order={4} mb="md">
                Notification Preferences
              </Title>
              <Stack gap="md">
                <div>
                  <Text fw={500} mb="sm">
                    Communication
                  </Text>
                  <Stack gap="xs">
                    <Switch
                      label="Email notifications"
                      checked={userSettings?.email_notifications ?? false}
                      onChange={(e) => {
                        if (!e?.target) return;
                        setUserSettings((prev) => ({
                          ...prev,
                          email_notifications: e.target.checked,
                        }));
                      }}
                    />
                    <Switch
                      label="SMS notifications"
                      checked={userSettings?.sms_notifications ?? false}
                      onChange={(e) => {
                        if (!e?.target) return;
                        setUserSettings((prev) => ({
                          ...prev,
                          sms_notifications: e.target.checked,
                        }));
                      }}
                    />
                  </Stack>
                </div>

                <Divider />

                <div>
                  <Text fw={500} mb="sm">
                    Procurement Updates
                  </Text>
                  <Stack gap="xs">
                    <Switch
                      label="Requisition status updates"
                      checked={
                        userSettings?.requisition_status_updates ?? false
                      }
                      onChange={(e) => {
                        if (!e?.target) return;
                        setUserSettings((prev) => ({
                          ...prev,
                          requisition_status_updates: e.target.checked,
                        }));
                      }}
                    />
                    <Switch
                      label="Approval reminders"
                      checked={userSettings?.approval_reminders ?? false}
                      onChange={(e) => {
                        if (!e?.target) return;
                        setUserSettings((prev) => ({
                          ...prev,
                          approval_reminders: e.target.checked,
                        }));
                      }}
                    />
                    <Switch
                      label="System alerts"
                      checked={userSettings?.system_alerts ?? false}
                      onChange={(e) => {
                        if (!e?.target) return;
                        setUserSettings((prev) => ({
                          ...prev,
                          system_alerts: e.target.checked,
                        }));
                      }}
                    />
                  </Stack>
                </div>

                <Group justify="flex-end" mt="md">
                  <Button
                    onClick={handleSettingsUpdate}
                    disabled={settingsLoading}
                  >
                    Save Preferences
                  </Button>
                </Group>
              </Stack>
            </Card>
          </Tabs.Panel>

          <Tabs.Panel value="security" pt="md">
            <Grid gutter="lg">
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Title order={4} mb="md">
                    Change Password
                  </Title>
                  <Stack gap="md">
                    <TextInput
                      label="Current Password"
                      type="password"
                      placeholder="Enter current password"
                      value={userPassword.current_password}
                      onChange={(e) =>
                        setUserPassword((prev) => ({
                          ...prev,
                          current_password: e.target.value,
                        }))
                      }
                    />
                    <TextInput
                      label="New Password"
                      type="password"
                      placeholder="Enter new password"
                      value={userPassword.password}
                      onChange={(e) =>
                        setUserPassword((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                    />
                    <TextInput
                      label="Confirm New Password"
                      type="password"
                      placeholder="Confirm new password"
                      value={userPassword.password_confirmation}
                      onChange={(e) =>
                        setUserPassword((prev) => ({
                          ...prev,
                          password_confirmation: e.target.value,
                        }))
                      }
                    />
                    <Button
                      onClick={handlePasswordChange}
                      loading={passwordLoading}
                    >
                      Update Password
                    </Button>
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Title order={4} mb="md">
                    Security Settings
                  </Title>
                  <Stack gap="md">
                    <Switch
                      label="Two-factor authentication"
                      description="Add an extra layer of security"
                      checked={userSettings?.two_factor_auth ?? false}
                      onChange={(e) => {
                        if (!e?.target) return;
                        setUserSettings((prev) => ({
                          ...prev,
                          two_factor_auth: e.target.checked,
                        }));
                      }}
                    />
                    <Switch
                      label="Login notifications"
                      description="Get notified of new logins"
                      checked={userSettings?.login_notifications ?? false}
                      onChange={(e) => {
                        if (!e?.target) return;
                        setUserSettings((prev) => ({
                          ...prev,
                          login_notifications: e.target.checked,
                        }));
                      }}
                    />
                    <Button
                      type="submit"
                      onClick={handleSettingsUpdate}
                      disabled={settingsLoading}
                    >
                      Save Changes
                    </Button>
                    <Divider />
                    <div>
                      <Text fw={500} mb="xs">
                        Active Sessions
                      </Text>
                      <Text size="sm" c="dimmed" mb="md">
                        You are currently signed in on multiple devices
                      </Text>
                      <Button
                        variant="outline"
                        color="red"
                        size="sm"
                        onClick={handleLogoutAll}
                        loading={logoutAllLoading}
                      >
                        Sign out all devices
                      </Button>
                    </div>
                  </Stack>
                </Card>
              </Grid.Col>
            </Grid>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </ContentContainer>
  );
}
