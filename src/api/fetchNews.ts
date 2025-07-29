
export async function fetchNews(limit = 10, skip = 0): Promise<NewsResponse> {
    const response = await fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}`);

    if (!response.ok) {
        throw new Error(`Ошибка сети: ${response.status}`);
    }

    const data: NewsResponse = await response.json();

    return data;
}

export interface NewsItem {
    body: string;
    id: number;
    reactions: Reactions;
    tags: string[];
    title: string;
    userId: number;
    views: number;
}

type Reactions = {
    dislikes: number,
    likes: number
}

interface NewsResponse {
    posts: NewsItem[];
    total: number;
    skip: number;
    limit: number;
}