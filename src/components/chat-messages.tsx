import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatMessage } from "./chat-message"
import { Message } from "@/types"

interface UIMessage {
  id: string
  role: "user" | "assistant"
  content: string
  parts: Array<{ type: "text"; text: string }>
}

interface ChatMessagesProps {
  messages: Message[]
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  console.log(messages);
  return (
    <ScrollArea className="flex-1">
      <div className="flex flex-col gap-4 p-6 h-full">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to KSI Insights</h1>
              <p className="text-muted-foreground">Start a conversation to get AI-powered responses</p>
            </div>
          </div>
        ) : (
          messages.map((message,index) => <ChatMessage key={`message-${index}`} message={message} />)
        )}
      </div>
    </ScrollArea>
  )
}
