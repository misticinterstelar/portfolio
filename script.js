// ============================================================
// PORTFOLIO RPG ENGINE
// ============================================================

const $ = (selector) => document.querySelector(selector);
const R = document.documentElement;
const G = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];


// ============================================================
// SAVE SYSTEM
// ============================================================

const SAVE_KEY = 'portfolio_rpg_save_v4';

const LEVELS = [
    0,      // Lv 1
    80,     // Lv 2
    220,    // Lv 3
    420,    // Lv 4
    700,    // Lv 5
    1050,   // Lv 6
    1450,   // Lv 7
    1850,   // Lv 8
    2300,   // Lv 9
    2600    // Lv 10
];

const MAX_LEVEL = 10;
const MAX_XP = LEVELS[MAX_LEVEL - 1];

const DEFAULT_SAVE = {
    xp: 0,
    seenSections: {},
    openedProjects: {},
    visitedMap: {},
    trophies: {}
};

function freshSave() {
    return JSON.parse(JSON.stringify(DEFAULT_SAVE));
}

function loadSave() {
    try {
        const raw = localStorage.getItem(SAVE_KEY);

        if (!raw) return freshSave();

        const parsed = JSON.parse(raw);

        return {
            ...freshSave(),
            ...parsed,
            xp: Number(parsed.xp) || 0,
            seenSections: parsed.seenSections || {},
            openedProjects: parsed.openedProjects || {},
            visitedMap: parsed.visitedMap || {},
            trophies: parsed.trophies || {}
        };
    } catch (error) {
        return freshSave();
    }
}

let save = loadSave();

function saveGame() {
    try {
        localStorage.setItem(SAVE_KEY, JSON.stringify(save));
        updateSaveStatus('Progress saved locally');
    } catch (error) {
        updateSaveStatus('Auto-save unavailable');
    }
}

function resetGame() {
    if (!window.confirm('Reset your portfolio save and start from Lv 1?')) {
        return;
    }

    localStorage.removeItem(SAVE_KEY);
    save = freshSave();
    saveGame();
    window.location.reload();
}


// ============================================================
// LEVEL CALCULATIONS
// ============================================================

function getLevel(xp = save.xp) {
    let level = 1;

    for (let i = 0; i < LEVELS.length; i++) {
        if (xp >= LEVELS[i]) level = i + 1;
    }

    return Math.min(level, MAX_LEVEL);
}

function xpRange(level) {
    if (level >= MAX_LEVEL) {
        return {
            current: MAX_XP,
            next: MAX_XP
        };
    }

    return {
        current: LEVELS[level - 1],
        next: LEVELS[level]
    };
}

function levelProgress(level = getLevel()) {
    if (level >= MAX_LEVEL) return 100;

    const range = xpRange(level);
    const amount = range.next - range.current;

    return Math.min(
        100,
        Math.max(
            0,
            ((save.xp - range.current) / amount) * 100
        )
    );
}

function updateHUD() {
    const level = getLevel();
    const progress = levelProgress(level);
    const range = xpRange(level);

    $('#lv').textContent = `Lv ${level}`;
    $('#xpb').style.width = `${progress}%`;

    $('#xplabel').textContent = level >= MAX_LEVEL
        ? `${save.xp} XP • MAX`
        : `${save.xp} / ${range.next} XP`;

    $('#profileLevel').textContent = `Lv ${level}`;
    $('#profileXp').textContent = level >= MAX_LEVEL
        ? `${save.xp} XP • MAX LEVEL`
        : `${save.xp} / ${range.next} XP`;
    $('#profileBar').style.width = `${progress}%`;
}


// ============================================================
// TOAST / SAVE STATUS
// ============================================================

let toastTimer;

function toast(message) {
    const element = $('#toast');
    if (!element) return;

    element.textContent = message;
    element.classList.add('on');

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        element.classList.remove('on');
    }, 2200);
}

function updateSaveStatus(message) {
    const element = $('#saveStatus');
    if (element) element.textContent = message;
}


// ============================================================
// XP REWARDS
// ============================================================

function awardXP(amount, reason) {
    if (!Number.isFinite(amount) || amount <= 0) return;

    const oldLevel = getLevel();

    save.xp = Math.min(MAX_XP, save.xp + amount);

    const newLevel = getLevel();

    saveGame();
    updateHUD();
    updateWorldMap();
    updateLockedProjects();

    toast(`+${amount} XP — ${reason}`);

    if (newLevel > oldLevel) {
        for (let level = oldLevel + 1; level <= newLevel; level++) {
            levelUp(level);
        }
    }
}


