import { CircleCheck, Handshake, ReceiptText, ShieldCheck } from "lucide-react";

const clarityPoints = [
  {
    title: "Direct rental requests",
    description:
      "Tenants can send requests to property owners without depending on a middleman.",
    icon: Handshake,
  },
  {
    title: "Clear costs before you act",
    description:
      "Browse rent, deposits, and property details before deciding whether a home is right for you.",
    icon: ReceiptText,
  },
  {
    title: "A workspace for every role",
    description:
      "Tenants, landlords, and administrators each get the tools relevant to their rental work.",
    icon: ShieldCheck,
  },
];

export default function RentalClaritySection() {
  return (
    <section className="bg-muted/20 py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:px-8">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
            <CircleCheck className="size-3.5" />
            Built for clarity
          </div>
          <h2 className="max-w-xl text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Rental management should feel straightforward.
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
            RentNest keeps the important information, requests, and next steps in one place so both sides of a rental can move forward with confidence.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          {clarityPoints.map(({ title, description, icon: Icon }) => (
            <article key={title} className="flex gap-4 border-l-2 border-primary/20 py-3 pl-4 transition-colors hover:border-primary/60">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-foreground">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
