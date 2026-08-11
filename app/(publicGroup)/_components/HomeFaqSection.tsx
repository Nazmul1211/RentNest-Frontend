import { CircleHelp } from "lucide-react";

const questions = [
  {
    question: "Is RentNest free for tenants?",
    answer:
      "Yes. Tenants can search listings and submit rental requests without a monthly platform charge.",
  },
  {
    question: "How are landlords charged?",
    answer:
      "Landlords do not pay a monthly subscription. RentNest applies a one-time 2% fee of the first month’s rent only when a tenancy is finalized.",
  },
  {
    question: "How does a rental request work?",
    answer:
      "A tenant sends a request from a property listing. The landlord can review it in their dashboard, then approve or reject it before the payment step.",
  },
  {
    question: "Can I manage my activity after signing in?",
    answer:
      "Yes. RentNest provides role-based dashboards so tenants can follow requests and landlords can manage properties and incoming applications.",
  },
];

export default function HomeFaqSection() {
  return (
    <section className="bg-muted/20 py-16 sm:py-20">
      <div className="mx-auto grid max-w-5xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
        <div className="space-y-4">
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <CircleHelp className="size-5" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Questions before you get started?
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Here are the practical details renters and property owners ask about most often.
          </p>
        </div>

        <div className="divide-y divide-border/60">
          {questions.map(({ question, answer }, index) => (
            <details key={question} className="group py-4" open={index === 0}>
              <summary className="cursor-pointer list-none pr-8 font-bold text-foreground marker:hidden">
                {question}
                <span className="float-right text-lg leading-none text-primary transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="pt-3 text-sm leading-relaxed text-muted-foreground">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
