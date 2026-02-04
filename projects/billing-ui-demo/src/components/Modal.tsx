import React, { useEffect } from "react";

type Props = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export function Modal({ title, isOpen, onClose, children, footer }: Props) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        padding: 18,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
    >
      <div
        onMouseDown={(e) => e.stopPropagation()}
        style={{
          width: "min(720px, 100%)",
          background: "white",
          borderRadius: 16,
          border: "1px solid #eee",
          boxShadow: "0 18px 60px rgba(0,0,0,0.2)",
          overflow: "hidden",
        }}
      >
        <div style={{ padding: 16, borderBottom: "1px solid #f0f0f0" }} className="row-between">
          <div>
            <div style={{ fontWeight: 800 }}>{title}</div>
          </div>
          <button className="ghost" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div style={{ padding: 16 }}>{children}</div>

        {footer && (
          <div style={{ padding: 16, borderTop: "1px solid #f0f0f0" }} className="row-between">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
