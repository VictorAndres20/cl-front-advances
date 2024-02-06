const USDFormater = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export const formatToUSD = (value) => {
    return USDFormater.format(value)
}