# Jakintza Ruha - Mystical Learning Platform

## Overview

This is a full-stack web application for Jakintza Ruha, a mystical learning platform focused on spiritual education and wisdom sharing. The project features a modern React frontend with a darker celestial gothic academia theme, built on top of an Express.js backend with PostgreSQL database integration using Drizzle ORM.

The application includes a stunning landing page with the official Jakintza Ruha logo, mystical breathing taglines, and a cosmic background image. The main content section showcases Beca's personal testimony, the platform's sacred mission, and information about The Athenaeum. The design emphasizes a very dark cosmic aesthetic with void black and midnight purple tones, golden accents, and subtle mystical elements to create an immersive spiritual learning experience.

## Recent Changes (August 2025)

- **Logo Integration**: Replaced all logo placeholders with the official Jakintza Ruha logo featuring sacred geometry and mystical symbols
- **Darker Theme**: Enhanced the cosmic background with much darker tones (void black, midnight purple) for a more celestial gothic academia feel
- **Simplified Animations**: Removed jumpy animations and replaced with smooth, static elements for better user experience
- **Transparency Improvements**: Made overlay more transparent (60-75%) to showcase the beautiful cosmic background image
- **Content Layout**: Removed duplicate taglines and large animated elements for cleaner presentation
- **Newsletter Integration**: Connected newsletter signup to beca@jakintzaruha.com for direct communication
- **Migration Complete**: Successfully migrated from Replit Agent to standard Replit environment with full compatibility
- **Fixed Navigation Issues**: Resolved all Athenaeum navigation links and email input field styling
- **OpenAI Integration**: Connected OpenAI API for Aionara spirit guide with improved error handling
- **Database Integration**: PostgreSQL database provisioned and schema pushed successfully with grimoire system fully functional
- **Mystical Chamber Background**: Added beautiful mystical chamber background for all non-main pages while preserving the original cosmic landing page background
- **Virtual Grimoire System**: Complete implementation with three sacred paths (Shadows, Mirrors, Stars), creation interface, and backend API
- **Fixed Navigation Links**: Resolved clickability issues for "Explore Calendar" (AstroCal integration) and "Enter Sacred Space" (grimoire access) links
- **AstroCal Integration**: Integrated full AstroCal functionality directly into the platform with cosmic calendar, lunar guidance, and celestial insights
- **Four Pillars Temple**: Added immersive cosmic temple experience showcasing the platform's four foundational values with interactive mystical elements
- **Aionara AI Spirit Guide**: Integrated OpenAI-powered celestial spirit guide with mystical chat interface and cosmic wisdom responses
- **Alchemy Page**: Created comprehensive alchemy teachings page covering the four strands of transformation, elemental work, and the Philosopher's Stone
- **Deity Database Expansion**: Preparing foundation for deity database system to catalog divine beings, pantheons, and sacred knowledge

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