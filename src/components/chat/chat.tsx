import { Message, UserData } from "@/app/data";
import { Sidebar } from "@/components/sidebar";
import { useState } from "react";
import { ChatList } from "./chat-list";
import ChatTopbar from "./chat-topbar";

interface ChatProps {
  messages?: Message[];
  isMobile: boolean;
}

export function Chat({ messages, isMobile }: ChatProps) {
  const [messagesState, setMessages] = useState<Message[]>(messages ?? []);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  const sendMessage = (newMessage: Message) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleUserClick = (username: string) => {
    // Misalnya kita ambil data user dari username
    const user = findUserByUsername(username);
    setSelectedUser(user);
  };

  // Fungsi untuk mendapatkan data user berdasarkan username
  const findUserByUsername = (username: string): UserData | null => {
    // Data user mock, sesuaikan dengan data asli yang Anda miliki
    const users: UserData[] = [
      {
        id: 1, name: "Alice",
        avatar: "",
        messages: []
      },
      {
        id: 2, name: "Bob",
        avatar: "",
        messages: []
      },
      {
        id: 3, name: "Charlie",
        avatar: "",
        messages: []
      },
    ];
    return users.find(user => user.name === username) || null;
  };

  const sidebarLinks = [
    { name: "Alice", messages: [{ message: "Hello" }], variant: "grey" },
    { name: "Bob", messages: [{ message: "Hi" }], variant: "ghost" },
    { name: "Charlie", messages: [{ message: "Hey" }], variant: "grey" },
  ];

  return (
    <div className="flex h-full">
      <Sidebar
        links={sidebarLinks}
        isCollapsed={false}
        isMobile={isMobile}
        onUserClick={handleUserClick}
      />
      <div className="flex flex-col justify-between w-full h-full">
        {selectedUser ? (
          <>
            <ChatTopbar selectedUser={selectedUser} />
            <ChatList
              messages={messagesState}
              selectedUser={selectedUser}
              sendMessage={sendMessage}
              isMobile={isMobile}
            />
          </>
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <p>Select a user to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
}
