import { useState } from "react";
import { CategoryPills } from "../Components/CategoryPills";
import { categories } from "../data/Categories";
import { PageHeader } from "./PageHeader";
import { SideBar } from "./SideBar";
import VideoGrid from "./VideoGrid";

export function HomePage() {

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <div className="max-h-screen flex flex-col">
    <PageHeader />
    <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
      <SideBar />
      <div className="overflow-x-hidden px-4 pb-4">
        <div className="sticky top-0 bg-white z-20 pb-4 overflow-x-hidden">
          <CategoryPills
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>
        <VideoGrid />
      </div>
    </div>
  </div>
  )
}