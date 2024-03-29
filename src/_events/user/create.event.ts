import {
    createUser,
    editUser,
    editPasswordUser
} from '../../_services/user.service';
import { validateUser } from './model';
import { UserType } from './type';

export const createUserEvent = async (body: UserType) => {
    validateUser(body);
    return await createUser(body);
}

export const editUserEvent = async (id: string, body: UserType) => {
    validateUser(body);
    return await editUser(id, body);
}

export const editPasswordUserEvent = async (id: string, body: UserType) => {
    return await editPasswordUser(id, body);
}



/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */