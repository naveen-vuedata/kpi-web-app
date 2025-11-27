import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { nanoid } from "nanoid";


export const Route = createFileRoute("/")({ component: App });

function App() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen place-content-center grid align-center space-y-8">
      <h1 className="text-5xl font-bold text-shadow-2xs">KPI Insights</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Start a new chat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <Button size="lg" onClick={() => {
              const sessionId = nanoid();
              navigate({ to: `/chat/${sessionId}` });
            }} aria-label="Create new chat">
              <Plus className="mr-2" /> New Chat
            </Button>
          </div>

          
        </CardContent>
      </Card>
    </div>
  );
}
