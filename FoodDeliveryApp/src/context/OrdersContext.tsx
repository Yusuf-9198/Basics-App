import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import type { CartItem } from './CartContext';

const ORDERS_KEY = '@foodapp_orders';

export type PlacedOrder = {
  id: string;
  items: CartItem[];
  total: number;
  placedAt: string;
  status: 'confirmed';
};

type OrdersContextValue = {
  orders: PlacedOrder[];
  isLoading: boolean;
  placeOrder: (items: CartItem[], total: number) => Promise<PlacedOrder>;
};

const OrdersContext = createContext<OrdersContextValue | null>(null);

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<PlacedOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      try {
        const stored = await AsyncStorage.getItem(ORDERS_KEY);
        if (stored) {
          try {
            setOrders(JSON.parse(stored) as PlacedOrder[]);
          } catch {
            setOrders([]);
          }
        }
      } finally {
        setIsLoading(false);
      }
    }
    loadOrders();
  }, []);

  const placeOrder = useCallback(async (items: CartItem[], total: number) => {
    const order: PlacedOrder = {
      id: `ord-${Date.now()}`,
      items: items.map((item) => ({ ...item })),
      total,
      placedAt: new Date().toISOString(),
      status: 'confirmed',
    };

    let nextOrders: PlacedOrder[] = [];
    setOrders((prev) => {
      nextOrders = [order, ...prev];
      return nextOrders;
    });
    await AsyncStorage.setItem(ORDERS_KEY, JSON.stringify(nextOrders));
    return order;
  }, []);

  const value = useMemo(
    () => ({ orders, isLoading, placeOrder }),
    [orders, isLoading, placeOrder],
  );

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders must be used within OrdersProvider');
  }
  return context;
}
