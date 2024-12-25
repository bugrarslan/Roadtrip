import { MaterialIcons } from "@expo/vector-icons";
import Icon from "./index";

export const icons = {
  "(home)": (props) => (
    <Icon name={"plane"} color="black" {...props} />
  ),
  discover: (props) => (
    <Icon name={"search"} color="black" {...props} />
  ),
  profile: (props) => (
    <Icon name={"user"} color="black" {...props} />
  ),
};
