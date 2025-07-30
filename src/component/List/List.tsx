import React, { useCallback, useLayoutEffect, useRef } from 'react';
import { Layout } from 'antd';
import { useEffect } from 'react';
import { fetchNews, NewsItem } from '../../api/fetchNews';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchNewsAsync } from '../../store/newsSlice';

const { Content } = Layout;




export const List = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { news, loading, error, total, skip } = useSelector((state: RootState) => state.news);



    useEffect(() => {
        dispatch(fetchNewsAsync({ skip: 0 }));
    }, [dispatch]);



    const handleScroll = useCallback(() => {

        if (loading) return;
        if (news.length >= total) return;

        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const fullHeight = document.documentElement.scrollHeight;

        if (scrollTop + windowHeight >= fullHeight - 100) {
            // Ближе к концу страницы - загружаем ещё
            dispatch(fetchNewsAsync({ skip }));
        }
    }, [dispatch, loading, news.length, total, skip]);


    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);


    const sentinelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const node = sentinelRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const firstEntry = entries[0];
                // Если sentinel виден и не идёт загрузка и не загрузили всё
                if (firstEntry.isIntersecting && !loading && news.length < total) dispatch(fetchNewsAsync({ skip }));
            },
            {
                root: null,
                rootMargin: '100px', 
            }
        );

        observer.observe(node);

        return () => observer.unobserve(node);

    }, [dispatch, sentinelRef, loading, news.length, total, skip]);


    return (
        <Content style={contentStyle}>
            {loading && <p>Загрузка...</p>}
            {error && <p style={{ color: "red" }}>Ошибка: {error}</p>}
            {!error &&
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



