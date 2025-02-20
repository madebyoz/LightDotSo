// Copyright 2023-2024 LightDotSo.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// From: https://github.com/themesberg/flowbite-react/blob/f186ec8437003772966f5608a1c87a6f1f49ab8b/src/components/Timeline/Timeline.tsx
// From: https://github.com/themesberg/flowbite-react/blob/f186ec8437003772966f5608a1c87a6f1f49ab8b/src/components/Timeline/TimelineBody.tsx
// From: https://github.com/themesberg/flowbite-react/blob/f186ec8437003772966f5608a1c87a6f1f49ab8b/src/components/Timeline/TimelineContent.tsx
// From: https://github.com/themesberg/flowbite-react/blob/f186ec8437003772966f5608a1c87a6f1f49ab8b/src/components/Timeline/TimelineItem.tsx
// From: https://github.com/themesberg/flowbite-react/blob/f186ec8437003772966f5608a1c87a6f1f49ab8b/src/components/Timeline/TimelinePoint.tsx
// From: https://github.com/themesberg/flowbite-react/blob/f186ec8437003772966f5608a1c87a6f1f49ab8b/src/components/Timeline/TimelineTime.tsx
// From: https://github.com/themesberg/flowbite-react/blob/f186ec8437003772966f5608a1c87a6f1f49ab8b/src/components/Timeline/TimelineTitle.tsx
// License: MIT

import { cn } from "@lightdotso/utils";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type { ComponentProps, FC, ReactNode } from "react";

// -----------------------------------------------------------------------------
// Components
// -----------------------------------------------------------------------------

interface TimelineProps extends ComponentProps<"ol"> {}
const Timeline: FC<TimelineProps> = ({ children, className, ...props }) => {
  return (
    <ol className={cn("relative", className)} {...props}>
      {children}
    </ol>
  );
};

const timelinePointVariants = cva("", {
  variants: {
    size: {
      xs: "-left-2 size-4",
      sm: "-left-3 size-6",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});
interface TimelnePointProps extends ComponentProps<"div"> {
  children: ReactNode;
  size?: VariantProps<typeof timelinePointVariants>["size"];
}
const TimelinePoint: FC<TimelnePointProps> = ({
  children,
  className,
  size,
  ...props
}) => {
  return (
    <div className={className} {...props}>
      <span
        className={cn(
          "absolute z-20 flex items-center justify-center rounded-full",
          timelinePointVariants({ size: size }),
        )}
      >
        {children}
      </span>
    </div>
  );
};

interface TimelineContentProps extends ComponentProps<"div"> {}
const TimelineContent: FC<TimelineContentProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn("pb-4", className)} {...props}>
      {children}
    </div>
  );
};

interface TimelineItemProps extends ComponentProps<"li"> {}
const TimelineItem: FC<TimelineItemProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <li
      className={cn(
        "border-l border-border-strong pl-6 last:border-0",
        className,
      )}
      {...props}
    >
      {/* <div className="absolute left-0 top-0 z-10 h-2 w-1 bg-background" /> */}
      {children}
    </li>
  );
};

const timelineTitleVariants = cva("", {
  variants: {
    size: {
      xs: "text-sm font-semibold text-text",
      sm: "text-base font-semibold text-text",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});
interface TimelineTitleProps extends ComponentProps<"h1"> {
  size?: VariantProps<typeof timelineTitleVariants>["size"];
}
const TimelineTitle: FC<TimelineTitleProps> = ({
  children,
  className,
  size,
  ...props
}) => {
  return (
    <h1
      className={cn(timelineTitleVariants({ size: size }), className)}
      {...props}
    >
      {children}
    </h1>
  );
};

const timelineBodyVariants = cva("", {
  variants: {
    size: {
      xs: "text-xs font-normal text-text-weak",
      sm: "text-base font-normal text-text-weak",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});
interface TimelineBodyProps extends ComponentProps<"p"> {
  size?: VariantProps<typeof timelineBodyVariants>["size"];
}
const TimelineBody: FC<TimelineBodyProps> = ({
  children,
  className,
  size,
  ...props
}) => {
  return (
    <div
      className={cn(timelineBodyVariants({ size: size }), className)}
      {...props}
    >
      {children}
    </div>
  );
};

interface TimelineTimeProps extends ComponentProps<"time"> {}
const TimelineTime: FC<TimelineTimeProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <time
      className={cn("text-sm font-normal leading-none text-text", className)}
      {...props}
    >
      {children}
    </time>
  );
};

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export {
  Timeline,
  TimelineContent,
  TimelineItem,
  TimelinePoint,
  TimelineTitle,
  TimelineBody,
  TimelineTime,
};
