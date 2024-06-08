// ./src/components/ClientComponent.tsx

"use client";

import { ChatLayout } from "@/components/chat/chat-layout";
import Link from "next/link";
import React, { useEffect, useRef, useState } from 'react';

interface ClientComponentProps {
  defaultLayout: any; // Adjust the type according to your layout's structure
}

const ClientComponent: React.FC<ClientComponentProps> = ({ defaultLayout }) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const chatContainer = chatContainerRef.current;
      if (chatContainer) {
        const { scrollTop, scrollHeight, clientHeight } = chatContainer;
        if (scrollHeight - scrollTop > clientHeight + 50) {
          setShowScrollButton(true);
        } else {
          setShowScrollButton(false);
        }
      }
    };

    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (chatContainer) {
        chatContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <main className="flex flex-col h-screen w-screen items-center justify-center gap-4 p-4">
      <div className="flex justify-between w-full items-center px-4 md:px-8">
        <Link href="/" className="text-4xl font-bold text-gradient">
          RAGLabira
        </Link>
        {/* <Link
          href="https://github.com/jakobhoeg/shadcn-chat"
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "h-10 w-10"
          )}
        >
          <GitHubLogoIcon className="w-7 h-7 text-muted-foreground" />
        </Link> */}
      </div>

      <div className="flex flex-grow w-full border rounded-lg overflow-hidden relative">
        <div ref={chatContainerRef} className="w-full h-full overflow-auto">
          <ChatLayout defaultLayout={defaultLayout} navCollapsedSize={8} />
        </div>
        {showScrollButton && (
          <button
            onClick={scrollToBottom}
            className="fixed bottom-4 right-4 p-2 rounded-full bg-blue-600 text-white shadow-lg"
          >
            ↓
          </button>
        )}
      </div>

      {/* <div className="flex justify-between w-full items-start text-xs md:text-sm text-muted-foreground px-4 md:px-8">
        <p className="max-w-[150px] sm:max-w-lg">Built by <a className="font-semibold" href="https://github.com/jakobhoeg/">Jakob Hoeg</a>. To be used with <a className="font-semibold" href="https://ui.shadcn.com/">shadcn</a>.</p>
        <p className="max-w-[150px] sm:max-w-lg text-right">Source code available on <a className="font-semibold" href="https://github.com/jakobhoeg/shadcn-chat">GitHub</a>.</p>
      </div> */}
    </main>
  );
};

export default ClientComponent;
