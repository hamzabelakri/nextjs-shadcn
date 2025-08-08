# Asteroidea Frontend

Modern React frontend application built with Next.js 15, featuring a comprehensive UI for user management, authentication, and audit logging. This frontend connects to the Go backend API to provide a complete full-stack solution.

## 🚀 Features

- **Modern React Architecture**: Built with Next.js 15 and React 19
- **Type-Safe Development**: Full TypeScript support with strict type checking
- **State Management**: Zustand for efficient and simple state management
- **UI Components**: Shadcn/UI components with beautiful, accessible design
- **Authentication**: JWT-based authentication with role-based access control
- **Internationalization**: Multi-language support with i18next
- **Responsive Design**: Mobile-first responsive layout
- **Dark/Light Theme**: Theme switching with system preference detection
- **Audit Dashboard**: Complete audit logging interface with filtering and search

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3
- **UI Library**: React 19.0
- **TypeScript**: 5.0+
- **State Management**: Zustand 5.0
- **UI Components**: Shadcn/UI
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form
- **Data Fetching**: TanStack Query (React Query)
- **Internationalization**: react-i18next

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (main)/            # Main application pages
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # Shadcn/UI components
│   └── ...               # Custom components
├── hooks/                # Custom React hooks
│   ├── use-auth.ts       # Authentication hooks
│   ├── use-audit.ts      # Audit logging hooks
│   └── use-users.ts      # User management hooks
├── store/                # Zustand stores
│   ├── auth-store.ts     # Authentication state
│   ├── audit-store.ts    # Audit state
│   └── theme-store.ts    # Theme state
├── lib/                  # Utilities and configurations
├── providers/            # React context providers
└── utils/                # Helper functions
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Backend API running (see backend README)

### Installation

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your environment variables:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080/api
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🎨 Features Overview

### Authentication
- Login/Register forms with validation
- JWT token management
- Role-based access control
- Automatic token refresh
- Secure route protection

### User Management
- User listing with pagination
- User creation and editing
- Role assignment
- User status management
- Search and filtering

### Audit Logging
- Comprehensive audit trail
- Action filtering (CREATE, UPDATE, DELETE)
- User-based filtering
- Timestamp range filtering
- Detailed change comparison for updates

### UI/UX
- Responsive design for all screen sizes
- Dark/Light theme switching
- Smooth animations and transitions
- Accessible components (ARIA compliant)
- Loading states and error handling

## 🌐 API Integration

The frontend connects to the Go backend API for all data operations:

- **Authentication**: `/api/auth/*`
- **Users**: `/api/users/*`
- **Roles**: `/api/roles/*`
- **Audit Logs**: `/api/audit/*`

All API calls are handled through custom hooks using TanStack Query for efficient data fetching, caching, and synchronization.

## 🔒 Security Features

- JWT token storage in HTTP-only cookies (when available)
- CSRF protection
- XSS protection
- Route-based authentication guards
- Role-based component rendering
- API request authentication headers

## 📱 Responsive Design

The application is built with a mobile-first approach:
- Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- Flexible grid layouts
- Touch-friendly interface elements
- Optimized for various screen sizes

## 🌍 Internationalization

Multi-language support with easy language switching:
- English (default)
- Arabic (RTL support)
- French
- Spanish
- Add more languages by updating translation files

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Manual Deployment
1. Build the application: `npm run build`
2. Start the production server: `npm start`
3. Or export static files: `npm run export`

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Zustand Documentation](https://zustand-demo.pmnd.rs)
- [Shadcn/UI Documentation](https://ui.shadcn.com)
- [TanStack Query Documentation](https://tanstack.com/query)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
