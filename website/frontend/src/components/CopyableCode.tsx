"use client";

import { useState, useCallback } from "react";

export default function CopyableCode({ children }: { children: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(children).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [children]);

  return (
    <div className="code-block-wrapper">
      <pre className="text-[#e8e8e8]">
        <code>{children}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="copy-btn"
        aria-label="Copy to clipboard"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}
