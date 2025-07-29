import React from 'react';
import { Layout } from 'antd';
import { useEffect } from 'react';
import { fetchNews, NewsItem } from '../../api/fetchNews';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchNewsAsync } from '../../store/newsSlice';

const { Content } = Layout;




export const List = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { news, loading, error } = useSelector((state: RootState) => state.news);

    useEffect(() => {
        dispatch(fetchNewsAsync());
    }, [dispatch]);

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



