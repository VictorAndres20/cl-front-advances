import {
    findAllMessages,
    findMessagesById,
    findAllMessagesPaged,
} from '../../_services/messages.service';

export const findAllMessagesEvent = async () => {
    return await findAllMessages();
}

export const findMessagesByIdEvent = async (id: string) => {
    return await findMessagesById(id);
}

export const findAllMessagesPagedEvent = async (page: number, limit: number = 8) => {
    return await findAllMessagesPaged(page, limit);
}



/** Generated by https://github.com/VictorAndres20 code generator for database, NestJS, React */