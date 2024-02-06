import { Button } from "antd";
import { useFindAvalibaleAmounts } from "../../../_hooks/amount/useFindAvailableAmounts.hook";
import { formatToUSD } from "../../../_utils/format_currency";

export default function SelectAdvance({ hook }){

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
                                    type={ hook.amount?.id === a.id ? "primary" : "dashed" }
                                    onClick={() => {
                                        hook.setAmount(a);
                                    }}
                                >
                                    {formatToUSD(a.value)}
                                </Button>
                                <span>{formatToUSD(a.cost)}</span>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}