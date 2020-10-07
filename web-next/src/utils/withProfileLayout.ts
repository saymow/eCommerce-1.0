import { ReactFCwithLayout } from "types/ReactRelated_types";
import ProfileLayout from "components/ProfileLayout";

export default function withProfileLayout(component: ReactFCwithLayout) {
  component.Layout = ProfileLayout;

  return component;
}
