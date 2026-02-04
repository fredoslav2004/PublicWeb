import{j as e}from"./jsx-runtime.BftctW7E.js";import{r as s}from"./index.DJO9vBfz.js";import{h as R}from"./SyntaxHighlighter.DoQuaYxt.js";import{c as n}from"./createLucideIcon.sQoFMTsc.js";import{C as M}from"./check.Di-hddYY.js";/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=n("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=n("Cpu",[["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2",key:"1vbyd7"}],["rect",{x:"9",y:"9",width:"6",height:"6",key:"o3kz5p"}],["path",{d:"M15 2v2",key:"13l42r"}],["path",{d:"M15 20v2",key:"15mkzm"}],["path",{d:"M2 15h2",key:"1gxd5l"}],["path",{d:"M2 9h2",key:"1bbxkp"}],["path",{d:"M20 15h2",key:"19e6y8"}],["path",{d:"M20 9h2",key:"19tzq7"}],["path",{d:"M9 2v2",key:"165o2o"}],["path",{d:"M9 20v2",key:"i2bqo8"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=n("Image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=n("Loader2",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=n("Play",[["polygon",{points:"5 3 19 12 5 21 5 3",key:"191637"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q=n("RotateCcw",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=n("Terminal",[["polyline",{points:"4 17 10 11 4 5",key:"akl6gq"}],["line",{x1:"12",x2:"20",y1:"19",y2:"19",key:"q2wloq"}]]);function H({initialCode:f,code:k,output:O,title:w="Interactive Lab"}){const l=k||f||"",[a,c]=s.useState(l),[v,i]=s.useState([]),[d,x]=s.useState(!1),[p,h]=s.useState(!1),[j,g]=s.useState(!1),[N,b]=s.useState(!1),[y,u]=s.useState(null),m=s.useRef(null);s.useEffect(()=>{c(l)},[l]);const C=async()=>{if(window.pyodideInstance)return m.current=window.pyodideInstance,window.pyodideInstance;h(!0),i(["Initializing Pyodide (Python in Browser)..."]);try{const t=await window.loadPyodide({indexURL:"https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"}),r=[];return a.includes("numpy")&&r.push("numpy"),a.includes("pandas")&&r.push("pandas"),a.includes("matplotlib")&&r.push("matplotlib"),a.includes("sympy")&&r.push("sympy"),a.includes("sklearn")&&r.push("scikit-learn"),a.includes("scipy")&&r.push("scipy"),r.length>0&&(i(o=>[...o,`Loading packages: ${r.join(", ")}...`]),await t.loadPackage(r)),(a.includes("seaborn")||a.includes("load_dataset"))&&(i(o=>[...o,"Installing Seaborn & Network Patches..."]),await t.loadPackage("micropip"),await t.runPythonAsync(`
import micropip
await micropip.install('seaborn')
await micropip.install('pyodide-http')
import pyodide_http
pyodide_http.patch_all()
        `)),window.pyodideInstance=t,m.current=t,h(!1),t}catch(t){throw i(r=>[...r,`Error: ${t}`]),h(!1),t}},z=async()=>{if(!d){x(!0),g(!0),u(null),i(["Running..."]);try{const t=m.current||await C();let r=[];if(t.setStdout({batched:o=>{r.push(o)}}),(a.includes("matplotlib")||a.includes("seaborn"))&&await t.runPythonAsync(`
import matplotlib
import matplotlib.pyplot as plt
import io
import base64
matplotlib.use('Agg')
plt.clf() # Clear previous
        `),await t.runPythonAsync(a),a.includes("matplotlib")||a.includes("seaborn")){const o=await t.runPythonAsync(`
buf = io.BytesIO()
plt.savefig(buf, format='png', bbox_inches='tight')
buf.seek(0)
img_str = base64.b64encode(buf.read()).decode('utf-8')
"data:image/png;base64," + img_str if plt.get_fignums() else ""
        `);o&&u(o)}i([...r,"","Process exited successfully"])}catch(t){i(r=>[...r,"",`Error: ${t.message}`])}finally{x(!1)}}},I=()=>{c(l),i([]),g(!1),u(null)},P=()=>{navigator.clipboard.writeText(a),b(!0),setTimeout(()=>b(!1),2e3)};return e.jsx("div",{className:"code-runner my-12 group",children:e.jsxs("div",{className:"bg-white dark:bg-dark-surface rounded-3xl overflow-hidden border border-light-border dark:border-dark-border shadow-xl transition-all duration-500 group-hover:border-primary/30",children:[e.jsxs("div",{className:"bg-light-bg dark:bg-dark-bg/20 px-8 py-5 border-b border-light-border dark:border-dark-border flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"p-2 bg-primary/10 rounded-xl",children:e.jsx(S,{size:20,className:"text-primary"})}),e.jsxs("div",{className:"flex flex-col justify-center",children:[e.jsx("div",{className:"text-[9px] font-black text-primary uppercase tracking-[0.25em] mb-1.5 leading-tight",children:"Runtime Environment"}),e.jsx("h3",{className:"text-lg font-black text-light-text dark:text-dark-text uppercase tracking-tighter leading-tight",children:w})]})]}),e.jsxs("div",{className:"flex gap-1.5",children:[e.jsxs("button",{onClick:z,disabled:d||p,className:"flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95 disabled:opacity-50",children:[d||p?e.jsx(T,{size:14,className:"animate-spin"}):e.jsx(E,{size:14,fill:"currentColor"}),p?"Initializing...":d?"Running...":"Run"]}),e.jsx("button",{onClick:P,title:"Copy Code",className:"p-2.5 hover:bg-white dark:hover:bg-dark-bg rounded-lg transition-all text-light-muted dark:text-dark-muted hover:text-primary border border-transparent hover:border-light-border dark:hover:border-dark-border",children:N?e.jsx(M,{size:16}):e.jsx(L,{size:16})}),e.jsx("button",{onClick:I,title:"Reset Code",className:"p-2.5 hover:bg-white dark:hover:bg-dark-bg rounded-lg transition-all text-light-muted dark:text-dark-muted hover:text-rose-500 border border-transparent hover:border-light-border dark:hover:border-dark-border",children:e.jsx(q,{size:16})})]})]}),e.jsxs("div",{className:"flex flex-col md:flex-row min-h-[400px]",children:[e.jsx("div",{className:"relative flex-1 border-r border-light-border dark:border-dark-border group/editor bg-[#161b22] overflow-auto",children:e.jsxs("div",{className:"relative min-h-full dark",style:{minWidth:"max-content",width:"100%"},children:[e.jsx("textarea",{value:a,onChange:t=>c(t.target.value),className:"absolute inset-0 w-full h-full pt-[30px] pb-[30px] pr-[30px] pl-[64px] font-mono text-[14.5px] leading-[24px] bg-transparent text-transparent caret-primary resize-none focus:outline-none z-10 selection:bg-primary/30 overflow-hidden whitespace-pre",spellCheck:"false",style:{fontVariantLigatures:"none",caretColor:"var(--primary)"}}),e.jsx("div",{className:"p-[30px] font-mono text-[14.5px] leading-[24px] pointer-events-none hl-default",children:a.split(`
`).map((t,r)=>e.jsxs("div",{className:"flex gap-[20px] group/line min-h-[24px]",children:[e.jsx("span",{className:"text-light-muted dark:text-dark-muted select-none text-right w-[14px] opacity-25 inline-block font-mono text-xs",children:r+1}),e.jsx("span",{dangerouslySetInnerHTML:{__html:R(t)||"&nbsp;"},className:"whitespace-pre"})]},r))})]})}),e.jsxs("div",{className:`flex-1 flex flex-col bg-[#0d0d17] p-8 border-t md:border-t-0 border-light-border dark:border-dark-border transition-all duration-300 ${j?"opacity-100":"opacity-100 md:opacity-0 pointer-events-none"}`,children:[e.jsxs("div",{className:"flex items-center gap-3 mb-6",children:[e.jsx("div",{className:"w-2.5 h-2.5 rounded-full bg-rose-500"}),e.jsx("div",{className:"w-2.5 h-2.5 rounded-full bg-amber-500"}),e.jsx("div",{className:"w-2.5 h-2.5 rounded-full bg-emerald-500"}),e.jsxs("span",{className:"ml-2 text-[10px] font-black text-white/40 uppercase tracking-[0.2em] flex items-center gap-2",children:[e.jsx(A,{size:12}),"Terminal Output"]})]}),e.jsxs("div",{className:"flex-1 font-mono text-sm overflow-auto",children:[v.map((t,r)=>e.jsx("div",{className:`min-h-[20px] mb-1 ${t.startsWith("Error")?"text-rose-400":"text-emerald-400/90"}`,children:t},r)),y&&e.jsxs("div",{className:"mt-6 rounded-2xl overflow-hidden border border-white/10 bg-white/5 p-4 group/plot",children:[e.jsx("div",{className:"flex items-center justify-between mb-4",children:e.jsxs("div",{className:"flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest",children:[e.jsx(_,{size:12}),"Generated Plot"]})}),e.jsx("img",{src:y,alt:"Python Plot",className:"w-full h-auto rounded-lg shadow-2xl transition-transform group-hover:scale-[1.02]"})]})]})]})]})]})})}export{H as default};
