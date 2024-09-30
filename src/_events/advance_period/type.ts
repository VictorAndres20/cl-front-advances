export interface AdvancePeriodType {
    uuid?: string,
    created_date: Date | string,
    finished_date?: Date | string,
    name: string,
    enterprise_id: number,
    period_to_finish: string
}