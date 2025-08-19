# Lendsqr Loan Management Dashboard

A comprehensive, professional loan management system built with Next.js 15, React 19, and TypeScript. This dashboard provides a complete solution for managing loan applications, user data, and financial analytics with a modern, responsive interface.

## 🚀 Features

### Core Functionality
- **User Management**: Complete CRUD operations for loan applicants and users
- **Loan Application Processing**: End-to-end loan application workflow
- **Dashboard Analytics**: Real-time financial metrics and insights
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Authentication**: Secure login system with role-based access
- **Data Visualization**: Interactive charts and statistics

### Technical Features
- **Next.js 15**: Latest App Router architecture
- **TypeScript**: Full type safety across the application
- **Jest Testing**: Comprehensive unit test suite
- **SCSS Modules**: Component-scoped styling
- **API Routes**: Server-side functionality with Next.js API routes
- **Modern React**: React 19 with latest features

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.4.6** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript 5.x** - Type safety
- **SCSS/Sass** - Styling with CSS modules
- **Zod** - Schema validation

### Testing
- **Jest 30.x** - Testing framework
- **React Testing Library** - Component testing
- **@testing-library/jest-dom** - Custom DOM matchers

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks (optional)

## 📁 Project Structure

```
lendsqr-loan/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── users/
│   │   │       └── [route]/
│   │   │           └── route.ts
│   │   ├── dashboard/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── user/
│   │   │   │   └── page.tsx
│   │   │   └── usersDetails/
│   │   │       └── [id]/
│   │   │           └── page.tsx
│   ├── components/
│   │   ├── common/
│   │   │   ├── FilterPanel.tsx
│   │   │   ├── Spinner.tsx
│   │   │   └── UserActionMenu.tsx
│   │   ├── dashboard/
│   │   │   ├── StatsCard.tsx
│   │   │   ├── UsersTable.tsx
│   │   │   └── user/
│   │   │       └── UserInfo.tsx
│   │   └── layout/
│   │       ├── SideBar.tsx
│   │       └── TopBar.tsx
│   ├── hooks/
│   │   ├── useSidebar.tsx
│   │   ├── useUser.tsx
│   │   
│   ├── styles/
│   │   ├── global.scss
│   │   └── components/
│   ├── types/
│   │   └── users.tsx
│   └── __test__/
│       ├── components/
│       └── hooks/
├── public/
│   ├── images/
│   └── fonts/
├── jest.config.ts
├── jest.setup.ts
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm, yarn, or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/lendsqr-loan.git
cd lendsqr-loan

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run test         # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run lint         # Run ESLint
```

## 🧪 Testing

The project includes a comprehensive test suite using Jest and React Testing Library. Tests are located in the `src/__test__/` directory.

### Running Tests
```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

### Test Structure
- **Component Tests**: Testing React components in isolation
- **Hook Tests**: Testing custom React hooks
- **Integration Tests**: Testing component interactions
- **Mock Data**: Using mock users and data for consistent testing

## 📊 Dashboard Features

### User Management
- **User List**: Paginated table with search and filtering
- **User Details**: Comprehensive user profile view
- **User Actions**: Activate, blacklist, and manage users
- **Status Management**: Track user loan status

### Analytics
- **Total Users**: Active user count
- **Active Loans**: Current loan applications
- **Pending Applications**: Loan requests awaiting review
- **Blacklisted Users**: Users with restricted access

### Data Visualization
- **User Statistics**: Charts showing user distribution
- **Loan Metrics**: Financial performance indicators
- **Activity Timeline**: Recent user actions

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for local development:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Jest Configuration
The project uses Jest with the following setup:
- **Test Environment**: jsdom
- **Coverage Collection**: Enabled for all source files
- **Module Mocking**: Next.js router, images, and localStorage
- **Custom Matchers**: @testing-library/jest-dom

## 🎨 Styling

### Design System
- **Color Palette**: Professional blues and grays
- **Typography**: Avenir Next font family
- **Spacing**: Consistent 8px grid system
- **Components**: Reusable SCSS modules

### Responsive Design
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🔐 Authentication

The application includes a mock authentication system:
- **Login Page**: Secure user authentication
- **Session Management**: localStorage-based sessions
- **Role-Based Access**: Admin and user roles

## 📈 Performance

### Optimization Features
- **Code Splitting**: Automatic with Next.js
- **Image Optimization**: Next.js Image component
- **Bundle Analysis**: Available via Next.js bundle analyzer
- **Lazy Loading**: Components and routes

## 🚦 Development Workflow

### Git Workflow
1. Create feature branch: `git checkout -b feature/new-feature`
2. Make changes and add tests
3. Run tests: `npm test`
4. Commit changes: `git commit -m "Add new feature"`
5. Push branch: `git push origin feature/new-feature`
6. Create Pull Request

### Code Quality
- **ESLint**: Enforces coding standards
- **Prettier**: Consistent code formatting
- **TypeScript**: Type safety
- **Testing**: Required for all new features

## 🐛 Troubleshooting

### Common Issues
1. **Test Failures**: Check Jest setup and mock configurations
2. **Build Errors**: Verify TypeScript compilation
3. **Styling Issues**: Check SCSS module imports
4. **API Errors**: Verify mock data and endpoints

### Debug Commands
```bash
# Check TypeScript errors
npm run build

# Run tests in verbose mode
npm test -- --verbose

# Check bundle size
npm run build -- --analyze
```

## 📞 Support

For questions or support:
- Create an issue in the GitHub repository
- Check the troubleshooting section
- Review the test files for usage examples

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by the Agboola Stephen
