import {
    findAllAdvance,
    findAdvanceById,
    findAllAdvancePaged,
    findAllAdvanceByEmployeePaged,
    findAllAdvanceByEnterprise,
    findAllPendingAdvanceByEnterprise,
    pdfAdvanceById
} from '../../_services/advance.service';

export const findAllAdvanceEvent = async () => {
    return await findAllAdvance();
}

export const findAdvanceByIdEvent = async (id: string) => {
    return await findAdvanceById(id);
}

export const findAllAdvancePagedEvent = async (page: number, limit: number = 8) => {
    return await findAllAdvancePaged(page, limit);
}

export const findAllAdvanceByEmployeePagedEvent = async (page: number, limit: number = 8, employee: string) => {
    return await findAllAdvanceByEmployeePaged(page, limit, employee);
}

export const findAllAdvanceByEnterpriseEvent = async (enterprise: number) => {
    return await findAllAdvanceByEnterprise(enterprise);
}

export const findAllPendingAdvanceByEnterpriseEvent = async (enterprise: number) => {
    return await findAllPendingAdvanceByEnterprise(enterprise);
}

export const pdfAdvanceByIdEvent = async (id: string) => {
    return await pdfAdvanceById(id);
}


/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */