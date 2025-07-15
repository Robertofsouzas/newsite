# RFSTechs Business Website

## Overview

This is a modern business website for RFSTechs, a consulting company specializing in data analytics, business automation, and AI agents solutions. The application is built as a full-stack solution with a React frontend and Express backend, featuring a portfolio showcase, service descriptions, AI benefits section, and contact form functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (January 2025)

- ✓ Updated all "Inteligência Artificial" references to "Agentes de IA" throughout the site
- ✓ Created dedicated AI Benefits section highlighting advantages of AI agents
- ✓ Enhanced service descriptions to emphasize intelligent automation and autonomous decisions
- ✓ Added compelling statistics showing business impact (40% productivity, 60% cost reduction, 80% customer satisfaction)
- ✓ Updated portfolio project to showcase "Agente de IA Preditivo" with smart inventory optimization
- ✓ Fixed storage typing error for company field handling
- ✓ Updated color palette from #203f77 to #2f3056 throughout the site
- ✓ Added testimonials section "O que nossos clientes dizem" with client feedback examples
- ✓ Integrated company logo in navigation and footer
- ✓ Created complete administrative system for project management
- ✓ Implemented PostgreSQL database with Drizzle ORM for data persistence
- ✓ Built admin interface at /admin for managing Power BI, N8N, and AI projects
- ✓ Added interactive Power BI URL support for project showcase

## System Architecture

This application follows a **monorepo structure** with a clean separation between client and server code:

- **Frontend**: React SPA with TypeScript using Vite as the build tool
- **Backend**: Express.js API server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for data persistence
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Deployment**: Production-ready build system with static asset serving

The architecture supports both development and production environments with appropriate tooling for each.

## Key Components

### Frontend Architecture
- **React Router**: Uses `wouter` for client-side routing
- **State Management**: React Query for server state management
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Express Server**: RESTful API with TypeScript
- **Database Layer**: Drizzle ORM with PostgreSQL
- **Validation**: Zod schemas shared between client and server
- **Storage**: Currently uses in-memory storage with interface for database migration

### Database Schema
The application currently defines a `contacts` table for storing contact form submissions:
- `id`: Serial primary key
- `name`: Contact name (required)
- `email`: Contact email (required)
- `company`: Company name (optional)
- `service`: Requested service (required)
- `message`: Contact message (required)
- `createdAt`: Timestamp with default

## Data Flow

1. **Contact Form Submission**: Client submits form → validation with Zod → API call → server validation → storage
2. **Contact Retrieval**: Admin endpoints to fetch stored contacts
3. **Static Content**: Portfolio, services, and company information served statically
4. **Error Handling**: Comprehensive error boundaries and API error responses

## External Dependencies

### Core Technologies
- **Neon Database**: Serverless PostgreSQL provider (@neondatabase/serverless)
- **UI Components**: Extensive Radix UI component library
- **Development Tools**: Vite for frontend bundling, tsx for TypeScript execution
- **Styling**: Tailwind CSS with PostCSS processing

### Key Features
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Animation System**: CSS-based animations for smooth user interactions
- **Image Assets**: Unsplash integration for high-quality business imagery
- **Form Validation**: Client and server-side validation with proper error handling

## Deployment Strategy

### Development Mode
- Vite dev server with HMR for frontend development
- Express server with TypeScript compilation via tsx
- Database migrations using Drizzle Kit

### Production Build
- Frontend: Vite builds optimized static assets to `dist/public`
- Backend: esbuild bundles server code to `dist/index.js`
- Static serving: Express serves built frontend assets
- Database: PostgreSQL connection via environment variables

### Environment Configuration
- Database URL required via `DATABASE_URL` environment variable
- Production/development mode switching via `NODE_ENV`
- Replit-specific tooling for cloud development environment

The application is designed to be easily deployable to various platforms with minimal configuration changes, supporting both traditional hosting and serverless deployment strategies.