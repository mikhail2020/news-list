import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchNews, NewsItem, NewsResponse, } from '../api/fetchNews';

interface NewsState {
    news: NewsItem[];
    loading: boolean;
    error: string | null;
    skip: number;
    total: number;
}

const initialState: NewsState = {
    news: [],
    loading: false,
    error: null,
    skip: 0,
    total: 0
};

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNewsAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNewsAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.news = [...state.news, ...action.payload.posts];
                state.skip += action.payload.posts.length;

                state.total = action.payload.total;
            })
            .addCase(fetchNewsAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export default newsSlice.reducer;


export const fetchNewsAsync = createAsyncThunk<
    NewsResponse,
    { skip: number },
    { rejectValue: string }
>(
    'news/fetchNews',
    async ({ skip }, thunkAPI) => {
        try {
            const response = await fetchNews(skip);

            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
