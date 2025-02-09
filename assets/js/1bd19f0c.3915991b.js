"use strict";(self.webpackChunkdocsite=self.webpackChunkdocsite||[]).push([[469],{9723:(e,o,n)=>{n.r(o),n.d(o,{assets:()=>d,contentTitle:()=>a,default:()=>u,frontMatter:()=>s,metadata:()=>r,toc:()=>l});var t=n(4848),i=n(8453),c=n(6695);const s={},a="Advanced Configuration",r={id:"setup/advanced",title:"Advanced Configuration",description:"OIDC / Oauth2",source:"@site/docs/setup/advanced.mdx",sourceDirName:"setup",slug:"/setup/advanced",permalink:"/docs/setup/advanced",draft:!1,unlisted:!1,editUrl:"https://github.com/moghtech/komodo/tree/main/docsite/docs/setup/advanced.mdx",tags:[],version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Sqlite",permalink:"/docs/setup/sqlite"},next:{title:"Connect More Servers",permalink:"/docs/connect-servers"}},d={},l=[{value:"OIDC / Oauth2",id:"oidc--oauth2",level:3},{value:"Mount a config file",id:"mount-a-config-file",level:3}];function h(e){const o={a:"a",admonition:"admonition",code:"code",h1:"h1",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(o.header,{children:(0,t.jsx)(o.h1,{id:"advanced-configuration",children:"Advanced Configuration"})}),"\n",(0,t.jsx)(o.h3,{id:"oidc--oauth2",children:"OIDC / Oauth2"}),"\n",(0,t.jsxs)(o.p,{children:["To enable OAuth2 login, you must create a client on the respective OAuth provider,\nfor example ",(0,t.jsx)(o.a,{href:"https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app",children:"Github"}),"\nor ",(0,t.jsx)(o.a,{href:"https://developers.google.com/identity/protocols/oauth2",children:"Google"}),"."]}),"\n",(0,t.jsxs)(o.p,{children:["Komodo also supports self hosted Oauth2 providers like ",(0,t.jsx)(o.a,{href:"https://docs.goauthentik.io/docs/providers/oauth2/",children:"Authentik"})," or ",(0,t.jsx)(o.a,{href:"https://docs.gitea.com/development/oauth2-provider",children:"Gitea"}),"."]}),"\n",(0,t.jsxs)(o.ul,{children:["\n",(0,t.jsxs)(o.li,{children:["Komodo uses the ",(0,t.jsx)(o.code,{children:"web application"})," login flow."]}),"\n",(0,t.jsxs)(o.li,{children:["The redirect uri is:","\n",(0,t.jsxs)(o.ul,{children:["\n",(0,t.jsxs)(o.li,{children:[(0,t.jsx)(o.code,{children:"<KOMODO_HOST>/auth/github/callback"})," for Github."]}),"\n",(0,t.jsxs)(o.li,{children:[(0,t.jsx)(o.code,{children:"<KOMODO_HOST>/auth/google/callback"})," for Google."]}),"\n",(0,t.jsxs)(o.li,{children:[(0,t.jsx)(o.code,{children:"<KOMODO_HOST>/auth/oidc/callback"})," for OIDC."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(o.h3,{id:"mount-a-config-file",children:"Mount a config file"}),"\n",(0,t.jsxs)(o.p,{children:["If you prefer to keep sensitive information out of environment variables, you can optionally\nwrite a config file on your host, and mount it to ",(0,t.jsx)(o.code,{children:"/config/config.toml"})," in the Komodo core container."]}),"\n",(0,t.jsx)(o.admonition,{type:"info",children:(0,t.jsx)(o.p,{children:"Configuration can still be passed in environment variables, and will take precedent over what is passed in the file."})}),"\n",(0,t.jsxs)(o.p,{children:["Quick download to ",(0,t.jsx)(o.code,{children:"./komodo/core.config.toml"}),":"]}),"\n",(0,t.jsx)(o.pre,{children:(0,t.jsx)(o.code,{className:"language-bash",children:"wget -P komodo https://raw.githubusercontent.com/moghtech/komodo/main/config/core.config.toml\n"})}),"\n","\n",(0,t.jsx)(c.A,{title:"https://github.com/moghtech/komodo/blob/main/config/core.config.toml",url:"https://raw.githubusercontent.com/moghtech/komodo/main/config/core.config.toml",language:"toml"})]})}function u(e={}){const{wrapper:o}={...(0,i.R)(),...e.components};return o?(0,t.jsx)(o,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}},6695:(e,o,n)=>{n.d(o,{A:()=>s});var t=n(6540),i=n(1432),c=n(4848);function s(e){let{url:o,language:n,title:s}=e;const[a,r]=(0,t.useState)("");return(0,t.useEffect)((()=>{!async function(e,o){const n=await fetch(e);o(await n.text())}(o,r)}),[]),(0,c.jsx)(i.A,{title:s??o,language:n,showLineNumbers:!0,children:a})}}}]);