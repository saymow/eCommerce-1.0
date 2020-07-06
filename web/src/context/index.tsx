import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from "react";

import {
  cartAction,
  loadStoragedData,
  saveCartOnStorage,
  InitialContext,
  InitalCart,
  updatePrice,
  flowAction,
  InitialFlow
} from "../Helper/contextRelated_helper";

import { User } from "../Types/userRelated_types";

const authContext = createContext(InitialContext);

const AppContext: React.FC = ({ children }) => {
  const [cartData, cartDispatch] = useReducer(cartAction, InitalCart, loadStoragedData);
  const [buyingFlow, buyingFlowDispatch] = useReducer(flowAction, InitialFlow);
  const [showModal, setShowModal] = useState<string | boolean>(false);
  const [user, setUser] = useState<User | false>(false);

  useEffect(() => {
    return updatePrice(cartDispatch);
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
          dispatch: cartDispatch,
        },
        buyingController: {
          step: buyingFlow.step,
          deliveryMethod: buyingFlow.deliveryMethod,
          address: buyingFlow.address,
          dispatch: buyingFlowDispatch
        }
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
