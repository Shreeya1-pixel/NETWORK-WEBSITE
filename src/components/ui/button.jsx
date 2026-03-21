import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium font-body transition-all duration-[0.18s] ease focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default:
                    "bg-white/40 border border-white/44 backdrop-blur-[10px] text-primary hover:bg-white/50 hover:border-white/50 rounded-2xl shadow-[0_6px_24px_rgba(100,120,160,0.13)]",
                primary:
                    "bg-[rgba(160,140,230,0.22)] border border-[rgba(160,140,230,0.4)] text-accent hover:bg-[rgba(160,140,230,0.28)] hover:border-[rgba(160,140,230,0.5)] rounded-2xl shadow-[0_6px_24px_rgba(100,120,160,0.13)]",
                success:
                    "bg-[rgba(207,233,219,0.55)] border border-white/40 text-success rounded-2xl shadow-[0_6px_24px_rgba(100,120,160,0.13)]",
                destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline: "border border-white/44 bg-white/25 backdrop-blur-[10px] text-primary hover:bg-white/35",
                secondary: "bg-white/35 text-secondary hover:bg-white/45",
                ghost: "hover:bg-white/30 text-primary",
                link: "text-accent underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-xl px-3",
                lg: "h-11 rounded-2xl px-8",
                icon: "h-10 w-10 rounded-2xl",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
        <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
        />
    )
})
Button.displayName = "Button"

export { Button, buttonVariants }
