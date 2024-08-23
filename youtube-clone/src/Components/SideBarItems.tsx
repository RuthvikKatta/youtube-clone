import { twMerge } from "tailwind-merge";
import { Button, buttonStyles } from "./Button";
import { ElementType, ReactNode, useState, Children } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type SmallSidebarItemProps = {
  Icon: ElementType;
  title: string;
  url?: string;
};

export function SmallSidebarItem({ Icon, title }: SmallSidebarItemProps) {
  return (
    <a
      href={title}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        `flex flex-col gap-1 items-center `
      )}
    >
      <Icon />
      <div className="text-[10px]">{title}</div>
    </a>
  );
}

type LargeSidebarItemProps = {
  IconOrImageURL: ElementType | string;
  title: string;
  url: string;
  isActive?: boolean;
  isYouTubeIcon?: boolean;
};

export function LargeSidebarItem({
  IconOrImageURL,
  title,
  url,
  isActive,
  isYouTubeIcon,
}: LargeSidebarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        `w-full flex gap-4 px-3 py-2 items-center rounded-lg ${
          isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined
        }`
      )}
    >
      {typeof IconOrImageURL === "string" ? (
        <img
          src={IconOrImageURL}
          alt="Profile"
          className="w-6 h-6 rounded-full"
        />
      ) : (
        <IconOrImageURL
          className="w-6 h-6"
          style={{ color: isYouTubeIcon ? "red" : "black" }}
        />
      )}
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </a>
  );
}

type LargeSidebarSectionProps = {
  children: ReactNode;
  title?: string;
  visibleChildrenCount?: number;
};

export function LargeSidebarSection({
  children,
  title,
  visibleChildrenCount = Number.POSITIVE_INFINITY,
}: LargeSidebarSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const childrenArray = Children.toArray(children).flat();
  const showExpandedButton = childrenArray.length > visibleChildrenCount;
  const visibleChildren = isExpanded
    ? childrenArray
    : childrenArray.slice(0, visibleChildrenCount);

  const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;

  return (
    <div className="flex flex-col gap-1">
      {title && <div className="ml-3 mt-2 text-lg mb-1">{title}</div>}
      {visibleChildren}
      {showExpandedButton && (
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          variant="ghost"
          className="w-full flex items-center rounded-lg gap-4 p-3"
        >
          <ButtonIcon className="w-6 h-6" />
          <div>
            {isExpanded
              ? "Show Less"
              : `Show ${childrenArray.length - visibleChildrenCount} More`}
          </div>
        </Button>
      )}
    </div>
  );
}
