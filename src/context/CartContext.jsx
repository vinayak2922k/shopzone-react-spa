import React, { createContext, useContext, useReducer, useEffect } from 'react';

/**
 * CartContext — Production-grade useReducer State Machine
 * 
 * Synchronized with localStorage so bag survives hard refresh.
 */

export const CartContext = createContext();

export const CART_STORAGE_KEY = 'shopzone_cart_items';

export function getInitialCartState() {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return { items: parsed };
      }
    }
    return { items: [] };
  } catch (err) {
    console.error('Error reading cart from localStorage', err);
    return { items: [] };
  }
}

export function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { id, quantity = 1 } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      let updatedItems;
      if (existingItem) {
        // Increment quantity of existing item
        updatedItems = state.items.map((item) =>
          item.id === id
            ? { ...item, quantity: (item.quantity || 1) + quantity }
            : item
        );
      } else {
        // Append brand new object to cart
        updatedItems = [
          ...state.items,
          { ...action.payload, quantity: Math.max(1, quantity) }
        ];
      }

      return {
        ...state,
        items: updatedItems
      };
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload)
      };
    }

    case 'UPDATE_QTY': {
      const { id, quantity } = action.payload;
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, quantity) }
            : item
        )
      };
    }

    case 'CLEAR': {
      return {
        ...state,
        items: []
      };
    }

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, getInitialCartState);

  // Sync state to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    } catch (err) {
      console.error('Failed to sync cart state to localStorage', err);
    }
  }, [state.items]);

  // Derived metrics
  const totalQuantity = state.items.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  const totalPrice = state.items.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 1),
    0
  );

  const addItem = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QTY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR' });
  };

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        totalQuantity,
        totalPrice,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        dispatch
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
