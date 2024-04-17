export const centsToDollars = (amount: number): string => {
  return (amount / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}
