import { AUTH_TOKEN_STORAGE_KEY, KOMODO_BASE_URL } from "@main";
import { KomodoClient, Types } from "komodo_client";
import {
  AuthResponses,
  ExecuteResponses,
  ReadResponses,
  UserResponses,
  WriteResponses,
} from "komodo_client/dist/responses";
import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { UsableResource } from "@types";
import { useToast } from "@ui/use-toast";
import { atom, useAtom } from "jotai";
import { atomFamily } from "jotai/utils";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RESOURCE_TARGETS } from "./utils";

// ============== RESOLVER ==============

const token = () => ({
  jwt: localStorage.getItem(AUTH_TOKEN_STORAGE_KEY) ?? "",
});
export const komodo_client = () =>
  KomodoClient(KOMODO_BASE_URL, { type: "jwt", params: token() });

export const useLoginOptions = () =>
  useQuery({
    queryKey: ["GetLoginOptions"],
    queryFn: () => komodo_client().auth("GetLoginOptions", {}),
  });

export const useUser = () => {
  const userInvalidate = useUserInvalidate();
  const query = useQuery({
    queryKey: ["GetUser"],
    queryFn: () => komodo_client().auth("GetUser", {}),
    refetchInterval: 30_000,
  });
  useEffect(() => {
    if (query.data && query.error) {
      userInvalidate();
    }
  }, [query.data, query.error]);
  return query;
};

export const useUserInvalidate = () => {
  const qc = useQueryClient();
  return () => {
    qc.invalidateQueries({ queryKey: ["GetUser"] });
  };
};

export const useRead = <
  T extends Types.ReadRequest["type"],
  R extends Extract<Types.ReadRequest, { type: T }>,
  P extends R["params"],
  C extends Omit<
    UseQueryOptions<
      ReadResponses[R["type"]],
      unknown,
      ReadResponses[R["type"]],
      (T | P)[]
    >,
    "queryFn" | "queryKey"
  >,
>(
  type: T,
  params: P,
  config?: C
) =>
  useQuery({
    queryKey: [type, params],
    queryFn: () => komodo_client().read<T, R>(type, params),
    ...config,
  });

export const useInvalidate = () => {
  const qc = useQueryClient();
  return <
    Type extends Types.ReadRequest["type"],
    Params extends Extract<Types.ReadRequest, { type: Type }>["params"],
  >(
    ...keys: Array<[Type] | [Type, Params]>
  ) => keys.forEach((key) => qc.invalidateQueries({ queryKey: key }));
};

export const useManageUser = <
  T extends Types.UserRequest["type"],
  R extends Extract<Types.UserRequest, { type: T }>,
  P extends R["params"],
  C extends Omit<
    UseMutationOptions<UserResponses[T], unknown, P, unknown>,
    "mutationKey" | "mutationFn"
  >,
>(
  type: T,
  config?: C
) => {
  const { toast } = useToast();
  return useMutation({
    mutationKey: [type],
    mutationFn: (params: P) => komodo_client().user<T, R>(type, params),
    onError: (e: { result: { error?: string } }, v, c) => {
      console.log("Auth error:", e);
      const msg = e.result.error ?? "Unknown error. See console.";
      let msg_log = msg ? msg + " | " : "";
      if (msg_log) {
        msg_log = msg_log[0].toUpperCase() + msg_log.slice(1);
      }
      toast({
        title: `Request ${type} Failed`,
        description: `${msg_log}See console for details`,
        variant: "destructive",
      });
      config?.onError && config.onError(e, v, c);
    },
    ...config,
  });
};

export const useWrite = <
  T extends Types.WriteRequest["type"],
  R extends Extract<Types.WriteRequest, { type: T }>,
  P extends R["params"],
  C extends Omit<
    UseMutationOptions<WriteResponses[R["type"]], unknown, P, unknown>,
    "mutationKey" | "mutationFn"
  >,
>(
  type: T,
  config?: C
) => {
  const { toast } = useToast();
  return useMutation({
    mutationKey: [type],
    mutationFn: (params: P) => komodo_client().write<T, R>(type, params),
    onError: (e: { result: { error?: string } }, v, c) => {
      console.log("Write error:", e);
      const msg = e.result.error ?? "Unknown error. See console.";
      let msg_log = msg ? msg + " - " : "";
      if (msg_log) {
        msg_log = msg_log[0].toUpperCase() + msg_log.slice(1);
      }
      toast({
        title: `Write request ${type} failed`,
        description: `${msg_log}See console for details`,
        variant: "destructive",
      });
      config?.onError && config.onError(e, v, c);
    },
    ...config,
  });
};

