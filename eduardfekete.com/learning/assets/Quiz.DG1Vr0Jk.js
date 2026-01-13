import{j as e}from"./jsx-runtime.TBa3i5EZ.js";import{r as i}from"./index.CVf8TyFT.js";import{c as a}from"./createLucideIcon.sRTHHB0j.js";/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=a("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=a("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=a("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);function j({question:o,options:l}){const[s,n]=i.useState(null),[t,c]=i.useState(!1),x=r=>{t||n(r)},d=s&&l.find(r=>r.id===s)?.isCorrect;return e.jsxs("div",{className:"my-12 p-8 bg-[#f1f1f1] border border-slate-200 rounded-lg",children:[e.jsx("h3",{className:"text-2xl font-bold text-slate-800 mb-8",children:o}),e.jsx("div",{className:"flex flex-col gap-3",children:l.map(r=>e.jsxs("button",{onClick:()=>x(r.id),disabled:t,className:`
              w-full p-4 rounded border text-left transition-all flex items-center gap-4
              ${s===r.id?"bg-white border-green-600 ring-1 ring-green-600":"bg-white border-slate-200 hover:bg-slate-50"}
              ${t&&r.isCorrect?"bg-green-100 border-green-600":""}
              ${t&&s===r.id&&!r.isCorrect?"bg-red-100 border-red-600":""}
            `,children:[e.jsx("div",{className:`w-5 h-5 rounded-full border flex items-center justify-center ${s===r.id?"border-green-600 bg-green-600":"border-slate-300 bg-white"}`,children:s===r.id&&e.jsx("div",{className:"w-2 h-2 rounded-full bg-white"})}),e.jsx("span",{className:"font-medium",children:r.text})]},r.id))}),e.jsx("div",{className:"mt-8",children:t?e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsxs("div",{className:`p-4 rounded border ${d?"bg-green-100 border-green-200 text-green-800":"bg-red-100 border-red-200 text-red-800"}`,children:[e.jsxs("div",{className:"flex items-center gap-2 mb-1",children:[d?e.jsx(b,{size:20}):e.jsx(m,{size:20}),e.jsx("span",{className:"font-bold",children:d?"Correct!":"Incorrect"})]}),!d&&e.jsxs("p",{children:["The correct answer was: ",e.jsx("strong",{children:l.find(r=>r.isCorrect)?.text})]})]}),e.jsxs("button",{onClick:()=>{c(!1),n(null)},className:"w-fit flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-800 transition-colors",children:[e.jsx(h,{size:14})," Try Again"]})]}):e.jsx("button",{onClick:()=>c(!0),disabled:!s,className:`
                px-8 py-3 rounded font-bold transition-all
                ${s?"bg-green-600 hover:bg-green-700 text-white":"bg-slate-300 text-slate-500 cursor-not-allowed"}
            `,children:"Submit Answer"})})]})}export{j as default};
