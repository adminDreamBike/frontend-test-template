"use client";

import { ChevronDown, LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/utils";

const dropdownTriggerVariants = cva(
  "inline-flex items-center justify-between gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-[#585660] text-white hover:bg-[#484450]",
        secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
        ghost: "hover:bg-gray-100 text-gray-700",
        outline: "border-2 border-gray-300 bg-transparent hover:bg-gray-100",
      },
      size: {
        sm: "h-9 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "md",
    },
  }
);

export interface DropdownItem {
  label: string;
  value: string;
  icon?: LucideIcon;
  disabled?: boolean;
  onClick?: () => void;
}

export interface DropdownProps
  extends VariantProps<typeof dropdownTriggerVariants> {
  items: string[];
  placeholder?: string;
  selectedValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
  align?: "left" | "right";
}

const Dropdown = ({
  items,
  placeholder = "Select an option",
  selectedValue,
  onChange,
  variant,
  size,
  className,
  disabled,
  align = "left",
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedItem = items.find((item) => item === selectedValue);

  console.log('selectedItem', selectedItem)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleSelect = (item: string) => {
    if (item.disabled) return;

    if (onChange) {
      onChange(item);
    }

    // if (item.onClick) {
    //   item.onClick();
    // }

    setIsOpen(false);
  };
  console.log('classname', className)

  return (
    <div className={cn("relative inline-block", className)} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          dropdownTriggerVariants({ variant, size }),
          "w-full min-w-[180px]"
        )}
      >
        <span className="flex items-center gap-2">
          {/* {selectedItem?.icon && <selectedItem.icon size={16} />} */}
          {selectedItem || placeholder}
        </span>
        <ChevronDown
          size={16}
          className={cn(
            "transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      {isOpen && (
        <div
          className={cn(
            "absolute z-50 mt-2 min-w-[180px] w-full rounded-md border border-gray-200 bg-white shadow-lg",
            align === "right" ? "right-0" : "left-0"
          )}
        >
          <div className="py-1">
            {items.map((item) => {
              const isSelected = item === selectedValue;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleSelect(item)}
                  disabled={item.disabled}
                  className={cn(
                    "w-full flex items-center gap-2 px-4 py-2 text-sm text-left transition-colors",
                    "hover:bg-gray-100 focus:bg-gray-100 focus:outline-none",
                    isSelected && "bg-gray-50 font-medium",
                    item.disabled &&
                      "opacity-50 cursor-not-allowed hover:bg-transparent"
                  )}
                >
                    {/* {item.icon && <item.icon size={16} />} */}
                    <span>{item}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown