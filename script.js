// ============================================================
// PORTFOLIO RPG ENGINE + ENGLISH / FRENCH / SPANISH
// ============================================================

const $ = (selector) => document.querySelector(selector);
const R = document.documentElement;
const G = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];

const LANGUAGE_KEY = 'portfolio_language';
let currentLanguage = 'en';

// Text that is added dynamically by JavaScript also lives here.
// Any text not listed in French or Spanish falls back to the original English HTML.
const I18N = {
    en: {
        'language.aria': 'Select language',
        'save.saved': 'Progress saved locally', 'save.autoUnavailable': 'Auto-save unavailable',
        'common.unlocked': 'Unlocked', 'common.level': 'Lv {{level}}',
        'reset.confirm': 'Reset your portfolio save and start from Lv 1?',
        'toast.lampOn': 'Lamp on', 'toast.lampOff': 'Lamp off',
        'toast.xp': '+{{amount}} XP — {{reason}}', 'reason.quest': 'Quest explored',
        'reason.area': 'Area discovered', 'reason.map': 'Map location discovered', 'reason.trophy': 'Trophy unlocked',
        'toast.reachProject': 'Reach Lv {{level}} to unlock this quest.',
        'toast.reachMap': 'Reach Lv {{level}} to enter this area.',
        'cat.maxLevel': 'MAX LEVEL!', 'cat.levelUp': 'Level {{level}}!',
        'xp.max': 'MAX', 'xp.maxLevel': 'MAX LEVEL',
        'commands.home': 'Go to home base', 'commands.world': 'Go to world map',
        'commands.saves': 'Go to save files', 'commands.quests': 'Go to quest log',
        'commands.skills': 'Go to skill tree', 'commands.jobs': 'Go to side quests',
        'commands.trophies': 'Go to trophy case', 'commands.contact': 'Go to final boss',
        'commands.lamp': 'Toggle the lamp', 'commands.random': 'Open a random quest', 'commands.reset': 'Reset my save'
    },
    fr: {
        'language.label': 'Langue', 'language.aria': 'Choisir la langue',
        'nav.jump': 'Aller à',
        'hero.playerPrefix': 'Joueuse 1 :',
        'hero.title': 'Étudiante en ingénierie de 3e année, avec une seconde spécialité en gestion.',
        'hero.lead': 'J’étudie le génie logiciel à l’EMSI et la gestion à l’Université Abdelmalek Essaâdi, au Maroc. J’aime créer des solutions concrètes, des robots Arduino aux sites web pour les entreprises.',
        'hero.stat0': 'Génie logiciel', 'hero.stat1': 'Gestion', 'hero.stat2': 'Cybersécurité', 'hero.stat3': 'Systèmes embarqués',
        'hero.openQuests': 'Voir les quêtes', 'hero.downloadCv': 'Télécharger mon CV',
        'profile.label': 'Profil de joueuse', 'profile.constellation': 'Constellation de la joueuse',
        'profile.build': 'CRÉER', 'profile.learn': 'APPRENDRE', 'profile.grow': 'ÉVOLUER',
        'profile.note': 'Une petite carte de mon parcours : créer, continuer à apprendre et évoluer vers le prochain monde.',
        'profile.class': 'Classe', 'profile.engineer': 'Ingénieure logiciel', 'profile.secondaryClass': 'Classe secondaire',
        'profile.specializations': 'Spécialisations', 'profile.specializationList': 'Web · Embarqué · Cybersécurité',
        'profile.nextWorld': 'Prochain monde', 'profile.resetSave': 'Réinitialiser la sauvegarde',
        'save.saved': 'Progression enregistrée sur cet appareil', 'save.autoUnavailable': 'Sauvegarde automatique indisponible',
        'lamp.toggle': 'Allumer ou éteindre la lampe', 'lamp.tap': 'Touchez la lampe',
        'map.kicker': 'Monde ouvert', 'map.title': 'Carte du monde', 'map.hint': 'Touchez un lieu pour vous y déplacer',
        'map.desc': 'Explorez les lieux pour découvrir la personne derrière ce portfolio.',
        'map.home': 'Base principale', 'map.saves': 'Fichiers de sauvegarde', 'map.quests': 'Journal des quêtes',
        'map.skills': 'Arbre de compétences', 'map.jobs': 'Quêtes annexes', 'map.trophies': 'Trophées',
        'map.contact': 'Boss final', 'map.cyber': 'Laboratoire cyber', 'common.unlocked': 'Débloqué', 'common.level': 'Niv. {{level}}',
        'saves.kicker': 'Campagnes', 'saves.title': 'Fichiers de sauvegarde',
        'saves.desc': 'Deux campagnes en cours, et une troisième en préparation.',
        'return.map': 'Retour à la carte du monde', 'return.area': 'Choisissez la prochaine zone',
        'return.quest': 'Choisissez la prochaine quête', 'return.skill': 'Choisissez la prochaine compétence',
        'return.job': 'Choisissez la prochaine quête annexe', 'return.trophy': 'Choisissez le prochain succès',
        'return.contact': 'Choisissez où explorer ensuite',
        'quests.kicker': 'Missions', 'quests.title': 'Journal des quêtes',
        'quests.desc': 'Ouvrez les projets pour en savoir plus. La quête cybersécurité se débloque au niveau 7.',
        'skills.kicker': 'Capacités', 'skills.title': 'Arbre de compétences',
        'skills.desc': 'Les étoiles dorées indiquent les compétences utilisées dans un vrai projet ou emploi.',
        'jobs.kicker': 'Expérience', 'jobs.title': 'Quêtes annexes',
        'jobs.desc': 'Mon expérience professionnelle et le stage de troisième année à venir.',
        'trophies.kicker': 'Succès', 'trophies.title': 'Vitrine des trophées',
        'trophies.desc': 'Les succès se débloquent au fil de votre progression. Ceux à venir restent verrouillés.',
        'contact.kicker': 'Fin de la démo', 'contact.title': 'Rejoignez mon salon',
        'contact.desc': 'Disponible pour des stages, des collaborations et des discussions autour de la technologie. Envoyez-moi un message.',
        'form.name': 'Votre nom', 'form.email': 'Votre adresse e-mail', 'form.message': 'Votre message',
        'form.messageLabel': 'Message', 'form.submit': 'Envoyer', 'form.errorRequired': 'Veuillez indiquer votre nom et votre message.',
        'form.errorEmail': 'Cette adresse e-mail ne semble pas valide.', 'form.sent': 'Message envoyé ! Je vous répondrai bientôt ♥',
        'form.errorSend': 'Envoi impossible. Essayez de m’écrire directement par e-mail.',
        'footer.made': 'Créé avec HTML, CSS, JavaScript, PHP et une tasse de thé.',
        'footer.save': 'Votre progression RPG est enregistrée uniquement dans ce navigateur.',
        'dialog.back': 'Retour au journal des quêtes', 'commands.placeholder': 'Aller à…', 'commands.search': 'Rechercher des commandes',
        'cat.label': 'Chat pixel. Appuyez pour le faire sauter.', 'page.title': 'Rim Moutai | Étudiante, créatrice et joueuse',

        'save.0.title': 'EMSI', 'save.0.sub': 'Génie logiciel / Informatique',
        'save.0.text': 'Je commence ma troisième année en octobre 2026. Programmation, algorithmes, bases de données, réseaux, cloud, DevOps, cybersécurité et IA.',
        'save.0.tag': 'En cours',
        'save.1.title': 'Université Abdelmalek Essaâdi', 'save.1.sub': 'Gestion',
        'save.1.text': 'Une deuxième campagne pour comprendre comment les entreprises fonctionnent réellement.', 'save.1.tag': 'En cours',
        'save.2.title': 'Prochain monde : États-Unis, 2027', 'save.2.sub': 'Génie logiciel / Informatique',
        'save.2.text': 'Je prévois de poursuivre mes études aux États-Unis. Le TOEFL est déjà validé avec 90/120.', 'save.2.tag': 'En préparation',

        'project.0.title': 'Robot suiveur de ligne', 'project.0.kind': 'Systèmes embarqués', 'project.0.tag': 'Terminé',
        'project.0.summary': 'Un robot Arduino qui détecte une ligne noire grâce à des capteurs infrarouges et la suit.',
        'project.0.detail.0': 'Matériel : Arduino Uno, capteurs de ligne IR, pilote moteur L298N, deux moteurs CC, batterie 7,4 V.',
        'project.0.detail.1': 'Logiciel : Arduino C++, seuils des capteurs avec analogRead(), commande des moteurs par PWM.',
        'project.0.detail.2': 'Étalonnage des capteurs avec les potentiomètres et équilibrage des deux moteurs.',
        'project.0.detail.3': 'Ma contribution au projet de groupe : méthodologie et explication du code.',
        'project.0.detail.4': 'Rapport : problème, objectif, méthodologie, composants, câblage, code, coût, conclusion et perspectives.',
        'project.1.title': 'Ce portfolio', 'project.1.kind': 'Développement web', 'project.1.tag': 'Terminé',
        'project.1.summary': 'Le site que vous consultez, conçu comme un jeu.',
        'project.1.detail.0': 'HTML et CSS pour le design, JavaScript pour la lampe, la progression RPG, la navigation des quêtes, les fenêtres de projet, les trophées et le compagnon pixelisé.',
        'project.1.detail.1': 'Les tableaux PHP stockent mes données et génèrent les différentes sections.',
        'project.1.detail.2': 'Un formulaire de contact PHP qui valide et envoie les messages.',
        'project.1.detail.3': 'La progression du joueur est enregistrée localement dans le navigateur.',
        'project.2.title': 'Site web pour l’entreprise de sacs en papier', 'project.2.kind': 'Web et marketing numérique', 'project.2.tag': 'Prochaine quête',
        'project.2.summary': 'Un site web et une présence en ligne pour une entreprise familiale qui fabrique des sacs de courses en papier personnalisés.',
        'project.2.detail.0': 'Présenter les produits et faciliter les demandes des clients afin d’éviter de répéter les mêmes réponses sur WhatsApp.',
        'project.2.detail.1': 'Promouvoir l’entreprise sur Instagram.',
        'project.2.detail.2': 'Combiner développement web, marketing numérique et gestion dans une vraie entreprise.',
        'project.2.detail.3': 'État : en préparation.',
        'project.3.title': 'Laboratoire de cybersécurité', 'project.3.kind': 'Cybersécurité', 'project.3.tag': 'Verrouillé',
        'project.3.summary': 'Un futur laboratoire pour documenter des exercices pratiques et des expériences en cybersécurité.',
        'project.3.detail.0': 'Condition de déblocage : atteindre le niveau 7.', 'project.3.detail.1': 'État : future quête.',

        'skill.group.0': 'Programmation', 'skill.group.1': 'Web', 'skill.group.2': 'Informatique',
        'skill.group.3': 'Technologies émergentes', 'skill.group.4': 'Matériel', 'skill.group.5': 'Entreprise', 'skill.group.6': 'Compétences humaines',
        'skill.2.built.0': '★ Algorithmes', 'skill.2.built.1': '★ Structures de données',
        'skill.2.item.1': 'Systèmes d’exploitation', 'skill.2.item.2': 'Réseaux', 'skill.2.item.3': 'Génie logiciel',
        'skill.3.built.0': '★ Cybersécurité', 'skill.3.item.0': 'Cloud computing', 'skill.3.item.1': 'DevOps', 'skill.3.item.2': 'Intelligence artificielle',
        'skill.4.built.0': '★ Arduino', 'skill.4.built.1': '★ Capteurs infrarouges', 'skill.4.built.2': '★ Commande moteur (L298N)', 'skill.4.built.3': '★ Prototypage électronique',
        'skill.5.item.0': 'Gestion', 'skill.5.item.1': 'Marketing numérique',
        'skill.6.item.0': 'Communication', 'skill.6.item.1': 'Gestion du temps',
        'skill.5.built.0': '★ Ventes', 'skill.5.built.1': '★ Relation client', 'skill.5.built.2': '★ Opérations commerciales',
        'skill.6.built.0': '★ Étudier tout en travaillant', 'skill.6.built.1': '★ Adaptabilité', 'skill.6.built.2': '★ Travail en équipe', 'skill.6.built.3': '★ Résolution de problèmes',

        'job.0.title': 'Opératrice et ventes', 'job.0.sub': 'Entreprise familiale de sacs en papier',
        'job.0.text': 'Sacs de courses personnalisés pour magasins, boulangeries, restaurants et événements, avec tailles, couleurs, logos et anses en ruban sur mesure. Je participe à la production, aux ventes et aux échanges avec les clients.', 'job.0.tag': 'En cours',
        'job.1.title': 'Télémarketing / Conseillère pédagogique', 'job.1.sub': 'Poste en contact avec la clientèle',
        'job.1.text': 'Échanger avec les personnes, les conseiller et les convaincre. Des compétences en communication qui complètent mes études en gestion.', 'job.1.tag': 'Expérience',
        'job.2.title': 'Stage de troisième année', 'job.2.sub': 'Prévu cette année',
        'job.2.text': 'J’ajouterai ici mes missions, technologies, résultats et attestation une fois le stage terminé.', 'job.2.tag': 'Verrouillé',

        'trophy.0.title': 'TOEFL 90/120', 'trophy.0.text': 'Score d’anglais pour mon projet d’études aux États-Unis',
        'trophy.1.title': 'Arduino Hackathon 2025', 'trophy.1.text': 'Participation et création sous pression',
        'trophy.2.title': 'Robot opérationnel', 'trophy.2.text': 'Création d’un robot Arduino suiveur de ligne',
        'trophy.3.title': 'Lions Clubs International', 'trophy.3.text': 'Première année d’adhésion',
        'trophy.4.title': 'Membre InnovxTech', 'trophy.4.text': 'Activités technologiques en dehors des cours',
        'trophy.5.title': 'Attestation de stage', 'trophy.5.text': 'Se débloque à la fin du stage de troisième année',
        'trophy.6.title': 'Première certification', 'trophy.6.text': 'Se débloque après une certification en cybersécurité',

        'reset.confirm': 'Réinitialiser la sauvegarde du portfolio et recommencer au niveau 1 ?',
        'toast.lampOn': 'Lampe allumée', 'toast.lampOff': 'Lampe éteinte',
        'toast.xp': '+{{amount}} XP — {{reason}}', 'reason.quest': 'Quête explorée', 'reason.area': 'Zone découverte',
        'reason.map': 'Lieu découvert sur la carte', 'reason.trophy': 'Trophée débloqué',
        'toast.reachProject': 'Atteignez le niveau {{level}} pour débloquer cette quête.',
        'toast.reachMap': 'Atteignez le niveau {{level}} pour accéder à cette zone.',
        'cat.maxLevel': 'NIVEAU MAX !', 'cat.levelUp': 'Niveau {{level}} !',
        'xp.max': 'MAX', 'xp.maxLevel': 'NIVEAU MAX',
        'commands.home': 'Aller à la base principale', 'commands.world': 'Aller à la carte du monde',
        'commands.saves': 'Aller aux fichiers de sauvegarde', 'commands.quests': 'Aller au journal des quêtes',
        'commands.skills': 'Aller à l’arbre de compétences', 'commands.jobs': 'Aller aux quêtes annexes',
        'commands.trophies': 'Aller aux trophées', 'commands.contact': 'Aller au boss final',
        'commands.lamp': 'Allumer ou éteindre la lampe', 'commands.random': 'Ouvrir une quête au hasard', 'commands.reset': 'Réinitialiser ma sauvegarde'
    },
    es: {
        'language.label': 'Idioma', 'language.aria': 'Elegir idioma',
        'nav.jump': 'Ir a',
        'hero.playerPrefix': 'Jugadora 1:',
        'hero.title': 'Estudiante de ingeniería de tercer año con una especialidad secundaria en gestión.',
        'hero.lead': 'Estudio ingeniería de software en EMSI y gestión en la Universidad Abdelmalek Essaâdi, en Marruecos. Me gusta crear soluciones reales, desde robots Arduino hasta sitios web para empresas.',
        'hero.stat0': 'Ingeniería de software', 'hero.stat1': 'Gestión', 'hero.stat2': 'Ciberseguridad', 'hero.stat3': 'Sistemas embebidos',
        'hero.openQuests': 'Ver misiones', 'hero.downloadCv': 'Descargar mi CV',
        'profile.label': 'Perfil de jugadora', 'profile.constellation': 'Constelación de la jugadora',
        'profile.build': 'CREAR', 'profile.learn': 'APRENDER', 'profile.grow': 'CRECER',
        'profile.note': 'Un pequeño mapa de mi camino: crear, seguir aprendiendo y crecer hacia el próximo mundo.',
        'profile.class': 'Clase', 'profile.engineer': 'Ingeniera de software', 'profile.secondaryClass': 'Clase secundaria',
        'profile.specializations': 'Especializaciones', 'profile.specializationList': 'Web · Embebidos · Ciberseguridad',
        'profile.nextWorld': 'Próximo mundo', 'profile.resetSave': 'Reiniciar partida',
        'save.saved': 'Progreso guardado en este dispositivo', 'save.autoUnavailable': 'Guardado automático no disponible',
        'lamp.toggle': 'Encender o apagar la lámpara', 'lamp.tap': 'Toca la lámpara',
        'map.kicker': 'Mundo abierto', 'map.title': 'Mapa del mundo', 'map.hint': 'Toca una ubicación para viajar rápidamente',
        'map.desc': 'Explora ubicaciones para descubrir a la persona detrás de este portfolio.',
        'map.home': 'Base principal', 'map.saves': 'Partidas guardadas', 'map.quests': 'Registro de misiones',
        'map.skills': 'Árbol de habilidades', 'map.jobs': 'Misiones secundarias', 'map.trophies': 'Vitrina de trofeos',
        'map.contact': 'Jefe final', 'map.cyber': 'Laboratorio de ciberseguridad', 'common.unlocked': 'Desbloqueado', 'common.level': 'Nv. {{level}}',
        'saves.kicker': 'Campañas', 'saves.title': 'Partidas guardadas',
        'saves.desc': 'Dos campañas en marcha y una tercera en preparación.',
        'return.map': 'Volver al mapa del mundo', 'return.area': 'Elige la próxima zona',
        'return.quest': 'Elige la próxima misión', 'return.skill': 'Elige la próxima habilidad',
        'return.job': 'Elige la próxima misión secundaria', 'return.trophy': 'Elige el próximo logro',
        'return.contact': 'Elige dónde explorar después',
        'quests.kicker': 'Misiones', 'quests.title': 'Registro de misiones',
        'quests.desc': 'Abre los proyectos para ver los detalles. La misión de ciberseguridad se desbloquea en el nivel 7.',
        'skills.kicker': 'Habilidades', 'skills.title': 'Árbol de habilidades',
        'skills.desc': 'Las estrellas doradas indican habilidades que he utilizado en un proyecto o trabajo real.',
        'jobs.kicker': 'Experiencia', 'jobs.title': 'Misiones secundarias',
        'jobs.desc': 'Experiencia laboral y las prácticas de tercer año que están por comenzar.',
        'trophies.kicker': 'Logros', 'trophies.title': 'Vitrina de trofeos',
        'trophies.desc': 'Los logros se desbloquean a medida que avanzas. Los futuros permanecen bloqueados.',
        'contact.kicker': 'Fin de la demo', 'contact.title': 'Únete a mi sala',
        'contact.desc': 'Disponible para prácticas, colaboraciones y buenas conversaciones sobre tecnología. Envíame un mensaje.',
        'form.name': 'Tu nombre', 'form.email': 'Tu correo electrónico', 'form.message': 'Tu mensaje',
        'form.messageLabel': 'Mensaje', 'form.submit': 'Enviar', 'form.errorRequired': 'Escribe tu nombre y tu mensaje.',
        'form.errorEmail': 'Ese correo electrónico no parece válido.', 'form.sent': '¡Enviado! Te responderé pronto ♥',
        'form.errorSend': 'No se pudo enviar. Intenta escribirme directamente por correo electrónico.',
        'footer.made': 'Hecho con HTML, CSS, JavaScript, PHP y una taza de té.',
        'footer.save': 'Tu progreso RPG se guarda únicamente en este navegador.',
        'dialog.back': 'Volver al registro de misiones', 'commands.placeholder': 'Ir a…', 'commands.search': 'Buscar comandos',
        'cat.label': 'Gato pixelado. Pulsa para hacerlo saltar.', 'page.title': 'Rim Moutai | Estudiante, creadora y jugadora',

        'save.0.title': 'EMSI', 'save.0.sub': 'Ingeniería de software / Informática',
        'save.0.text': 'Empiezo mi tercer año en octubre de 2026. Programación, algoritmos, bases de datos, redes, cloud, DevOps, ciberseguridad e IA.', 'save.0.tag': 'En curso',
        'save.1.title': 'Universidad Abdelmalek Essaâdi', 'save.1.sub': 'Gestión',
        'save.1.text': 'Una segunda campaña para aprender cómo funcionan realmente las empresas.', 'save.1.tag': 'En curso',
        'save.2.title': 'Próximo mundo: EE. UU., 2027', 'save.2.sub': 'Ingeniería de software / Informática',
        'save.2.text': 'Planeo continuar mis estudios en Estados Unidos. Ya tengo 90/120 en el TOEFL.', 'save.2.tag': 'En preparación',

        'project.0.title': 'Robot seguidor de línea', 'project.0.kind': 'Sistemas embebidos', 'project.0.tag': 'Completado',
        'project.0.summary': 'Un robot Arduino que detecta una línea negra con sensores infrarrojos y la sigue.',
        'project.0.detail.0': 'Hardware: Arduino Uno, sensores de línea IR, controlador de motores L298N, dos motores CC y batería de 7,4 V.',
        'project.0.detail.1': 'Software: Arduino C++, umbrales de sensores con analogRead() y control de velocidad de motores mediante PWM.',
        'project.0.detail.2': 'Calibración de los sensores con potenciómetros y ajuste del equilibrio entre los dos motores.',
        'project.0.detail.3': 'Mi parte del proyecto grupal: metodología y explicación del código.',
        'project.0.detail.4': 'Informe: problema, objetivo, metodología, componentes, cableado, código, coste, conclusión y mejoras futuras.',
        'project.1.title': 'Este portfolio', 'project.1.kind': 'Desarrollo web', 'project.1.tag': 'Completado',
        'project.1.summary': 'El sitio que estás viendo, creado como si fuera un videojuego.',
        'project.1.detail.0': 'HTML y CSS para el diseño; JavaScript para la lámpara, la progresión RPG, la navegación por misiones, las ventanas de proyectos, los trofeos y el compañero pixelado.',
        'project.1.detail.1': 'Los arrays de PHP guardan mis datos y generan cada sección.',
        'project.1.detail.2': 'Un formulario de contacto PHP que valida y envía mensajes.',
        'project.1.detail.3': 'El progreso se guarda localmente en el navegador.',
        'project.2.title': 'Sitio web para el negocio de bolsas de papel', 'project.2.kind': 'Web y marketing digital', 'project.2.tag': 'Próxima misión',
        'project.2.summary': 'Un sitio web y presencia digital para una empresa familiar que fabrica bolsas de papel personalizadas.',
        'project.2.detail.0': 'Mostrar productos y facilitar las consultas para no repetir siempre las mismas respuestas por WhatsApp.',
        'project.2.detail.1': 'Promocionar el negocio en Instagram.',
        'project.2.detail.2': 'Combinar desarrollo web, marketing digital y gestión en una empresa real.',
        'project.2.detail.3': 'Estado: en planificación.',
        'project.3.title': 'Laboratorio de ciberseguridad', 'project.3.kind': 'Ciberseguridad', 'project.3.tag': 'Bloqueado',
        'project.3.summary': 'Un futuro laboratorio para documentar ejercicios prácticos y experimentos de ciberseguridad.',
        'project.3.detail.0': 'Requisito para desbloquear: alcanzar el nivel 7.', 'project.3.detail.1': 'Estado: misión futura.',

        'skill.group.0': 'Programación', 'skill.group.1': 'Web', 'skill.group.2': 'Informática',
        'skill.group.3': 'Tecnologías emergentes', 'skill.group.4': 'Hardware', 'skill.group.5': 'Empresa', 'skill.group.6': 'Habilidades personales',
        'skill.2.built.0': '★ Algoritmos', 'skill.2.built.1': '★ Estructuras de datos',
        'skill.2.item.1': 'Sistemas operativos', 'skill.2.item.2': 'Redes', 'skill.2.item.3': 'Ingeniería de software',
        'skill.3.built.0': '★ Ciberseguridad', 'skill.3.item.0': 'Computación en la nube', 'skill.3.item.1': 'DevOps', 'skill.3.item.2': 'Inteligencia artificial',
        'skill.4.built.0': '★ Arduino', 'skill.4.built.1': '★ Sensores infrarrojos', 'skill.4.built.2': '★ Control de motores (L298N)', 'skill.4.built.3': '★ Prototipado electrónico',
        'skill.5.item.0': 'Gestión', 'skill.5.item.1': 'Marketing digital',
        'skill.6.item.0': 'Comunicación', 'skill.6.item.1': 'Gestión del tiempo',
        'skill.5.built.0': '★ Ventas', 'skill.5.built.1': '★ Atención al cliente', 'skill.5.built.2': '★ Operaciones comerciales',
        'skill.6.built.0': '★ Trabajar mientras estudio', 'skill.6.built.1': '★ Adaptabilidad', 'skill.6.built.2': '★ Trabajo en equipo', 'skill.6.built.3': '★ Resolución de problemas',

        'job.0.title': 'Operadora y ventas', 'job.0.sub': 'Empresa familiar de bolsas de papel',
        'job.0.text': 'Bolsas de papel personalizadas para tiendas, panaderías, restaurantes y eventos, con tamaños, colores, logotipos y asas de cinta a medida. Participo en la producción, las ventas y la atención a clientes.', 'job.0.tag': 'En curso',
        'job.1.title': 'Telemarketing / Asesora académica', 'job.1.sub': 'Puesto de atención al cliente',
        'job.1.text': 'Hablar con personas, orientarlas y persuadirlas. Habilidades de comunicación que complementan mis estudios de gestión.', 'job.1.tag': 'Experiencia',
        'job.2.title': 'Prácticas de tercer año', 'job.2.sub': 'Previstas para este año',
        'job.2.text': 'Añadiré aquí mis tareas, tecnologías, resultados y certificado cuando termine las prácticas.', 'job.2.tag': 'Bloqueado',

        'trophy.0.title': 'TOEFL 90/120', 'trophy.0.text': 'Nivel de inglés para mis planes de estudiar en Estados Unidos',
        'trophy.1.title': 'Arduino Hackathon 2025', 'trophy.1.text': 'Participación y creación bajo presión',
        'trophy.2.title': 'Robot en funcionamiento', 'trophy.2.text': 'Construí un robot Arduino que sigue una línea',
        'trophy.3.title': 'Lions Clubs International', 'trophy.3.text': 'Primer año como miembro',
        'trophy.4.title': 'Miembro de InnovxTech', 'trophy.4.text': 'Actividades tecnológicas fuera del aula',
        'trophy.5.title': 'Certificado de prácticas', 'trophy.5.text': 'Se desbloquea al completar las prácticas de tercer año',
        'trophy.6.title': 'Primera certificación', 'trophy.6.text': 'Se desbloquea al completar una certificación de ciberseguridad',

        'reset.confirm': '¿Reiniciar la partida del portfolio y empezar desde el nivel 1?',
        'toast.lampOn': 'Lámpara encendida', 'toast.lampOff': 'Lámpara apagada',
        'toast.xp': '+{{amount}} XP — {{reason}}', 'reason.quest': 'Misión explorada', 'reason.area': 'Zona descubierta',
        'reason.map': 'Ubicación descubierta en el mapa', 'reason.trophy': 'Trofeo desbloqueado',
        'toast.reachProject': 'Alcanza el nivel {{level}} para desbloquear esta misión.',
        'toast.reachMap': 'Alcanza el nivel {{level}} para entrar en esta zona.',
        'cat.maxLevel': '¡NIVEL MÁXIMO!', 'cat.levelUp': '¡Nivel {{level}}!',
        'xp.max': 'MÁX.', 'xp.maxLevel': 'NIVEL MÁXIMO',
        'commands.home': 'Ir a la base principal', 'commands.world': 'Ir al mapa del mundo',
        'commands.saves': 'Ir a las partidas guardadas', 'commands.quests': 'Ir al registro de misiones',
        'commands.skills': 'Ir al árbol de habilidades', 'commands.jobs': 'Ir a las misiones secundarias',
        'commands.trophies': 'Ir a los trofeos', 'commands.contact': 'Ir al jefe final',
        'commands.lamp': 'Encender o apagar la lámpara', 'commands.random': 'Abrir una misión aleatoria', 'commands.reset': 'Reiniciar mi partida'
    }
};

