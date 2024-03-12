import { Button } from "antd";
import { useFindAvalibaleAmounts } from "../../../_hooks/amount/useFindAvailableAmounts.hook";
import { formatToUSD } from "../../../_utils/format_currency";
import { GenerateAdvacneHook } from "../../../_hooks/advance/useGenerateAdvance.hook";

export default function SelectAdvance({ hook }: { hook: GenerateAdvacneHook }){

    const amountsHook = useFindAvalibaleAmounts();

    return(
        <div style={{ width: '100%', marginTop: '30px' }}>
            <div style={{ backgroundColor: '#A6ABB8', width: '100%', padding: '10px 0', borderRadius: '20px' }}>
                <div className="flex-col flex-center" style={{ fontSize: '1.3em', fontWeight: 'bold', margin: '10px 0', width: '100%', color: '#fff' }}>¿Cuánto deseas adelantar?</div>
                <div className="flex-col">
                    {
                        amountsHook.amounts.map((a, key) => {
                            return(
                                <div style={{ margin: '20px 0' }} className="flex-row flex-center" key={`amount_list_${key}`}>
                                    <Button
                                        style={{ width: '120px' }}
                                        type={ hook.amount?.uuid === a.uuid ? "primary" : "dashed" }
                                        onClick={() => {
                                            hook.updateAmountToAdvance(a);
                                        }}
                                    >
                                        {formatToUSD(a.value)}
                                    </Button>
                                    <span style={{ margin: '0 10px' }}>Costo:</span>
                                    <span >{formatToUSD(a.cost)}</span>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}