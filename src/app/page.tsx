// ./src/app/page.tsx

import ClientComponent from '@/components/Clientcomponent';
import { cookies } from 'next/headers';

export default function Home() {
  const layoutCookie = cookies().get("react-resizable-panels:layout");
  const defaultLayout = layoutCookie ? JSON.parse(layoutCookie.value) : undefined;

  return (
    <ClientComponent defaultLayout={defaultLayout} />
  );
}
