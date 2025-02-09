"use strict";(self.webpackChunkdocsite=self.webpackChunkdocsite||[]).push([[580],{8e3:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>i,default:()=>h,frontMatter:()=>t,metadata:()=>a,toc:()=>c});var o=s(4848),r=s(8453);const t={},i="Variables and Secrets",a={id:"variables",title:"Variables and Secrets",description:"A variable / secret in Komodo is just a key-value pair.",source:"@site/docs/variables.md",sourceDirName:".",slug:"/variables",permalink:"/docs/variables",draft:!1,unlisted:!1,editUrl:"https://github.com/moghtech/komodo/tree/main/docsite/docs/variables.md",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Docker Compose",permalink:"/docs/docker-compose"},next:{title:"Procedures and Actions",permalink:"/docs/procedures"}},l={},c=[{value:"Defining Variables and Secrets",id:"defining-variables-and-secrets",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.header,{children:(0,o.jsx)(n.h1,{id:"variables-and-secrets",children:"Variables and Secrets"})}),"\n",(0,o.jsx)(n.p,{children:"A variable / secret in Komodo is just a key-value pair."}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:'KEY_1 = "value_1"\n'})}),"\n",(0,o.jsxs)(n.p,{children:["You can interpolate the value into any Environment (and most other user configurable inputs, such as Repo ",(0,o.jsx)(n.code,{children:"On Clone"})," and ",(0,o.jsx)(n.code,{children:"On Pull"}),", or Stack ",(0,o.jsx)(n.code,{children:"Extra Args"}),") using double brackets around the key to trigger interpolation:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-toml",children:"# Before interpolation\nSOME_ENV_VAR = [[KEY_1]] # <- wrap the key in double brackets '[[]]'\n\n# After iterpolation:\nSOME_ENV_VAR = value_1\n"})}),"\n",(0,o.jsx)(n.h2,{id:"defining-variables-and-secrets",children:"Defining Variables and Secrets"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"In the UI"}),", you can go to ",(0,o.jsx)(n.code,{children:"Settings"})," page, ",(0,o.jsx)(n.code,{children:"Variables"})," tab. Here, you can create some Variables to store in the Komodo database."]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:['There is a "secret" option you can check, this will ',(0,o.jsx)(n.strong,{children:"prevent the value from exposure in any updates / logs"}),", as well as prevent access to the value to any ",(0,o.jsx)(n.strong,{children:"non-admin"})," Komodo users."]}),"\n",(0,o.jsxs)(n.li,{children:["Variables can also be managed in ResourceSyncs (see ",(0,o.jsx)(n.a,{href:"/docs/sync-resources#deployments",children:"example"}),") but should only be done for non-secret variables, to avoid committing sensitive data. You should manage secrets using one of the following options."]}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Mount a config file to Core"}),": ",(0,o.jsx)(n.a,{href:"https://komo.do/docs/setup/advanced#mount-a-config-file",children:"https://komo.do/docs/setup/advanced#mount-a-config-file"})]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["In the Komodo Core config file, you can configure ",(0,o.jsx)(n.code,{children:"secrets"})," using a block like:","\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-toml",children:'# in core.config.toml\n[secrets]\nKEY_1 = "value_1"\nKEY_2 = "value_2"\n'})}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"KEY_1"})," and ",(0,o.jsx)(n.code,{children:"KEY_2"})," will be available for interpolation on all your resources, as if they were Variables set up in the UI."]}),"\n",(0,o.jsxs)(n.li,{children:["They keys are queryable and show up on the variable page (so you know they are available for use),\nbut ",(0,o.jsx)(n.strong,{children:"the values are not exposed by API for ANY user"}),"."]}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Mount a config file to Periphery agent"}),":"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["In the Komodo Periphery config file, you can also configure ",(0,o.jsx)(n.code,{children:"secrets"})," using the same syntax as the Core config file."]}),"\n",(0,o.jsxs)(n.li,{children:["The variable ",(0,o.jsx)(n.strong,{children:"WILL NOT be available globally to all Komodo resources"}),", it will only be available to the resources on the associated Server resource on which that single Periphery agent is running."]}),"\n",(0,o.jsx)(n.li,{children:"This effectively distributes your secret locations, can be good or bad depending on your security requirements. It does avoid the need to send the secret over network from Core to Periphery, Periphery based secrets are never exposed to the network."}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"Use a dedicated secret management tool"})," such as Hashicorp Vault, alongside Komodo"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["Ultimately Komodo variable / secret features ",(0,o.jsx)(n.strong,{children:"may not fill enterprise level secret management requirements"}),", organizations of this level should use still a dedicated secret management solution. At this point Komodo is not intended as an enterprise level secret management solution."]}),"\n",(0,o.jsxs)(n.li,{children:["These solutions do require application level integrations, your applications should only receive credentials to access the secret management API. ",(0,o.jsx)(n.strong,{children:"Your applications will pull the actual secret values from the dedicated secret management tool, they stay out of Komodo entirely"}),"."]}),"\n"]}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>i,x:()=>a});var o=s(6540);const r={},t=o.createContext(r);function i(e){const n=o.useContext(t);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),o.createElement(t.Provider,{value:n},e.children)}}}]);