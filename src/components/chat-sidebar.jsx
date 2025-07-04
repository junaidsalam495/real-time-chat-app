"use client"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Users, Search } from "lucide-react"



export function ChatSidebar({ users, selectedUser, onUserSelect }) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredUsers = users.filter((user) => user?.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search or start a new chat"
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="chats" className="flex-1">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chats" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Chats
          </TabsTrigger>
          <TabsTrigger value="contacts" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Contacts
          </TabsTrigger>
        </TabsList>
        <TabsContent value="chats" className="m-0 flex-1">
          <ScrollArea className="h-[calc(100vh-10rem)] md:h-[calc(100vh-8rem)]">
            {filteredUsers.map((user) => (
              <div
                key={user?.id}
                className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-accent ${
                  selectedUser?.id === user?.id ? "bg-accent" : ""
                }`}
                onClick={() => onUserSelect(user)}
              >
                <Avatar>
                  <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                  <AvatarFallback>{user?.name?.substring(0, 2)?.toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="font-medium truncate">{user?.name}</p>
                    <span className="text-xs text-muted-foreground">{user?.lastMessageTime}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{user?.lastMessage}</p>
                </div>
              </div>
            ))}
          </ScrollArea>
        </TabsContent>
        <TabsContent value="contacts" className="m-0 flex-1">
          <ScrollArea className="h-[calc(100vh-10rem)] md:h-[calc(100vh-8rem)]">
            {filteredUsers.map((user) => (
              <div
                key={user?.id}
                className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-accent ${
                  selectedUser?.id === user?.id ? "bg-accent" : ""
                }`}
                onClick={() => onUserSelect(user)}
              >
                <Avatar>
                  <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                  <AvatarFallback>{user?.name?.substring(0, 2)?.toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-sm text-muted-foreground">{user?.status}</p>
                </div>
              </div>
            ))}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}