function t(key, fallback = null) {
    const dictionary = I18N[currentLanguage] || {};
    return dictionary[key] ?? (fallback === null ? key : fallback);
}

function interpolate(value, values = {}) {
    return String(value).replace(/\{\{(\w+)\}\}/g, (_, key) => values[key] ?? '');
}

function applyLanguage(language = currentLanguage) {
    currentLanguage = ['en', 'fr', 'es'].includes(language) ? language : 'en';

    // Save the original English copy once so switching back to English is exact.
    document.querySelectorAll('[data-i18n]').forEach((element) => {
        if (!Object.prototype.hasOwnProperty.call(element.dataset, 'i18nDefault')) {
            element.dataset.i18nDefault = element.textContent.trim();
        }
        const key = element.dataset.i18n;
        element.textContent = t(key, element.dataset.i18nDefault) || element.dataset.i18nDefault;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
        const key = element.dataset.i18nPlaceholder;
        if (!element.dataset.i18nPlaceholderDefault) element.dataset.i18nPlaceholderDefault = element.getAttribute('placeholder') || '';
        element.setAttribute('placeholder', currentLanguage === 'en'
            ? element.dataset.i18nPlaceholderDefault
            : t(key, element.dataset.i18nPlaceholderDefault));
    });

    document.querySelectorAll('[data-i18n-aria-label]').forEach((element) => {
        const key = element.dataset.i18nAriaLabel;
        if (!element.dataset.i18nAriaDefault) element.dataset.i18nAriaDefault = element.getAttribute('aria-label') || '';
        element.setAttribute('aria-label', currentLanguage === 'en'
            ? element.dataset.i18nAriaDefault
            : t(key, element.dataset.i18nAriaDefault));
    });

    document.documentElement.lang = currentLanguage;
    document.title = currentLanguage === 'en'
        ? 'Rim Moutai | Student, builder, player one'
        : t('page.title', 'Rim Moutai | Student, builder, player one');

    const languageSwitcher = $('#languageSwitcher');
    if (languageSwitcher) languageSwitcher.value = currentLanguage;

    try {
        localStorage.setItem(LANGUAGE_KEY, currentLanguage);
    } catch (error) {
        // Language switching still works for this visit if storage is unavailable.
    }

    // These functions refresh text that depends on the current game state.
    if (typeof updateHUD === 'function') updateHUD();
    if (typeof updateWorldMap === 'function') updateWorldMap();
    if (typeof updateLockedProjects === 'function') updateLockedProjects();
    if (typeof refreshOpenProjectDialog === 'function') refreshOpenProjectDialog();
    if (typeof drawCommands === 'function' && typeof commandList !== 'undefined') drawCommands();
}

