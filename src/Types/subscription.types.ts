export interface User {
  id: number;
  name: string;
  email?: string;
  prime_phone?: string;
}

export interface Apartment {
  apartment_number: string | number;
}

export interface Building {
  name: string;
}

export interface Region {
  name: string;
}

export interface Plan {
  name: string;
  interval: "month" | "year" | "days";
}

export interface Invoice {
  status: "paid" | "unpaid";
  total?: number;
}

export interface Subscription {
  id: number;
  user: User;
  apartment: Apartment;
  building: Building;
  region: Region;
  plan: Plan;
  invoices: Invoice;
  remaining_days: number;
  status: "active" | "paused" | "canceled";
}

export interface SubscriptionResponse {
  results: Subscription[];
  next: string | null;
  previous: string | null;
  count: number;
}