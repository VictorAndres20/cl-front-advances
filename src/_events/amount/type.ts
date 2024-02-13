import { RangeType } from "../range/type";

export interface Amount {
    uuid: string,
    value: number,
    cost: number,
    active?: number,
    range?: string | RangeType
}