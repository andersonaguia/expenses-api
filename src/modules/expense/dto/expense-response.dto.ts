export class ExpenseResponseDto {
  id: number;
  currentYear: number;
  name: string;
  comments: string;
  solarPercentage: number;
  rivierePercentage: number;
  monthlyExpense: number;
  annualExpense: number;
  solarMonthExpense: number;
  riviereMonthExpense: number;
  category: {
    id: number;
    name: string;
  };
  createdAt: Date;
  modifiedBy: string;
}
