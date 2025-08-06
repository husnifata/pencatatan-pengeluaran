import { Expense } from "../types";
import ExpenseItem from "./ExpenseItem";

type ExpenseListProps = {
  expenses: Expense[];
  onDelete: (id: number) => void;
  onUpdate: (id: number, updatedData: any) => Promise<void>;
};

export default function ExpenseList({
  expenses,
  onDelete,
  onUpdate,
}: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <p className="text-center text-slate-400">
        Belum ada pengeluaran, silakan tambahkan data baru.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}
