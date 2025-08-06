import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { Expense } from "./types";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    getExpenses();
  }, []);

  async function getExpenses() {
    try {
      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data != null) {
        setExpenses(data);
      }
    } catch (error) {
      alert((error as Error).message);
    }
  }

  async function addExpense(expenseData: {
    item: string;
    amount: number;
    category: string;
  }) {
    try {
      await supabase.from("expenses").insert(expenseData);
      getExpenses();
    } catch (error) {
      alert((error as Error).message);
    }
  }

  async function updateExpense(
    id: number,
    updatedData: { item: string; amount: number; category: string }
  ) {
    try {
      const { error } = await supabase
        .from("expenses")
        .update(updatedData)
        .eq("id", id);

      if (error) throw error;

      setExpenses(
        expenses.map((expense) =>
          expense.id === id ? { ...expense, ...updatedData } : expense
        )
      );
    } catch (error) {
      alert((error as Error).message);
    }
  }

  async function deleteExpense(id: number) {
    try {
      await supabase.from("expenses").delete().eq("id", id);
      setExpenses(expenses.filter((expense) => expense.id !== id));
    } catch (error) {
      alert((error as Error).message);
    }
  }

  return (
    <div className="min-h-screen text-white bg-slate-900">
      <div className="container p-4 mx-auto max-w-2xl sm:p-8">
        <h1 className="mb-8 text-4xl font-bold text-center text-emerald-400">
          Pencatat Pengeluaran
        </h1>

        <ExpenseForm onAddExpense={addExpense} />

        <ExpenseList
          expenses={expenses}
          onDelete={deleteExpense}
          onUpdate={updateExpense}
        />
      </div>
    </div>
  );
}

export default App;
