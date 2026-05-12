import { Clock, MessageCircleOff, MessageCircle } from "lucide-react";
import { Card } from "./ui/card";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

interface ChatAvailabilityProps {
  isAvailable: boolean;
  onToggle: (available: boolean) => void;
  userRole: string;
}

export default function ChatAvailability({ isAvailable, onToggle, userRole }: ChatAvailabilityProps) {
  if (userRole !== "medewerker") return null;

  return (
    <Card className="p-4 mb-4 border-l-4" style={{ borderLeftColor: '#F7F94D' }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isAvailable ? (
            <MessageCircle className="w-5 h-5" style={{ color: '#63F7B4' }} />
          ) : (
            <MessageCircleOff className="w-5 h-5 text-gray-400" />
          )}
          <div>
            <Label htmlFor="chat-availability" className="text-base font-semibold cursor-pointer">
              Beschikbaar voor berichten
            </Label>
            <p className="text-sm text-gray-600">
              {isAvailable ? "Je ontvangt nu berichten" : "Je bent niet beschikbaar"}
            </p>
          </div>
        </div>
        <Switch
          id="chat-availability"
          checked={isAvailable}
          onCheckedChange={onToggle}
        />
      </div>
    </Card>
  );
}

export function ChatAvailabilityIndicator({ isUserAvailable, recipientName }: { isUserAvailable: boolean; recipientName: string }) {
  if (isUserAvailable) {
    return (
      <div className="rounded-lg p-3 mb-3 flex items-center gap-2" style={{ background: 'rgba(99, 247, 180, 0.15)', border: '1px solid rgba(99, 247, 180, 0.4)' }}>
        <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#63F7B4' }} />
        <p className="text-sm text-gray-800">
          <span className="font-semibold">{recipientName}</span> is nu beschikbaar voor berichten
        </p>
      </div>
    );
  }

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-3">
      <div className="flex items-start gap-3">
        <Clock className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-semibold text-amber-900 mb-1">Niet beschikbaar</p>
          <p className="text-sm text-amber-700">
            <span className="font-semibold">{recipientName}</span> is nu niet beschikbaar voor berichten.
            Je kunt wel een bericht sturen, maar krijgt mogelijk later antwoord.
          </p>
        </div>
      </div>
    </div>
  );
}

export function ChatDisabledNotice() {
  return (
    <Card className="p-8 text-center border-2 border-dashed border-gray-300">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <MessageCircleOff className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="font-semibold text-gray-900 mb-2">Berichten tijdelijk uitgeschakeld</h3>
      <p className="text-sm text-gray-600 max-w-md mx-auto">
        Deze medewerker heeft berichten uitgeschakeld. Probeer het later nog eens of vraag om hulp bij een andere medewerker.
      </p>
    </Card>
  );
}
