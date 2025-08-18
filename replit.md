# Jakintza Ruha - Mystical Learning Platform

## Overview

This is a full-stack web application for Jakintza Ruha, a mystical learning platform focused on spiritual education and wisdom sharing. The project features a modern React frontend with a cosmic/mystical theme, built on top of an Express.js backend with PostgreSQL database integration using Drizzle ORM.

The application includes a landing page with animated mystical elements, a main content section showcasing the platform's story and mission, and a newsletter subscription system. The design emphasizes a dark, cosmic aesthetic with golden accents and smooth animations to create an immersive spiritual learning experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom cosmic-themed color palette
- **Animations**: Framer Motion for smooth, mystical animations
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL with Neon serverless hosting
- **Session Management**: Built-in memory storage with extensible interface
- **API Design**: RESTful endpoints with JSON responses

### Data Storage
- **Primary Database**: PostgreSQL via Neon serverless
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Tables**: Users and newsletter subscriptions with UUID primary keys
- **Development Storage**: In-memory storage adapter for development/testing

### Design System
- **Theme**: Dark cosmic aesthetic with mystical elements
- **Typography**: Crimson Text for gothic elements, Inter for body text
- **Color Palette**: Deep blues and purples with golden accent colors
- **Component Library**: Comprehensive UI component system with variants
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

### Authentication & Authorization
- **Current State**: Basic user schema defined but not implemented
- **Planned Features**: User registration and authentication system
- **Session Storage**: PostgreSQL-backed session store configured

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Neon PostgreSQL serverless driver
- **drizzle-orm**: Type-safe ORM for database operations
- **drizzle-zod**: Integration between Drizzle and Zod for validation

### UI & Styling
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **framer-motion**: Animation library for React
- **class-variance-authority**: Utility for creating component variants
- **lucide-react**: Icon library

### Development Tools
- **tsx**: TypeScript execution for development
- **vite**: Build tool and development server
- **esbuild**: Fast JavaScript bundler for production builds
- **@replit/vite-plugin-runtime-error-modal**: Development error handling

### Form & Validation
- **react-hook-form**: Performant form library
- **@hookform/resolvers**: Validation resolvers for React Hook Form
- **zod**: TypeScript-first schema validation

### Date & Utility
- **date-fns**: Modern JavaScript date utility library
- **clsx**: Utility for constructing className strings
- **cmdk**: Command palette component