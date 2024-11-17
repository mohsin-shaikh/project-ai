import { ToolNode } from "@langchain/langgraph/prebuilt"

import { searchTool } from "./search-tool"

export const tools = [searchTool]
export const toolNode = new ToolNode(tools)
