export class ResponseEvolutionDto {
  id: number;
  createdAt: Date;
  lastPayment: number;
  currentMonthlyCash: number;
  currentAnnualCash: number;
  expense: {
    id: number;
    currentYear: number;
    name: string;

    category: {
      id: number;
      name: string;
    };
    subcategory: {
      id: number;
      name: string;
    };
  };
  modifiedBy: {
    id: number;
    name: string;
  };
}
