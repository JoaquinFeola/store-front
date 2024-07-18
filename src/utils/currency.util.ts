export const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat('es-ar', {
      style: 'currency',
      currency: currency
    }).format(value);
  }