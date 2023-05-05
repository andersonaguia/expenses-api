export class ExpenseResponseDto {
  id: number;
  currentYear: number;
  name: string;
  comments: string;
  residentialPercentage: number;
  commercialPercentage: number;
  monthlyExpense: number;
  annualExpense: number;
  residentialMonthExpense: number;
  commercialMonthExpense: number;
  category: {
    id: number;
    name: string;
  };
  subcategory: {
    id: number;
    name: string;
  };
  createdAt: Date;
  modifiedBy: string;
}
