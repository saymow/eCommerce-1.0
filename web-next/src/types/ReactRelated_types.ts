import { FC } from "react";

type ReactFCwithLayout<t = {}> = FC<t> & {
  Layout?: FC;
};

type fallbackNames = "signup";

type ReactFCwithUserCheck = FC & {
  authenticate?: boolean;
  fallback?: FC;
};

type fallbackOptions = {
  [key in fallbackNames]: FC;
};

type ReactFCcustom = ReactFCwithLayout & ReactFCwithUserCheck;

export {
  ReactFCcustom,
  ReactFCwithLayout,
  fallbackNames,
  ReactFCwithUserCheck,
  fallbackOptions,
};
