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

const getCategoryIcon = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes("penthouse")) return Crown;
  if (lower.includes("house")) return Home;
  return Building2;
};


const CategoryCard = ({ category }: { category: categoryType }) => {

  const { name, id, description, isActive } = category;

  const Icon = getCategoryIcon(name);
  const bgImage = CATEGORY_IMAGES[name.toLowerCase()] || CATEGORY_IMAGES.apartment;

  return (
    <Link
      href={`/properties?categoryId=${id}`}
      className="group relative flex flex-col h-full bg-card rounded-2xl overflow-hidden border border-border/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-cyan-500/10 hover:border-cyan-500/40"
    >
      {/* Background Image with overlay gradient */}
      <div className="relative aspect-16/9 w-full overflow-hidden bg-muted">
        <img
          src={bgImage}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent" />

        {/* Floating Icon badge */}
        <div className="absolute top-4 left-4 size-10 rounded-xl bg-background/80 backdrop-blur-md border border-border/50 flex items-center justify-center shadow-sm text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-colors duration-300">
          <Icon className="size-5" />
        </div>

        {/* Active badge */}
        {isActive && (
          <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-cyan-600/90 text-white text-[10px] font-bold shadow-xs backdrop-blur-xs flex items-center gap-1">
            <Sparkles className="size-3" />
            <span>Active</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between p-6 -mt-6 z-10">
        <div className="space-y-2">
          <h3 className="text-xl font-bold tracking-tight text-foreground capitalize group-hover:text-cyan-600 transition-colors">
            {name}
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        {/* Action Link */}
        <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between text-xs font-semibold text-cyan-600 group-hover:text-cyan-700">
          <span>Browse {name}s</span>
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;