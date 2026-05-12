import { Heart, MessageCircle, Share2, MoreVertical, Plus, Image as ImageIcon, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import type { UserContext } from "../App";

interface NewsFeedProps {
  userContext: UserContext;
}

const mockPosts = [
  {
    id: 1,
    author: "Maria van den Berg",
    role: "Medewerker",
    avatar: "",
    time: "2 uur geleden",
    content: "Volgende week dinsdag organiseren we een gezellige bingo-middag! Iedereen is welkom vanaf 14:00 uur in de grote zaal. Koffie en thee staat klaar! ☕",
    image: "",
    likes: 12,
    comments: 3,
    type: "announcement",
    visibleFor: ["medewerker", "bewoner", "familie", "vrijwilliger"]
  },
  {
    id: 2,
    author: "Jan Pieters",
    role: "Bewoner",
    avatar: "",
    time: "5 uur geleden",
    content: "Wat een prachtige dag was het gisteren bij de tuinworkshop! Bedankt aan alle vrijwilligers die hebben geholpen. Hier een foto van ons mooie resultaat 🌻",
    image: "",
    likes: 24,
    comments: 8,
    type: "update",
    visibleFor: ["medewerker", "bewoner", "familie", "vrijwilliger"]
  },
  {
    id: 3,
    author: "Sophie de Vries",
    role: "Activiteitenbegeleider",
    avatar: "",
    time: "1 dag geleden",
    content: "🎨 Nieuwe creatieve workshop volgende maand! We gaan aquarelleren met professionele begeleiding. Nog 5 plekken beschikbaar - schrijf je snel in via de agenda!",
    image: "",
    likes: 18,
    comments: 5,
    type: "announcement",
    visibleFor: ["medewerker", "bewoner", "familie", "vrijwilliger"]
  },
  {
    id: 4,
    author: "Maria van den Berg",
    role: "Medewerker",
    avatar: "",
    time: "2 dagen geleden",
    content: "Update voor familieleden: Volgende week is er een familiebijeenkomst op woensdag om 19:00 uur. We bespreken de nieuwe activiteiten voor het komende seizoen.",
    image: "",
    likes: 8,
    comments: 2,
    type: "announcement",
    visibleFor: ["medewerker", "familie"]
  }
];

export default function NewsFeed({ userContext }: NewsFeedProps) {
  const [createPostOpen, setCreatePostOpen] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  // Filter posts based on user role
  const visiblePosts = mockPosts.filter(post =>
    post.visibleFor.includes(userContext.role)
  );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const canCreatePost = userContext.role === "medewerker" || userContext.role === "bewoner";

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
      {/* Create Post Card */}
      {canCreatePost ? (
        <Dialog open={createPostOpen} onOpenChange={setCreatePostOpen}>
          <DialogTrigger asChild>
            <Card className="p-4 cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="text-white" style={{ background: 'linear-gradient(to bottom right, #55D6F4, #63F7B4)' }}>
                    {userContext.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 px-4 py-3 bg-gray-100 rounded-full text-gray-500">
                  Deel een update...
                </div>
              </div>
            </Card>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Nieuw bericht plaatsen</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="text-white" style={{ background: 'linear-gradient(to bottom right, #55D6F4, #63F7B4)' }}>
                    {userContext.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{userContext.name}</p>
                  <p className="text-sm text-gray-500 capitalize">{userContext.role}</p>
                </div>
              </div>

              <Textarea
                placeholder="Wat wil je delen?"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="min-h-32 text-base resize-none"
              />

              {uploadedImage && (
                <div className="relative">
                  <img src={uploadedImage} alt="Upload" className="w-full rounded-lg" />
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => setUploadedImage(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <div className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <ImageIcon className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium">Foto toevoegen</span>
                  </div>
                </label>

                <Button
                  onClick={() => {
                    setCreatePostOpen(false);
                    setNewPostContent("");
                    setUploadedImage(null);
                  }}
                  disabled={!newPostContent.trim()}
                  className="h-10"
                >
                  Plaatsen
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-blue-100 text-blue-700">
                {userContext.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 px-4 py-3 bg-gray-100 rounded-full text-gray-500">
              Nieuws en updates van Apojo
            </div>
          </div>
        </Card>
      )}

      {/* Posts */}
      {visiblePosts.map((post) => (
        <Card key={post.id} className="overflow-hidden">
          {/* Post Header */}
          <div className="p-4 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-green-500 text-white">
                  {post.author.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{post.author}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>{post.role}</span>
                  <span>•</span>
                  <span>{post.time}</span>
                </div>
              </div>
            </div>
            {userContext.role === "medewerker" && (
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5 text-gray-500" />
              </button>
            )}
          </div>

          {/* Post Content */}
          <div className="px-4 pb-3">
            <p className="text-gray-800 leading-relaxed whitespace-pre-line">
              {post.content}
            </p>
          </div>

          {/* Post Image (placeholder) */}
          {post.image && (
            <div className="bg-gray-200 aspect-video" />
          )}

          {/* Post Stats */}
          <div className="px-4 py-2 flex items-center justify-between text-sm text-gray-500 border-t border-gray-100">
            <span>{post.likes} vind-ik-leuks</span>
            <span>{post.comments} reacties</span>
          </div>

          {/* Post Actions */}
          <div className="px-4 py-2 flex items-center justify-around border-t border-gray-100">
            <Button variant="ghost" className="flex items-center gap-2 flex-1 h-11">
              <Heart className="w-5 h-5" />
              <span>Leuk</span>
            </Button>
            <Button variant="ghost" className="flex items-center gap-2 flex-1 h-11">
              <MessageCircle className="w-5 h-5" />
              <span>Reageer</span>
            </Button>
            <Button variant="ghost" className="flex items-center gap-2 flex-1 h-11">
              <Share2 className="w-5 h-5" />
              <span>Deel</span>
            </Button>
          </div>
        </Card>
      ))}

      {/* Load More */}
      <div className="text-center py-4">
        <Button variant="outline" className="w-full max-w-xs h-12">
          Meer berichten laden
        </Button>
      </div>
    </div>
  );
}
