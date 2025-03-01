import {
  View as BaseView,
  type ViewProps as BaseViewProps,
} from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ViewProps = BaseViewProps & {
  lightColor?: string;
  darkColor?: string;
};

const View: React.FC<ViewProps> = ({
  style,
  lightColor,
  darkColor,
  ...otherProps
}) => {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <BaseView style={[{ backgroundColor }, style]} {...otherProps} />;
};

export default View;
