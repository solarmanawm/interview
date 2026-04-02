type CustomerType = 'regular' | 'silver' | 'gold';

class DiscountCalculator {
  calculateDiscount(customerType: CustomerType, amount: number): number {
    if (customerType === 'regular') {
      return amount * 0.05; // 5% скидка
    } else if (customerType === 'silver') {
      return amount * 0.10; // 10% скидка
    } else if (customerType === 'gold') {
      return amount * 0.20; // 20% скидка
    }
    return 0;
  }
}
