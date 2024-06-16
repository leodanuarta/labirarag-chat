"use client";

import { userData } from "@/app/data";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { Sidebar } from "../sidebar";
import { Chat } from "./chat";

interface ChatLayoutProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function ChatLayout({
  defaultLayout = [320, 480],
  defaultCollapsed = false,
  navCollapsedSize,
}: ChatLayoutProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [selectedUser, setSelectedUser] = React.useState(userData[0]);
  const [isMobile, setIsMobile] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkScreenWidth();

    // Event listener for screen width changes
    window.addEventListener("resize", checkScreenWidth);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (chatContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10; // Allow some margin
        setShowScrollToBottom(!isAtBottom);
      }
    };

    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.addEventListener("scroll", handleScroll);
      // Initial check
      handleScroll();
    }

    // Cleanup the event listener on component unmount
    return () => {
      if (chatContainer) {
        chatContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const handleUserClick = (username: string) => {
    const user = userData.find((u) => u.name === username);
    if (user) {
      setSelectedUser(user);
    }
  };

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(
          sizes
        )}`;
      }}
      className="h-full items-stretch"
    >
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsedSize={navCollapsedSize}
        collapsible={true}
        minSize={isMobile ? 0 : 24}
        maxSize={isMobile ? 8 : 30}
        onCollapse={() => {
          setIsCollapsed(true);
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            true
          )}`;
        }}
        onExpand={() => {
          setIsCollapsed(false);
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            false
          )}`;
        }}
        className={cn(
          isCollapsed && "min-w-[50px] md:min-w-[70px] transition-all duration-300 ease-in-out"
        )}
      >
        {!isMobile && (
          <Sidebar
            isCollapsed={isCollapsed}
            links={userData.map((user) => ({
              name: user.name,
              messages: user.messages ?? [],
              variant: selectedUser.name === user.name ? "grey" : "ghost",
            }))}
            isMobile={isMobile}
            onUserClick={handleUserClick}
          />
        )}
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
        <div className="relative h-full">
          <div ref={chatContainerRef} className="h-full overflow-y-auto">
            <Chat
              messages={selectedUser.messages}
              selectedUser={{ id: selectedUser.id, avatar: selectedUser.avatar, name: selectedUser.name }}
              isMobile={isMobile}
            />
          </div>
          {showScrollToBottom && (
            <button
              onClick={scrollToBottom}
              className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow-lg"
            >
              Scroll to Bottom
            </button>
          )}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
