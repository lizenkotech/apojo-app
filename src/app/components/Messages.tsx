import { Search, MoreVertical, Send, Clock, MessageCircleOff } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { useState } from "react";
import { Badge } from "./ui/badge";
import ChatAvailability, { ChatAvailabilityIndicator, ChatDisabledNotice } from "./ChatAvailability";
import type { UserContext } from "../App";

interface MessagesProps {
  userContext: UserContext;
  isChatAvailable: boolean;
  onChatAvailabilityChange: (available: boolean) => void;
}

interface Conversation {
  id: number;
  name: string;
  role: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  isGroup?: boolean;
  visibleFor: string[];
  isStaffMember?: boolean;
  staffAvailable?: boolean;
}

const mockConversations: Conversation[] = [
  {
    id: 1,
    name: "Maria van den Berg",
    role: "Medewerker",
    lastMessage: "De bingo-middag is bevestigd voor volgende week!",
    time: "10:30",
    unread: 2,
    online: true,
    visibleFor: ["medewerker", "bewoner", "familie", "vrijwilliger"],
    isStaffMember: true,
    staffAvailable: true
  },
  {
    id: 2,
    name: "Familie Groep",
    role: "Groepschat",
    lastMessage: "Sophie: Bedankt voor de updates over mama",
    time: "Gisteren",
    unread: 0,
    online: false,
    isGroup: true,
    visibleFor: ["medewerker", "familie"]
  },
  {
    id: 3,
    name: "Jan Pieters",
    role: "Bewoner",
    lastMessage: "Dank je wel voor je hulp vandaag!",
    time: "2 dagen",
    unread: 0,
    online: false,
    visibleFor: ["medewerker", "bewoner", "vrijwilliger"]
  },
  {
    id: 4,
    name: "Vrijwilligers Team",
    role: "Groepschat",
    lastMessage: "Peter: Ik kan woensdag helpen",
    time: "3 dagen",
    unread: 1,
    online: false,
    isGroup: true,
    visibleFor: ["medewerker", "vrijwilliger"]
  },
  {
    id: 5,
    name: "Sophie de Vries",
    role: "Medewerker",
    lastMessage: "Tot morgen!",
    time: "3 dagen",
    unread: 0,
    online: false,
    visibleFor: ["medewerker", "bewoner", "familie", "vrijwilliger"],
    isStaffMember: true,
    staffAvailable: false
  }
];