// ============================================================
// THEME / LAMP
// ============================================================

try {
    const theme = localStorage.getItem('portfolio_theme');
    if (theme) R.dataset.theme = theme;
} catch (error) {}

function lamp() {
    const dark = getComputedStyle(R)
        .getPropertyValue('--cone')
        .trim() === '1';

    const nextTheme = dark ? 'light' : 'dark';

    R.dataset.theme = nextTheme;

    try {
        localStorage.setItem('portfolio_theme', nextTheme);
    } catch (error) {}

    toast(nextTheme === 'dark' ? 'Lamp on' : 'Lamp off');
}

$('#lamp').addEventListener('click', lamp);


// ============================================================
// PROJECTS / QUESTS
// ============================================================

const shelf = $('#shelf');

function projectUnlocked(project) {
    return getLevel() >= Number(project.minLevel || 1);
}

function openGame(index) {
    const project = G[index];
    if (!project) return;

    if (!projectUnlocked(project)) {
        const required = Number(project.minLevel || 1);
        const message = `Reach Lv ${required} to unlock this quest.`;
        talk(message);
        toast(message);
        return;
    }

    $('#dt').textContent = project.title;
    $('#dg').textContent = project.tag || 'Quest';
    $('#dq').textContent = project.summary || '';

    $('#dl').replaceChildren(
        ...(project.details || []).map((detail) => {
            const item = document.createElement('li');
            item.textContent = detail;
            return item;
        })
    );

    $('#gd').showModal();

    if (!save.openedProjects[index]) {
        save.openedProjects[index] = true;
        awardXP(100, 'Quest explored');
    }
}

shelf.addEventListener('click', (event) => {
    const card = event.target.closest('.cart');
    if (!card) return;
    openGame(Number(card.dataset.i));
});

shelf.addEventListener('pointermove', (event) => {
    const card = event.target.closest('.cart');

    if (!card || card.classList.contains('locked')) return;

    const box = card.getBoundingClientRect();

    card.style.setProperty(
        '--ry',
        `${((event.clientX - box.left) / box.width - 0.5) * 16}deg`
    );

    card.style.setProperty(
        '--rx',
        `${((event.clientY - box.top) / box.height - 0.5) * -16}deg`
    );
});

shelf.addEventListener('pointerout', (event) => {
    const card = event.target.closest('.cart');
    if (!card) return;

    card.style.removeProperty('--rx');
    card.style.removeProperty('--ry');
});

$('#dc').addEventListener('click', () => $('#gd').close());

function updateLockedProjects() {
    document.querySelectorAll('.cart[data-min-level]').forEach((card) => {
        const required = Number(card.dataset.minLevel || 1);
        const unlocked = getLevel() >= required;
        const badge = card.querySelector('em');

        card.classList.toggle('locked', !unlocked);
        card.setAttribute('aria-disabled', unlocked ? 'false' : 'true');

        if (badge) {
            if (unlocked) {
                badge.textContent = 'Unlocked';
                badge.classList.remove('lock-badge');
            } else {
                badge.textContent = `Lv ${required}`;
                badge.classList.add('lock-badge');
            }
        }
    });
}


// ============================================================
// SECTION EXPLORATION XP
// ============================================================

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const section = entry.target;
            const key = section.id;
            const amount = Number(section.dataset.xp || 0);

            if (!key || save.seenSections[key]) return;

            save.seenSections[key] = true;
            saveGame();
            awardXP(amount, 'Area discovered');
        });
    },
    { threshold: 0.45 }
);

document
    .querySelectorAll('main > .sec[data-xp], .hero[data-xp]')
    .forEach((section) => sectionObserver.observe(section));


// ============================================================
// WORLD MAP
// ============================================================

