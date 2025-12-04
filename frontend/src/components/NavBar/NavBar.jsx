import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { ChatSquareIcon, SignoutIcon, UserIcon } from '../../lib/icons';
import ThemeDropdown from './ThemeDropdown';
import { useQueryClient } from '@tanstack/react-query';

const NavBar = () => {
  const { signout, authUser } = useAuthStore();
  const queryClient = useQueryClient();

  const handleSignOut = async () => {
    await signout();

    //invalidate contacts incase user immediately signs in after
    await queryClient.invalidateQueries('contacts');
  };

  return (
    <header className="border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <ChatSquareIcon className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Chat</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <ThemeDropdown />

            {authUser && (
              <>
                <Link
                  to={'/profile'}
                  className={`btn btn-sm gap-2`}
                  aria-label="Profile"
                >
                  <UserIcon className="w-5 h-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button
                  className="btn btn-sm flex gap-2 items-center"
                  onClick={handleSignOut}
                  aria-label="Sign out"
                >
                  <SignoutIcon className="w-5 h-5" />
                  <span className="hidden sm:inline">Sign out</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
