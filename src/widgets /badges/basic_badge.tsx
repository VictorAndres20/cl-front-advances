import { Badge } from "antd";

const badge_colors = {
    'success': '#52c41a',
    'danger': ''
}

export default function BasicBadge({ text, color }: { text: string, color: 'success' | 'danger' }) {

    return(
        <Badge count={text} color={badge_colors[color]} />
    );
}