const languageSwitcher = $('#languageSwitcher');
if (languageSwitcher) {
    languageSwitcher.addEventListener('change', (event) => applyLanguage(event.target.value));
}

try {
    const savedLanguage = localStorage.getItem(LANGUAGE_KEY);
    if (savedLanguage) currentLanguage = savedLanguage;
} catch (error) {
    currentLanguage = 'en';
}


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
        updateSaveStatus('save.saved');
    } catch (error) {
        updateSaveStatus('save.autoUnavailable');
    }
}

function resetGame() {
    if (!window.confirm(t('reset.confirm', 'Reset your portfolio save and start from Lv 1?'))) {
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
        ? `${save.xp} XP • ${t('xp.max', 'MAX')}`
        : `${save.xp} / ${range.next} XP`;

    $('#profileLevel').textContent = `Lv ${level}`;
    $('#profileXp').textContent = level >= MAX_LEVEL
        ? `${save.xp} XP • ${t('xp.maxLevel', 'MAX LEVEL')}`
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

function updateSaveStatus(key) {
    const element = $('#saveStatus');
    if (!element) return;
    element.dataset.i18n = key;
    element.textContent = t(key, key === 'save.autoUnavailable' ? 'Auto-save unavailable' : 'Progress saved locally');
}


// ============================================================
// XP REWARDS
// ============================================================

function awardXP(amount, reasonKey) {
    if (!Number.isFinite(amount) || amount <= 0) return;

    const oldLevel = getLevel();

    save.xp = Math.min(MAX_XP, save.xp + amount);

    const newLevel = getLevel();

    saveGame();
    updateHUD();
    updateWorldMap();
    updateLockedProjects();

    toast(interpolate(t('toast.xp', '+{{amount}} XP — {{reason}}'), {
        amount,
        reason: t(reasonKey, reasonKey)
    }));

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

    toast(nextTheme === 'dark' ? t('toast.lampOn', 'Lamp on') : t('toast.lampOff', 'Lamp off'));
}

$('#lamp').addEventListener('click', lamp);


// ============================================================
// PROJECTS / QUESTS
// ============================================================

const shelf = $('#shelf');
let activeProjectIndex = null;

function projectUnlocked(project) {
    return getLevel() >= Number(project.minLevel || 1);
}

function openGame(index) {
    const project = G[index];
    if (!project) return;

    if (!projectUnlocked(project)) {
        const required = Number(project.minLevel || 1);
        const message = interpolate(t('toast.reachProject', 'Reach Lv {{level}} to unlock this quest.'), { level: required });
        talk(message);
        toast(message);
        return;
    }

    activeProjectIndex = index;
    const translated = (field, fallback = '') => t(`project.${index}.${field}`, fallback);
    $('#dt').textContent = translated('title', project.title);
    $('#dg').textContent = translated('tag', project.tag || 'Quest');
    $('#dq').textContent = translated('summary', project.summary || '');

    $('#dl').replaceChildren(
        ...(project.details || []).map((detail, detailIndex) => {
            const item = document.createElement('li');
            item.textContent = translated(`detail.${detailIndex}`, detail);
            return item;
        })
    );

    $('#gd').showModal();

    if (!save.openedProjects[index]) {
        save.openedProjects[index] = true;
        awardXP(100, 'reason.quest');
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

function refreshOpenProjectDialog() {
    if (activeProjectIndex === null || !$('#gd')?.open) return;
    const project = G[activeProjectIndex];
    if (!project) return;

    const translated = (field, fallback = '') => t(`project.${activeProjectIndex}.${field}`, fallback);
    $('#dt').textContent = translated('title', project.title);
    $('#dg').textContent = translated('tag', project.tag || 'Quest');
    $('#dq').textContent = translated('summary', project.summary || '');
    $('#dl').replaceChildren(
        ...(project.details || []).map((detail, detailIndex) => {
            const item = document.createElement('li');
            item.textContent = translated(`detail.${detailIndex}`, detail);
            return item;
        })
    );
}

function updateLockedProjects() {
    document.querySelectorAll('.cart[data-min-level]').forEach((card) => {
        const required = Number(card.dataset.minLevel || 1);
        const unlocked = getLevel() >= required;
        const badge = card.querySelector('em');

        card.classList.toggle('locked', !unlocked);
        card.setAttribute('aria-disabled', unlocked ? 'false' : 'true');

        if (badge) {
            if (unlocked) {
                badge.textContent = t('common.unlocked', 'Unlocked');
                badge.classList.remove('lock-badge');
            } else {
                badge.textContent = interpolate(t('common.level', 'Lv {{level}}'), { level: required });
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
            awardXP(amount, 'reason.area');
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
            badge.textContent = unlocked
                ? t('common.unlocked', 'Unlocked')
                : interpolate(t('common.level', 'Lv {{level}}'), { level: required });
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
        const message = interpolate(t('toast.reachMap', 'Reach Lv {{level}} to enter this area.'), { level: required });
        talk(message);
        toast(message);
        return;
    }

    const key = node.dataset.node;

    if (!save.visitedMap[key]) {
        save.visitedMap[key] = true;
        awardXP(40, 'reason.map');
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
                awardXP(120, 'reason.trophy');
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
    ['commands.home', () => go('home')],
    ['commands.world', () => go('world')],
    ['commands.saves', () => go('saves')],
    ['commands.quests', () => go('quests')],
    ['commands.skills', () => go('skills')],
    ['commands.jobs', () => go('jobs')],
    ['commands.trophies', () => go('trophies')],
    ['commands.contact', () => go('contact')],
    ['commands.lamp', lamp],
    ['commands.random', randomQuest],
    ['commands.reset', resetGame]
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
                    ${t(command[0], command[0])}
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
        t(command[0], command[0]).toLowerCase().includes(value)
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
    talk(level === MAX_LEVEL ? t('cat.maxLevel', 'MAX LEVEL!') : interpolate(t('cat.levelUp', 'Level {{level}}!'), { level }));
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
applyLanguage(currentLanguage);
