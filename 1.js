// Какие принципы нарушены в коде?
// Как исправить?
// Как протестировать?

import OrderRepository from './OrderRepository';
import EmailSender from './EmailSender';

class OrderService {
  constructor() {
    this.orderRepository = new OrderRepository();
    this.emailSender = new EmailSender();
  }

  createOrder(order) {
    this.orderRepository.create(order);
    this.emailSender.send(order);
  }
}
