import { Badge } from "antd";
import { getBank } from "../../../_utils/storage_handler";
import { useSupportedBanks } from "../../../_hooks/bank_supported/use-suported-banks.hook";

const supportedMessage = (
    <div className="flex-col flex-center" style={{ fontSize: '0.9em', fontWeight: 'bold', margin: '10px 0', width: '100%' }}>
        ¡Funcionando toda la semana, domingos y festivos!
    </div>
);
const unsupportedMessage = (
    <div className="flex-col flex-center" style={{ fontSize: '0.9em', fontWeight: 'bold', margin: '10px 0', width: '100%' }}>
        Servicio disponible solamente días hábiles
    </div>
);

export function LiveMessage(){

    const employeeBank = getBank();
    const supportedBanksHooks = useSupportedBanks();

    return(
        <div style={{ border: '1px solid #92B9E8', width: '100%', padding: '10px 0', borderRadius: '20px' }}>
            <div className="flex-col flex-center" style={{ fontSize: '1.3em', fontWeight: 'bold', margin: '10px 0', width: '100%' }}>
                <Badge status="success" text="Activo" />
            </div>
            {
                supportedBanksHooks.data.some( bank => bank.cod === employeeBank ) ? supportedMessage : unsupportedMessage
            }
        </div>
    );
}