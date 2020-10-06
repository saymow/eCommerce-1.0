import { Dispatch } from "react";

import { CartData, Action, Product } from "../types/cartRelated_types";
import { priceFormater } from "../utils/formaters";

export function cartAction(state: CartData, action: Action): CartData {
  switch (action.type) {
    case "add-product":
      const productAlreadyInCart = state.cart.some(
        (item) => item.id === action.payload.id
      );

      if (productAlreadyInCart) {
        const newCart = state.cart.map((item) =>
          item.id !== action.payload.id
            ? item
            : { ...item, qntd: item.qntd + action.payload.qntd }
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
      let total = state.cart.reduce((accumulator, item) => {
        return accumulator + item.price * (item.qntd ? item.qntd : 1);
      }, 0);

      return {
        ...state,
        totalCart: total,
        totalCartConverted: priceFormater(total),
      };

    case "reset-cart": {
      return {
        cart: [],
        totalCart: 0,
        totalCartConverted: "",
      };
    }

    default:
      return state;
  }
}

export function loadStoragedData() {
  try {
    const loadedStorage = localStorage.getItem("@CartData:");

    if (!loadedStorage) {
      throw new Error("empty local storage");
    }

    const data: CartData = JSON.parse(loadedStorage);

    if (!(data.cart && data.totalCart && data.totalCartConverted)) {
      localStorage.removeItem("@CartData:");
      throw new Error("malformated local storage");
    }

    return data;
  } catch {
    return {
      totalCartConverted: "",
      totalCart: 0,
      cart: [],
    };
  }
}

export function saveCartOnStorage(cartData: CartData) {
  const { cart, totalCart, totalCartConverted } = cartData;
  localStorage.setItem(
    "@CartData:",
    JSON.stringify({
      totalCartConverted,
      cart,
      totalCart,
    })
  );
}

export function updatePrice(dispatch: Dispatch<Action>) {
  dispatch({
    type: "refresh-totalCart",
  });
}