function go(id) {
    document.getElementById(id)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

function updateWorldMap() {
    const level = getLevel();

    document.querySelectorAll('.map-node').forEach((node) => {
        const required = Number(node.dataset.minLevel || 1);
        const unlocked = level >= required;
        const badge = node.querySelector('.map-level');

        node.classList.toggle('locked', !unlocked);
        node.setAttribute('aria-disabled', unlocked ? 'false' : 'true');

        if (badge) {
            badge.textContent = unlocked ? 'Unlocked' : `Lv ${required}`;
        }

        node.classList.toggle(
            'got',
            Boolean(save.visitedMap[node.dataset.node])
        );
    });
}

function visitMapNode(node) {
    const required = Number(node.dataset.minLevel || 1);

    if (getLevel() < required) {
        const message = `Reach Lv ${required} to enter this area.`;
        talk(message);
        toast(message);
        return;
    }

    const key = node.dataset.node;

    if (!save.visitedMap[key]) {
        save.visitedMap[key] = true;
        awardXP(40, 'Map location discovered');
    }

    const target = node.dataset.target;
    if (target) go(target);
}

document.querySelectorAll('.map-node').forEach((node) => {
    node.addEventListener('click', () => visitMapNode(node));
});


// ============================================================
// TROPHIES
// ============================================================

const trophyObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const trophy = entry.target;
            const key = trophy.dataset.trophy;

            if (!key || save.trophies[key]) return;

            save.trophies[key] = true;
            saveGame();
            trophy.classList.add('got');

            const title = trophy.querySelector('h3')?.textContent || 'Trophy';

            setTimeout(() => {
                awardXP(120, 'Trophy unlocked');
                toast(`🏆 ${title}`);
                hop();
            }, Number(trophy.dataset.delay || 0));
        });
    },
    { threshold: 0.65 }
);

document.querySelectorAll('.tro:not(.lock)').forEach((trophy, index) => {
    const key = trophy.dataset.trophy;

    if (save.trophies[key]) {
        trophy.classList.add('got');
    } else {
        trophy.dataset.delay = (index % 3) * 350;
        trophyObserver.observe(trophy);
    }
});


// ============================================================
// RETURN TO WORLD MAP
// ============================================================

function returnToWorldMap() {
    const map = document.getElementById('world');
    if (!map) return;

    map.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

document.querySelectorAll('[data-return-map]').forEach((button) => {
    button.addEventListener('click', returnToWorldMap);
});


// ============================================================
// COMMAND PALETTE
// ============================================================

const randomQuest = () => {
    const unlocked = G
        .map((project, index) => ({ project, index }))
        .filter(({ project }) => projectUnlocked(project));

    if (!unlocked.length) return;

    const pick = unlocked[Math.floor(Math.random() * unlocked.length)];
    go('quests');

    setTimeout(() => openGame(pick.index), 350);
};

const COMMANDS = [
    ['Go to home base', () => go('home')],
    ['Go to world map', () => go('world')],
    ['Go to save files', () => go('saves')],
    ['Go to quest log', () => go('quests')],
    ['Go to skill tree', () => go('skills')],
    ['Go to side quests', () => go('jobs')],
    ['Go to trophy case', () => go('trophies')],
    ['Go to final boss', () => go('contact')],
    ['Toggle the lamp', lamp],
    ['Open a random quest', randomQuest],
    ['Reset my save', resetGame]
];

let selectedCommand = 0;
let commandList = COMMANDS;

function drawCommands() {
    $('#cmds').innerHTML = commandList
        .map((command, index) => `
            <li>
                <button
                    data-i="${index}"
                    class="${index === selectedCommand ? 'sel' : ''}"
                >
                    ${command[0]}
                </button>
            </li>
        `)
        .join('');
}

function openPalette() {
    $('#q').value = '';
    commandList = COMMANDS;
    selectedCommand = 0;
    drawCommands();
    $('#pal').showModal();
    $('#q').focus();
}

function runCommand(command) {
    if (!command) return;
    $('#pal').close();
    command[1]();
}

$('#q').addEventListener('input', (event) => {
    const value = event.target.value.toLowerCase();

    commandList = COMMANDS.filter((command) =>
        command[0].toLowerCase().includes(value)
    );

    selectedCommand = 0;
    drawCommands();
});

$('#q').addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown') {
        if (commandList.length) {
            selectedCommand = Math.min(
                selectedCommand + 1,
                commandList.length - 1
            );
            drawCommands();
        }
        event.preventDefault();
    }
    else if (event.key === 'ArrowUp') {
        if (commandList.length) {
            selectedCommand = Math.max(selectedCommand - 1, 0);
            drawCommands();
        }
        event.preventDefault();
    }
    else if (event.key === 'Enter' && commandList[selectedCommand]) {
        runCommand(commandList[selectedCommand]);
    }
});

