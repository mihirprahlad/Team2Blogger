import { useState, createContext } from "react";

const CartUpdate = createContext();

const CartUpdateProvider = ({ children }) => {
  const [update, setUpdate] = useState(0);
  return (
    <CartUpdate.Provider value={{ update, setUpdate }}>
      {children}
    </CartUpdate.Provider>
  );
};

export default CartUpdateProvider;

export { CartUpdate };