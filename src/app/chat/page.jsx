"use client"
import { useState, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Phone, Video, Search, MoreVertical, SendHorizonal, Loader, Paperclip } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import toast from "react-hot-toast"
import { useGetUsersApiQuery } from "@/services/usersApi"
import { useGetMessagesQuery, useMessagesMutation } from "@/services/messagesApi"
import { useSelector } from "react-redux"

export default function ChatPage() {
  const [selectedUser, setSelectedUser] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [messages, { isLoading: isLoadingMessage }] = useMessagesMutation();
  const { data } = useGetUsersApiQuery();
  const { data: getMessages } = useGetMessagesQuery(selectedUser?._id &&
    { senderId: user?._id, receiverId: selectedUser?._id }, { skip: !selectedUser?._id });


  const handleSendMessage = async (text) => {
    try {
      const response = await messages({ senderId: user?._id, receiverId: selectedUser?._id, text }).unwrap();
      toast.success(response?.message);
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="flex h-full flex-col md:flex-row">
      <div className={`block w-full md:w-80 border-r bg-background px-3 space-y-4 mt-4`}>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search or start a new chat" className="pl-8" />
        </div>

        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          Chats
        </div>

        <ScrollArea className="h-[calc(100vh-10rem)] md:h-[calc(100vh-8rem)]">
          {data?.users?.map((user) => (
            <div
              key={user?._id}
              className={`flex items-center gap-3 mb-3 rounded-md p-3 cursor-pointer bg-accent`}
              onClick={() => setSelectedUser(user)}
            >
              <Avatar>
                <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                <AvatarFallback>{user?.name?.substring(0, 2)?.toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <p className="font-medium truncate">{user?.name}</p>
                  <span className="text-xs text-muted-foreground">{user?.lastMessageTime || 12}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{user?.lastMessage || "Hello"}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            <div className="flex items-center justify-between p-3 border-b">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={selectedUser?.avatar || "/placeholder.svg"} alt={selectedUser?.name} />
                  <AvatarFallback>{selectedUser?.name?.substring(0, 2)?.toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedUser?.name}</p>
                  <p className="text-xs text-muted-foreground">typing...</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Search className="h-5 w-5" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View contact</DropdownMenuItem>
                    <DropdownMenuItem>Block user</DropdownMenuItem>
                    <DropdownMenuItem>Clear chat</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <ScrollArea className="flex-1 p-4">
              {getMessages?.data?.map((message) => (
                <div
                  key={message?._id}
                  className={`flex mb-4 ${message?.senderId === user?._id ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${message?.senderId === user?._id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                      }`}
                  >
                    <p>{message?.text}</p>
                    <p
                      className={`text-xs mt-1 ${message?.senderId === user?._id
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                        }`}
                    >
                      {new Date(message?.createdAt).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </ScrollArea>

            <div className="p-3 border-t">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <span className="sr-only">Attach file</span>
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a message"
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage(e.currentTarget.value)
                      e.currentTarget.value = ""
                    }
                  }}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={isLoadingMessage}
                  onClick={() => {
                    if (inputRef.current) {
                      handleSendMessage(inputRef.current.value);
                      inputRef.current.value = "";
                    }
                  }}
                >
                  {isLoadingMessage ? (
                    <Loader className="h-5 w-5 animate-spin" />
                  ) : (
                    <SendHorizonal className="h-5 w-5" />
                  )}
                </Button>

              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-4 text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Welcome to ChatApp</h2>
            <p className="text-muted-foreground max-w-md">
              Select a conversation from the sidebar to start chatting or search for a contact to start a new
              conversation.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

