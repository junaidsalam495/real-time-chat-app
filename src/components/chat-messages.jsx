"use client"
import { useRef, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"


export function ChatMessages({ messages, currentUserId }) {
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <ScrollArea className="flex-1 p-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex mb-4 ${message.senderId === currentUserId ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[70%] rounded-lg p-3 ${
              message.senderId === currentUserId ? "bg-primary text-primary-foreground" : "bg-muted"
            }`}
          >
            <p>{message.text}</p>
            <p
              className={`text-xs mt-1 ${
                message.senderId === currentUserId ? "text-primary-foreground/70" : "text-muted-foreground"
              }`}
            >
              {message.timestamp}
            </p>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </ScrollArea>
  )
}