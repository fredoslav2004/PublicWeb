import{j as o}from"./jsx-runtime.DDQe9TsW.js";import{r as s}from"./index.eCxJ45ll.js";import{c as d}from"./createLucideIcon.BTtk5iyR.js";/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l=d("Moon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n=d("Sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]);function k(){const[a,r]=s.useState("light");s.useEffect(()=>{const t=window.document.documentElement.classList.contains("dark")?"dark":"light";r(t)},[]);const c=()=>{const e=a==="light"?"dark":"light";r(e);const t=window.document.documentElement;e==="dark"?(t.classList.add("dark"),localStorage.setItem("theme","dark")):(t.classList.remove("dark"),localStorage.setItem("theme","light"))};return o.jsx("button",{onClick:c,className:"p-2.5 rounded-xl bg-light-accent/5 dark:bg-dark-accent/5 text-light-text dark:text-dark-text transition-all hover:scale-110 active:scale-95 border border-light-border dark:border-dark-border shadow-sm","aria-label":"Toggle Theme",children:a==="light"?o.jsx(l,{size:20}):o.jsx(n,{size:20})})}export{k as default};
