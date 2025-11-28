import { ExternalLink, MessageCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { MessageDetail } from "@/types";
import { Button } from "./ui/button";

interface ChatMessageProps {
  message: MessageDetail;
  handlePreview: (blocks: PayloadBlock[]) => void;
}

export function ChatMessage({ message, handlePreview }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-3  ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="shrink-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-accent-foreground" />
        </div>
      )}
      <div
        className={cn(
          "max-w-sm px-4 py-3 rounded-lg text-sm whitespace-pre-wrap relative",
          isUser
            ? "bg-accent text-accent-foreground rounded-br-none"
            : "bg-card text-card-foreground border border-border rounded-bl-none"
        )}
      >
        {message.content}
        {message.payload?.blocks && (
          <Button
            onClick={() =>
              message.payload?.blocks && handlePreview(message.payload?.blocks)
            }
            className="absolute top-2 right-2"
          >
            <ExternalLink />
          </Button>
        )}
      </div>
      {isUser && (
        <div className="shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          <MessageCircle className="w-5 h-5 text-muted-foreground" />
        </div>
      )}
    </div>
  );
}
