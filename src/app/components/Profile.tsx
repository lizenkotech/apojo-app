import { Settings, Bell, Shield, HelpCircle, LogOut, ChevronRight, Mail, Phone, Calendar } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import type { UserContext } from "../App";

interface ProfileProps {
  userContext: UserContext;
  onLogout: () => void;
}

export default function Profile({ userContext, onLogout }: ProfileProps) {
  const getRoleLabel = (role: string) => {
    const labels: Record<string, string> = {
      medewerker: "Medewerker",
      bewoner: "Bewoner",
      familie: "Familielid",
      vrijwilliger: "Vrijwilliger"
    };
    return labels[role] || role;
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
      {/* Profile Header */}
      <Card className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="w-20 h-20">
            <AvatarFallback className="text-white text-2xl" style={{ background: 'linear-gradient(to bottom right, #55D6F4, #63F7B4)' }}>
              {userContext.name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="font-bold text-xl">{userContext.name}</h2>
            <p className="text-gray-600">{getRoleLabel(userContext.role)}</p>
            <Button variant="outline" size="sm" className="mt-2">
              Profiel bewerken
            </Button>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Mail className="w-4 h-4 text-gray-400" />
            <span className="text-gray-700">{userContext.name.toLowerCase().replace(/ /g, '.')}@example.com</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Phone className="w-4 h-4 text-gray-400" />
            <span className="text-gray-700">+31 6 1234 5678</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-gray-700">Lid sinds januari 2024</span>
          </div>
        </div>
      </Card>

      {/* Activity Stats */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Mijn Activiteit</h3>
        <div className="grid grid-cols-3 gap-4">
          {userContext.role === "vrijwilliger" ? (
            <>
              <div className="text-center p-3 rounded-lg" style={{ background: 'rgba(99, 247, 180, 0.15)' }}>
                <div className="text-2xl font-bold" style={{ color: '#63F7B4' }}>12</div>
                <div className="text-xs text-gray-600 mt-1">Vrijwilligers uren</div>
              </div>
              <div className="text-center p-3 rounded-lg" style={{ background: 'rgba(85, 214, 244, 0.15)' }}>
                <div className="text-2xl font-bold" style={{ color: '#55D6F4' }}>8</div>
                <div className="text-xs text-gray-600 mt-1">Activiteiten</div>
              </div>
              <div className="text-center p-3 rounded-lg" style={{ background: 'rgba(247, 249, 77, 0.15)' }}>
                <div className="text-2xl font-bold" style={{ color: '#F7F94D' }}>45</div>
                <div className="text-xs text-gray-600 mt-1">Mensen geholpen</div>
              </div>
            </>
          ) : userContext.role === "medewerker" ? (
            <>
              <div className="text-center p-3 rounded-lg" style={{ background: 'rgba(85, 214, 244, 0.15)' }}>
                <div className="text-2xl font-bold" style={{ color: '#55D6F4' }}>32</div>
                <div className="text-xs text-gray-600 mt-1">Berichten</div>
              </div>
              <div className="text-center p-3 rounded-lg" style={{ background: 'rgba(247, 249, 77, 0.15)' }}>
                <div className="text-2xl font-bold" style={{ color: '#F7F94D' }}>15</div>
                <div className="text-xs text-gray-600 mt-1">Activiteiten</div>
              </div>
              <div className="text-center p-3 rounded-lg" style={{ background: 'rgba(99, 247, 180, 0.15)' }}>
                <div className="text-2xl font-bold" style={{ color: '#63F7B4' }}>48</div>
                <div className="text-xs text-gray-600 mt-1">Deelnemers</div>
              </div>
            </>
          ) : (
            <>
              <div className="text-center p-3 rounded-lg" style={{ background: 'rgba(85, 214, 244, 0.15)' }}>
                <div className="text-2xl font-bold" style={{ color: '#55D6F4' }}>8</div>
                <div className="text-xs text-gray-600 mt-1">Activiteiten</div>
              </div>
              <div className="text-center p-3 rounded-lg" style={{ background: 'rgba(247, 249, 77, 0.15)' }}>
                <div className="text-2xl font-bold" style={{ color: '#F7F94D' }}>24</div>
                <div className="text-xs text-gray-600 mt-1">Berichten</div>
              </div>
              <div className="text-center p-3 rounded-lg" style={{ background: 'rgba(99, 247, 180, 0.15)' }}>
                <div className="text-2xl font-bold" style={{ color: '#63F7B4' }}>12</div>
                <div className="text-xs text-gray-600 mt-1">Vind-ik-leuks</div>
              </div>
            </>
          )}
        </div>
      </Card>

      {/* Notifications Settings */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Notificaties
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Nieuwe berichten</p>
              <p className="text-sm text-gray-500">Ontvang notificaties voor nieuwe berichten</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Activiteiten updates</p>
              <p className="text-sm text-gray-500">Herinneringen voor aankomende activiteiten</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          {(userContext.role === "vrijwilliger" || userContext.role === "medewerker") && (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Vrijwilligers oproepen</p>
                  <p className="text-sm text-gray-500">Nieuwe vrijwilligersmogelijkheden</p>
                </div>
                <Switch />
              </div>
              <Separator />
            </>
          )}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Nieuws en aankondigingen</p>
              <p className="text-sm text-gray-500">Updates van Apojo</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      {/* Settings Menu */}
      <Card className="divide-y">
        <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-gray-500" />
            <span className="font-medium">Instellingen</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-gray-500" />
            <span className="font-medium">Privacy & Beveiliging</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-5 h-5 text-gray-500" />
            <span className="font-medium">Help & Ondersteuning</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </Card>

      {/* Logout */}
      <Button
        variant="outline"
        className="w-full h-12 text-red-600 hover:text-red-700 hover:bg-red-50"
        onClick={onLogout}
      >
        <LogOut className="w-5 h-5 mr-2" />
        Uitloggen
      </Button>

      {/* Version Info */}
      <p className="text-center text-sm text-gray-400 py-4">
        Apojo Community App v1.0.0
      </p>
    </div>
  );
}
