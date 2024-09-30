import { EmployeeExcelType, EmployeeType } from "./type";

export const validateEmployee = (body: EmployeeType) => {
    const { name, id, phone, salary, password, state, 
        range, bank, bank_account_type, bank_account_number } = body;
    if(name === '' || name === undefined) throw new Error(`Nombre vacío`);
    if(id === '' || id === undefined) throw new Error(`ID vacío`);
    if(phone === '' || phone === undefined) throw new Error(`Teléfono vacío`);
    if(salary === 0 || salary === undefined) throw new Error(`Salario vacío`);
    if(! body.uuid && (password === '' || password === undefined)) throw new Error(`Contraseña vacío`);
    if(state === undefined) throw new Error(`Estado vacío`);
    if(range === '' || range === undefined) throw new Error(`Rango asociado vacío`);
    if(bank === '' || bank === undefined) throw new Error(`Banco asociado vacío`);
    if(bank_account_type === '' || bank_account_type === undefined) throw new Error(`Tipo de cuenta vacío`);
    if(bank_account_number === '' || bank_account_number === undefined || bank_account_number === null) throw new Error(`Número de cuenta vacío`);
}

export const transformEntityEmployee = (entity: EmployeeType) => {
    let newEnt = {...entity}
    delete newEnt.password;
    if(typeof newEnt.range === 'object') newEnt.range = newEnt.range?.uuid;
    if(typeof newEnt.bank === 'object') newEnt.bank = newEnt.bank?.cod;
    if(newEnt.bank_account_type && typeof newEnt.bank_account_type === 'object') newEnt.bank_account_type = newEnt.bank_account_type?.cod;
    if(newEnt.fintech && typeof newEnt.fintech === 'object') newEnt.fintech = newEnt.fintech?.cod;
    return newEnt;
}

export const buildEmptyEmployee = (): EmployeeType => {
    return {
        uuid: '',
        name: '',
        id: '',
        phone: '',
        salary: 0,
        password: '',
        state: 1,
        range: '',
        bank: '',
        bank_account_type: '',
        bank_account_number: '',
    };
}

export const buildEmployeeFromExcel = (employeeExcel: EmployeeExcelType): EmployeeType => {
    return {
        uuid: '',
        name: employeeExcel.NOMBRE,
        id: employeeExcel.CEDULA,
        phone: employeeExcel.TELEFONO,
        salary: employeeExcel.SALARIO_QUNCENAL && ! isNaN(Number(employeeExcel.SALARIO_QUNCENAL)) ? Number(employeeExcel.SALARIO_QUNCENAL) : 0,
        password: '',
        state: 1,
        range: '',
        bank: employeeExcel.BANCO,
        bank_account_type: employeeExcel.TIPO_CUENTA_BANCO,
        bank_account_number: employeeExcel.NUMERO_CUENTA_BANCO,
        fintech: employeeExcel.PLATAFORMA_FINANCIERA ?? undefined,
        fintech_account_number: employeeExcel.NUMERO_PLATAFORMA_FINANCIERA ?? undefined,
    };
}



/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */