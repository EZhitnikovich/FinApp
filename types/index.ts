export type Category = {
  name: string;
  color: string;
};

export type Transaction = {
  id: number;
  date: string;
  amount: number;
  category: Category;
};

export type Account = {
  id: number;
  balance: number;
  categories: Category[];
  history: Transaction[];
};
