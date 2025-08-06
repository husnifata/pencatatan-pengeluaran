import { useState } from "react";
import { Expense } from "../types";

type ExpenseItemProps = {
  expense: Expense;
  onDelete: (id: number) => void;
  onUpdate: (
    id: number,
    updatedData: { item: string; amount: number; category: string }
  ) => Promise<void>;
};

const formatToRupiah = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

export default function ExpenseItem({
  expense,
  onDelete,
  onUpdate,
}: ExpenseItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  const [editItem, setEditItem] = useState(expense.item);
  const [editAmount, setEditAmount] = useState(expense.amount.toString());
  const [editCategory, setEditCategory] = useState(expense.category);

  const handleUpdate = async () => {
    await onUpdate(expense.id, {
      item: editItem,
      amount: Number(editAmount),
      category: editCategory,
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="p-4 rounded-lg shadow-md bg-slate-700 animate-fade-in">
        <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-3">
          <input
            type="text"
            value={editItem}
            onChange={(e) => setEditItem(e.target.value)}
            className="p-2 rounded-md bg-slate-600"
          />
          <input
            type="number"
            value={editAmount}
            onChange={(e) => setEditAmount(e.target.value)}
            className="p-2 rounded-md bg-slate-600"
          />
          <input
            type="text"
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value)}
            className="p-2 rounded-md bg-slate-600"
          />
        </div>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => setIsEditing(false)}
            className="px-3 py-1 text-sm font-bold text-white rounded-md bg-slate-500 hover:bg-slate-600"
          >
            Batal
          </button>
          <button
            onClick={handleUpdate}
            className="px-3 py-1 text-sm font-bold text-white bg-emerald-500 rounded-md hover:bg-emerald-600"
          >
            Simpan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center p-4 rounded-lg shadow-md bg-slate-800">
      <div>
        <h2 className="text-xl font-semibold">{expense.item}</h2>
        <p className="text-sm text-slate-400">{expense.category}</p>
      </div>
      <div className="flex gap-4 items-center">
        <p className="text-lg font-bold text-red-400">
          {formatToRupiah(expense.amount)}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 text-sm font-bold text-white bg-sky-500 rounded-md hover:bg-sky-600"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(expense.id)}
            className="px-3 py-1 text-sm font-bold text-white bg-red-500 rounded-md hover:bg-red-600"
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
}
