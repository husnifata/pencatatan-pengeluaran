import { useState, FormEvent } from "react";

type ExpenseFormProps = {
  onAddExpense: (expenseData: {
    item: string;
    amount: number;
    category: string;
  }) => Promise<void>;
};

export default function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
  const [newItem, setNewItem] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!newItem || !newAmount || !newCategory) return;

    setIsLoading(true);

    await onAddExpense({
      item: newItem,
      amount: Number(newAmount),
      category: newCategory,
    });

    setNewItem("");
    setNewAmount("");
    setNewCategory("");
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 mb-8 rounded-lg shadow-lg bg-slate-800"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <input
          type="text"
          placeholder="Nama Barang"
          className="p-2 rounded-md bg-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Jumlah (Rp)"
          className="p-2 rounded-md bg-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          value={newAmount}
          onChange={(e) => setNewAmount(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Kategori"
          className="p-2 rounded-md bg-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 mt-4 w-full font-bold bg-emerald-500 rounded-md transition-all duration-200 hover:bg-emerald-600 disabled:bg-slate-600"
        disabled={isLoading}
      >
        {isLoading ? "Menambahkan..." : "Tambah Pengeluaran"}
      </button>
    </form>
  );
}
