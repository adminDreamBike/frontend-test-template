import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/utils/utils";
import Link from "next/link";

const iconButtonVariants = cva(
  "inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[#585600] text-white hover:bg-[#484450] activate:bg-[#383340]",
        secondary:
          "bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400",
        ghost: "hover:bg-gray-100 active:bg-gray-200 text-gray-700",
        outline:
          "border-2 border-gray-300 bg-transparent hover:bg-gray-100 active:bg-gray-200",
        destructive: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
        link: "text-[#585600] hover:bg-gray-100",
      },
      size: {
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
        xl: "h-14 w-14",
      },
      rounded: {
        default: "rounded-md",
        full: "rounded-full",
        none: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "md",
      rounded: "default",
    },
  }
);

const iconSizeMap = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
};

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "href">,
    VariantProps<typeof iconButtonVariants> {
  icon: LucideIcon;
  iconSize?: number;
  label?: string;
  href?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      variant,
      size = "md",
      rounded,
      icon: Icon,
      iconSize,
      label,
      href,
      target,
      ...props
    },
    ref
  ) => {
    const defaultIconSize = iconSize || iconSizeMap[size || "md"];
    const classes = cn(
      iconButtonVariants({ variant, size, rounded, className })
    );

    if (href) {
      return (
        <Link
          href={href}
          className={classes}
          aria-label={label}
          target={target}
          ref={ref as React.Ref<HTMLAnchorElement>}
        >
            <Icon size={defaultIconSize} />
        </Link>
      );
    }
    return (
      <button
        className={cn(
          iconButtonVariants({ variant, size, rounded, className })
        )}
        ref={ref}
        aria-label={label}
        {...props}
      >
        <Icon size={defaultIconSize} />
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

export default IconButton;
