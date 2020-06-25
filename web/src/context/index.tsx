import React, { createContext, useContext, useState, useEffect } from "react";

interface ContextData {
  cartManager: CartManager;
}

interface CartManager {
  totalCart: string;
  cart: Product[];
  addProductToCart: (product: Product) => void;
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
    totalCart: "",
  },
});

const AppContext: React.FC = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [totalCart, setTotalCart] = useState("");

  useEffect(() => {
    function loadData() {
      let cartManaager = localStorage.getItem("@cartData");

      if (cartManaager) {
        let cartParsed: CartManager = JSON.parse(cartManaager);
        if (cartParsed.cart) setCart(cartParsed.cart);
      }
    }
    loadData();
  }, []);

  function saveData() {
    localStorage.setItem(
      "@cartData",
      JSON.stringify({
        cart,
        totalCart,
      })
    );
  }

  useEffect(() => {
    let total = cart.reduce((accumulator, item) => {
      let priceParsed = item.price.replace(",", ".");
      return (
        accumulator + parseFloat(priceParsed) * (item.qntd ? item.qntd : 1)
      );
    }, 0.0).toFixed(2);
    setTotalCart(total);
  }, [cart]);

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
        cartManager: { cart, addProductToCart, totalCart },
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
