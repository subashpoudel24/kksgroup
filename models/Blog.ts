// Blog model interface
export interface IBlog {
  _id?: string
  title: string
  content: string
  image: string
  author: string
  slug: string
  createdAt?: Date
  updatedAt?: Date
}

// In a real MongoDB setup, you would define Mongoose schemas here
export const BlogSchema = {
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  author: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}
