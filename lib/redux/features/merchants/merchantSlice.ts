import clientaxiosinstance from "@/lib/services/clientaxiosinstance";
import { Role } from "@/types/role";

import { User } from "@/types/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface MerchantState {
  users: User[];
  roles: Role[];
  role: Role;
  usersLoading: boolean;
  rolesLoading: boolean;
  roleLoading: boolean;
  usersError: string | null;
  rolesError: string | null;
  roleError: string | null;
  user: User;
  userLoading: boolean;
  userError: string | null;
}

const state: MerchantState = {
  users: [],
  roles: [],
  role: {} as Role,
  roleLoading: false,
  roleError: null,
  usersLoading: false,
  rolesLoading: false,
  usersError: null,
  rolesError: null,
  user: {} as User,
  userLoading: false,
  userError: null,
};

export const merchantSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.usersLoading = true;
        state.usersError = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.usersLoading = false;
        state.users = action.payload;
        state.usersError = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.usersLoading = false;
        state.usersError = action.error.message ?? "An error occurred";
      })
      .addCase(fetchUser.pending, (state) => {
        state.userLoading = true;
        state.userError = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.user = action.payload;
        state.userError = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.error.message ?? "An error occurred";
      })
      .addCase(fetchRole.pending, (state) => {
        state.roleLoading = true;
        state.roleError = null;
      })
      .addCase(fetchRole.fulfilled, (state, action) => {
        state.roleLoading = false;
        state.role = action.payload;
        state.roleError = null;
      })
      .addCase(fetchRole.rejected, (state, action) => {
        state.roleLoading = false;
        state.roleError = action.error.message ?? "An error occurred";
      })
      .addCase(addUser.pending, (state) => {
        state.userLoading = true;
        state.userError = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.users.push(action.payload);
        state.userError = null;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.error.message ?? "An error occurred";
      })
      .addCase(editUser.pending, (state) => {
        state.userLoading = true;
        state.userError = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.users.push(action.payload);
        state.userError = null;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.error.message ?? "An error occurred";
      })
      .addCase(deleteUser.pending, (state) => {
        state.userLoading = true;
        state.userError = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.users = state.users.filter((user) => user.id !== action.payload);
        state.userError = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.error.message ?? "An error occurred";
      })
      .addCase(fetchRoles.pending, (state) => {
        state.rolesLoading = true;
        state.rolesError = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.rolesLoading = false;
        state.roles = action.payload;
        state.rolesError = null;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.rolesLoading = false;
        state.rolesError = action.error.message ?? "An error occurred";
      });
  },
});

export const fetchUsers = createAsyncThunk("merchants/fetchUsers", async () => {
  await clientaxiosinstance.get("/sanctum/csrf-cookie");
  const response = await clientaxiosinstance.get("/merchants/users");
  return response.data as User[];
});

export const fetchRoles = createAsyncThunk("merchants/fetchRoles", async () => {
  await clientaxiosinstance.get("/sanctum/csrf-cookie");
  const response = await clientaxiosinstance.get("/merchants/roles");
  return response.data as Role[];
});

export const fetchUser = createAsyncThunk(
  "merchants/fetchUser",
  async (id: number) => {
    await clientaxiosinstance.get("/sanctum/csrf-cookie");
    const response = await clientaxiosinstance.get(`/merchants/users/${id}`);
    return response.data as User;
  }
);

export const fetchRole = createAsyncThunk(
  "merchants/fetchRole",
  async (id: number) => {
    await clientaxiosinstance.get("/sanctum/csrf-cookie");
    const response = await clientaxiosinstance.get(`/merchants/roles/${id}`);
    return response.data as Role;
  }
);

export const addUser = createAsyncThunk(
  "merchants/addUser",
  async (values: Partial<User>) => {
    await clientaxiosinstance.get("/sanctum/csrf-cookie");
    const response = await clientaxiosinstance.post("/merchants/users", values);
    return response.data.user as User;
  }
);

export const editUser = createAsyncThunk(
  "merchants/editUser",
  async (values: Partial<User> & { id: number }, { rejectWithValue }) => {
    try {
      await clientaxiosinstance.get("/sanctum/csrf-cookie");
      const response = await clientaxiosinstance.post(
        `/merchants/users/${values.id}/edit`,
        values
      );
      return response.data as User;
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
          : error instanceof Error
          ? error.message
          : "An error occurred";
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "merchants/deleteUser",
  async (id: number, { rejectWithValue }) => {
    try {
      await clientaxiosinstance.get("/sanctum/csrf-cookie");
      await clientaxiosinstance.delete(`/merchants/users/${id}/delete`);
      return id;
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
          : error instanceof Error
          ? error.message
          : "An error occurred";
      return rejectWithValue(errorMessage);
    }
  }
);

export default merchantSlice.reducer;
