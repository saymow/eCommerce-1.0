import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
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
  modalAction,
  modalInitialState,
} from "../helpers/contextRelated_helper";

import UserApiManager from "../services/userApi";

const authContext = createContext(InitialContext);

const AppContext: React.FC = ({ children }) => {
  const [cartData, cartDispatch] = useReducer(
    cartAction,
    InitalCart,
    loadStoragedData
  );
  const [buyingFlow, buyingFlowDispatch] = useReducer(flowAction, InitialFlow);
  const [modalConfig, modalDispatcher] = useReducer(
    modalAction,
    modalInitialState
  );

  const [user, userDispatch] = useReducer(userAction, undefined);

  const UserApi = useMemo(() => new UserApiManager(), []);
  const loggedIn = useMemo(() => (user === undefined || user ? true : false), [
    user,
  ]);

  useEffect(() => {
    (async function autoSignIn() {
      if (!UserApi.retrieveToken()) {
        return userDispatch({ type: "unset-loggedIn" });
      }

      const response = await UserApi.validifyToken();

      if (!response) {
        return userDispatch({ type: "unset-loggedIn" });
      }

      const { email, name } = response;

      userDispatch({
        type: "set-loggedIn",
        payload: {
          email: email,
          name: name,
        },
      });
    })();
  }, [UserApi]);

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
          loggedIn,
          user: user ? user : undefined,
          dispatch: userDispatch,
        },
        UserApi,
        modalController: {
          config: modalConfig,
          dispatch: modalDispatcher,
        },
        cartManager: {
          cart: cartData.cart,
          totalCart: cartData.totalCart,
          totalCartConverted: cartData.totalCartConverted,
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

export { useNotificationContext } from "./notification";

export function useGlobalState() {
  const context = useContext(authContext);

  return context;
}

export default AppContext;
