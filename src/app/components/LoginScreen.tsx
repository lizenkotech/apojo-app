import { UserCircle, Briefcase, Home as HomeIcon, Heart, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import type { UserContext, UserRole } from "../App";

interface LoginScreenProps {
  onLogin: (user: UserContext) => void;
}

const roleOptions: { role: UserRole; label: string; icon: React.ReactNode; description: string; color: string }[] = [
  {
    role: "medewerker",
    label: "Medewerker",
    icon: <Briefcase className="w-8 h-8" />,
    description: "Begeleider of personeelslid",
    color: "#55D6F4"
  },
  {
    role: "bewoner",
    label: "Bewoner",
    icon: <HomeIcon className="w-8 h-8" />,
    description: "Ik woon bij Apojo",
    color: "#63F7B4"
  },
  {
    role: "familie",
    label: "Familie",
    icon: <Heart className="w-8 h-8" />,
    description: "Familielid van een bewoner",
    color: "#F7F94D"
  },
  {
    role: "vrijwilliger",
    label: "Vrijwilliger",
    icon: <Users className="w-8 h-8" />,
    description: "Ik help als vrijwilliger",
    color: "#63F7B4"
  }
];

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const handleRoleSelect = (role: UserRole) => {
    // Simulate login with mock user data
    const mockUsers: Record<UserRole, UserContext> = {
      medewerker: { role: "medewerker", name: "Maria van den Berg", id: "1" },
      bewoner: { role: "bewoner", name: "Jan de Jong", id: "2" },
      familie: { role: "familie", name: "Sophie de Vries", id: "3" },
      vrijwilliger: { role: "vrijwilliger", name: "Peter Janssen", id: "4" }
    };

    onLogin(mockUsers[role]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Welcome */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg" style={{ background: '#55D6F4', border: '4px solid #F7F94D' }}>
            <span className="font-bold text-3xl" style={{ color: '#F7F94D' }}>A</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welkom bij Apojo</h1>
          <p className="text-gray-600">Selecteer je rol om in te loggen</p>
        </div>

        {/* Role Selection */}
        <div className="space-y-3">
          {roleOptions.map((option) => (
            <Card
              key={option.role}
              className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => handleRoleSelect(option.role)}
            >
              <div className="flex items-center p-5">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform" style={{ background: option.color }}>
                  {option.icon}
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="font-semibold text-lg text-gray-900">{option.label}</h3>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </div>
                <div className="ml-2">
                  <svg width="32" height="32" viewBox="0 0 32 32" className="group-hover:opacity-100">
                    <circle cx="16" cy="16" r="14" fill="none" stroke="#d1d5db" strokeWidth="2" className="group-hover:stroke-[#55D6F4] transition-colors" />
                    <circle cx="16" cy="16" r="8" fill="transparent" className="group-hover:fill-[#55D6F4] transition-colors" />
                  </svg>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Voor deze demo kun je elke rol selecteren
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Apojo Community App v1.0.0
          </p>
        </div>
      </div>
    </div>
  );
}
