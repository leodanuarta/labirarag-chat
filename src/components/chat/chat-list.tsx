import { Message, UserData } from "@/app/data";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import ChatBottombar from "./chat-bottombar";

interface ChatListProps {
  messages: Message[];
  selectedUser: UserData | null;
  sendMessage: (newMessage: Message) => void;
  isMobile: boolean;
}

export function ChatList({
  messages,
  selectedUser,
  sendMessage,
  isMobile,
}: ChatListProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [isSending, setIsSending] = useState<boolean>(false)

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isSending]);

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {selectedUser ? (
        <>
          <div
            ref={messagesContainerRef}
            className="w-full h-full overflow-y-auto overflow-x-hidden flex flex-col p-4"
          >
            <AnimatePresence>
              {messages?.map((message, index) => (
                <motion.div
                  key={index}
                  layout
                  initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
                  animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                  exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
                  transition={{
                    opacity: { duration: 0.1 },
                    layout: {
                      type: "spring",
                      bounce: 0.3,
                      duration: messages.indexOf(message) * 0.05 + 0.2,
                    },
                  }}
                  style={{
                    originX: 0.5,
                    originY: 0.5,
                  }}
                  className={cn(
                    "flex flex-col gap-2 mb-2",
                    message.name === "User" ? "items-end" : "items-start"
                  )}
                >
                  <div className="flex gap-3 items-center">
                    {message.name !== "User" && (
                      <Avatar className="flex justify-center items-center">
                        <AvatarImage
                          src={message.avatar}
                          alt={message.name}
                          width={6}
                          height={6}
                        />
                      </Avatar>
                    )}
                    <span className="bg-accent p-3 rounded-md max-w-xs">
                        {message.text || "No message content"}
                    </span>
                    {message.name === "User" && (
                      <Avatar className="flex justify-center items-center">
                        <AvatarImage
                          src={message.avatar}
                          alt={message.name}
                          width={6}
                          height={6}
                        />
                      </Avatar>
                    )}
                  </div>
                </motion.div>
              ))}
          {isSending && (
            <motion.div
              key="skeleton"
              layout
              initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
              transition={{
                opacity: { duration: 0.1 },
                layout: {
                  type: "spring",
                  bounce: 0.3,
                  duration: 0.2,
                },
              }}
              style={{
                originX: 0.5,
                originY: 0.5,
              }}
              className="flex flex-col gap-2 p-4 whitespace-pre-wrap items-start"
            >
              <div className="flex gap-3 items-center">
                  <Avatar className="flex justify-center items-center">
                    <AvatarImage
                      src={"/User1.png"}
                      alt={""}
                      width={6}
                      height={6}
                    />
                  </Avatar>
                
                <Skeleton className="bg-accent p-3 rounded-md w-[225px] h-10" />
                {/* <Skeleton className="h-[125px] w-[250px] rounded-xl" /> */}
                {/* <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div> */}
                   
              </div>
            </motion.div>
          )}
            </AnimatePresence>
          </div>
          <ChatBottombar sendMessage={sendMessage} isMobile={isMobile} updateIsSending={setIsSending} />
        </>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <p>Select a user to start chatting sasasasa</p>
        </div>
      )}
    </div>
  );
}
