import { Address } from "./buyingFlowRelated_types";
import { UserDetailed } from "./userRelated_types";

export type availableOptions =
  | "closed"
  | "error"
  | "cart"
  | "create-address"
  | "update-address"
  | "update-user";

export interface Data {
  name: availableOptions;
  cb?: (succeed: boolean) => Promise<void> | void | null;
  payload: any;
}

export type Action =
  | { type: "closed" }
  | {
      type: "error";
      payload: { title: string; message: string };
      cb?: () => void;
    }
  | { type: "cart" }
  | { type: "create-address"; cb: (succeed: boolean) => Promise<void> | void }
  | {
      type: "update-address";
      payload: { address: Address };
      cb: (succeed: boolean) => Promise<void> | void;
    }
  | {
      type: "update-user";
      payload: { user: UserDetailed };
      cb: (succeed: boolean) => Promise<void> | void;
    };
