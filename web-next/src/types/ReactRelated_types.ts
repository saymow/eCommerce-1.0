import { FC } from "react";

type ReactFCwithLayout<t = {}> = FC<t> & {
  Layout?: FC;
};

export { ReactFCwithLayout };
