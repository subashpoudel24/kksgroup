// Order model interface
export interface IOrder {
  _id?: string
  fullName: string
  email: string
  phone: string
  address: string
  productName: string
  quantity: string
  contactMethod: "email" | "call"
  message?: string
  status?: "pending" | "confirmed" | "completed" | "cancelled"
  createdAt?: Date
  updatedAt?: Date
}

// In a real MongoDB setup, you would define Mongoose schemas here
export const OrderSchema = {
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  productName: { type: String, required: true },
  quantity: { type: String, required: true },
  contactMethod: { type: String, enum: ["email", "call"], required: true },
  message: { type: String },
  status: { type: String, enum: ["pending", "confirmed", "completed", "cancelled"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}
