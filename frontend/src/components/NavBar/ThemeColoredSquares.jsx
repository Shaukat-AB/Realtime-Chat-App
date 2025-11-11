const ThemeColoredSquares = () => {
  return (
    <div className="relative w-4 h-4 rounded-md">
      <div className="absolute inset-0 grid grid-cols-2 gap-0.5">
        <div className="rounded bg-primary"></div>
        <div className="rounded bg-secondary"></div>
        <div className="rounded bg-accent"></div>
        <div className="rounded bg-neutral"></div>
      </div>
    </div>
  );
};

export default ThemeColoredSquares;
