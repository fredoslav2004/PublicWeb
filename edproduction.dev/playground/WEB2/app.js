// ==========================================================================
// Fakeflow Lockdown Browser Practice App Logic
// Handles: State, Timer, Navigation, Widget Draggability, Drawing Canvas, 
//          Calculator, Safe Tokenized Highlighting, Option Disallowing,
//          Post-it Sticky Notes, Fullscreen Overview Dashboard.
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    // --- Application State ---
    let currentExamId = "set2"; // default
    let currentQuestions = [];
    let currentQuestionIdx = 0;
    
    // Core Exam Progress Data
    let userAnswers = {};        // questionId -> Array of selected option numbers OR string text
    let flaggedQuestions = new Set(); // questionId
    let crossedOutOptions = {};  // questionId -> Array of disallowed option numbers
    let isPracticeMode = true;
    
    // Timer States
    let timerInterval = null;
    let examTimeRemaining = 0; // seconds
    let systemClockInterval = null;

    // --- DOM Elements ---
    const loginScreen = document.getElementById("login-screen");
    const countdownScreen = document.getElementById("countdown-screen");
    const flowScreen = document.getElementById("flow-screen");
    const fullscreenOverviewScreen = document.getElementById("fullscreen-overview-screen");
    const submissionScreen = document.getElementById("submission-screen");
    const resultsScreen = document.getElementById("results-screen");

    // Login Form Elements
    const btnEnterFlow = document.getElementById("btn-enter-flow");
    const btnCloseBrowser = document.getElementById("btn-close-browser");
    const examSelect = document.getElementById("exam-select");
    const modeSelect = document.getElementById("mode-select");

    // Countdown Elements
    const btnSkipCountdown = document.getElementById("btn-skip-countdown");
    const cdH = document.getElementById("cd-h");
    const cdM = document.getElementById("cd-m");
    const cdS = document.getElementById("cd-s");

    // Flow Header Elements
    const btnSettings = document.getElementById("btn-settings");
    const btnExit = document.getElementById("btn-exit");
    const btnFlowDescription = document.getElementById("btn-flow-description");
    const btnGoToSubmission = document.getElementById("btn-go-to-submission");
    const currentClockTimeDisplay = document.getElementById("current-clock-time");

    // Flow Subheader Elements
    const paperDisplayTitle = document.getElementById("paper-display-title");
    const timerLeftDisplay = document.getElementById("timer-left-display");
    const timerLabelEnds = document.getElementById("timer-label-ends");
    const btnPauseParticipation = document.getElementById("btn-pause-participation");
    const btnToggleSidebar = document.getElementById("btn-toggle-sidebar");
    const flowRightPane = document.getElementById("flow-right-pane");
    const saveStatusText = document.getElementById("save-status-text");
    const pulseIndicator = document.querySelector(".pulse-indicator");

    // Left Pane (Question Workspace)
    const questionIndexDisplay = document.getElementById("question-index-display");
    const questionCategoryDisplay = document.getElementById("question-category-display");
    const questionBodyContent = document.getElementById("question-body-content");
    const questionInputsContainer = document.getElementById("question-inputs");
    const btnCheckAnswer = document.getElementById("btn-check-answer");
    const practiceFeedbackPanel = document.getElementById("practice-feedback-panel");
    const practiceFeedbackMessage = document.getElementById("practice-feedback-message");
    const btnPracticeReveal = document.getElementById("btn-practice-reveal");
    const practiceAnswerExplanation = document.getElementById("practice-answer-explanation");
    const practiceControlBar = document.getElementById("practice-control-bar");

    // Sticky Footer Navigation
    const btnPrevQuestion = document.getElementById("btn-prev-question");
    const btnFooterOverview = document.getElementById("btn-footer-overview");
    const btnNextQuestion = document.getElementById("btn-next-question");

    // Right Pane (Sidebar Options)
    const btnFlag = document.getElementById("btn-flag");
    const flagText = document.getElementById("flag-text");

    // Sidebar Vertical Strip buttons
    const btnShowOverviewWidget = document.getElementById("btn-show-overview-widget");
    const btnShowCalculator = document.getElementById("btn-show-calculator");
    const btnShowScratchpad = document.getElementById("btn-show-scratchpad");
    const btnShowCanvas = document.getElementById("btn-show-canvas");
    const btnShowSticky = document.getElementById("btn-show-sticky");
    const btnShowFormulas = document.getElementById("btn-show-formulas");
    const btnTextSizeMinus = document.getElementById("btn-text-size-minus");
    const btnTextSizePlus = document.getElementById("btn-text-size-plus");

    // Playground DOM Elements
    const btnShowPlayground = document.getElementById("btn-show-playground");
    const playgroundWidget = document.getElementById("playground-widget");
    const playgroundCodeInput = document.getElementById("playground-code-input");
    const playgroundConsole = document.getElementById("playground-console");
    const btnRunCode = document.getElementById("btn-run-code");
    const btnClearConsole = document.getElementById("btn-clear-console");
    const editorGutter = document.getElementById("editor-gutter");
    const lessonSelect = document.getElementById("lesson-select");
    const lessonContentArea = document.getElementById("lesson-content-area");
    const hacksListContainer = document.getElementById("hacks-list-container");

    // Fullscreen Overview Dashboard Elements
    const btnCloseOverview = document.getElementById("btn-close-overview");
    const btnOverviewBack = document.getElementById("btn-overview-back");
    const btnOverviewSubmission = document.getElementById("btn-overview-submission");
    const fullscreenOverviewGrid = document.getElementById("fullscreen-overview-grid");

    // Floating Widgets
    const calculatorWidget = document.getElementById("calculator-widget");
    const scratchpadWidget = document.getElementById("scratchpad-widget");
    const canvasWidget = document.getElementById("canvas-widget");
    const scratchpadTextarea = document.getElementById("scratchpad-textarea");

    // Modals
    const settingsDialog = document.getElementById("settings-dialog");
    const flowDescriptionDialog = document.getElementById("flow-description-dialog");
    const formulaSheetDialog = document.getElementById("formula-sheet-dialog");
    const btnToggleFullscreen = document.getElementById("btn-toggle-fullscreen");

    // Submission Elements
    const summaryTotalQuestions = document.getElementById("summary-total-questions");
    const summaryAnsweredQuestions = document.getElementById("summary-answered-questions");
    const summaryFlaggedQuestions = document.getElementById("summary-flagged-questions");
    const summaryUnansweredQuestions = document.getElementById("summary-unanswered-questions");
    const submissionQuestionsList = document.getElementById("submission-questions-list");
    const btnBackToExam = document.getElementById("btn-back-to-exam");
    const btnSubmitExam = document.getElementById("btn-submit-exam");

    // Results Elements
    const resultsScorePct = document.getElementById("results-score-pct");
    const resultsScoreFraction = document.getElementById("results-score-fraction");
    const resultsVerdict = document.getElementById("results-verdict");
    const resultsDetailsText = document.getElementById("results-details-text");
    const resultsReviewList = document.getElementById("results-review-list");
    const btnRetakeExam = document.getElementById("btn-retake-exam");
    const btnExitToLogin = document.getElementById("btn-exit-to-login");

    // --- System Clock Implementation ---
    function startSystemClock() {
        if (systemClockInterval) clearInterval(systemClockInterval);
        const updateClock = () => {
            const now = new Date();
            const hrs = String(now.getHours()).padStart(2, '0');
            const mins = String(now.getMinutes()).padStart(2, '0');
            currentClockTimeDisplay.textContent = `${hrs}:${mins}`;
        };
        updateClock();
        systemClockInterval = setInterval(updateClock, 1000);
    }

    // --- Draggable Helpers (Generic) ---
    function makeWidgetDraggable(widget, handle) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        handle.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e = e || window.event;
            if (e.button !== 0) return; // Left click only
            
            // Bring dragged element to top
            document.querySelectorAll(".floating-widget, .sticky-note").forEach(w => w.style.zIndex = 499);
            widget.style.zIndex = 500;
            
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            
            let newTop = widget.offsetTop - pos2;
            let newLeft = widget.offsetLeft - pos1;
            
            // Bounds check
            if (newTop < 50) newTop = 50;
            if (newTop > window.innerHeight - 40) newTop = window.innerHeight - 40;
            if (newLeft < 0) newLeft = 0;
            if (newLeft > window.innerWidth - widget.clientWidth) newLeft = window.innerWidth - widget.clientWidth;
            
            widget.style.top = newTop + "px";
            widget.style.left = newLeft + "px";
            widget.style.right = "auto";
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    // Initialize draggability on sidebar panels
    makeWidgetDraggable(calculatorWidget, calculatorWidget.querySelector(".widget-header"));
    makeWidgetDraggable(scratchpadWidget, scratchpadWidget.querySelector(".widget-header"));
    makeWidgetDraggable(canvasWidget, canvasWidget.querySelector(".widget-header"));
    makeWidgetDraggable(playgroundWidget, playgroundWidget.querySelector(".widget-header"));

    // Close buttons on widgets
    document.querySelectorAll(".widget-close").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const widget = e.target.closest(".floating-widget");
            widget.classList.add("hidden");
            
            if (widget.id === "calculator-widget") btnShowCalculator.classList.remove("active");
            if (widget.id === "scratchpad-widget") btnShowScratchpad.classList.remove("active");
            if (widget.id === "canvas-widget") btnShowCanvas.classList.remove("active");
            if (widget.id === "playground-widget") btnShowPlayground.classList.remove("active");
        });
    });

    // Toggle widgets
    btnShowCalculator.addEventListener("click", () => {
        calculatorWidget.classList.toggle("hidden");
        btnShowCalculator.classList.toggle("active");
        if (!calculatorWidget.classList.contains("hidden")) {
            calculatorWidget.style.top = "150px";
            calculatorWidget.style.left = (window.innerWidth - 300) + "px";
        }
    });

    btnShowScratchpad.addEventListener("click", () => {
        scratchpadWidget.classList.toggle("hidden");
        btnShowScratchpad.classList.toggle("active");
        if (!scratchpadWidget.classList.contains("hidden")) {
            scratchpadWidget.style.top = "180px";
            scratchpadWidget.style.left = (window.innerWidth - 320) + "px";
        }
    });

    btnShowCanvas.addEventListener("click", () => {
        canvasWidget.classList.toggle("hidden");
        btnShowCanvas.classList.toggle("active");
        if (!canvasWidget.classList.contains("hidden")) {
            canvasWidget.style.top = "210px";
            canvasWidget.style.left = (window.innerWidth - 340) + "px";
            resizeCanvas();
        }
    });

    btnShowPlayground.addEventListener("click", () => {
        playgroundWidget.classList.toggle("hidden");
        btnShowPlayground.classList.toggle("active");
        if (!playgroundWidget.classList.contains("hidden")) {
            playgroundWidget.style.top = "100px";
            playgroundWidget.style.left = (window.innerWidth - 620) + "px";
            document.querySelectorAll(".floating-widget, .sticky-note").forEach(w => w.style.zIndex = 499);
            playgroundWidget.style.zIndex = 500;
            updateGutter();
        }
    });

    // Spawner for Yellow Sticky Notes
    btnShowSticky.addEventListener("click", () => {
        spawnStickyNote();
    });

    function spawnStickyNote(text = "") {
        const note = document.createElement("div");
        note.className = "sticky-note";
        
        const offset = document.querySelectorAll(".sticky-note").length * 15;
        note.style.top = (150 + offset) + "px";
        note.style.left = (200 + offset) + "px";
        
        note.innerHTML = `
            <div class="sticky-header">
                <span class="sticky-drag-handle">Sticky Note</span>
                <button class="sticky-delete">&times;</button>
            </div>
            <textarea class="sticky-content" placeholder="Write sticky memo...">${text}</textarea>
        `;
        
        const handle = note.querySelector(".sticky-header");
        makeWidgetDraggable(note, handle);
        
        note.querySelector(".sticky-delete").addEventListener("click", () => {
            note.remove();
        });
        
        note.addEventListener("mousedown", () => {
            document.querySelectorAll(".floating-widget, .sticky-note").forEach(w => w.style.zIndex = 499);
            note.style.zIndex = 500;
        });

        document.body.appendChild(note);
    }

    // --- Text Resizing ---
    let textSizeState = 1; // 0=small, 1=medium, 2=large
    const textSizes = ["font-size-small", "font-size-medium", "font-size-large"];
    
    function updateTextSize() {
        const appContainer = document.getElementById("app");
        textSizes.forEach(cls => appContainer.classList.remove(cls));
        appContainer.classList.add(textSizes[textSizeState]);
    }
    
    btnTextSizeMinus.addEventListener("click", () => {
        if (textSizeState > 0) {
            textSizeState--;
            updateTextSize();
        }
    });
    
    btnTextSizePlus.addEventListener("click", () => {
        if (textSizeState < 2) {
            textSizeState++;
            updateTextSize();
        }
    });

    // --- Calculator Engine ---
    const calcDisplay = document.getElementById("calc-display");
    let calcExpression = "";
    
    document.querySelectorAll(".calc-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const val = btn.textContent;
            if (val === "C") {
                calcExpression = "";
                calcDisplay.value = "";
            } else if (val === "=") {
                try {
                    const result = Function('"use strict";return (' + calcExpression + ')')();
                    calcDisplay.value = result;
                    calcExpression = String(result);
                } catch (err) {
                    calcDisplay.value = "Error";
                    calcExpression = "";
                }
            } else {
                calcExpression += val;
                calcDisplay.value = calcExpression;
            }
        });
    });

    // --- Scratchpad Canvas Drawing Engine ---
    const canvas = document.getElementById("drawing-canvas");
    const canvasClear = document.getElementById("canvas-clear");
    const canvasColor = document.getElementById("canvas-color");
    const canvasBrushSize = document.getElementById("canvas-brush-size");
    const ctx = canvas.getContext("2d");
    let isDrawing = false;

    function resizeCanvas() {
        const temp = ctx.getImageData(0, 0, canvas.width, canvas.height);
        canvas.width = 256;
        canvas.height = 180;
        ctx.putImageData(temp, 0, 0);
    }

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", drawLine);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);

    // Touch support for Drawing Canvas
    canvas.addEventListener("touchstart", (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        isDrawing = true;
        ctx.beginPath();
        ctx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
    });
    canvas.addEventListener("touchmove", (e) => {
        e.preventDefault();
        if (!isDrawing) return;
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
        ctx.strokeStyle = canvasColor.value;
        ctx.lineWidth = canvasBrushSize.value;
        ctx.lineCap = "round";
        ctx.stroke();
    });
    canvas.addEventListener("touchend", stopDrawing);

    function startDrawing(e) {
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        ctx.beginPath();
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    }

    function drawLine(e) {
        if (!isDrawing) return;
        const rect = canvas.getBoundingClientRect();
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.strokeStyle = canvasColor.value;
        ctx.lineWidth = canvasBrushSize.value;
        ctx.lineCap = "round";
        ctx.stroke();
    }

    function stopDrawing() {
        isDrawing = false;
        ctx.closePath();
    }

    canvasClear.addEventListener("click", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    // --- Dialog Modal Handlers ---
    btnSettings.addEventListener("click", () => settingsDialog.showModal());
    btnFlowDescription.addEventListener("click", () => flowDescriptionDialog.showModal());
    btnShowFormulas.addEventListener("click", () => formulaSheetDialog.showModal());

    document.querySelectorAll(".dialog-close-x, .dialog-close-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.target.closest("dialog").close();
        });
    });

    // Fullscreen simulation
    btnToggleFullscreen.addEventListener("click", () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
                .then(() => btnToggleFullscreen.textContent = "Exit Fullscreen")
                .catch(err => alert(`Error entering fullscreen: ${err.message}`));
        } else {
            document.exitFullscreen()
                .then(() => btnToggleFullscreen.textContent = "Enter Fullscreen");
        }
    });

    // Sidebar hide/show toggle
    btnToggleSidebar.addEventListener("click", () => {
        flowRightPane.classList.toggle("collapsed");
        const arrow = btnToggleSidebar.querySelector(".arrow-toggle");
        arrow.classList.toggle("rotated");
        const isCollapsed = flowRightPane.classList.contains("collapsed");
        btnToggleSidebar.querySelector("span").textContent = isCollapsed ? "Show sidebar" : "Hide sidebar";
    });

    // Pause participation click handler
    btnPauseParticipation.addEventListener("click", () => {
        alert("Participation paused. The timer continues running in Lockdown Browser simulation.");
    });

    // --- Screen Transitions & Gate Logic ---
    btnCloseBrowser.addEventListener("click", () => {
        alert("Lockdown browser practice closed. You can close this tab.");
    });

    // Enter Flow Gate
    btnEnterFlow.addEventListener("click", () => {
        loginScreen.classList.remove("active");
        countdownScreen.classList.add("active");
        startCountdownFlow();
    });

    // Exit flow back to login
    btnExit.addEventListener("click", () => {
        if (confirm("Are you sure you want to exit the exam? Your temporary progress will be lost.")) {
            resetExamSession();
            flowScreen.classList.remove("active");
            loginScreen.classList.add("active");
        }
    });

    btnExitToLogin.addEventListener("click", () => {
        resetExamSession();
        resultsScreen.classList.remove("active");
        loginScreen.classList.add("active");
    });

    // Countdown timer mechanics
    let countdownVal = 3;
    let countdownInterval = null;

    function startCountdownFlow() {
        countdownVal = 3;
        cdH.textContent = "00";
        cdM.textContent = "00";
        cdS.textContent = "03";
        
        if (countdownInterval) clearInterval(countdownInterval);
        
        countdownInterval = setInterval(() => {
            countdownVal--;
            cdS.textContent = String(countdownVal).padStart(2, '0');
            
            if (countdownVal <= 0) {
                clearInterval(countdownInterval);
                enterFlowExamInterface();
            }
        }, 1000);
    }

    btnSkipCountdown.addEventListener("click", () => {
        if (countdownInterval) clearInterval(countdownInterval);
        enterFlowExamInterface();
    });

    // --- Exam Setup & Interface ---
    function enterFlowExamInterface() {
        loginScreen.classList.remove("active");
        countdownScreen.classList.remove("active");
        fullscreenOverviewScreen.classList.remove("active");
        flowScreen.classList.add("active");

        currentExamId = examSelect.value;
        isPracticeMode = (modeSelect.value === "practice");
        
        const examSet = EXAM_SETS[currentExamId];
        currentQuestions = examSet.questions;
        currentQuestionIdx = 0;

        // Reset tracking structures
        userAnswers = {};
        flaggedQuestions.clear();
        crossedOutOptions = {};

        // Title displays
        paperDisplayTitle.textContent = `Title: ${examSet.title}`;
        
        // Mode adaptations
        if (isPracticeMode) {
            practiceControlBar.classList.remove("hidden");
            timerLabelEnds.textContent = "Practice mode session elapsed:";
            examTimeRemaining = 0; // counts up in practice mode
            startTimer(true);
        } else {
            practiceControlBar.classList.add("hidden");
            practiceFeedbackPanel.classList.add("hidden");
            timerLabelEnds.textContent = "Flow ends at scheduled duration:";
            examTimeRemaining = currentQuestions.length * 3 * 60; // 3 minutes per question
            startTimer(false);
        }

        startSystemClock();
        renderQuestion(currentQuestionIdx);
        saveStatusBlink("Exam started successfully");
    }

    function resetExamSession() {
        if (timerInterval) clearInterval(timerInterval);
        if (systemClockInterval) clearInterval(systemClockInterval);
        userAnswers = {};
        flaggedQuestions.clear();
        crossedOutOptions = {};
        currentQuestions = [];
        currentQuestionIdx = 0;
        scratchpadTextarea.value = "";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        calcExpression = "";
        calcDisplay.value = "";
        document.querySelectorAll(".sticky-note").forEach(n => n.remove());
        
        saveStatusText.textContent = "Saved in FAKEFLOW";
        pulseIndicator.style.backgroundColor = "var(--color-success)";
    }

    // --- Timer Mechanism ---
    function startTimer(isPractice) {
        if (timerInterval) clearInterval(timerInterval);
        
        const formatTime = (secs) => {
            const h = String(Math.floor(secs / 3600)).padStart(2, '0');
            const m = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
            const s = String(secs % 60).padStart(2, '0');
            return `${h}:${m}:${s}`;
        };

        if (isPractice) {
            timerLeftDisplay.textContent = formatTime(examTimeRemaining);
            timerLeftDisplay.classList.remove("countdown-warning");
            
            timerInterval = setInterval(() => {
                examTimeRemaining++;
                timerLeftDisplay.textContent = formatTime(examTimeRemaining);
            }, 1000);
        } else {
            timerLeftDisplay.textContent = `Time left: ${formatTime(examTimeRemaining)}`;
            
            timerInterval = setInterval(() => {
                examTimeRemaining--;
                timerLeftDisplay.textContent = `Time left: ${formatTime(examTimeRemaining)}`;
                
                if (examTimeRemaining <= 300) {
                    timerLeftDisplay.classList.add("countdown-warning");
                } else {
                    timerLeftDisplay.classList.remove("countdown-warning");
                }
                
                if (examTimeRemaining <= 0) {
                    clearInterval(timerInterval);
                    alert("Time has run out! Submitting your exam automatically.");
                    forceSubmitExam();
                }
            }, 1000);
        }
    }

    function saveStatusBlink(message = "The paper is saved in FAKEFLOW") {
        saveStatusText.textContent = message;
        pulseIndicator.style.backgroundColor = "var(--color-olive-light)";
        
        setTimeout(() => {
            saveStatusText.textContent = "Saved in FAKEFLOW";
            pulseIndicator.style.backgroundColor = "var(--color-success)";
        }, 1200);
    }

    // --- HTML Escaping Helper ---
    function escapeHTML(str) {
        if (!str) return "";
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }

    // --- Safe Tokenized Highlighter (Token-by-Token Match) ---
    function highlightJS(code) {
        if (!code) return "";
        let escaped = escapeHTML(code);
        
        // Single regex pass to tokenize comments, strings, keywords, numbers without overlaps
        const tokenRegex = /(\/\/.*)|("[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*'|`[^`\\]*(?:\\.[^`\\]*)*`)|\b(let|const|var|function|return|if|else|true|false|async|await|new|type|class|extends|import|from|typeof|instanceof)\b|\b(\d+)\b/g;
        
        return escaped.replace(tokenRegex, (match, comment, string, keyword, number) => {
            if (comment) return `<span class="hl-comment">${match}</span>`;
            if (string) return `<span class="hl-string">${match}</span>`;
            if (keyword) return `<span class="hl-keyword">${match}</span>`;
            if (number) return `<span class="hl-number">${match}</span>`;
            return match;
        });
    }

    // --- Custom Markdown Parser (Token placeholder strategy for code blocks) ---
    function parseMarkdownToHTML(markdown) {
        if (!markdown) return "";
        let text = markdown;
        
        // 1. Extract code blocks and store raw code to prevent double-escaping
        const codeBlocks = [];
        text = text.replace(/```(?:js|ts|javascript|typescript)?\n([\s\S]*?)```/g, (match, code) => {
            const placeholder = `__CODE_BLOCK_${codeBlocks.length}__`;
            codeBlocks.push(code);
            return placeholder;
        });

        // 2. Escape HTML tags in the text
        text = escapeHTML(text);

        // 3. Process inline code (before other formatting to prevent clashes)
        const inlineCodes = [];
        text = text.replace(/`([^`]+)`/g, (match, inline) => {
            const placeholder = `__INLINE_CODE_${inlineCodes.length}__`;
            inlineCodes.push(inline);
            return placeholder;
        });

        // Bold text
        text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

        // List items and paragraphs
        const blocks = text.split(/\n\n+/);
        const processedBlocks = blocks.map(block => {
            const trimmed = block.trim();
            // If block is just a placeholder for a code block, keep it intact
            if (/^__CODE_BLOCK_\d+__$/.test(trimmed)) return block;

            if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
                const items = trimmed.split(/\n\s*[-*]\s+/).filter(Boolean);
                return '<ul>' + items.map(item => `<li>${item}</li>`).join('') + '</ul>';
            }
            if (/^\d+\.\s+/.test(trimmed)) {
                const items = trimmed.split(/\n\s*\d+\.\s+/).filter(Boolean);
                return '<ol>' + items.map(item => `<li>${item}</li>`).join('') + '</ol>';
            }
            
            return `<p>${trimmed.replace(/\n/g, "<br>")}</p>`;
        });
        
        text = processedBlocks.join("\n");

        // 4. Restore and highlight code blocks
        codeBlocks.forEach((code, index) => {
            const highlighted = highlightJS(code);
            if (!window.activeQuestionCodeBlocks) {
                window.activeQuestionCodeBlocks = [];
            }
            const blockIndex = window.activeQuestionCodeBlocks.length;
            window.activeQuestionCodeBlocks.push(code);
            
            const btnHtml = `<button class="btn-run-in-playground" data-code-index="${blockIndex}">Run in Playground 🧪</button>`;
            
            text = text.replace(`__CODE_BLOCK_${index}__`, `
                <div class="code-block-wrapper">
                    ${btnHtml}
                    <pre class="javascript-code"><code>${highlighted}</code></pre>
                </div>
            `);
        });

        // 5. Restore inline code blocks
        inlineCodes.forEach((inline, index) => {
            const escapedInline = escapeHTML(inline);
            text = text.replace(`__INLINE_CODE_${index}__`, `<code class="inline-code">${escapedInline}</code>`);
        });

        return text;
    }

    // --- Render Question Workspace ---
    function renderQuestion(idx) {
        const q = currentQuestions[idx];
        
        questionIndexDisplay.textContent = `Question ${idx + 1} of ${currentQuestions.length}`;
        questionCategoryDisplay.textContent = q.category;
        
        // Reset code blocks array for this question
        window.activeQuestionCodeBlocks = [];
        
        // Render body
        questionBodyContent.innerHTML = parseMarkdownToHTML(q.body);
        
        // Bind click events on the newly rendered buttons
        questionBodyContent.querySelectorAll(".btn-run-in-playground").forEach(btn => {
            btn.addEventListener("click", () => {
                const codeIndex = parseInt(btn.dataset.codeIndex, 10);
                const code = window.activeQuestionCodeBlocks[codeIndex];
                if (code) {
                    loadCodeIntoSandbox(code);
                    executeSandboxCode(code);
                }
            });
        });
        
        // Clear inputs
        questionInputsContainer.innerHTML = "";
        practiceFeedbackPanel.classList.add("hidden");
        practiceAnswerExplanation.classList.add("hidden");
        btnPracticeReveal.classList.add("hidden");
        
        // Initialize crossed-out options structure
        if (!crossedOutOptions[q.id]) crossedOutOptions[q.id] = [];
        
        // Render specific inputs
        if (q.options) {
            q.options.forEach((opt, optIdx) => {
                const optNum = optIdx + 1;
                const optCard = document.createElement("div");
                optCard.className = "choice-option";
                
                const isSelected = userAnswers[q.id] && userAnswers[q.id].includes(optNum);
                const isCrossed = crossedOutOptions[q.id].includes(optNum);
                
                if (isSelected) optCard.classList.add("selected");
                if (isCrossed) optCard.classList.add("crossed-out");
                
                const inputType = q.answerType === "multi-choice" ? "checkbox" : "radio";
                
                optCard.innerHTML = `
                    <input type="${inputType}" name="q-option" id="opt-${optNum}" value="${optNum}" ${isSelected && !isCrossed ? 'checked' : ''} ${isCrossed ? 'disabled' : ''}>
                    <div class="choice-text">${optNum}. ${escapeHTML(opt)}</div>
                    <button class="btn-disallow-opt" title="Disallow / cross out option">
                        <svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:currentColor;"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>
                    </button>
                `;
                
                // Card click logic
                optCard.addEventListener("click", (e) => {
                    if (e.target.closest(".btn-disallow-opt")) return;
                    if (crossedOutOptions[q.id].includes(optNum)) return; // ignore crossed out options
                    
                    const input = optCard.querySelector("input");
                    if (e.target !== input) {
                        input.checked = !input.checked;
                        input.dispatchEvent(new Event("change"));
                    }
                });

                // Option input selection
                optCard.querySelector("input").addEventListener("change", (e) => {
                    handleChoiceSelection(q, optNum, e.target.checked);
                    renderQuestionSelectionState(q);
                });

                // Disallow / Crossout click handler
                optCard.querySelector(".btn-disallow-opt").addEventListener("click", (e) => {
                    e.stopPropagation();
                    toggleOptionDisallowed(q, optNum, optCard);
                });
                
                questionInputsContainer.appendChild(optCard);
            });
        } else {
            // Text area input
            const input = document.createElement("textarea");
            input.className = "free-text-input";
            input.placeholder = "Write your answer or explanation here...";
            input.value = userAnswers[q.id] || "";
            
            input.addEventListener("input", (e) => {
                userAnswers[q.id] = e.target.value;
                saveStatusBlink("Answer saved dynamically");
            });
            
            questionInputsContainer.appendChild(input);
        }

        // Adjust sidebar flag state
        if (flaggedQuestions.has(q.id)) {
            btnFlag.classList.add("flagged");
            flagText.textContent = "Question Flagged";
        } else {
            btnFlag.classList.remove("flagged");
            flagText.textContent = "Flag this question";
        }
        
        if (isPracticeMode) {
            btnCheckAnswer.classList.remove("hidden");
        } else {
            btnCheckAnswer.classList.add("hidden");
        }
    }

    function renderQuestionSelectionState(q) {
        const cards = questionInputsContainer.querySelectorAll(".choice-option");
        cards.forEach(card => {
            const input = card.querySelector("input");
            if (input && input.checked) {
                card.classList.add("selected");
            } else {
                card.classList.remove("selected");
            }
        });
    }

    function handleChoiceSelection(q, optNum, isChecked) {
        if (q.answerType === "multi-choice") {
            if (!userAnswers[q.id]) userAnswers[q.id] = [];
            
            if (isChecked) {
                if (!userAnswers[q.id].includes(optNum)) userAnswers[q.id].push(optNum);
            } else {
                userAnswers[q.id] = userAnswers[q.id].filter(num => num !== optNum);
            }
            if (userAnswers[q.id].length === 0) delete userAnswers[q.id];
        } else {
            if (isChecked) {
                userAnswers[q.id] = [optNum];
            } else {
                delete userAnswers[q.id];
            }
        }
        
        saveStatusBlink();
    }

    function toggleOptionDisallowed(q, optNum, card) {
        if (!crossedOutOptions[q.id]) crossedOutOptions[q.id] = [];
        
        const idx = crossedOutOptions[q.id].indexOf(optNum);
        const input = card.querySelector("input");
        
        if (idx === -1) {
            // Disallow it
            crossedOutOptions[q.id].push(optNum);
            card.classList.add("crossed-out");
            input.disabled = true;
            
            // Uncheck if checked
            if (input.checked) {
                input.checked = false;
                handleChoiceSelection(q, optNum, false);
                renderQuestionSelectionState(q);
            }
            saveStatusBlink("Option crossed out");
        } else {
            // Allow it back
            crossedOutOptions[q.id].splice(idx, 1);
            card.classList.remove("crossed-out");
            input.disabled = false;
            saveStatusBlink("Option restored");
        }
    }

    // --- Full-page Screen Overview Dashboard ---
    function renderFullscreenOverviewGrid() {
        fullscreenOverviewGrid.innerHTML = "";
        currentQuestions.forEach((q, idx) => {
            const btn = document.createElement("button");
            btn.className = "overview-btn";
            btn.dataset.id = q.id;
            btn.textContent = idx + 1;
            
            // Apply answered/flagged/active classes
            const hasAnswer = userAnswers[q.id] && (typeof userAnswers[q.id] === 'string' ? userAnswers[q.id].trim().length > 0 : userAnswers[q.id].length > 0);
            if (hasAnswer) {
                btn.classList.add("answered");
            }
            if (flaggedQuestions.has(q.id)) {
                btn.classList.add("flagged");
            }
            if (idx === currentQuestionIdx) {
                btn.classList.add("active");
            }
            
            btn.addEventListener("click", () => {
                currentQuestionIdx = idx;
                renderQuestion(currentQuestionIdx);
                hideFullscreenOverview();
            });
            
            fullscreenOverviewGrid.appendChild(btn);
        });
    }

    function showFullscreenOverview() {
        renderFullscreenOverviewGrid();
        flowScreen.classList.remove("active");
        fullscreenOverviewScreen.classList.add("active");
    }

    function hideFullscreenOverview() {
        fullscreenOverviewScreen.classList.remove("active");
        flowScreen.classList.add("active");
    }

    // Bind Overview events
    btnShowOverviewWidget.addEventListener("click", showFullscreenOverview);
    btnFooterOverview.addEventListener("click", showFullscreenOverview);
    btnCloseOverview.addEventListener("click", hideFullscreenOverview);
    btnOverviewBack.addEventListener("click", hideFullscreenOverview);
    
    btnOverviewSubmission.addEventListener("click", () => {
        fullscreenOverviewScreen.classList.remove("active");
        showSubmissionOverview();
    });

    // --- Navigation Controls ---
    btnPrevQuestion.addEventListener("click", () => {
        if (currentQuestionIdx > 0) {
            currentQuestionIdx--;
            renderQuestion(currentQuestionIdx);
        }
    });

    btnNextQuestion.addEventListener("click", () => {
        if (currentQuestionIdx < currentQuestions.length - 1) {
            currentQuestionIdx++;
            renderQuestion(currentQuestionIdx);
        } else {
            if (confirm("You are on the last question. Would you like to review and hand in the paper?")) {
                showSubmissionOverview();
            }
        }
    });

    // Flagging
    btnFlag.addEventListener("click", () => {
        const q = currentQuestions[currentQuestionIdx];
        if (flaggedQuestions.has(q.id)) {
            flaggedQuestions.delete(q.id);
            btnFlag.classList.remove("flagged");
            flagText.textContent = "Flag this question";
            saveStatusBlink("Flag removed");
        } else {
            flaggedQuestions.add(q.id);
            btnFlag.classList.add("flagged");
            flagText.textContent = "Question Flagged";
            saveStatusBlink("Question flagged");
        }
    });

    // --- Practice Mode Validate Logic ---
    btnCheckAnswer.addEventListener("click", () => {
        const q = currentQuestions[currentQuestionIdx];
        const studentAns = userAnswers[q.id];
        
        practiceFeedbackPanel.classList.remove("hidden");
        btnPracticeReveal.classList.remove("hidden");
        practiceAnswerExplanation.classList.add("hidden");
        
        if (!studentAns || studentAns.length === 0) {
            practiceFeedbackMessage.innerHTML = `<span class="text-danger">⚠️ You have not selected/written any answer yet.</span>`;
            return;
        }

        if (q.answerType === "single-choice" || q.answerType === "multi-choice") {
            const correct = q.correctAnswers;
            const isCorrect = Array.isArray(studentAns) && 
                              studentAns.length === correct.length &&
                              studentAns.every(val => correct.includes(val));
                              
            if (isCorrect) {
                practiceFeedbackMessage.innerHTML = `<span class="text-success">✔ Correct! Your answer matches the key.</span>`;
            } else {
                practiceFeedbackMessage.innerHTML = `<span class="text-danger">❌ Incorrect. Please review your selection.</span>`;
            }
        } else {
            practiceFeedbackMessage.innerHTML = `<span class="text-warning">ℹ️ Free text question. Click 'Show Explanation' below to compare your answer with the key.</span>`;
        }
    });

    btnPracticeReveal.addEventListener("click", () => {
        const q = currentQuestions[currentQuestionIdx];
        practiceAnswerExplanation.classList.remove("hidden");
        
        let correctDisplay = "";
        if (q.options) {
            if (q.answerType === "single-choice") {
                correctDisplay = `<strong>Correct Option:</strong> ${q.correctAnswers[0]} (${escapeHTML(q.options[q.correctAnswers[0]-1])})`;
            } else {
                correctDisplay = `<strong>Correct Options:</strong> ${q.correctAnswers.join(", ")}<br>` +
                                 q.correctAnswers.map(idx => `- ${escapeHTML(q.options[idx-1])}`).join("<br>");
            }
        } else {
            correctDisplay = `<strong>Correct Reference Answer:</strong>`;
        }
        
        let parsedExplanation = parseMarkdownToHTML(q.explanation || "");
        
        practiceAnswerExplanation.innerHTML = `
            <div style="margin-bottom: 8px;">${correctDisplay}</div>
            <div style="margin-top: 10px;"><strong>Official Key Text:</strong></div>
            <pre class="explanation-pre"><code>${escapeHTML(q.answer)}</code></pre>
            ${parsedExplanation ? `<div class="detailed-explanation-box mt-3" style="border-top:1px dashed var(--color-border); padding-top:10px;"><strong>Explanation:</strong><div class="explanation-content" style="color:var(--color-text-muted); font-size:0.95em; line-height:1.5; margin-top:6px;">${parsedExplanation}</div></div>` : ''}
        `;
    });

    // --- Submission Overview Screen ---
    btnGoToSubmission.addEventListener("click", () => {
        showSubmissionOverview();
    });

    btnBackToExam.addEventListener("click", () => {
        submissionScreen.classList.remove("active");
        flowScreen.classList.add("active");
    });

    function showSubmissionOverview() {
        flowScreen.classList.remove("active");
        submissionScreen.classList.add("active");

        const total = currentQuestions.length;
        let answered = 0;
        let flagged = flaggedQuestions.size;
        
        currentQuestions.forEach(q => {
            const hasAns = userAnswers[q.id] && (typeof userAnswers[q.id] === 'string' ? userAnswers[q.id].trim().length > 0 : userAnswers[q.id].length > 0);
            if (hasAns) answered++;
        });
        
        const unanswered = total - answered;

        summaryTotalQuestions.textContent = total;
        summaryAnsweredQuestions.textContent = answered;
        summaryFlaggedQuestions.textContent = flagged;
        summaryUnansweredQuestions.textContent = unanswered;

        // Render overview table
        submissionQuestionsList.innerHTML = "";
        currentQuestions.forEach((q, idx) => {
            const row = document.createElement("div");
            row.className = "submission-row";
            
            const hasAns = userAnswers[q.id] && (typeof userAnswers[q.id] === 'string' ? userAnswers[q.id].trim().length > 0 : userAnswers[q.id].length > 0);
            const isFlagged = flaggedQuestions.has(q.id);
            
            let statusBadge = `<span class="badge badge-danger">Unanswered</span>`;
            if (hasAns) {
                statusBadge = `<span class="badge badge-success">Answered</span>`;
            }
            
            let flagBadge = isFlagged ? `<span class="badge badge-warning">Flagged</span>` : ``;

            row.innerHTML = `
                <div class="sub-col-info">
                    <span class="sub-col-num">Question ${idx + 1}</span>
                    <span class="sub-col-title">${escapeHTML(q.title)}</span>
                </div>
                <div class="sub-col-status">
                    ${flagBadge}
                    ${statusBadge}
                </div>
            `;
            
            row.style.cursor = "pointer";
            row.addEventListener("click", () => {
                submissionScreen.classList.remove("active");
                flowScreen.classList.add("active");
                currentQuestionIdx = idx;
                renderQuestion(currentQuestionIdx);
            });

            submissionQuestionsList.appendChild(row);
        });
    }

    btnSubmitExam.addEventListener("click", () => {
        if (confirm("Are you sure you want to submit your paper? You will not be able to make changes after this.")) {
            submitAndGradeExam();
        }
    });

    function forceSubmitExam() {
        submitAndGradeExam();
    }

    // --- Scoring & Results Display ---
    function submitAndGradeExam() {
        if (timerInterval) clearInterval(timerInterval);
        
        submissionScreen.classList.remove("active");
        resultsScreen.classList.add("active");

        let score = 0;
        let total = currentQuestions.length;
        
        resultsReviewList.innerHTML = "";

        currentQuestions.forEach((q, idx) => {
            const studentAns = userAnswers[q.id];
            let isCorrect = false;
            let statusClass = "incorrect";
            let statusLabel = "Incorrect";
            
            if (q.options) {
                if (q.answerType === "single-choice" || q.answerType === "multi-choice") {
                    const correct = q.correctAnswers;
                    isCorrect = Array.isArray(studentAns) && 
                                studentAns.length === correct.length &&
                                studentAns.every(val => correct.includes(val));
                }
            } else {
                isCorrect = studentAns && studentAns.trim().length > 0;
                statusLabel = isCorrect ? "Answered (Manual Review)" : "Unanswered";
            }
            
            if (isCorrect) {
                score++;
                statusClass = "correct";
                statusLabel = q.options ? "Correct" : "Answered";
            }

            const card = document.createElement("div");
            card.className = `review-item-card ${statusClass}`;
            
            let studentDisplay = "No answer provided";
            if (studentAns) {
                if (Array.isArray(studentAns)) {
                    studentDisplay = studentAns.map(val => `${val}. ${escapeHTML(q.options[val-1])}`).join("<br>");
                } else {
                    studentDisplay = escapeHTML(studentAns).replace(/\n/g, "<br>");
                }
            }

            let correctDisplay = "";
            if (q.options) {
                if (q.answerType === "single-choice") {
                    correctDisplay = `${q.correctAnswers[0]}. ${escapeHTML(q.options[q.correctAnswers[0]-1])}`;
                } else {
                    correctDisplay = q.correctAnswers.map(val => `${val}. ${escapeHTML(q.options[val-1])}`).join("<br>");
                }
            } else {
                correctDisplay = escapeHTML(q.answer).replace(/\n/g, "<br>");
            }

            let parsedExplanation = parseMarkdownToHTML(q.explanation || "");

            card.innerHTML = `
                <div class="review-item-header">
                    <span class="review-item-title">Question ${idx + 1}: ${escapeHTML(q.title)}</span>
                    <span class="badge ${isCorrect ? 'badge-success' : 'badge-danger'}">${statusLabel}</span>
                </div>
                <div class="review-body">
                    ${parseMarkdownToHTML(q.body)}
                </div>
                <div class="review-answers-box">
                    <div>
                        <span class="val-label">Your Answer:</span>
                        <div>${studentDisplay}</div>
                    </div>
                    <div>
                        <span class="val-label">Correct Answer / Reference:</span>
                        <div>${correctDisplay}</div>
                    </div>
                </div>
                <div class="review-explanation" style="margin-top:12px; border-top:1px dashed var(--color-border); padding-top:10px;">
                    <strong>Official Key Reference Text:</strong>
                    <pre style="background:#272822;color:#f8f8f2;padding:8px;border-radius:4px;margin-top:6px;font-family:var(--font-mono);font-size:0.85em;margin-bottom:8px;"><code>${escapeHTML(q.answer)}</code></pre>
                    ${parsedExplanation ? `<div class="detailed-explanation-box" style="margin-top:8px;"><strong>Explanation:</strong><div class="explanation-content" style="color:var(--color-text-muted); font-size:0.95em; line-height:1.5; margin-top:6px;">${parsedExplanation}</div></div>` : ''}
                </div>
            `;
            
            resultsReviewList.appendChild(card);
        });
        
        // Bind click events for all code block run buttons in the review list
        resultsReviewList.querySelectorAll(".btn-run-in-playground").forEach(btn => {
            btn.addEventListener("click", () => {
                const codeIndex = parseInt(btn.dataset.codeIndex, 10);
                const code = window.activeQuestionCodeBlocks[codeIndex];
                if (code) {
                    loadCodeIntoSandbox(code);
                    executeSandboxCode(code);
                }
            });
        });

        // Compute scores
        const pct = Math.round((score / total) * 100);
        resultsScorePct.textContent = `${pct}%`;
        resultsScoreFraction.textContent = `${score} / ${total}`;

        if (pct >= 80) {
            resultsVerdict.textContent = "Excellent Job!";
            resultsDetailsText.textContent = "You have shown strong command over Client-Side Web Technologies concepts.";
        } else if (pct >= 50) {
            resultsVerdict.textContent = "Passed!";
            resultsDetailsText.textContent = "You passed, but reviewing incorrect answers will help secure a top grade.";
        } else {
            resultsVerdict.textContent = "Needs Review";
            resultsDetailsText.textContent = "Please read through the answers and practice again to build confidence.";
        }
    }

    btnRetakeExam.addEventListener("click", () => {
        resultsScreen.classList.remove("active");
        enterFlowExamInterface();
    });

    // ==========================================================================
    // JavaScript Playground Sandbox & Tutorial Logic
    // ==========================================================================
    
    // Gutter Line Numbers
    function updateGutter() {
        const lines = playgroundCodeInput.value.split("\n").length;
        let gutterHTML = "";
        for (let i = 1; i <= lines; i++) {
            gutterHTML += i + "<br>";
        }
        editorGutter.innerHTML = gutterHTML;
    }
    
    playgroundCodeInput.addEventListener("input", updateGutter);
    playgroundCodeInput.addEventListener("scroll", () => {
        editorGutter.scrollTop = playgroundCodeInput.scrollTop;
    });

    // Tab Navigation
    document.querySelectorAll(".pg-tab-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".pg-tab-btn").forEach(b => b.classList.remove("active"));
            document.querySelectorAll(".pg-tab-pane").forEach(p => p.classList.remove("active"));
            
            btn.classList.add("active");
            const targetId = btn.dataset.target;
            document.getElementById(targetId).classList.add("active");
            
            if (targetId === "pg-sandbox") {
                updateGutter();
            }
        });
    });

    // Virtual Console Log Appenders
    function appendConsoleLine(args, type) {
        const line = document.createElement("div");
        line.className = `console-line console-${type}`;
        
        const prefix = type === "result" ? "=> " : "";
        
        line.textContent = prefix + args.map(arg => {
            if (arg === null) return "null";
            if (arg === undefined) return "undefined";
            if (typeof arg === "object") {
                try {
                    return JSON.stringify(arg, null, 2);
                } catch (e) {
                    return String(arg);
                }
            }
            return String(arg);
        }).join(" ");
        
        playgroundConsole.appendChild(line);
        playgroundConsole.scrollTop = playgroundConsole.scrollHeight;
    }
    
    function appendSystemLine(text) {
        const line = document.createElement("div");
        line.className = "console-line console-system";
        line.textContent = text;
        playgroundConsole.appendChild(line);
        playgroundConsole.scrollTop = playgroundConsole.scrollHeight;
    }

    // TypeScript Type Annotations Stripper
    function stripTypeScript(code) {
        let clean = code;
        // 1. Remove interfaces: interface Person { ... }
        clean = clean.replace(/interface\s+\w+\s*\{[\s\S]*?\}/g, '');
        // 2. Remove multi-line type aliases: type Order = { ... } or function signatures type One = (...) => void
        clean = clean.replace(/type\s+\w+\s*=\s*(?:\{[\s\S]*?\}|(?:\([^)]*\)\s*=>\s*\w+));?/g, '');
        // 3. Remove parameter/variable type annotations specifically matching course types:
        //    (e.g., ": string", ": number", ": boolean", ": void", ": any", ": Person", ": Employee", ": Order", etc.)
        clean = clean.replace(/:\s*(?:string|number|boolean|void|any|Order|Employee|Person|Promise<number\[\]>|number\[\])(?:\s*\|\s*(?:string|number|boolean))*/g, '');
        
        return clean;
    }

    // Code Sandbox Run Handler
    function executeSandboxCode(code) {
        const oldResult = playgroundConsole.querySelector(".console-result");
        if (oldResult) oldResult.remove();
        
        appendSystemLine("--- Executing code sandbox ---");
        
        const sandboxConsole = {
            log: (...args) => appendConsoleLine(args, "info"),
            error: (...args) => appendConsoleLine(args, "error"),
            warn: (...args) => appendConsoleLine(args, "warn"),
            info: (...args) => appendConsoleLine(args, "info"),
        };
        
        const cleanJS = stripTypeScript(code);
        
        try {
            const sandboxFn = new Function("console", "setTimeout", "setInterval", `
                try {
                    ${cleanJS}
                } catch (err) {
                    console.error(err.message || err);
                }
            `);
            
            // Intercept async timers to forward logs to sandboxConsole
            const wrappedSetTimeout = (cb, delay, ...args) => {
                return setTimeout(() => {
                    try {
                        cb(...args);
                    } catch (err) {
                        sandboxConsole.error(err.message || err);
                    }
                }, delay);
            };
            const wrappedSetInterval = (cb, delay, ...args) => {
                return setInterval(() => {
                    try {
                        cb(...args);
                    } catch (err) {
                        sandboxConsole.error(err.message || err);
                    }
                }, delay);
            };
            
            const result = sandboxFn(sandboxConsole, wrappedSetTimeout, wrappedSetInterval);
            
            if (result !== undefined) {
                appendConsoleLine([result], "result");
            }
        } catch (err) {
            appendConsoleLine([err.message || err], "error");
        }
    }

    // Core Playground Loader Binders
    function loadCodeIntoSandbox(code) {
        playgroundCodeInput.value = code;
        updateGutter();
        
        // Go to Sandbox tab
        const sandboxTab = document.querySelector('.pg-tab-btn[data-target="pg-sandbox"]');
        if (sandboxTab) sandboxTab.click();
        
        // Open playground widget if hidden
        if (playgroundWidget.classList.contains("hidden")) {
            playgroundWidget.classList.remove("hidden");
            btnShowPlayground.classList.add("active");
            playgroundWidget.style.top = "100px";
            playgroundWidget.style.left = (window.innerWidth - 620) + "px";
        }
        
        // Clear outputs & print loaded line
        playgroundConsole.innerHTML = '<div class="console-line console-system">Snippet loaded. Code execution active.</div>';
        
        // Focus container
        document.querySelectorAll(".floating-widget, .sticky-note").forEach(w => w.style.zIndex = 499);
        playgroundWidget.style.zIndex = 500;
    }

    function loadLesson(id) {
        const lesson = PLAYGROUND_DATA.lessons.find(l => l.id === id);
        if (!lesson) return;
        
        const parsedSummary = parseMarkdownToHTML(lesson.summary);
        
        lessonContentArea.innerHTML = `
            <div class="lesson-text-content">${parsedSummary}</div>
            <h4 class="mt-3">Runnable Code Example:</h4>
            <div class="code-block-wrapper">
                <pre class="javascript-code"><code>${highlightJS(lesson.code)}</code></pre>
            </div>
            <div class="lesson-code-actions">
                <button class="btn-load-lesson-code" id="btn-load-lesson-code">Load Demo to Sandbox 🧪</button>
            </div>
        `;
        
        document.getElementById("btn-load-lesson-code").addEventListener("click", () => {
            loadCodeIntoSandbox(lesson.code);
        });
    }

    function initializePlayground() {
        // 1. Load curriculum select dropdown
        lessonSelect.innerHTML = PLAYGROUND_DATA.lessons.map(lesson => 
            `<option value="${lesson.id}">${lesson.title}</option>`
        ).join("");
        
        lessonSelect.addEventListener("change", () => {
            loadLesson(lessonSelect.value);
        });
        
        if (PLAYGROUND_DATA.lessons.length > 0) {
            loadLesson(PLAYGROUND_DATA.lessons[0].id);
        }
        
        // 2. Load exam hacks list
        hacksListContainer.innerHTML = PLAYGROUND_DATA.examHacks.map(hack => `
            <div class="hack-card">
                <div class="hack-header">
                    <span class="hack-title">${escapeHTML(hack.title)}</span>
                    <span class="hack-badge">${escapeHTML(hack.questionRef)}</span>
                </div>
                <div class="hack-desc">${escapeHTML(hack.concept)}</div>
                <div class="hack-actions">
                    <button class="btn-debug-hack" data-id="${hack.id}">Debug Snippet 🧪</button>
                </div>
            </div>
        `).join("");
        
        hacksListContainer.addEventListener("click", (e) => {
            const btn = e.target.closest(".btn-debug-hack");
            if (btn) {
                const hackId = btn.dataset.id;
                const hack = PLAYGROUND_DATA.examHacks.find(h => h.id === hackId);
                if (hack) {
                    loadCodeIntoSandbox(hack.code);
                    executeSandboxCode(hack.code);
                }
            }
        });

        // 3. Connect buttons
        btnRunCode.addEventListener("click", () => {
            executeSandboxCode(playgroundCodeInput.value);
        });

        btnClearConsole.addEventListener("click", () => {
            playgroundConsole.innerHTML = '<div class="console-line console-system">Console cleared.</div>';
        });

        // Add keyboard shortcut (Ctrl + Enter) to run code inside textarea
        playgroundCodeInput.addEventListener("keydown", (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                e.preventDefault();
                btnRunCode.click();
            }
        });
    }

    // Expose helpers globally to allow inline event bindings to resolve
    window.loadCodeIntoSandbox = loadCodeIntoSandbox;
    window.executeSandboxCode = executeSandboxCode;

    // Run initialization
    initializePlayground();

});
