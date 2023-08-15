export type Category = {
  id: number;
  name: string;
  color: string;
};

export type Transaction = {
  id: number;
  date: string;
  amount: number;
  categoryId: number;
};

export type Account = {
  name: string;
  balance: number;
  categories: Category[];
  history: Transaction[];
};
