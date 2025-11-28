import { ChatContainer } from '@/components/chat-container';
import { ChatPreview } from '@/components/chat-preview';
import { ChatInput } from '@/components/chat-input';
import { ChatMessages } from '@/components/chat-messages';
import { getChatHistory, sendMessage } from '@/services/chat.services';
import { MessageDetail, PayloadBlock } from '@/types';
import { createFileRoute, useParams } from '@tanstack/react-router'
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/chat/$sessionId')({
  component: RouteComponent,
  ssr: false,
})
const MOCK_BLOCKS: PayloadBlock[] = [
  {
    type: "kpi",
    data: {
      metrics: [
        { label: "Total Tasks", value: 128 },
        { label: "Completed", value: 114 },
        { label: "On-Time (%)", value: "92%" },
        { label: "Budget (%)", value: "76%" },
      ],
    },
  },

  {
    type: "chart",
    data: {
      chartType: "line",
      xKey: "week",
      yKey: "velocity",
      data: [
        { week: "W1", velocity: 12 },
        { week: "W2", velocity: 15 },
        { week: "W3", velocity: 18 },
        { week: "W4", velocity: 20 },
      ],
    },
  },

  {
    type: "chart",
    data: {
      chartType: "bar",
      xKey: "category",
      yKey: "hours",
      data: [
        { category: "Development", hours: 320 },
        { category: "Testing", hours: 180 },
        { category: "Design", hours: 90 },
      ],
    },
  },

  {
    type: "chart",
    data: {
      chartType: "pie",
      xKey: "label",
      yKey: "value",
      data: [
        { label: "Completed", value: 114 },
        { label: "Pending", value: 14 },
      ],
    },
  },

  // --- FIRST TABLE ---
  {
    type: "table",
    data: {
      columns: [
        { key: "task_id", label: "Task ID" },
        { key: "task_name", label: "Task Name" },
        { key: "owner", label: "Owner" },
        { key: "status", label: "Status" },
      ],
      rows: [
        { task_id: "T1001", task_name: "API Setup", owner: "Alice", status: "Completed" },
        { task_id: "T1002", task_name: "UI Layout", owner: "Bob", status: "In Progress" },
        { task_id: "T1003", task_name: "DB Migration", owner: "Charlie", status: "Completed" },
      ],
    },
  },

  // --- SECOND TABLE (NEW) ---
  {
    type: "table",
    data: {
      columns: [
        { key: "member", label: "Team Member" },
        { key: "role", label: "Role" },
        { key: "allocation", label: "Allocation (%)" },
      ],
      rows: [
        { member: "Alice", role: "Backend Engineer", allocation: 80 },
        { member: "Bob", role: "Frontend Engineer", allocation: 70 },
        { member: "Charlie", role: "DevOps", allocation: 60 },
        { member: "Diana", role: "QA", allocation: 50 },
      ],
    },
  },

  {
    type: "list",
    data: {
      items: [
        "Scope approved by stakeholders",
        "Design phase completed",
        "Testing scheduled for next week",
        "Budget utilization on track",
      ],
    },
  },

  {
    type: "text",
    data: {
      value:
        "The project is performing strongly, with high completion rates and consistent velocity growth across development cycles.",
    },
  },

  {
    type: "stat",
    data: {
      label: "Average Cycle Time (days)",
      value: 4.2,
    },
  },

  {
    type: "custom",
    data: {
      note: "This is a custom block. Render as raw JSON or build a custom renderer.",
      risk_score: 0.18,
      risk_level: "Low",
    },
  },
];

function RouteComponent() {
  const { sessionId } = useParams({ strict: false });
  const [messages,setMessages]=useState<MessageDetail[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [blocks,setBlocks]=useState<PayloadBlock[]>([]);
  const [enablePreview,setEnablePreview]=useState<boolean>(false);
  const handleRefresh= async()=>{
    if(!sessionId){
      return;
    }
    const history=await getChatHistory(sessionId);
    console.log(history);
    setMessages(history.messages);
  }
  useEffect(()=>{
    handleRefresh();
  },[sessionId])
  const handleSubmit = async ({ text }: { text: string }) => {
    if(!sessionId){
      return;
    }
    try {
      setStatus('loading');
      const response= await sendMessage(sessionId,text);
      if(response?.payload?.blocks){
        setBlocks(response.payload.blocks);
        setEnablePreview(true);
      }
      setStatus('success');
      handleRefresh();
    } catch (error) {
      setStatus('error');

    }
  };
  const handlePreview=(blocks:PayloadBlock[])=>{
    setBlocks(blocks);
    setEnablePreview(true);
  }
  return (
    <main className="flex justify-center items-center min-h-screen bg-background p-4 flex-col">
      <div className="flex gap-4 w-full max-w-7xl grow h-screen  items-center">
        {/* Chat Section */}
        <ChatContainer>
          <ChatMessages messages={messages} handlePreview={handlePreview}/>
          <ChatInput
            onSubmit={handleSubmit}
            isLoading={status === 'loading'}
          />
        </ChatContainer>
        {<ChatPreview blocks={blocks} enablePreview={enablePreview} loading={status === 'loading'}/>}

        
      </div>
    </main>
  );
}
