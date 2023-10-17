import { StyleSheet, View, Button, FlatList } from "react-native";
import { useState } from "react";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";
import uuid from "react-native-uuid";
import { StatusBar } from "expo-status-bar";

/**
 * inner container can get height when outer container has enough height
 */
export default function App() {
  const [goals, setGoals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  function startAddGoalHandler() {
    setModalVisible(true);
  }

  function endAddGoalHandler() {
    setModalVisible(false);
  }

  function addGoalHandler(enteredGoalText) {
    setGoals((currentGoals) => [
      ...currentGoals,
      { text: enteredGoalText, key: uuid.v4() },
    ]);

    endAddGoalHandler();
  }

  function deleteGoalHandler(id) {
    setGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.key !== id);
    });
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appConatiner}>
        <Button
          title="Add new Goal"
          color="#ffffff"
          onPress={startAddGoalHandler}
        />
        {/* modalVisible */}
        {modalVisible && (
          <GoalInput
            onAddGoal={addGoalHandler}
            visible={modalVisible}
            onCancel={endAddGoalHandler}
          />
        )}
        <View style={styles.goalsContainer}>
          <FlatList // key 프로퍼티는 렌더링되는 항목에 자동으로 사용된다.
            data={goals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  id={itemData.item.key}
                  onDeleteItem={deleteGoalHandler}
                />
              );
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appConatiner: {
    paddingTop: 50,
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: "#1e085a",
  },
  goalsContainer: {
    flex: 5,
  },
});
/**
 * View - 다른 컴포넌를 담고 배치하는 컴포넌트
 *
 * styling - inline, styleSheet
 * - RN은 CSS와 최대한 비슷한 형식을 유지한다. (스타일 상속 및 연속적인 속성 적용 X)
 *
 * Flexbox
 * - 모든 View에서 Flexbox가 이미 활성화
 *
 * ScrollView vs FlatList
 *
 * Button
 * - 스타일을 커스텀하려면 Text, View Pressable로
 */
