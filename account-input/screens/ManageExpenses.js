import { useNavigation } from "@react-navigation/native";
import { useContext, useLayoutEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";

function ManageExpenses({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const expensesCtx = useContext(ExpensesContext);

  const editedExpendseId = route.params?.expenseId;
  const isEditing = !!editedExpendseId;

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpendseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsSubmitting(true);
    await deleteExpense(editedExpendseId);
    expensesCtx.deleteExpense(editedExpendseId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    if (isEditing) {
      setIsSubmitting(true);
      expensesCtx.updateExpense(editedExpendseId, expenseData);
      await updateExpense(editedExpendseId, expenseData);
    } else {
      setIsSubmitting(true);
      const id = await storeExpense(expenseData);
      expensesCtx.addExpense({ ...expenseData, id: id });
    }
    navigation.goBack();
  }

  if (isSubmitting) return <LoadingOverlay />;

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={24}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
