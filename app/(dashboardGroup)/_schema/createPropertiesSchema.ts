import { z } from "zod";

// Zod Validation Schema for Landlord Property Creation
export const propertySchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    rentAmount: z.number().min(1, "Rent amount must be greater than 0"),
    securityDeposit: z.number().min(0, "Security deposit cannot be negative"),
    address: z.string().min(1, "Address is required"),
    area: z.string().min(1, "Area is required"),
    city: z.string().min(1, "City is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    country: z.string().min(1, "Country is required"),
    bedrooms: z.number().min(1, "At least 1 bedroom is required"),
    bathrooms: z.number().min(1, "At least 1 bathroom is required"),
    sizeSqft: z.number().min(1, "Size (sqft) is required"),
    categoryId: z.string().min(1, "Please select a category"),
    type: z.string().optional(),
    availableFrom: z.string().optional(),
    amenities: z.string().min(1, "At least one amenity is required"),
    images: z.string().min(1, "At least one image URL is required"),
});

export type PropertyFormData = z.infer<typeof propertySchema>;
