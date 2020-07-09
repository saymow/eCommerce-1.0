import { CartManager } from "./cartRelated_types";
import { UserController } from "./userRelated_types";
import { BuyingFlow } from "./buyingFlowRelated_types";

export interface ContextData {
  userController: UserController;
  cartManager: CartManager;
  modalController: {
    showModal: string | boolean;
    setShowModal: (prevState: boolean | string) => void;
  };
  buyingController: BuyingFlow;
}
