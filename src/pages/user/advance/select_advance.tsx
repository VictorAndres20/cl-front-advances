import { Button } from "antd";
import { useFindAvalibaleAmounts } from "../../../_hooks/amount/useFindAvailableAmounts.hook";
import { formatToUSD } from "../../../_utils/format_currency";
import { GenerateAdvacneHook } from "../../../_hooks/advance/useGenerateAdvance.hook";

export default function SelectAdvance({ hook }: { hook: GenerateAdvacneHook }){

    const amountsHook = useFindAvalibaleAmounts();

    return(
        <div>
            <div style={{ fontSize: '1.3em', fontWeight: 'bold', margin: '10px 0' }}>¿Cuánto deseas adelantar?</div>
            <div className="flex-row" style={{ width: '100%' }}>
                {
                    amountsHook.amounts.map((a, key) => {
                        return(
                            <div style={{ width: '33%' }} className="flex-col flex-center" key={`amount_list_${key}`}>
                                <Button
                                    style={{ width: '90%' }}
                                    type={ hook.amount?.uuid === a.uuid ? "primary" : "dashed" }
                                    onClick={() => {
                                        hook.updateAmountToAdvance(a);
                                    }}
                                >
                                    {formatToUSD(a.value)}
                                </Button>
                                <span style={{ marginTop: '5px' }}>Costo:</span>
                                <span style={{ margin: '5px 0' }}>{formatToUSD(a.cost)}</span>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}