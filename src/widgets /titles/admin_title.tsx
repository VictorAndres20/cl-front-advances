import { Divider } from "antd";

export default function AdminTitle({ text }: { text: string }){

    return(
        <div>
            <div style={{ fontSize: '1.3em', fontWeight: 'bold' }}>{text}</div>
            <Divider />
        </div>
    );
}