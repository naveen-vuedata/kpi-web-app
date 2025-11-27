import { apiEndPoints } from "@/lib/apiEndpoints";
import axios from "@/lib/axios";
import { ChatHistory, Message } from "@/types";

const endpoint = apiEndPoints.chat;

export const getChatHistory = async (sessionId: string) => {
  const url = `${endpoint.endpoint}/${sessionId}/${endpoint.history}`;
  const { data } = await axios.get<ChatHistory>(url);
  console.log({ data });
  return data;
};
export const sendMessage = async (sessionId: string, message: string) => {
  const url = `/${endpoint.endpoint}`;
  const { data } = await axios.post<Message>(url, {
    message,
    session_id: sessionId,
  });
  return data;
};
