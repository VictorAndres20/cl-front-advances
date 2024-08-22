import { BankType } from "../bank/type";

export interface BankMessages {
    cod: string,
    message: string,
    bank: string | BankType,
}