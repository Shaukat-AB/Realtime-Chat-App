import {
  ShowChatMessages,
  ShowNoContactSelected,
  Sidebar,
} from '../components';
import { useChatStore } from '../store';

const HomePage = () => {
  const { currentContact } = useChatStore();

  return (
    <div className="h-screen bg-base-200">
      <title>Home | Chat-App</title>

      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!currentContact ? <ShowNoContactSelected /> : <ShowChatMessages />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
