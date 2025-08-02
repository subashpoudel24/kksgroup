export interface MachineDetails {
  type: string
  capacity: string
  power: string
  voltage: string
  dimensions: string
  weight: string
}

export interface ProductModel {
  name: string
  specifications: { [key: string]: string }
  features: string[]
  image?: string
  machineDetails?: MachineDetails
}

export interface IProduct {
  _id?: string
  name: string
  description: string
  images: string[]
  category: "beans" | "machines" | "bakery"
  slug: string
  price?: number
  models?: ProductModel[]
  createdAt?: Date
  updatedAt?: Date
}

// In a real MongoDB setup, you would define Mongoose schemas here
export const ProductSchema = {
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String }],
  category: { type: String, enum: ["beans", "machines", "bakery"], required: true },
  slug: { type: String, required: true, unique: true },
  price: { type: Number },
  models: [
    {
      name: { type: String },
      specifications: { type: Object },
      features: [{ type: String }],
      image: { type: String },
      machineDetails: {
        type: { type: String },
        capacity: { type: String },
        power: { type: String },
        voltage: { type: String },
        dimensions: { type: String },
        weight: { type: String },
      },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}
