// Какие принципы нарушены в коде?
// Как исправить?
// Как протестировать?

import createRepository from './createRepository';
import createEmailSender from './createEmailSender';

export const useOrderService = () => {
  const repository = createRepository();
  const emailSender = createEmailSender();

  const createOrder = (order) => {
    repository.create(order);
    emailSender.send(order);
  };

  return { createOrder };
};
