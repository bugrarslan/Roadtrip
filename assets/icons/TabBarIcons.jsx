import { MaterialIcons } from "@expo/vector-icons";

export const icons = {
  "(home)": (props) => (
    <MaterialIcons name="flight" size={26} color="black" {...props} />
  ),
  discover: (props) => (
    <MaterialIcons name="search" size={26} color="black" {...props} />
  ),
  profile: (props) => (
    <MaterialIcons name="person" size={26} color="black" {...props} />
  ),
};
