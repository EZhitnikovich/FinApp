export type Category = {
  id: string;
  name: string;
  color: string;
};

export type Transaction = {
  id: string;
  date: string;
  amount: number;
  categoryId: string;
};

export type Account = {
  name: string;
  balance: BigInt;
  categories: Category[];
  history: Transaction[];
};
