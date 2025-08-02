# Coffee Showcase Website

A full-stack coffee product showcase website built with Next.js, featuring product listings, blog system, and order management.

## Features

- **Homepage**: Hero section, featured products, testimonials, newsletter signup
- **Product Showcase**: Coffee beans and machines with detailed product pages
- **Order System**: Dynamic order forms that save to database
- **Blog System**: Article listings and detailed blog posts
- **About Page**: Company information, team, values, and certifications
- **Contact Page**: Contact form, store information, and FAQ
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **API Routes**: RESTful API for products, blogs, and orders

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose (mock data included)
- **Icons**: Lucide React
- **Forms**: React Hook Form with validation

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- MongoDB (optional - mock data included)

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd coffee-showcase
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Set up environment variables** (optional)
   Create a `.env.local` file in the root directory:
   \`\`\`env
   MONGODB_URI=mongodb://localhost:27017/coffee-showcase
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Project Structure

\`\`\`
coffee-showcase/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── api/               # API routes
│   │   ├── blogs/         # Blog API endpoints
│   │   ├── orders/        # Order API endpoints
│   │   └── products/      # Product API endpoints
│   ├── blog/              # Blog pages
│   ├── contact/           # Contact page
│   ├── order/             # Order form page
│   ├── products/          # Product pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── footer.tsx        # Footer component
│   └── navigation.tsx    # Navigation component
├── lib/                  # Utility functions
│   └── mongodb.ts        # MongoDB connection
├── models/               # Database models
│   ├── Blog.ts           # Blog model
│   ├── Order.ts          # Order model
│   └── Product.ts        # Product model
└── README.md
\`\`\`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### API Endpoints

#### Products
- `GET /api/products` - Get all products
- `GET /api/products/[slug]` - Get product by slug
- `POST /api/products` - Create new product

#### Blogs
- `GET /api/blogs` - Get all blog posts
- `GET /api/blogs/[slug]` - Get blog post by slug
- `POST /api/blogs` - Create new blog post

#### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create new order

### Database Setup (Optional)

The project includes mock data and works without a database. To use MongoDB:

1. Install MongoDB locally or use MongoDB Atlas
2. Update the `MONGODB_URI` in your `.env.local` file
3. Replace mock data in API routes with actual database calls
4. Use the provided models in the `models/` directory

### Deployment

#### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

#### Other Platforms
The project can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

### Customization

#### Adding New Products
1. Add product data to `/api/products/route.ts`
2. Include product images in the `public/` directory
3. Update product categories if needed

#### Styling
- Modify Tailwind classes in components
- Update the color scheme in `tailwind.config.ts`
- Add custom CSS in `globals.css`

#### Database Integration
1. Set up MongoDB connection in `lib/mongodb.ts`
2. Create Mongoose schemas based on models in `models/`
3. Replace mock data in API routes with database operations

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### License

This project is licensed under the MIT License.

### Support

For support, email info@coffeeshop.com or create an issue in the repository.
