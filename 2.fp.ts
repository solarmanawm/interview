type PaymentType = 'card' | 'crypto' | 'base'

interface Payment {
  type: PaymentType;
  amount: number;
}

interface CardPayment extends Payment {
  type: 'card';
  cardNumber: string;
  refund(): string;
}

interface CryptoPayment extends Payment {
  type: 'crypto';
  walletAddress: string;
  confirmTransaction(): string;
}

const createBasePayment = (amount: number): Payment => ({
  type: 'base',
  amount,
});

const createCardPayment = (amount: number, cardNumber: string): CardPayment => ({
  type: 'card',
  amount,
  cardNumber,
  refund: function() {
    return `Возврат ${this.amount} руб. на карту ${this.cardNumber.slice(-4)}`;
  }
});

const createCryptoPayment = (amount: number, walletAddress: string): CryptoPayment => ({
  type: 'crypto',
  amount,
  walletAddress,
  confirmTransaction: function() {
    return `Транзакция подтверждена в блокчейне`;
  }
});

const payments: Payment[] = [
  createCardPayment(1000, '1234-5678-9012-3456'),
  createCryptoPayment(500, '0xABCDEF123456'),
  createBasePayment(300),
];

function processPayments(paymentsList: Payment[]): void {
  paymentsList.forEach((payment) => {
    if (payment.type === 'card') {
      payment.refund();
    }

    const cryptoPayment = payment as CryptoPayment;
    cryptoPayment.confirmTransaction()

    if ('walletAddress' in payment) {
      console.log(`Кошелек: ${(payment as CryptoPayment).walletAddress}`);
    }
  });
}

processPayments(payments);
