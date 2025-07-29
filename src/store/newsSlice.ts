import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchNews, NewsItem } from '../api/fetchNews';

interface NewsState {
    news: NewsItem[];
    loading: boolean;
    error: string | null;
}

const initialState: NewsState = {
    news: [],
    loading: false,
    error: null,
};

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        // здесь можно добавить обычные редьюсеры, если нужно
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNewsAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNewsAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.news = action.payload;
            })
            .addCase(fetchNewsAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export default newsSlice.reducer;


export const fetchNewsAsync = createAsyncThunk(
    'news/fetchNews',
    async (_, thunkAPI) => {
        try {
            const response = await fetchNews();
            return response.posts;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
