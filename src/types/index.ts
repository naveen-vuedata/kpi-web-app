
export type Message={
    type:"HumanMessage"|"AIMessage",
    content:string
}
export type ChatHistory={
    session_id:string,
    message_count:number,
    messages:Message[]
}