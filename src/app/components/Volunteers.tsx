import { Heart, Clock, CheckCircle2, Calendar, MapPin, Users } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback } from "./ui/avatar";
import type { UserContext } from "../App";

interface VolunteersProps {
  userContext: UserContext;
}

const mockVolunteerOpportunities = [
  {
    id: 1,
    title: "Hulp bij Bingo Middag",
    date: "2026-05-13",
    time: "13:30 - 16:30",
    location: "Grote Zaal",
    volunteersNeeded: 3,
    volunteersRegistered: 1,
    description: "Helpen met opstellen, begeleiden en opruimen van de bingo-middag",
    category: "Evenement",
    isApplied: false
  },
  {
    id: 2,
    title: "Wandelbegeleiding",
    date: "2026-05-16",
    time: "10:45 - 12:45",
    location: "Vertrek bij receptie",
    volunteersNeeded: 2,
    volunteersRegistered: 2,
    description: "Bewoners begeleiden tijdens wandeling in het park",
    category: "Begeleiding",
    isApplied: true
  },
  {
    id: 3,
    title: "Voorleesuur",
    date: "2026-05-17",
    time: "14:00 - 15:00",
    location: "Bibliotheek",
    volunteersNeeded: 1,
    volunteersRegistered: 0,
    description: "Voorlezen aan bewoners in de gezellige bibliotheek",
    category: "Sociaal",
    isApplied: false
  },
  {
    id: 4,
    title: "Tuinonderhoud",
    date: "2026-05-19",
    time: "09:00 - 12:00",
    location: "Buitentuin",
    volunteersNeeded: 4,
    volunteersRegistered: 2,
    description: "Helpen met onderhoud van de moestuin en bloembakken",
    category: "Praktisch",
    isApplied: false
  }
];

const myVolunteerActivities = mockVolunteerOpportunities.filter(v => v.isApplied);
const availableOpportunities = mockVolunteerOpportunities.filter(v => !v.isApplied);

const categoryColors: Record<string, string> = {
  "Evenement": "bg-purple-100 text-purple-700 border-purple-200",
  "Begeleiding": "bg-blue-100 text-blue-700 border-blue-200",
  "Sociaal": "bg-rose-100 text-rose-700 border-rose-200",
  "Praktisch": "bg-green-100 text-green-700 border-green-200"
};

export default function Volunteers({ userContext }: VolunteersProps) {
  // Show stats for vrijwilligers and medewerkers
  const showStats = userContext.role === "vrijwilliger" || userContext.role === "medewerker";

  return (
    <div className="max-w-2xl mx-auto px-4 py-4">
      {/* Stats Card */}
      {showStats && (
        <Card className="p-6 mb-4 text-white" style={{ background: 'linear-gradient(to bottom right, #55D6F4, #63F7B4)' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-xl">Vrijwilligers</h2>
              <p className="text-white/90 text-sm">Maak het verschil</p>
            </div>
          </div>
          {userContext.role === "vrijwilliger" && (
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <div className="text-2xl font-bold">12</div>
                <div className="text-xs text-white/90">Uren dit jaar</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">8</div>
                <div className="text-xs text-white/90">Activiteiten</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">45</div>
                <div className="text-xs text-white/90">Mensen geholpen</div>
              </div>
            </div>
          )}
          {userContext.role === "medewerker" && (
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <div className="text-2xl font-bold">24</div>
                <div className="text-xs text-white/90">Actieve vrijwilligers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">156</div>
                <div className="text-xs text-white/90">Uren deze maand</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">12</div>
                <div className="text-xs text-white/90">Open oproepen</div>
              </div>
            </div>
          )}
        </Card>
      )}

      <Tabs defaultValue="available" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="available" className="text-base">
            Beschikbaar
          </TabsTrigger>
          <TabsTrigger value="myactivities" className="text-base">
            Mijn Inzet
          </TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-3">
          {availableOpportunities.map((opportunity) => {
            const isFull = opportunity.volunteersRegistered >= opportunity.volunteersNeeded;

            return (
              <Card key={opportunity.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{opportunity.title}</h3>
                      <Badge
                        variant="outline"
                        className={categoryColors[opportunity.category]}
                      >
                        {opportunity.category}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{opportunity.description}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{new Date(opportunity.date).toLocaleDateString("nl-NL", { weekday: "long", day: "numeric", month: "long" })}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{opportunity.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{opportunity.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className={isFull ? "text-amber-600 font-medium" : "text-gray-700"}>
                      {opportunity.volunteersRegistered} / {opportunity.volunteersNeeded} vrijwilligers
                    </span>
                    {isFull && <Badge variant="secondary" className="ml-1">Vol</Badge>}
                  </div>
                </div>

                <Button
                  className="w-full h-12 text-base"
                  disabled={isFull}
                  variant={isFull ? "secondary" : "default"}
                >
                  {isFull ? "Volzet" : "Aanmelden als vrijwilliger"}
                </Button>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="myactivities" className="space-y-3">
          {myVolunteerActivities.length > 0 ? (
            myVolunteerActivities.map((activity) => (
              <Card key={activity.id} className="p-4 border-l-4 border-l-green-500">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <h3 className="font-semibold text-lg">{activity.title}</h3>
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

                {/* Other Volunteers */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Andere vrijwilligers:</p>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-white text-xs" style={{ background: 'linear-gradient(to bottom right, #55D6F4, #63F7B4)' }}>MB</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-700">Maria Berg</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full h-12 text-base">
                  Afmelden
                </Button>
              </Card>
            ))
          ) : (
            <Card className="p-8 text-center">
              <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 mb-4">Je hebt je nog niet aangemeld als vrijwilliger</p>
              <p className="text-sm text-gray-400">Bekijk beschikbare mogelijkheden en meld je aan!</p>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
