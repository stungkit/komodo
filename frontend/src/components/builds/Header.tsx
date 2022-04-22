import { Build } from "@monitor/types";
import { Component, Show } from "solid-js";
import { DELETE_BUILD } from "@monitor/util";
import { useAppState } from "../../state/StateProvider";
import { useUser } from "../../state/UserProvider";
import ConfirmButton from "../util/ConfirmButton";
import Icon from "../util/Icon";
import Flex from "../util/layout/Flex";
import Grid from "../util/layout/Grid";
import { useActionStates } from "./ActionStateProvider";
import { useTheme } from "../../state/ThemeProvider";
import { combineClasses } from "../../util/helpers";

const Header: Component<{}> = (p) => {
  const { builds, selected, ws } = useAppState();
  const build = () => builds.get(selected.id())!;
  const actions = useActionStates();
  const { permissions, username } = useUser();
  const { themeClass } = useTheme();
  return (
    <Flex
      class={combineClasses("card shadow", themeClass())}
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid gap="0.1rem">
        <h1>{build().name}</h1>
        <div style={{ opacity: 0.8 }}>{getSub(build())}</div>
      </Grid>
      <Show when={permissions() >= 2 || build().owners.includes(username()!)}>
        <Show
          when={!actions.deleting}
          fallback={
            <button class="red">
              <Icon type="trash" />
            </button>
          }
        >
          <ConfirmButton
            onConfirm={() => {
              ws.send(DELETE_BUILD, { buildID: selected.id() });
            }}
            color="red"
          >
            <Icon type="trash" />
          </ConfirmButton>
        </Show>
      </Show>
    </Flex>
  );
};

function getSub(build: Build) {
  if (build.dockerBuildArgs) {
    return "docker build";
  } else if (build.cliBuild) {
    return "cli build";
  } else {
    return "build";
  }
}

export default Header;
