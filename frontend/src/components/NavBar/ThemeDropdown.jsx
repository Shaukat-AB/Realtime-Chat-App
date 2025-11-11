import { useState } from 'react';
import { BtnArrowDownIcon } from '../../lib/icons';
import ThemeColoredSquares from './ThemeColoredSquares';

const themeLocalStorageKey = 'chat-theme';
const storedTheme = localStorage.getItem(themeLocalStorageKey) || 'default';
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
  const [theme, setTheme] = useState(storedTheme);

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
    localStorage.setItem(themeLocalStorageKey, e.target.value);
  };

  return (
    <div className="dropdown">
      <button
        className={`
              btn btn-sm gap-2 transition-colors
              `}
      >
        <ThemeColoredSquares />
        <span className="hidden sm:inline">Theme</span>
        <BtnArrowDownIcon className="w-3 h-3" />
      </button>
      <ul
        tabIndex="-1"
        className="dropdown-content bg-base-300 rounded-box z-1 w-52 right-0 p-2 shadow-2xl"
      >
        {themes.map((t) => (
          <li key={t} className="relative">
            <div
              data-theme={t}
              className="bg-transparent h-full w-auto absolute flex items-center pointer-events-none"
            >
              <ThemeColoredSquares />
            </div>
            <input
              type="radio"
              name="theme-dropdown"
              className="px-6 theme-controller w-full btn btn-sm btn-block btn-ghost justify-start capitalize"
              aria-label={t}
              value={t}
              onChange={handleThemeChange}
              checked={t === theme}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeDropdown;
