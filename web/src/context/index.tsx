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
  InitialFlow,
  userAction,
} from "../Helper/contextRelated_helper";

const authContext = createContext(InitialContext);

const AppContext: React.FC = ({ children }) => {
  const [cartData, cartDispatch] = useReducer(
    cartAction,
    InitalCart,
    loadStoragedData
  );
  const [buyingFlow, buyingFlowDispatch] = useReducer(flowAction, InitialFlow);
  const [showModal, setShowModal] = useState<string | boolean>(false);
  const [user, userDispatch] = useReducer(userAction, false);

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
          loggedIn: false,
          user: user ? user : undefined,
          dispatch: userDispatch,
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
          dispatch: buyingFlowDispatch,
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
