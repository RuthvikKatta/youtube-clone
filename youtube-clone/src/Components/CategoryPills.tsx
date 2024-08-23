import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./Button";
import { useEffect, useRef, useState } from "react";

type CategoriesPillProps = {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
};

const TRANSLATE_SIZE = 300;

export function CategoryPills({
  categories,
  selectedCategory,
  onSelect,
}: CategoriesPillProps) {
  const [translate, setTranslate] = useState(0);
  const [isLeftVisible, setIsLeftVisible] = useState(true);
  const [isRightVisible, setIsRightVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      const container = entries[0]?.target;

      if (container == null) {
        return;
      }

      setIsLeftVisible(translate > 0);
      setIsRightVisible(translate + container.clientWidth < container.scrollWidth);
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [categories, translate]);

  return (
    <div className="relative flex w-full" ref={containerRef}>
      {isLeftVisible && (
        <div
          className="absolute 
       bg-gradient-to-r from-white from-50% to bg-transparent w-24 h-full top-0 z-10"
        >
          <Button
            variant="ghost"
            size="icon"
            className="h-full aspect-square w-auto p-1.5"
            onClick={() => {
              setTranslate((translate) => {
                const newTranslate = translate - TRANSLATE_SIZE;
                if (newTranslate <= 0) {
                  return 0;
                }
                return newTranslate;
              });
            }}
          >
            <ChevronLeft />
          </Button>
        </div>
      )}
      <div
        className="w-full transition-transform trasition-500 transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);"
        style={{ transform: `translateX(-${translate}px)` }}
      >
        <div className="flex gap-3 whitespace-nowrap w-[max-content]">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "active" : "default"}
              className="rounded:md px-3 py-1 whitespace-nowrap"
              onClick={() => {
                onSelect(category);
              }}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      {isRightVisible && (
        <div
          className="absolute 
       bg-gradient-to-l from-white from-50% to bg-transparent w-24 h-full right-0 top-0 flex justify-end z-10"
        >
          <Button
            variant="ghost"
            size="icon"
            className="h-full aspect-square w-auto p-1.5"
            onClick={() => {
              setTranslate((translate) => {
                if (containerRef.current == null) {
                  return translate;
                }
                const newTranslate = translate + TRANSLATE_SIZE;
                const edge = containerRef.current.scrollWidth;
                const width = containerRef.current.clientWidth;
                if (edge - width == 0) {
                  return translate;
                }
                if (newTranslate >= edge - width) {
                  return translate + edge - width;
                }
                return newTranslate;
              });
            }}
          >
            <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
}
