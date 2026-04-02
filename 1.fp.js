// Какие принципы нарушены в коде?
// Как исправить?
// Как протестировать?

import createOrderRepository from './createOrderRepository';
import createEmailSender from './createEmailSender';

export const useOrderService = () => {
  const orderRepository = createOrderRepository();
  const emailSender = createEmailSender();

  const createOrder = (order) => {
    orderRepository.create(order);
    emailSender.send(order);
  };

  return { createOrder };
};
