import { Activity, useState } from 'react';
import { BtnArrowDownIcon, CheckIcon } from '../../lib/icons';
import ThemeColoredSquares from './ThemeColoredSquares';
import { newStorage } from '../../lib/storage';

const themeLocalStorageKey = 'chat-theme';
const themeStorage = newStorage(themeLocalStorageKey, 'default');

const themes = [
  'default',
  'light',
  'dark',
  'retro',
  'luxury',
  'synthwave',
  'valentine',
];

const ThemeDropdown = () => {
  const [theme, setTheme] = useState(themeStorage.get);

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
    themeStorage.set(e.target.value);
  };

  return (
    <div className="dropdown">
      <button
        className={`
              btn btn-sm gap-2 transition-colors
              `}
        aria-label="Change Theme"
      >
        <ThemeColoredSquares />

        <span className="hidden sm:inline">Theme</span>
        <BtnArrowDownIcon className="w-3 h-3" />
      </button>

      <ul
        tabIndex="-1"
        className="dropdown-content bg-base-200 rounded-box z-1 w-52 right-0 p-2 shadow-2xl"
      >
        {themes.map((t) => (
          <li key={t} className="relative group">
            <div
              data-theme={t}
              className="left-2 absolute z-4 bg-transparent h-full w-auto flex items-center pointer-events-none"
            >
              <ThemeColoredSquares />
            </div>

            <input
              type="radio"
              name="theme-dropdown"
              className="px-10 w-full theme-controller btn btn-sm btn-block btn-ghost justify-start capitalize"
              aria-label={t}
              value={t}
              onChange={handleThemeChange}
              checked={t === theme}
            />

            <Activity mode={t === theme ? 'visible' : 'hidden'}>
              <CheckIcon className="absolute right-5 top-1/5 text-primary group-hover:text-primary-content size-5 pointer-events-none" />
            </Activity>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeDropdown;
