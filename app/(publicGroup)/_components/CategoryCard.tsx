import React from "react";
import Link from "next/link";
import { Building2, Home, Crown, ArrowRight, Sparkles } from "lucide-react";

export type categoryType = {
  id: string;
  name: string;
  slug: string;
  description: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
};

const CATEGORY_IMAGES: Record<string, string> = {
  apartment: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
  house: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
  penthouse: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=800&q=80",
};

function CategoryIcon({ name }: { name: string }) {
  const lower = name.toLowerCase();

  if (lower.includes("penthouse")) return <Crown className="size-5" />;
  if (lower.includes("house")) return <Home className="size-5" />;
  return <Building2 className="size-5" />;
}

const CategoryCard = ({ category }: { category: categoryType }) => {
  const { name, id, description, isActive } = category;

  const bgImage = CATEGORY_IMAGES[name.toLowerCase()] || CATEGORY_IMAGES.apartment;

  return (
    <Link
      href={`/properties?categoryId=${id}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border/35 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-lg hover:shadow-primary/5"
    >
      {/* Background Image with refined overlay gradient */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-muted">
        <img
          src={bgImage}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

        {/* Floating Icon badge */}
        <div className="absolute top-3.5 left-3.5 flex size-10 items-center justify-center rounded-lg bg-background/90 text-primary shadow-xs backdrop-blur-md transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 group-hover:rotate-6">
          <CategoryIcon name={name} />
        </div>

        {/* Active badge */}
        {isActive && (
          <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-emerald-500/90 text-white text-[11px] font-bold shadow-xs backdrop-blur-xs flex items-center gap-1">
            <Sparkles className="size-3" />
            <span>Verified</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between p-5 sm:p-6 space-y-4">
        <div className="space-y-1.5">
          <h3 className="text-lg font-bold tracking-tight text-foreground capitalize group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {description || `Browse curated ${name.toLowerCase()} listings with transparent terms.`}
          </p>
        </div>

        {/* Action Link */}
        <div className="flex items-center justify-between border-t border-border/35 pt-3 text-xs font-bold text-primary group-hover:text-primary/90">
          <span>Explore {name}s</span>
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
