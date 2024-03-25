export const buildTZDate = (date: Date | string): string => {
    if(typeof date !== 'string') date = date.toDateString();
    return new Date(date).toLocaleString('en-GB', { timeZone: 'America/Bogota' });
}