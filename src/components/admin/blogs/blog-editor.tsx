
"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type MouseEvent,
} from "react";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link2,
  Unlink,
  Heading2,
  Heading3,
  Heading4,
  Quote,
  Minus,
  Code,
  Undo2,
  Redo2,
  RemoveFormatting,
} from "lucide-react";

interface BlogEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function BlogEditor({
  value,
  onChange,
  placeholder = "Write your blog content here...",
  disabled = false,
}: BlogEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isSourceMode, setIsSourceMode] = useState(false);
  const [sourceCode, setSourceCode] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const isUpdatingRef = useRef(false);

  // Sync incoming external value into contentEditable when not currently editing
  useEffect(() => {
    if (isUpdatingRef.current) return;
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
    }
    setSourceCode(value || "");
  }, [value]);

  const handleContentChange = useCallback(() => {
    if (!editorRef.current) return;
    const html = editorRef.current.innerHTML;
    const normalized = html === "<p><br></p>" || html === "<br>" ? "" : html;
    isUpdatingRef.current = true;
    onChange(normalized);
    setSourceCode(normalized);
    setTimeout(() => {
      isUpdatingRef.current = false;
    }, 0);
  }, [onChange]);

  const executeCommand = (
    command: string,
    arg: string | undefined = undefined,
  ) => {
    if (disabled || isSourceMode) return;
    editorRef.current?.focus();
    document.execCommand(command, false, arg);
    handleContentChange();
  };

  const handleFormatBlock = (tag: string) => {
    if (disabled || isSourceMode) return;
    executeCommand("formatBlock", tag);
  };

  const handleInsertLink = () => {
    if (disabled || isSourceMode) return;
    const selection = window.getSelection();
    const selectedText = selection ? selection.toString() : "";
    const url = window.prompt(
      "Enter the destination URL (e.g., https://example.com):",
      "https://",
    );

    if (url && url.trim() && url !== "https://") {
      if (!selectedText && editorRef.current) {
        const anchorHtml = `<a href="${url.trim()}" target="_blank" rel="noopener noreferrer">${url.trim()}</a>`;
        executeCommand("insertHTML", anchorHtml);
      } else {
        executeCommand("createLink", url.trim());
      }
    }
  };

  const handleToggleSource = () => {
    if (isSourceMode) {
      if (editorRef.current) {
        editorRef.current.innerHTML = sourceCode;
      }
      onChange(sourceCode);
      setIsSourceMode(false);
    } else {
      if (editorRef.current) {
        setSourceCode(editorRef.current.innerHTML);
      }
      setIsSourceMode(true);
    }
  };

  const handleSourceChange = (newSource: string) => {
    setSourceCode(newSource);
    onChange(newSource);
  };

  const preventToolbarLoss = (e: MouseEvent) => {
    e.preventDefault();
  };

  // Word count & character count calculation
  const plainText = (sourceCode || "").replace(/<[^>]*>/g, " ").trim();
  const wordCount = plainText ? plainText.split(/\s+/).length : 0;
  const charCount = plainText.length;

  const toolbarButtonClass =
    "flex h-8 w-8 items-center justify-center rounded-lg text-[#252A2A] transition-colors hover:bg-[#EFF9F8] hover:text-[#009E98] active:bg-[#EFF9F8] disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-xl border bg-white transition-colors ${
        isFocused
          ? "border-[#009E98] shadow-[0_0_0_1px_rgba(0,158,152,0.08)]"
          : "border-[#E2ECEB]"
      }`}
    >
      {/* Editor Toolbar */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-[#E2ECEB] bg-[#F8FAFA] p-2 text-[#252A2A]">
        {/* Headings */}
        <div className="mr-1 flex items-center gap-1 border-r border-[#E2ECEB] pr-2">
          <button
            type="button"
            onMouseDown={preventToolbarLoss}
            onClick={() => handleFormatBlock("<p>")}
            title="Paragraph Text"
            disabled={disabled || isSourceMode}
            className={`${toolbarButtonClass} text-[13px] font-semibold`}
          >
            P
          </button>
          <button
            type="button"
            onMouseDown={preventToolbarLoss}
            onClick={() => handleFormatBlock("<h2>")}
            title="Heading 2"
            disabled={disabled || isSourceMode}
            className={toolbarButtonClass}
          >
            <Heading2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onMouseDown={preventToolbarLoss}
            onClick={() => handleFormatBlock("<h3>")}
            title="Heading 3"
            disabled={disabled || isSourceMode}
            className={toolbarButtonClass}
          >
            <Heading3 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onMouseDown={preventToolbarLoss}
            onClick={() => handleFormatBlock("<h4>")}
            title="Heading 4"
            disabled={disabled || isSourceMode}
            className={toolbarButtonClass}
          >
            <Heading4 className="h-4 w-4" />
          </button>
        </div>

        {/* Inline styles */}
        <div className="mr-1 flex items-center gap-1 border-r border-[#E2ECEB] pr-2">
          <button
            type="button"
            onMouseDown={preventToolbarLoss}
            onClick={() => executeCommand("bold")}
            title="Bold (Ctrl+B)"
            disabled={disabled || isSourceMode}
            className={toolbarButtonClass}
          >
            <Bold className="h-4 w-4" />
          </button>
          <button
            type="button"
            onMouseDown={preventToolbarLoss}
            onClick={() => executeCommand("italic")}
            title="Italic (Ctrl+I)"
            disabled={disabled || isSourceMode}
            className={toolbarButtonClass}
          >
            <Italic className="h-4 w-4" />
          </button>
          <button
            type="button"
            onMouseDown={preventToolbarLoss}
            onClick={() => executeCommand("underline")}
            title="Underline (Ctrl+U)"
            disabled={disabled || isSourceMode}
            className={toolbarButtonClass}
          >
            <Underline className="h-4 w-4" />
          </button>
        </div>

        {/* Lists & Quotation */}
        <div className="mr-1 flex items-center gap-1 border-r border-[#E2ECEB] pr-2">
          <button
            type="button"
            onMouseDown={preventToolbarLoss}
            onClick={() => executeCommand("insertUnorderedList")}
            title="Bullet List"
            disabled={disabled || isSourceMode}
            className={toolbarButtonClass}
          >
            <List className="h-4 w-4" />
          </button>
          <button
            type="button"
            onMouseDown={preventToolbarLoss}
            onClick={() => executeCommand("insertOrderedList")}
            title="Numbered List"
            disabled={disabled || isSourceMode}
            className={toolbarButtonClass}
          >
            <ListOrdered className="h-4 w-4" />
          </button>
          <button
            type="button"
            onMouseDown={preventToolbarLoss}
            onClick={() => handleFormatBlock("<blockquote>")}
            title="Blockquote"
            disabled={disabled || isSourceMode}
            className={toolbarButtonClass}
          >
            <Quote className="h-4 w-4" />
          </button>
          <button
            type="button"
            onMouseDown={preventToolbarLoss}
            onClick={() => executeCommand("insertHorizontalRule")}
            title="Divider Line"
            disabled={disabled || isSourceMode}
            className={toolbarButtonClass}
          >
            <Minus className="h-4 w-4" />
          </button>
        </div>

        {/* Link / Unlink */}
        <div className="mr-1 flex items-center gap-1 border-r border-[#E2ECEB] pr-2">
          <button
            type="button"
            onMouseDown={preventToolbarLoss}
            onClick={handleInsertLink}
            title="Insert Link"
            disabled={disabled || isSourceMode}
            className={toolbarButtonClass}
          >
            <Link2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onMouseDown={preventToolbarLoss}
            onClick={() => executeCommand("unlink")}
            title="Remove Link"
            disabled={disabled || isSourceMode}
            className={toolbarButtonClass}
          >
            <Unlink className="h-4 w-4" />
          </button>
          <button
            type="button"
            onMouseDown={preventToolbarLoss}
            onClick={() => executeCommand("removeFormat")}
            title="Clear Formatting"
            disabled={disabled || isSourceMode}
            className={toolbarButtonClass}
          >
            <RemoveFormatting className="h-4 w-4" />
          </button>
        </div>

        {/* Undo / Redo */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onMouseDown={preventToolbarLoss}
            onClick={() => executeCommand("undo")}
            title="Undo"
            disabled={disabled || isSourceMode}
            className={toolbarButtonClass}
          >
            <Undo2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onMouseDown={preventToolbarLoss}
            onClick={() => executeCommand("redo")}
            title="Redo"
            disabled={disabled || isSourceMode}
            className={toolbarButtonClass}
          >
            <Redo2 className="h-4 w-4" />
          </button>
        </div>

        {/* HTML Source Toggle */}
        <div className="ml-auto">
          <button
            type="button"
            onClick={handleToggleSource}
            title={isSourceMode ? "Switch to Visual Editor" : "View HTML Source"}
            disabled={disabled}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
              isSourceMode
                ? "bg-[#252A2A] text-white hover:bg-[#3A4241]"
                : "border border-[#E2ECEB] bg-white text-[#52615F] hover:bg-[#EFF9F8] hover:text-[#009E98]"
            }`}
          >
            <Code className="h-3.5 w-3.5" />
            <span>{isSourceMode ? "Visual" : "HTML"}</span>
          </button>
        </div>
      </div>

      {/* Editor Content Area */}
      {isSourceMode ? (
        <textarea
          data-lenis-prevent
          value={sourceCode}
          onChange={(e) => handleSourceChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          placeholder="Enter raw HTML content..."
          className="min-h-[220px] w-full resize-y bg-[#1F2424] p-4 font-mono text-[13px] text-emerald-300 placeholder:text-slate-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        />
      ) : (
        <div
          ref={editorRef}
          data-lenis-prevent
          contentEditable={!disabled}
          suppressContentEditableWarning
          onInput={handleContentChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            handleContentChange();
          }}
          data-placeholder={placeholder}
          className="min-h-[220px] max-h-[460px] overflow-y-auto bg-white p-4 text-[15px] leading-relaxed text-[#252A2A] focus:outline-none disabled:cursor-not-allowed [&:empty]:before:text-[#81908E]/70 [&:empty]:before:content-[attr(data-placeholder)] [&_h2]:mb-2 [&_h2]:mt-4 [&_h2]:text-[22px] [&_h2]:font-medium [&_h2]:tracking-tight [&_h2]:text-[#252A2A] [&_h3]:mb-1.5 [&_h3]:mt-3 [&_h3]:text-[18px] [&_h3]:font-medium [&_h3]:text-[#252A2A] [&_h4]:mb-1 [&_h4]:mt-2 [&_h4]:text-[16px] [&_h4]:font-semibold [&_h4]:text-[#252A2A] [&_p]:mb-3 [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1.5 [&_blockquote]:my-3 [&_blockquote]:rounded-r-lg [&_blockquote]:border-l-4 [&_blockquote]:border-[#009E98] [&_blockquote]:bg-[#F4FBFA] [&_blockquote]:py-2 [&_blockquote]:pl-4 [&_blockquote]:italic [&_a]:text-[#009E98] [&_a]:underline"
        />
      )}

      {/* Editor Footer */}
      <div className="flex items-center justify-between border-t border-[#E2ECEB] bg-[#F8FAFA] px-4 py-2 text-[12px] text-[#71817F]">
        <span>
          {isSourceMode ? "Raw HTML Mode" : "Rich Text Formatting Enabled"}
        </span>

        <div className="flex items-center gap-3">
          <span>
            {wordCount} {wordCount === 1 ? "word" : "words"}
          </span>
          <span className="text-[#C0CCCA]">·</span>
          <span>{charCount} characters</span>
        </div>
      </div>
    </div>
  );
}
