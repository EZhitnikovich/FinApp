export type Category = {
  id: string;
  name: string;
  color: string;
  categoryType: CategoryTypes;
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

enum CategoryTypes {
  income = "income",
  expense = "expense",
}
