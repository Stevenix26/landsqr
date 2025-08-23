# Lendsqr Loan Management Dashboard

A production-ready loan management platform built with cutting-edge web technologies, designed to streamline financial operations and enhance user experience for lending institutions.

## 🎯 Overview

Lendsqr Loan Management Dashboard is a comprehensive solution that empowers financial teams to efficiently manage loan applications, monitor user portfolios, and make data-driven decisions through intuitive analytics and seamless user management capabilities.

## ✨ Key Capabilities

### Business Intelligence
- **Real-time Analytics**: Live dashboards with actionable financial insights
- **User Lifecycle Management**: Complete borrower journey tracking
- **Risk Assessment Tools**: Automated user status monitoring and blacklisting
- **Performance Metrics**: Comprehensive KPI tracking and reporting

### Operational Excellence
- **Streamlined Workflows**: Intuitive loan application processing
- **User-Centric Design**: Mobile-first responsive interface
- **Secure Authentication**: Role-based access control
- **Scalable Architecture**: Built for enterprise-level deployment

## 🏗️ Technology Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| **Framework** | Next.js 15.4.6 | Full-stack React framework |
| **Language** | TypeScript 5.x | Type-safe development |
| **Styling** | SCSS Modules | Component-scoped styling |
| **Testing** | Jest 30.x | Comprehensive test suite |
| **Validation** | Zod | Runtime type checking |

## 📁 Project Structure

```
lendsqr-loan/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── users/
│   │   │       └── [route]/
│   │   │           └── route.ts          # API endpoints
│   │   ├── dashboard/
│   │   │   ├── layout.tsx               # Dashboard layout
│   │   │   ├── page.tsx                 # Dashboard home
│   │   │   ├── user/
│   │   │   │   └── page.tsx            # User listing page
│   │   │   └── usersDetails/
│   │   │       └── [id]/
│   │   │           └── page.tsx        # User detail page
│   │   ├── layout.tsx                   # Root layout
│   │   └── page.tsx                     # Landing page
│   ├── components/
│   │   ├── common/
│   │   │   ├── FilterPanel.tsx         # Search/filter component
│   │   │   ├── Spinner.tsx            # Loading indicator
│   │   │   └── UserActionMenu.tsx      # User actions dropdown
│   │   ├── dashboard/
│   │   │   ├── StatsCard.tsx           # Statistics display
│   │   │   ├── UsersTable.tsx          # User data table
│   │   │   └── user/
│   │   │       └── UserInfo.tsx        # User information display
│   │   └── layout/
│   │       ├── SideBar.tsx             # Navigation sidebar
│   │       └── TopBar.tsx              # Header with user info
│   ├── hooks/
│   │   ├── useSidebar.tsx              # Sidebar state management
│   │   └── useUser.tsx                 # User data fetching
│   ├── styles/
│   │   ├── global.scss                 # Global styles
│   │   ├── _variables.scss             # Design tokens
│   │   └── components/                 # Component styles
│   ├── types/
│   │   └── users.tsx                   # TypeScript definitions
│   ├── __test__/                       # Test files
│   └── mocks/
│       └── mockUsers.ts                # Mock data
├── public/
│   ├── images/                         # Static assets
│   └── fonts/                          # Typography assets
├── jest.config.ts                      # Testing configuration
├── jest.setup.ts                       # Test environment setup
├── next.config.ts                      # Next.js configuration
├── package.json                        # Dependencies
└── tsconfig.json                       # TypeScript configuration
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (LTS recommended)
- Package manager: npm, yarn, or pnpm

### Installation & Setup
```bash
# Clone repository
git clone https://github.com/Stevenix26/lendsqr-fe-test.git
cd lendsqr-loan

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Commands
```bash
npm run dev          # Development server (http://localhost:3000)
npm run build        # Production build
npm run start        # Production server
npm run test         # Run test suite
npm run test:watch   # Watch mode testing
npm run lint         # Code quality checks
```

## 📊 Dashboard Features

### User Management Hub
- **Comprehensive User Directory**: Advanced filtering and search capabilities
- **Detailed User Profiles**: Complete borrower information and history
- **Actionable User States**: Activate, blacklist, or review users
- **Status Tracking**: Real-time loan application monitoring

### Analytics Dashboard
- **Executive Summary**: Key performance indicators at a glance
- **User Analytics**: Demographics and behavior insights
- **Financial Metrics**: Loan portfolio performance tracking
- **Operational Intelligence**: Process efficiency metrics

## 🧪 Quality Assurance

### Testing Strategy
- **Unit Testing**: 90%+ code coverage with Jest
- **Component Testing**: React Testing Library for UI validation
- **Integration Testing**: End-to-end workflow verification
- **Mock Data**: Consistent test environments

### Code Quality
- **Type Safety**: Full TypeScript implementation
- **Linting**: ESLint with strict configuration
- **Formatting**: Prettier for consistent code style
- **Pre-commit Hooks**: Automated quality checks

## 🎨 Design System

### Visual Identity
- **Typography**: Avenir Next font family for professional appearance
- **Color Palette**: Trust-focused blues and neutral grays
- **Spacing System**: 8px grid for consistent layouts
- **Responsive Design**: Mobile-first approach with desktop optimization

### User Experience
- **Intuitive Navigation**: Sidebar-based layout with clear hierarchy
- **Accessibility**: WCAG 2.1 compliance standards
- **Performance**: Optimized loading and interaction times

## 📈 Performance Optimization

### Technical Excellence
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component integration
- **Bundle Analysis**: Performance monitoring tools
- **Caching Strategy**: Intelligent data caching

## 🛠️ Development Workflow

### Git Strategy
```bash
# Feature development
git checkout -b feature/user-analytics
# Make changes with tests
npm test && npm run build
git commit -m "feat: add user analytics dashboard"
git push origin feature/user-analytics
```

### Code Review Process
1. **Automated Testing**: All tests must pass
2. **Code Review**: Peer review for quality assurance
3. **Performance Check**: Bundle size and loading metrics
4. **Documentation**: Update relevant documentation

## 🔧 Configuration

### Environment Setup
Create `.env.local` for local development:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Jest Configuration
- **Test Environment**: jsdom for React components
- **Coverage Thresholds**: 90% minimum coverage
- **Module Mocking**: Next.js router and image optimization
- **Custom Matchers**: Enhanced testing utilities

## 🐛 Troubleshooting

### Common Solutions
| Issue | Solution |
|-------|----------|
| **Test Failures** | Run `npm test -- --verbose` for detailed output |
| **Build Errors** | Check TypeScript compilation with `npm run build` |
| **Styling Issues** | Verify SCSS module imports and class names |
| **API Errors** | Validate mock data structure in `src/mocks/` |

## 📞 Support & Documentation

### Getting Help
- **GitHub Issues**: Report bugs or request features
- **Documentation**: Comprehensive inline code documentation
- **Examples**: Test files provide usage patterns
- **Community**: Follow development best practices

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Built with precision by Agboola Stephen**  
*Transforming financial operations through technology*
