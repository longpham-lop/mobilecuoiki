import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { product, quantity }];
      }
    });
  };

  const addToFavorite = (product) => {
    setFavoriteItems(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) return prev; 
      return [...prev, product];
    });
  };

  const removeFromFavorite = (productId) => {
    setFavoriteItems(prev => prev.filter(item => item.id !== productId));
  };
  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  return (
    <CartContext.Provider value={{ cartItems, favoriteItems, addToCart, addToFavorite, removeFromFavorite,removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
