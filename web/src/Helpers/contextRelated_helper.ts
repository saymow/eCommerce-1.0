import UserApiManager from "../Services/userApi";

import {
  cartAction,
  loadStoragedData,
  saveCartOnStorage,
  updatePrice,
} from "./cartRelated_helper";

import { flowAction } from "./buyingFlowRelated_helper";
import { userAction } from "./userRelated_helper";
import {
  initialState as modalInitialState,
  modalAction,
} from "./modalRelated_helper";

import { Action as UserAction } from "../Types/userRelated_types";
import { Action as CartAction } from "../Types/cartRelated_types";
import { Action as FlowAction, Steps } from "../Types/buyingFlowRelated_types";
import { Action as ModalAction } from "../Types/modalRelated_types";

import { ContextData } from "../Types/contextRelated_types";

export const InitialContext: ContextData = {
  userController: {
    loggedIn: false,
    user: undefined,
    dispatch: (Action: UserAction) => null,
  },
  UserApi: new UserApiManager(),
  cartManager: {
    totalCartConverted: "",
    totalCart: 0,
    cart: [],
    dispatch: (Action: CartAction) => null,
  },
  modalController: {
    config: modalInitialState,
    dispatch: (Action: ModalAction) => null,
  },
  buyingController: {
    step: 1,
    address: undefined,
    deliveryMethod: undefined,
    dispatch: (Action: FlowAction) => null,
  },
};

export const InitalCart = {
  totalCart: "",
  cart: [],
};

let firstStep: Steps = 1;

export const InitialFlow = {
  step: firstStep,
  deliveryMethod: undefined,
  address: undefined,
};

export {
  cartAction,
  loadStoragedData,
  saveCartOnStorage,
  updatePrice,
  flowAction,
  userAction,
  modalInitialState,
  modalAction,
};
