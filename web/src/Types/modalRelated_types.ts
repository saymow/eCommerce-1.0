import { Address } from "./buyingFlowRelated_types";

export type availableOptions =
  | "closed"
  | "cart"
  | "create-address"
  | "update-address";

export interface Data {
  name: availableOptions;
  cb?: (succeed: boolean) => Promise<void> | null;
  payload: any;
}

export type Action =
  | { type: "closed" }
  | { type: "cart" }
  | { type: "create-address"; cb: (succeed: boolean) => Promise<void> }
  | {
      type: "update-address";
      payload: { address: Address };
      cb: (succeed: boolean) => Promise<void>;
    };
