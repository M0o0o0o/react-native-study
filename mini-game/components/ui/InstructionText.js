import { Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
function InstrunctionText({ children, style }) {
  return <Text style={[styles.instrunctionText, style]}>{children}</Text>;
}

export default InstrunctionText;

const styles = StyleSheet.create({
  instrunctionText: {
    fontFamily: "open-sans",
    color: Colors.accent500,
    fontSize: 24,
  },
});
