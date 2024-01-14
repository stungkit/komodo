import { useRead, useWrite } from "@lib/hooks";
import { Types } from "@monitor/client";
import { RequiredResourceComponents } from "@types";
import { AlertTriangle, HardDrive, Rocket, Server } from "lucide-react";
import { cn, fmt_date_with_minutes } from "@lib/utils";
import { useState } from "react";
import { NewResource, Section } from "@components/layouts";

import { useServer } from "../server";
import { DeploymentConfig } from "./config";
import {
  RedeployContainer,
  StartOrStopContainer,
  RemoveContainer,
  DeleteDeployment,
  RenameDeployment,
} from "./actions";
import { Input } from "@ui/input";
import { DeploymentLogs } from "./logs";
import { Link } from "react-router-dom";
import { DataTable } from "@ui/data-table";
import { ResourceComponents } from "..";

export const useDeployment = (id?: string) =>
  useRead("ListDeployments", {}, { refetchInterval: 5000 }).data?.find(
    (d) => d.id === id
  );

const deployment_state_color = (state: Types.DockerContainerState) => {
  if (state === Types.DockerContainerState.Running) return "green-500";
  if (state === Types.DockerContainerState.Paused) return "orange-500";
  if (state === Types.DockerContainerState.NotDeployed) return "blue-500";
  return "red-500";
};

const deployment_state_fill_color = (state: Types.DockerContainerState) => {
  return `fill-${deployment_state_color(state)}`;
};

const deployment_state_text_color = (state: Types.DockerContainerState) => {
  return `text-${deployment_state_color(state)}`;
};

const Icon = ({ id }: { id?: string }) => {
  const state = useDeployment(id)?.info.state;

  return (
    <Rocket
      className={cn("w-4", state && deployment_state_fill_color(state))}
    />
  );
};

const Name = ({ id }: { id: string }) => <>{useDeployment(id)?.name}</>;
const Description = ({ id }: { id: string }) => (
  <>{useDeployment(id)?.info.status}</>
);

const Info = ({ id }: { id: string }) => {
  const info = useDeployment(id)?.info;
  const server = useServer(info?.server_id);

  return (
    <>
      <Link
        to={info?.build_id ? `/builds/${info.build_id}` : "."}
        className="flex items-center gap-2"
      >
        <HardDrive className="w-4 h-4" />
        {useDeployment(id)?.info.image || "N/A"}
      </Link>
      <Link to={`/servers/${server?.id}`} className="flex items-center gap-2">
        <Server className="w-4 h-4" />
        {server?.name ?? "N/A"}
      </Link>
    </>
  );
};

export const Deployment: RequiredResourceComponents = {
  Name,
  Description,
  Info,
  Icon,
  Actions: ({ id }) => (
    <div className="flex gap-4">
      <RedeployContainer id={id} />
      <StartOrStopContainer id={id} />
      <RemoveContainer id={id} />
    </div>
  ),
  Page: {
    Logs: ({ id }) => <DeploymentLogs id={id} />,
    Config: ({ id }) => <DeploymentConfig id={id} />,
    Danger: ({ id }) => (
      <Section title="Danger Zone" icon={<AlertTriangle className="w-4 h-4" />}>
        <RenameDeployment id={id} />
        <DeleteDeployment id={id} />
      </Section>
    ),
  },
  New: () => {
    const { mutateAsync } = useWrite("CreateDeployment");
    const [name, setName] = useState("");
    return (
      <NewResource
        type="Deployment"
        onSuccess={() => mutateAsync({ name, config: {} })}
        enabled={!!name}
      >
        <div className="grid md:grid-cols-2">
          Deployment Name
          <Input
            placeholder="deployment-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </NewResource>
    );
  },
  Table: () => {
    const deployments = useRead("ListDeployments", {}).data;
    return (
      <DataTable
        data={deployments ?? []}
        columns={[
          {
            accessorKey: "id",
            header: "Name",
            cell: ({ row }) => {
              const id = row.original.id;
              return (
                <Link
                  to={`/deployments/${id}`}
                  className="flex items-center gap-2"
                >
                  <ResourceComponents.Deployment.Icon id={id} />
                  <ResourceComponents.Deployment.Name id={id} />
                </Link>
              );
            },
          },
          // {
          //   header: "Description",
          //   accessorKey: "description",
          // },
          { header: "Tags", accessorFn: ({ tags }) => tags.join(", ") },
          {
            header: "Server",
            cell: ({ row }) => {
              const id = row.original.info.server_id;
              return (
                <Link to={`/servers/${id}`} className="flex items-center gap-2">
                  <ResourceComponents.Server.Icon id={id} />
                  <ResourceComponents.Server.Name id={id} />
                </Link>
              );
            },
          },
          {
            header: "Build",
            cell: ({ row }) => {
              const id = row.original.info.build_id;
              if (!id) return null;
              return (
                <Link to={`/builds/${id}`} className="flex items-center gap-2">
                  <ResourceComponents.Build.Icon id={id} />
                  <ResourceComponents.Build.Name id={id} />
                </Link>
              );
            },
          },
          {
            accessorKey: "info.image",
            header: "Image",
          },
          {
            header: "Status",
            cell: ({ row }) => {
              const status = row.original.info.status;
              if (!status) return null;
              const state = row.original.info.state;
              const color = deployment_state_text_color(state);
              return <div className={color}>{status}</div>;
            },
          },
          {
            header: "Created",
            accessorFn: ({ created_at }) =>
              fmt_date_with_minutes(new Date(created_at)),
          },
        ]}
      />
    );
  },
};
