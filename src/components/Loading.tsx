
export default function Loading({
  title  = "Buscando dados...",
  subtitle = "Só um instante…",
  fullScreen = true,
}) {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center overflow-hidden
      ${fullScreen ? "min-h-screen" : "w-full h-full"}
    `}
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl animate-pulse" />
        <div className="absolute -bottom-28 -right-24 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl animate-pulse [animation-delay:300ms]" />
        <div className="absolute top-1/3 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-400/5 blur-3xl animate-pulse [animation-delay:600ms]" />
      </div>

      {/* Card */}
      <div className="flex flex-col items-center justify-center gap-4">
            {/* Spinner */}
            <div className="relative">
              <div className="h-13 w-13 rounded-full border-2 border-black/10 bg-transparent" />
              <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-sky-300 border-r-sky-400 animate-spin" />
              <div className="absolute inset-0 rounded-full blur-md bg-gradient-to-r from-sky-400/20 to-violet-400/20" />
            </div>

            {/* Text */}
            <div className="flex-1 text-center">
              <h2 className="text-lg font-semibold text-sky-800">{title}</h2>
              <p className="mt-1 text-sm text-sky-800/60">{subtitle}</p>

              {/* Animated dots */}
              <div className="mt-3 flex items-center justify-center gap-1 text-sky-700 text-xs">
                <span className="animate-bounce [animation-delay:0ms]">•</span>
                <span className="animate-bounce [animation-delay:150ms]">
                  •
                </span>
                <span className="animate-bounce [animation-delay:300ms]">
                  •
                </span>
              </div>
            </div>
          </div>
    </div>
  );
}
