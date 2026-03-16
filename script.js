// ---------- Subcategory filter + animated reveal ----------
(function() {
  const grid = document.getElementById('subcat-grid');
  if (!grid) return;

  const buttons = document.querySelectorAll('.subcat-btn');
  const cards = Array.from(grid.querySelectorAll('.project-card'));

  function showFilter(filter) {
    // mark active btn
    buttons.forEach(b => b.classList.toggle('active', b.dataset.sub === filter));
    // hide all then reveal matching with stagger
    let visibleCards = [];
    if (filter === 'all') {
      visibleCards = cards;
    } else {
      visibleCards = cards.filter(c => c.dataset.category === filter);
    }

    // hide all immediately (remove visible class)
    cards.forEach(c => c.classList.remove('visible'));

    // small delay then stagger-in visible cards
    window.requestAnimationFrame(() => {
      visibleCards.forEach((card, i) => {
        // apply small inline delay
        card.style.transitionDelay = `${i * 70}ms`;
        // force reflow then add visible
        void card.offsetWidth;
        card.classList.add('visible');
      });
      // reset delay after animation to keep future transitions consistent
      setTimeout(() => {
        cards.forEach(c => c.style.transitionDelay = '');
      }, visibleCards.length * 80 + 500);
    });
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const sub = btn.dataset.sub || 'all';
      showFilter(sub);
    });
  });

  // initial reveal: show all
  showFilter('all');
})();

// ---------- Modal (project preview) ----------
(function() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;

  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalMedia = document.getElementById('modal-media');
  const closeBtn = modal.querySelector('.modal-close');

  // simple demo content mapping (replace with your real content or load via fetch)
  const PROJECT_CONTENT = {
    p1: { title: 'Short Play — "Night Noise"', desc: 'Script + staging + excerpt. Directed in 2025, 8 min.', media: '' },
    p2: { title: 'K-pop choreography cover', desc: 'Full rehearsal + montage. 2 camera edit.', media: '' },
    p3: { title: 'Silent Streets', desc: '12 B/W frames exploring silence in cityscapes.', media: '' },
    p4: { title: 'Flow Sequence', desc: 'Improvisation study for movement flow.', media: '' }
  };

  function openModal(id) {
    const content = PROJECT_CONTENT[id];
    if (!content) return;
    modalTitle.textContent = content.title;
    modalDesc.textContent = content.desc;
    modalMedia.innerHTML = ''; // set media if available (img/video)
    if (content.media) {
      // example: image
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
    // open buttons
    const open = e.target.closest('.view-btn');
    if (open) {
      e.preventDefault();
      const id = open.dataset.id;
      openModal(id);
    }
    // close by clicking backdrop
    if (e.target.classList.contains('modal-backdrop')) closeModal();
  });

  closeBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
  });
})();
