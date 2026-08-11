
import CategoryCard, { categoryType } from "../_components/CategoryCard";
import { Grid3X3, Layers } from "lucide-react";
import { getCategories } from "../_actions/GetCategories";


const CategoryPage = async () => {
    const categories = await getCategories();
    // console.log(categories, "this categories is from categories page");

    return (
        <div className="min-h-screen bg-muted/20">
            <div className="mx-auto max-w-7xl px-4 pb-16 pt-18 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8 lg:pt-24">
            {/* Page Header */}
            <div className="mb-4 sm:mb-8 text-center max-w-2xl mx-auto space-y-2">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                    <Layers className="size-3.5" />
                    <span>Property Types</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                    Browse Categories
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Explore all rental property categories to find the perfect space tailored to your lifestyle and budget.
                </p>
            </div>

            {/* Grid */}
            {categories && categories.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category: categoryType) => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
                </div>
            ) : (
                /* Empty State */
                <div className="flex flex-col items-center justify-center py-20 px-4 text-center border border-dashed border-border rounded-2xl bg-card/50 max-w-md mx-auto">
                    <div className="mb-4 flex size-16 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Grid3X3 className="size-8" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-1">
                        No categories available
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Please check back later or explore all properties directly.
                    </p>
                </div>
            )}
            </div>
        </div>
    );
}



export default CategoryPage;
