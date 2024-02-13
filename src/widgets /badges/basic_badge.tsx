import { Badge } from "antd";

const badge_colors = {
    'success': '#52c41a',
    'warning': '#faad14',
    'danger': ''
}

export default function BasicBadge({ text, color }: { text: string, color: 'success' | 'danger' | 'warning' }) {

    return(
        <Badge count={text} color={badge_colors[color]} />
    );
}