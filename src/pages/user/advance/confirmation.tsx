import { Button, Popconfirm } from "antd";
import { formatToUSD } from "../../../_utils/format_currency";
import { GenerateAdvacneHook } from "../../../_hooks/advance/useGenerateAdvance.hook";
import { UseFindEmployeeById } from "../../../_hooks/employees/useFindEMployeeById.hook";
import { useAllMessages } from "../../../_hooks/messages/use-all-messages.hook";

export default function Confirmation({ hook, employee }: { hook: GenerateAdvacneHook, employee: UseFindEmployeeById  }){

    const messageHook = useAllMessages();

    const getBankTransferInfo = () => {
        return typeof employee.data?.bank === 'object' ? employee.data?.bank?.name : employee.data?.bank;
    }

    const getPlatformTransferInfo = () => {
        return typeof employee.data?.fintech === 'object' ? employee.data?.fintech?.name : employee.data?.fintech;
    }

    const getPlatformTransferNumber = () => {
        return `(${employee.data?.fintech_account_number ?? ''})`;
    }

    return(
        <div style={{ width: '100%', marginTop: '30px' }}>
            <div className="flex-col flex-center" style={{ border: '1px solid #92B9E8', width: '100%', padding: '10px 0', borderRadius: '20px' }}>
                <div style={{ width: '90%', color: '#5975BB', fontSize: '1.3em', fontWeight: 'bold' }}>
                    Confirmación
                </div>
                <div className="flex-row" style={{ width: '90%', color: '#5975BB', fontSize: '1.3em', marginTop: '15px' }}>
                    <div style={{ width: '40%' }}>
                    <span style={{ margin: '0 5px' }}>Anticipo:</span>
                    </div>
                    <div>
                    <span style={{fontWeight: 'bold' }}>{formatToUSD(hook.advance?.value ?? 0)}</span>
                    </div>
                </div>
                <div className="flex-row" style={{ width: '90%', color: '#5975BB', fontSize: '0.9em', marginTop: '10px' }}>
                    <div style={{ width: '40%' }}>
                    <span style={{ margin: '0 5px' }}>Costo transacción:</span>
                    </div>
                    <div><span style={{fontWeight: 'bold' }}>{formatToUSD(hook.advance?.cost ?? 0 )}</span></div>
                </div>
                <div className="flex-row" style={{ width: '90%', color: '#5975BB', fontSize: '0.9em', marginTop: '10px' }}>
                    <div style={{ width: '40%' }}>
                    <span style={{ margin: '0 5px' }}>Transferir a:</span>
                    </div>
                    <span style={{fontWeight: 'bold' }}>{hook.advance?.use_fintech ? getPlatformTransferInfo() + getPlatformTransferNumber() : getBankTransferInfo() }</span>
                </div>
            </div>
            <div className="flex-col flex-center" style={{ width: '100%', padding: '10px 0', borderRadius: '20px', margin: '10px 0' }}>
                <div>
                <div style={{ margin: '10px 18px', fontWeight: 'bold' }}>
                    AL PRESIONAR CONFIRMAR ESTÁS AUTORIZANDO EXPRESA E IRREVOCABLEMENTE EL DESCUENTO EN EL SALARIO DE LA QUINCENA CORRIENTE POR UN VALOR DE  
                    <span style={{ fontSize: '1.4em', marginLeft: '7px', borderBottom: '1px solid #000' }}>{formatToUSD((hook?.advance?.value ?? 0) + (hook?.advance?.cost ?? 0))}</span>
                </div>
                <div style={{ margin: '10px 18px', fontWeight: 'bold' }}>
                    {messageHook.data?.find( msg => msg.cod === 'ADVA' )?.message}
                </div>
                </div>
                {
                    hook.loading ?
                    <div className="flex-col flex-center" style={{ width: '100%' }}>
                        <div className="vp-spinner"></div>
                    </div>
                    :
                    <div className="flex-row" style={{ width: '100%', margin: '20px 0' }}>
                        <div className="flex-col flex-center" style={{ width: '50%' }}>
                            <Button
                                style={{ width: '90%' }}
                                onClick={() => {
                                    hook.setPanel(2);
                                }}
                            >
                                Cancelar
                            </Button>
                        </div>
                        <div className="flex-col flex-center" style={{ width: '50%' }}>
                            <Popconfirm
                                title="Crear solicitud"
                                description="¿Estás seguro de crear la solicitud?"
                                onConfirm={() => {
                                    hook.generate();
                                }}
                                onCancel={() => {}}
                                okText="Sí"
                                cancelText="No"
                            >
                            <Button
                                style={{ width: '90%' }}
                                type="primary"
                            >
                                Confirmar
                            </Button>
                            </Popconfirm>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}