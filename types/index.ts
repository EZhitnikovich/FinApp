export type Category = {
  id: string;
  name: string;
  color: string;
  categoryType: CategoryTypes;
};

export type Transaction = {
  id: string;
  note: string;
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
  history: Transaction[];
};

export enum CategoryTypes {
  income = "income",
  expense = "expense",
}
