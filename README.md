# RentNest Frontend

RentNest is a modern, full-stack rental property management platform built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, and Shadcn UI. The platform provides a seamless experience for Tenants, Landlords, and Administrators to search properties, submit rental applications, manage listings, update user roles, and track payments.

---

## Table of Contents

- Overview
- Core Features
- Role-Based Features
  - Tenant Workspace
  - Landlord Workspace
  - Admin Workspace
- Tech Stack
- Getting Started
  - Prerequisites
  - Environment Variables Setup
  - Installation
  - Running Locally
  - Production Build
- Project Structure
- Scripts

---

## Overview

RentNest connects landlords offering residential and commercial properties with tenants seeking quality housing. It features real-time search, category filtering, landlord property submission workflows, tenant application management, and admin oversight.

---

## Core Features

- Responsive Modern UI: Built with Tailwind CSS and Shadcn UI components.
- Authentication & Authorization: Cookie-based JWT authentication supporting Tenant, Landlord, and Admin roles.
- Dynamic Search & Filtering: Filter properties by category, price, location, bedrooms, and availability.
- Interactive Modals: Edit property details, submit rental applications, and inspect payment transactions.
- Server Actions & API Integration: Server-side data fetching and revalidation using Next.js Server Actions.

---

## Role-Based Features

### Tenant Workspace
- Browse featured and categorized property listings.
- Filter properties by rent range, location, and specification.
- Submit rental applications with custom move-in dates and messages.
- View application status (Pending, Approved, Rejected, Paid) and submit lease payments.

### Landlord Workspace
- Create Property Listings: Multi-step form validated with React Hook Form and Zod schema.
- Manage Properties: Edit pricing, amenities, images, category, and availability dates, or delete listings with confirmation modals.
- Handle Rental Requests: Review incoming tenant applications, approve or reject requests, and view tenant messages.

### Admin Workspace
- User Management: Inspect registered users, filter by role (Tenant, Landlord, Admin), and update account statuses.
- Property Oversight: Monitor all property listings across the platform.
- Rental Request Tracking: Review overall rental applications, lease dates, and payment logs.

---

## Tech Stack

- Framework: Next.js 16 (App Router with Turbopack)
- Library: React 19
- Language: TypeScript
- Styling: Tailwind CSS, Lucide React Icons, Shadcn UI
- Form Management: React Hook Form, Zod (@hookform/resolvers)
- Notifications: Sonner Toast

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- Node.js: v18.0.0 or higher
- Package Manager: pnpm (recommended) or npm

### Environment Variables Setup

Create a `.env.local` file in the root directory of the project and add the following configuration:

```env
BACKEND_APP_URL=https://rent-nest-two.vercel.app
NEXT_PUBLIC_API_URL=https://rent-nest-two.vercel.app
```

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Nazmul1211/RentNest-Frontend.git
cd RentNest-Frontend
pnpm install
```

### Running Locally

Start the development server:

```bash
pnpm dev
```

Open [https://rentnest-client.vercel.app/](https://rentnest-client.vercel.app/) in your browser to view the application.

### Production Build

To create an optimized production build:

```bash
pnpm build
pnpm start
```

---

## Project Structure

```
app/
├── (authGroup)/            # Authentication routes (login, register)
├── (dashboardGroup)/       # Role-based dashboard routes
│   ├── _action/            # Server actions (LandlordAction, TenantAction, AdminAction)
│   ├── _components/        # Dashboard specific UI components
│   ├── _schema/            # Zod validation schemas (createPropertiesSchema.ts)
│   └── dashboard/
│       ├── admin/          # Admin workspace & subpages (users, properties, rental-requests)
│       ├── landlord/       # Landlord workspace & subpages (create-properties, properties, rental-request)
│       └── tenant/         # Tenant workspace
├── (publicGroup)/          # Public routes (landing page, property details, categories)
├── globals.css             # Global CSS styles & Tailwind configuration
├── layout.tsx              # Root layout component
└── not-found.tsx          # Custom 404 Error page
```

---

## Scripts

- `pnpm dev`: Runs the development server
- `pnpm build`: Builds the production application
- `pnpm start`: Starts the production server
- `pnpm lint`: Runs ESLint for code analysis
