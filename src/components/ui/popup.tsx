"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"
import { X, CheckCircle2, AlertTriangle, Info } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type PopupVariant = "default" | "destructive" | "success"

export type PopupProps = {
  open: boolean
  onOpenChange?: (open: boolean) => void
  title?: React.ReactNode
  description?: React.ReactNode
  variant?: PopupVariant
  position?: "top" | "bottom"
  className?: string
}

const variantClasses: Record<PopupVariant, string> = {
  default: "bg-background text-foreground border",
  destructive: "bg-destructive text-destructive-foreground border border-destructive",
  success: "bg-green-600 text-white border border-green-700",
}

const iconByVariant: Record<PopupVariant, React.ReactNode> = {
  default: <Info className="h-5 w-5 opacity-90" aria-hidden="true" />,
  destructive: <AlertTriangle className="h-5 w-5" aria-hidden="true" />,
  success: <CheckCircle2 className="h-5 w-5" aria-hidden="true" />,
}

export function Popup({
  open,
  onOpenChange,
  title,
  description,
  variant = "default",
  position = "top",
  className,
}: PopupProps) {
  const role = variant === "destructive" ? "alert" : "status"
  const ariaLive = variant === "destructive" ? "assertive" : "polite"

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="popup"
          initial={{ y: position === "top" ? -24 : 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: position === "top" ? -24 : 24, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={cn("pointer-events-auto w-full rounded-md shadow-lg", className)}
          role={role}
          aria-live={ariaLive}
          aria-atomic="true"
        >
          <div className={cn("flex items-start gap-3 rounded-md p-4", variantClasses[variant])}>
            <div className="mt-0.5 shrink-0">{iconByVariant[variant]}</div>
            <div className="min-w-0 flex-1">
              {title ? <div className="text-sm font-semibold leading-5">{title}</div> : null}
              {description ? <div className="text-sm opacity-90 leading-relaxed">{description}</div> : null}
            </div>
            <button
              type="button"
              onClick={() => onOpenChange?.(false)}
              aria-label="Close notification"
              className={cn(
                "rounded p-1 transition-colors",
                variant === "success"
                  ? "hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
                  : "hover:bg-foreground/10 focus:outline-none focus:ring-2 focus:ring-ring",
              )}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
