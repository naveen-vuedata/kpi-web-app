import { MessageCircle, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { Message } from "@/types"



interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.type === "HumanMessage"

  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-accent-foreground" />
        </div>
      )}
      <div
        className={cn(
          "max-w-sm px-4 py-3 rounded-lg text-sm whitespace-pre-wrap",
          isUser
            ? "bg-accent text-accent-foreground rounded-br-none"
            : "bg-card text-card-foreground border border-border rounded-bl-none",
        )}
      >
        {message.content}
      </div>
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          <MessageCircle className="w-5 h-5 text-muted-foreground" />
        </div>
      )}
    </div>
  )
}
