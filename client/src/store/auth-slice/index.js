import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
    error: null,
    token: null,
};

export const registerUser = createAsyncThunk('/auth/register',
    async (FormData) => {
        const response = await axios.post('http://localhost:3000/api/auth/register', FormData, {
            withCredentials: true,
        });
        return response.data;
    }
);

export const loginUser = createAsyncThunk('/auth/login',
    async (FormData) => {
        const response = await axios.post('http://localhost:3000/api/auth/login', FormData, {
            withCredentials: true,
        });
        return response.data;
    }
);

export const logoutUser = createAsyncThunk('/auth/logout',
    async () => {
        const response = await axios.post('http://localhost:3000/api/auth/logout',{}, {
            withCredentials: true,
        });
        return response.data;
    }
);

export const getUserProfile = createAsyncThunk('/auth/profile',
    async () => {
        const response = await axios.get('http://localhost:3000/api/auth/profile', {
            withCredentials: true,
        });
        return response.data;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        loginStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        loginFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload.error;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.isLoading = false;
            state.user = null;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = !!action.payload.token;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Registration failed';
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                console.log('Login successful:', action);
                state.isLoading = false;
                state.isAuthenticated = action.payload.success;
                state.user = action.payload.success ? action.payload.user : null;
                state.token =  action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Login failed';
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
            })
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.token = action.payload.token || null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Login failed';
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
            })
            .addCase(getUserProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = !!action.payload.success;
                state.user = action.payload.success && action.payload.user
                    ? action.payload.user
                    : null;
                state.token = action.payload.token || null;
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Login failed';
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
            });
    }
})

export const {
    setUser,
    loginStart,
    loginFailure,
    loginSuccess,
    logout } = authSlice.actions;
export default authSlice.reducer;
