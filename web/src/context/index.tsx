import React, { createContext, useContext, useEffect, useReducer } from "react";

interface ContextData {
  cartManager: CartManager;
}

interface CartData {
  totalCart: string;
  cart: Product[];
}

interface CartManager extends CartData {
  dispatch: (arg0: Action) => void;
}

interface Product {
  id: number;
  name: string;
  image: string;
  price: string;
  qntd: number;
}

const authContext = createContext<ContextData>({
  cartManager: {
    totalCart: "",
    cart: [],
    dispatch: (Action) => null,
  },
});

type Action =
  | { type: "add-product"; payload: Product }
  | { type: "delete-product"; payload: { id: number } }
  | { type: "refresh-totalCart" };

function action(state: CartData, action: Action): CartData {
  switch (action.type) {
    case "add-product":
      const productAlreadyInCart = state.cart.some(
        (item) => item.id === action.payload.id
      );

      if (productAlreadyInCart) {
        const newCart = state.cart.map((item) =>
          item.id !== action.payload.id
            ? item
            : { ...item, qntd: item.qntd + 1 }
        );

        return { ...state, cart: newCart };
      }

      return { ...state, cart: [...state.cart, action.payload] };

    case "delete-product":
      const newCart = state.cart.reduce((accumulator: Product[], item) => {
        if (item.id !== action.payload.id) return [...accumulator, item];

        if (item.qntd > 1) {
          return [
            ...accumulator,
            {
              ...item,
              qntd: item.qntd - 1,
            },
          ];
        }

        return accumulator;
      }, []);

      return {
        ...state,
        cart: newCart,
      };

    case "refresh-totalCart":
      let total = state.cart
        .reduce((accumulator, item) => {
          let priceParsed = item.price.replace(",", ".");
          return (
            accumulator + parseFloat(priceParsed) * (item.qntd ? item.qntd : 1)
          );
        }, 0.0)
        .toFixed(2);

      return { ...state, totalCart: total };

    default:
      return state;
  }
}

const AppContext: React.FC = ({ children }) => {
  const [cartData, dispatch] = useReducer(action, {
    totalCart: "",
    cart: [],
  });

  useEffect(() => {
    dispatch({
      type: "refresh-totalCart",
    });
  }, [cartData.cart]);

  return (
    <authContext.Provider
      value={{
        cartManager: {
          cart: cartData.cart,
          totalCart: cartData.totalCart,
          dispatch,
        },
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
