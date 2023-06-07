import { FlatList, Text, StyleSheet } from "react-native";
import ExepnseItem from "./ExpenseItem";

function renderExpenseItem(itemData) {
  return <ExepnseItem {...itemData.item} />;
}

function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      renderItem={renderExpenseItem}
    />
  );
}

export default ExpensesList;
