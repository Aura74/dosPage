/* =============================================
   VAULT-TEC TERMINAL v2.1 — Fallout CRT Shell
   ============================================= */

document.addEventListener("DOMContentLoaded", () => {
  const userInput = document.getElementById("user-input");
  const outputDiv = document.getElementById("output");
  const flashEl = document.getElementById("power-on-flash");
  const scanlinesEl = document.getElementById("scanlines");
  const knobScan = document.getElementById("knob-brightness");
  const knobColor = document.getElementById("knob-color");
  const knobSound = document.getElementById("knob-sound");

  // ── State ──────────────────────────────────
  let commandHistory = [];
  let historyIndex = -1;
  let soundEnabled = false;
  let colorThemeIndex = 0;
  const colorThemes = ["green", "amber", "white"];
  let booted = false;

  // ── Audio (Web Audio API — no files needed) ─
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  function playBeep(freq = 800, duration = 0.06, vol = 0.08) {
    if (!soundEnabled || !audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "square";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  }

  function playKeyClick() {
    playBeep(1200 + Math.random() * 400, 0.02, 0.04);
  }

  function playEnterBeep() {
    playBeep(600, 0.1, 0.06);
  }

  function playBootBeep(freq) {
    playBeep(freq, 0.15, 0.05);
  }

  // ── Projects data ──────────────────────────
  const projects = [
    { name: "React_Travel_List", date: "2023-09-18", time: "05:40 PM", size: "24KB", link: "https://lemon-mushroom-0e6ac0003.4.azurestaticapps.net/", desc: "React travel packing list app" },
    { name: "LA-Ljusne",         date: "2021-02-28", time: "03:33 AM", size: "156KB", link: "https://polite-mushroom-04e2c0e03.4.azurestaticapps.net/", desc: "Ljusne alarm system" },
    { name: "LA-Dallas",         date: "2022-06-13", time: "04:40 PM", size: "89KB", link: "https://www.larsasplund.com/", desc: "Dallas project page" },
    { name: "BorderOaks",        date: "2017-05-22", time: "09:23 PM", size: "42KB", link: "https://witty-plant-0caac5803.4.azurestaticapps.net/", desc: "BorderOaks web app" },
    { name: "Lila-Purple",       date: "2003-10-11", time: "10:47 AM", size: "33KB", link: "https://proud-grass-05d5e2e03.4.azurestaticapps.net/", desc: "Lila Purple project" },
    { name: "Mindy",             date: "2001-09-11", time: "08:42 AM", size: "67KB", link: "https://kind-beach-09d973303.4.azurestaticapps.net/", desc: "Mindy web app" },
    { name: "React_Notan",       date: "1999-09-29", time: "02:37 PM", size: "18KB", link: "https://zealous-moss-018c6e603.4.azurestaticapps.net/", desc: "React bill splitting app" },
    { name: "Pexel-Search",      date: "2016-06-06", time: "11:49 PM", size: "29KB", link: "https://thankful-plant-0c9845803.4.azurestaticapps.net/", desc: "Pexels image search" },
    { name: "Soffan",            date: "2013-11-03", time: "10:24 AM", size: "51KB", link: "https://gentle-plant-0fb7d6a03.4.azurestaticapps.net/", desc: "Soffan project" },
    { name: "Superfrisk",        date: "2021-09-18", time: "07:14 PM", size: "74KB", link: "https://superfrisk.se/", desc: "Superfrisk website" },
    { name: "Vader",             date: "2011-12-13", time: "03:46 PM", size: "12KB", link: "weather_app/index.html", desc: "Weather application" },
    { name: "Oversikt",          date: "2011-12-13", time: "03:46 PM", size: "205KB", link: "Larm_LA_Oversikt_med_Karta/index.html", desc: "Alarm overview with map" },
    { name: "Banken",            date: "2011-12-13", time: "03:46 PM", size: "38KB", link: "bank/index.html", desc: "Banking simulation app" },
    { name: "Login_Mobil",       date: "2011-12-13", time: "03:46 PM", size: "15KB", link: "loginmobil/index.html", desc: "Mobile login page" },
    { name: "Kartan",            date: "2011-12-13", time: "03:46 PM", size: "92KB", link: "Mapty/index.html", desc: "Mapty — map workout tracker" },
  ];

  // ── Utility: type text with delay ──────────
  function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  async function typeLine(text, cls = "", speed = 2) {
    const div = document.createElement("div");
    if (cls) div.className = cls;
    outputDiv.appendChild(div);

    for (let i = 0; i < text.length; i++) {
      div.textContent += text[i];
      if (speed > 0 && i % 3 === 0) {
        await sleep(speed);
      }
    }
    scrollToBottom();
    return div;
  }

  function addLine(text, cls = "") {
    const div = document.createElement("div");
    if (cls) div.className = cls;
    if (text === "") {
      div.innerHTML = "&nbsp;";
    } else {
      div.textContent = text;
    }
    outputDiv.appendChild(div);
    scrollToBottom();
    return div;
  }

  function addHTML(html, cls = "") {
    const div = document.createElement("div");
    if (cls) div.className = cls;
    div.innerHTML = html;
    outputDiv.appendChild(div);
    scrollToBottom();
    return div;
  }

  function addSeparator() {
    const div = document.createElement("div");
    div.className = "line-separator";
    outputDiv.appendChild(div);
  }

  function scrollToBottom() {
    outputDiv.scrollTop = outputDiv.scrollHeight;
  }

  // ── Boot sequence ──────────────────────────
  async function bootSequence() {
    userInput.disabled = true;

    // Power-on flash
    flashEl.classList.add("flash");
    playBootBeep(400);

    await sleep(200);

    const bootLines = [
      { text: "ROBCO INDUSTRIES (TM) TERMLINK PROTOCOL", cls: "line-highlight" },
      { text: "ENTER PASSWORD NOW", cls: "line-highlight" },
      { text: "", cls: "" },
      { text: "4 ATTEMPT(S) LEFT: ■ ■ ■ ■", cls: "" },
      { text: "", cls: "" },
    ];

    for (const line of bootLines) {
      await typeLine(line.text, line.cls, 4);
      await sleep(60);
    }

    playBootBeep(500);
    await sleep(300);

    // Clear and show actual boot
    outputDiv.innerHTML = "";

    // Build the logo with consistent width using JS padding
    const logoContent = [
      "",
      " ██╗   ██╗ █████╗ ██╗   ██╗██╗  ████████╗███████╗ ██████╗",
      " ██║   ██║██╔══██╗██║   ██║██║  ╚══██╔══╝██╔════╝██╔════╝",
      " ██║   ██║███████║██║   ██║██║     ██║   █████╗  ██║",
      " ╚██╗ ██╔╝██╔══██║██║   ██║██║     ██║   ██╔══╝  ██║",
      "  ╚████╔╝ ██║  ██║╚██████╔╝███████╗██║   ███████╗╚██████╗",
      "   ╚═══╝  ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝   ╚══════╝ ╚═════╝",
      "",
      "        ROBCO INDUSTRIES UNIFIED OS v84.2.7",
      "        COPYRIGHT 2075-2077 ROBCO INDUSTRIES",
      "                   – SERVER 6 –",
      "",
    ];

    // Find the widest line to pad all others to same width
    const maxLen = Math.max(...logoContent.map(l => l.length));
    const boxWidth = maxLen + 4; // 2 chars padding each side

    addLine("╔" + "═".repeat(boxWidth) + "╗", "line-ascii");
    await sleep(30);
    for (const line of logoContent) {
      const padded = "║ " + line.padEnd(maxLen + 2) + " ║";
      addLine(padded, "line-ascii");
      await sleep(30);
    }
    addLine("╚" + "═".repeat(boxWidth) + "╝", "line-ascii");

    await sleep(300);
    playBootBeep(600);

    addLine("");

    const systemLines = [
      "Initializing Vault-Tec Systems...",
      "BIOS Date: 10/23/77  Ver: 1.3.12",
      "Checking memory... 640KB OK",
      "Loading ROBCO Shell...",
    ];

    for (const text of systemLines) {
      await typeLine(text, "", 3);
      await sleep(120);
    }

    // Progress bar
    const progressDiv = addLine("[                    ] 0%");
    const barSteps = 20;
    for (let i = 1; i <= barSteps; i++) {
      const filled = "█".repeat(i) + " ".repeat(barSteps - i);
      const pct = Math.round((i / barSteps) * 100);
      progressDiv.textContent = `[${filled}] ${pct}%`;
      await sleep(40);
    }

    await sleep(200);
    playBootBeep(800);

    addLine("");
    await typeLine("System ready.", "line-highlight", 5);
    addLine(`${projects.length} program(s) found on drive C:`);
    addLine("");
    await typeLine('Type "help" for available commands.', "", 3);
    addLine("");
    addSeparator();

    userInput.disabled = false;
    userInput.focus();
    booted = true;
  }

  // ── Commands ───────────────────────────────
  const commands = {
    help() {
      const lines = [
        ["HELP",    "Show this help screen"],
        ["DIR",     "List all programs / projects"],
        ["OPEN <n>","Open program by name or number"],
        ["CAT <n>", "Show details about a program"],
        ["CLS",     "Clear the terminal screen"],
        ["VER",     "Show system version info"],
        ["DATE",    "Show current date"],
        ["TIME",    "Show current time"],
        ["COLOR",   "Cycle terminal color theme"],
        ["ECHO <t>","Print text to terminal"],
        ["ABOUT",   "About this terminal"],
        ["REBOOT",  "Restart the terminal"],
      ];

      addLine("");
      addLine("═══ AVAILABLE COMMANDS ═══", "line-highlight");
      addLine("");
      for (const [cmd, desc] of lines) {
        addLine(`  ${cmd.padEnd(12)} ${desc}`);
      }
      addLine("");
      addLine("Tip: Use ↑/↓ for command history, Tab to auto-complete");
      addLine("");
    },

    dir() {
      addLine("");
      addLine(" Volume in drive C has no label.", "");
      addLine(" Volume Serial Number is 2077-1023");
      addLine("");
      addLine(` Directory of C:\\VAULT\\PROJECTS`);
      addLine("");

      // Header
      const headerDiv = document.createElement("div");
      headerDiv.className = "dir-entry line-highlight";
      headerDiv.innerHTML = `<span class="col-date">DATE</span><span class="col-time">TIME</span><span class="col-type">TYPE</span><span class="col-size">SIZE</span><span class="col-name">NAME</span>`;
      outputDiv.appendChild(headerDiv);
      addSeparator();

      // Directories
      const dirs = [
        { name: ".", date: "2077-10-23", time: "06:00 AM", type: "&lt;DIR&gt;" },
        { name: "..", date: "2077-10-23", time: "06:00 AM", type: "&lt;DIR&gt;" },
      ];

      for (const d of dirs) {
        const row = document.createElement("div");
        row.className = "dir-entry";
        row.innerHTML = `<span class="col-date">${d.date}</span><span class="col-time">${d.time}</span><span class="col-type">${d.type}</span><span class="col-size"></span><span class="col-name">${d.name}</span>`;
        outputDiv.appendChild(row);
      }

      // Projects
      projects.forEach((p, i) => {
        const row = document.createElement("div");
        row.className = "dir-entry";

        const nameCell = document.createElement("span");
        nameCell.className = "col-name";

        const link = document.createElement("a");
        link.textContent = p.name;
        link.href = p.link;
        link.target = "_blank";
        link.rel = "noopener";
        link.title = p.desc;
        nameCell.appendChild(link);

        row.innerHTML = `<span class="col-date">${p.date}</span><span class="col-time">${p.time}</span><span class="col-type">.EXE</span><span class="col-size">${p.size}</span>`;
        row.appendChild(nameCell);
        outputDiv.appendChild(row);
      });

      addSeparator();
      addLine(`    ${projects.length} File(s)`);
      addLine(`     2 Dir(s)   1,073,741,824 bytes free`);
      addLine("");
      scrollToBottom();
    },

    open(args) {
      if (!args) {
        addLine('Usage: OPEN <name|number>  — e.g. "open Banken" or "open 3"', "line-error");
        return;
      }

      const query = args.trim();
      let project = null;

      // Try by number
      const num = parseInt(query);
      if (!isNaN(num) && num >= 1 && num <= projects.length) {
        project = projects[num - 1];
      }

      // Try by name (case-insensitive partial match)
      if (!project) {
        project = projects.find(p => p.name.toLowerCase() === query.toLowerCase());
      }
      if (!project) {
        project = projects.find(p => p.name.toLowerCase().includes(query.toLowerCase()));
      }

      if (project) {
        addLine("");
        addLine(`Opening ${project.name}...`, "line-highlight");
        addLine(`→ ${project.link}`);
        addLine("");
        playBeep(1000, 0.1, 0.06);
        setTimeout(() => window.open(project.link, "_blank"), 400);
      } else {
        addLine(`Program "${query}" not found. Type DIR to see available programs.`, "line-error");
      }
    },

    cat(args) {
      if (!args) {
        addLine('Usage: CAT <name|number>', "line-error");
        return;
      }

      const query = args.trim();
      let project = null;
      const num = parseInt(query);
      if (!isNaN(num) && num >= 1 && num <= projects.length) {
        project = projects[num - 1];
      }
      if (!project) {
        project = projects.find(p => p.name.toLowerCase() === query.toLowerCase());
      }
      if (!project) {
        project = projects.find(p => p.name.toLowerCase().includes(query.toLowerCase()));
      }

      if (project) {
        addLine("");
        addLine(`╔═══ ${project.name.toUpperCase()} ═══`, "line-highlight");
        addLine(`║ Description: ${project.desc}`);
        addLine(`║ Date:        ${project.date}`);
        addLine(`║ Size:        ${project.size}`);
        addLine(`║ URL:         ${project.link}`);
        addLine(`╚${"═".repeat(project.name.length + 7)}`, "line-highlight");
        addLine("");
      } else {
        addLine(`Program "${query}" not found.`, "line-error");
      }
    },

    cls() {
      outputDiv.innerHTML = "";
    },

    clear() {
      commands.cls();
    },

    ver() {
      addLine("");
      addLine("ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM", "line-highlight");
      addLine("Version 84.2.7  (Build 2077.1023.1)");
      addLine("Copyright (C) 2075-2077 RobCo Industries");
      addLine("All rights reserved.");
      addLine("");
    },

    date() {
      const d = new Date();
      const dateStr = d.toLocaleDateString("en-US", {
        weekday: "long", year: "numeric", month: "long", day: "numeric"
      });
      addLine(`Current date: ${dateStr}`);
    },

    time() {
      const d = new Date();
      addLine(`Current time: ${d.toLocaleTimeString()}`);
    },

    color() {
      colorThemeIndex = (colorThemeIndex + 1) % colorThemes.length;
      applyColorTheme(colorThemes[colorThemeIndex]);
      addLine(`Color theme: ${colorThemes[colorThemeIndex].toUpperCase()}`, "line-highlight");
    },

    echo(args) {
      addLine(args || "");
    },

    about() {
      addLine("");
      addLine("═══════════════════════════════════════", "line-highlight");
      addLine("  VAULT-TEC PERSONAL TERMINAL v2.1");
      addLine("  A Fallout-inspired project launcher");
      addLine("═══════════════════════════════════════", "line-highlight");
      addLine("");
      addLine("  This terminal serves as a hub for");
      addLine("  all deployed web projects by Lars.");
      addLine("");
      addLine("  Built with vanilla HTML, CSS & JS.");
      addLine("  Inspired by Fallout's Pip-Boy and");
      addLine("  RobCo terminal interfaces.");
      addLine("");
      addLine("  Type DIR to explore, OPEN to launch.");
      addLine("");
    },

    reboot() {
      addLine("");
      addLine("Rebooting system...", "line-highlight");
      playBeep(400, 0.2, 0.06);
      setTimeout(() => {
        outputDiv.innerHTML = "";
        bootSequence();
      }, 800);
    },
  };

  // ── Process command ────────────────────────
  function processCommand(input) {
    // Echo the command
    addLine(`C:\\> ${input}`, "line-command");

    const parts = input.trim().split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(" ");

    if (commands[cmd]) {
      commands[cmd](args);
    } else {
      addLine("");
      addLine(`'${parts[0]}' is not recognized as an internal or external command,`);
      addLine(`operable program or batch file.`);
      addLine("");
      addLine('Type "help" for a list of commands.', "line-error");
      addLine("");
    }

    scrollToBottom();
  }

  // ── Input handling ─────────────────────────
  userInput.addEventListener("keydown", (event) => {
    if (!booted) return;

    if (event.key === "Enter") {
      const input = userInput.value.trim();
      if (input) {
        commandHistory.unshift(input);
        if (commandHistory.length > 50) commandHistory.pop();
        historyIndex = -1;
        processCommand(input);
      }
      userInput.value = "";
      playEnterBeep();

    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        userInput.value = commandHistory[historyIndex];
      }

    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        userInput.value = commandHistory[historyIndex];
      } else {
        historyIndex = -1;
        userInput.value = "";
      }

    } else if (event.key === "Tab") {
      event.preventDefault();
      tabComplete();

    } else if (event.key === "l" && event.ctrlKey) {
      event.preventDefault();
      commands.cls();

    } else {
      playKeyClick();
    }
  });

  // ── Tab completion ─────────────────────────
  function tabComplete() {
    const val = userInput.value.trim();
    const parts = val.split(/\s+/);

    if (parts.length <= 1) {
      // Complete command names
      const partial = parts[0].toLowerCase();
      const matches = Object.keys(commands).filter(c => c.startsWith(partial));
      if (matches.length === 1) {
        userInput.value = matches[0] + " ";
      } else if (matches.length > 1) {
        addLine(`C:\\> ${val}`, "line-command");
        addLine(matches.join("  "), "line-error");
      }
    } else {
      // Complete project names
      const partial = parts.slice(1).join(" ").toLowerCase();
      const matches = projects.filter(p => p.name.toLowerCase().startsWith(partial));
      if (matches.length === 1) {
        userInput.value = parts[0] + " " + matches[0].name;
      } else if (matches.length > 1) {
        addLine(`C:\\> ${val}`, "line-command");
        addLine(matches.map(p => p.name).join("  "), "line-error");
      }
    }
  }

  // ── Color theme ────────────────────────────
  function applyColorTheme(theme) {
    document.body.classList.remove("theme-amber", "theme-white");
    if (theme === "amber") document.body.classList.add("theme-amber");
    if (theme === "white") document.body.classList.add("theme-white");

    // Update LED color
    const led = document.querySelector(".led-on");
    if (led) {
      led.style.background = getComputedStyle(document.documentElement).getPropertyValue("--term-color");
    }
  }

  // ── Control knobs ──────────────────────────
  knobScan.addEventListener("click", () => {
    knobScan.classList.toggle("active");
    scanlinesEl.classList.toggle("off");
    playBeep(900, 0.05, 0.05);
  });
  knobScan.classList.add("active"); // Scanlines on by default

  knobColor.addEventListener("click", () => {
    commands.color();
    knobColor.classList.add("active");
    setTimeout(() => knobColor.classList.remove("active"), 300);
    playBeep(700, 0.05, 0.05);
  });

  knobSound.addEventListener("click", () => {
    initAudio();
    soundEnabled = !soundEnabled;
    knobSound.classList.toggle("active", soundEnabled);
    if (soundEnabled) playBeep(1000, 0.1, 0.08);
  });

  // ── Keep focus on input ────────────────────
  document.addEventListener("click", (e) => {
    if (e.target.tagName !== "A" && !e.target.closest(".control-knob") && !e.target.closest(".control-indicator")) {
      userInput.focus();
    }
  });

  // ── Start ──────────────────────────────────
  bootSequence();
});
