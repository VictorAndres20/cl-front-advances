import { Button } from "antd";
import { formatToUSD } from "../../../_utils/format_currency";
import { GenerateAdvacneHook } from "../../../_hooks/advance/useGenerateAdvance.hook";
import { useAllBankMessages } from "../../../_hooks/bank_messages/use-all-bank-messages.hook";
import { UseFindEmployeeById } from "../../../_hooks/employees/useFindEMployeeById.hook";

export default function Information({ hook, employee }: { hook: GenerateAdvacneHook, employee: UseFindEmployeeById }){

    const messageHook = useAllBankMessages();

    return(
        <div style={{ width: '100%', marginTop: '10px' }}>
            <div className="flex-col flex-center" style={{ width: '100%', padding: '10px 0', borderRadius: '20px' }}>
                <div className="flex-col flex-center" style={{ width: '300px', backgroundColor: '#E7E9EE', color: '#5975BB', marginBottom: '20px', padding: '18px 0', borderRadius: '20px', fontWeight: 'bold', fontSize: '2em' }}>
                    {formatToUSD(hook.advance?.value ?? 0)}
                    <div style={{ fontSize: '0.5em' }}>
                    Costo Transacción {formatToUSD(hook.advance?.cost ?? 0 )}
                    </div>
                </div>
            </div>
            <div className="flex-col flex-center" style={{ width: '100%', padding: '10px 0', borderRadius: '20px' }}>
                <div onClick={() => hook.updateUseFintech(0)} className="flex-row flex-center" style={{ border: '1px solid #000000', width: '300px', marginBottom: '10px', padding: '18px 0', borderRadius: '5px', fontWeight: 'bold', fontSize: '1.2em', height: '70px' }}>
                    <div className="flex-col flex-center" style={{ width: '80%' }}>
                    <div>Cuenta de nómina </div>
                    <div style={{ fontSize: '0.7em', fontWeight: 'normal' }}>{typeof employee.data?.bank === 'object' ? employee.data?.bank?.name : employee.data?.bank}</div>
                    <div style={{ fontSize: '0.7em', fontWeight: 'normal' }}>{typeof employee.data?.bank_account_type === 'object' ? employee.data?.bank_account_type?.name : employee.data?.bank_account_type}</div>
                    <div style={{ fontSize: '0.7em', fontWeight: 'normal' }}>{employee.data?.bank_account_number ?? ''}</div>
                    </div>
                    <div className="flex-col flex-center" style={{ width: '20%' }}>
                    <input style={{ height: '20px', width: '20px' }} type='radio' checked={hook.advance.use_fintech === 0} />
                    </div>
                </div>
            </div>
            {
                employee.data?.fintech &&
                <div className="flex-col flex-center" style={{ width: '100%', padding: '10px 0', borderRadius: '20px' }}>
                    <div onClick={() => hook.updateUseFintech(1)} className="flex-row flex-center" style={{ border: '1px solid #000000', width: '300px', marginBottom: '10px', padding: '18px 0', borderRadius: '5px', fontWeight: 'bold', fontSize: '1.2em', height: '70px' }}>
                        <div className="flex-col flex-center" style={{ width: '80%' }}>
                        <div>Plataforma digital </div>
                        <div style={{ fontSize: '0.7em', fontWeight: 'normal' }}>{typeof employee.data?.fintech === 'object' ? employee.data?.fintech?.name : employee.data?.fintech}</div>
                        <div style={{ fontSize: '0.7em', fontWeight: 'normal' }}>{employee.data?.fintech_account_number ?? ''}</div>
                        </div>
                        <div className="flex-col flex-center" style={{ width: '20%' }}>
                        <input style={{ height: '20px', width: '20px' }} type='radio' checked={hook.advance.use_fintech === 1} />
                        </div>
                        
                    </div>
                </div>
            }
            <div className="flex-col flex-center" style={{ width: '100%', padding: '10px 0', borderRadius: '20px', margin: '10px 0' }}>
                <div>
                <div style={{ margin: '10px 25px' }}>
                {
                    messageHook.data.find(msg => typeof msg.bank === 'object' ? msg.bank.cod === (typeof employee.data?.bank === 'object' ? employee.data?.bank?.cod : employee.data?.bank) : msg.bank === (typeof employee.data?.bank === 'object' ? employee.data?.bank?.cod : employee.data?.bank)  )?.message
                }
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
                                    hook.setPanel(1);
                                    hook.setConfirm(false);
                                    hook.updateAmountToAdvance(null);
                                }}
                            >
                                Cancelar
                            </Button>
                        </div>
                        <div className="flex-col flex-center" style={{ width: '50%' }}>
                            <Button
                                style={{ width: '90%' }}
                                type="primary"
                                onClick={() => {
                                    hook.setPanel(3);
                                    hook.setConfirm(true);
                                }}
                            >
                                Confirmar
                            </Button>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}