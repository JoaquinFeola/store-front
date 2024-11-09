export const formatCurrency = (value: number, currency: string) => {
	return new Intl.NumberFormat('es-ar', {
		style: 'currency',
		currency: currency
	}).format(value);
}

export const formatToInteger = (value: string) => {
	const cleanedValue = value.replace(/[^\d]/g, '');
	const number = parseFloat(cleanedValue);

	return {
		formatted: new Intl.NumberFormat('de-DE').format(number),
		numericValue: number
	}
}

export const formatToDecimal = (value: string): string => {
	const cleanedValue = value.replace(/[^\d]/g, '');
	const numericValue = cleanedValue.replace(/,/g, '.');
	const number = parseFloat(numericValue);


	return new Intl.NumberFormat('de-DE', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
		style: 'decimal',
		compactDisplay: 'long',
		notation: 'standard',

	}).format(number);
}


export const parseFormattedValue = (value: string): number | null => {
	const numericValue = value.replace(/\./g, '').replace(',', '.');
	const number = parseFloat(numericValue);
	return isNaN(number) ? 0 : number;
}

