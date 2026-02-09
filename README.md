# CodeLeap Application Entry

This repository contains the CodeLeap Engineering Test implementation—a frontend React application that demonstrates modern web development practices and UI/UX implementation based on a provided design specification.

## About This Project

This is a social posting application where users can:

- Sign up with a username
- Create, read, edit, and delete posts
- View posts from all users with timestamps
- Manage their own posts only (edit/delete restricted to post owners)

The application implements a complete CRUD flow with authentication and follows the design specifications from the official Figma mockup.

## Design Reference

- **Figma Design**: [CodeLeap Engineering Test](https://www.figma.com/design/0OQWLQmU14SF2cDhHPJ2sx/CodeLeap-Engineering-Test?node-id=29005-156&t=SNWCxqHpxkbUpxip-0)
- All UI components match the provided design system, including colors, typography (Roboto), spacing, and interactions

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Routing**: React Router v7 with server-side rendering
- **Styling**: Tailwind CSS with custom design tokens
- **Build Tool**: Vite
- **External API**: CodeLeap Careers API (dev.codeleap.co.uk) - consumed by frontend
- **Package Manager**: pnpm

## Features

### Components

- **Modal**: Reusable modal component with configurable actions, overlay behavior, and keyboard shortcuts
- **TextInput**: Controlled input with support for single-line and multiline text
- **Button**: Multiple variants (primary, danger, success, outline) with disabled states
- **Post**: Post display with conditional edit/delete actions for owners

### User Experience

- Light theme only (following design specifications)
- Accessible forms with ARIA labels
- Keyboard navigation support (Enter to submit, Escape to close)
- Protected overlay close (prevents accidental dismissal)
- Real-time validation for form inputs
- Responsive layout

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)

### Installation

```bash
pnpm install
```

### Development

Start the development server with Hot Module Replacement:

```bash
pnpm run dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

Create an optimized production build:

```bash
pnpm run build
```

### Running Production Build

```bash
pnpm start
```

## Docker Deployment

Build and run using Docker:

```bash
docker build -t codeleap-app .
docker run -p 3000:3000 codeleap-app
```

## Project Structure

```
app/
├── components/         # Reusable UI components
│   ├── modal.tsx
│   ├── button.tsx
│   ├── textInput.tsx
│   └── post.tsx
├── routes/            # Page components
│   └── home.tsx
├── signup/            # Signup flow
│   └── signup.tsx
├── app.css           # Global styles
└── root.tsx          # App root
```

## API Integration

The application integrates with the CodeLeap Careers API:

- **Base URL**: `https://dev.codeleap.co.uk/careers/`
- **Endpoints**:
  - `GET /` - List all posts
  - `POST /` - Create new post
  - `PATCH /:id/` - Update post
  - `DELETE /:id/` - Delete post

## Development Notes

- Username is stored in localStorage for session persistence
- Post ownership is validated client-side by comparing usernames
- Timestamps are formatted as relative time (minutes/hours ago) or absolute dates
- All forms include validation and disabled states

---

Built with ❤️ for CodeLeap Engineering Test
