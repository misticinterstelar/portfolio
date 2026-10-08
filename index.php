<?php

// ============================================================
// PORTFOLIO RPG — DATA
// ============================================================

$name  = "Rim Moutai";
$email = "25rimmoutai@gmail.com";

$saves = [
    [
        "title" => "EMSI",
        "sub" => "Software Engineering / Computer Science",
        "text" => "Entering my 3rd year in October 2026. Programming, algorithms, databases, networks, cloud, DevOps, cybersecurity and AI.",
        "tag" => "Playing now",
        "color" => "#8fe0b8"
    ],
    [
        "title" => "Abdelmalek Essaâdi University",
        "sub" => "Management",
        "text" => "A second campaign that teaches me how businesses actually run.",
        "tag" => "Playing now",
        "color" => "#ffd986"
    ],
    [
        "title" => "Next world: USA, 2027",
        "sub" => "Software Engineering / Computer Science",
        "text" => "I plan to continue my studies in the U.S. TOEFL 90/120 is already done.",
        "tag" => "Loading",
        "color" => "#b8a4ff"
    ]
];

$projects = [
    [
        "title" => "Line-Following Robot",
        "kind" => "Embedded systems",
        "tag" => "Completed",
        "color" => "#ff8fb1",
        "summary" => "An Arduino robot that detects a black line with infrared sensors and follows it.",
        "details" => [
            "Hardware: Arduino Uno, IR line sensors, L298N motor driver, two DC motors, 7.4V battery.",
            "Software: Arduino C++, analogRead() sensor thresholds, motor control with PWM speed.",
            "Calibrated the sensors with potentiometers and balanced the two motors.",
            "My part of the group project: the methodology and the code explanation.",
            "Report: problem, objective, methodology, components, wiring, code, cost, conclusion, future work."
        ]
    ],
    [
        "title" => "This portfolio",
        "kind" => "Web development",
        "tag" => "Completed",
        "color" => "#8fe0b8",
        "summary" => "The site you are on, built as a game.",
        "details" => [
            "HTML and CSS for the look, JavaScript for the lamp, RPG progression, quest navigation, project popups, trophies and the pixel companion.",
            "PHP arrays hold my data and render every section.",
            "A PHP contact form that validates and sends messages.",
            "Persistent player progress is stored locally in the browser."
        ]
    ],
    [
        "title" => "Paper-bag business website",
        "kind" => "Web + digital marketing",
        "tag" => "Next quest",
        "color" => "#ffd986",
        "summary" => "A website and online presence for a family business that makes custom paper shopping bags.",
        "details" => [
            "Show the products and make customer inquiries easy, so the same WhatsApp questions stop repeating.",
            "Promote the business on Instagram.",
            "Combines web development, digital marketing and management on a real business.",
            "Status: planning."
        ]
    ],
    [
        "title" => "Cybersecurity lab",
        "kind" => "Cybersecurity",
        "tag" => "Locked",
        "color" => "#b8a4ff",
        "lock" => true,
        "minLevel" => 7,
        "summary" => "A future lab for documenting hands-on cybersecurity exercises and experiments.",
        "details" => [
            "Unlock requirement: reach Level 7.",
            "Status: future quest."
        ]
    ]
];

$skills = [
    ["group" => "Programming", "items" => ["Java", "C++", ".NET"], "built" => ["Arduino C++", "Python"]],
    ["group" => "Web", "items" => ["Angular", "React"], "built" => ["HTML", "CSS", "JavaScript", "PHP"]],
    ["group" => "Computer science", "items" => ["NoSQL", "Operating systems", "Networks", "Software engineering"], "built" => ["Algorithms", "Data structures", "SQL"]],
    ["group" => "Tech frontiers", "items" => ["Cloud computing", "DevOps", "Artificial intelligence"], "built" => ["Cybersecurity"]],
    ["group" => "Hardware", "items" => [], "built" => ["Arduino", "IR sensors", "Motor control (L298N)", "Electronics prototyping"]],
    ["group" => "Business", "items" => ["Management", "Digital marketing"], "built" => ["Sales", "Customer communication", "Business operations"]],
    ["group" => "Human skills", "items" => ["Communication", "Time management"], "built" => ["Working while studying", "Adaptability", "Teamwork", "Problem solving"]]
];

