import { useEffect } from "react";

function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    // Loading message should stay until the request finishes
    if (type === "loading") {
      return;
    }

    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [type, onClose]);

  return (
    <div className="fixed bottom-6 left-1/2 z-[9999] -translate-x-1/2">
      <div className="flex min-w-[280px] items-center gap-3 rounded-xl border border-purple-500/30 bg-black px-5 py-4 text-white shadow-2xl">

        {type === "loading" ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-600 border-t-purple-500"></div>
        ) : (
          <div
            className={`h-3 w-3 rounded-full ${
              type === "success"
                ? "bg-purple-500"
                : type === "error"
                ? "bg-red-500"
                : "bg-yellow-400"
            }`}
          ></div>
        )}

        <p className="text-sm font-medium">
          {message}
        </p>

      </div>
    </div>
  );
}

export default Toast;