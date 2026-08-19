export interface InitializeTransactionResult {
  authorizationUrl: string;
  accessCode: string;
  reference: string;
}

export type SubscriptionPlan = "Free" | "Pro";

export interface Subscription {
  id: string;
  userId: string;
  plan: SubscriptionPlan;
  endpointLimit: number;
  startedAt: string;
  expiresAt: string | null;
  isActive: boolean;
}

export type InvoiceStatus = "Pending" | "Paid" | "Failed";

export interface Invoice {
  id: string;
  userId: string;
  subscriptionId: string;
  amount: number;
  currency: string;
  status: InvoiceStatus;
  issuedAt: string;
  paidAt: string | null;
}