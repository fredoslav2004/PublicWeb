import{j as e}from"./jsx-runtime.DDQe9TsW.js";import{r as n}from"./index.eCxJ45ll.js";import{h as M}from"./SyntaxHighlighter.DoQuaYxt.js";import{c as o}from"./createLucideIcon.BTtk5iyR.js";import{C as S}from"./check.DcGQ-sGN.js";/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=o("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=o("Cpu",[["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2",key:"1vbyd7"}],["rect",{x:"9",y:"9",width:"6",height:"6",key:"o3kz5p"}],["path",{d:"M15 2v2",key:"13l42r"}],["path",{d:"M15 20v2",key:"15mkzm"}],["path",{d:"M2 15h2",key:"1gxd5l"}],["path",{d:"M2 9h2",key:"1bbxkp"}],["path",{d:"M20 15h2",key:"19e6y8"}],["path",{d:"M20 9h2",key:"19tzq7"}],["path",{d:"M9 2v2",key:"165o2o"}],["path",{d:"M9 20v2",key:"i2bqo8"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=o("Image",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q=o("Loader2",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=o("Play",[["polygon",{points:"5 3 19 12 5 21 5 3",key:"191637"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=o("RotateCcw",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]);/**
 * @license lucide-react v0.309.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=o("Terminal",[["polyline",{points:"4 17 10 11 4 5",key:"akl6gq"}],["line",{x1:"12",x2:"20",y1:"19",y2:"19",key:"q2wloq"}]]);function U({initialCode:k,code:w,output:v,title:j="Interactive Lab"}){const d=w||k||"",[r,u]=n.useState(d),[N,i]=n.useState([]),[c,b]=n.useState(!1),[h,m]=n.useState(!1),[C,x]=n.useState(!1),[P,y]=n.useState(!1),[f,p]=n.useState(null),g=n.useRef(null);n.useEffect(()=>{u(d)},[d]);const z=async()=>{if(window.pyodideInstance)return g.current=window.pyodideInstance,window.pyodideInstance;m(!0),i(["Initializing Pyodide (Python in Browser)..."]);try{const a=await window.loadPyodide({indexURL:"https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"}),t=[];return r.includes("numpy")&&t.push("numpy"),r.includes("pandas")&&t.push("pandas"),r.includes("matplotlib")&&t.push("matplotlib"),r.includes("sympy")&&t.push("sympy"),r.includes("sklearn")&&t.push("scikit-learn"),r.includes("scipy")&&t.push("scipy"),t.length>0&&(i(s=>[...s,`Loading packages: ${t.join(", ")}...`]),await a.loadPackage(t)),(r.includes("seaborn")||r.includes("load_dataset"))&&(i(s=>[...s,"Installing Seaborn & Network Patches..."]),await a.loadPackage("micropip"),await a.runPythonAsync(`
import micropip
await micropip.install('seaborn')
await micropip.install('pyodide-http')
import pyodide_http
pyodide_http.patch_all()
        `)),window.pyodideInstance=a,g.current=a,m(!1),a}catch(a){throw i(t=>[...t,`Error: ${a}`]),m(!1),a}},I=async()=>{if(c)return;if(r.includes("#include")||r.includes("int main")||r.includes("printf(")||r.includes("iostream")||r.includes("std::")||/^\s*git\s+/m.test(r)||r.includes("Simulation of a workflow")){x(!0),p(null);const s=(v||"Process exited successfully.").replace(/\\n/g,`
`).split(`
`);i([...s,"","Process exited with status 0"]);return}b(!0),x(!0),p(null),i(["Running..."]);try{const t=g.current||await z();let s=[];if(t.setStdout({batched:l=>{s.push(l)}}),(r.includes("matplotlib")||r.includes("seaborn"))&&await t.runPythonAsync(`
import matplotlib
import matplotlib.pyplot as plt
import io
import base64
matplotlib.use('Agg')
plt.clf() # Clear previous
        `),await t.runPythonAsync(r),r.includes("matplotlib")||r.includes("seaborn")){const l=await t.runPythonAsync(`
buf = io.BytesIO()
plt.savefig(buf, format='png', bbox_inches='tight')
buf.seek(0)
img_str = base64.b64encode(buf.read()).decode('utf-8')
"data:image/png;base64," + img_str if plt.get_fignums() else ""
        `);l&&p(l)}i(l=>[...l,...s,"","Process exited successfully"])}catch(t){i(s=>[...s,"",`Error: ${t.message}`])}finally{b(!1)}},L=()=>{u(d),i([]),x(!1),p(null)},R=()=>{navigator.clipboard.writeText(r),y(!0),setTimeout(()=>y(!1),2e3)};return e.jsx("div",{className:"code-runner my-12 group",children:e.jsxs("div",{className:"bg-white dark:bg-dark-surface rounded-3xl overflow-hidden border border-light-border dark:border-dark-border shadow-xl transition-all duration-500 group-hover:border-primary/30",children:[e.jsxs("div",{className:"bg-light-bg dark:bg-dark-bg/20 px-8 py-5 border-b border-light-border dark:border-dark-border flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"p-2 bg-primary/10 rounded-xl",children:e.jsx(T,{size:20,className:"text-primary"})}),e.jsxs("div",{className:"flex flex-col justify-center",children:[e.jsx("div",{className:"text-[9px] font-black text-primary uppercase tracking-[0.25em] mb-1.5 leading-tight",children:"Runtime Environment"}),e.jsx("h3",{className:"text-lg font-black text-light-text dark:text-dark-text uppercase tracking-tighter leading-tight",children:j})]})]}),e.jsxs("div",{className:"flex gap-1.5",children:[e.jsxs("button",{onClick:I,disabled:c||h,className:"flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95 disabled:opacity-50",children:[c||h?e.jsx(q,{size:14,className:"animate-spin"}):e.jsx(A,{size:14,fill:"currentColor"}),h?"Initializing...":c?"Running...":"Run"]}),e.jsx("button",{onClick:R,title:"Copy Code",className:"p-2.5 hover:bg-white dark:hover:bg-dark-bg rounded-lg transition-all text-light-muted dark:text-dark-muted hover:text-primary border border-transparent hover:border-light-border dark:hover:border-dark-border",children:P?e.jsx(S,{size:16}):e.jsx(_,{size:16})}),e.jsx("button",{onClick:L,title:"Reset Code",className:"p-2.5 hover:bg-white dark:hover:bg-dark-bg rounded-lg transition-all text-light-muted dark:text-dark-muted hover:text-rose-500 border border-transparent hover:border-light-border dark:hover:border-dark-border",children:e.jsx($,{size:16})})]})]}),e.jsxs("div",{className:"flex flex-col md:flex-row min-h-[400px]",children:[e.jsx("div",{className:"relative flex-1 border-r border-light-border dark:border-dark-border group/editor bg-white dark:bg-dark-surface/50 overflow-auto",children:e.jsxs("div",{className:"relative min-h-full",style:{minWidth:"max-content",width:"100%"},children:[e.jsx("textarea",{value:r,onChange:a=>u(a.target.value),className:"absolute inset-0 w-full h-full pt-[30px] pb-[30px] pr-[30px] pl-[64px] font-mono text-[14.5px] leading-[24px] bg-transparent text-transparent caret-primary resize-none focus:outline-none z-10 selection:bg-primary/30 overflow-hidden whitespace-pre",spellCheck:"false",style:{fontVariantLigatures:"none",caretColor:"var(--primary)"}}),e.jsx("div",{className:"p-[30px] font-mono text-[14.5px] leading-[24px] pointer-events-none hl-default",children:r.split(`
`).map((a,t)=>e.jsxs("div",{className:"flex gap-[20px] group/line min-h-[24px]",children:[e.jsx("span",{className:"text-light-muted dark:text-dark-muted select-none text-right w-[14px] opacity-25 inline-block font-mono text-xs",children:t+1}),e.jsx("span",{dangerouslySetInnerHTML:{__html:M(a)||"&nbsp;"},className:"whitespace-pre"})]},t))})]})}),e.jsxs("div",{className:`flex-1 flex flex-col bg-light-surface dark:bg-[#0d0d17] p-8 border-t md:border-t-0 border-light-border dark:border-dark-border transition-all duration-300 ${C?"opacity-100":"opacity-100 md:opacity-0 pointer-events-none"}`,children:[e.jsxs("div",{className:"flex items-center gap-3 mb-6",children:[e.jsx("div",{className:"w-2.5 h-2.5 rounded-full bg-rose-500"}),e.jsx("div",{className:"w-2.5 h-2.5 rounded-full bg-amber-500"}),e.jsx("div",{className:"w-2.5 h-2.5 rounded-full bg-emerald-500"}),e.jsxs("span",{className:"ml-2 text-[10px] font-black text-light-text/40 dark:text-white/40 uppercase tracking-[0.2em] flex items-center gap-2",children:[e.jsx(O,{size:12}),"Terminal Output"]})]}),e.jsxs("div",{className:"flex-1 font-mono text-sm overflow-auto",children:[N.map((a,t)=>e.jsx("div",{className:`min-h-[20px] mb-1 whitespace-pre-wrap ${a.startsWith("Error")?"text-rose-600 dark:text-rose-400":"text-emerald-600 dark:text-emerald-400/90"}`,children:a},t)),f&&e.jsxs("div",{className:"mt-6 rounded-2xl overflow-hidden border border-white/10 bg-white/5 p-4 group/plot",children:[e.jsx("div",{className:"flex items-center justify-between mb-4",children:e.jsxs("div",{className:"flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest",children:[e.jsx(E,{size:12}),"Generated Plot"]})}),e.jsx("img",{src:f,alt:"Python Plot",className:"w-full h-auto rounded-lg shadow-2xl transition-transform group-hover:scale-[1.02]"})]})]})]})]})]})})}export{U as default};