export default function Messages({ userContext, isChatAvailable, onChatAvailabilityChange }: MessagesProps) {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [messageText, setMessageText] = useState("");

  // Filter conversations based on user role
  const visibleConversations = mockConversations.filter(conv =>
    conv.visibleFor.includes(userContext.role)
  );

  if (selectedConversation) {
    const conversation = visibleConversations.find(c => c.id === selectedConversation);

    if (!conversation) {
      setSelectedConversation(null);
      return null;
    }

    // Check if this is a staff member and if they're available
    const isStaffChat = conversation.isStaffMember;
    const staffIsAvailable = conversation.staffAvailable ?? true;
    const canSendMessage = !isStaffChat || staffIsAvailable || userContext.role === "medewerker";

    return (
      <div className="flex flex-col h-full">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedConversation(null)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                ← Terug
              </button>
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-green-500 text-white">
                  {conversation.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{conversation.name}</h3>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-gray-500">{conversation.role}</p>
                  {isStaffChat && staffIsAvailable && (
                    <Badge variant="outline" className="text-xs border-0 text-gray-900" style={{ background: '#63F7B4' }}>
                      Beschikbaar
                    </Badge>
                  )}
                  {isStaffChat && !staffIsAvailable && (
                    <Badge variant="outline" className="bg-gray-100 text-gray-600 border-gray-200 text-xs">
                      Niet beschikbaar
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <MoreVertical className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-4">
          <div className="max-w-2xl mx-auto space-y-4">
            {/* Availability Indicator for non-staff users */}
            {isStaffChat && userContext.role !== "medewerker" && (
              <ChatAvailabilityIndicator
                isUserAvailable={staffIsAvailable}
                recipientName={conversation.name}
              />
            )}

            {/* Sample messages */}
            <div className="flex gap-2">
              <Avatar className="w-8 h-8 mt-1">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-green-500 text-white text-xs">
                  {conversation.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm max-w-[80%]">
                  <p className="text-sm">Hoi! Hoe gaat het met je?</p>
                </div>
                <p className="text-xs text-gray-500 mt-1 ml-2">9:45</p>
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <div className="flex-1 flex justify-end">
                <div className="text-white rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm max-w-[80%]" style={{ background: '#63F7B4' }}>
                  <p className="text-sm">Prima, dank je! En met jou?</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Avatar className="w-8 h-8 mt-1">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-green-500 text-white text-xs">
                  {conversation.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm max-w-[80%]">
                  <p className="text-sm">{conversation.lastMessage}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1 ml-2">{conversation.time}</p>
              </div>
            </div>

            {/* Show disabled notice if staff is not available and user is not staff */}
            {isStaffChat && !staffIsAvailable && userContext.role !== "medewerker" && (
              <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 mt-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-amber-900 mb-1">Let op!</p>
                    <p className="text-sm text-amber-700">
                      {conversation.name} heeft aangegeven nu niet beschikbaar te zijn voor berichten.
                      Je bericht wordt bewaard en zij kunnen het later lezen.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 px-4 py-3">
          <div className="max-w-2xl mx-auto">
            {canSendMessage ? (
              <div className="flex items-center gap-2">
                <Input
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder={isStaffChat && !staffIsAvailable ? "Bericht (wordt later gelezen)..." : "Typ een bericht..."}
                  className="flex-1 h-12 text-base rounded-full"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && messageText.trim()) {
                      setMessageText("");
                    }
                  }}
                />
                <Button size="icon" className="h-12 w-12 rounded-full" disabled={!messageText.trim()}>
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            ) : (
              <div className="bg-gray-100 border-2 border-gray-300 rounded-full px-6 py-3 flex items-center justify-center gap-3">
                <MessageCircleOff className="w-5 h-5 text-gray-500" />
                <p className="text-sm text-gray-600 font-medium">
                  Berichten zijn tijdelijk uitgeschakeld
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-4">
      {/* Chat Availability Toggle (Medewerkers only) */}
      <ChatAvailability
        isAvailable={isChatAvailable}
        onToggle={onChatAvailabilityChange}
        userRole={userContext.role}
      />

      {/* Information Card for Bewoners */}
      {userContext.role === "bewoner" && (
        <Card className="p-4 mb-4" style={{ background: 'rgba(85, 214, 244, 0.1)', border: '1px solid rgba(85, 214, 244, 0.3)' }}>
          <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <MessageCircleOff className="w-5 h-5" style={{ color: '#55D6F4' }} />
            Wanneer kan ik berichten sturen?
          </h3>
          <ul className="text-sm text-gray-800 space-y-2">
            <li className="flex items-start gap-2">
              <span className="font-bold mt-0.5" style={{ color: '#63F7B4' }}>✓</span>
              <span>Als er een <strong style={{ color: '#63F7B4' }}>groene stip</strong> staat bij de naam, is de medewerker beschikbaar</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 font-bold mt-0.5">!</span>
              <span>Zonder groene stip? Je kunt wel een bericht sturen, maar krijgt mogelijk later antwoord</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold mt-0.5" style={{ color: '#55D6F4' }}>i</span>
              <span>Voor spoed kun je altijd bellen of naar de balie gaan</span>
            </li>
          </ul>
        </Card>
      )}

      {/* Search */}
      <div className="mb-4 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          placeholder="Zoek conversaties..."
          className="pl-10 h-12 text-base"
        />
      </div>

      {/* Conversations List */}
      <div className="space-y-2">
        {visibleConversations.map((conversation) => {
          // Show availability indicator for staff members
          const showAvailability = conversation.isStaffMember && userContext.role !== "medewerker";
          const isAvailable = conversation.staffAvailable ?? true;

          return (
            <Card
              key={conversation.id}
              className="p-4 hover:bg-gray-50 cursor-pointer transition-colors relative"
              onClick={() => setSelectedConversation(conversation.id)}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="w-14 h-14">
                    <AvatarFallback className="text-white" style={{ background: 'linear-gradient(to bottom right, #55D6F4, #63F7B4)' }}>
                      {conversation.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  {showAvailability && isAvailable && (
                    <span className="absolute bottom-0 right-0 w-4 h-4 border-2 border-white rounded-full" style={{ background: '#63F7B4' }} />
                  )}
                  {showAvailability && !isAvailable && (
                    <span className="absolute bottom-0 right-0 w-4 h-4 bg-gray-400 border-2 border-white rounded-full" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold truncate">{conversation.name}</h3>
                      {showAvailability && isAvailable && (
                        <Badge variant="outline" className="text-xs border-0 text-gray-900" style={{ background: '#63F7B4' }}>
                          Beschikbaar
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                      {conversation.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 truncate">
                      {conversation.lastMessage}
                    </p>
                    {conversation.unread > 0 && (
                      <Badge className="ml-2 text-gray-900" style={{ background: '#F7F94D' }}>
                        {conversation.unread}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{conversation.role}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Empty State for no conversations */}
      {visibleConversations.length === 0 && (
        <Card className="p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500">Nog geen conversaties</p>
        </Card>
      )}
    </div>
  );
}
