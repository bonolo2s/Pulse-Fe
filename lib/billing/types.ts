// ---- Subscription ----
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

export interface InitializeTransactionResult {
  authorizationUrl: string;
  accessCode: string;
  reference: string;
}

// ---- Payment Method ----
export type PaymentMethodType = "Card" | "Eft";
export type CardBrand = "Visa" | "Mastercard" | "Verve";

export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  brand: CardBrand | null;
  last4: string | null;
  expiryMonth: number | null;
  expiryYear: number | null;
  bankName: string | null;
  isDefault: boolean;
}

// ---- Invoice ----
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