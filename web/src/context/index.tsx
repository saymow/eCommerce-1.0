import React, { createContext, useContext, useState } from "react";

interface ContextData {
  cartManager: {
    totalCart: number;
    setTotalCart: (total: number) => void;
    cart: Product[];
    addProductToCart: (product: Product) => void;
  };
}

interface Product {
  id: number;
  name: string;
  image: string;
  price: string;
  qntd?: number;
}

const authContext = createContext<ContextData>({
  cartManager: {
    cart: [],
    addProductToCart: () => null,
    totalCart: 0,
    setTotalCart: () => null,
  },
});

const AppContext: React.FC = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [totalCart, setTotalCart] = useState(0);

  function addProductToCart(product: Product) {
    const productAlreadyInCart = cart.some((item) => item.id === product.id);

    if (productAlreadyInCart) {
      const newCart = cart.map((item) =>
        item.id !== product.id
          ? item
          : { ...item, qntd: item.qntd ? item.qntd + 1 : 1 }
      );

      return setCart(newCart);
    }
    setCart([...cart, { ...product, qntd: 1 }]);
  }

  return (
    <authContext.Provider
      value={{
        cartManager: { cart, addProductToCart, totalCart, setTotalCart },
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export function useGlobalState() {
  const context = useContext(authContext);

  return context;
}

export default AppContext;
