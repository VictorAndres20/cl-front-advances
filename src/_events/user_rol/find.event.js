import {
    findAllUserRol,
    findUserRolById,
    findAllUserRolPaged,
} from '../../_services/user_rol.service';

export const findAllUserRolEvent = async () => {
    return await findAllUserRol();
}

export const findUserRolByIdEvent = async (id) => {
    return await findUserRolById(id);
}

export const findAllUserRolPagedEvent = async (page, limit = 8) => {
    return await findAllUserRolPaged(page, limit);
}



/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */