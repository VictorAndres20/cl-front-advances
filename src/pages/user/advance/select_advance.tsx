import { Button } from "antd";
import { useFindAvalibaleAmounts } from "../../../_hooks/amount/useFindAvailableAmounts.hook";
import { formatToUSD } from "../../../_utils/format_currency";
import { GenerateAdvacneHook } from "../../../_hooks/advance/useGenerateAdvance.hook";
import Live from "./live";
import LimitInfo from "./limit-info";
import { useFindEmployeeById } from "../../../_hooks/employees/useFindEMployeeById.hook";

export default function SelectAdvance({ hook }: { hook: GenerateAdvacneHook }){

    const amountsHook = useFindAvalibaleAmounts();
    const employeeHook = useFindEmployeeById();

    return(
        <div style={{ width: '100%', marginTop: '20px' }}>
            <Live hook={employeeHook} />
            <LimitInfo />
            <div style={{ width: '100%', padding: '10px 0', borderRadius: '20px' }}>
                <div className="flex-col flex-center" style={{ fontSize: '1.3em', fontWeight: 'bold', margin: '10px 0', width: '100%' }}>¿Cuánto deseas adelantar?</div>
                <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '100%', justifyContent: 'center', alignItems: 'cener' }}>
                    {
                        amountsHook.amounts.map((a, key) => {
                            return(
                                <div style={{ margin: '20px 20px' }} 
                                    className="flex-row flex-center" 
                                    key={`amount_list_${key}`}
                                >
                                    <Button
                                        style={{ width: '120px', height: '60px' }}
                                        type={ hook.amount?.uuid === a.uuid ? "primary" : "default" }
                                        onClick={() => {
                                            hook.updateAmountToAdvance(a);
                                        }}
                                    >
                                        <div style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{formatToUSD(a.value)}</div>
                                        <div style={{ fontSize: '0.8em' }}>({formatToUSD(a.cost)})</div>
                                    </Button>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            <div className="flex-col flex-center" style={{ width: '100%', padding: '10px 0', borderRadius: '20px' }}>
                <div className="flex-col flex-center" style={{ width: '300px', backgroundColor: '#E7E9EE', color: '#5975BB', marginBottom: '20px', padding: '18px 0', borderRadius: '20px', fontWeight: 'bold', fontSize: '2em' }}>
                    {formatToUSD(hook.advance?.value ?? 0)}
                    <div style={{ fontSize: '0.5em' }}>
                    Costo Transacción {formatToUSD(hook.advance?.cost ?? 0 )}
                    </div>
                </div>
            </div>
            <div className="flex-row" style={{ width: '100%', margin: '20px 0' }}>
                <div className="flex-col flex-center" style={{ width: '100%' }}>
                    <Button
                        disabled = {employeeHook.data?.state === 0}
                        style={{ width: '90%' }}
                        type="primary"
                        onClick={() => {
                            if(hook.amount) hook.setPanel(2);
                        }}
                    >
                        Confirmar
                    </Button>
                </div>
            </div>
        </div>
    );
}