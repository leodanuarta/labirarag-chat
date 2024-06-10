import { UserData } from '@/app/data';
import { Info, Phone, Video } from 'lucide-react';
import { Avatar, AvatarImage } from '../ui/avatar';

interface ChatTopbarProps {
    selectedUser: UserData;
    }
    
    export const TopbarIcons = [{ icon: Phone }, { icon: Video }, { icon: Info }];


export default function ChatTopbar({selectedUser}: ChatTopbarProps) {
  return (
    <div className="w-full h-20 flex p-4 justify-between items-center border-b">
        <div className="flex items-center gap-2">
          <Avatar className="flex justify-center items-center">
            <AvatarImage
              alt={selectedUser.name}
              width={6}
              height={6}
              className="w-10 h-10 "
            />
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{selectedUser.name}</span>
            <span className="text-xs">Connected</span>
          </div>
        </div>
      </div>
  )
}
