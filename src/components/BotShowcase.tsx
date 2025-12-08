"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Bot, Send, Sparkles, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  type: "bot" | "user";
  text: string;
  isTyping?: boolean;
}

const botResponses = [
  "How can we help you scale today?",
  "We can automate workflows, build chatbots, or integrate AI into your products.",
  "Let's discuss your project! 🚀",
];

function TypingIndicator() {
  return (
    <div className="flex gap-1 items-center px-4 py-3">
      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" style={{ animationDelay: "0.15s" }} />
      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" style={{ animationDelay: "0.3s" }} />
    </div>
  );
}

function MessageBubble({
  message,
  isNew,
}: {
  message: Message;
  isNew: boolean;
}) {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(message.type === "bot" && isNew);

  useEffect(() => {
    if (message.type === "bot" && isNew) {
      setIsTyping(true);
      let index = 0;
      const interval = setInterval(() => {
        if (index < message.text.length) {
          setDisplayText(message.text.slice(0, index + 1));
          index++;
        } else {
          setIsTyping(false);
          clearInterval(interval);
        }
      }, 30);

      return () => clearInterval(interval);
    } else {
      setDisplayText(message.text);
    }
  }, [message.text, message.type, isNew]);

  const isBot = message.type === "bot";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn("flex gap-3", isBot ? "flex-row" : "flex-row-reverse")}
    >
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
          isBot
            ? "bg-gradient-to-br from-neon-cyan to-neon-purple"
            : "bg-zinc-700"
        )}
      >
        {isBot ? (
          <Bot className="w-4 h-4 text-white" />
        ) : (
          <User className="w-4 h-4 text-zinc-300" />
        )}
      </div>

      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2.5",
          isBot
            ? "bg-zinc-800/80 border border-zinc-700 text-zinc-200"
            : "bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 border border-neon-cyan/30 text-white"
        )}
      >
        <p className="text-sm leading-relaxed">
          {displayText}
          {isTyping && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block w-0.5 h-4 ml-0.5 bg-neon-cyan align-middle"
            />
          )}
        </p>
      </div>
    </motion.div>
  );
}

export default function BotShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [botResponseIndex, setBotResponseIndex] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-start bot conversation when in view
  useEffect(() => {
    if (isInView && !isInitialized) {
      setIsInitialized(true);
      const timer = setTimeout(() => {
        setMessages([
          { id: 1, type: "bot", text: botResponses[0] },
        ]);
        setBotResponseIndex(1);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [isInView, isInitialized]);

  // Scroll to bottom of chat container on new messages (not the page)
  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      text: inputValue,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        type: "bot",
        text: botResponses[botResponseIndex % botResponses.length],
      };
      setMessages((prev) => [...prev, botMessage]);
      setBotResponseIndex((prev) => prev + 1);
    }, 1000);
  };

  return (
    <section ref={ref} className="px-6 py-20 max-w-7xl mx-auto">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-neon-purple/50 bg-neon-purple/10">
          <Sparkles className="w-4 h-4 text-neon-purple" />
          <span className="text-sm text-neon-purple">AI Integration</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          The <span className="text-gradient">Bot Flex</span>
        </h2>
        <p className="text-zinc-500 max-w-lg mx-auto">
          Interactive AI solutions that work 24/7. Here&apos;s a taste of what we can build.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto"
      >
        <div className="relative rounded-2xl bg-zinc-900/70 border border-zinc-800 overflow-hidden backdrop-blur-sm">
          {/* Header */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-zinc-800 bg-zinc-900/50">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-neon-green border-2 border-zinc-900" />
            </div>
            <div>
              <h3 className="font-semibold text-white">BLACKBOX AI</h3>
              <p className="text-xs text-zinc-500">Always online • AI Powered</p>
            </div>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((message, index) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isNew={index === messages.length - 1}
                />
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-zinc-800 bg-zinc-900/50">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/20 transition-all"
              />
              <motion.button
                onClick={handleSend}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-3 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-purple text-white font-medium hover:opacity-90 transition-opacity"
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[
            { label: "Response Time", value: "<100ms" },
            { label: "Accuracy", value: "99.2%" },
            { label: "Languages", value: "12+" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-4 rounded-xl bg-zinc-900/50 border border-zinc-800"
            >
              <div className="text-xl font-bold text-gradient">{stat.value}</div>
              <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

