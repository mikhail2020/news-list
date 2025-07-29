import React from 'react';
import { Layout } from 'antd';
import { useEffect } from 'react';
import { fetchNews, NewsItem } from '../../api/fetchNews';

const { Content } = Layout;




export const List = () => {
    const [news, setNews] = React.useState<NewsItem[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);

    useEffect(() => {

        fetchNews()
            .then(res => setNews(res.posts))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, []);


    return (
        <Content style={contentStyle}>
            {loading && <p>Загрузка...</p>}
            {error && <p style={{ color: "red" }}>Ошибка: {error}</p>}
            {!loading && !error &&
                <ul>
                    {news.map(newsItem => (
                        <li key={newsItem.id}>
                            <h3>{newsItem.title}</h3>
                            <p>{newsItem.body}</p>
                        </li>
                    ))}
                </ul>
            }

        </Content>
    )
}

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#0958d9',
};