$jobs = [
    [
        "title" => "Operator & Sales",
        "sub" => "Family paper-bag business",
        "text" => "Custom paper shopping bags for shops, bakeries, restaurants and events, with custom sizes, colors, logos and ribbon handles. I help with production and sales and talk to customers.",
        "tag" => "Ongoing",
        "color" => "#ffd986"
    ],
    [
        "title" => "Telemarketer / Academic Adviser",
        "sub" => "Customer-facing role",
        "text" => "Talking with people, advising and persuading. Communication skills that pair well with my management studies.",
        "tag" => "Experience",
        "color" => "#ff8fb1"
    ],
    [
        "title" => "Third-year internship",
        "sub" => "Coming this year",
        "text" => "I'll document my tasks, technologies, results and certificate here once it is done.",
        "tag" => "Locked",
        "color" => "#b8a4ff",
        "lock" => true
    ]
];

$trophies = [
    ["icon" => "🗣️", "title" => "TOEFL 90/120", "text" => "English score for my U.S. plans"],
    ["icon" => "🏆", "title" => "Arduino Hackathon 2025", "text" => "Took part and built under pressure"],
    ["icon" => "🤖", "title" => "Robot online", "text" => "Built an Arduino robot that follows a line"],
    ["icon" => "🦁", "title" => "Lions Clubs International", "text" => "Joined in my first year of membership"],
    ["icon" => "💡", "title" => "InnovxTech member", "text" => "Tech activities beyond the classroom"],
    ["icon" => "🔒", "title" => "Internship certificate", "text" => "Unlocks when the third-year internship is completed", "lock" => true],
    ["icon" => "🔒", "title" => "First certification", "text" => "Unlocks when a cybersecurity certification is completed", "lock" => true]
];

function e($s) {
    return htmlspecialchars($s, ENT_QUOTES, "UTF-8");
}

// ============================================================
// CONTACT FORM
// ============================================================

$note = "";
$sent = false;

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (!empty($_POST["website"])) {
        exit;
    }

    $from = str_replace(["\r", "\n"], " ", trim($_POST["name"] ?? ""));
    $mail = trim($_POST["email"] ?? "");
    $message = trim($_POST["message"] ?? "");

    if ($from === "" || $message === "") {
        $note = "Please fill in your name and message.";
    } elseif (!filter_var($mail, FILTER_VALIDATE_EMAIL)) {
        $note = "That email doesn't look right.";
    } else {
        $sent = mail(
            $email,
            "Portfolio message from $from",
            $message,
            "Reply-To: $mail"
        );

        $note = $sent
            ? "Sent! I'll reply soon ♥"
            : "Couldn't send it. Try emailing me directly.";
    }
}
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">

    <title><?= e($name) ?> | Student, builder, player one</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@400;600;700&family=Press+Start+2P&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>

<body>

<div class="xp" aria-live="polite">
    <span id="lv">Lv 1</span>
    <i><b id="xpb"></b></i>
    <small id="xplabel">0 / 80 XP</small>
</div>

<header>
    <span class="logo"><?= e($name) ?></span>
    <button class="btn ghost" id="jump">Jump to <kbd>Ctrl K</kbd></button>
</header>

