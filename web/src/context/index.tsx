import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from "react";

import {
  action,
  loadStoragedData,
  saveCartOnStorage,
  InitialContext,
  InitalCart,
  updatePrice,
} from "../Helper/contextRelated_helper";

import { User } from "../Types/userRelated_types";

const authContext = createContext(InitialContext);

const AppContext: React.FC = ({ children }) => {
  const [cartData, dispatch] = useReducer(action, InitalCart, loadStoragedData);
  const [showModal, setShowModal] = useState<string | boolean>(false);
  const [user, setUser] = useState<User | false>(false);

  useEffect(() => {
    return updatePrice(dispatch);
  }, [cartData.cart]);

  useEffect(() => {
    saveCartOnStorage(cartData);
  }, [cartData]);

  return (
    <authContext.Provider
      value={{
        userController: {
          loggedIn: true,
          user: undefined,
        },
        modalController: {
          showModal,
          setShowModal,
        },
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
