import { X, Calendar, Heart, MessageCircle, Users, Bell } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import type { UserContext } from "../App";

interface NotificationsProps {
  onClose: () => void;
  userContext: UserContext;
}

const mockNotifications = [
  {
    id: 1,
    type: "activity",
    title: "Nieuwe activiteit: Aquarel Workshop",
    message: "Er is een nieuwe workshop gepland op 15 mei. Schrijf je in!",
    time: "2 uur geleden",
    read: false,
    icon: Calendar,
    color: "text-blue-600 bg-blue-100"
  },
  {
    id: 2,
    type: "message",
    title: "Nieuw bericht van Maria",
    message: "De bingo-middag is bevestigd voor volgende week!",
    time: "5 uur geleden",
    read: false,
    icon: MessageCircle,
    color: "text-gray-900"
  },
  {
    id: 3,
    type: "volunteer",
    title: "Vrijwilligers gezocht",
    message: "We zoeken nog 2 vrijwilligers voor de wandeling op 16 mei",
    time: "1 dag geleden",
    read: false,
    icon: Users,
    color: "text-gray-900"
  },
  {
    id: 4,
    type: "like",
    title: "Jan vindt je bericht leuk",
    message: "Jan Pieters heeft gereageerd op je foto van de tuinworkshop",
    time: "2 dagen geleden",
    read: true,
    icon: Heart,
    color: "text-gray-900"
  },
  {
    id: 5,
    type: "activity",
    title: "Herinnering: Muziekmiddag morgen",
    message: "Vergeet niet: morgen om 15:00 uur begint de muziekmiddag",
    time: "3 dagen geleden",
    read: true,
    icon: Calendar,
    color: "text-blue-600 bg-blue-100"
  }
];

export default function Notifications({ onClose, userContext }: NotificationsProps) {
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <div className="max-w-2xl mx-auto px-4 py-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Meldingen</h2>
          {unreadCount > 0 && (
            <p className="text-sm text-gray-600 mt-1">
              {unreadCount} nieuwe {unreadCount === 1 ? 'melding' : 'meldingen'}
            </p>
          )}
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-6 h-6" />
        </Button>
      </div>

      {/* Notifications List */}
      {mockNotifications.length > 0 ? (
        <div className="space-y-2">
          {mockNotifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <Card
                key={notification.id}
                className={`p-4 ${!notification.read ? 'border-l-4' : ''} hover:shadow-md transition-shadow cursor-pointer`}
                style={!notification.read ? { borderLeftColor: '#F7F94D', backgroundColor: 'rgba(247, 249, 77, 0.1)' } : {}}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full ${notification.color} flex items-center justify-center shrink-0`} style={notification.type === 'message' ? { background: '#F7F94D' } : notification.type === 'volunteer' || notification.type === 'like' ? { background: '#63F7B4' } : { background: '#55D6F4' }}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <Badge className="text-gray-900 shrink-0" style={{ background: '#F7F94D' }}>Nieuw</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                    <p className="text-xs text-gray-400">{notification.time}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bell className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Geen meldingen</h3>
          <p className="text-sm text-gray-500">Je bent helemaal bij!</p>
        </Card>
      )}

      {/* Actions */}
      {mockNotifications.length > 0 && (
        <div className="mt-6 flex gap-3">
          <Button variant="outline" className="flex-1 h-12">
            Alles als gelezen markeren
          </Button>
          <Button variant="ghost" className="flex-1 h-12">
            Alles verwijderen
          </Button>
        </div>
      )}
    </div>
  );
}
