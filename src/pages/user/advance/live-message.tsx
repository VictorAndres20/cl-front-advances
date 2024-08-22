import { Badge } from "antd";

export function LiveMessage(){

    return(
        <div style={{ border: '1px solid #92B9E8', width: '100%', padding: '10px 0', borderRadius: '20px' }}>
            <div className="flex-col flex-center" style={{ fontSize: '1.3em', fontWeight: 'bold', margin: '10px 0', width: '100%' }}>
                <Badge status="success" text="Activo" />
            </div>
        </div>
    );
}