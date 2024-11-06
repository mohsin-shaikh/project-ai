"use client"

import { useState } from "react"

import {
  Bot,
  Download,
  Maximize2,
  MessageCircle,
  RefreshCw,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi",
      role: "user",
    },
    {
      id: "2",
      content: "How can I help you?",
      role: "assistant",
    },
    {
      id: "3",
      content: "I have a question about my order.",
      role: "user",
    },
    {
      id: "4",
      content: "Sure, can you please provide the order ID?",
      role: "assistant",
    },
    {
      id: "5",
      content: "Yes, it’s 12345.",
      role: "user",
    },
    {
      id: "6",
      content: "Thank you! Let me check that for you.",
      role: "assistant",
    },
    {
      id: "7",
      content: "Great, thanks!",
      role: "user",
    },
    {
      id: "8",
      content: "You're welcome! Is there anything else I can assist with?",
      role: "assistant",
    },
  ])

  const [input, setInput] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const toggleChatbot = () => {
    setIsOpen(!isOpen)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
    }

    setMessages((prev) => [...prev, newMessage])
    setInput("")

    // TODO: Add API call here for bot response
  }

  const rootChatbotStyles = {
    "--fontSize": "14px",
    "--lineHeight": "20px",
    "--previewPrimary": "#f9fafb",
    "--framePrimary": "#f9fafb",
    "--popupBorderPrimary": "ai",
    "--conversationText": "#111827",
    "--conversationPrimary": "#ffffff",
    "--barText": "#111827",
    "--barPrimary": "#ffffff",
    "--barBorderPrimary": "transparent",
    "--messagesPadding": "10px",
    "--messageSpacing": "10px",
    "--messagePadding": "0.5rem 1rem",
    "--messageRounding": "10px",
    "--introMessageButtonPrimary": "#ffffff",
    "--introMessageButtonSecondary": "#f3f4f6",
    "--introMessageButtonText": "#4b5563",
    "--introMessageButtonBorderPrimary": "#d1d5db",
    "--introMessageButtonBorderSecondary": "#d1d5db",
    "--userMessageText": "#ffffff",
    "--userMessagePrimary": "#4f46e5",
    "--userMessageLinkPrimary": "inherit",
    "--userMessageLinkSecondary": "inherit",
    "--botMessageText": "#314351",
    "--botMessagePrimary": "#f1f3f5",
    "--botMessageLinkPrimary": "inherit",
    "--botMessageLinkSecondary": "inherit",
    "--actionsPadding": "0px",
    "--inputText": "#111827",
    "--inputPrimary": "#ffffff",
    "--inputSecondary": "#ffffff",
    "--inputBorderPrimary": "transparent",
    "--inputBorderSecondary": "transparent",
    "--tapText": "#6366f1",
    "--buttonText": "#ffffff",
    "--buttonPrimary": "#4f46e5",
    "--buttonSecondary": "#4338ca",
    "--messageStyle": "bubble",
    "--actionsBorderPrimary": "#d2d2d2",
    "--botMessagePadding": "20px",
    "--buttonRounding": "25px",
    "--buttonSize": "60px",
    "--popoverHeight": "750px",
    "--popoverWidth": "400px",
    "--popupBorderSize": "2px",
    "--popupRounding": "5px",
    "--poweredByPadding": "0.5rem",
    "--userMessagePadding": "20px",
  }

  const poweredByStyles = {
    padding: "var(--poweredByPadding, 0.5rem 0rem 0.5rem 0rem)",
    backgroundColor:
      "var(--messageInnerPrimary, var(--messagePrimary, transparent))",
    color: "var(--messageInnerText, var(--messageText, inherit))",
  }

  return (
    <div
      className="theme-wrapper ![font-size:var(--fontSize)] ![line-height:var(--lineHeight)]"
      style={rootChatbotStyles as React.CSSProperties}
    >
      <div className="resize-wrapper absolute bottom-0 right-0">
        <div className="modal-wrapper">
          <div
            className={cn(
              "popover-layout grid",
              "overflow-hidden",
              "grid-rows-[1fr,auto]",
              "gap-[var(--popoverSpacing,0rem)]",
              "p-[var(--popoverPadding,1rem)]",
              isOpen && "h-screen w-screen"
            )}
          >
            <div
              className={cn(
                "ease-[cubic-bezier(0,1.2,1,1)] -ml-6 grid origin-bottom-right translate-x-3 scale-100 grid-rows-[1fr] overflow-hidden transition-all duration-200",
                isOpen ? "-ml-6 translate-x-3 scale-100" : "scale-0"
              )}
            >
              <div
                className={cn(
                  "popup relative flex flex-1 overflow-hidden shadow-lg transition-all ease-in-out",
                  "rounded-[var(--i-popupRounding)] p-[var(--i-popupBorderSize)] [--i-popupBorderPrimary:var(--popupBorderPrimary)] [--i-popupBorderSize:var(--popupBorderSize,2px)] [--i-popupRounding:var(--popupRounding,1.5rem)]",
                  isOpen ? "mx-3 mb-6" : "hidden"
                )}
              >
                <div className="absolute inset-0 z-10 h-full w-full animate-deg-rotate rounded-lg bg-gradient-dynamic from-pink-500 via-cyan-500 to-violet-500"></div>
                <div
                  className={cn(
                    "conversation z-20 flex min-w-0 flex-1 flex-col overflow-hidden",
                    "rounded-[calc(var(--i-popupRounding)+(var(--i-popupBorderSize)/2))] [&_.bar]:backdrop-blur-none"
                  )}
                >
                  <div
                    className={cn(
                      "no-scrollbar flex flex-1 flex-col overflow-auto overscroll-contain",
                      "bg-[var(--conversationPrimary)] text-[var(--conversationText)]"
                    )}
                  >
                    {/* Chat Bar */}
                    <div className="bar sticky left-0 right-0 top-0 z-10 flex flex-row items-center gap-6 border-b border-b-[var(--barBorderPrimary,var(--barPrimary,transparent))] bg-[var(--barPrimary,#6366f1)] p-[var(--barPadding,10px_20px_10px_20px)] text-xl font-bold tracking-tight text-[var(--barText,#ffffff)]">
                      <Bot className="h-5 w-5" />
                      <div className="flex-1 truncate">
                        <span className="font-semibold">ChatBot</span>
                      </div>
                      <div className="flex shrink-0 flex-row items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Maximize2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {/* Chat Banner */}
                    <div></div>
                    {/* Chat Body */}
                    <ScrollArea className="messages flex flex-1 flex-col justify-end p-[var(--messagesPadding)]">
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${
                              message.role === "user"
                                ? "justify-end"
                                : "justify-start"
                            }`}
                          >
                            <div
                              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                                message.role === "user"
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted"
                              }`}
                            >
                              {message.content}
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    {/* Chat Footer */}
                    <div className="sticky bottom-0 left-0 right-0 z-10 border-t border-t-[var(--actionsBorderPrimary,var(--inputBorderPrimary,transparent))] bg-[var(--actionsPrimary,var(--conversationPrimary))] bg-clip-padding p-[var(--actionsPadding)]">
                      <form onSubmit={handleSubmit} className="m-2 flex gap-2">
                        <Input
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          placeholder="Type your message..."
                          className="flex-1"
                        />
                        <Button type="submit">Send</Button>
                      </form>
                      {/* Powered By */}
                      <div
                        className="powered-by select-none p-[var(--thisPoweredByPadding)] text-sm"
                        style={poweredByStyles}
                      >
                        <span
                          className={cn(
                            "inline-block",
                            "rounded-md",
                            "bg-[var(--thisPoweredByPrimary)]",
                            "pb-0.5 pl-3 pr-3 pt-0.5",
                            "text-[var(--thisPoweredByText)]",
                            "[&_a]:!text-[var(--thisPoweredByText)]"
                          )}
                        >
                          <a
                            className="external-link link !no-underline"
                            href="https://Company.com"
                            target="_blank"
                            rel="noreferrer noopener"
                          >
                            powered by Company
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="composition flex flex-col items-end justify-end gap-4">
              <Button
                onClick={toggleChatbot}
                className={cn(
                  "button flex transform items-center justify-center overflow-hidden shadow-lg transition duration-150 ease-in-out",
                  "h-[var(--buttonSize,52px)] w-[var(--buttonSize,52px)] rounded-[var(--buttonRounding,100%)]",
                  "border-[var(--buttonBorderPrimary,var(--buttonPrimary))] p-[var(--buttonPadding,0.2rem)] [border-width:var(--buttonBorderSize,2px)]",
                  "bg-[var(--buttonPrimary,#84cc16)] text-[var(--buttonText,#ffffff)] opacity-100",
                  "hover:scale-110 hover:border-[var(--buttonBorderSecondary,var(--buttonSecondary))] hover:bg-[var(--buttonSecondary,var(--buttonPrimary,#84cc16))]",
                  "active:scale-90"
                )}
              >
                <MessageCircle className="!h-8 !w-8" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
