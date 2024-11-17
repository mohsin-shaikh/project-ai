import { HumanMessage } from "@langchain/core/messages"
import { MemorySaver, START, StateGraph } from "@langchain/langgraph"

import { callModel, shouldContinue, StateAnnotation } from "./agents"
import { toolNode } from "./tools"

// Define a new graph
export const workflow = new StateGraph(StateAnnotation)
  .addNode("agent", callModel)
  .addNode("tools", toolNode)
  .addEdge(START, "agent")
  .addConditionalEdges("agent", shouldContinue)
  .addEdge("tools", "agent")

// Initialize memory to persist state between graph runs
const checkpointer = new MemorySaver()

export const startRunnable = async (query: string, thread_id: string) => {
  // Finally, we compile it!
  // This compiles it into a LangChain Runnable.
  // Note that we're (optionally) passing the memory when compiling the graph
  const app = workflow.compile({ checkpointer })
  // Use the Runnable
  const finalState = await app.invoke(
    {
      messages: [new HumanMessage(query)],
    },
    { configurable: { thread_id: thread_id } }
  )

  return finalState.messages[finalState.messages.length - 1].content
}
