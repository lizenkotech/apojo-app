import { useState } from "react";
import { Home, Calendar, Users, Bell, MessageCircle, User } from "lucide-react";
import NewsFeed from "./components/NewsFeed";
import ActivitiesCalendar from "./components/ActivitiesCalendar";
import Volunteers from "./components/Volunteers";
import Messages from "./components/Messages";
import Profile from "./components/Profile";
import Notifications from "./components/Notifications";
import LoginScreen from "./components/LoginScreen";

type Tab = "home" | "activities" | "volunteers" | "messages" | "profile";
export type UserRole = "medewerker" | "bewoner" | "familie" | "vrijwilliger";

export interface UserContext {
  role: UserRole;
  name: string;
  id: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [userContext, setUserContext] = useState<UserContext | null>(null);
  const [isChatAvailable, setIsChatAvailable] = useState(true);

  // If not logged in, show login screen
  if (!userContext) {
    return <LoginScreen onLogin={setUserContext} />;
  }

  const renderContent = () => {
    if (showNotifications) {
      return <Notifications onClose={() => setShowNotifications(false)} userContext={userContext} />;
    }

    switch (activeTab) {
      case "home":
        return <NewsFeed userContext={userContext} />;
      case "activities":
        return <ActivitiesCalendar userContext={userContext} />;
      case "volunteers":
        return <Volunteers userContext={userContext} />;
      case "messages":
        return (
          <Messages
            userContext={userContext}
            isChatAvailable={isChatAvailable}
            onChatAvailabilityChange={setIsChatAvailable}
          />
        );
      case "profile":
        return <Profile userContext={userContext} onLogout={() => setUserContext(null)} />;
      default:
        return <NewsFeed userContext={userContext} />;
    }
  };

  const getRoleLabel = (role: UserRole) => {
    const labels = {
      medewerker: "Medewerker",
      bewoner: "Bewoner",
      familie: "Familie",
      vrijwilliger: "Vrijwilliger"
    };
    return labels[role];
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="px-4 py-4 flex items-center justify-between shadow-md" style={{ background: '#55D6F4' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-sm" style={{ background: '#F7F94D' }}>
            <span className="font-bold text-lg" style={{ color: '#55D6F4' }}>A</span>
          </div>
          <div>
            <h1 className="font-bold text-lg text-white">Apojo</h1>
            <p className="text-sm text-white/90">{getRoleLabel(userContext.role)}</p>
          </div>
        </div>
        <button
          className="relative p-2 rounded-lg transition-colors hover:bg-white/20"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <Bell className="w-6 h-6 text-white" />
          {unreadNotifications > 0 && (
            <span className="absolute top-1 right-1 w-5 h-5 text-white text-xs rounded-full flex items-center justify-center font-semibold shadow-sm" style={{ background: '#63F7B4' }}>
              {unreadNotifications}
            </span>
          )}
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 px-4 py-2 safe-area-bottom">
        <div className="flex items-center justify-around max-w-lg mx-auto">
          <button
            onClick={() => {
              setActiveTab("home");
              setShowNotifications(false);
            }}
            className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
              activeTab === "home" && !showNotifications ? "" : "text-gray-600"
            }`}
            style={activeTab === "home" && !showNotifications ? { color: '#55D6F4' } : {}}
          >
            <Home className="w-6 h-6" strokeWidth={activeTab === "home" && !showNotifications ? 2.5 : 2} />
            <span className="text-xs">Home</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("activities");
              setShowNotifications(false);
            }}
            className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
              activeTab === "activities" && !showNotifications ? "" : "text-gray-600"
            }`}
            style={activeTab === "activities" && !showNotifications ? { color: '#55D6F4' } : {}}
          >
            <Calendar className="w-6 h-6" strokeWidth={activeTab === "activities" && !showNotifications ? 2.5 : 2} />
            <span className="text-xs">Agenda</span>
          </button>

          {(userContext.role === "medewerker" || userContext.role === "vrijwilliger") && (
            <button
              onClick={() => {
                setActiveTab("volunteers");
                setShowNotifications(false);
              }}
              className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
                activeTab === "volunteers" && !showNotifications ? "" : "text-gray-600"
              }`}
              style={activeTab === "volunteers" && !showNotifications ? { color: '#55D6F4' } : {}}
            >
              <Users className="w-6 h-6" strokeWidth={activeTab === "volunteers" && !showNotifications ? 2.5 : 2} />
              <span className="text-xs">Vrijwilligers</span>
            </button>
          )}

          <button
            onClick={() => {
              setActiveTab("messages");
              setShowNotifications(false);
            }}
            className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
              activeTab === "messages" && !showNotifications ? "" : "text-gray-600"
            }`}
            style={activeTab === "messages" && !showNotifications ? { color: '#55D6F4' } : {}}
          >
            <MessageCircle className="w-6 h-6" strokeWidth={activeTab === "messages" && !showNotifications ? 2.5 : 2} />
            <span className="text-xs">Berichten</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("profile");
              setShowNotifications(false);
            }}
            className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
              activeTab === "profile" && !showNotifications ? "" : "text-gray-600"
            }`}
            style={activeTab === "profile" && !showNotifications ? { color: '#55D6F4' } : {}}
          >
            <User className="w-6 h-6" strokeWidth={activeTab === "profile" && !showNotifications ? 2.5 : 2} />
            <span className="text-xs">Profiel</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
