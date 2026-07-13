import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import { TEAM_RULES } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Kurallarimiz",
  description: "The Nordians takim kurallari ve oyun disiplini.",
};

export default function RulesPage() {
  return (
    <main className="flex-1">
      <PageHero
        badge="Disiplin"
        title="KURALLARIMIZ"
        description="Takim ici standartlar ve sahadaki temel oyun kurallari."
      />

      <section className="pb-24">
        <Container className="max-w-3xl">
          <div className="space-y-4">
            {TEAM_RULES.map((rule, index) => (
              <Card key={rule}>
                <p className="text-sm text-snow-100">
                  <span className="mr-2 text-frost-ice">{index + 1}.</span>
                  {rule}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