export const useExecute = <
  T extends Types.ExecuteRequest["type"],
  R extends Extract<Types.ExecuteRequest, { type: T }>,
  P extends R["params"],
  C extends Omit<
    UseMutationOptions<ExecuteResponses[T], unknown, P, unknown>,
    "mutationKey" | "mutationFn"
  >,
>(
  type: T,
  config?: C
) => {
  const { toast } = useToast();
  return useMutation({
    mutationKey: [type],
    mutationFn: (params: P) => komodo_client().execute<T, R>(type, params),
    onError: (e: { result: { error?: string } }, v, c) => {
      console.log("Execute error:", e);
      const msg = e.result.error ?? "Unknown error. See console.";
      let msg_log = msg ? msg + " | " : "";
      if (msg_log) {
        msg_log = msg_log[0].toUpperCase() + msg_log.slice(1);
      }
      toast({
        title: `Execute request ${type} failed`,
        description: `${msg_log}See console for details`,
        variant: "destructive",
      });
      config?.onError && config.onError(e, v, c);
    },
    ...config,
  });
};

export const useAuth = <
  T extends Types.AuthRequest["type"],
  R extends Extract<Types.AuthRequest, { type: T }>,
  P extends R["params"],
  C extends Omit<
    UseMutationOptions<AuthResponses[T], unknown, P, unknown>,
    "mutationKey" | "mutationFn"
  >,
>(
  type: T,
  config?: C
) => {
  const { toast } = useToast();
  return useMutation({
    mutationKey: [type],
    mutationFn: (params: P) => komodo_client().auth<T, R>(type, params),
    onError: (e: { result: { error?: string } }, v, c) => {
      console.log("Auth error:", e);
      const msg = e.result.error ?? "Unknown error. See console.";
      let msg_log = msg ? msg + " | " : "";
      if (msg_log) {
        msg_log = msg_log[0].toUpperCase() + msg_log.slice(1);
      }
      toast({
        title: `Auth request ${type} failed`,
        description: `${msg_log}See console for details`,
        variant: "destructive",
      });
      config?.onError && config.onError(e, v, c);
    },
    ...config,
  });
};

// ============== UTILITY ==============

export const useResourceParamType = () => {
  const type = useParams().type;
  if (!type) return undefined;
  if (type === "server-templates") return "ServerTemplate";
  if (type === "resource-syncs") return "ResourceSync";
  return (type[0].toUpperCase() + type.slice(1, -1)) as UsableResource;
};

type ResourceMap = {
  [Resource in UsableResource]: Types.ResourceListItem<unknown>[] | undefined;
};

export const useAllResources = (): ResourceMap => {
  return {
    Server: useRead("ListServers", {}).data,
    Stack: useRead("ListStacks", {}).data,
    Deployment: useRead("ListDeployments", {}).data,
    Build: useRead("ListBuilds", {}).data,
    Repo: useRead("ListRepos", {}).data,
    Procedure: useRead("ListProcedures", {}).data,
    Action: useRead("ListActions", {}).data,
    Builder: useRead("ListBuilders", {}).data,
    Alerter: useRead("ListAlerters", {}).data,
    ServerTemplate: useRead("ListServerTemplates", {}).data,
    ResourceSync: useRead("ListResourceSyncs", {}).data,
  };
};

// Returns true if Komodo has no resources.
export const useNoResources = () => {
  const resources = useAllResources();
  for (const target of RESOURCE_TARGETS) {
    if (resources[target] && resources[target].length) {
      return false;
    }
  }
  return true;
};

/** returns function that takes a resource target and checks if it exists */
export const useCheckResourceExists = () => {
  const resources = useAllResources();
  return (target: Types.ResourceTarget) => {
    return (
      resources[target.type as UsableResource]?.some(
        (resource) => resource.id === target.id
      ) || false
    );
  };
};

export const useFilterResources = <Info>(
  resources?: Types.ResourceListItem<Info>[],
  search?: string
) => {
  const tags = useTagsFilter();
  const searchSplit = search?.toLowerCase()?.split(" ") || [];
  return (
    resources?.filter(
      (resource) =>
        tags.every((tag: string) => resource.tags.includes(tag)) &&
        (searchSplit.length > 0
          ? searchSplit.every((search) =>
              resource.name.toLowerCase().includes(search)
            )
          : true)
    ) ?? []
  );
};

export const usePushRecentlyViewed = ({ type, id }: Types.ResourceTarget) => {
  const userInvalidate = useUserInvalidate();

  const push = useManageUser("PushRecentlyViewed", {
    onSuccess: userInvalidate,
  }).mutate;

  const exists = useRead(`List${type as UsableResource}s`, {}).data?.find(
    (r) => r.id === id
  )
    ? true
    : false;

  useEffect(() => {
    exists && push({ resource: { type, id } });
  }, [exists, push]);

  return () => push({ resource: { type, id } });
};

