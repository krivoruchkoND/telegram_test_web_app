// src: https://usehooks-ts.com/react-hook/use-copy-to-clipboard
import { useCallback, useState } from "react";

import { showNotification } from "@utils/notificationManager";

type CopiedValue = string | null;
type CopyFn = (text: string) => Promise<boolean>; // Return success

/**
 * Custom hook for copying text to the clipboard.
 * @returns {[CopiedValue, CopyFn]} An tuple containing the copied text and a function to copy text to the clipboard.
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-copy-to-clipboard)
 * @see [MDN Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)
 * @example
 * // Usage of useCopyToClipboard hook
 * const [copiedText, copyToClipboard] = useCopyToClipboard();
 * const textToCopy = 'Hello, world!';
 *
 * // Attempt to copy text to the clipboard
 * copyToClipboard(textToCopy)
 *   .then(success => {
 *     if (success) {
 *       console.log(`Text "${textToCopy}" copied to clipboard successfully.`);
 *     } else {
 *       console.error('Failed to copy text to clipboard.');
 *     }
 *   });
 */
function useCopyToClipboard(): [CopiedValue, CopyFn] {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);

  const copy: CopyFn = useCallback(async (text) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard is not supported");
      prompt(
        `Clipboard is not supported. Copy to clipboard: Ctrl+C, Enter`,
        text,
      );
      return false;
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      showNotification({
        type: "success",
        title: "Copied to clipboard",
      });
      return true;
    } catch (error) {
      console.warn("Copy failed", error);
      prompt(
        `Clipboard is not supported. Copy to clipboard: Ctrl+C, Enter`,
        text,
      );
      setCopiedText(null);
      throw error;
    }
  }, []);

  return [copiedText, copy];
}

export default useCopyToClipboard;
