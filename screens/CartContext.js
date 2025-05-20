import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);

  // Cart Functions
  const addToCart = (product, quantity ) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.maSanPham === product.maSanPham);
      if (existing) {
        return prev.map(item =>
          item.product.maSanPham === product.maSanPham
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { product, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.product.maSanPham !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const updateCartItemQuantity = (productId, newQuantity) => {
    setCartItems(prev =>
      prev.map(item =>
        item.product.maSanPham === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Favorite Functions
  const addToFavorite = (product) => {
    setFavoriteItems(prev => {
      const exists = prev.some(item => item.maSanPham === product.maSanPham);
      return exists ? prev : [...prev, product];
    });
  };

  const removeFromFavorite = (productId) => {
    setFavoriteItems(prev => prev.filter(item => item.maSanPham !== productId));
  };

  const clearFavorites = () => {
    setFavoriteItems([]);
  };

  // Utility Functions
  const isInCart = (productId) => {
    return cartItems.some(item => item.product.maSanPham === productId);
  };

  const isFavorite = (productId) => {
    return favoriteItems.some(item => item.maSanPham === productId);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        favoriteItems,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        addToFavorite,
        removeFromFavorite,
        clearFavorites,
        isInCart,
        isFavorite,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
