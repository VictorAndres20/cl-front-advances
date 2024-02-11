import { Amount } from "../amount/type";
import { RangeType } from "../range/type";

export interface RangeAmountType {
    uuid: string,
    amount?: string | Amount,
    range?: string | RangeType,
}