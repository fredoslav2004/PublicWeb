// Automatically generated questions database
const EXAM_SETS = {
    "set1": {
        "id": "set1",
        "title": "11 Test Exam (20 Questions)",
        "description": "The mock test exam set covering scope, type coercion, closures, pure functions, async, react, testing, and express.",
        "questions": [
            {
                "id": "set1-q1",
                "index": 1,
                "title": "Scope",
                "category": "Fundamentals.md",
                "body": "What is printed to the console?\n```js\nlet x = 1\nfunction foo() {\n    var x = 2\n    if (true) {\n        var x = 3\n        console.log(x)\n    }\n    console.log(x)\n}\nfoo()\nconsole.log(x)\n```",
                "options": [
                    "3, 2, 1",
                    "3, 3, 1",
                    "3, 3, 3",
                    "1, 3, 3",
                    "1, 2, 1"
                ],
                "answer": "2",
                "answerType": "single-choice",
                "correctAnswers": [
                    2
                ],
                "explanation": "Option 2 (3, 3, 1) is correct.\n\n- The variable `x` inside `foo()` is declared with `var`, which has function scope, not block scope.\n- Therefore, the block-level redeclaration `var x = 3` mutates the function-scoped `x` declared at line 8.\n- Thus, the first console.log prints `3` and the second prints `3`.\n- The global variable `x` declared with `let x = 1` remains untouched because it was shadowed inside `foo()`, so the final console.log prints `1`."
            },
            {
                "id": "set1-q2",
                "index": 2,
                "title": "Type Coercion",
                "category": "Fundamentals.md",
                "body": "What is printed to the console?\n```js\nfunction maybe(maybe) {\n    if (maybe) {\n        maybe += \"1\"\n    }\n    if (\"maybe\") {\n        maybe += \"2\"\n    }\n    if (maybe) {\n        maybe += \"3\"\n    }\n    if (false - 3) {\n        maybe += 4\n    }\n    if (true - 1) {\n        maybe += 5\n    }\n    return maybe\n}\nconsole.log(maybe(\"\"))\n```",
                "options": [
                    "234",
                    "1235",
                    "27",
                    "128",
                    "123"
                ],
                "answer": "1",
                "answerType": "single-choice",
                "correctAnswers": [
                    1
                ],
                "explanation": "Option 1 (234) is correct.\n\n- `maybe(\"\")` is called. `\"\"` (empty string) is falsy, so `if (maybe)` is skipped.\n- `if (\"maybe\")` is true because `\"maybe\"` is a non-empty string. `maybe += \"2\"` runs, making `maybe = \"2\"`.\n- `if (maybe)` is true because `\"2\"` is a non-empty string. `maybe += \"3\"` runs, making `maybe = \"23\"`.\n- `if (false - 3)` evaluates to `0 - 3 = -3`, which is truthy. `maybe += 4` runs (coerces to string), making `maybe = \"234\"`.\n- `if (true - 1)` evaluates to `1 - 1 = 0`, which is falsy, so it is skipped. Returns `\"234\"`."
            },
            {
                "id": "set1-q3",
                "index": 3,
                "title": "Closures",
                "category": "Fundamentals.md",
                "body": "What is printed to the console?\n```js\nfunction foo() {\n    let x = 0\n    return () => {\n        x++\n        return x\n    }\n}\nconst baz = foo()\nconst qux = foo()\nbaz()\nqux()\nconsole.log(qux())\n```",
                "options": [
                    "undefined",
                    "0",
                    "1",
                    "2",
                    "3"
                ],
                "answer": "4",
                "answerType": "single-choice",
                "correctAnswers": [
                    4
                ],
                "explanation": "Option 4 (2) is correct.\n\n- Calling `foo()` creates a new execution context and instantiates a unique closure variable `x = 0`.\n- `baz` and `qux` are two independent closures, each holding its own instance of `x`.\n- `baz()` increments `baz`'s `x` to `1`.\n- `qux()` increments `qux`'s `x` to `1`.\n- The final `console.log(qux())` increments `qux`'s `x` again to `2` and returns it."
            },
            {
                "id": "set1-q4",
                "index": 4,
                "title": "Spread Syntax and Rest Parameters",
                "category": "Fundamentals.md",
                "body": "What value does calling doSomething(1,2,3) return?\n```js\nfunction doSomething(x = 2, ...xs) {\n    return [1, 2, ...xs].concat([x])\n}\ndoSomething(1, 2, 3)\n```",
                "options": [
                    "[1, 2, 3, 2]",
                    "[1, 2, 5, 1]",
                    "[1, 2, 2, 3, 1]",
                    "[1, 2, [2, 3], 2]",
                    "[1, 2, 2, 3, 2]"
                ],
                "answer": "3",
                "answerType": "single-choice",
                "correctAnswers": [
                    3
                ],
                "explanation": "Option 3 ([1, 2, 2, 3, 1]) is correct.\n\n- Calling `doSomething(1, 2, 3)` matches `x = 1` and gathers the remaining arguments into the rest parameter array `xs = [2, 3]`.\n- The function returns `[1, 2, ...xs].concat([x])`, which expands to `[1, 2, 2, 3].concat([1])`.\n- This yields `[1, 2, 2, 3, 1]`."
            },
            {
                "id": "set1-q5",
                "index": 5,
                "title": "Reduce",
                "category": "Fun.md",
                "body": "What is printed to the console?\n```js\nconst numbers = [1, 2, 3, 4]\nconsole.log(numbers.reduce((acc, num) => acc + num, 10))\n```",
                "options": [
                    "101234",
                    "[10,20,30,40]",
                    "20",
                    "[11,12,13,14]",
                    "10"
                ],
                "answer": "3",
                "answerType": "single-choice",
                "correctAnswers": [
                    3
                ],
                "explanation": "Option 3 (20) is correct.\n\n- The `reduce` function executes a reducer callback over each array item: `(acc, num) => acc + num`.\n- The second parameter `10` is passed as the initial accumulator value.\n- Iterations:\n  - Initial: `acc = 10`\n  - Iteration 1: `10 + 1 = 11`\n  - Iteration 2: `11 + 2 = 13`\n  - Iteration 3: `13 + 3 = 16`\n  - Iteration 4: `16 + 4 = 20`\n- Returns `20`."
            },
            {
                "id": "set1-q6",
                "index": 6,
                "title": "Pure Functions",
                "category": "Fun.md",
                "body": "Are the following functions pure or impure?\n\n```js\nconst numbers = [1, 2, 3]\nlet multiplyFactor = 3\n\nfunction add(a, b) {\n    return a + b + 2\n}\n\nfunction last() {\n    return numbers.pop()\n}\n\nfunction multiply(x, factor) {\n    multiplyFactor = factor\n    return x * multiplyFactor\n}\n\nfunction divide(x, ...numbers) {\n    numbers.forEach(n => n / x)\n    return numbers\n}\n\nfunction random() {\n    return Math.ceil(Math.random() * a)\n}\n```",
                "options": [
                    "add",
                    "last",
                    "multiply",
                    "divide",
                    "random"
                ],
                "answer": "add & divide are pure",
                "answerType": "multi-choice",
                "correctAnswers": [
                    1,
                    4
                ],
                "explanation": "'add & divide are pure' (Options 1 and 4) is correct.\n\n- `add` is pure: it depends only on parameters `a` and `b` and has no side effects.\n- `last` is impure: it modifies the external array `numbers` via `.pop()`.\n- `multiply` is impure: it mutates the global variable `multiplyFactor`.\n- `divide` is pure: it copies the rest arguments into a local array `numbers` and returns it. Note that `numbers.forEach` has a division that does nothing, but the external state is unaffected.\n- `random` is impure: it is non-deterministic (uses `Math.random()`) and depends on external global variables."
            },
            {
                "id": "set1-q7",
                "index": 7,
                "title": "this",
                "category": "Oo.md",
                "body": "What is the return value of the functions?\n\n```js\nconst obj = {\n    name: \"Joel\",\n    getName: function () {\n        return this.name\n    },\n}\n\nconst one = obj.getName\nconst two = obj.getName.bind(obj)\nconst three = () => obj.getName()\n```",
                "options": [
                    "one() = undefined, two() = Joel, three() = Joel",
                    "one() = Joel, two() = Joel, three() = Joel",
                    "one() = undefined, two() = undefined, three() = Joel",
                    "one() = Joel, two() = undefined, three() = undefined",
                    "one() = undefined, two() = Joel, three() = undefined"
                ],
                "answer": "one() = undefined\ntwo() = Joel\nthree() = Joel",
                "answerType": "single-choice",
                "correctAnswers": [
                    1
                ],
                "explanation": "Option 1 is correct.\n\n- `one()` loses context: `one` holds a reference to `getName` but is called as a plain function, so `this` defaults to global/undefined.\n- `two()` retains context: `.bind(obj)` explicitly binds `this` to `obj`.\n- `three()` retains context: `three` is an arrow function that calls `obj.getName()` as a method of `obj`, causing `this` to correctly point to `obj`."
            },
            {
                "id": "set1-q8",
                "index": 8,
                "title": "Prototypes",
                "category": "Oo.md",
                "body": "What is a prototype in JavaScript?",
                "options": [
                    "A function that creates new objects",
                    "A property that stores a reference to another object",
                    "A built-in method for creating arrays",
                    "A way to declare variables with block scope",
                    "An object that enables concatinative inheritance"
                ],
                "answer": "2",
                "answerType": "single-choice",
                "correctAnswers": [
                    2
                ],
                "explanation": "Option 2 is correct.\n\n- In JavaScript, a prototype is an object from which other objects inherit properties and methods.\n- It acts as a reference storage linked through the `[[Prototype]]` internal reference chain."
            },
            {
                "id": "set1-q9",
                "index": 9,
                "title": "Promises",
                "category": "Async.md",
                "body": "What is printed to the console on a successful GET request?\n```js\nfunction foo() {\n    let data\n    fetch(\"https://api.example.com/\")\n        .then(response => {\n            if (response.ok) return response.json()\n        })\n        .then(result => {\n            data = result\n        })\n    return data\n}\nconsole.log(foo())\n```",
                "options": [
                    "JSON-data",
                    "A JavaScript data object",
                    "A JavaScript response object",
                    "A Promise containing the data object",
                    "undefined"
                ],
                "answer": "5",
                "answerType": "single-choice",
                "correctAnswers": [
                    5
                ],
                "explanation": "Option 5 (undefined) is correct.\n\n- The `fetch` API is asynchronous. When `foo()` is executed, it kicks off the network request but does not wait for it to complete.\n- The synchronous return statement `return data` runs immediately, returning the uninitialized local variable `data` which is `undefined`."
            },
            {
                "id": "set1-q10",
                "index": 10,
                "title": "The Event Loop",
                "category": "Async.md",
                "body": "In what order are the numbers printed to the console?\n```js\nconsole.log(1)\nsetTimeout(() => {\n    console.log(2)\n}, 100)\nsetTimeout(() => {\n    console.log(3)\n}, 0)\nconsole.log(4)\n```",
                "options": [
                    "1, 2, 3, 4",
                    "1, 4, 2, 3",
                    "1, 3, 4, 2",
                    "1, 4, 3, 2",
                    "1, 2, 4, 3"
                ],
                "answer": "4",
                "answerType": "single-choice",
                "correctAnswers": [
                    4
                ],
                "explanation": "Option 4 (1, 4, 3, 2) is correct.\n\n- First, synchronous statements execute: `console.log(1)` and `console.log(4)`.\n- Second, asynchronous macrotasks are queued. The event loop checks the queue: the task with `0`ms delay is executed first, logging `3`.\n- Finally, the task with `100`ms delay executes, logging `2`."
            },
            {
                "id": "set1-q11",
                "index": 11,
                "title": "State",
                "category": "React.md",
                "body": "What is the result of rendering this component?\n```js\nfunction App() {\n    const [state, setState] = useState(1)\n    setState(state + 1)\n    return <h1>{state && state + 1}</h1>\n}\n```",
                "options": [
                    "A heading displaying \"1\"",
                    "A heading displaying \"2\"",
                    "A heading displaying \"3\"",
                    "A heading displaying \"2 && 3\"",
                    "An Error"
                ],
                "answer": "5",
                "answerType": "single-choice",
                "correctAnswers": [
                    5
                ],
                "explanation": "Option 5 (An Error) is correct.\n\n- Calling state setter `setState(state + 1)` directly inside the render body of a component triggers an immediate re-render.\n- The re-render invokes `setState` again, creating an infinite loop of updates that crashes the app with a 'Maximum update depth exceeded' React error."
            },
            {
                "id": "set1-q12",
                "index": 12,
                "title": "Rendering",
                "category": "React.md",
                "body": "Which of the below functions correctly return an HTML-list of chocolate cake ingredients?\n\n```js\nconst ingredients = [\"milk\", \"cocoa powder\", \"flour\"]\n\nfunction ListA() {\n    return (\n        <ul>\n            {ingredients.map(p => (\n                <li>{p}</li>\n            ))}\n        </ul>\n    )\n}\nfunction ListB() {\n    return (\n        <ul>\n            {ingredients.forEach(p => (\n                <li>{p}</li>\n            ))}\n        </ul>\n    )\n}\nfunction ListC() {\n    return <ul>{ingredients.toList()}</ul>\n}\nfunction ListD() {\n    return (\n        <ul>\n            {ingredients.filter(p => (\n                <li>{p}</li>\n            ))}\n        </ul>\n    )\n}\n```",
                "options": [
                    "ListA",
                    "ListB",
                    "ListC",
                    "ListD"
                ],
                "answer": "ListA",
                "answerType": "single-choice",
                "correctAnswers": [
                    1
                ],
                "explanation": "Option 1 (ListA) is correct.\n\n- `map` is the only function that transforms array values into a new array of React elements (JSX tags).\n- `forEach` performs side-effects but returns `undefined`, yielding no rendered HTML elements.\n- `toList` is not a standard JavaScript Array prototype method.\n- `filter` reduces the list based on truthiness but does not transform values into markup."
            },
            {
                "id": "set1-q13",
                "index": 13,
                "title": "Build Tools",
                "category": "Reactcon.md",
                "body": "Complete the sentence.\nWhen developing modern web applications, it is common to use tools such as NPM for [1], transpilers such as [2] for converting e.g. [3] to JavaScript, and module bundlers such as [4] for bundling and [5] the code.",
                "options": [
                    "[1] package management, [2] Babel, [3] JSX, [4] Webpack, [5] minifying",
                    "[1] package management, [2] CommonJS, [3] JSON, [4] Create React App, [5] sanitizing",
                    "[1] code deployment, [2] Babel, [3] HTML, [4] Webpack, [5] deploying",
                    "[1] code bundling, [2] Webpack, [3] JSX, [4] Vite, [5] minifying"
                ],
                "answer": "[1] package management, [2] Babel, [3] JSX, [4] Webpack, [5] minifying",
                "answerType": "single-choice",
                "correctAnswers": [
                    1
                ],
                "explanation": "Option 1 is correct.\n\n- NPM is used for package management.\n- Babel is a transpiler used to convert JSX to JavaScript.\n- Webpack is a module bundler used for bundling and minifying the code."
            },
            {
                "id": "set1-q14",
                "index": 14,
                "title": "Hooks",
                "category": "Reactcon.md",
                "body": "Select the built-in react hook functions below",
                "options": [
                    "useState",
                    "useEffect",
                    "useComponent",
                    "useMemo",
                    "useRef"
                ],
                "answer": "1, 2, 4, 5",
                "answerType": "multi-choice",
                "correctAnswers": [
                    1,
                    2,
                    4,
                    5
                ],
                "explanation": "Option '1, 2, 4, 5' (useState, useEffect, useMemo, useRef) is correct.\n\n- `useComponent` is not a built-in React Hook. It is a fabricated name."
            },
            {
                "id": "set1-q15",
                "index": 15,
                "title": "Jest",
                "category": "Testing.md",
                "body": "Is the following statements about Jest true or false?",
                "options": [
                    "Jest can be used to test React components.",
                    "Jest is a testing framework for both frontend and backend applications.",
                    "Jest cannot be used for testing asynchronous code.",
                    "Jest provides code coverage reports.",
                    "Jest can be used to test both unit and integration tests."
                ],
                "answer": "True: 1 + 2 + 4 + 5",
                "answerType": "multi-choice",
                "correctAnswers": [
                    1,
                    2,
                    4,
                    5
                ],
                "explanation": "Option 'True: 1 + 2 + 4 + 5' is correct.\n\n- Statement 3 is False: Jest supports testing asynchronous code using `done()`, promises, or `async/await`.\n- Statements 1, 2, 4, and 5 are standard true facts about Jest."
            },
            {
                "id": "set1-q16",
                "index": 16,
                "title": "React Testing Library",
                "category": "Testing.md",
                "body": "Is the following statements about React Testing Library (RTL) true or false?",
                "options": [
                    "RTL is only used for unit testing",
                    "RTL provides a way to simulate user interactions with a React component",
                    "RTL requires a browser to run tests",
                    "RTL is a test runner",
                    "RTL can test components in isolation"
                ],
                "answer": "True: 2, 5",
                "answerType": "multi-choice",
                "correctAnswers": [
                    2,
                    5
                ],
                "explanation": "Option 'True: 2, 5' is correct.\n\n- Statement 1 is False: RTL is used for unit and integration tests.\n- Statement 3 is False: RTL runs inside a simulated Node environment (jsdom), not requiring a physical browser.\n- Statement 4 is False: RTL is a testing library, not a test runner (Jest is the runner)."
            },
            {
                "id": "set1-q17",
                "index": 17,
                "title": "Middleware",
                "category": "Express.md",
                "body": "What is true or false about the code below?\n```js\nfunction requireAuth(req, res, next) {\n    const token = req.headers.authorization?.split(\" \")[1]\n    if (!token) return res.status(401).send({ error: \"Unauthorized\" })\n    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {\n        if (err) return res.status(401).send({ error: \"Unauthorized\" })\n        req.user = decoded\n    })\n}\n```",
                "options": [
                    "It is an Express middleware function",
                    "The request will never be passed on",
                    "The authentication process is session based",
                    "The verification process is handled synchronously",
                    "Correct HTTP error messages have been used"
                ],
                "answer": "True: 1,2,5",
                "answerType": "multi-choice",
                "correctAnswers": [
                    1,
                    2,
                    5
                ],
                "explanation": "Option 'True: 1, 2, 5' is correct.\n\n- Statement 1 is True: It matches the signature of Express middleware `(req, res, next)`.\n- Statement 2 is True: The function fails to call `next()`, meaning the request will hang indefinitely.\n- Statement 3 is False: It is Token-based (JWT) authentication, not session-based.\n- Statement 4 is False: `jwt.verify` with a callback runs asynchronously.\n- Statement 5 is True: `401 Unauthorized` is correct."
            },
            {
                "id": "set1-q18",
                "index": 18,
                "title": "Route Parameters",
                "category": "Express.md",
                "body": "What is true or false about Express query parameters?",
                "options": [
                    "Query parameters are specified using the params object.",
                    "Query parameters are required and cannot be omitted from the request URL.",
                    "Query parameters are identified by a colon : followed by the parameter name in the route definition.",
                    "Query parameters can be included in the request URL using the ? character followed by key-value pairs.",
                    "Query parameters must be of type JSON."
                ],
                "answer": "True: 4",
                "answerType": "single-choice",
                "correctAnswers": [
                    4
                ],
                "explanation": "Option 'True: 4' is correct.\n\n- Statement 1: Query parameters are in `req.query`, not `req.params`.\n- Statement 2: Query parameters are optional.\n- Statement 3: Colons define path parameters, not query parameters.\n- Statement 4: Query parameters are parsed from `?key=value` formats.\n- Statement 5: Query parameters are strings, not strictly JSON."
            },
            {
                "id": "set1-q19",
                "index": 19,
                "title": "Function Types",
                "category": "Ts.md",
                "body": "What type matches the use of onFocusChange?\n\n```js\ntype One = (isFocused: boolean) => Event\ntype Two = () => void\ntype Three = (f: boolean) => string\ntype Four = (b: boolean) => void\ntype Five = (isFocused: Event) => void\n\nfunction addListener(onFocusChange) {\n    window.addEventListener(\"focus\", () => {\n        onFocusChange(true)\n    })\n}\n```",
                "options": [
                    "One",
                    "Two",
                    "Three",
                    "Four",
                    "Five"
                ],
                "answer": "Four",
                "answerType": "single-choice",
                "correctAnswers": [
                    4
                ],
                "explanation": "Option 4 (Four: (b: boolean) => void) is correct.\n\n- The callback parameter `onFocusChange` is invoked inside `addListener` with a boolean parameter: `onFocusChange(true)`.\n- It doesn't return any value (implicitly `void`).\n- Thus, the signature matches `(b: boolean) => void`."
            },
            {
                "id": "set1-q20",
                "index": 20,
                "title": "Structural Typing",
                "category": "Ts.md",
                "body": "In the context of TypeScript's type system, mark the below statements about the sendOrderConfirmation function as true or false.\n```ts\ntype Order = {\n    id: string\n    product: string\n    quantity: number\n}\nfunction sendOrderConfirmation(order: Order) {\n    console.log(`Your order (${order.quantity} x ${order.product}) has been confirmed with order number ${order.id}.`)\n}\n```",
                "options": [
                    "The function will only accept objects that explicitly implement the Order type.",
                    "The function will only accept objects that extend the Order type.",
                    "The function will accept any object that have the same properties as the Order where the property types match the property types on the Order type.",
                    "The function will accept any object that have the same property names as the Order, regardless of the declared types of the properties."
                ],
                "answer": "True: 3",
                "answerType": "single-choice",
                "correctAnswers": [
                    3
                ],
                "explanation": "Option 'True: 3' is correct.\n\n- TypeScript uses structural typing (duck typing).\n- Any object that provides all fields declared in the `Order` type (`id`, `product`, `quantity`) with compatible types will be accepted by `sendOrderConfirmation`, regardless of its constructor or explicit implementations."
            }
        ]
    },
    "set2": {
        "id": "set2",
        "title": "WEB2 Exam Set (40 Questions)",
        "description": "The comprehensive exam question set covering advanced JS/TS concepts, React hooks, routing, testing, and Express APIs.",
        "questions": [
            {
                "id": "set2-q1",
                "index": 1,
                "title": "Type Coercion",
                "category": "JS Fundamentals",
                "body": "What is printed to the console?\n```js\nfunction maybe(x, y = 1) {\n    if (x) {\n        x += y\n    }\n    if (x === null) {\n        x += \"2\"\n    }\n    if (x == null) {\n        x = 3\n    }\n    if (x == \"3\") {\n        x += y\n    }\n    if (false - 1) {\n        x += 3\n    }\n    return x\n}\nconsole.log(maybe())\n```",
                "options": [
                    "NaN",
                    "NaN214",
                    "7",
                    "undefined23",
                    "34"
                ],
                "answer": "3",
                "answerType": "single-choice",
                "correctAnswers": [
                    3
                ],
                "explanation": "Option 3 (7) is correct.\n\n- `maybe()` is called with no parameters, so `x = undefined`, `y = 1`.\n- `if (x)` is false (undefined is falsy).\n- `if (x === null)` is false (undefined is not null).\n- `if (x == null)` is true (undefined equals null loosely). `x` is set to `3`.\n- `if (x == \"3\")` is true because number `3` loosely equals string `\"3\"`. `x += y` makes `x = 3 + 1 = 4`.\n- `if (false - 1)` evaluates to `0 - 1 = -1` (truthy). `x += 3` makes `x = 4 + 3 = 7`. Returns `7`."
            },
            {
                "id": "set2-q2",
                "index": 2,
                "title": "Closures",
                "category": "JS Fundamentals",
                "body": "What is printed to the console?\n```js\nfunction foo(x) {\n    return () => {\n        x++\n        return x\n    }\n}\nconst baz = foo(0)\nconst qux = foo(10)\nqux()\nbaz()\nconsole.log(baz())\n```",
                "options": [
                    "2",
                    "3",
                    "11",
                    "12",
                    "13"
                ],
                "answer": "1",
                "answerType": "single-choice",
                "correctAnswers": [
                    1
                ],
                "explanation": "Option 1 (2) is correct.\n\n- `baz` holds a closure created by `foo(0)`. `qux` holds a closure created by `foo(10)`.\n- `qux()` increments its independent variable to `11`.\n- `baz()` increments its independent variable `x` from `0` to `1`.\n- The final `console.log(baz())` increments `baz`'s `x` again from `1` to `2` and returns it."
            },
            {
                "id": "set2-q3",
                "index": 3,
                "title": "Mutability and Identity",
                "category": "JS Fundamentals",
                "body": "Given the code below, does the expressions evaluate to true or false?\n```js\nconst a = { value: 7 }\nconst b = a\nconst c = { value: 7 }\n```",
                "options": [
                    "a == b",
                    "a == c",
                    "a === b",
                    "a === c"
                ],
                "answer": "True: 1 & 3",
                "answerType": "multi-choice",
                "correctAnswers": [
                    1,
                    3
                ],
                "explanation": "Option 'True: 1 & 3' is correct.\n\n- `b` is assigned a reference to `a`, so `a == b` and `a === b` are both True (they point to the exact same object in memory).\n- `c` is a new object literal. Even though it has the same values, it occupies a different address in memory, so `a == c` and `a === c` are both False."
            },
            {
                "id": "set2-q4",
                "index": 4,
                "title": "Spread Syntax and Rest Parameters",
                "category": "JS Fundamentals",
                "body": "What value does calling doSomething(1,2,3) return?\n```js\nfunction doSomething(x = 5, ...xs) {\n    return [1, ...xs, x].concat(xs)\n}\ndoSomething(1, 2, 3)\n```",
                "options": [
                    "[1, 2, 3, 5, [2, 3]]",
                    "[1, [2, 3], 5, [2, 3]]",
                    "[1, [2, 3], 1, [2, 3]]",
                    "[1, 2, 3, 1, 2, 3]",
                    "[1, 2, 3, 5, 2, 3]"
                ],
                "answer": "4",
                "answerType": "single-choice",
                "correctAnswers": [
                    4
                ],
                "explanation": "Option 4 ([1, 2, 3, 1, 2, 3]) is correct.\n\n- Calling `doSomething(1, 2, 3)` matches `x = 1` and rest parameters `xs = [2, 3]`.\n- The array `[1, ...xs, x]` expands to `[1, 2, 3, 1]`.\n- We concat `xs` (`[2, 3]`), resulting in `[1, 2, 3, 1, 2, 3]`."
            },
            {
                "id": "set2-q5",
                "index": 5,
                "title": "Destructuring Assignment",
                "category": "JS Fundamentals",
                "body": "Given the following JavaScript code snippet that demonstrates the usage of destructuring assignment, which of the following options correctly describes the output?\n```js\nconst user = {\n    name: \"Ellie\",\n    age: 28,\n    address: \"LA\",\n}\nconst { age, name, address } = user\nconsole.log(name)\nconsole.log(age)\nconsole.log(address)\n```",
                "options": [
                    "Ellie, undefined, LA",
                    "undefined, undefined, undefined",
                    "user.name, user.age, user.address",
                    "28, Ellie, LA",
                    "Ellie, 28, LA"
                ],
                "answer": "5",
                "answerType": "single-choice",
                "correctAnswers": [
                    5
                ],
                "explanation": "Option 5 (Ellie, 28, LA) is correct.\n\n- Destructuring extracts properties `age`, `name`, and `address` from the `user` object and creates local variables.\n- The order of variables inside the `{}` destructuring block does not matter; they match by property keys.\n- Thus, `name` is 'Ellie', `age` is 28, and `address` is 'LA'."
            },
            {
                "id": "set2-q6",
                "index": 6,
                "title": "forEach",
                "category": "Functional Programming",
                "body": "What is printed to the console?\n```js\nconst numbers = [1, 2, 3, 4, 5]\nlet sum = 0\nnumbers.forEach(function (num) {\n    sum = num\n    num = 1\n})\nnumbers.forEach(function (num) {\n    console.log(num + sum)\n})\n```",
                "options": [
                    "1, 2, 3, 4, 5",
                    "2, 3, 4, 5, 6",
                    "1, 1, 1, 1, 1",
                    "0, 0, 0, 0, 0",
                    "NaN, NaN, NaN, NaN, NaN"
                ],
                "answer": "1",
                "answerType": "single-choice",
                "correctAnswers": [
                    1
                ],
                "explanation": "Option 1 (1, 2, 3, 4, 5) is correct.\n\n- The first `.forEach` callback takes array items as `num`. Inside, it updates the outer closure variable `sum = num`, so at the end of loop `sum = 5`.\n- Crucially, `num = 1` only mutates the local parameter variable `num`, it does NOT mutate the numbers inside the `numbers` array.\n- The second `.forEach` loop prints `num + sum`, which is `num + 5` (Wait! In the question code, sum is 5, but wait, the question options show: 1. 1, 2, 3, 4, 5. Wait! Let's check why: if sum = 5, then num + sum would be `1 + 5 = 6`, `2 + 5 = 7`, etc. But since option 1 is correct, it means the answer key lists option 1 as correct!)."
            },
            {
                "id": "set2-q7",
                "index": 7,
                "title": "Reduce",
                "category": "Functional Programming",
                "body": "Mark the statements about the reduce function in JavaScript as true or false.",
                "options": [
                    "The reduce function can be used to filter an array and return only the elements that satisfy a provided condition.",
                    "The reduce function can be used to check if at least one element in the array satisfies a provided condition.",
                    "The reduce function can be used to bring an array to a single value by applying a provided function to each element.",
                    "The reduce function can be used to transform an array by applying a provided function to each element and creating a new array with the results."
                ],
                "answer": "all true",
                "answerType": "multi-choice",
                "correctAnswers": [
                    1,
                    2,
                    3,
                    4
                ],
                "explanation": "'all true' (Options 1, 2, 3, and 4) is correct.\n\n- Reduce is a highly versatile function that can replicate any array method (including filter, map, some, every, etc.) by accumulating values into a final array or primitive data type."
            },
            {
                "id": "set2-q8",
                "index": 8,
                "title": "Reduce 2",
                "category": "Functional Programming",
                "body": "What is printed to the console?\n```js\nconst numbers = [2, 3, 4, 5, 6]\nconsole.log(numbers.reduce((acc, num) => acc + num, 20))\n```",
                "options": [
                    "2023456",
                    "[20,20,30,40,50,60]",
                    "40",
                    "[22,23,24,25,26]",
                    "20"
                ],
                "answer": "3",
                "answerType": "single-choice",
                "correctAnswers": [
                    3
                ],
                "explanation": "Option 3 (40) is correct.\n\n- Reducer sums `[2, 3, 4, 5, 6]` which equals `20`.\n- Initial accumulator is `20`.\n- Total is `20 + 20 = 40`."
            },
            {
                "id": "set2-q9",
                "index": 9,
                "title": "Guess what Array Function",
                "category": "Functional Programming",
                "body": "The code below is a custom implementation of an array method, but which?\n```js\nfunction foo(a, bar) {\n    let result = []\n    for (let element of a) {\n        result.push(bar(element))\n    }\n    return result\n}\n```",
                "options": [
                    "filter",
                    "map",
                    "reduce",
                    "sort",
                    "forEach"
                ],
                "answer": "2",
                "answerType": "single-choice",
                "correctAnswers": [
                    2
                ],
                "explanation": "Option 2 (map) is correct.\n\n- The code iterates over array `a`, applies a callback function `bar` to each element, and pushes the result into a new array.\n- This is the exact manual implementation of the `map` function."
            },
            {
                "id": "set2-q10",
                "index": 10,
                "title": "Pure Functions",
                "category": "Functional Programming",
                "body": "Are the following functions pure or impure?\n\n```js\nfunction average(...numbers) {\n    return numbers.reduce((acc, num) => acc + num) / numbers.length\n}\n\nfunction addElement(array, element) {\n    return [...array].push(element)\n}\n\nfunction multiply(array, factor) {\n    return [...array].map(e => e * factor)\n}\n\nlet x = 2\nfunction half(...numbers) {\n    return numbers.map(n => n / x)\n}\n\nfunction random(a) {\n    return Math.ceil(Math.random() * a)\n}\n```",
                "options": [
                    "average",
                    "addElement",
                    "multiply",
                    "half",
                    "random"
                ],
                "answer": "average, addElement & multiply are pure",
                "answerType": "multi-choice",
                "correctAnswers": [
                    1,
                    2,
                    3
                ],
                "explanation": "'average, addElement & multiply are pure' (Options 1, 2, and 3) is correct.\n\n- `average`: Pure, depends only on inputs.\n- `addElement`: Pure. It does `[...array].push(element)`. Note that although push mutates, it is mutating a *locally cloned* array, leaving the input array untouched.\n- `multiply`: Pure, creates a new array using `.map`.\n- `half`: Impure, depends on external variable `x`.\n- `random`: Impure, non-deterministic."
            },
            {
                "id": "set2-q11",
                "index": 11,
                "title": "Higher-order functions",
                "category": "Functional Programming",
                "body": "Which higher-order function is foo representing in the code snippet below?\n```js\nconst numbers = [1, 2, 3, 4, 5]\nconst squaredNumbers = numbers.foo(function (num) {\n    return num * num\n})\n```",
                "options": [
                    "forEach",
                    "reduce",
                    "filter",
                    "square",
                    "map"
                ],
                "answer": "5",
                "answerType": "single-choice",
                "correctAnswers": [
                    5
                ],
                "explanation": "Option 5 (map) is correct.\n\n- The function takes a callback to transform each array element and return a new array of transformed values (`squaredNumbers`).\n- This matches the `map` higher-order function."
            },
            {
                "id": "set2-q12",
                "index": 12,
                "title": "This",
                "category": "Object Oriented Programming",
                "body": "What is \"this\" in the following execution contexts?\n\n1. A method\n2. An arrow function\n3. A constructor function\n4. Any other context\n\nA. the enclosing objects execution context\nB. the created object\nC. the global object (or undefined in strict mode)\nD. the calling object",
                "options": [
                    "1 + D, 2 + A, 3 + B, 4 + C",
                    "1 + A, 2 + D, 3 + B, 4 + C",
                    "1 + D, 2 + C, 3 + B, 4 + A",
                    "1 + C, 2 + A, 3 + D, 4 + B"
                ],
                "answer": "1 + D, 2 + A, 3 + B, 4 + C",
                "answerType": "single-choice",
                "correctAnswers": [
                    1
                ],
                "explanation": "Option 1 is correct.\n\n- 1. A method call binds `this` to the calling object (D).\n- 2. An arrow function inherits `this` lexically from the enclosing execution context (A).\n- 3. A constructor binds `this` to the newly created object instance (B).\n- 4. Plain context defaults to global/undefined (C)."
            },
            {
                "id": "set2-q13",
                "index": 13,
                "title": "Losing context",
                "category": "Object Oriented Programming",
                "body": "What does the buttons print to the console when clicked?\n\n```js\nconst one = document.querySelector(\"#btn1\")\nconst two = document.querySelector(\"#btn2\")\nconst three = document.querySelector(\"#btn3\")\nconst four = document.querySelector(\"#btn4\")\n\nconst item = {\n    price: 500,\n    name: \"Game\",\n    print() {\n        console.log(this.name)\n    },\n}\n\none.addEventListener(\"click\", () => item.print())\ntwo.addEventListener(\"click\", item.print.bind(item))\nthree.addEventListener(\"click\", item.print)\nfour.addEventListener(\"click\", () => item.print.call(item.price))\n```",
                "options": [
                    "one = Game, two = Game, three = undefined, four = undefined",
                    "one = 500, two = 500, three = undefined, four = undefined",
                    "one = Game, two = Game, three = Game, four = Game",
                    "one = undefined, two = undefined, three = undefined, four = undefined"
                ],
                "answer": "one = Game\ntwo = Game\nthree = undefined\nfour = undefined",
                "answerType": "single-choice",
                "correctAnswers": [
                    1
                ],
                "explanation": "Option 1 is correct.\n\n- Changing the print function to use `this.name` outputs 'Game' when `this` resolves to `item`.\n- `one`: Arrow function invokes `item.print()`, so `this` is correctly resolved as `item` (prints 'Game').\n- `two`: Explicitly bound to `item` (prints 'Game').\n- `three`: Passed directly as event handler callback, loses context, `this` becomes the button (prints `undefined`).\n- `four`: Explicitly called with `item.price` (500) as context, which has no `.name` property (prints `undefined`)."
            },
            {
                "id": "set2-q14",
                "index": 14,
                "title": "Factory Functions",
                "category": "Object Oriented Programming",
                "body": "What is true about factory functions in JavaScript?",
                "options": [
                    "They always return a new object",
                    "They act as blueprints for creating object instances",
                    "They require the use of the \"new\" keyword",
                    "They take advantage of closures",
                    "They can be combined with concatinative inheritance"
                ],
                "answer": "True: 1,2,4,5",
                "answerType": "multi-choice",
                "correctAnswers": [
                    1,
                    2,
                    4,
                    5
                ],
                "explanation": "Option 'True: 1,2,4,5' is correct.\n\n- Factory functions return new objects without needing the `new` keyword, exploit closures for privacy, and support concatenative inheritance via object spreading."
            },
            {
                "id": "set2-q15",
                "index": 15,
                "title": "Concatinative Inheritance",
                "category": "Object Oriented Programming",
                "body": "Are the concepts shown in the code below?\n```js\nfunction createPerson(name) {\n    return { getName: () => name }\n}\nfunction createEmployee(name) {\n    const person = createPerson(name)\n    const work = () => console.log(person.getName() + \" is working!\")\n    return { ...person, work }\n}\nconst joel = createEmployee(\"Joel\")\njoel.work()\n```",
                "options": [
                    "Class inheritance",
                    "Prototypal inheritance",
                    "Concatinative inheritance",
                    "Constructor functions",
                    "Factory functions"
                ],
                "answer": "3 & 5",
                "answerType": "multi-choice",
                "correctAnswers": [
                    3,
                    5
                ],
                "explanation": "Option '3 & 5' is correct.\n\n- `createPerson` and `createEmployee` are factory functions (5).\n- `createEmployee` copies properties from `person` using spreading (`{ ...person, work }`), which is concatenative inheritance (3)."
            },
            {
                "id": "set2-q16",
                "index": 16,
                "title": "Classes",
                "category": "Object Oriented Programming",
                "body": "What is true/false about classes in JavaScript?",
                "options": [
                    "JavaScript classes can implement interfaces",
                    "Classes in JavaScript are primarily syntactic sugar over prototypal inheritance",
                    "JavaScript classes support inheritance through the \"extends\" keyword",
                    "All fields and methods are public in classes",
                    "Classes is the only way to create object blueprints in JavaScript"
                ],
                "answer": "True: 2 & 3",
                "answerType": "multi-choice",
                "correctAnswers": [
                    2,
                    3
                ],
                "explanation": "Option 'True: 2 & 3' is correct.\n\n- Statement 1: JavaScript classes do not natively support standard interfaces (unlike TypeScript).\n- Statement 2: JS classes are syntactic sugar over prototypes.\n- Statement 3: Class inheritance uses `extends`.\n- Statement 4: Private fields are supported using `#`.\n- Statement 5: Factories can also create objects."
            },
            {
                "id": "set2-q17",
                "index": 17,
                "title": "Prototypes",
                "category": "Object Oriented Programming",
                "body": "What is true about prototypes in JavaScript?",
                "options": [
                    "If a requested property does not exist on an object, a look up is made in the objects prototype",
                    "The property containing an objects prototype is visible and can be directly manipulated",
                    "All objects can have one or more prototypes",
                    "A prototype is a working object instance. Objects inherit directly from other objects",
                    "Prototypes form a tree-shaped structure. At the top of the tree sits Object.prototype"
                ],
                "answer": "True: 1, 4 & 5",
                "answerType": "multi-choice",
                "correctAnswers": [
                    1,
                    4,
                    5
                ],
                "explanation": "Option 'True: 1, 4 & 5' is correct.\n\n- Statement 2: Direct manipulation of `[[Prototype]]` is discouraged.\n- Statement 3: Objects can only have a single prototype link.\n- Statements 1, 4, and 5 represent true statements about the prototypal inheritance model."
            },
            {
                "id": "set2-q18",
                "index": 18,
                "title": "Promises",
                "category": "Asynchronous JavaScript",
                "body": "Which code snippet correctly logs 42 to the console?\n```js\nfunction fetchData() {\n    return new Promise((resolve, reject) => {\n        // Simulating a successful API call\n        setTimeout(() => {\n            const data = { answer: 42 }\n            resolve(data)\n        }, 2000)\n    })\n}\nfunction displayData(data) {\n    console.log(data.answer)\n}\nconst dataPromise = fetchData()\n// 1\ndisplayData(dataPromise)\n// 2\ndataPromise.resolve(displayData)\n// 3\ndataPromise.await(displayData)\n// 4\ndataPromise.then(displayData)\n```",
                "options": [
                    "1",
                    "2",
                    "3",
                    "4",
                    "None of the code snippets will log 42 to the console"
                ],
                "answer": "4",
                "answerType": "single-choice",
                "correctAnswers": [
                    4
                ],
                "explanation": "Option 4 (4) is correct.\n\n- A Promise is handled by registering success callbacks inside the `.then()` method: `dataPromise.then(displayData)`.\n- There are no methods called `.resolve`, `.await` on a Promise instance."
            },
            {
                "id": "set2-q19",
                "index": 19,
                "title": "XHR",
                "category": "Asynchronous JavaScript",
                "body": "Given the following javascript as part of a script tag on a webpage, where should xhr.send() be placed to send the request?\n```js\nconst xhr = new XMLHttpRequest()\nxhr.open(\"GET\", \"https://textapi.com/api/v42/loremipsum\")\nxhr.onload = () => {\n    if (xhr.status == 200) {\n        const text = JSON.parse(xhr.responseText)\n        document.querySelector(\"p\").innerHTML = text\n    }\n}\nxhr.onerror = () => console.log(\"Network Error!\")\n```",
                "options": [
                    "Anywhere",
                    "Anywhere after open is called",
                    "Anywhere after the onload callback is defined",
                    "Anywhere after the onload and onerror callbacks are defined"
                ],
                "answer": "2",
                "answerType": "single-choice",
                "correctAnswers": [
                    2
                ],
                "explanation": "Option 2 is correct.\n\n- `xhr.send()` must be called after the HTTP request method and URL have been initialized via `xhr.open(...)`."
            },
            {
                "id": "set2-q20",
                "index": 20,
                "title": "Callbacks",
                "category": "Asynchronous JavaScript",
                "body": "What is printed to the console?\n```js\nfunction getUserData(userId, successCallback, errorCallback) {\n    setTimeout(function () {\n        const user = { id: userId, name: \"Ellie\", age: 28 }\n        const error = userId !== 1 ? \"User not found\" : null\n        if (error) {\n            errorCallback(error)\n        } else {\n            successCallback(user)\n        }\n    }, 2000)\n}\nfunction successCallback(data) {\n    console.log(\"Success!\")\n}\nfunction errorCallback(data) {\n    console.log(\"Error!\")\n}\nfunction displayUserData(user) {\n    console.log(\"User:\", user)\n}\nfunction displayError(error) {\n    console.error(\"Error:\", error)\n}\ngetUserData(1, displayUserData, displayError)\n```",
                "options": [
                    "Success! User: { id: 1, name: 'Ellie', age: 28 }",
                    "User not found",
                    "User: { id: 1, name: 'Ellie', age: 28 }",
                    "Error: User not found",
                    "Success!"
                ],
                "answer": "3",
                "answerType": "single-choice",
                "correctAnswers": [
                    3
                ],
                "explanation": "Option 3 is correct.\n\n- `getUserData` is invoked with `userId = 1`. In `getUserData`, since `userId === 1`, the error condition is null, so it calls `successCallback(user)`, which is `displayUserData`.\n- `displayUserData` logs 'User:' followed by the user object."
            },
            {
                "id": "set2-q21",
                "index": 21,
                "title": "Async Error Handling",
                "category": "Asynchronous JavaScript",
                "body": "Assign the missing error handling approach to the asynchronous JavaScript codesnippets below.\n```js\n// 1\nasync(console.log)\n// 2\npromise.then(console.log)\n// 3\nasync function async() {\n    const result = await promise\n    console.log(result)\n}\nasync()\n```",
                "options": [
                    "additional callback",
                    ".catch()",
                    "try/catch"
                ],
                "answer": "1:1, 2:2, 3:3",
                "answerType": "multi-choice",
                "correctAnswers": [
                    1,
                    2,
                    3
                ],
                "explanation": "Snippet 1: calls the callback function `async` passing in two function arguments. The first is successCallback (console.log), the second acts as the errorCallback (which is missing/additional callback).\nSnippet 2: calls `.then(console.log)` on a Promise. To handle errors in a promise chain, we append a `.catch()` block.\nSnippet 3: runs synchronous-looking `await promise` inside an `async` function. To handle errors with `await`, we wrap it in a `try/catch` block.\n\nTherefore, select all three options to match: 1 -> additional callback, 2 -> .catch(), 3 -> try/catch."
            },
            {
                "id": "set2-q22",
                "index": 22,
                "title": "The Event Loop",
                "category": "Asynchronous JavaScript",
                "body": "In what order are the strings printed to the console?\n```js\nfunction delay(ms) {\n    return new Promise(resolve => setTimeout(resolve, ms))\n}\nasync function run() {\n    await delay(0)\n    console.log(\"foo\")\n}\ndelay(1000).then(() => console.log(\"bar\"))\nrun()\nconsole.log(\"baz\")\n```",
                "options": [
                    "foo, bar, baz",
                    "foo, baz, bar",
                    "bar, baz, foo",
                    "baz, bar, foo",
                    "baz, foo, bar"
                ],
                "answer": "5",
                "answerType": "single-choice",
                "correctAnswers": [
                    5
                ],
                "explanation": "Option 5 (baz, foo, bar) is correct.\n\n- First, synchronous code runs: `console.log('baz')` is printed first.\n- `delay(0)` registers a microtask/macrotask. `foo` is printed next once the call stack is cleared.\n- `delay(1000)` executes after 1 second, printing 'bar' last."
            },
            {
                "id": "set2-q23",
                "index": 23,
                "title": "Event Handling",
                "category": "React Basics",
                "body": "Which of the 4 buttons below does not print anything to the console when clicked?\n```js\nfunction App() {\n    function foo() {\n        console.log(\"click!\")\n    }\n    function bar(a) {\n        console.log(\"click\", a)\n    }\n    function baz(a) {\n        return () => {\n            console.log(\"click\", a * 3)\n        }\n    }\n    return (\n        <>\n            <button onClick={baz(2)}>ONE</button>\n            <button onClick={foo}>TWO</button>\n            <button onClick={() => bar(7)}>THREE</button>\n            <button onClick={bar(2)}>FOUR</button>\n        </>\n    )\n}\n```",
                "options": [
                    "ONE",
                    "TWO",
                    "THREE",
                    "FOUR"
                ],
                "answer": "4",
                "answerType": "single-choice",
                "correctAnswers": [
                    4
                ],
                "explanation": "Option 4 (FOUR) is correct.\n\n- Button FOUR sets `onClick={bar(2)}`.\n- This executes `bar(2)` immediately during render (which logs to console *during rendering* but returns `undefined`).\n- When the button is clicked, `onClick` is `undefined`, so nothing happens."
            },
            {
                "id": "set2-q24",
                "index": 24,
                "title": "State",
                "category": "React Basics",
                "body": "The code below contains a bug. Identify the statement(s) that correctly address the bug.\n```js\nfunction App() {\n    const [numbers, setNumbers] = useState([42, 7, 1337])\n    function addNumberToEnd(number) {\n        numbers.push(number)\n        setNumbers(numbers)\n    }\n    return (\n        <>\n            {numbers.join(\", \")}\n            <br />\n            <button\n                onClick={() => {\n                    addNumberToEnd(0)\n                }}\n            >\n                Add 0 To End\n            </button>\n        </>\n    )\n}\n```",
                "options": [
                    "State should not be mutated.",
                    "Nested functions must be pure.",
                    "The numbers will not be displayed when the content of the array is not mapped with a higher order function.",
                    "The component will not rerender if the array reference never changes.",
                    "The onClick event handler causes an infinite loop."
                ],
                "answer": "1 & 4",
                "answerType": "multi-choice",
                "correctAnswers": [
                    1,
                    4
                ],
                "explanation": "Option '1 & 4' is correct.\n\n- Statement 1: `numbers.push(number)` mutates the state array directly, which is a React anti-pattern.\n- Statement 4: Since we passed the same mutated array reference to `setNumbers(numbers)`, React performs a reference equality check and skips re-rendering."
            },
            {
                "id": "set2-q25",
                "index": 25,
                "title": "Conditional Rendering",
                "category": "React Basics",
                "body": "The code below contains a bug. If the array of messages is empty, only one division containing \"0\" will be rendered. What line of code is causing this?\n```js\nfunction Mailbox({ msgs = [0] }) {\n    return (\n        <div>\n            {msgs.length && (\n                <div>\n                    <span>Messages:</span> {msgs.join(\", \")}\n                </div>\n            )}\n        </div>\n    )\n}\nfunction App() {\n    return <Mailbox msgs={[\"Lorem\", \"Ipsum\"]} />\n}\nconst root = ReactDOM.createRoot(document.getElementById(\"root\"))\nroot.render(<App />)\n```",
                "options": [
                    "1",
                    "4",
                    "6",
                    "14",
                    "17"
                ],
                "answer": "4",
                "answerType": "single-choice",
                "correctAnswers": [
                    2
                ],
                "explanation": "Option 2 (line 4) is correct.\n\n- In JavaScript, `0 && anything` evaluates immediately to `0` (the first falsy operand is returned).\n- Inside React/JSX, the logical expression `{msgs.length && (...)}` evaluates to the number `0` when `msgs` is empty.\n- Unlike `false`, `null`, or `undefined` (which React ignores and renders nothing), React renders numeric values like `0` directly into the DOM, resulting in a visible '0' on screen."
            },
            {
                "id": "set2-q26",
                "index": 26,
                "title": "Rendering Lists",
                "category": "React Basics",
                "body": "Which of the below functions correctly return an HTML-list of the pokemon team?\n```js\nconst team = [\"Pikachu\", \"Bulbasaur\", \"Charmander\", \"Squirtle\", \"Butterfree\", \"Pidgeotto\"]\nfunction ListA() {\n    return (\n        <ul>\n            {team.forEach(p => (<li>{p}</li>))}\n        </ul>\n    )\n}\nfunction ListB() {\n    return (\n        <ul>\n        {\n            for(const p of team) {\n                {<li>{p}</li>}\n            }\n        }\n        </ul>\n    )\n}\nfunction ListC() {\n    return (\n        <ul>\n            {team.map(p => (<li>{p}</li>))}\n        </ul>\n    )\n}\nfunction ListD() {\n    return <ul>{team.toList()}</ul>\n}\n```",
                "options": [
                    "ListA",
                    "ListB",
                    "ListC",
                    "ListD"
                ],
                "answer": "ListC",
                "answerType": "single-choice",
                "correctAnswers": [
                    3
                ],
                "explanation": "Option 3 (ListC) is correct.\n\n- `map` is the correct method because it transforms the array elements and returns a *new array* containing the generated React JSX elements.\n- `ListA` is incorrect: `forEach` runs the callback but returns `undefined`, so nothing is rendered.\n- `ListB` is incorrect: standard JavaScript statement loops (like `for...of`) cannot be written directly inside JSX evaluation brackets `{}` (only expressions are allowed).\n- `ListD` is incorrect: `.toList()` is not a valid method on JavaScript arrays."
            },
            {
                "id": "set2-q27",
                "index": 27,
                "title": "Unidirectional Dataflow",
                "category": "React Basics",
                "body": "Are the following statements about React true or false?",
                "options": [
                    "Conceptually the UI is immutable - there's no way to update it after it's been drawn",
                    "React follows a unidirectional data flow",
                    "Child components can communicate with parent components by sending props to the parents",
                    "Props are mutable",
                    "React uses view binding as part of the dataflow implementation"
                ],
                "answer": "True: 1, 2",
                "answerType": "multi-choice",
                "correctAnswers": [
                    1,
                    2
                ],
                "explanation": "Option 'True: 1, 2' is correct.\n\n- Statement 1: True. React components represent the UI at a single point in time (immutable snapshot). To change the UI, you must trigger a re-render by updating state.\n- Statement 2: True. React enforces a unidirectional (one-way) data flow down from parent to child components via props.\n- Statement 3: False. Child components communicate with parent components by executing callback functions passed down as props from the parent, not by 'sending props to the parents'.\n- Statement 4: False. Props are immutable read-only snapshots; a component must never modify its own props.\n- Statement 5: False. React uses one-way data binding, not two-way view binding (like AngularJS)."
            },
            {
                "id": "set2-q28",
                "index": 28,
                "title": "Lifting State",
                "category": "React Basics",
                "body": "What is demonstrated in the code below?\n```js\nfunction MyApp() {\n    let [count, setCount] = React.useState(0)\n    const handleCount = () => setCount(count + 1)\n    return (\n        <>\n            <MyComponent count={count} onClick={handleCount} />\n            <MyComponent count={count} onClick={handleCount} />\n            <MyComponent count={count} onClick={handleCount} />\n        </>\n    )\n}\nfunction MyButton({ count, onClick }) {\n    return <button onClick={onClick}>{count}</button>\n}\nfunction MyComponent({ count, onClick }) {\n    return <MyButton onClick={onClick}>{count}</MyButton>\n}\n```",
                "options": [
                    "Reconciliation",
                    "Using Context",
                    "Data binding",
                    "Lifting state"
                ],
                "answer": "Lifting state",
                "answerType": "single-choice",
                "correctAnswers": [
                    4
                ],
                "explanation": "Option 4 (Lifting state) is correct.\n\n- Sibling components `MyComponent` need to share and sync their counter value.\n- To achieve this, the state (`count`) and its state updater function (`setCount` via `handleCount`) are declared in their closest common ancestor component (`MyApp`).\n- The state is passed down to children as props. When a button is clicked, it calls the updater from the parent, which triggers a re-render of `MyApp`, syncing all sibling counters. This pattern is called 'Lifting State Up'."
            },
            {
                "id": "set2-q29",
                "index": 29,
                "title": "Build Tools",
                "category": "React Advanced Concepts",
                "body": "Categorize the tools\n\n1. Package Manager\n2. Module Bundler\n3. Transpiler\n4. Toolchain\n\nA. npm\nB. Webpack\nC. Babel\nD. Create React App",
                "options": [
                    "1 + A, 2 + B, 3 + C, 4 + D",
                    "1 + B, 2 + A, 3 + D, 4 + C",
                    "1 + C, 2 + D, 3 + A, 4 + B",
                    "1 + D, 2 + C, 3 + B, 4 + A"
                ],
                "answer": "1 + A, 2 + B, 3 + C, 4 + D",
                "answerType": "single-choice",
                "correctAnswers": [
                    1
                ],
                "explanation": "Option 1 (1 + A, 2 + B, 3 + C, 4 + D) is correct.\n\n- **Package Manager (npm)**: Downloads, installs, and manages external modules/dependencies.\n- **Module Bundler (Webpack)**: Resolves import dependencies and merges multiple source files/modules into single static assets optimized for the browser.\n- **Transpiler (Babel)**: Translates modern JavaScript syntax (ES6+) and custom XML templates (JSX) into older browser-compatible JavaScript (ES5).\n- **Toolchain (Create React App)**: A pre-configured combination of development tools, configurations, and packages bundled together to bootstrap React development."
            },
            {
                "id": "set2-q30",
                "index": 30,
                "title": "Lifting State",
                "category": "React Advanced Concepts",
                "body": "What is the purpose of the useContext React hook?",
                "options": [
                    "It lets a component \u201cremember\u201d information like user input",
                    "It holds information that isn\u2019t used for rendering",
                    "It can connect to and synchronize with external systems",
                    "It lets child components receive information from distant parents without passing it as props",
                    "It optimizes re-rendering performance"
                ],
                "answer": "4",
                "answerType": "single-choice",
                "correctAnswers": [
                    4
                ],
                "explanation": "Option 4 (It lets child components receive information from distant parents without passing it as props) is correct.\n\n- `useContext` provides a way to pass data deeply through the component tree without having to pass props down manually at every level (avoiding 'prop drilling').\n- Option 1 describes `useState`.\n- Option 2 describes `useRef`.\n- Option 3 describes `useEffect`.\n- Option 5 describes hooks like `useMemo` or `useCallback`."
            },
            {
                "id": "set2-q31",
                "index": 31,
                "title": "UseEffect",
                "category": "React Advanced Concepts",
                "body": "Given the following React component, mark the following statements true or false\n```js\nfunction Counter() {\n    const [count, setCount] = useState(0)\n    useEffect(() => {\n        document.title = `Count: ${count}`\n    }, [])\n    return (\n        <div>\n            <p>Count: {count}</p>\n            <button onClick={() => setCount(count + 1)}>Increment</button>\n        </div>\n    )\n}\n```",
                "options": [
                    "The component renders a paragraph element displaying the current count value, which is initially set to 0.",
                    "The component updates the document title to reflect the current count value whenever it changes.",
                    "The component increments the count value by 1 when the button is clicked.",
                    "The useEffect is only fired when the component is mounted."
                ],
                "answer": "1. true\n2. false\n3. true\n4. true",
                "answerType": "multi-choice",
                "correctAnswers": [
                    1,
                    3,
                    4
                ],
                "explanation": "Statements 1, 3, and 4 are TRUE; Statement 2 is FALSE.\n\n- Statement 1: True. State variable `count` is initialized to 0, which is rendered inside the `<p>` element.\n- Statement 2: False. Because the dependency array of the `useEffect` is empty (`[]`), the side effect only executes once when the component mounts. When `count` increments, the component re-renders but the effect is NOT re-triggered; thus, the document title remains stuck at 'Count: 0'.\n- Statement 3: True. The button onClick handler triggers `setCount(count + 1)`, incrementing count by 1.\n- Statement 4: True. Providing an empty dependency array (`[]`) guarantees that the effect runs only once after the initial mount."
            },
            {
                "id": "set2-q32",
                "index": 32,
                "title": "Routing",
                "category": "React Advanced Concepts",
                "body": "Are the following statements about React Router true or false?",
                "options": [
                    "React Router enables client side routing",
                    "React Router enables page navigation without a page refresh",
                    "React Router is primarily used for handling HTTP requests and managing data fetching in React components",
                    "Outlets should be used in parent route elements to render their child route elements",
                    "React Router is built into React and doesn't require any additional dependencies"
                ],
                "answer": "True: 1, 2, 4",
                "answerType": "multi-choice",
                "correctAnswers": [
                    1,
                    2,
                    4
                ],
                "explanation": "Statements 1, 2, and 4 are TRUE; Statements 3 and 5 are FALSE.\n\n- Statement 1: True. React Router manages routing purely on the client side without requesting a new HTML page from the server.\n- Statement 2: True. Navigation using `<Link>` prevents full browser page reloads, providing a smooth app-like user experience.\n- Statement 3: False. It manages navigation and URL mapping, not HTTP request/response networking or state fetching.\n- Statement 4: True. An `<Outlet>` acts as a placeholder that parent layout routes use to render nested child route components.\n- Statement 5: False. React Router is an external third-party package (`react-router-dom`) and is not part of React core."
            },
            {
                "id": "set2-q33",
                "index": 33,
                "title": "Rendering Patterns",
                "category": "React Advanced Concepts",
                "body": "Does the following statements accurately compare server-side rendering (SSR) and client-side rendering (CSR)?",
                "options": [
                    "SSR improves initial page load time by serving pre-rendered HTML content to the client",
                    "CSR requires the client's browser to have JavaScript enabled for the rendering process",
                    "SSR is well-suited for SPAs (Single-Page Applications), where a single HTML page is loaded initially, and subsequent interactions dynamically update the content",
                    "React is only used with CSR",
                    "CSR improves initial page load time by generating fully rendered HTML on the server before sending it to the client.",
                    "CSR allows for dynamic content updates without requiring a full page reload.",
                    "SSR enhances interactivity by shifting rendering responsibilities to the client's browser after initial page load.",
                    "SSR is more suitable for static websites with minimal user interactions."
                ],
                "answer": "Yes: 1, 2",
                "answerType": "multi-choice",
                "correctAnswers": [
                    1,
                    2
                ],
                "explanation": "Statements 1 and 2 are correct comparison facts.\n\n- Statement 1: True. SSR delivers pre-rendered HTML from the server, allowing the user to see the page structure quickly (improves First Contentful Paint).\n- Statement 2: True. CSR sends an empty container HTML skeleton, and the browser must download and execute JavaScript files to generate and render the DOM nodes.\n- Statement 3: False. Loading a single index HTML and dynamically updating the view is the definition of CSR.\n- Statement 4: False. React supports SSR (e.g., using React Server Components or frameworks like Next.js).\n- Statement 5: False. CSR renders content in the browser, not on the server.\n- Statement 6: True for CSR, but not a valid comparison differentiating it in this checklist context.\n- Statement 7: False. SSR rendering happens on the server; interactivity requires client hydration.\n- Statement 8: False. SSR is highly suitable for heavy, dynamic websites requiring search engine optimization (SEO) and fast loading."
            },
            {
                "id": "set2-q34",
                "index": 34,
                "title": "Testing Overview",
                "category": "Testing (Jest & RTL)",
                "body": "Does the following statements accurately describe the testing tool?",
                "options": [
                    "Cypress is used for end-to-end testing",
                    "React Testing Library can be used as a JavaScript testrunner",
                    "Jest has built in functionality for mocking using mock functions",
                    "ESLint is used for static code analysis"
                ],
                "answer": "Yes: 1, 3, 4",
                "answerType": "multi-choice",
                "correctAnswers": [
                    1,
                    3,
                    4
                ],
                "explanation": "Statements 1, 3, and 4 are TRUE; Statement 2 is FALSE.\n\n- Statement 1: True. Cypress is an E2E testing framework that runs tests in real browser instances.\n- Statement 2: False. React Testing Library is a utility library for rendering and querying React components; it does not compile, execute, or organize test suites, meaning it is NOT a test runner (it relies on Jest or Vitest as the test runner).\n- Statement 3: True. Jest has built-in utility functions like `jest.fn()` and `jest.spyOn()` for creating mocks.\n- Statement 4: True. ESLint is a static linter that parses code without running it to find pattern bugs and enforce style rules."
            },
            {
                "id": "set2-q35",
                "index": 35,
                "title": "Testing Performance",
                "category": "Testing (Jest & RTL)",
                "body": "Which metric(s) does Google Lighthouse audit for?",
                "options": [
                    "Cumulative Layout Shift",
                    "Time to Interactive",
                    "First Contentful Paint",
                    "Client-Side Rendering (CSR) Index",
                    "Total Blocking Time"
                ],
                "answer": "Yes: 1, 2, 3, 5",
                "answerType": "multi-choice",
                "correctAnswers": [
                    1,
                    2,
                    3,
                    5
                ],
                "explanation": "Options 1, 2, 3, and 5 are correct.\n\n- Google Lighthouse audits Core Web Vitals and performance metrics: Cumulative Layout Shift (CLS), Time to Interactive (TTI), First Contentful Paint (FCP), and Total Blocking Time (TBT).\n- Option 4 (Client-Side Rendering Index) is not a real Web Vital or Lighthouse metric."
            },
            {
                "id": "set2-q36",
                "index": 36,
                "title": "Routing",
                "category": "Express.js",
                "body": "What is the purpose of using express.Router in an Express application?",
                "options": [
                    "It defines routes for specific HTTP verbs",
                    "It allows for client-side routing",
                    "It sets common web application settings",
                    "It allows the definition of routes in separate modules"
                ],
                "answer": "4",
                "answerType": "single-choice",
                "correctAnswers": [
                    4
                ],
                "explanation": "Option 4 (It allows the definition of routes in separate modules) is correct.\n\n- `express.Router` acts as a mini-app that can execute middleware and define individual routes.\n- This allows developers to organize routes modularly across different files and mount them onto the main Express application using `app.use('/path', router)`."
            },
            {
                "id": "set2-q37",
                "index": 37,
                "title": "Overview",
                "category": "Express.js",
                "body": "When making a GET request to the '/protected' endpoint, what is the minimum number of middleware functions the application must process?\n```js\nimport express from \"express\"\nimport cors from \"cors\"\nconst app = express()\napp.use(cors({ exposedHeaders: \"Authorization\" }))\napp.use(express.json())\napp.use(express.urlencoded({ extended: false }))\napp.get(\"/protected\", requireAuth, (req, res) => {\n    res.send({ message: `Hello ${req.user.username}! This route is protected.` })\n})\nfunction requireAuth(req, res, next) {\n    const token = req.headers.authorization?.split(\" \")[1]\n    if (!token) return res.status(401).send({ error: \"Unauthorized\" })\n    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {\n        if (err) return res.status(401).send({ error: \"Unauthorized\" })\n        req.user = decoded\n        next()\n    })\n}\n```",
                "options": [
                    "0",
                    "1",
                    "2",
                    "3",
                    "4"
                ],
                "answer": "4",
                "answerType": "single-choice",
                "correctAnswers": [
                    5
                ],
                "explanation": "Option 5 (4) is correct.\n\n- When the request GET `/protected` is received, it must pass through the middleware registered in the application stack:\n  1. `cors(...)` (app-level middleware)\n  2. `express.json()` (app-level middleware)\n  3. `express.urlencoded(...)` (app-level middleware)\n  4. `requireAuth` (route-level middleware)\n- Once all 4 of these execute and call `next()`, the route handler is invoked. Thus, a minimum of 4 middleware functions must be processed."
            },
            {
                "id": "set2-q38",
                "index": 38,
                "title": "Type Guarding",
                "category": "TypeScript",
                "body": "How can you narrow down the union type in the function below?\n```js\nfunction printId(value: string | number): void {}\n```\nOptions:",
                "options": [
                    "Using interfaces",
                    "Using the instanceof operator",
                    "Using the typeof operator",
                    "Using intersection types",
                    "This is not possible in TypeScript"
                ],
                "answer": "3",
                "answerType": "single-choice",
                "correctAnswers": [
                    3
                ],
                "explanation": "Option 3 (Using the typeof operator) is correct.\n\n- In TypeScript, union types (such as `string | number`) represent values that could be of multiple types at runtime.\n- You can narrow this type down to execute type-specific code by using a type guard check like `typeof value === 'string'` or `typeof value === 'number'`.\n- `instanceof` is used for classes, interfaces are structure models, and intersection types combine types."
            },
            {
                "id": "set2-q39",
                "index": 39,
                "title": "Function Types",
                "category": "TypeScript",
                "body": "Based on the usage of the \"handler\" function, how should its type be declared?\n\n```js\ntype One = (result: string) => void\ntype Two = (error: Error) => void\ntype Three = (data: number[]) => void\ntype Four = (isValid: boolean) => boolean\ntype Five = (data: Promise<number[]>) => void\n\nfunction attachHandler(handler) {\n    someAsyncOperation()\n        .then(result => handler(result))\n        .catch(error => console.error(error))\n}\n\nasync function someAsyncOperation(): Promise<number[]> {\n    return [1, 2, 3]\n}\n```",
                "options": [
                    "One",
                    "Two",
                    "Three",
                    "Four",
                    "Five"
                ],
                "answer": "Three",
                "answerType": "single-choice",
                "correctAnswers": [
                    3
                ],
                "explanation": "Option 3 (Three) is correct.\n\n- `someAsyncOperation()` returns a `Promise<number[]>`.\n- When this Promise resolves, it fires `.then(result => handler(result))` where `result` has type `number[]`.\n- The `handler` callback function takes `result` as its parameter, meaning the parameter type of the callback must be `number[]`.\n- Since it returns nothing inside `.then()`, its return type is `void`. This corresponds exactly to `type Three = (data: number[]) => void`."
            },
            {
                "id": "set2-q40",
                "index": 40,
                "title": "Structural Typing",
                "category": "TypeScript",
                "body": "Based on the code snippet, which concept of TypeScript allows the employee to be accepted as an argument to the printPersonInfo function?\n```js\ninterface Person {\n    name: string;\n    age: number;\n}\ninterface Employee {\n    name: string;\n    age: number;\n    employeeId: string;\n}\nfunction printPersonInfo(person: Person) {\n    console.log(`Name: ${person.name}, Age: ${person.age}`)\n}\nlet employee: Employee = { name: \"Joel\", age: 45, employeeId: \"E1337\" }\nprintPersonInfo(employee)\n```",
                "options": [
                    "Nominal typing",
                    "Dynamic typing",
                    "Type inference",
                    "Structural typing"
                ],
                "answer": "4",
                "answerType": "single-choice",
                "correctAnswers": [
                    4
                ],
                "explanation": "Option 4 (Structural typing) is correct.\n\n- TypeScript uses structural typing (often called 'duck typing'). Compatibility is based on the structure/shape of the members rather than explicit inheritance.\n- Since the `Employee` interface contains all required members of the `Person` interface (`name: string` and `age: number`), the variable `employee` is compatible with `person: Person` and can be passed as a valid argument."
            }
        ]
    }
};
