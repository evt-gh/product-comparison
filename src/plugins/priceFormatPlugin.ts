import type { App } from 'vue';

export default {
  install(app: App) {
    const formatPrice = (price: number) =>
      new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        maximumFractionDigits: 0,
      }).format(price);

    app.config.globalProperties.$formatPrice = formatPrice;

    app.provide('formatPrice', formatPrice);
  }
};