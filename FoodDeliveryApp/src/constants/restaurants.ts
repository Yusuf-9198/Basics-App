export type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  price: number;
  rating: number;
  deliveryTime: string;
  image: string;
};

export const RESTAURANTS: Restaurant[] = [
  {
    id: '123',
    name: 'Spice Garden',
    cuisine: 'Indian',
    price: 12.99,
    rating: 4.7,
    deliveryTime: '25-30 min',
    image: '🍛',
  },
  {
    id: '456',
    name: 'Burger Hub',
    cuisine: 'American',
    price: 9.49,
    rating: 4.5,
    deliveryTime: '20-30 min',
    image: '🍔',
  },
  {
    id: '789',
    name: 'Sushi Zen',
    cuisine: 'Japanese',
    price: 18.99,
    rating: 4.9,
    deliveryTime: '30-40 min',
    image: '🍣',
  },
  {
    id: '101',
    name: 'Pizza Palace',
    cuisine: 'Italian',
    price: 14.5,
    rating: 4.6,
    deliveryTime: '25-35 min',
    image: '🍕',
  },
];

export function getRestaurantById(id: string): Restaurant | undefined {
  return RESTAURANTS.find((r) => r.id === id);
}
