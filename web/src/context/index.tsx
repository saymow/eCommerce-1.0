import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
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
} from "../Helper/contextRelated_helper";

import UserApiManager from "../Services/userApi";

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

  const loggedWhenMounted = useRef(Boolean(user)).current;
  const UserApi = useMemo(() => new UserApiManager(loggedWhenMounted), [
    loggedWhenMounted,
  ]);

  useEffect(() => {
    (async function signIn() {
      const response = await UserApi.validifyToken();

      if (!response) return;
      const { email, name } = response;

      userDispatch({
        type: "set-user",
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
          loggedIn: Boolean(user),
          user: user ? user : undefined,
          dispatch: userDispatch,
        },
        UserApi,
        modalController: {
          showModal,
          setShowModal,
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

export function useGlobalState() {
  const context = useContext(authContext);

  return context;
}

export default AppContext;
