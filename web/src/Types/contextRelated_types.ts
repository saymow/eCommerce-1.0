import UserApiManager from "../Services/userApi";

import { CartManager } from "./cartRelated_types";
import { UserController } from "./userRelated_types";
import { CartState } from "./buyingFlowRelated_types";
import { Data, Action } from "./modalRelated_types";

export interface ContextData {
  userController: UserController;
  UserApi: UserApiManager;
  cartManager: CartManager;
  modalController: {
    config: Data;
    dispatch: (action: Action) => void;
  };
  buyingController: CartState;
}