<main>

    <!-- ====================================================== -->
    <!-- HERO -->
    <!-- ====================================================== -->

    <section class="hero" id="home">
        <span class="spark" style="left:46%;top:10%" aria-hidden="true">✦</span>
        <span class="spark" style="left:90%;top:24%;animation-delay:-1s" aria-hidden="true">✧</span>
        <span class="spark" style="left:4%;top:86%;animation-delay:-2s" aria-hidden="true">✦</span>

        <div>
            <span class="hi">Player 1: <?= e($name) ?> 🎮</span>
            <h1>Level 3 engineer with a management side class.</h1>

            <p class="lead">
                I study software engineering at EMSI and management at Abdelmalek Essaâdi University in Morocco.
                I like building things that work in the real world, from Arduino robots to business websites.
            </p>

            <p class="stats">
                <span>Software engineering</span>
                <span>Management</span>
                <span>Cybersecurity</span>
                <span>Embedded systems</span>
            </p>

            <div class="row">
                <a class="btn" href="#quests">Open the quest log</a>
                <a class="btn ghost" href="cv.pdf">Download my CV</a>
            </div>

            <!-- PLAYER PROFILE -->
            <article class="profile" id="profile">
                <div class="profile-top">
                    <div>
                        <div class="profile-label">Player profile</div>
                        <h3><?= e($name) ?></h3>
                        <div class="profile-label">Player constellation</div>
                    </div>

                    <!-- Pixel constellation instead of a cat avatar -->
                    <div class="constellation" aria-hidden="true">
                        <svg viewBox="0 0 190 130" shape-rendering="crispEdges">
                            <path class="constellation-line" d="M25 92L57 55L92 78L120 35L154 57L169 21" />
                            <path class="constellation-line" d="M57 55L77 20L120 35" />
                            <path class="constellation-line" d="M92 78L131 101L154 57" />

                            <g class="constellation-star star-1">
                                <rect x="22" y="89" width="7" height="7" />
                                <rect x="24" y="86" width="3" height="13" />
                            </g>
                            <g class="constellation-star star-2">
                                <rect x="53" y="51" width="9" height="9" />
                                <rect x="56" y="47" width="3" height="17" />
                            </g>
                            <g class="constellation-star star-3">
                                <rect x="88" y="74" width="9" height="9" />
                                <rect x="91" y="70" width="3" height="17" />
                            </g>
                            <g class="constellation-star star-4">
                                <rect x="116" y="31" width="9" height="9" />
                                <rect x="119" y="27" width="3" height="17" />
                            </g>
                            <g class="constellation-star star-5">
                                <rect x="150" y="53" width="8" height="8" />
                                <rect x="152" y="49" width="4" height="16" />
                            </g>
                            <g class="constellation-star star-6">
                                <rect x="165" y="17" width="8" height="8" />
                                <rect x="167" y="13" width="4" height="16" />
                            </g>
                            <g class="constellation-star star-7">
                                <rect x="73" y="16" width="8" height="8" />
                                <rect x="75" y="12" width="4" height="16" />
                            </g>
                            <g class="constellation-star star-8">
                                <rect x="127" y="97" width="8" height="8" />
                                <rect x="129" y="93" width="4" height="16" />
                            </g>

                            <text x="15" y="116">BUILD</text>
                            <text x="84" y="113">LEARN</text>
                            <text x="143" y="92">GROW</text>
                        </svg>
                    </div>
                </div>

                <p class="constellation-note">
                    A little map of the path: build things, keep learning, and grow toward the next world.
                </p>

                <div class="profile-grid">
                    <div class="profile-stat">
                        <strong>Class</strong>
                        <span>Software Engineer</span>
                    </div>
                    <div class="profile-stat">
                        <strong>Secondary class</strong>
                        <span>Management</span>
                    </div>
                    <div class="profile-stat">
                        <strong>Specializations</strong>
                        <span>Web · Embedded · Cybersecurity</span>
                    </div>
                    <div class="profile-stat">
                        <strong>Next world</strong>
                        <span>USA — 2027</span>
                    </div>
                </div>

                <div class="profile-xp">
                    <div class="profile-xp-line">
                        <span id="profileLevel">Lv 1</span>
                        <span id="profileXp">0 / 80 XP</span>
                    </div>
                    <div class="profile-bar"><b id="profileBar"></b></div>
                </div>

                <div class="save-panel">
                    <span class="save-state">
                        <span class="save-dot"></span>
                        <span id="saveStatus">Progress saved locally</span>
                    </span>
                    <button class="btn danger" type="button" id="resetSave">Reset save</button>
                </div>
            </article>
        </div>

        <!-- LAMP -->
        <button class="lamp" id="lamp" aria-label="Toggle the lamp">
            <svg viewBox="0 0 390 340" aria-hidden="true">
                <polygon class="cone" points="118,118 222,118 312,308 28,308" fill="var(--gold)"/>
                <rect x="0" y="308" width="390" height="10" rx="5" fill="var(--line)"/>
                <ellipse cx="110" cy="300" rx="46" ry="9" fill="var(--ink)"/>
                <path d="M110 294V200L165 100" stroke="var(--ink)" stroke-width="7" stroke-linecap="round" fill="none"/>
                <path d="M140 70H200L224 118H116Z" fill="var(--gold)" stroke="var(--ink)" stroke-width="4" stroke-linejoin="round"/>
                <rect x="132" y="288" width="72" height="20" rx="10" fill="var(--moss)" stroke="var(--ink)" stroke-width="3"/>
                <circle cx="150" cy="298" r="4" fill="var(--ink)"/>
                <circle cx="184" cy="296" r="3" fill="var(--ink)"/>
                <circle cx="192" cy="300" r="3" fill="var(--ink)"/>
                <rect x="236" y="268" width="38" height="38" rx="9" fill="var(--rose)" stroke="var(--ink)" stroke-width="3"/>
                <path d="M274 276q16 2 0 20" fill="none" stroke="var(--ink)" stroke-width="3"/>
                <path class="steam" pathLength="24" d="M248 258q-7-9 0-17t0-17" fill="none" stroke="var(--mute)" stroke-width="3" stroke-linecap="round"/>
                <path class="steam" pathLength="24" style="animation-delay:-1.6s" d="M262 258q-7-9 0-17t0-17" fill="none" stroke="var(--mute)" stroke-width="3" stroke-linecap="round"/>

                <!-- original desk cat -->
                <path d="M366 298q24-6 12-34" fill="none" stroke="var(--ink)" stroke-width="12" stroke-linecap="round"/>
                <path d="M366 298q24-6 12-34" fill="none" stroke="var(--lilac)" stroke-width="6" stroke-linecap="round"/>
                <ellipse cx="335" cy="288" rx="36" ry="21" fill="var(--lilac)" stroke="var(--ink)" stroke-width="3"/>
                <polygon points="314,250 316,224 337,240" fill="var(--lilac)" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round"/>
                <polygon points="333,240 354,224 357,250" fill="var(--lilac)" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round"/>
                <circle cx="335" cy="262" r="24" fill="var(--lilac)" stroke="var(--ink)" stroke-width="3"/>
                <ellipse class="blink" cx="326" cy="261" rx="3" ry="4.5" fill="var(--ink)"/>
                <ellipse class="blink" cx="344" cy="261" rx="3" ry="4.5" fill="var(--ink)"/>
                <circle cx="318" cy="270" r="4.5" fill="var(--rose)" opacity=".7"/>
                <circle cx="352" cy="270" r="4.5" fill="var(--rose)" opacity=".7"/>
                <path d="M331 269q4 4 8 0" fill="none" stroke="var(--ink)" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
            <small>Tap the lamp</small>
        </button>
    </section>


    <!-- ====================================================== -->
    <!-- WORLD MAP -->
    <!-- ====================================================== -->

    <section class="sec" id="world">
        <div class="section-head">
            <div>
                <div class="section-kicker">Overworld</div>
                <h2>World map</h2>
            </div>
            <span class="map-hint">Tap a location to fast-travel</span>
        </div>
        <p>Explore locations to reveal more of the player behind the portfolio.</p>

        <div class="world-map">
            <div class="map-grid">
                <button class="map-node" data-node="home" data-target="home" data-min-level="1">
                    <span class="map-icon">🏠</span><b>Home Base</b><small class="map-level">Unlocked</small>
                </button>
                <button class="map-node" data-node="saves" data-target="saves" data-min-level="1">
                    <span class="map-icon">💾</span><b>Save Files</b><small class="map-level">Unlocked</small>
                </button>
                <button class="map-node" data-node="quests" data-target="quests" data-min-level="2">
                    <span class="map-icon">⚔️</span><b>Quest Log</b><small class="map-level">Lv 2</small>
                </button>
                <button class="map-node" data-node="skills" data-target="skills" data-min-level="3">
                    <span class="map-icon">🌳</span><b>Skill Tree</b><small class="map-level">Lv 3</small>
                </button>
                <button class="map-node" data-node="jobs" data-target="jobs" data-min-level="4">
                    <span class="map-icon">💼</span><b>Side Quests</b><small class="map-level">Lv 4</small>
                </button>
                <button class="map-node" data-node="trophies" data-target="trophies" data-min-level="5">
                    <span class="map-icon">🏆</span><b>Trophy Case</b><small class="map-level">Lv 5</small>
                </button>
                <button class="map-node" data-node="contact" data-target="contact" data-min-level="6">
                    <span class="map-icon">💌</span><b>Final Boss</b><small class="map-level">Lv 6</small>
                </button>
                <button class="map-node" data-node="cyber" data-target="quests" data-min-level="7">
                    <span class="map-icon">🔐</span><b>Cyber Lab</b><small class="map-level">Lv 7</small>
                </button>
            </div>
        </div>
    </section>


    <!-- ====================================================== -->
    <!-- SAVE FILES -->
    <!-- ====================================================== -->

    <section class="sec" id="saves" data-xp="90">
        <div class="section-kicker">Campaigns</div>
        <h2>Save files</h2>
        <p>Two campaigns running at once, and a third one loading.</p>

        <div class="saves">
            <?php foreach ($saves as $g): ?>
                <article class="save <?= !empty($g["lock"]) ? "lock" : "" ?>" style="--c:<?= e($g["color"]) ?>">
                    <span class="tag"><?= e($g["tag"]) ?></span>
                    <h3><?= e($g["title"]) ?></h3>
                    <b><?= e($g["sub"]) ?></b>
                    <p><?= e($g["text"]) ?></p>
                </article>
            <?php endforeach; ?>
        </div>

        <div class="return-map-wrap">
            <button class="return-map" type="button" data-return-map>
                <span class="return-map-arrow">↟</span>
                <span>Return to World Map</span>
                <small>Choose your next area</small>
            </button>
        </div>
    </section>


    <!-- ====================================================== -->
    <!-- QUEST LOG -->
    <!-- ====================================================== -->

    <section class="sec" id="quests" data-xp="100">
        <div class="section-kicker">Missions</div>
        <h2>Quest log</h2>
        <p>Open projects for details. The cyber quest unlocks at Level 7.</p>

        <div id="shelf">
            <?php foreach ($projects as $i => $g): ?>
                <button
                    class="cart <?= !empty($g["lock"]) ? "locked" : "" ?>"
                    data-i="<?= $i ?>"
                    data-min-level="<?= (int)($g["minLevel"] ?? 1) ?>"
                    aria-disabled="<?= !empty($g["lock"]) ? "true" : "false" ?>"
                    style="--c:<?= e($g["color"]) ?>"
                >
                    <b><?= e($g["title"]) ?></b>
                    <small><?= e($g["kind"]) ?></small>
                    <em class="<?= !empty($g["lock"]) ? "lock-badge" : "" ?>">
                        <?= !empty($g["lock"]) ? "Lv " . (int)($g["minLevel"] ?? 1) : e($g["tag"]) ?>
                    </em>
                </button>
            <?php endforeach; ?>
        </div>

        <div class="return-map-wrap">
            <button class="return-map" type="button" data-return-map>
                <span class="return-map-arrow">↟</span>
                <span>Return to World Map</span>
                <small>Choose your next quest</small>
            </button>
        </div>
    </section>


    <!-- ====================================================== -->
    <!-- SKILLS -->
    <!-- ====================================================== -->

    <section class="sec" id="skills" data-xp="90">
        <div class="section-kicker">Abilities</div>
        <h2>Skill tree</h2>
        <p>Gold stars mark skills I've used in a real project or job.</p>

        <div class="saves">
            <?php foreach ($skills as $g): ?>
                <div class="grp">
                    <h3><?= e($g["group"]) ?></h3>
                    <ul class="chips">
                        <?php foreach ($g["built"] as $x): ?>
                            <li class="built">★ <?= e($x) ?></li>
                        <?php endforeach; ?>
                        <?php foreach ($g["items"] as $x): ?>
                            <li><?= e($x) ?></li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            <?php endforeach; ?>
        </div>

        <div class="return-map-wrap">
            <button class="return-map" type="button" data-return-map>
                <span class="return-map-arrow">↟</span>
                <span>Return to World Map</span>
                <small>Choose your next area</small>
            </button>
        </div>
    </section>


    <!-- ====================================================== -->
    <!-- JOBS -->
    <!-- ====================================================== -->

    <section class="sec" id="jobs" data-xp="90">
        <div class="section-kicker">Experience</div>
        <h2>Side quests</h2>
        <p>Work experience, plus the internship that's about to start.</p>

        <div class="saves">
            <?php foreach ($jobs as $g): ?>
                <article class="save <?= !empty($g["lock"]) ? "lock" : "" ?>" style="--c:<?= e($g["color"]) ?>">
                    <span class="tag"><?= e($g["tag"]) ?></span>
                    <h3><?= e($g["title"]) ?></h3>
                    <b><?= e($g["sub"]) ?></b>
                    <p><?= e($g["text"]) ?></p>
                </article>
            <?php endforeach; ?>
        </div>

        <div class="return-map-wrap">
            <button class="return-map" type="button" data-return-map>
                <span class="return-map-arrow">↟</span>
                <span>Return to World Map</span>
                <small>Choose your next side quest</small>
            </button>
        </div>
    </section>


    <!-- ====================================================== -->
    <!-- TROPHIES -->
    <!-- ====================================================== -->

    <section class="sec" id="trophies" data-xp="110">
        <div class="section-kicker">Achievements</div>
        <h2>Trophy case</h2>
        <p>Real achievements unlock as you reach them. Future achievements stay locked.</p>

        <ul class="cab" id="cab">
            <?php foreach ($trophies as $i => $t): ?>
                <li class="tro <?= !empty($t["lock"]) ? "lock" : "" ?>" data-trophy="trophy-<?= $i ?>">
                    <span class="ic"><?= $t["icon"] ?></span>
                    <h3><?= e($t["title"]) ?></h3>
                    <p><?= e($t["text"]) ?></p>
                </li>
            <?php endforeach; ?>
        </ul>

        <div class="return-map-wrap">
            <button class="return-map" type="button" data-return-map>
                <span class="return-map-arrow">↟</span>
                <span>Return to World Map</span>
                <small>Choose your next area</small>
            </button>
        </div>
    </section>


    <!-- ====================================================== -->
    <!-- CONTACT -->
    <!-- ====================================================== -->

    <section class="sec" id="contact" data-xp="100">
        <div class="section-kicker">End of demo</div>
        <h2>Join my lobby</h2>
        <p>Open to internships, collabs and good conversations about tech. Send me a message.</p>

        <?php if ($note): ?>
            <div class="note <?= $sent ? "ok" : "err" ?>" role="status">
                <?= e($note) ?>
            </div>
        <?php endif; ?>

        <form method="post" action="#contact">
            <input name="name" placeholder="Your name" aria-label="Your name" required value="<?= $sent ? "" : e($_POST["name"] ?? "") ?>">
            <input name="email" type="email" placeholder="Your email" aria-label="Your email" required value="<?= $sent ? "" : e($_POST["email"] ?? "") ?>">
            <textarea name="message" rows="4" placeholder="Your message" aria-label="Message" required><?= $sent ? "" : e($_POST["message"] ?? "") ?></textarea>
            <input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
            <button class="btn" type="submit">Press start</button>
        </form>

        <div class="return-map-wrap">
            <button class="return-map" type="button" data-return-map>
                <span class="return-map-arrow">↟</span>
                <span>Return to World Map</span>
                <small>Choose where to explore next</small>
            </button>
        </div>
    </section>

