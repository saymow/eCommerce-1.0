import SignUp from "pages/signup";

import {
  fallbackOptions,
  ReactFCwithUserCheck,
  fallbackNames,
} from "types/ReactRelated_types";

const Fallbacks: fallbackOptions = {
  signup: SignUp,
};

export default function withUserCheck(
  component: ReactFCwithUserCheck,
  fallback: fallbackNames = "signup"
): ReactFCwithUserCheck {
  component.authenticate = true;

  component.fallback = Fallbacks[fallback];

  return component;
}
