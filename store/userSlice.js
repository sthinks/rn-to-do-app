import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Depolanmış kullanıcı bilgisini alma işlevi
export const getStoredUser = async () => {
    try {
        const userData = await AsyncStorage.getItem('userData');
        return JSON.parse(userData);
    } catch (error) {
        throw error;
    }
};

// Kullanıcının depolanmış verisini kontrol eden asenkron işlem
export const checkStoredUser = createAsyncThunk(
    'user/checkStoredUser',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const userData = await getStoredUser();
            if (userData) {
                dispatch(setUser(userData));
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        isLoggedIn: false,
    },
    reducers: {
        setUser: (state, action) => {
            const user = action.payload;
            state.user = user;
            state.isLoggedIn = true;
        },
        logoutUser: (state) => {
            state.user = null;
            state.isLoggedIn = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(checkStoredUser.rejected, (state, action) => {
            // Hata durumunu işleyin veya rapor edin
        });
    },
});

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