$('#cmds').addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (button) runCommand(commandList[Number(button.dataset.i)]);
});

$('#jump').addEventListener('click', openPalette);

window.addEventListener('keydown', (event) => {
    if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === 'k'
    ) {
        event.preventDefault();
        openPalette();
    }
});


// ============================================================
// DIALOGS
// ============================================================

document.querySelectorAll('dialog').forEach((dialog) => {
    dialog.addEventListener('click', (event) => {
        if (event.target === dialog) dialog.close();
    });
});


// ============================================================
// CLICKING HEARTS
// ============================================================

window.addEventListener('click', (event) => {
    if (event.target.closest('dialog')) return;
    if (event.target.closest('.pcat')) return;

    const heart = document.createElement('span');

    heart.className = 'heart';
    heart.textContent = '♥';
    heart.style.left = `${event.clientX - 8}px`;
    heart.style.top = `${event.clientY - 8}px`;

    document.body.append(heart);

    setTimeout(() => heart.remove(), 1000);
});


// ============================================================
// ORIGINAL SIMPLE PIXEL CAT
// ============================================================

const CAT_IDLE = [
    '.oo........oo...',
    '.obo......obo...',
    '.obbbbbbbbbbo...',
    '.obbbbbbbbbbo...',
    '.obbobbbbobbo...',
    '.obbobbbbobbo...',
    '.obpbbppbbpbo...',
    '..obbbbbbbbo...o',
    '..obbbbbbbbo..ob',
    '.obbbbbbbbbbo.ob',
    '.obbbbbbbbbbo.ob',
    '.obbbbbbbbbboooo',
    '.obbo....obbo...',
    '.oooo....oooo...'
];

const CAT_BLINK = CAT_IDLE.map((row, index) =>
    index === 4 ? '.obbbbbbbbbbo...' : row
);

const CAT_HAPPY = CAT_IDLE.map((row, index) =>
    index === 5 ? '.obobobbobobo...' : row
);

const spr = $('#sprite');
const cat = $('#pcat');
const say = $('#say');

function paint(frame = 'idle') {
    const rows = frame === 'blink'
        ? CAT_BLINK
        : frame === 'happy'
            ? CAT_HAPPY
            : CAT_IDLE;

    const svg = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
    );

    svg.setAttribute('viewBox', '0 0 16 14');
    svg.setAttribute('shape-rendering', 'crispEdges');
    svg.setAttribute('aria-hidden', 'true');

    rows.forEach((row, y) => {
        [...row].forEach((pixel, x) => {
            if (pixel === '.') return;

            const rect = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'rect'
            );

            const classes = {
                o: 'co',
                b: 'cb',
                p: 'cp'
            };

            rect.setAttribute('class', classes[pixel] || 'cb');
            rect.setAttribute('x', x);
            rect.setAttribute('y', y);
            rect.setAttribute('width', '1');
            rect.setAttribute('height', '1');

            svg.appendChild(rect);
        });
    });

    spr.replaceChildren(svg);
}


// ============================================================
// CAT SPEECH / JUMP
// ============================================================

let catBusy = false;
let speechTimer;

function talk(message) {
    say.textContent = message;
    say.classList.add('on');

    clearTimeout(speechTimer);

    speechTimer = setTimeout(() => {
        say.classList.remove('on');
    }, 1900);
}

function hop() {
    if (catBusy) return;

    catBusy = true;
    paint('happy');

    cat.classList.remove('hop');
    void cat.offsetWidth;
    cat.classList.add('hop');

    setTimeout(() => {
        cat.classList.remove('hop');
        paint('idle');
        catBusy = false;
    }, 900);
}

function levelUp(level) {
    talk(level === MAX_LEVEL ? 'MAX LEVEL!' : `Level ${level}!`);
    hop();
}

cat.addEventListener('click', () => {
    talk('Mrrp!');
    hop();
});

setInterval(() => {
    if (catBusy) return;

    paint('blink');

    setTimeout(() => {
        if (!catBusy) paint('idle');
    }, 160);
}, 4200);


// ============================================================
// RESET + INITIALISE
// ============================================================

$('#resetSave').addEventListener('click', resetGame);

updateHUD();
updateWorldMap();
updateLockedProjects();
paint('idle');
