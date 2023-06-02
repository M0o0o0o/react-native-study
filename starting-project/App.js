import { TextInput } from "react-native";
import { StyleSheet, Text, View, Button } from "react-native";

export default function App() {
  return (
    <View style={styles.appConatiner}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.textInput} placeholder="Your course goal!" />
        <Button title="Add Goal" />
      </View>
      <View>
        <Text>List of goals</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appConatiner: {
    padding: 50,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    // 이렇게 설정하면 textInput 스타일이 적용된 요소가 사용할 수 있는 너비의 80%를 차지한다.
    // 사용할 수 있는 너비는 해당 요소를 담고 있는 컨테이너가 정의
    width: "80%",
    marginRight: 8,
    padding: 8,
  },
});
/**
 * View - 다른 컴포넌를 담고 배치하는 컴포넌트
 *
 * styling - inline, styleSheet
 * - RN은 CSS와 최대한 비슷한 형식을 유지한다.
 * Flexbox
 * - 모든 View에서 Flexbox가 이미 활성화
 */
