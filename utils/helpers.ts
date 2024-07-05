// Utility function to format currency
export const formatCurrency = (amount: number, currency?:string): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'USD',
    minimumFractionDigits: 2,
  }).format(amount / 100)
}
