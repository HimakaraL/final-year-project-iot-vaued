import { useState, useEffect, useRef } from "react";
import { MdChat } from "react-icons/md";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const bottomRef = useRef();

  const sanitizeMessage = (text) => {
    if (!text) return "No response received.";

    if (text.includes("GoogleGenerativeAI Error") || text.includes("503")) {
      return "AI service is busy. Please try again in a moment.";
    }

    return text;
  };

  // Initialize chat session
  useEffect(() => {
    setMessages([
      {
        id: 1,
        sender: "bot",
        text: "Hello! I'm your virtual assistant. How can I help you today?",
      },
    ]);
  }, []);

  // Auto scroll only
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMsg]);

    const currentInput = input;
    setInput("");

    try {
      const res = await fetch("/backend/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentInput,
        }),
      });

      const data = await res.json();

      const botMsg = {
        id: Date.now() + 1,
        sender: "bot",
        text: sanitizeMessage(data.content || data.message),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          sender: "bot",
          text: "Error connecting to server.",
        },
      ]);
      console.error(err);
    }
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-20 right-5 w-80 h-96 bg-white shadow-xl rounded-2xl flex flex-col z-50">

          <div className="bg-blue-500 text-white p-3 rounded-t-2xl">
            Virtual Assistant
          </div>

          <div className="flex-1 p-3 overflow-y-auto space-y-2 scroll-hidden custom-scrollbar">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-lg max-w-[70%] text-sm ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef}></div>
          </div>

          {/* input */}
          <div className="p-2 border-t flex">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 border rounded-lg px-2 py-1 text-sm"
              placeholder="Ask something..."
            />
            <button
              onClick={sendMessage}
              className="ml-2 bg-blue-500 text-white px-3 rounded-lg text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 bg-blue-500 text-white w-14 h-14 rounded-full shadow-lg text-xl z-50"
      >
        <MdChat className="mx-auto" />
      </button>
    </>
  );
}