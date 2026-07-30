import React from "react";
import PropertyFilters from "../_components/PropertyFilters";
import PropertyCard, { Property } from "../_components/PropertyCard";
import PropertyPagination from "../_components/PropertyPagination";
import { Home, Info } from "lucide-react";

interface SearchParams {
    searchTerm?: string;
    categoryId?: string;
    minRent?: string;
    maxRent?: string;
    bedrooms?: string;
    sort?: string;
    page?: string;
}

const PropertiesPage = async ({ searchParams }: { searchParams: Promise<SearchParams> }) => {

    const search = await searchParams;

    // 1. Fetch properties and categories in parallel
    const [propertiesRes, categoriesRes] = await Promise.all([
        fetch(`${process.env.BACKEND_APP_URL}/api/properties`, {
            cache: "no-store",
        }),
        fetch(`${process.env.BACKEND_APP_URL}/api/categories`, {
            cache: "no-store",
        }),
    ]);

    let properties: Property[] = [];
    let categories = [];

    if (propertiesRes.ok) {
        const data = await propertiesRes.json();
        properties = data.data || [];
    }

    if (categoriesRes.ok) {
        const data = await categoriesRes.json();
        categories = data.data || [];
    }

    // 2. Perform robust search and filter options on Server Side
    let filteredProperties = [...properties];

    if (search.searchTerm) {
        const term = search.searchTerm.toLowerCase();
        filteredProperties = filteredProperties.filter(
            (p) =>
                p.title.toLowerCase().includes(term) ||
                p.description.toLowerCase().includes(term) ||
                p.area.toLowerCase().includes(term) ||
                p.city.toLowerCase().includes(term)
        );
    }

    if (search.categoryId) {
        filteredProperties = filteredProperties.filter(
            (p) => p.categoryId === search.categoryId
        );
    }

    if (search.minRent) {
        const min = Number(search.minRent);
        filteredProperties = filteredProperties.filter(
            (p) => Number(p.rentAmount) >= min
        );
    }

    if (search.maxRent) {
        const max = Number(search.maxRent);
        filteredProperties = filteredProperties.filter(
            (p) => Number(p.rentAmount) <= max
        );
    }

    if (search.bedrooms) {
        const beds = Number(search.bedrooms);
        filteredProperties = filteredProperties.filter((p) => {
            const numBeds = Number(p.bedrooms);
            return beds >= 5 ? numBeds >= 5 : numBeds === beds;
        });
    }

    // 3. Sorting
    if (search.sort === "price-asc") {
        filteredProperties.sort((a, b) => Number(a.rentAmount) - Number(b.rentAmount));
    } else if (search.sort === "price-desc") {
        filteredProperties.sort((a, b) => Number(b.rentAmount) - Number(a.rentAmount));
    } else {
        // Default: newest
        filteredProperties.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }

    // 4. Pagination
    const PAGE_SIZE = 6;
    const totalItems = filteredProperties.length;
    const totalPages = Math.ceil(totalItems / PAGE_SIZE) || 1;
    const currentPage = Math.min(Math.max(Number(search.page) || 1, 1), totalPages);

    const paginatedProperties = filteredProperties.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    return (
        <div className="min-h-screen bg-linear-to-b from-background to-muted/20 px-4 sm:px-6 lg:px-8 py-12 mt-16 max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-10 text-left space-y-2">
                <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                    Available Listings
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
                    Find your next nest. Browse and filter our handpicked collection of apartments, penthouses, and independent houses.
                </p>
            </div>

            {/* Main layout grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                {/* Sidebar Filters */}
                <aside className="lg:col-span-1 sticky top-24 z-20">
                    <PropertyFilters categories={categories} />
                </aside>

                {/* Listings Grid */}
                <main className="lg:col-span-3 space-y-6">
                    <div className="flex items-center justify-between text-xs text-muted-foreground pb-2 border-b border-border/40">
                        <span>
                            Showing <strong className="text-foreground">{paginatedProperties.length}</strong> of{" "}
                            <strong className="text-foreground">{totalItems}</strong> {totalItems === 1 ? "property" : "properties"}
                        </span>
                        {search.searchTerm && (
                            <span>
                                Search results for: &ldquo;<strong className="text-foreground">{search.searchTerm}</strong>&rdquo;
                            </span>
                        )}
                    </div>

                    {paginatedProperties.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {paginatedProperties.map((property) => (
                                    <div key={property.id} className="h-full">
                                        <PropertyCard property={property} />
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            <PropertyPagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                totalItems={totalItems}
                                pageSize={PAGE_SIZE}
                            />
                        </>
                    ) : (
                        /* Empty state */
                        <div className="flex flex-col items-center justify-center py-20 px-4 text-center border border-dashed border-border rounded-2xl bg-card/50">
                            <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                                <Home className="size-8 text-primary" />
                            </div>
                            <h3 className="text-lg font-bold text-foreground mb-1">
                                No properties match your filters
                            </h3>
                            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed mb-6">
                                Try widening your search range, changing your bedroom count, or resetting the filters.
                            </p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default PropertiesPage;