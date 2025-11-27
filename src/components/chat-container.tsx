import type React from "react"
import { Card } from "@/components/ui/card"

export function ChatContainer({ children }: { children: React.ReactNode }) {
  return <Card className="w-full h-full flex flex-col grow shadow-lg border">{children}</Card>
}
