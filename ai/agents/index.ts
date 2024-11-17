import { AIMessage, BaseMessage, SystemMessage } from "@langchain/core/messages"
import { Annotation, END } from "@langchain/langgraph"

import { model } from "../llm-model"

export const StateAnnotation = Annotation.Root({
  messages: Annotation<BaseMessage[]>({
    reducer: (x, y) => x.concat(y),
  }),
})

// Define the function that determines whether to continue or not
// We can extract the state typing via `StateAnnotation.State`
export function shouldContinue(state: typeof StateAnnotation.State) {
  const messages = state.messages
  const lastMessage = messages[messages.length - 1] as AIMessage

  // If the LLM makes a tool call, then we route to the "tools" node
  if (lastMessage.tool_calls?.length) {
    return "tools"
  }
  // Otherwise, we stop (reply to the user)
  return END
}

// Define the function that calls the model
export async function callModel(state: typeof StateAnnotation.State) {
  const messages = state.messages
  const response = await model.invoke([
    new SystemMessage(`You are a journalist delivering news information. 
      Please summarize the sentence according to the following REQUEST.
      REQUEST:
      1. Summarize the article in the first sentence, keeping it less than 5 lines.
      2. Summarize the main points in bullet points in HINDI.
      3. DO NOT translate any technical terms.
      4. DO NOT include any unnecessary information.
      You have tools to search in internet and get data then make summary
      SUMMARY:
    `),
    ...messages,
  ])

  // We return a list, because this will get added to the existing list
  return { messages: [response] }
}
