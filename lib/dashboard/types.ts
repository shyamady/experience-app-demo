export type AttendeeStatus = "confirmed" | "pending" | "cancelled";

export type Attendee = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  packageName: string;
  seasonsJoined: number;
  status: AttendeeStatus;
  amountPaid: number;
  joinedAt: string;
  checkedIn: boolean;
  notes: string;
};

export type PaymentStatus = "paid" | "refunded" | "pending";

export type Order = {
  id: string;
  customerName: string;
  customerEmail: string;
  productName: string;
  amount: number;
  paymentStatus: PaymentStatus;
  purchasedAt: string;
};
