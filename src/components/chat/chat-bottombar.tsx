import { Message } from "@/app/data";
import api from "@/lib/apis";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  FileImage,
  Loader,
  Paperclip,
  SendHorizontal,
  ThumbsUp
} from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { buttonVariants } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface ChatBottombarProps {
  sendMessage: (newMessage: Message) => void;
  isMobile: boolean;
}

export const BottombarIcons = [{ icon: FileImage }, { icon: Paperclip }];

export default function ChatBottombar({
  sendMessage, isMobile,
}: ChatBottombarProps) {
  const [message, setMessage] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleThumbsUp = async () => {
    try {
      const response = await api.post('/tanyalabira', {
        question: "halo apa kabar",
      });
      if (response.status === 200) {
        const newMessage: Message = { text: response.data.text, name: "Bot", avatar: "/path/to/bot/avatar" }; // Adjust accordingly
        console.log('Received message:', newMessage);
        sendMessage(newMessage); // Send the message
      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleSend = async () => {
    setIsSending(true);
    const userMessage: Message = { text: message, name: "User", avatar: "/path/to/user/avatar" }; // Adjust accordingly
    sendMessage(userMessage); // Add user message to chatlist immediately

    try {
      const resp = await api.post("/tanyalabira", {
        question: message
      });
      if (resp.status === 200) {
        const botMessage: Message = { text: resp.data.text, name: "Bot", avatar: "/path/to/bot/avatar" }; // Adjust accordingly
        console.log('Received message:', botMessage);
        sendMessage(botMessage); // Send the bot response
      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
    setMessage("");  // Clear the input field
    setIsSending(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }

    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      setMessage((prev) => prev + "\n");
    }
  };

  return (
    <div className="p-2 flex justify-between w-full items-center gap-2">
      <AnimatePresence initial={false}>
        <motion.div
          key="input"
          className="w-full relative"
          layout
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{
            opacity: { duration: 0.05 },
            layout: {
              type: "spring",
              bounce: 0.15,
            },
          }}
        >
          <Textarea
            autoComplete="off"
            value={message}
            ref={inputRef}
            onKeyDown={handleKeyPress}
            onChange={handleInputChange}
            name="message"
            placeholder="Aa"
            className="w-full border rounded-full flex items-center h-9 resize-none overflow-hidden bg-background"
            disabled={isSending}
          ></Textarea>
        </motion.div>

        {message !== "" && !isSending ? (
          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-9 w-9",
              "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0",
              isSending && "cursor-not-allowed"
            )}
            onClick={handleSend}
          >
            <SendHorizontal size={20} className={cn("text-muted-foreground")} />
          </Link>
        ) : isSending ? (
          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-9 w-9",
              "cursor-not-allowed",
              "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
            )}
            onClick={(e) => e.preventDefault()}
          >
            <Loader size={20} className="text-muted-foreground" />
          </Link>
        ) : (
          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-9 w-9",
              "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
            )}
            onClick={handleThumbsUp}
          >
            <ThumbsUp size={20} className="text-muted-foreground" />
          </Link>
        )}
      </AnimatePresence>
    </div>
  );
}
