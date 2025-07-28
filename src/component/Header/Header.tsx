import { Layout } from 'antd';

const { Header: AntHeader } = Layout;


export const Header = () => {
    return (
        <AntHeader style={headerStyle}>Заголовок</AntHeader>
    )
}

const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#4096ff',
};