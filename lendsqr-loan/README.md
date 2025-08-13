# Lendsqr Loan Dashboard

A professional, responsive loan management dashboard built with Next.js, React, and SCSS. This project features a modern UI, custom font integration, authentication, and a scalable layout for user and admin operations.

## Folder Structure

```
lendsqr-loan/
├── public/
│   └── images/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   └── login/
│   │   ├── dashboard/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── userDetails/
│   │   ├── globals.scss
│   │   └── layout.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── sidebar.tsx
│   │   │   └── topbar.tsx
│   │   ├── dashboard/
│   │   └── common/
│   └── styles/
│       ├── topbar.module.scss
│       └── ...
├── package.json
├── tsconfig.json
├── README.md
└── ...
```

- `public/images/` — Static assets and illustrations
- `src/app/` — Next.js app directory (routing, pages, layouts)
- `src/components/` — Reusable UI components
- `src/styles/` — SCSS modules and global styles

## Features

- Next.js 14+ App Router architecture
- Responsive, Figma-accurate UI
- Custom font integration (Work Sans, Avenir Next)
- Authentication with localStorage
- Dashboard with sidebar navigation and user details
- Professional topbar with search, notifications, and user profile
- SCSS modules and global styles with variables
- Accessible and semantic markup

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

Clone the repository:

```bash
git clone https://github.com/your-username/lendsqr-loan.git
cd lendsqr-loan
```

Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Running the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

- `src/app/` — Next.js app directory (pages, layouts, routing)
- `src/components/` — Reusable UI components (sidebar, topbar, etc.)
- `src/styles/` — SCSS modules and global styles
- `public/images/` — Project assets and illustrations

## Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [SCSS Modules](https://sass-lang.com/)
- [TypeScript](https://www.typescriptlang.org/) (if enabled)

## Customization

- Update color scheme and fonts in `globals.scss`
- Edit layout and components in `src/components/`
- Add new pages in `src/app/`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License.

---

> Built with ❤️ by the Stephen_Agboola
