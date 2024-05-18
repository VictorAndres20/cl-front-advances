import { Badge } from "antd";
import { useFindEmployeeById } from "../../../_hooks/employees/useFindEMployeeById.hook";

export default function Live(){

    const hook = useFindEmployeeById();

    return(
        <div style={{ width: '100%', marginTop: '10px' }}>
            {
                hook.data?.state === 1 ?
                <div style={{ border: '1px solid #92B9E8', width: '100%', padding: '10px 0', borderRadius: '20px' }}>
                    <div className="flex-col flex-center" style={{ fontSize: '1.3em', fontWeight: 'bold', margin: '10px 0', width: '100%' }}>
                        <Badge status="success" text="Activo" />
                    </div>
                    <div className="flex-col flex-center" style={{ fontSize: '0.9em', fontWeight: 'bold', margin: '10px 0', width: '100%' }}>
                        ¡Funcionando toda la semana, domingos y festivos!
                    </div>
                </div>
                :
                <div style={{ border: '1px solid #92B9E8', width: '100%', padding: '10px 0', borderRadius: '20px' }}>
                    <div className="flex-col flex-center" style={{ fontSize: '1.3em', fontWeight: 'bold', margin: '10px 0', width: '100%' }}>
                        <Badge status="error" text="Inactivo" />
                    </div>
                    <div className="flex-col flex-center" style={{ fontSize: '0.9em', fontWeight: 'bold', margin: '10px 0', width: '100%' }}>
                        Usuario inactivo
                    </div>
                </div>
            }
        </div>
    );
}