import { defineStore } from 'pinia';

export interface Product {
  id: string;
  name: string;
  image: string;
  company: string;
  year: number;
  screenDiagonal: number;
  country: string;
  memory: number;
  screenRefreshRate: number;
  NFC: boolean;
  eSIM: boolean;
  wirelessCharging: boolean;
  cost: number;
}

export const useComparisonStore = defineStore('comparison', {
  state: () => ({
    products: [
      {
        id: 'phone1',
        name: 'Apple iPhone 12',
        image: '/images/phone-1.png',
        company: 'Apple',
        year: 2020,
        screenDiagonal: 6.1,
        country: 'Китай',
        memory: 128,
        screenRefreshRate: 60,
        NFC: false,
        eSIM: true,
        wirelessCharging: true,
        cost: 81990,
      },
      {
        id: 'phone2',
        name: 'Xiaomi Mi 11 Life',
        image: '/images/phone-2.png',
        company: 'Xiaomi',
        year: 2021,
        screenDiagonal: 6.55,
        country: 'Китай',
        memory: 128,
        screenRefreshRate: 90,
        NFC: true,
        eSIM: true,
        wirelessCharging: false,
        cost: 27490,
      },
      {
        id: 'phone3',
        name: 'Samsung Galaxy A72',
        image: '/images/phone-3.png',
        company: 'Samsung',
        year: 2021,
        screenDiagonal: 6.7,
        country: 'Вьетнам',
        memory: 128,
        screenRefreshRate: 90,
        NFC: true,
        eSIM: false,
        wirelessCharging: true,
        cost: 32890,
      },
      {
        id: 'phone4',
        name: 'Samsung Galaxy S21',
        image: '/images/phone-4.png',
        company: 'Samsung',
        year: 2021,
        screenDiagonal: 6.2,
        country: 'Вьетнам',
        memory: 128,
        screenRefreshRate: 120,
        NFC: true,
        eSIM: true,
        wirelessCharging: true,
        cost: 69990,
      },
      {
        id: 'phone5',
        name: 'Apple iPhone Xr',
        image: '/images/phone-5.png',
        company: 'Apple',
        year: 2018,
        screenDiagonal: 6.1,
        country: 'Китай',
        memory: 64,
        screenRefreshRate: 60,
        NFC: true,
        eSIM: true,
        wirelessCharging: true,
        cost: 42990,
      },
      {
        id: 'phone6',
        name: 'Realme 8 Pro',
        image: '/images/phone-6.png',
        company: 'Realme',
        year: 2021,
        screenDiagonal: 6.4,
        country: 'Китай',
        memory: 128,
        screenRefreshRate: 60,
        NFC: true,
        eSIM: false,
        wirelessCharging: false,
        cost: 24990,
      },
      {
        id: 'phone7',
        name: 'Google Pixel 6',
        image: '/images/phone-7.jpg',
        company: 'Google',
        year: 2021,
        screenDiagonal: 6.4,
        country: 'Китай',
        memory: 128,
        screenRefreshRate: 90,
        NFC: true,
        eSIM: true,
        wirelessCharging: true,
        cost: 59990,
      },
      {
        id: 'phone8',
        name: 'OnePlus 9 Pro',
        image: '/images/phone-8.jpeg',
        company: 'OnePlus',
        year: 2021,
        screenDiagonal: 6.7,
        country: 'Китай',
        memory: 256,
        screenRefreshRate: 120,
        NFC: true,
        eSIM: false,
        wirelessCharging: true,
        cost: 64990,
      }
    ] as Product[],
    parametersNames: {
      id: 'ID',
      name: 'Название',
      image: 'Изображение',
      company: 'Производитель',
      year: 'Год релиза',
      screenDiagonal: 'Диагональ экрана (дюйм)',
      country: 'Страна-производитель',
      memory: 'Объём памяти',
      screenRefreshRate: 'Частота обновления экрана',
      NFC: 'NFC',
      eSIM: 'Поддержка eSIM',
      wirelessCharging: 'Поддержка беспроводной зарядки',
      cost: 'Стоимость',
    } as Record<string, string>,
  }),
});
