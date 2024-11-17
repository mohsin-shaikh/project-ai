import { ChatOpenAI } from "@langchain/openai"

// const MODEL_NAME = "gpt-4o"
const MODEL_NAME = "gpt-3.5-turbo"

export const llm = new ChatOpenAI({
  model: MODEL_NAME,
  temperature: 0,
})
