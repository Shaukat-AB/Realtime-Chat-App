import { useState } from "react";
import { useAuthStore, useChatStore } from "../../store";
import { UsersIcon } from "../../lib/icons";
import SidebarSkeleton from "../Skeletons/SidebarSkeleton";
import Avatar from "../Avatar/Avatar";
import { useGetContacts } from "../../hooks";

const Sidebar = () => {
    const { onlineUsers } = useAuthStore();
    const { currentContact, contacts, setCurrentContact } = useChatStore();
    const { isLoading } = useGetContacts();

    const [showOnlineOnly, setShowOnlineOnly] = useState(false);

    const filteredContacts = showOnlineOnly
        ? contacts.filter((user) => onlineUsers.includes(user._id))
        : contacts;

    if (isLoading) return <SidebarSkeleton />;

    return (
        <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
            <div className="border-b border-base-300 w-full p-5">
                <div className="flex items-center gap-2">
                    <UsersIcon className="w-6 h-6" />
                    <span className="font-medium hidden lg:block">
                        Contacts
                    </span>
                </div>

                <div className="mt-3 hidden lg:flex items-center gap-2">
                    <label className="cursor-pointer flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={showOnlineOnly}
                            onChange={(e) =>
                                setShowOnlineOnly(e.target.checked)
                            }
                            className="checkbox checkbox-sm"
                        />
                        <span className="text-sm">Show online only</span>
                    </label>
                    <span className="text-xs text-zinc-500">
                        ({onlineUsers.length - 1} online)
                    </span>
                </div>
            </div>

            <div className="overflow-y-auto w-full py-3">
                {filteredContacts.map((user) => (
                    <button
                        key={user._id}
                        onClick={() => setCurrentContact(user)}
                        className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${
                  currentContact?._id === user._id
                      ? "bg-base-300 ring-1 ring-base-300"
                      : ""
              }
            `}
                    >
                        <div className="relative mx-auto lg:mx-0">
                            <Avatar
                                src={user.avatar}
                                alt={user.name}
                                className="size-12 object-cover rounded-full"
                            />
                            {onlineUsers.includes(user._id) && (
                                <span
                                    className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                                />
                            )}
                        </div>

                        {/* User info - (larger screens only) */}
                        <div className="hidden lg:block text-left min-w-0">
                            <div className="font-medium truncate">
                                {user.fullname}
                            </div>
                            <div className="text-sm text-zinc-400">
                                {onlineUsers.includes(user._id)
                                    ? "Online"
                                    : "Offline"}
                            </div>
                        </div>
                    </button>
                ))}

                {filteredContacts.length === 0 && (
                    <div className="text-center text-zinc-500 py-4">
                        No online users
                    </div>
                )}
            </div>
        </aside>
    );
};

export default Sidebar;
