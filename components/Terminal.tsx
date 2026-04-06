"use client"

import { useEffect, useState } from "react"

const LINES = [
  { text: "$ whoami", type: "command" },
  { text: "Cayo Aguiar — Full Stack Dev", type: "output" },
  { text: "", type: "blank" },
  { text: "$ stack --list", type: "command" },
  { text: "C# · .NET · Next.js · Unity · Web3", type: "output" },
  { text: "", type: "blank" },
  { text: "$ status", type: "command" },
  { text: "Available for hire ✓", type: "success" },
] as const

const DELAY_COMMAND = 700
const DELAY_OUTPUT = 300
const DELAY_BLANK = 200

export default function Terminal() {
  const [visibleCount, setVisibleCount] = useState(0)
  const [cursorOn, setCursorOn] = useState(true)

  useEffect(() => {
    if (visibleCount >= LINES.length) return
    const line = LINES[visibleCount]
    let delay = DELAY_OUTPUT
    if (line.type === "command") delay = DELAY_COMMAND
    if (line.type === "blank") delay = DELAY_BLANK

    const timer = setTimeout(() => {
      setVisibleCount((c) => c + 1)
    }, delay)
    return () => clearTimeout(timer)
  }, [visibleCount])

  useEffect(() => {
    const timer = setInterval(() => setCursorOn((v) => !v), 530)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full max-w-md rounded-2xl border border-violet-primary/30 bg-[#0d0b17] shadow-2xl shadow-violet-900/30 overflow-hidden">
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-violet-primary/20 to-cyan-primary/10 pointer-events-none" />

      <div className="relative flex items-center gap-2 border-b border-white/5 bg-surface px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-auto text-xs text-slate-600 font-mono">terminal</span>
      </div>

      <div className="relative p-5 font-mono text-sm min-h-[200px] space-y-0.5">
        {LINES.slice(0, visibleCount).map((line, i) => (
          <div
            key={i}
            className={
              line.type === "command"
                ? "text-violet-400"
                : line.type === "success"
                ? "text-cyan-light"
                : line.type === "blank"
                ? "h-3"
                : "text-slate-300"
            }
          >
            {line.text}
          </div>
        ))}
        <span
          className={`inline-block w-2 h-[1.1em] bg-cyan-primary align-middle transition-opacity duration-100 ${
            cursorOn ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  )
}
