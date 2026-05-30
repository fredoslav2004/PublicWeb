// ==========================================================================
// FAKEFLOW Exam Practice - Interactive Playground Concept Presets & Lessons
// Maps all 10 presentations and tricky exam questions with runnable snippets.
// ==========================================================================

const PLAYGROUND_DATA = {
    lessons: [
        {
            id: "fundamentals",
            title: "01. JS Fundamentals",
            summary: `### Core JS Fundamentals Reference
- **Variable Declarations**: 
  - \`var\`: Function-scoped. Hoisted. Can be re-declared.
  - \`let\`: Block-scoped. Not hoisted (Temporal Dead Zone). Cannot be re-declared in same scope.
  - \`const\`: Block-scoped. Cannot be reassigned (immutable binding).
- **Type Coercion**:
  - *Falsy values*: \`false\`, \`0\`, \`""\` (empty string), \`null\`, \`undefined\`, \`NaN\`.
  - *Addition (+)*: Coerces to string if either side is a string (e.g. \`"" + 1\` is \`"1"\`).
  - *Subtraction (-)*: Coerces strings/booleans to numbers (e.g. \`"3" - 1\` is \`2\`, \`false - 1\` is \`-1\`).
  - *Equality*: \`==\` performs loose equality (coercing types first). \`===\` checks strict equality (value and type).
  - *Null/Undefined loose match*: \`null == undefined\` is \`true\`, but \`null === undefined\` is \`false\`.
- **Hoisting**: Functions are hoisted with their body. \`var\` is hoisted as \`undefined\`. \`let\`/\`const\` are not initialized (TDZ).`,
            code: `// 1. Scope and Shadowing demo
let x = 1;
function demoScope() {
    var x = 2;
    if (true) {
        var x = 3; // var is function-scoped! Mutates the x on line 4
        console.log("Block-scoped var x:", x);
    }
    console.log("Function-scoped var x:", x);
}
demoScope();
console.log("Global let x:", x); // Remains 1

// 2. Type Coercion cases
console.log("\\n--- Type Coercion ---");
console.log('"" + 1      =>', typeof ("" + 1), JSON.stringify("" + 1));
console.log('"3" - 1     =>', typeof ("3" - 1), "3" - 1);
console.log("false - 3   =>", false - 3);
console.log("true - 1    =>", true - 1);
console.log("null == undefined  =>", null == undefined);
console.log("null === undefined =>", null === undefined);`
        },
        {
            id: "functional",
            title: "02. Functional Programming",
            summary: `### Functional Programming Reference
- **Pure Functions**:
  1. *Deterministic*: Same inputs always produce same output.
  2. *No Side Effects*: Does not mutate arguments, external state, read files, call databases, or modify global variables.
- **Array Transformations**:
  - \`map(fn)\`: Returns a *new* array by applying \`fn\` to each element.
  - \`filter(fn)\`: Returns a *new* array containing only elements where \`fn\` returns truthy.
  - \`reduce(fn, initial)\`: Accrues a single value by executing \`fn(accumulator, current)\` over the array.
  - \`forEach(fn)\`: Executes \`fn\` for side effects. Returns \`undefined\`. Does not transform the array.
- **Currying**: Restructuring a function of arity $N$ into $N$ chained functions of arity 1. Uses closures to retain variables.`,
            code: `// 1. Pure vs Impure Functions
const numbers = [1, 2, 3];
let factor = 3;

// Pure: relies only on inputs, doesn't mutate anything
function multiplyPure(arr, mult) {
    return arr.map(n => n * mult);
}

// Impure: mutates external global state
function multiplyImpure(n) {
    factor = n;
    return numbers.map(x => x * factor);
}

console.log("Pure output:", multiplyPure(numbers, 5));
console.log("Impure output:", multiplyImpure(10));
console.log("Factor updated to:", factor);

// 2. Currying Range implementation
console.log("\\n--- Curried Range ---");
function range(start, end) {
    if (end === undefined) {
        return (endVal) => range(start, endVal);
    }
    let result = [];
    for (let i = start; i <= end; i++) result.push(i);
    return result;
}

const fromThree = range(3);
console.log("range(3)(7) =>", fromThree(7)); // [3, 4, 5, 6, 7]`
        },
        {
            id: "oop",
            title: "03. Object-Oriented JS",
            summary: `### Object-Oriented JS Reference
- **this Binding Rules**:
  1. *Method Call*: \`obj.method()\` -> \`this\` points to \`obj\`.
  2. *Plain Call*: \`foo()\` -> \`this\` points to global object (\`window\` or \`undefined\` in strict mode).
  3. *Constructor*: \`new Foo()\` -> \`this\` points to the newly created instance.
  4. *Arrow Function*: Inherits \`this\` lexically from enclosing execution context. Cannot be re-bound.
  5. *Explicit Binding*: \`.bind(ctx)\` (returns bound function), \`.call(ctx, arg1, ...)\` (invokes immediately), \`.apply(ctx, [args])\` (invokes immediately).
- **Object Blueprints**:
  - *Factory Functions*: Regular functions that build and return object instances. Easy closures for private data.
  - *Classes (ES6)*: Syntactic sugar over prototype-based inheritance. Uses \`extends\` and \`constructor\`.
  - *Concatenative Inheritance*: Copying properties from helper/parent objects using spreading (e.g. \`{ ...parent, newProp }\`).`,
            code: `// 1. losing context example
const user = {
    username: "Kasper",
    printName() {
        console.log("Username is:", this.username);
    }
};

console.log("Calling directly as method:");
user.printName(); // Kasper

console.log("\\nAssigning to variable (loses context):");
const unbound = user.printName;
unbound(); // undefined (or error in strict mode)

console.log("\\nUsing explicit bind:");
const bound = user.printName.bind(user);
bound(); // Kasper

// 2. Concatenative Inheritance via Factories
console.log("\\n--- Concatenative Inheritance ---");
function createSpeaker(name) {
    return { speak: () => console.log("Hello, I am " + name) };
}
function createWalker(name) {
    return { walk: () => console.log(name + " is walking.") };
}
function createRobot(name) {
    const speaker = createSpeaker(name);
    const walker = createWalker(name);
    return {
        ...speaker,
        ...walker,
        recharge: () => console.log(name + " is charging...")
    };
}

const rob = createRobot("Robo-9");
rob.speak();
rob.walk();
rob.recharge();`
        },
        {
            id: "async",
            title: "05. Asynchronous JS & Event Loop",
            summary: `### Asynchronous Programming Reference
- **Promises**: Represents a value that will become available in the future. States: \`pending\`, \`fulfilled\` (resolved), \`rejected\`.
  - Fetch requests are asynchronous: \`fetch()\` returns a Promise immediately. It does not pause execution to wait for network!
- **Async/Await**: Syntactic sugar over Promises. \`await\` pauses execution inside async functions until Promise resolves.
- **Event Loop & Task Queues**:
  1. Execute **Call Stack** (synchronous code) to completion.
  2. Execute all **Microtasks** (Promise callbacks, \`queueMicrotask\`) in queue.
  3. Execute one **Macrotask** (setTimeout callbacks, click callbacks, I/O) from queue.
  4. Repeat steps 2 and 3.`,
            code: `// 1. Asynchronous return mistake
function fetchMyData() {
    let data;
    // Promise starts, but does not block synchronous path
    Promise.resolve("MySecretAPIResult").then(result => {
        data = result;
    });
    return data; // runs synchronously, returns undefined!
}
console.log("Fetched Data return value:", fetchMyData()); // undefined

// 2. Event Loop order demonstration
console.log("\\n--- Event Loop Order ---");
console.log("1. Synchronous Main Start");

setTimeout(() => {
    console.log("5. Macrotask (setTimeout 0ms)");
}, 0);

Promise.resolve().then(() => {
    console.log("3. Microtask 1 (Promise.then)");
}).then(() => {
    console.log("4. Microtask 2 (Promise chained)");
});

console.log("2. Synchronous Main End");`
        },
        {
            id: "reactbasics",
            title: "06. React Basics",
            summary: `### React Basics Reference
- **JSX**: Transpiled by Babel to \`React.createElement()\` calls. Can only render expressions in \`{}\`, not statement blocks (e.g. no \`for\` loops directly inside JSX).
- **Props vs State**:
  - \`Props\`: Read-only data passed from parent component down to child. Immutable.
  - \`State\`: Local, mutable data managed by the component itself. Triggers re-render on change.
- **Rendering Lists**: Must use \`map()\` to transform data arrays into JSX nodes. Each node needs a unique \`key\` prop to help React reconcile changes.
- **Unidirectional Data Flow**: Data flows down from parents to children via props. Children communicate upward by invoking callbacks passed down as props.`,
            code: `// Simulated React Component state mechanics
// Demonstrating State Immutability and why reference identity matters

let stateReference = [1, 2, 3];

function mockSetState(newState) {
    if (newState === stateReference) {
        console.log("React Warning: State reference did not change! No re-render will be triggered.");
    } else {
        console.log("React Success: Re-rendering component. New state:", newState);
        stateReference = newState;
    }
}

// 1. Mutant approach (Incorrect)
console.log("Mutating existing array and setting it:");
stateReference.push(4);
mockSetState(stateReference); // Reference stays same!

// 2. Immutable approach (Correct)
console.log("\\nCreating new array reference via spreading (Correct):");
const updatedState = [...stateReference, 5];
mockSetState(updatedState); // Reference changed!`
        },
        {
            id: "reactadvanced",
            title: "07. React Advanced Hooks",
            summary: `### React Hooks Reference
- **Rules of Hooks**:
  1. Only call hooks at the **top level** (never inside loops, conditions, or nested functions).
  2. Only call hooks in **React functional components** or **custom hooks**.
- **Core Hooks**:
  - \`useState\`: Stores state. State updates are batched/asynchronous. Direct rendering calls to \`setState\` cause infinite render loops.
  - \`useEffect(callback, deps)\`: Handles side effects. Runs on mount and on dep updates. Clean-up function returned runs before component unmounts/updates.
    - \`[]\` empty dependencies means the effect runs **only on mount**.
    - No deps array means the effect runs on **every single render**.
  - \`useContext\`: Subscribes to distant React context without prop-drilling.
  - \`useMemo\`: Memoizes expensive computations.
  - \`useRef\`: Persists values between renders without triggering re-render, or references DOM elements directly.`,
            code: `// 1. Asynchronous setState batches
// Let's simulate how React schedules state updates:
let count = 0;
function mockStateUpdate(updater) {
    // React queues state changes and applies them at the end of the event loop tick
    console.log("State queued. Current count in this render tick is still:", count);
}

function handleIncrement() {
    mockStateUpdate(count + 1);
    mockStateUpdate(count + 1);
    // Real value doesn't change until next render cycle!
}
handleIncrement();

// 2. Rendering state setters (Infinite Loop Simulation)
console.log("\\n--- Infinite Render Loop Demonstration ---");
let rendersCount = 0;
function renderComponent() {
    rendersCount++;
    console.log("Rendering component, render count:", rendersCount);
    
    if (rendersCount > 5) {
        console.log("Crash: Maximum update depth exceeded! Interrupted loop.");
        return;
    }
    
    // Simulating setState(count + 1) in render body
    console.log("Invoking state setter inside render...");
    renderComponent(); // Triggers immediate synchronous re-render!
}
renderComponent();`
        },
        {
            id: "testing",
            title: "09. Testing (Jest & RTL)",
            summary: `### Testing Overview Reference
- **Testing Pyramid**:
  - *Unit Testing* (Jest): Tests single functions/classes in isolation. Fast.
  - *Integration Testing* (React Testing Library): Tests interaction between components. Simulated environment (JSDOM, no physical browser).
  - *End-to-End Testing* (Cypress, Playwright): Tests whole flows in actual browsers. Slow.
- **Jest Key Concepts**:
  - Built-in mocking (\`jest.fn()\`, \`jest.mock()\`) to isolate test modules.
  - Support for async code through return values, \`async/await\`, or calling a \`done()\` callback.
  - Generates code coverage reports (statements, branches, functions, lines).
- **React Testing Library (RTL)**:
  - Focuses on testing from user perspective rather than implementation details.
  - Fires events using \`fireEvent\` or \`userEvent\`.
  - Runs in JSDOM (simulated browser DOM), NOT a real web browser.
- **ESLint**: Static analysis tool checking code styling rules and identifying potential bugs before execution.`,
            code: `// 1. Mocking function behavior (Simulation of jest.fn())
function createMockFunction(implementation = () => {}) {
    const mock = (...args) => {
        mock.calls.push(args);
        mock.callCount++;
        return implementation(...args);
    };
    mock.calls = [];
    mock.callCount = 0;
    return mock;
}

const myCallback = createMockFunction((name) => "Hello " + name);

// Run code that uses callback
console.log(myCallback("Joel"));
console.log(myCallback("Alice"));

// Assert on mock calls
console.log("Callback total calls:", myCallback.callCount); // 2
console.log("Arguments in Call 1:", myCallback.calls[0]);   // ["Joel"]
console.log("Arguments in Call 2:", myCallback.calls[1]);   // ["Alice"]`
        },
        {
            id: "express",
            title: "10. Express Server APIs",
            summary: `### Express API Reference
- **Middleware**: Functions that process HTTP requests in a pipeline before hitting the route handler. 
  - Express middleware signature: \`function(req, res, next) {}\`.
  - Crucial: must invoke \`next()\` to pass request forward, or send response via \`res.send()\`/\`res.json()\`. Otherwise, the request will hang indefinitely.
- **Route Parameters vs. Query Parameters**:
  - *Route Parameters*: Path variables defined with colons (e.g. \`/users/:id\` accessed as \`req.params.id\`). Required.
  - *Query Parameters*: Optional parameters appended via query string (e.g. \`/users?search=bob\` accessed as \`req.query.search\`).
- **token Authentication**: Done via JWT (JSON Web Tokens) inside authorization headers. Stateless.`,
            code: `// Simulation of Express Middleware Pipeline
class MockExpressApp {
    constructor() {
        this.middlewares = [];
    }
    use(fn) {
        this.middlewares.push(fn);
    }
    handleRequest(req, res) {
        let index = 0;
        const next = () => {
            if (index < this.middlewares.length) {
                const currentMiddleware = this.middlewares[index++];
                currentMiddleware(req, res, next);
            }
        };
        next();
    }
}

const app = new MockExpressApp();

// Logging Middleware
app.use((req, res, next) => {
    console.log("Middleware 1: Logging", req.method, req.path);
    next(); // pass to next middleware
});

// Authentication Middleware (Fails without token!)
app.use((req, res, next) => {
    console.log("Middleware 2: Authenticating token...");
    if (!req.token) {
        console.log("Middleware 2: Unauthorized! Sending 401 response and STOPPING chain.");
        res.status = 401;
        res.body = { error: "Unauthorized" };
        return; // DOES NOT call next()! Chain breaks here.
    }
    next();
});

// Final Route Handler
app.use((req, res, next) => {
    console.log("Middleware 3: Sending final page content.");
    res.status = 200;
    res.body = { data: "Protected Secret Information!" };
});

const responseObj = { status: 0, body: null };

console.log("--- Executing Request WITHOUT Auth Token ---");
app.handleRequest({ method: "GET", path: "/protected", token: null }, responseObj);

console.log("\\n--- Executing Request WITH Auth Token ---");
app.handleRequest({ method: "GET", path: "/protected", token: "valid-jwt" }, responseObj);`
        },
        {
            id: "typescript",
            title: "11. TypeScript Types",
            summary: `### TypeScript Reference
- **Structural Typing (Duck Typing)**: TypeScript matches types by structure, not nominal declaration. If an object satisfies all required properties of an interface, it is accepted by that interface, even if it has extra properties or doesn't explicitly implement it.
- **Type Guarding**: Narrowing down a union type to a specific type at runtime using:
  - \`typeof x === "string"\`
  - \`x instanceof MyClass\`
  - \`"property" in x\`
- **Interfaces vs. Types**:
  - \`interface\`: Extendable via declaration merging. Best for object shapes.
  - \`type\`: Can represent primitives, unions, intersections, tuples. Cannot be merged.`,
            code: `// TS Structural Typing Simulation
// Even though employee has an extra property 'employeeId',
// it matches the structure of Person, so printPersonInfo accepts it.

const PersonSchema = {
    validate(obj) {
        return typeof obj.name === 'string' && typeof obj.age === 'number';
    }
};

const employee = { name: "Joel", age: 45, employeeId: "E1337" };

function printPersonInfo(person) {
    if (PersonSchema.validate(person)) {
        console.log("Success: Object matches Person structure!");
        console.log(\`Name: \${person.name}, Age: \${person.age}\`);
    } else {
        console.log("Error: Structural check failed!");
    }
}

printPersonInfo(employee);

// Type Guarding simulation
console.log("\\n--- Type Guarding ---");
function printId(id) {
    if (typeof id === "string") {
        console.log("Id is a string, calling .toUpperCase():", id.toUpperCase());
    } else if (typeof id === "number") {
        console.log("Id is a number, calling .toFixed():", id.toFixed(2));
    }
}
printId("my-special-string-id");
printId(1337);`
        },
        {
            id: "wrapup",
            title: "12. Lighthouse & SEO",
            summary: `### Lighthouse Performance Metrics Reference
- **First Contentful Paint (FCP)**: Time taken to render the first text or image asset on screen.
- **Largest Contentful Paint (LCP)**: Time taken to render the main/largest page content (hero image, heading text). Target: Under **2.5 seconds**.
- **Cumulative Layout Shift (CLS)**: Measures visual stability. Triggers when elements move dynamically while rendering. Target: Under **0.1**.
- **Total Blocking Time (TBT)**: Sum of all time periods between FCP and TTI where tasks exceed **50ms**. Measures main-thread blockage.
- **Time to Interactive (TTI)**: Time taken for the page to become fully interactive (responsive to clicks).
- **SEO & Semantic HTML**:
  - Page must contain exactly one \`<h1>\`.
  - Use HTML5 structure tags (\`<header>\`, \`<main>\`, \`<aside>\`, \`<footer>\`) instead of generic \`<div>\`s.
  - Give interactive elements unique \`id\` elements for automated browser testing.`,
            code: `// Simulating Layout Shift causing CLS issues
// Real CLS is computed by browser layout engine, but we can simulate the cause:
console.log("1. User loads page. Text content is rendered.");
console.log("   Display: 'Welcome to our webstore.'");

setTimeout(() => {
    console.log("\\n2. Asynchronous banner image loads after 1.5 seconds.");
    console.log("   Banner appears at the top. The welcome text is pushed down by 200px!");
    console.log("   ⚠️ CLS Issue triggered: Layout shifted dynamically without placeholder space.");
    console.log("   💡 Fix: Add explicit width/height or reservation box for the image.");
}, 1500);`
        }
    ],
    examHacks: [
        {
            id: "hack-shadowing",
            title: "Scope Shadowing (Test Exam Q1)",
            questionRef: "Test Exam Q1",
            concept: "Shows how function-scoped variables (var) bypass block scopes (if statements) but respects functional scopes, causing variable shadowing conflicts.",
            code: `let x = 1; // Global variable (lexical let)

function foo() {
    var x = 2; // Shadows global let x inside foo()

    if (true) {
        var x = 3; // var has function scope! Re-declares and modifies x on line 4
        console.log("Inside block:", x); // 3
    }

    console.log("Outside block inside foo:", x); // 3 (not 2!)
}

foo();
console.log("Global variable:", x); // 1 (remains unchanged)`
        },
        {
            id: "hack-coercion-maybe",
            title: "Type Coercion 'maybe()' (Test Exam Q2)",
            questionRef: "Test Exam Q2",
            concept: "Analyzes boolean check evaluations, string concatenation vs numeric math, and truthy values (non-empty strings and negative numbers are truthy!).",
            code: `function maybe(maybe) {
    if (maybe) {
        maybe += "1";
    }
    if ("maybe") { // non-empty string is TRUTHY!
        maybe += "2";
    }
    if (maybe) { // "2" is TRUTHY!
        maybe += "3";
    }
    if (false - 3) { // evaluates to 0 - 3 = -3. Non-zero number is TRUTHY!
        maybe += 4; // coerces 4 to string "234"
    }
    if (true - 1) { // evaluates to 1 - 1 = 0. 0 is FALSY!
        maybe += 5; // skipped
    }
    return maybe;
}

console.log("Output is:", maybe("")); // "234"`
        },
        {
            id: "hack-closures-baz",
            title: "Closures Independent States (Test Exam Q3)",
            questionRef: "Test Exam Q3 / Exam Q2",
            concept: "Demonstrates that calling a function returns a unique nested closure. Each returned function maintains its own independent variable instance.",
            code: `function foo() {
    let x = 0;
    return () => {
        x++;
        return x;
    };
}

const baz = foo();
const qux = foo(); // qux has a separate 'x' variable!

baz();             // baz's x becomes 1
qux();             // qux's x becomes 1
console.log("qux() output:", qux()); // qux's x becomes 2, returns 2`
        },
        {
            id: "hack-this-bind",
            title: "This Losing Context (Test Exam Q7 / Exam Q13)",
            questionRef: "Test Exam Q7",
            concept: "Binds execution context in JavaScript. Assigning a method to a variable strips the calling object, losing 'this' bindings unless explicitly rebound.",
            code: `const obj = {
    name: "Joel",
    getName: function () {
        return this.name;
    },
};

const one = obj.getName;                 // reference to method only
const two = obj.getName.bind(obj);       // explicitly bound to obj
const three = () => obj.getName();       // arrow wrapper invokes as method

console.log("one() results:  ", one());   // undefined (loses calling object context)
console.log("two() results:  ", two());   // "Joel"
console.log("three() results:", three()); // "Joel"`
        },
        {
            id: "hack-async-fetch",
            title: "Asynchronous Fetch Delay (Test Exam Q9)",
            questionRef: "Test Exam Q9",
            concept: "Illustrates the async fetch trap. Return statements execute synchronously before network Promises resolve, leading to undefined results.",
            code: `function foo() {
    let data;

    // fetch starts background execution
    Promise.resolve({ name: "mockData" })
        .then(result => {
            data = result;
            console.log("1. Promise resolved data is assigned inside callback:", data);
        });

    return data; // 2. Runs synchronously, returns undefined BEFORE callback executes!
}

console.log("3. Main output:", foo());`
        },
        {
            id: "hack-state-rerender",
            title: "Infinite React Update Loop (Test Exam Q11)",
            questionRef: "Test Exam Q11",
            concept: "Calling state setter directly in component body schedules a re-render. Re-render reruns the body, causing another set, looping infinitely.",
            code: `// Simulating how React handles state updates in render body
let state = 1;

function useStateSim(val) {
    return [state, (newVal) => {
        console.log("setState called with value:", newVal);
        state = newVal;
        triggerReRender();
    }];
}

let renderDepth = 0;
function triggerReRender() {
    renderDepth++;
    if (renderDepth > 5) {
        throw new Error("Maximum update depth exceeded. Infinite loop crashed!");
    }
    
    // App Component simulation:
    console.log("--- Render Cycle", renderDepth, "---");
    const [currState, setState] = useStateSim(1);
    
    // BUG: Setter inside body!
    setState(currState + 1);
}

try {
    triggerReRender();
} catch (e) {
    console.error("React Simulator caught crash:", e.message);
}`
        }
    ]
};
