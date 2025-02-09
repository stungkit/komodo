"use strict";(self.webpackChunkdocsite=self.webpackChunkdocsite||[]).push([[552],{7478:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>i,default:()=>u,frontMatter:()=>r,metadata:()=>l,toc:()=>a});var o=t(4848),s=t(8453);const r={},i="Sync Resources",l={id:"sync-resources",title:"Sync Resources",description:"Komodo is able to create, update, delete, and deploy resources declared in TOML files by diffing them against the existing resources,",source:"@site/docs/sync-resources.md",sourceDirName:".",slug:"/sync-resources",permalink:"/docs/sync-resources",draft:!1,unlisted:!1,editUrl:"https://github.com/moghtech/komodo/tree/main/docsite/docs/sync-resources.md",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Permissioning",permalink:"/docs/permissioning"},next:{title:"Configuring Webhooks",permalink:"/docs/webhooks"}},c={},a=[{value:"Example Declarations",id:"example-declarations",level:2},{value:"Server",id:"server",level:3},{value:"Builder and build",id:"builder-and-build",level:3},{value:"Deployments",id:"deployments",level:3},{value:"Stack",id:"stack",level:3},{value:"Procedure",id:"procedure",level:3},{value:"Repo",id:"repo",level:3},{value:"Resource sync",id:"resource-sync",level:3},{value:"User Group:",id:"user-group",level:3}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.header,{children:(0,o.jsx)(n.h1,{id:"sync-resources",children:"Sync Resources"})}),"\n",(0,o.jsxs)(n.p,{children:["Komodo is able to create, update, delete, and deploy resources declared in TOML files by diffing them against the existing resources,\nand apply updates based on the diffs. Push the files to a remote git repo and create a ",(0,o.jsx)(n.code,{children:"ResourceSync"})," pointing to the repo,\nand the core backend will poll for any updates (you can also manually trigger an update poll / execution in the UI)."]}),"\n",(0,o.jsxs)(n.p,{children:["File detection is additive and recursive, so you can spread out your resource declarations across any number of files\nand use any nesting of folders to organize resources inside a root folder. Additionally, you can create multiple ",(0,o.jsx)(n.code,{children:"ResourceSyncs"}),'\nand each sync will be handled independently. This allows different syncs to manage resources on a "per-project" basis.']}),"\n",(0,o.jsx)(n.p,{children:"The UI will display the computed sync actions and only execute them upon manual confirmation.\nOr the sync execution git webhook may be configured on the git repo to\nautomatically execute syncs upon pushes to the configured branch."}),"\n",(0,o.jsx)(n.h2,{id:"example-declarations",children:"Example Declarations"}),"\n",(0,o.jsx)(n.h3,{id:"server",children:"Server"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://docs.rs/komodo_client/latest/komodo_client/entities/server/struct.ServerConfig.html",children:"Server config schema"})}),"\n"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-toml",children:'[[server]] # Declare a new server\nname = "server-prod"\ndescription = "the prod server"\ntags = ["prod"]\n[server.config]\naddress = "http://localhost:8120"\nregion = "AshburnDc1"\nenabled = true # default: false\n'})}),"\n",(0,o.jsx)(n.h3,{id:"builder-and-build",children:"Builder and build"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://docs.rs/komodo_client/latest/komodo_client/entities/builder/enum.BuilderConfig.html",children:"Builder config schema"})}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://docs.rs/komodo_client/latest/komodo_client/entities/build/struct.BuildConfig.html",children:"Build config schema"})}),"\n"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-toml",children:'[[builder]] # Declare a builder\nname = "builder-01"\ntags = []\nconfig.type = "Aws"\n[builder.config.params]\nregion = "us-east-2"\nami_id = "ami-0e9bd154667944680"\n# These things come from your specific setup\nsubnet_id = "subnet-xxxxxxxxxxxxxxxxxx"\nkey_pair_name = "xxxxxxxx"\nassign_public_ip = true\nuse_public_ip = true\nsecurity_group_ids = [\n  "sg-xxxxxxxxxxxxxxxxxx",\n  "sg-xxxxxxxxxxxxxxxxxx"\n]\n\n##\n\n[[build]]\nname = "test_logger"\ndescription = "Logs randomly at INFO, WARN, ERROR levels to test logging setups"\ntags = ["test"]\n[build.config]\nbuilder_id = "builder-01"\nrepo = "mbecker20/test_logger"\nbranch = "master"\ngit_account = "mbecker20"\nimage_registry.type = "Standard"\nimage_registry.params.domain = "github.com" # or your custom domain\nimage_registry.params.account = "your_username"\nimage_registry.params.organization = "your_organization" # optinoal\n# Set docker labels\nlabels = """\norg.opencontainers.image.source = https://github.com/mbecker20/test_logger\norg.opencontainers.image.description = Logs randomly at INFO, WARN, ERROR levels to test logging setups\norg.opencontainers.image.licenses = GPL-3.0\n"""\n'})}),"\n",(0,o.jsx)(n.h3,{id:"deployments",children:"Deployments"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://docs.rs/komodo_client/latest/komodo_client/entities/deployment/struct.DeploymentConfig.html",children:"Deployment config schema"})}),"\n"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-toml",children:'# Declare variables\n[[variable]]\nname = "OTLP_ENDPOINT"\nvalue = "http://localhost:4317"\n\n##\n\n[[deployment]] # Declare a deployment\nname = "test-logger-01"\ndescription = "test logger deployment 1"\ntags = ["test"]\n# sync will deploy the container: \n#  - if it is not running.\n#  - has relevant config updates.\n#  - the attached build has new version.\ndeploy = true\n[deployment.config]\nserver_id = "server-01"\nimage.type = "Build"\nimage.params.build = "test_logger"\n# set the volumes / bind mounts\nvolumes = """\n# Supports comments\n/data/logs = /etc/logs\n# And other formats (eg yaml list)\n- "/data/config:/etc/config"\n"""\n# Set the environment variables\nenvironment = """\n# Comments supported\nOTLP_ENDPOINT = [[OTLP_ENDPOINT]] # interpolate variables into the envs.\nVARIABLE_1 = value_1\nVARIABLE_2 = value_2\n"""\n# Set Docker labels\nlabels = "deployment.type = logger"\n\n##\n\n[[deployment]]\nname = "test-logger-02"\ndescription = "test logger deployment 2"\ntags = ["test"]\ndeploy = true\n# Create a dependency on test-logger-01. This deployment will only be deployed after test-logger-01 is deployed.\n# Additionally, any sync deploy of test-logger-01 will also trigger sync deploy of this deployment.\nafter = ["test-logger-01"]\n[deployment.config]\nserver_id = "server-01"\nimage.type = "Build"\nimage.params.build = "test_logger"\nvolumes = """\n/data/logs = /etc/logs\n/data/config = /etc/config"""\nenvironment = """\nVARIABLE_1 = value_1\nVARIABLE_2 = value_2\n"""\n# Set Docker labels\nlabels = "deployment.type = logger"\n'})}),"\n",(0,o.jsx)(n.h3,{id:"stack",children:"Stack"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://docs.rs/komodo_client/latest/komodo_client/entities/stack/struct.StackConfig.html",children:"Stack config schema"})}),"\n"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-toml",children:'[[stack]]\nname = "test-stack"\ndescription = "stack test"\ndeploy = true\nafter = ["test-logger-01"] # Stacks can depend on deployments, and vice versa.\ntags = ["test"]\n[stack.config]\nserver_id = "server-prod"\nfile_paths = ["mongo.yaml", "redis.yaml"]\ngit_provider = "git.mogh.tech"\ngit_account = "mbecker20" # clone private repo by specifying account\nrepo = "mbecker20/stack_test"\n'})}),"\n",(0,o.jsx)(n.h3,{id:"procedure",children:"Procedure"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://docs.rs/komodo_client/latest/komodo_client/entities/procedure/struct.ProcedureConfig.html",children:"Procedure config schema"})}),"\n"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-toml",children:'[[procedure]]\nname = "test-procedure"\ndescription = "Do some things in a specific order"\ntags = ["test"]\n\n[[procedure.config.stage]]\nname = "Build stuff"\nexecutions = [\n  { execution.type = "RunBuild", execution.params.build = "test_logger" },\n  # Uses the Batch version, witch matches many builds by pattern\n  # This one matches all builds prefixed with `foo-` (wildcard) and `bar-` (regex).\n  { execution.type = "BatchRunBuild", execution.params.pattern = "foo-* , \\\\^bar-.*$\\\\" },\n  { execution.type = "PullRepo", execution.params.repo = "komodo-periphery" },\n]\n\n[[procedure.config.stage]]\nname = "Deploy test logger 1"\nexecutions = [\n  { execution.type = "Deploy", execution.params.deployment = "test-logger-01" },\n  { execution.type = "Deploy", execution.params.deployment = "test-logger-03", enabled = false },\n]\n\n[[procedure.config.stage]]\nname = "Deploy test logger 2"\nenabled = false\nexecutions = [\n  { execution.type = "Deploy", execution.params.deployment = "test-logger-02" }\n]\n'})}),"\n",(0,o.jsx)(n.h3,{id:"repo",children:"Repo"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://docs.rs/komodo_client/latest/komodo_client/entities/repo/struct.RepoConfig.html",children:"Repo config schema"})}),"\n"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-toml",children:'[[repo]]\nname = "komodo-periphery"\ndescription = "Builds new versions of the periphery binary. Requires Rust installed on the host."\ntags = ["komodo"]\n[repo.config]\nserver_id = "server-01"\ngit_provider = "git.mogh.tech" # use an alternate git provider (default is github.com)\ngit_account = "mbecker20"\nrepo = "moghtech/komodo"\n# Run an action after the repo is pulled\non_pull.path = "."\non_pull.command = """\n# Supports comments\n/root/.cargo/bin/cargo build -p komodo_periphery --release\n# Multiple lines will be combined together using \'&&\'\ncp ./target/release/periphery /root/periphery\n"""\n'})}),"\n",(0,o.jsx)(n.h3,{id:"resource-sync",children:"Resource sync"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://docs.rs/komodo_client/latest/komodo_client/entities/sync/type.ResourceSync.html",children:"Resource sync config schema"})}),"\n"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-toml",children:'[[resource_sync]]\nname = "resource-sync"\n[resource_sync.config]\ngit_provider = "git.mogh.tech" # use an alternate git provider (default is github.com)\ngit_account = "mbecker20"\nrepo = "moghtech/komodo"\nresource_path = ["stacks.toml", "repos.toml"]\n'})}),"\n",(0,o.jsx)(n.h3,{id:"user-group",children:"User Group:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://docs.rs/komodo_client/latest/komodo_client/entities/toml/struct.UserGroupToml.html",children:"UserGroup schema"})}),"\n"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-toml",children:'[[user_group]]\nname = "groupo"\nusers = ["mbecker20", "karamvirsingh98"]\n# Attach base level of Execute on all builds\nall.Build = "Execute"\nall.Alerter = "Write"\npermissions = [\n  # Attach permissions to specific resources by name\n  { target.type = "Repo", target.id = "komodo-periphery", level = "Execute" },\n  # Attach permissions to many resources with name matching regex (this uses \'^(.+)-(.+)$\' as regex expression)\n  { target.type = "Server", target.id = "\\\\^(.+)-(.+)$\\\\", level = "Read" },\n  { target.type = "Deployment", target.id = "\\\\^immich\\\\", level = "Execute" },\n]\n'})})]})}function u(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>i,x:()=>l});var o=t(6540);const s={},r=o.createContext(s);function i(e){const n=o.useContext(r);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),o.createElement(r.Provider,{value:n},e.children)}}}]);