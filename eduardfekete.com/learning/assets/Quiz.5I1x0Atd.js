import{j as e}from"./jsx-runtime.TBa3i5EZ.js";import{r as n}from"./index.CVf8TyFT.js";import{c as s}from"./createLucideIcon.sRTHHB0j.js";/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=s("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=s("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=s("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);function p({question:o,options:c}){const[r,l]=n.useState(null),[a,i]=n.useState(!1),b=t=>{a||l(t)},d=r&&c.find(t=>t.id===r)?.isCorrect;return e.jsxs("div",{className:"my-16 p-8 md:p-12 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-[2.5rem] shadow-xl relative overflow-hidden transition-colors duration-300",children:[e.jsx("div",{className:"absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-50"}),e.jsx("div",{className:"flex items-center gap-3 mb-8",children:e.jsx("div",{className:"px-3 py-1 rounded-full bg-light-accent/5 dark:bg-dark-accent/5 border border-light-border dark:border-dark-border text-[10px] font-black uppercase tracking-widest text-light-muted dark:text-dark-muted",children:"Check Knowledge"})}),e.jsx("h3",{className:"text-3xl font-black text-light-text dark:text-dark-text mb-10 tracking-tight leading-tight",children:o}),e.jsx("div",{className:"flex flex-col gap-4",children:c.map(t=>e.jsxs("button",{onClick:()=>b(t.id),disabled:a,className:`
              w-full p-6 rounded-2xl border-2 text-left transition-all flex items-center gap-5 group
              ${r===t.id?"border-light-accent dark:border-dark-accent bg-light-accent/5 dark:bg-dark-accent/5 shadow-inner":"border-light-border dark:border-dark-border bg-transparent hover:border-light-text dark:hover:border-dark-text"}
              ${a&&t.isCorrect?"!border-primary !bg-primary/5":""}
              ${a&&r===t.id&&!t.isCorrect?"!border-accent !bg-accent/5":""}
            `,children:[e.jsx("div",{className:`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${r===t.id?"border-light-accent dark:border-dark-accent bg-light-accent dark:bg-dark-accent":"border-light-border dark:border-dark-border bg-transparent"}`,children:r===t.id&&e.jsx("div",{className:"w-2 h-2 rounded-full bg-dark-accent dark:bg-light-accent"})}),e.jsx("span",{className:`font-bold transition-colors ${r===t.id?"text-light-text dark:text-dark-text":"text-light-muted dark:text-dark-muted"}`,children:t.text})]},t.id))}),e.jsx("div",{className:"mt-12",children:a?e.jsxs("div",{className:"flex flex-col gap-6",children:[e.jsxs("div",{className:`p-8 rounded-[2rem] border-2 transition-all ${d?"bg-primary/5 border-primary text-primary":"bg-accent/5 border-accent text-accent"}`,children:[e.jsxs("div",{className:"flex items-center gap-3 mb-2",children:[d?e.jsx(x,{size:28,strokeWidth:3}):e.jsx(k,{size:28,strokeWidth:3}),e.jsx("span",{className:"font-black text-2xl uppercase tracking-tighter",children:d?"Correct!":"Not Quite"})]}),!d&&e.jsxs("p",{className:"font-bold opacity-80 italic",children:["The fundamental truth was: ",c.find(t=>t.isCorrect)?.text]}),d&&e.jsx("p",{className:"font-bold opacity-80 italic",children:"You have grasped the concept perfectly."})]}),e.jsxs("button",{onClick:()=>{i(!1),l(null)},className:"w-fit flex items-center gap-2 text-xs font-black text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text transition-all uppercase tracking-widest px-4 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5",children:[e.jsx(h,{size:14})," Reset Question"]})]}):e.jsx("button",{onClick:()=>i(!0),disabled:!r,className:`
                px-12 py-4 rounded-2xl font-black transition-all uppercase tracking-widest text-sm
                ${r?"bg-black dark:bg-white text-white dark:text-black hover:scale-105 active:scale-95 shadow-2xl":"bg-light-border dark:bg-dark-border text-light-muted dark:text-dark-muted cursor-not-allowed"}
            `,children:"Submit Prediction"})})]})}export{p as default};
