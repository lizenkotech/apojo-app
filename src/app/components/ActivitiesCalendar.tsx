import { Calendar, Clock, MapPin, Users, ChevronRight, Plus } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { useState } from "react";
import type { UserContext } from "../App";

interface ActivitiesCalendarProps {
  userContext: UserContext;
}

const mockActivities = [
  {
    id: 1,
    title: "Bingo Middag",
    date: "2026-05-13",
    time: "14:00 - 16:00",
    location: "Grote Zaal",
    attendees: 12,
    maxAttendees: 20,
    category: "Spel",
    description: "Gezellige bingo-middag met koffie en thee",
    isRegistered: false,
    visibleFor: ["medewerker", "bewoner", "familie", "vrijwilliger"]
  },
  {
    id: 2,
    title: "Aquarel Workshop",
    date: "2026-05-15",
    time: "10:00 - 12:00",
    location: "Atelier",
    attendees: 15,
    maxAttendees: 20,
    category: "Creatief",
    description: "Leer aquarelleren met professionele begeleiding",
    isRegistered: true,
    visibleFor: ["medewerker", "bewoner", "familie", "vrijwilliger"]
  },
  {
    id: 3,
    title: "Wandeling in het Park",
    date: "2026-05-16",
    time: "11:00 - 12:30",
    location: "Vertrek bij receptie",
    attendees: 8,
    maxAttendees: 15,
    category: "Beweging",
    description: "Ontspannen wandeling door het nabijgelegen park",
    isRegistered: false,
    visibleFor: ["medewerker", "bewoner", "familie", "vrijwilliger"]
  },
  {
    id: 4,
    title: "Muziekmiddag",
    date: "2026-05-18",
    time: "15:00 - 17:00",
    location: "Grote Zaal",
    attendees: 18,
    maxAttendees: 25,
    category: "Cultuur",
    description: "Live muziek van lokaal koor",
    isRegistered: true,
    visibleFor: ["medewerker", "bewoner", "familie", "vrijwilliger"]
  },
  {
    id: 5,
    title: "Kookworkshop",
    date: "2026-05-20",
    time: "13:00 - 15:30",
    location: "Keuken",
    attendees: 6,
    maxAttendees: 10,
    category: "Culinair",
    description: "Samen een heerlijk driegangenmenu bereiden",
    isRegistered: false,
    visibleFor: ["medewerker", "bewoner", "familie", "vrijwilliger"]
  },
  {
    id: 6,
    title: "Familiebijeenkomst",
    date: "2026-05-22",
    time: "19:00 - 20:30",
    location: "Vergaderzaal",
    attendees: 14,
    maxAttendees: 30,
    category: "Overleg",
    description: "Bespreking nieuwe activiteiten komend seizoen",
    isRegistered: false,
    visibleFor: ["medewerker", "familie"]
  }
];

const categoryColors: Record<string, string> = {
  "Spel": "bg-amber-100 text-amber-700 border-amber-200",
  "Creatief": "bg-purple-100 text-purple-700 border-purple-200",
  "Beweging": "bg-green-100 text-green-700 border-green-200",
  "Cultuur": "bg-blue-100 text-blue-700 border-blue-200",
  "Culinair": "bg-rose-100 text-rose-700 border-rose-200",
  "Overleg": "bg-gray-100 text-gray-700 border-gray-200"
};

export default function ActivitiesCalendar({ userContext }: ActivitiesCalendarProps) {
  const [createActivityOpen, setCreateActivityOpen] = useState(false);

  // Filter activities based on user role
  const visibleActivities = mockActivities.filter(activity =>
    activity.visibleFor.includes(userContext.role)
  );

  const upcomingActivities = visibleActivities.filter(a => !a.isRegistered);
  const myActivities = visibleActivities.filter(a => a.isRegistered);

  const canCreateActivity = userContext.role === "medewerker";

  return (
    <div className="max-w-2xl mx-auto px-4 py-4">
      {/* Create Activity Button (Medewerkers only) */}
      {canCreateActivity && (
        <Dialog open={createActivityOpen} onOpenChange={setCreateActivityOpen}>
          <DialogTrigger asChild>
            <Button className="w-full mb-4 h-12 text-base">
              <Plus className="w-5 h-5 mr-2" />
              Nieuwe activiteit aanmaken
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Nieuwe activiteit aanmaken</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Titel</Label>
                <Input id="title" placeholder="Bijv. Bingo Middag" className="h-12" />
              </div>

              <div>
                <Label htmlFor="description">Beschrijving</Label>
                <Textarea
                  id="description"
                  placeholder="Korte beschrijving van de activiteit"
                  className="min-h-20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="date">Datum</Label>
                  <Input id="date" type="date" className="h-12" />
                </div>
                <div>
                  <Label htmlFor="time">Tijd</Label>
                  <Input id="time" placeholder="14:00 - 16:00" className="h-12" />
                </div>
              </div>

              <div>
                <Label htmlFor="location">Locatie</Label>
                <Input id="location" placeholder="Bijv. Grote Zaal" className="h-12" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="category">Categorie</Label>
                  <Input id="category" placeholder="Bijv. Spel" className="h-12" />
                </div>
                <div>
                  <Label htmlFor="maxAttendees">Max deelnemers</Label>
                  <Input id="maxAttendees" type="number" placeholder="20" className="h-12" />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1 h-12"
                  onClick={() => setCreateActivityOpen(false)}
                >
                  Annuleren
                </Button>
                <Button
                  className="flex-1 h-12"
                  onClick={() => setCreateActivityOpen(false)}
                >
                  Activiteit aanmaken
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="upcoming" className="text-base">
            Aankomend
          </TabsTrigger>
          <TabsTrigger value="registered" className="text-base">
            Mijn Activiteiten
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-3">
          {upcomingActivities.map((activity) => (
            <Card key={activity.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{activity.title}</h3>
                    <Badge
                      variant="outline"
                      className={categoryColors[activity.category]}
                    >
                      {activity.category}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{activity.description}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{new Date(activity.date).toLocaleDateString("nl-NL", { weekday: "long", day: "numeric", month: "long" })}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>{activity.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{activity.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span>{activity.attendees} / {activity.maxAttendees} deelnemers</span>
                </div>
              </div>

              <Button className="w-full h-12 text-base">
                Inschrijven
                <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="registered" className="space-y-3">
          {myActivities.length > 0 ? (
            myActivities.map((activity) => (
              <Card key={activity.id} className="p-4 border-l-4" style={{ borderLeftColor: '#63F7B4' }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{activity.title}</h3>
                      <Badge
                        variant="outline"
                        className={categoryColors[activity.category]}
                      >
                        {activity.category}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{activity.description}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{new Date(activity.date).toLocaleDateString("nl-NL", { weekday: "long", day: "numeric", month: "long" })}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{activity.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{activity.location}</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full h-12 text-base">
                  Uitschrijven
                </Button>
              </Card>
            ))
          ) : (
            <Card className="p-8 text-center">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Je hebt je nog niet ingeschreven voor activiteiten</p>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
