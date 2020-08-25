export interface Data {
  name: string;
  cb?: (succeed: boolean) => Promise<void> | null;
}

export type Action =
  | { type: "closed" }
  | { type: "cart" }
  | { type: "create-address"; cb: (succeed: boolean) => Promise<void> };
