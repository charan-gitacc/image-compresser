# ImageCompress Pro

## Overview

ImageCompress Pro is a professional web-based image compression tool that allows users to reduce image file sizes by up to 80% while maintaining visual quality. The application supports JPEG, PNG, and WebP formats with customizable compression settings including quality adjustment, format conversion, and various optimization options.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React with TypeScript**: Modern React application using TypeScript for type safety
- **Vite Build System**: Fast development server and optimized production builds
- **Component Library**: Radix UI components with shadcn/ui styling system
- **State Management**: React hooks for local state, TanStack Query for server state
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom design tokens and CSS variables

### Backend Architecture
- **Express.js Server**: Node.js web server with Express framework
- **TypeScript**: Full-stack TypeScript implementation
- **Storage Interface**: Abstracted storage layer with in-memory implementation
- **Development Integration**: Vite middleware for development mode with HMR

### Data Storage Solutions
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Schema Management**: Centralized schema definitions in shared directory
- **Migration System**: Drizzle Kit for database migrations
- **Connection**: Neon Database serverless PostgreSQL integration

### Image Processing Architecture
- **Client-Side Compression**: Browser-based Canvas API for image processing
- **Format Support**: JPEG, PNG, and WebP format handling
- **Compression Options**: Quality control, progressive JPEG, EXIF preservation
- **File Handling**: Drag-and-drop interface with file validation and size limits

### UI/UX Design System
- **Design Tokens**: CSS custom properties for consistent theming
- **Component Variants**: Class Variance Authority for component styling
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Accessibility**: Radix UI primitives ensure ARIA compliance

### Development Environment
- **Hot Module Replacement**: Vite HMR for instant development feedback
- **Error Handling**: Runtime error overlay for development debugging
- **Type Checking**: Strict TypeScript configuration across all modules
- **Path Mapping**: Clean import paths with TypeScript path mapping

## External Dependencies

### UI Framework
- **Radix UI**: Headless UI components for accessibility and functionality
- **Lucide React**: Icon library for consistent iconography
- **React Hook Form**: Form state management and validation
- **Embla Carousel**: Touch-friendly carousel component

### Development Tools
- **Vite**: Development server and build tool
- **ESBuild**: Fast TypeScript compilation for production
- **PostCSS**: CSS processing with Tailwind CSS
- **Autoprefixer**: Automatic vendor prefix handling

### Database & ORM
- **Drizzle ORM**: Type-safe database ORM
- **Drizzle Kit**: Database migration and introspection tool
- **Neon Database**: Serverless PostgreSQL platform
- **Zod**: Runtime type validation and schema definition

### Utility Libraries
- **clsx/Tailwind Merge**: Conditional CSS class composition
- **date-fns**: Date manipulation and formatting
- **nanoid**: Secure unique ID generation
- **TanStack Query**: Server state management and caching

### Image Processing
- **Canvas API**: Browser-native image manipulation
- **File API**: Client-side file handling and validation
- **Blob API**: Binary data processing for image output