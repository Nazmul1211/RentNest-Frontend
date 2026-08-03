# RentNest — API Integration Guide

> **Related document:** [`README.md`](./README.md) — project overview, setup, and environment configuration.

---

## Table of Contents

- [Overview](#overview)
- [Base URL & Environment Setup](#base-url--environment-setup)
- [Authentication Strategy](#authentication-strategy)
- [Response Envelope](#response-envelope)
- [API Modules](#api-modules)
  - [Auth](#1-auth)
  - [Properties (Public)](#2-properties-public)
  - [Categories (Public)](#3-categories-public)
  - [Rentals (Tenant)](#4-rentals-tenant)
  - [Payments](#5-payments)
  - [Landlord](#6-landlord)
  - [Admin](#7-admin)
- [Rental Status Lifecycle](#rental-status-lifecycle)
- [Server Action Reference](#server-action-reference)
- [Error Handling](#error-handling)

---

## Overview

RentNest communicates with a dedicated REST backend hosted on Vercel. All data operations on the frontend — from browsing public listings to managing admin dashboards — are performed through Next.js **Server Actions**, which call the backend API server-side. No API keys or tokens are ever exposed to the browser.

**Backend Base URL:** `https://rent-nest-two.vercel.app`  
**Frontend Repository:** [RentNest-Frontend](https://github.com/Nazmul1211/RentNest-Frontend)  
**Live Frontend:** [https://rentnest-client.vercel.app](https://rentnest-client.vercel.app)

---

## Base URL & Environment Setup

All API requests are prefixed with the backend base URL, configured via an environment variable.

```env
# .env.local
BACKEND_APP_URL=https://rent-nest-two.vercel.app
NEXT_PUBLIC_API_URL=https://rent-nest-two.vercel.app
```

> **Note:** `BACKEND_APP_URL` is used exclusively in Server Actions (server-side). `NEXT_PUBLIC_API_URL` is available on the client when needed. Never commit `.env.local` to version control.

See [`README.md → Environment Variables Setup`](./README.md#environment-variables-setup) for full project setup instructions.

---

## Authentication Strategy

RentNest uses **JWT-based cookie authentication**. Upon a successful login, the backend issues two tokens:

| Token | Cookie Name | Max Age | Usage |
|---|---|---|---|
| Access Token | `accessToken` | 24 hours | Authorizes all protected requests |
| Refresh Token | `refreshToken` | 7 days | Reserved for session renewal |

**Flow:**

1. The user submits credentials via the Login form.
2. The `LoginAction` Server Action calls `POST /api/auth/login`.
3. On success, tokens are stored in **HttpOnly cookies** (inaccessible to JavaScript).
4. All subsequent Server Actions read the `accessToken` cookie server-side and attach it as a `Bearer` token in the `Authorization` header.

**Role-based redirection after login:**

| Role | Dashboard Route |
|---|---|
| `TENANT` | `/dashboard/tenant` |
| `LANDLORD` | `/dashboard/landlord` |
| `ADMIN` | `/dashboard/admin` |

**Logout:** Calling `LogoutAction` deletes both `accessToken` and `refreshToken` cookies.

---

## Response Envelope

All backend API responses conform to a consistent JSON envelope:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Request successful",
  "data": {}
}
```

For error responses:

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Validation failed",
  "errorMessage": "Detailed error description"
}
```

Server Actions inspect `result.success` before returning data to components.

---

## API Modules

### 1. Auth

> **Server Action files:** `app/(authGroup)/_actions/authAction.ts`, `app/(authGroup)/_actions/RegistrationAction.ts`

#### `POST /api/auth/register`

Register a new user account.

- **Auth required:** No
- **Request body:**

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "phone": "string",
  "role": "TENANT | LANDLORD"
}
```

---

#### `POST /api/auth/login`

Authenticate a user and receive JWT tokens.

- **Auth required:** No
- **Request body:**

```json
{
  "email": "string",
  "password": "string"
}
```

- **Success response data:**

```json
{
  "accessToken": "jwt_string",
  "refreshToken": "jwt_string"
}
```

The Server Action decodes the JWT to extract the user `role` and redirects accordingly.

---

### 2. Properties (Public)

> **Server Action file:** `app/(publicGroup)/_actions/GetProperties.ts`

#### `GET /api/properties`

Fetch all available property listings. Used on the public properties page and the homepage featured section.

- **Auth required:** No
- **Cache:** `no-store` (always fresh)
- **Response `data`:** Array of property objects

```json
[
  {
    "id": "string",
    "title": "string",
    "rentAmount": "string",
    "city": "string",
    "area": "string",
    "images": ["url"],
    "bedrooms": 2,
    "bathrooms": 1,
    "status": "string",
    "isAvailable": true,
    "category": { "id": "string", "title": "string" }
  }
]
```

> The homepage **Featured Properties** section filters this result, displaying only properties whose rental request status is **not** `APPROVED`, `PAID`, or `COMPLETED`.

---

#### `GET /api/properties/:id`

Fetch a single property's full details, including amenities, images, and description.

- **Auth required:** No
- **Cache:** `no-store`
- **Response `data`:** Single property object

---

### 3. Categories (Public)

> **Server Action file:** `app/(publicGroup)/_actions/GetCategories.ts`

#### `GET /api/categories`

Fetch all property categories (e.g., Apartment, Villa, Office).

- **Auth required:** No
- **Cache:** `no-store`
- **Response `data`:**

```json
[
  {
    "id": "string",
    "title": "string",
    "icon": "string"
  }
]
```

---

### 4. Rentals (Tenant)

> **Server Action files:** `app/(publicGroup)/_actions/RentalAction.ts`, `app/(dashboardGroup)/_action/TenantAction.ts`

#### `POST /api/rentals`

Submit a new rental request for a property. Requires the user to be authenticated as a **Tenant**.

- **Auth required:** Yes (`Bearer accessToken`)
- **Request body:**

```json
{
  "propertyId": "string",
  "moveInDate": "ISO 8601 date string",
  "moveOutDate": "ISO 8601 date string",
  "totalMonths": 3,
  "tenantMessage": "string",
  "monthlyRent": "string",
  "totalAmount": "string"
}
```

---

#### `GET /api/rentals`

Retrieve all rental requests submitted by the currently authenticated tenant.

- **Auth required:** Yes (`Bearer accessToken`)
- **Cache:** `no-store`
- **Response `data`:** Array of `RentalRequest` objects with `status`, `property`, and `payments`.

---

### 5. Payments

> **Server Action file:** `app/(dashboardGroup)/_action/MakeRentalPayment.ts`

#### `POST /api/payments/create`

Initiate a Stripe checkout session for an approved rental request. The backend creates the Stripe session and returns a checkout URL.

- **Auth required:** Yes (`Bearer accessToken`)
- **Request body:**

```json
{
  "rentalRequestId": "string"
}
```

- **Success response:**

```json
{
  "success": true,
  "data": {
    "checkoutUrl": "https://checkout.stripe.com/..."
  }
}
```

The Server Action performs a `redirect()` to the `checkoutUrl`. After payment, Stripe redirects the user to one of the following frontend routes (handled by the backend webhook):

| Outcome | Frontend Redirect Route |
|---|---|
| Payment success | `/payment/success` |
| Payment cancelled | `/payment/cancel` |

---

### 6. Landlord

> **Server Action file:** `app/(dashboardGroup)/_action/LandlordAction.ts`

All landlord endpoints require a valid `Bearer accessToken` for an account with the `LANDLORD` role.

#### `GET /api/landlord/properties`

Retrieve all properties created by the currently authenticated landlord.

---

#### `POST /api/landlord/properties`

Create a new property listing.

- **Request body:**

```json
{
  "title": "string",
  "slug": "auto-generated from title",
  "description": "string",
  "rentAmount": 15000,
  "securityDeposit": 30000,
  "address": "string",
  "city": "string",
  "area": "string",
  "country": "string",
  "postalCode": "string",
  "bedrooms": 3,
  "bathrooms": 2,
  "sizeSqft": 1200,
  "images": ["url1", "url2"],
  "amenities": ["WiFi", "Parking"],
  "categoryId": "string",
  "availableFrom": "ISO 8601 date string",
  "type": "string"
}
```

- **On success:** Revalidates `/dashboard/landlord/properties`

---

#### `PUT /api/landlord/properties/:id`

Update an existing property listing by its ID.

- **Request body:** Partial property fields (any combination of the fields above)
- **On success:** Revalidates `/dashboard/landlord/properties`

---

#### `DELETE /api/landlord/properties/:id`

Permanently delete a property listing.

- **On success:** Revalidates `/dashboard/landlord/properties`

---

#### `GET /api/landlord/requests`

Retrieve all rental requests submitted against the landlord's properties.

---

#### `PATCH /api/landlord/requests/:id`

Approve or reject a pending rental request.

- **Request body:**

```json
{
  "status": "APPROVED | REJECTED",
  "landlordNote": "Optional message to the tenant"
}
```

- **On success:** Revalidates `/dashboard/landlord/rental-request`

---

### 7. Admin

> **Server Action file:** `app/(dashboardGroup)/_action/AdminAction.ts`

All admin endpoints require a valid `Bearer accessToken` for an account with the `ADMIN` role.

#### `GET /api/admin/users`

Retrieve all registered users across the platform.

---

#### `GET /api/admin/users/:id`

Retrieve the full profile of a specific user by their ID.

---

#### `PATCH /api/admin/users/:id`

Update a user's `status` or `role`.

- **Request body:**

```json
{
  "status": "ACTIVE | SUSPENDED",
  "role": "TENANT | LANDLORD | ADMIN"
}
```

- **On success:** Revalidates `/dashboard/admin`

---

#### `GET /api/admin/properties`

Retrieve all property listings across the entire platform.

---

#### `GET /api/admin/rentals`

Retrieve all rental requests across the entire platform.

---

## Rental Status Lifecycle

Rental requests progress through the following statuses:

```
PENDING  →  APPROVED  →  PAID  →  COMPLETED
         ↘  REJECTED
```

| Status | Description |
|---|---|
| `PENDING` | Tenant submitted; awaiting landlord decision |
| `APPROVED` | Landlord approved; tenant can now initiate payment |
| `REJECTED` | Landlord rejected the request |
| `PAID` | Tenant completed Stripe payment |
| `COMPLETED` | Lease cycle completed |

---

## Server Action Reference

| Server Action | HTTP Method | Endpoint | Auth Required |
|---|---|---|---|
| `RegistrationAction` | `POST` | `/api/auth/register` | No |
| `LoginAction` | `POST` | `/api/auth/login` | No |
| `LogoutAction` | — | (clears cookies) | — |
| `GetCategories` | `GET` | `/api/categories` | No |
| `GetProperties` | `GET` | `/api/properties` | No |
| `GetSingleProperty` | `GET` | `/api/properties/:id` | No |
| `createRentalAction` | `POST` | `/api/rentals` | Tenant |
| `GetAllTenantRentalRequest` | `GET` | `/api/rentals` | Tenant |
| `MakeRentalPayment` | `POST` | `/api/payments/create` | Tenant |
| `GetAllLandlordProperties` | `GET` | `/api/landlord/properties` | Landlord |
| `CreateLandlordProperty` | `POST` | `/api/landlord/properties` | Landlord |
| `UpdateLandlordProperty` | `PUT` | `/api/landlord/properties/:id` | Landlord |
| `DeleteLandlordProperty` | `DELETE` | `/api/landlord/properties/:id` | Landlord |
| `GetRentalRequestsOfLandlordProperties` | `GET` | `/api/landlord/requests` | Landlord |
| `UpdateRentalRequestStatus` | `PATCH` | `/api/landlord/requests/:id` | Landlord |
| `GetAllUsersData` | `GET` | `/api/admin/users` | Admin |
| `GetSingleUser` | `GET` | `/api/admin/users/:id` | Admin |
| `UpdateUserData` | `PATCH` | `/api/admin/users/:id` | Admin |
| `GetAllLandlordProperties` (Admin) | `GET` | `/api/admin/properties` | Admin |
| `GetAllTenantRentalRequests` (Admin) | `GET` | `/api/admin/rentals` | Admin |

---

## Error Handling

All Server Actions implement a consistent error-handling pattern:

1. **Missing token:** Returns `{ success: false, message: "Please sign in..." }` before making any network call.
2. **Non-OK HTTP response:** Reads `result.message || result.errorMessage` from the response body and surfaces it to the component.
3. **Network / runtime error:** Caught in a `try/catch` block; returns a generic fallback message.
4. **Frontend display:** Components use the [Sonner](https://sonner.emilkowal.ski/) toast library to surface success/error messages returned by Server Actions.

---

*This document reflects the integration as implemented in the frontend codebase. For backend API contracts, schema definitions, and database models, refer to the backend repository at `https://rent-nest-two.vercel.app`.*
