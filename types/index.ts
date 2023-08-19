export type Category = {
  id: string;
  name: string;
  color: string;
};

export type Transaction = {
  id: string;
  date: {
    day: number;
    month: number;
    year: number;
  };
  amount: number;
  categoryId: string;
};

export type Account = {
  name: string;
  balance: number;
  history: Transaction[];
};