</main>

<footer>
    Made with HTML, CSS, JavaScript, PHP and one cup of tea.
    <br>
    <small>Your RPG progress is stored only in this browser.</small>
</footer>




<!-- ========================================================== -->
<!-- PROJECT DIALOG -->
<!-- ========================================================== -->

<dialog id="gd">
    <h2 id="dt"></h2>
    <p><span class="tag" id="dg"></span></p>
    <p id="dq"></p>
    <ul id="dl"></ul>
    <button class="btn" id="dc">Back to the quest log</button>
</dialog>


<!-- ========================================================== -->
<!-- COMMAND PALETTE -->
<!-- ========================================================== -->

<dialog id="pal">
    <input id="q" placeholder="Jump to..." aria-label="Search commands" autocomplete="off">
    <ul id="cmds"></ul>
</dialog>

<div id="toast" role="status" aria-live="polite"></div>


<!-- ORIGINAL SIMPLE PIXEL CAT -->

<button class="pcat" id="pcat" aria-label="Pixel cat. Press to make it hop.">
    <span class="say" id="say" aria-hidden="true"></span>
    <span id="sprite"></span>
</button>


<script>
    const PROJECTS = <?= json_encode($projects, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_QUOT) ?>;
</script>
<script src="script.js"></script>

</body>
</html>
