// ---------- Subcategory filter + animated reveal ----------
(function () {
  const grid = document.getElementById('subcat-grid');
  if (!grid) return;

  const buttons = document.querySelectorAll('.subcat-btn');
  const cards = Array.from(grid.querySelectorAll('.project-card'));

  function showFilter(filter) {
    buttons.forEach((b) => {
      b.classList.toggle('active', b.dataset.sub === filter);
    });

    let visibleCards = [];

    if (filter === 'all') {
      visibleCards = cards;
    } else {
      visibleCards = cards.filter((c) => c.dataset.category === filter);
    }

    // vide la grille
    grid.innerHTML = '';

    // réinjecte seulement les cartes visibles
    visibleCards.forEach((card, i) => {
      card.style.display = 'flex';
      card.classList.remove('visible');
      card.style.transitionDelay = `${i * 60}ms`;

      grid.appendChild(card);

      requestAnimationFrame(() => {
        card.classList.add('visible');
      });
    });

    setTimeout(() => {
      visibleCards.forEach((card) => {
        card.style.transitionDelay = '';
      });
    }, visibleCards.length * 70 + 300);
  }

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const sub = btn.dataset.sub || 'all';
      showFilter(sub);
    });
  });

  showFilter('all');
})();

// ---------- Modal (project preview) ----------
(function () {
  const modal = document.getElementById('project-modal');
  if (!modal) return;

  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalMedia = document.getElementById('modal-media');
  const closeBtn = modal.querySelector('.modal-close');

  const PROJECT_CONTENT = {
    p1: { title: 'Short Play — "Night Noise"', desc: 'Script + staging + excerpt. Directed in 2025, 8 min.', media: '' },
    p2: { title: 'K-pop choreography cover', desc: 'Full rehearsal + montage. 2 camera edit.', media: '' },
    p3: { title: 'Silent Streets', desc: '12 B/W frames exploring silence in cityscapes.', media: '' },
    p4: { title: 'Flow Sequence', desc: 'Improvisation study for movement flow.', media: '' },

    n1: { title: 'Why I want this portfolio to feel alive', desc: 'This note explores the idea of a portfolio that is not frozen in time, but grows alongside learning, movement, and self-reinvention.', media: '' },
    n2: { title: 'Ordinary moments that change perspective', desc: 'A notebook entry about everyday life, memory, routine, and how small moments can quietly shape a person.', media: '' },
    n3: { title: 'Living archive structure experiment', desc: 'Early thoughts on how to build a portfolio that feels open, layered, and easy to explore depending on each visitor’s interests.', media: '' },
    n4: { title: 'Ideas for a dynamic post system', desc: 'A technical note about future ways to publish notebook entries more easily, without editing the whole site manually every time.', media: '' },
    n5: { title: 'Project concept still looking for its final form', desc: 'Some ideas do not fail — they simply remain unfinished until the right structure, timing, or direction appears.', media: '' },
    n6: { title: 'A future notebook of life in Japan', desc: 'This section is meant to later document daily life in Japan: routines, cultural discoveries, challenges, and moments of growth.', media: '' },

    tp1: { title: 'DJ Core', desc: 'Personal technical concept centered on structure, rhythm, and flow.', media: '' },
    tp2: { title: 'Saint-Valentine Website', desc: 'Interactive personal web project combining design, emotion, and front-end creativity.', media: '' },
    tp3: { title: 'Personal Portfolio System', desc: 'A living archive built to reflect multiple dimensions of identity, work, and growth.', media: '' },
    tp4: { title: 'Personal System Concepts', desc: 'Independent technical ideas and early-stage systems imagined outside school.', media: '' },
    
    ta1: { title: 'Python coursework projects', desc: 'Academic programming work developed through structured learning and exercises.', media: '' },
    ta2: { title: 'Data handling & processing', desc: 'University-related work involving data structure, cleaning, and exploration.', media: '' },
    ta3: { title: 'SQL and database logic', desc: 'Exercises and projects based on database structure and query logic.', media: '' },
    ta4: { title: 'Analytical methods & structured reasoning', desc: 'Academic work showing logical thinking and problem-solving through technical tasks.', media: '' },
  };

  function openModal(id) {
    const content = PROJECT_CONTENT[id];
    if (!content) {
      console.warn('Project not found:', id);
      return;
    }

    modalTitle.textContent = content.title;
    modalDesc.textContent = content.desc;
    modalMedia.innerHTML = '';

    if (content.media) {
      const img = document.createElement('img');
      img.src = content.media;
      modalMedia.appendChild(img);
    }

    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.addEventListener('click', (e) => {
    const open = e.target.closest('.view-btn');
    if (open) {
      e.preventDefault();
      const id = open.dataset.id;
      openModal(id);
    }

    if (e.target.classList.contains('modal-backdrop')) {
      closeModal();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
      closeModal();
    }
  });
})();

// ---------- Footer year ----------
(function () {
  const year = document.getElementById('year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }
})();

(function () {
  const grid = document.getElementById('subcat-grid');
  if (!grid) return;

  const viewButtons = document.querySelectorAll('.view-mode-btn');
  if (!viewButtons.length) return;

  grid.classList.add('grid-view');

  viewButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;

      viewButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      grid.classList.remove('grid-view', 'list-view');
      grid.classList.add(`${view}-view`);
    });
  });
})();

// ---------- Story train link to Keio ----------
(function () {
  const trainLink = document.getElementById('story-train-link');
  if (!trainLink) return;

  let isLeaving = false;

  trainLink.addEventListener('click', (e) => {
    e.preventDefault();

    if (isLeaving) return;
    isLeaving = true;

    trainLink.classList.add('is-departing');

    setTimeout(() => {
      window.location.href = trainLink.getAttribute('href');
    }, 900);
  });
})();
