import { Layout } from 'antd';

const { Content } = Layout;


export const List = () => {
    return (
        <Content style={contentStyle}>Список</Content>
    )
}

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#0958d9',
};