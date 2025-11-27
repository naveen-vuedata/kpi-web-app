import { ChatContainer } from '@/components/chat-container';
import { ChatInput } from '@/components/chat-input';
import { ChatMessages } from '@/components/chat-messages';
import { getChatHistory, sendMessage } from '@/services/chat.services';
import { Message } from '@/types';
import { createFileRoute, useParams } from '@tanstack/react-router'
import axios from 'axios';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/chat/$sessionId')({
  component: RouteComponent,
  ssr: false,
})

function RouteComponent() {
  const { sessionId } = useParams({ strict: false });
  const [messages,setMessages]=useState<Message[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
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
      await sendMessage(sessionId,text);
      setStatus('success');
      handleRefresh();
    } catch (error) {
      setStatus('error');

    }
  };
  return (
    <main className="flex justify-center items-center min-h-screen bg-background p-4 flex-col">
      <div className="flex gap-4 w-full max-w-7xl grow flex-col items-center">
        {/* Chat Section */}
        <ChatContainer>
          <ChatMessages messages={messages} />
          <ChatInput
            onSubmit={handleSubmit}
            isLoading={status === 'loading'}
          />
        </ChatContainer>

        {/* Chart Preview Section */}
        {/* <div className="flex-1 min-w-0">
          <ChartPreview chartType={chartData.chartType} dataPoints={chartData.dataPoints} title={chartData.title} />
        </div> */}
      </div>
    </main>
  );
}
