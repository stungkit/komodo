import { useRead, useResourceParamType } from "@lib/hooks";
import { ResourceComponents } from "./resources";
import {
  Box,
  Boxes,
  FileQuestion,
  FolderTree,
  Home,
  Key,
  SearchX,
  Tag,
  UserCircle2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu";
import { Button } from "@ui/button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RESOURCE_TARGETS } from "@lib/utils";
import { Omnibar } from "./omnibar";
import { WsStatusIndicator } from "@lib/socket";
import { HeaderUpdates } from "./updates/header";
import { Logout } from "./util";
import { ThemeToggle } from "@ui/theme";
import { UsableResource } from "@types";
import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@ui/command";

export const Topbar = () => {
  return (
    <div className="sticky top-0 border-b z-50 w-full bg-card text-card-foreground shadow">
      <div className="container flex items-center justify-between py-4 gap-8">
        <div className="flex items-center gap-4">
          <Link to={"/"} className="text-2xl tracking-widest">
            MONITOR
          </Link>
          <div className="flex gap-2">
            <PrimaryDropdown />
            <SecondaryDropdown />
          </div>
        </div>
        <div className="flex md:gap-4">
          <Omnibar />
          <div className="flex">
            <WsStatusIndicator />
            <HeaderUpdates />
            <ThemeToggle />
            {/* <UserSettings /> */}
            <Logout />
          </div>
        </div>
      </div>
    </div>
  );
};

const PrimaryDropdown = () => {
  const type = useResourceParamType();
  const Components = type && ResourceComponents[type];

  const [icon, title] = Components
    ? [<Components.Icon />, type + "s"]
    : location.pathname === "/"
    ? [<Home className="w-4 h-4" />, "Home"]
    : location.pathname === "/keys"
    ? [<Key className="w-4 h-4" />, "Api Keys"]
    : location.pathname === "/tags"
    ? [<Tag className="w-4 h-4" />, "Tags"]
    : location.pathname === "/users"
    ? [<UserCircle2 className="w-4 h-4" />, "Users"]
    : [<FileQuestion className="w-4 h-4" />, "Unknown"];
  // : [<Box className="w-4 h-4" />, "Dashboard"];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-36 justify-between px-3">
          <div className="flex items-center gap-2">
            {icon}
            {title}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36" side="bottom">
        <DropdownMenuGroup>
          <Link to="/">
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
              <Home className="w-4 h-4" />
              Home
            </DropdownMenuItem>
          </Link>

          <DropdownMenuSeparator />

          {RESOURCE_TARGETS.map((rt) => {
            const RTIcon = ResourceComponents[rt].Icon;
            return (
              <Link key={rt} to={`/${rt.toLowerCase()}s`}>
                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                  <RTIcon />
                  {rt}s
                </DropdownMenuItem>
              </Link>
            );
          })}

          <DropdownMenuSeparator />

          <Link to="/tags">
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
              <Tag className="w-4 h-4" />
              Tags
            </DropdownMenuItem>
          </Link>

          <DropdownMenuSeparator />

          <Link to="/keys">
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
              <Box className="w-4 h-4" />
              Api Keys
            </DropdownMenuItem>
          </Link>
          <Link to="/users">
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
              <UserCircle2 className="w-4 h-4" />
              Users
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export type HomeView = "Dashboard" | "Tree" | "Resources";

export const homeViewAtom = atomWithStorage<HomeView>(
  "home-view-v1",
  "Dashboard"
);

const ICONS = {
  Dashboard: () => <Box className="w-4 h-4" />,
  Tree: () => <FolderTree className="w-4 h-4" />,
  Resources: () => <Boxes className="w-4 h-4" />,
};

const SecondaryDropdown = () => {
  const [view, setView] = useAtom(homeViewAtom);

  const type = useResourceParamType();
  if (type) return <ResourcesDropdown type={type} />;
  if (location.pathname !== "/") return;

  const Icon = ICONS[view];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-48 justify-between px-3">
          <div className="flex items-center gap-2">
            <Icon />
            {view}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" side="bottom">
        <DropdownMenuGroup>
          {Object.entries(ICONS).map(([view, Icon]) => (
            <DropdownMenuItem
              key={view}
              className="flex items-center gap-2"
              onClick={() => setView(view as HomeView)}
            >
              <Icon />
              {view}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ResourcesDropdown = ({ type }: { type: UsableResource }) => {
  const nav = useNavigate();
  const id = useParams().id as string;
  const list = useRead(`List${type}s`, {}).data;

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const selected = list?.find((i) => i.id === id);
  const Components = ResourceComponents[type];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="justify-between w-[300px] px-3">
          <div className="flex items-center gap-2">
            <Components.Icon id={selected?.id} />
            {selected ? selected.name : `All ${type}s`}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] max-h-[400px] p-0" sideOffset={12}>
        <Command>
          <CommandInput
            placeholder={`Search ${type}s`}
            className="h-9"
            value={input}
            onValueChange={setInput}
          />
          <CommandList>
            <CommandEmpty className="flex justify-evenly items-center">
              {`No ${type}s Found`}
              <SearchX className="w-3 h-3" />
            </CommandEmpty>

            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  nav(`/${type.toLowerCase()}s`);
                }}
              >
                <Button variant="link" className="flex gap-2 items-center p-0">
                  <Components.Icon />
                  All {type}s
                </Button>
              </CommandItem>
              {list?.map((resource) => (
                <CommandItem
                  key={resource.id}
                  onSelect={() => {
                    setOpen(false);
                    nav(`/${type.toLowerCase()}s/${resource.id}`);
                  }}
                >
                  <Components.Link id={resource.id} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
