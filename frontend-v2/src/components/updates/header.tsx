import { useInvalidate, useRead, useWrite } from "@lib/hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu";
import { Bell, Circle } from "lucide-react";
import { Button } from "@ui/button";
import { Calendar, User } from "lucide-react";
import { UpdateDetails, UpdateUser } from "./details";
import { UpdateListItem, UpdateStatus } from "@monitor/client/dist/types";
import { ResourceComponents } from "@components/resources";
import { cn } from "@lib/utils";

const fmt_date = (d: Date) =>
  `${d.getDate()}/${d.getMonth() + 1} @ ${d.getHours()}:${d.getMinutes()}`;

export const SingleUpdate = ({ update }: { update: UpdateListItem }) => {
  const Components =
    update.target.type !== "System"
      ? ResourceComponents[update.target.type]
      : null;

  return (
    <UpdateDetails id={update.id}>
      <div className="px-2 py-4 hover:bg-muted transition-colors border-b last:border-none cursor-pointer">
        <div className="flex items-center justify-between">
          <div className="text-sm w-full">
            {update.operation.match(/[A-Z][a-z]+|[0-9]+/g)?.join(" ")}
            <div className="text-muted-foreground text-xs">
              {Components && <Components.Name id={update.target.id} />}
            </div>
          </div>

          <div className="w-48 text-xs">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <div>
                {update.status === UpdateStatus.InProgress
                  ? "ongoing"
                  : fmt_date(new Date(update.start_ts))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <UpdateUser user_id={update.operator} />
            </div>
          </div>
        </div>
      </div>
    </UpdateDetails>
  );
};

export const HeaderUpdates = () => {
  const updates = useRead("ListUpdates", {}).data;

  const last_opened = useRead("GetUser", {}).data?.last_update_view;
  const unseen_update = updates?.updates.some(
    (u) => u.start_ts > (last_opened ?? Number.MAX_SAFE_INTEGER)
  );

  const invalidate = useInvalidate();
  const { mutate } = useWrite("SetLastSeenUpdate", {
    onSuccess: () => invalidate(["GetUser"]),
  });

  return (
    <DropdownMenu onOpenChange={(o) => o && mutate({})}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-4 h-4" />
          <Circle
            className={cn(
              "absolute top-2 right-2 w-2 h-2 stroke-red-500 fill-red-500 transition-opacity",
              unseen_update ? "opacity-1" : "opacity-0"
            )}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[500px] h-[500px] overflow-auto">
        <DropdownMenuGroup>
          {updates?.updates.map((update) => (
            <SingleUpdate update={update} key={update.id} />
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
