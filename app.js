/* ==========================================================================
   DAZZLE DAVE - PREMIUM SOFTWARE SYSTEMS ENGINE INTERACTION LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {




    /* ==========================================
       2. Scroll-Driven Header Transformation
       ========================================== */
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    });


    /* ==========================================
       3. Intersection Observer Scroll Animations
       ========================================== */
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });


    /* ==========================================
       4. Responsive Hamburger Menu Toggle
       ========================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        menuToggle?.classList.toggle('active');
        navMenu?.classList.toggle('active');
        document.body.classList.toggle('overflow-hidden');
    };

    menuToggle?.addEventListener('click', toggleMenu);
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
            document.body.classList.remove('overflow-hidden');
        });
    });


    /* ==========================================
       5. Interactive Developer TTY CLI Shell Emulator
       ========================================== */
    const terminalInput = document.getElementById('terminal-input');
    const terminalBody = document.getElementById('terminal-body');
    const inputRow = document.getElementById('input-row');

    let userRepos = [];

    const commands = {
        'help': () => `
            <div class="terminal-line output">
                Available TTY commands:<br>
                - <span class="term-hl">about</span>: Learn about Dave's developer persona.<br>
                - <span class="term-hl">skills</span> / <span class="term-hl">stack</span>: Print language proficiency matrix.<br>
                - <span class="term-hl">projects</span> / <span class="term-hl">repos</span>: Inspect code repositories.<br>
                - <span class="term-hl">art</span> / <span class="term-hl">design</span>: Navigate to graphic design portfolio page.<br>
                - <span class="term-hl">clear</span>: Flush terminal history logs.<br>
                - <span class="term-hl">help</span>: Display this list of TTY instructions.
            </div>`,
        'about': () => `
            <div class="terminal-line output">
                <strong>Name:</strong> Dazzle Dave<br>
                <strong>Role:</strong> Software Architect & Core Systems Dev<br>
                <strong>Focus:</strong> Embedded databases, WebGL interface rendering, and developer productivity tools.<br>
                <strong>Philosophy:</strong> Write highly compact code that maximizes throughput and preserves system memory bounds.
            </div>`,
        'skills': () => `
            <div class="terminal-line output">
                <strong>Languages:</strong> Go, TypeScript, JavaScript, Rust, C++, C, SQL<br>
                <strong>Frameworks:</strong> React, Next.js, Node.js, WebGL Canvas Engine<br>
                <strong>Systems:</strong> Docker Registry, PostgreSQL Coordinator, POSIX Unix kernel mapping
            </div>`,
        'stack': () => commands['skills'](),
        'repos': () => {
            if (userRepos.length === 0) {
                return `
                    <div class="terminal-line output">
                        <strong>Featured repositories (offline cache):</strong><br>
                        - <strong>dazzle-db</strong> (Go KV store, MVCC transaction logs)<br>
                        - <strong>reactor-ui</strong> (TypeScript reactive WebGL layout manager)<br>
                        - <strong>clean-routes</strong> (Rust Vercel CLI routing compiler)<br>
                        - <strong>aurora-os</strong> (C++ educational POSIX microkernel simulation)
                    </div>`;
            }
            let listHTML = `<div class="terminal-line output"><strong>Dynamic repositories loaded from GitHub (dazzledave):</strong><br>`;
            userRepos.slice(0, 6).forEach(repo => {
                listHTML += `- <strong>${repo.name}</strong>: ${repo.description || 'No description provided.'} (<a href="${repo.html_url}" target="_blank" style="color:var(--accent-green)">link</a>)<br>`;
            });
            listHTML += `</div>`;
            return listHTML;
        },
        'projects': () => commands['repos'](),
        'art': () => `
            <div class="terminal-line output">
                Redirecting client... Loading graphic design portfolio subpage: <span class="term-hl">davedoesart.html</span><br>
                <a href="davedoesart.html" style="color: var(--accent-green); text-decoration: underline;">Click here to launch.</a>
            </div>`,
        'design': () => commands['art']()
    };

    terminalInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const rawCommand = terminalInput.value.trim();
            const cleanCommand = rawCommand.toLowerCase();

            // 1. Create echo line
            const echoLine = document.createElement('div');
            echoLine.className = 'terminal-line user-input';
            echoLine.innerHTML = `<span class="terminal-prompt">guest@dazzledave:~$</span> ${rawCommand}`;
            terminalBody.insertBefore(echoLine, inputRow);

            // 2. Parse command execution
            if (cleanCommand) {
                if (cleanCommand === 'clear') {
                    // Flush terminal logs except standard system introductions
                    const lines = terminalBody.querySelectorAll('.terminal-line');
                    lines.forEach(l => l.remove());
                } else if (commands[cleanCommand]) {
                    const resultHtml = commands[cleanCommand]();
                    const outputLine = document.createElement('div');
                    outputLine.innerHTML = resultHtml;
                    terminalBody.insertBefore(outputLine, inputRow);
                } else {
                    const errorLine = document.createElement('div');
                    errorLine.className = 'terminal-line output';
                    errorLine.innerHTML = `dazzle-sh: command not found: <span style="color:#ff5f56">${rawCommand}</span>. Type <span class="term-hl">help</span> to list instructions.`;
                    terminalBody.insertBefore(errorLine, inputRow);
                }
            }

            // Reset input values and auto-scroll TTY viewport
            terminalInput.value = '';
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
    });

    // Auto focus terminal box on click
    document.querySelector('.terminal-window')?.addEventListener('click', () => {
        terminalInput?.focus();
    });


    /* ==========================================
       6. Premium Alert Toast (Screenshot Replication)
       ========================================== */
    const updateToast = document.getElementById('update-toast');
    const toastDismiss = document.getElementById('toast-dismiss');
    const toastRefresh = document.getElementById('toast-refresh');



    toastDismiss?.addEventListener('click', () => {
        updateToast?.classList.remove('active');
    });

    toastRefresh?.addEventListener('click', () => {
        // Trigger clean page reload
        location.reload();
    });

    /* ==========================================
       7. GitHub API Dynamic Repository Loader
       ========================================== */
    const repoGrid = document.getElementById('repo-grid');

    async function fetchGitHubRepos() {
        try {
            const response = await fetch('https://api.github.com/users/dazzledave/repos?sort=updated&per_page=6');
            if (!response.ok) throw new Error('API request failed');
            userRepos = await response.json();
            
            if (repoGrid && userRepos.length > 0) {
                // Clear default static fallbacks
                repoGrid.innerHTML = '';
                
                userRepos.forEach(repo => {
                    const lang = repo.language || 'Code';
                    const langClass = lang.toLowerCase().replace('++', 'cpp').replace('#', 'sharp');
                    
                    const card = document.createElement('div');
                    card.className = 'repo-card';
                    card.innerHTML = `
                        <div class="repo-header">
                            <svg viewBox="0 0 24 24" class="repo-icon" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
                                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                            </svg>
                            <a href="${repo.html_url}" class="repo-name" target="_blank">${repo.name}</a>
                            <span class="repo-visibility">${repo.private ? 'Private' : 'Public'}</span>
                        </div>
                        <p class="repo-desc">${repo.description || 'No description provided.'}</p>
                        <div class="repo-footer">
                            <span class="repo-lang"><span class="lang-color lang-${langClass}" style="background-color: ${getLanguageColor(lang)}"></span>${lang}</span>
                            <span class="repo-meta-item">
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                ${repo.stargazers_count}
                            </span>
                            <span class="repo-meta-item">
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="3" x2="6" y2="15"></line><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 9a9 9 0 0 1-9 9"></path></svg>
                                ${repo.forks_count}
                            </span>
                        </div>
                    `;
                    repoGrid.appendChild(card);
                });
            }
        } catch (error) {
            console.error('Error loading GitHub repositories:', error);
        }
    }

    function getLanguageColor(lang) {
        const colors = {
            'go': '#00add8',
            'typescript': '#3178c6',
            'javascript': '#f1e05a',
            'rust': '#dee2e6',
            'c++': '#f34b7d',
            'python': '#3572a5',
            'html': '#e34c26',
            'css': '#563d7c'
        };
        return colors[lang.toLowerCase()] || '#8b8f9c';
    }

    fetchGitHubRepos();

});
