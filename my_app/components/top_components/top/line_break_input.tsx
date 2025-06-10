import React from "react"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"

export default function Line_break_input({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Textarea
        className={cn(
            "w-full h-full px-4 py-4 text-sm placeholder:text-sm rounded-md border border-input bg-background text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            className
        )}
        {...props}
    />
  )
}