export const useSetTitle = (more?: string) => {
  const info = useRead("GetCoreInfo", {}).data;
  const title = more ? `${more} | ${info?.title}` : info?.title;
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);
};

export const atomWithStorage = <T>(key: string, init: T) => {
  const stored = localStorage.getItem(key);
  const inner = atom(stored ? JSON.parse(stored) : init);

  return atom(
    (get) => get(inner),
    (_, set, newValue) => {
      set(inner, newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  );
};

export const tagsAtom = atomWithStorage<string[]>("tags-v0", []);

export const useTagsFilter = () => {
  const [tags] = useAtom<string[]>(tagsAtom);
  return tags;
};

export type LocalStorageSetter<T> = (state: T) => T;

export const useLocalStorage = <T>(
  key: string,
  init: T
): [T, (state: T | LocalStorageSetter<T>) => void] => {
  const stored = localStorage.getItem(key);
  const parsed = stored ? (JSON.parse(stored) as T) : undefined;
  const [state, inner_set] = useState<T>(parsed ?? init);
  const set = (state: T | LocalStorageSetter<T>) => {
    inner_set((prev_state) => {
      const new_val =
        typeof state === "function"
          ? (state as LocalStorageSetter<T>)(prev_state)
          : state;
      localStorage.setItem(key, JSON.stringify(new_val));
      return new_val;
    });
  };
  return [state, set];
};

export const useKeyListener = (listenKey: string, onPress: () => void) => {
  useEffect(() => {
    const keydown = (e: KeyboardEvent) => {
      // This will ignore Shift + listenKey if it is sent from input / textarea
      const target = e.target as any;
      if (target.matches("input") || target.matches("textarea")) return;

      if (e.key === listenKey) {
        e.preventDefault();
        onPress();
      }
    };
    document.addEventListener("keydown", keydown);
    return () => document.removeEventListener("keydown", keydown);
  });
};

export const useShiftKeyListener = (listenKey: string, onPress: () => void) => {
  useEffect(() => {
    const keydown = (e: KeyboardEvent) => {
      // This will ignore Shift + listenKey if it is sent from input / textarea
      const target = e.target as any;
      if (target.matches("input") || target.matches("textarea")) return;

      if (e.shiftKey && e.key === listenKey) {
        e.preventDefault();
        onPress();
      }
    };
    document.addEventListener("keydown", keydown);
    return () => document.removeEventListener("keydown", keydown);
  });
};

/** Listens for ctrl (or CMD on mac) + the listenKey */
export const useCtrlKeyListener = (listenKey: string, onPress: () => void) => {
  useEffect(() => {
    const keydown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === listenKey) {
        e.preventDefault();
        onPress();
      }
    };
    document.addEventListener("keydown", keydown);
    return () => document.removeEventListener("keydown", keydown);
  });
};

export type WebhookIntegration = "Github" | "Gitlab";
export type WebhookIntegrations = {
  [key: string]: WebhookIntegration;
};

const WEBHOOK_INTEGRATIONS_ATOM = atomWithStorage<WebhookIntegrations>(
  "webhook-integrations-v2",
  {}
);

export const useWebhookIntegrations = () => {
  const [integrations, setIntegrations] = useAtom<WebhookIntegrations>(
    WEBHOOK_INTEGRATIONS_ATOM
  );
  return {
    integrations,
    setIntegration: (provider: string, integration: WebhookIntegration) =>
      setIntegrations({
        ...integrations,
        [provider]: integration,
      }),
  };
};

export const getWebhookIntegration = (
  integrations: WebhookIntegrations,
  git_provider: string
) => {
  return integrations[git_provider]
    ? integrations[git_provider]
    : git_provider.includes("gitlab")
      ? "Gitlab"
      : "Github";
};

export type WebhookIdOrName = "Id" | "Name";

const WEBHOOK_ID_OR_NAME_ATOM = atomWithStorage<WebhookIdOrName>(
  "webhook-id-or-name-v1",
  "Id"
);

export const useWebhookIdOrName = () => {
  return useAtom<WebhookIdOrName>(WEBHOOK_ID_OR_NAME_ATOM);
};

export type Dimensions = { width: number; height: number };
export const useWindowDimensions = () => {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    const callback = () => {
      setDimensions({
        width: window.screen.availWidth,
        height: window.screen.availHeight,
      });
    };
    callback();
    window.addEventListener("resize", callback);
    return () => {
      window.removeEventListener("resize", callback);
    };
  }, []);
  return dimensions;
};

const selected_resources = atomFamily((_: UsableResource) =>
  atom<string[]>([])
);
export const useSelectedResources = (type: UsableResource) =>
  useAtom(selected_resources(type));
