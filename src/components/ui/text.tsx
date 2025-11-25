import { cn } from "@/utils/utils";
import { cva, VariantProps } from "class-variance-authority";
import React, { createElement, forwardRef, HTMLAttributes } from "react";

const textVariants = cva("", {
  variants: {
    textStyle: {
      h1: "text-4xl font-bold leading-tight tracking-tight",
      h2: "text-3xl font-bold leading-tight tracking-tight",
      h3: "text-2xl font-semibold leading-snug",
      h4: "text-xl font-semibold leading-snug",
      h5: "text-lg font-semibold leading-normal",
      h6: "text-base font-semibold leading-normal",
      body: "text-base font-normal leading-relaxed",
      bodyLarge: "text-lg font-normal leading-relaxed",
      bodySmall: "text-sm font-normal leading-normal",
      caption: "text-xs font-normal leading-tight",
      label: "text-sm font-medium leading-normal",
      labelSmall: "text-xs font-medium leading-tight",
      subtitle: "text-base font-medium leading-normal text-gray-600",
      overline: "text-xs font-semibold uppercase tracking-wider leading-tight",
      code: "font-mono text-sm bg-gray-100 px-1.5 py-0.5 rounded",
    },
    weight: {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
    variant: {
      default: 'text-gray-900',
      muted: 'text-gray-600',
      subtle: 'text-gray-500',
      primary: 'text-[#585660]',
      secondary: 'text-gray-700',
      success: 'text-green-600',
      warning: 'text-yellow-600',
      error: 'text-red-600',
      white: 'text-white',
    },
    truncate: {
      true: "truncate",
      false: "",
    },
  },
  defaultVariants: {
    textStyle: "body",
    variant: "default",
    align: "left",
  },
});

export interface TextProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  as?:
    | "p"
    | "span"
    | "div"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "label"
    | "code";
  children: React.ReactNode;
}

const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      className,
      textStyle,
      weight,
      align,
      variant,
      truncate,
      as,
      children,
      ...props
    },
    ref
  ) => {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const Component: any = as || getDefaultElement(textStyle);

    return createElement(
      Component,
      {
        className: cn(
          textVariants({ textStyle, weight, align, variant, truncate, className })
        ),
        ref,
        ...props,
      },
      children
    );
  }
);

function getDefaultElement(textStyle: TextProps["textStyle"]): TextProps["as"] {
  switch (textStyle) {
    case "h1":
      return "h1";
    case "h2":
      return "h2";
    case "h3":
      return "h3";
    case "h4":
      return "h4";
    case "h5":
      return "h5";
    case "h6":
      return "h6";
    case "label":
    case "labelSmall":
      return "label";
    case "code":
      return "code";
    default:
      return "p";
  }
}

Text.displayName = 'Text';

export { Text, textVariants }