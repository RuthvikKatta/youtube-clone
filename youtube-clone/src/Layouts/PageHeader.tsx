import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from "lucide-react";
import logo from "../assets/youtube-logo.svg";
import { Button } from "../Components/Button";
import { useState } from "react";
import { useSidebarContext } from "../Context/SlidebarContext";

export function PageHeader() {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);

  return (
    <div className="flex gap-10 lg:gap-20 justify-between px-3 py-2">
      <HeaderLogoSection hidden={showFullWidthSearch} />
      <form
        className={`md:flex gap-4 flex-grow justify-center ${
          showFullWidthSearch ? "flex" : "hidden"
        }`}
      >
        {showFullWidthSearch && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setShowFullWidthSearch(false);
            }}
          >
            <ArrowLeft />
          </Button>
        )}
        <div className="flex flex-grow max-w-[600px]">
          <input
            name="search"
            type="search"
            placeholder="Search"
            className="rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-lg w-full focus:border-blue-500 outline-none"
          />
          <Button className="px-4 py-2 rounded-r-full border border-l-0 border-secondary-border flex-shrink-0">
            <Search />
          </Button>
        </div>
        <Button type="button" size="icon">
          <Mic />
        </Button>
      </form>
      <div
        className={`flex flex-shrink-0 md:gap-2 ${
          showFullWidthSearch ? "hidden" : "flex"
        }`}
      >
        <Button
          size="icon"
          variant="ghost"
          className="md:hidden"
          onClick={() => {
            setShowFullWidthSearch(true);
          }}
        >
          <Search />
        </Button>
        <Button size="icon" variant="ghost" className="hidden xs:flex md:hidden">
          <Mic />
        </Button>
        <Button size="icon" variant="ghost">
          <Upload />
        </Button>
        <Button size="icon" variant="ghost" className="hidden xs:flex">
          <Bell />
        </Button>
        <Button size="icon" variant="ghost">
          <User />
        </Button>
      </div>
    </div>
  );
}

type HeaderLogoSectionProps = {
  hidden?: boolean;
};

export function HeaderLogoSection({ hidden = false }: HeaderLogoSectionProps) {
  const { toggle } = useSidebarContext();

  return (
    <div
      className={`flex gap-4 items-center flex-shrink-0 ${
        hidden ? "hidden" : "flex"
      }`}
    >
      <Button onClick={toggle} variant="ghost" size="icon">
        <Menu />
      </Button>
      <a href="/">
        <img src={logo} alt="Logo" width={100} />
      </a>
    </div>
  );
}
