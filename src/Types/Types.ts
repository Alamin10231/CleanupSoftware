export type Subscription = {
  id: number;
  name: string;
  email: string;
  status: "Active" | "Pending" | "Auto-Renew" | "Expired";
  location: string;
  package: string;
  startDate: string;
  countdown: string;
  nextPayment: string;
  invoice: boolean;
};
