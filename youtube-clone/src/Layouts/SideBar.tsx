import { useSidebarContext } from "../Context/SlidebarContext";
import { HeaderLogoSection } from "./PageHeader";
import {
  smallSideBarIcons,
  largeSideBarIcons,
  subscriptions,
} from "../data/Icons";
import {
  SmallSidebarItem,
  LargeSidebarItem,
  LargeSidebarSection,
} from "../Components/SideBarItems";

export function SideBar() {
  const { isLargeOpen, isSmallOpen, close } = useSidebarContext();

  return (
    <>
      <aside
        className={`sticky top-0 overflow-y-auto scrollbar-hidden px-1 hidden md:flex flex-col ml-1 gap-1 ${
          isLargeOpen ? "lg:hidden" : "lg:flex"
        }`}
      >
        {smallSideBarIcons.map((icon) => (
          <SmallSidebarItem key={icon.id} Icon={icon.Icon} title={icon.title} />
        ))}
      </aside>
      {isSmallOpen && (
        <div
          onClick={close}
          className="lg:hidden fixed inset-0 z-[999] bg-secondary-dark opacity-50"
        />
      )}
      <aside
        className={`w-[15rem] lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col gap-2 px-3 ${
          isLargeOpen ? "lg:flex" : "lg:hidden"
        } ${isSmallOpen ? "flex z-[999] bg-white max-h-screen" : "hidden"}`}
      >
        <div className="lg:hidden pt-2 pb-4 px-1 sticky top-0 bg-white">
          <HeaderLogoSection />
        </div>
        <LargeSidebarSection>
          {largeSideBarIcons.firstSection.map((icon) => (
            <LargeSidebarItem
              key={icon.id}
              IconOrImageURL={icon.Icon}
              title={icon.title}
              url={`/${icon.title}`}
              isActive={icon.id === "1"}
            />
          ))}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection visibleChildrenCount={5}>
          {largeSideBarIcons.secondSection.map((icon) => (
            <LargeSidebarItem
              key={icon.id}
              IconOrImageURL={icon.Icon}
              title={icon.title}
              url={`/${icon.title}`}
            />
          ))}
          {largeSideBarIcons.mixes.map((mix) => (
            <LargeSidebarItem
              key={mix.id}
              IconOrImageURL={mix.Icon}
              title={mix.title}
              url={`/${mix.title}`}
            />
          ))}
          {largeSideBarIcons.playlists.map((playlist) => (
            <LargeSidebarItem
              key={playlist.id}
              IconOrImageURL={playlist.Icon}
              title={playlist.title}
              url={`/${playlist.title}`}
            />
          ))}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Subscriptions" visibleChildrenCount={4}>
          {subscriptions.map((subscription) => (
            <LargeSidebarItem
              key={subscription.id}
              IconOrImageURL={subscription.imgUrl}
              title={subscription.channelName}
              url={`/profile/${subscription.imgUrl}`}
            ></LargeSidebarItem>
          ))}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Explore">
          {largeSideBarIcons.explore.map((exploreIcon) => (
            <LargeSidebarItem
              key={exploreIcon.id}
              IconOrImageURL={exploreIcon.Icon}
              title={exploreIcon.title}
              url={`/${exploreIcon.title}`}
            ></LargeSidebarItem>
          ))}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="More From YouTube">
          {largeSideBarIcons.moreFromYoutube.map((youTubeIcon) => (
            <LargeSidebarItem
              key={youTubeIcon.id}
              IconOrImageURL={youTubeIcon.Icon}
              title={youTubeIcon.title}
              url={`/${youTubeIcon.title}`}
              isYouTubeIcon
            ></LargeSidebarItem>
          ))}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection>
          {largeSideBarIcons.settings.map((setting) => (
            <LargeSidebarItem
              key={setting.id}
              IconOrImageURL={setting.Icon}
              title={setting.title}
              url={`/${setting.title}`}
            ></LargeSidebarItem>
          ))}
        </LargeSidebarSection>
        <hr />
        <div className="px-2 text-xs font-medium whitespace-pre-wrap break-words">
          <pre>
            <a href="">About</a> <a href="">Press</a> <a href="">Copyright</a>
            <br />
            <a href="">Contact us</a> <a href="">Creators</a>
            <br />
            <a href="">Advertise</a> <a href="">Developers</a>
            <br />
            <br />
            <a href="">Terms</a> <a href="">Privacy</a>{" "}
            <a href="">Policy & Safety</a>
            <br />
            <a href="">How YouTube works</a>
            <br />
            <a href="">Test new features</a>
            <br />
            <br />
            <div className="text-[10px] text-gray-500 ">
              © 2023 Ruthvik Katta
            </div>
          </pre>
        </div>
      </aside>
    </>
  );
}
