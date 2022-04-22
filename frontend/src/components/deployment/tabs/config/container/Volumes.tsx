import { Component, For, Show } from "solid-js";
import { useTheme } from "../../../../../state/ThemeProvider";
import { combineClasses } from "../../../../../util/helpers";
import Icon from "../../../../util/Icon";
import Input from "../../../../util/Input";
import Flex from "../../../../util/layout/Flex";
import Grid from "../../../../util/layout/Grid";
import { useConfig } from "../Provider";

const Volumes: Component<{}> = (p) => {
  const { deployment, setDeployment, userCanUpdate } = useConfig();
  const onAdd = () => {
    setDeployment("volumes", (volumes: any) => [
      ...volumes,
      { local: "", container: "" },
    ]);
  };
  const onRemove = (index: number) => {
    setDeployment("volumes", (volumes) =>
      volumes!.filter((_, i) => i !== index)
    );
  };
  const { themeClass } = useTheme();
  return (
    <Grid class={combineClasses("config-item shadow", themeClass())}>
      <Flex justifyContent="space-between" alignItems="center">
        <h1>volumes</h1>
        <Flex alignItems="center">
          <Show when={!deployment.volumes || deployment.volumes.length === 0}>
            <div>none</div>
          </Show>
          <Show when={userCanUpdate()}>
            <button class="green" onClick={onAdd}>
              <Icon type="plus" />
            </button>
          </Show>
        </Flex>
      </Flex>
      <For each={deployment.volumes}>
        {({ local, container }, index) => (
          <Flex
            justifyContent={userCanUpdate() ? "space-between" : undefined}
            alignItems="center"
            style={{ "flex-wrap": "wrap" }}
          >
            <Input
              placeholder="system"
              value={local}
              style={{ width: "40%" }}
              onEdit={(value) =>
                setDeployment("volumes", index(), "local", value)
              }
              disabled={!userCanUpdate()}
            />
            {" : "}
            <Input
              placeholder="container"
              value={container}
              style={{ width: "40%" }}
              onEdit={(value) =>
                setDeployment("volumes", index(), "container", value)
              }
              disabled={!userCanUpdate()}
            />
            <Show when={userCanUpdate()}>
              <button class="red" onClick={() => onRemove(index())}>
                <Icon type="minus" />
              </button>
            </Show>
          </Flex>
        )}
      </For>
    </Grid>
  );
};

export default Volumes;
