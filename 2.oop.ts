class Payment {
  constructor(public amount: number, public date: Date) {}
  
  process(): string {
    return `Обработка платежа на сумму ${this.amount} руб.`;
  }
}

class CardPayment extends Payment {
  constructor(amount: number, date: Date, public cardNumber: string) {
    super(amount, date);
  }
  
  process(): string {
    return `Оплата картой ${this.cardNumber.slice(-4)}: ${this.amount} руб.`;
  }
  
  refund(): string {
    return `Возврат ${this.amount} руб. на карту ${this.cardNumber.slice(-4)}`;
  }
}

class CryptoPayment extends Payment {
  constructor(amount: number, date: Date, public walletAddress: string) {
    super(amount, date);
  }
  
  process(): string {
    return `Оплата криптовалютой с кошелька ${this.walletAddress.slice(0, 6)}...: ${this.amount} руб.`;
  }
  
  confirmTransaction(): string {
    return `Транзакция подтверждена в блокчейне`;
  }
}

const payments: Payment[] = [
  new CardPayment(1000, new Date(), '1234-5678-9012-3456'),
  new CryptoPayment(500, new Date(), '0xABCDEF123456'),
  new Payment(300, new Date())
];

function processPayments(paymentsList: Payment[]): void {
  paymentsList.forEach((payment, index) => {
    if (payment instanceof CardPayment) {
      payment.refund();
    } 

    const сryptoPayment = payment as CryptoPayment;
    сryptoPayment.confirmTransaction()
    
    if ('walletAddress' in payment) {
      console.log(`Кошелек: ${(payment as CryptoPayment).walletAddress}`);
    }
  });
}

processPayments(payments);
