/**
 * ═══════════════════════════════════════════════
 * PROJECT FROSTBORN — The Nordians
 * Oluşturulma   : 2026-07-10
 * Son Güncelleme: 2026-07-10
 * Dosya Sürümü  : Update 1
 * dev By Proftvv
 * ═══════════════════════════════════════════════
 */

import { requireUser } from "@/lib/guards";
import { prisma } from "@/lib/prisma";
import { hasLevel } from "@/lib/roles";
import Card from "@/components/ui/Card";
import EventRsvpForm from "@/components/panel/events/EventRsvpForm";
import EventCreateForm from "@/components/panel/events/EventCreateForm";

export const metadata = { title: "Etkinlikler" };

export default async function EventsPage() {
  const user = await requireUser();
  const events = await prisma.event.findMany({
    orderBy: { startsAt: "asc" },
    include: {
      author: { select: { name: true, callsign: true } },
      rsvps: { include: { user: { select: { id: true, name: true, callsign: true } } } },
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-snow-100">Etkinlik Takvimi</h1>
        <p className="mt-1 text-sm text-snow-300/60">Oyun günleri, operasyonlar ve katılım durumu.</p>
      </div>

      {hasLevel(user.role, 4) && <EventCreateForm />}

      <div className="space-y-4">
        {events.length === 0 ? (
          <Card className="text-center"><p className="text-sm text-snow-300/60">Henüz etkinlik yok.</p></Card>
        ) : events.map((event) => {
          const mine = event.rsvps.find((r) => r.user.id === user.id);
          const going = event.rsvps.filter((r) => r.status === "GOING").length;
          const maybe = event.rsvps.filter((r) => r.status === "MAYBE").length;
          return (
            <Card key={event.id}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-lg text-snow-100">{event.title}</h2>
                  <p className="mt-1 text-xs text-snow-300/50">{event.location} · {event.startsAt.toLocaleString("tr-TR")} · {event.author.callsign ?? event.author.name}</p>
                </div>
                <div className="text-right text-xs text-snow-300/50">
                  <p>{going} geliyor</p>
                  <p>{maybe} belki</p>
                </div>
              </div>
              <p className="mt-3 whitespace-pre-line text-sm text-snow-300/75">{event.description}</p>
              <EventRsvpForm eventId={event.id} initialStatus={mine?.status ?? null} />
            </Card>
          )
        })}
      </div>
    </div>
  )
}
