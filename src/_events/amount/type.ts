export interface Amount {
    uuid: string,
    value: number,
    cost: number,
    active?: number,
}

export interface AmountCreateTransaction extends Amount {
    range: string
}