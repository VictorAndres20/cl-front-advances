export const buildTZDate = (date: Date | string): string => {
    if(typeof date !== 'string') date = date.toDateString();
    return new Date(date).toLocaleString('en-GB', { timeZone: 'America/Bogota' });
}

export const getNowUTCString = () => new Date().toUTCString();

export const buildDateByUTCString = (utcString: string) => new Date(utcString); 