import React from 'react';
import { NewsItem } from '../../api/fetchNews';

interface NewsCardProps {
    newsItem: NewsItem;
}

export const NewsCard: React.FC<NewsCardProps> = ({ newsItem }) => {
    return (
        <div style={styles.card}>
            <h3 style={styles.title}>{newsItem.title}</h3>

            <p style={styles.body} title={newsItem.body}>
                {newsItem.body}
            </p>

            <div style={styles.tagsContainer}>
                {newsItem.tags.map((tag, index) => (
                    <span key={index} style={styles.tag}>
                        #{tag}
                    </span>
                ))}
            </div>

            <div style={styles.reactions}>
                <span
                    onClick={() => {
                        alert(`Лайкнули новость ${newsItem.id} ${notEmplementMessage}`)
                        console.log('Лайкнули новость', newsItem.id);
                    }}
                    style={styles.reaction}

                >👍 {newsItem.reactions.likes}</span>
                <span
                    onClick={() => {
                        alert(`Дизлайкнули новость ${newsItem.id} ${notEmplementMessage}`)
                        console.log('Дизлайкнули новость', newsItem.id);
                    }}
                    style={styles.reaction}
                >👎 {newsItem.reactions.dislikes}</span>
            </div>
        </div>
    );
};

const notEmplementMessage = '\nРейтинг могут оставлять только зарегистрированные пользователи. \nРегистрация пользователей находится в процессе разработки.'


const styles: Record<string, React.CSSProperties> = {
    card: {
        backgroundColor: '#fff',
        padding: '16px',
        margin: '0px 20px 16px 20px',
        borderRadius: 8,
        textAlign: 'left',
    },
    title: {
        margin: '0 0 8px 0',
    },
    body: {
        margin: '0 0 12px 0',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    tagsContainer: {
        marginBottom: '8px',
    },
    tag: {
        display: 'inline-block',
        backgroundColor: '#f0f0f0',
        borderRadius: '12px',
        padding: '4px 8px',
        marginRight: '8px',
        fontSize: '12px',
        color: 'rgb(85, 85, 85)',
    },
    reaction: {
        fontWeight: 'bold',
        fontSize: '14px',
        marginRight: '12px',
        cursor: 'pointer',
        border: '1px solid rgba(85, 85, 85, 0.5)',
        padding: '1px',
        borderRadius: '7px'
    },
    reactions: {
        marginTop: '12px'
    }
};
