(function () {
  'use strict';

  /* ============================================================
     UTILS
     ============================================================ */
  function formatUGX(amount) {
    return `UGX ${amount.toLocaleString()}`;
  }

  function buildWhatsAppUrl(message) {
    const encoded = encodeURIComponent(message);
    return `https://wa.me/${business.whatsapp}?text=${encoded}`;
  }

  function openWhatsApp(message) {
    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
  }

  function generalEnquiryMessage() {
    return `Hello ${business.name} 👋\n\nI would like to make an enquiry.`;
  }

  function orderMessage(items, total) {
    const lines = items.map(
      (item, i) => `${i + 1}. ${item.name} × ${item.quantity} — UGX ${(item.price * item.quantity).toLocaleString()}`
    );
    return (
      `Hello ${business.name} 👋\n\n` +
      `I would like to place an order.\n\n` +
      `ORDER:\n${lines.join('\n')}\n\n` +
      `Estimated Total: UGX ${total.toLocaleString()}\n\n` +
      `Customer Name:\n` +
      `Location:\n` +
      `Preferred Date:\n` +
      `Additional Notes:`
    );
  }

  function enquiryMessage(details) {
    const services = details.services.length
      ? details.services.map((s) => `- ${s}`).join('\n')
      : '- (none selected)';
    return (
      `Hello ${business.name} 👋\n\n` +
      `I would like to request a catering quotation.\n\n` +
      `Name: ${details.name || '—'}\n` +
      `Phone: ${details.phone || '—'}\n\n` +
      `Event Type: ${details.eventType || '—'}\n` +
      `Event Date: ${details.eventDate || '—'}\n` +
      `Number of Guests: ${details.guests || '—'}\n` +
      `Location: ${details.location || '—'}\n\n` +
      `Services Needed:\n${services}\n\n` +
      `Additional Requirements: ${details.notes || '—'}`
    );
  }

  function scrollToSelector(selector) {
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /** Image with graceful fallback markup (mirrors SmartImage component) */
  function smartImageAttrs() {
    return `onerror="this.onerror=null;this.closest('[data-img-wrap]')?.classList.add('img-error');this.style.display='none';"`;
  }

  /* ============================================================
     CART (mirrors CartContext.tsx — sessionStorage-persisted)
     ============================================================ */
  const CART_KEY = 'mapetit-cart';

  const cart = {
    items: [],
    isOpen: false,

    load() {
      try {
        const stored = sessionStorage.getItem(CART_KEY);
        if (stored) this.items = JSON.parse(stored);
      } catch (e) { /* ignore malformed storage */ }
    },
    persist() {
      try {
        sessionStorage.setItem(CART_KEY, JSON.stringify(this.items));
      } catch (e) { /* storage might be unavailable */ }
    },
    addItem(product, quantity = 1) {
      const existing = this.items.find((i) => i.product.id === product.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        this.items.push({ product, quantity });
      }
      this.persist();
      this.open();
      renderCart();
      updateCartBadge();
    },
    removeItem(productId) {
      this.items = this.items.filter((i) => i.product.id !== productId);
      this.persist();
      renderCart();
      updateCartBadge();
    },
    updateQuantity(productId, quantity) {
      if (quantity <= 0) {
        this.removeItem(productId);
        return;
      }
      const item = this.items.find((i) => i.product.id === productId);
      if (item) item.quantity = quantity;
      this.persist();
      renderCart();
      updateCartBadge();
    },
    clear() {
      this.items = [];
      this.persist();
      renderCart();
      updateCartBadge();
    },
    open() {
      this.isOpen = true;
      document.getElementById('cartDrawer').classList.add('open');
      document.getElementById('cartBackdrop').classList.add('open');
      document.body.style.overflow = 'hidden';
    },
    close() {
      this.isOpen = false;
      document.getElementById('cartDrawer').classList.remove('open');
      document.getElementById('cartBackdrop').classList.remove('open');
      document.body.style.overflow = '';
    },
    totalQuantity() {
      return this.items.reduce((sum, i) => sum + i.quantity, 0);
    },
    subtotal() {
      return this.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
    },
  };

  function updateCartBadge() {
    const qty = cart.totalQuantity();
    const badge = document.getElementById('cartBadge');
    const drawerCount = document.getElementById('cartDrawerCount');
    [badge, drawerCount].forEach((el) => {
      if (!el) return;
      el.textContent = String(qty);
      el.hidden = qty === 0;
    });
  }

  function renderCart() {
    const body = document.getElementById('cartDrawerBody');
    if (cart.items.length === 0) {
      body.innerHTML = `
        <div class="cart-empty">
          <div class="cart-empty__icon"><i class="fa-solid fa-bag-shopping"></i></div>
          <h3>Your order is currently empty</h3>
          <p>Browse the menu and add your favourite items.</p>
          <button class="btn btn--primary" id="cartExploreMenuBtn">Explore Menu</button>
        </div>`;
      document.getElementById('cartExploreMenuBtn').addEventListener('click', () => {
        cart.close();
        scrollToSelector('#menu');
      });
      return;
    }

    const itemsHtml = cart.items
      .map(
        (item) => `
        <div class="cart-item" data-id="${item.product.id}">
          <div data-img-wrap>
            <img src="${item.product.image}" alt="${escapeHtml(item.product.name)}" ${smartImageAttrs()} />
          </div>
          <div class="cart-item__info">
            <div class="cart-item__top">
              <h4 class="cart-item__name">${escapeHtml(item.product.name)}</h4>
              <button class="cart-item__remove" data-action="remove" aria-label="Remove ${escapeHtml(item.product.name)}">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
            <span class="cart-item__unit">${formatUGX(item.product.price)} each</span>
            <div class="cart-item__bottom">
              <div class="qty-control">
                <button class="qty-btn" data-action="dec" aria-label="Decrease quantity"><i class="fa-solid fa-minus"></i></button>
                <span class="qty-value">${item.quantity}</span>
                <button class="qty-btn" data-action="inc" aria-label="Increase quantity"><i class="fa-solid fa-plus"></i></button>
              </div>
              <span class="cart-item__total">${formatUGX(item.product.price * item.quantity)}</span>
            </div>
          </div>
        </div>`
      )
      .join('');

    body.innerHTML = `
      <div class="cart-items">
        ${itemsHtml}
        <button class="cart-clear-btn" id="cartClearBtn"><i class="fa-solid fa-trash"></i> Clear all</button>
      </div>
      <div class="cart-footer">
        <div class="cart-footer__row">
          <span class="cart-footer__label">Estimated Total</span>
          <span class="cart-footer__total">${formatUGX(cart.subtotal())}</span>
        </div>
        <p class="cart-footer__note">Final price confirmed via WhatsApp. No online payment required.</p>
        <button class="btn btn--whatsapp" id="cartCheckoutBtn"><i class="fa-solid fa-message"></i> Order on WhatsApp</button>
      </div>`;

    body.querySelectorAll('.cart-item').forEach((row) => {
      const id = Number(row.dataset.id);
      row.querySelector('[data-action="remove"]').addEventListener('click', () => cart.removeItem(id));
      row.querySelector('[data-action="dec"]').addEventListener('click', () => {
        const item = cart.items.find((i) => i.product.id === id);
        if (item) cart.updateQuantity(id, item.quantity - 1);
      });
      row.querySelector('[data-action="inc"]').addEventListener('click', () => {
        const item = cart.items.find((i) => i.product.id === id);
        if (item) cart.updateQuantity(id, item.quantity + 1);
      });
    });

    document.getElementById('cartClearBtn').addEventListener('click', () => cart.clear());
    document.getElementById('cartCheckoutBtn').addEventListener('click', () => {
      const cartItems = cart.items.map((i) => ({ name: i.product.name, quantity: i.quantity, price: i.product.price }));
      openWhatsApp(orderMessage(cartItems, cart.subtotal()));
    });
  }

  /* ============================================================
     NAVBAR
     ============================================================ */
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    const linksWrap = document.getElementById('navbarLinks');
    const mobileLinksWrap = document.getElementById('navbarMobileLinks');
    const mobileMenu = document.getElementById('navbarMobile');
    const toggle = document.getElementById('mobileMenuToggle');
    const backdrop = document.getElementById('navbarMobileBackdrop');

    navLinks.forEach((link) => {
      const btn = document.createElement('button');
      btn.className = 'navbar__link';
      btn.textContent = link.label;
      btn.addEventListener('click', () => scrollToSelector(link.href));
      linksWrap.appendChild(btn);

      const mbtn = document.createElement('button');
      mbtn.className = 'navbar__mobile-link';
      mbtn.textContent = link.label;
      mbtn.addEventListener('click', () => {
        closeMobileMenu();
        scrollToSelector(link.href);
      });
      mobileLinksWrap.appendChild(mbtn);
    });

    function onScroll() {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    function openMobileMenu() {
      mobileMenu.hidden = false;
      toggle.innerHTML = '<i class="fa-solid fa-xmark"></i>';
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
      document.body.style.overflow = 'hidden';
    }
    function closeMobileMenu() {
      mobileMenu.hidden = true;
      toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      document.body.style.overflow = '';
    }
    let mobileOpen = false;
    toggle.addEventListener('click', () => {
      mobileOpen = !mobileOpen;
      mobileOpen ? openMobileMenu() : closeMobileMenu();
    });
    backdrop.addEventListener('click', () => { mobileOpen = false; closeMobileMenu(); });

    document.getElementById('cartToggleBtn').addEventListener('click', () => cart.open());
    document.getElementById('navWhatsappBtn').addEventListener('click', () => openWhatsApp(generalEnquiryMessage()));
    document.getElementById('mobileWhatsappBtn').addEventListener('click', () => {
      mobileOpen = false;
      closeMobileMenu();
      openWhatsApp(generalEnquiryMessage());
    });
  }

  /* ============================================================
     GENERIC "SCROLL TO" BUTTONS
     ============================================================ */
  function initScrollButtons() {
    document.querySelectorAll('[data-scroll-to]').forEach((btn) => {
      btn.addEventListener('click', () => scrollToSelector(btn.getAttribute('data-scroll-to')));
    });
    document.getElementById('heroWhatsappBtn').addEventListener('click', () => openWhatsApp(generalEnquiryMessage()));
    document.getElementById('contactWhatsappBtn').addEventListener('click', () => openWhatsApp(generalEnquiryMessage()));
    document.getElementById('footerWhatsappBtn').addEventListener('click', () => openWhatsApp(generalEnquiryMessage()));
  }

  /* ============================================================
     FEATURED CATEGORIES
     ============================================================ */
  function renderCategories() {
    const grid = document.getElementById('categoriesGrid');
    grid.innerHTML = featuredCategories
      .map(
        (cat, i) => `
      <button class="category-card reveal-item" style="animation-delay:${i * 80}ms" data-cat="${cat.id}">
        <div class="category-card__image-wrap" data-img-wrap>
          <img src="${cat.image}" alt="${escapeHtml(cat.name)}" ${smartImageAttrs()} />
        </div>
        <div class="category-card__scrim"></div>
        <div class="category-card__body">
          <span class="category-card__icon"><i class="fa-solid ${cat.icon}"></i></span>
          <h3 class="category-card__name">${escapeHtml(cat.name)}</h3>
          <p class="category-card__desc">${escapeHtml(cat.description)}</p>
          <span class="category-card__cta">Explore <i class="fa-solid fa-arrow-right"></i></span>
        </div>
      </button>`
      )
      .join('');

    grid.querySelectorAll('.category-card').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.cat;
        scrollToSelector(id === 'catering' || id === 'events' ? '#catering' : '#menu');
      });
    });
    observeReveal(grid.querySelectorAll('.reveal-item'));
  }

  /* ============================================================
     PRODUCT CARD (shared by Featured + Menu grids)
     ============================================================ */
  function productCardHtml(product) {
    return `
      <article class="card product-card" data-id="${product.id}">
        <button class="product-card__image-btn" data-action="quickview" aria-label="View ${escapeHtml(product.name)} details">
          <div data-img-wrap style="width:100%;height:100%;">
            <img src="${product.image}" alt="${escapeHtml(product.name)}" ${smartImageAttrs()} />
          </div>
          <span class="product-card__category-tag">${escapeHtml(product.category)}</span>
          ${!product.available ? `<div class="product-card__unavailable"><span>Currently Unavailable</span></div>` : ''}
        </button>
        <div class="product-card__body">
          <h3 class="product-card__name">${escapeHtml(product.name)}</h3>
          <p class="product-card__desc">${escapeHtml(product.description || 'Description coming soon.')}</p>
          <div class="product-card__footer">
            <span class="product-card__price">${formatUGX(product.price)}</span>
            <div class="product-card__actions">
              <button class="icon-btn" data-action="quickview" aria-label="Quick view ${escapeHtml(product.name)}"><i class="fa-solid fa-magnifying-glass"></i></button>
              <button class="btn btn--primary product-card__add" data-action="add" ${!product.available ? 'disabled' : ''}>
                <i class="fa-solid fa-plus"></i> Add
              </button>
            </div>
          </div>
        </div>
      </article>`;
  }

  function wireProductCards(container) {
    container.querySelectorAll('.product-card').forEach((card) => {
      const id = Number(card.dataset.id);
      const product = products.find((p) => p.id === id);
      if (!product) return;
      card.querySelectorAll('[data-action="quickview"]').forEach((btn) =>
        btn.addEventListener('click', () => openProductModal(product))
      );
      const addBtn = card.querySelector('[data-action="add"]');
      if (addBtn) addBtn.addEventListener('click', () => cart.addItem(product));
    });
  }

  function renderFeaturedProducts() {
    const grid = document.getElementById('featuredProductsGrid');
    const featured = getFeaturedProducts().slice(0, 6);
    grid.innerHTML = featured
      .map((p, i) => `<div class="reveal-item" style="animation-delay:${i * 80}ms">${productCardHtml(p)}</div>`)
      .join('');
    wireProductCards(grid);
    observeReveal(grid.querySelectorAll('.reveal-item'));
  }

  /* ============================================================
     MENU SECTION (search + category filter + sort)
     ============================================================ */
  const menuState = { category: 'All', search: '', sort: 'featured' };

  function renderMenuCategoryChips() {
    const wrap = document.getElementById('menuCategoryChips');
    wrap.innerHTML = menuCategories
      .map((cat) => `<button class="chip ${cat === menuState.category ? 'active' : ''}" data-cat="${escapeHtml(cat)}">${escapeHtml(cat)}</button>`)
      .join('');
    wrap.querySelectorAll('.chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        menuState.category = chip.dataset.cat;
        renderMenuCategoryChips();
        renderMenuResults();
      });
    });
  }

  function renderMenuResults() {
    let result = products.filter((p) => p.available);

    if (menuState.category !== 'All') {
      result = result.filter((p) => p.category === menuState.category);
    }
    if (menuState.search.trim()) {
      const q = menuState.search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    switch (menuState.sort) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      default:
        result = [...result].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    }

    const container = document.getElementById('menuResults');
    if (result.length === 0) {
      container.innerHTML = `
        <div class="menu-empty">
          <i class="fa-solid fa-magnifying-glass" style="opacity:.6"></i>
          <h3>No items found</h3>
          <p>Try a different search or category.</p>
          <button class="btn btn--secondary" id="menuClearFiltersBtn">Clear filters</button>
        </div>`;
      document.getElementById('menuClearFiltersBtn').addEventListener('click', () => {
        menuState.search = '';
        menuState.category = 'All';
        document.getElementById('menuSearchInput').value = '';
        renderMenuCategoryChips();
        renderMenuResults();
      });
      return;
    }

    container.innerHTML = `<div class="menu-grid">${result.map(productCardHtml).join('')}</div>`;
    wireProductCards(container);
  }

  function initMenu() {
    renderMenuCategoryChips();
    renderMenuResults();

    document.getElementById('menuSearchInput').addEventListener('input', (e) => {
      menuState.search = e.target.value;
      renderMenuResults();
    });
    document.getElementById('menuSortSelect').addEventListener('change', (e) => {
      menuState.sort = e.target.value;
      renderMenuResults();
    });
  }

  /* ============================================================
     PRODUCT DETAILS MODAL
     ============================================================ */
  function openProductModal(product) {
    const backdrop = document.getElementById('productModalBackdrop');
    const modal = document.getElementById('productModal');
    const panel = document.getElementById('productModalPanel');
    let quantity = 1;

    function render() {
      panel.innerHTML = `
        <button class="product-modal__close" id="productModalCloseBtn" aria-label="Close details"><i class="fa-solid fa-xmark"></i></button>
        <div class="product-modal__grid">
          <div class="product-modal__image-wrap" data-img-wrap>
            <img src="${product.image}" alt="${escapeHtml(product.name)}" ${smartImageAttrs()} />
            <span class="product-card__category-tag">${escapeHtml(product.category)}</span>
          </div>
          <div class="product-modal__body">
            <h2 class="product-modal__name">${escapeHtml(product.name)}</h2>
            <p class="product-modal__desc">${escapeHtml(product.description || 'Description coming soon.')}</p>
            <p class="product-modal__price">${formatUGX(product.price)}</p>
            ${!product.available ? `<p class="product-modal__unavailable">This item is currently unavailable.</p>` : ''}
            <label class="product-modal__qty-label">Quantity</label>
            <div class="product-modal__qty">
              <button class="qty-btn" id="modalQtyDec" aria-label="Decrease quantity"><i class="fa-solid fa-minus"></i></button>
              <span class="qty-value" id="modalQtyValue">${quantity}</span>
              <button class="qty-btn" id="modalQtyInc" aria-label="Increase quantity"><i class="fa-solid fa-plus"></i></button>
            </div>
            <button class="btn btn--primary product-modal__add" id="modalAddBtn" ${!product.available ? 'disabled' : ''}>
              <i class="fa-solid fa-bag-shopping"></i> Add to Order · ${formatUGX(product.price * quantity)}
            </button>
          </div>
        </div>`;

      document.getElementById('productModalCloseBtn').addEventListener('click', close);
      document.getElementById('modalQtyDec').addEventListener('click', () => {
        quantity = Math.max(1, quantity - 1);
        render();
      });
      document.getElementById('modalQtyInc').addEventListener('click', () => {
        quantity += 1;
        render();
      });
      document.getElementById('modalAddBtn').addEventListener('click', () => {
        cart.addItem(product, quantity);
        close();
      });
    }

    function onKey(e) {
      if (e.key === 'Escape') close();
    }

    function close() {
      modal.classList.remove('open');
      backdrop.classList.remove('open');
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      backdrop.removeEventListener('click', close);
    }

    render();
    modal.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    backdrop.addEventListener('click', close);
  }

  /* ============================================================
     CATERING: EVENT TYPES, PACKAGES, ENQUIRY FORM
     ============================================================ */
  function renderEventTypes() {
    const grid = document.getElementById('eventTypesGrid');
    grid.innerHTML = eventTypes
      .map(
        (evt, i) => `
      <button class="event-card reveal-item" style="animation-delay:${i * 70}ms" data-evt="${evt.id}">
        <div class="event-card__image-wrap" data-img-wrap>
          <img src="${evt.image}" alt="${escapeHtml(evt.name)}" ${smartImageAttrs()} />
        </div>
        <div class="event-card__scrim"></div>
        <div class="event-card__body">
          <h3 class="event-card__name">${escapeHtml(evt.name)}</h3>
          <p class="event-card__desc">${escapeHtml(evt.description)}</p>
        </div>
      </button>`
      )
      .join('');
    grid.querySelectorAll('.event-card').forEach((btn) => btn.addEventListener('click', () => scrollToSelector('#enquiry')));
    observeReveal(grid.querySelectorAll('.reveal-item'));
  }

  function renderPackages() {
    const grid = document.getElementById('packagesGrid');
    grid.innerHTML = packages
      .map(
        (pkg, i) => `
      <article class="card package-card ${pkg.popular ? 'popular' : ''} reveal-item" style="animation-delay:${i * 80}ms">
        ${pkg.popular ? `<span class="package-card__badge"><i class="fa-solid fa-star"></i> Popular</span>` : ''}
        <div class="package-card__image" data-img-wrap>
          <img src="${pkg.image}" alt="${escapeHtml(pkg.tagline)}" ${smartImageAttrs()} />
        </div>
        <div class="package-card__body">
          <span class="package-card__tagline">${escapeHtml(pkg.tagline)}</span>
          <h3 class="package-card__name">${escapeHtml(pkg.name)}</h3>
          <p class="package-card__desc">${escapeHtml(pkg.description)}</p>
          <ul class="package-card__includes">
            ${pkg.includes.map((item) => `<li><i class="fa-solid fa-check"></i> ${escapeHtml(item)}</li>`).join('')}
          </ul>
          <div class="package-card__price-row">
            <span class="package-card__price">${escapeHtml(pkg.priceLabel)}</span>
          </div>
          <button class="btn btn--primary package-card__btn" data-action="quote">Request Quote <i class="fa-solid fa-arrow-right"></i></button>
        </div>
      </article>`
      )
      .join('');
    grid.querySelectorAll('[data-action="quote"]').forEach((btn) => btn.addEventListener('click', () => scrollToSelector('#enquiry')));
    observeReveal(grid.querySelectorAll('.reveal-item'));
  }

  function initEnquiryForm() {
    const eventTypeSelect = document.getElementById('eqEventType');
    eventTypes.forEach((evt) => {
      const opt = document.createElement('option');
      opt.value = evt.name;
      opt.textContent = evt.name;
      eventTypeSelect.insertBefore(opt, eventTypeSelect.querySelector('option[value="Other"]'));
    });

    const chipsWrap = document.getElementById('serviceChips');
    const selectedServices = new Set();
    chipsWrap.innerHTML = serviceOptions
      .map((s) => `<button type="button" class="chip" data-service="${escapeHtml(s)}">${escapeHtml(s)}</button>`)
      .join('');
    chipsWrap.querySelectorAll('.chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        const s = chip.dataset.service;
        if (selectedServices.has(s)) {
          selectedServices.delete(s);
          chip.classList.remove('active');
        } else {
          selectedServices.add(s);
          chip.classList.add('active');
        }
      });
    });

    document.getElementById('enquiryForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const details = {
        name: document.getElementById('eqName').value,
        phone: document.getElementById('eqPhone').value,
        eventType: document.getElementById('eqEventType').value,
        eventDate: document.getElementById('eqEventDate').value,
        guests: document.getElementById('eqGuests').value,
        location: document.getElementById('eqLocation').value,
        services: Array.from(selectedServices),
        notes: document.getElementById('eqNotes').value,
      };
      openWhatsApp(enquiryMessage(details));
    });
  }

  /* ============================================================
     GALLERY (filter + lightbox)
     ============================================================ */
  let galleryFilter = 'All';

  function renderGalleryFilters() {
    const wrap = document.getElementById('galleryFilters');
    wrap.innerHTML = galleryFilterOptions
      .map((f) => `<button class="chip ${f === galleryFilter ? 'active' : ''}" data-filter="${f}">${f}</button>`)
      .join('');
    wrap.querySelectorAll('.chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        galleryFilter = chip.dataset.filter;
        renderGalleryFilters();
        renderGalleryGrid();
      });
    });
  }

  function renderGalleryGrid() {
    const grid = document.getElementById('galleryGrid');
    const images = galleryFilter === 'All' ? galleryImages : galleryImages.filter((img) => img.category === galleryFilter);
    grid.innerHTML = images
      .map(
        (img, i) => `
      <button class="gallery-tile reveal-item" style="animation-delay:${i * 50}ms" data-src="${img.src}" data-alt="${escapeHtml(img.alt)}">
        <img src="${img.src}" alt="${escapeHtml(img.alt)}" loading="lazy" />
        <div class="gallery-tile__scrim"></div>
        <span class="gallery-tile__tag">${escapeHtml(img.category)}</span>
      </button>`
      )
      .join('');
    grid.querySelectorAll('.gallery-tile').forEach((tile) => {
      tile.addEventListener('click', () => openLightbox(tile.dataset.src, tile.dataset.alt));
    });
    observeReveal(grid.querySelectorAll('.reveal-item'));
  }

  function openLightbox(src, alt) {
    const lightbox = document.getElementById('galleryLightbox');
    const img = document.getElementById('lightboxImg');
    img.src = src;
    img.alt = alt;
    lightbox.classList.add('open');
  }
  function closeLightbox() {
    document.getElementById('galleryLightbox').classList.remove('open');
  }

  function initGalleryLightbox() {
    document.getElementById('galleryLightbox').addEventListener('click', closeLightbox);
    document.getElementById('lightboxClose').addEventListener('click', (e) => { e.stopPropagation(); closeLightbox(); });
    document.getElementById('lightboxImg').addEventListener('click', (e) => e.stopPropagation());
  }

  /* ============================================================
     CONTACT SECTION
     ============================================================ */
  function renderContact() {
    const rows = document.getElementById('contactRows');
    rows.innerHTML = `
      <li>
        <p>Phone</p>
        <div class="contact-row-inner">
          <i class="fa-solid fa-phone"></i>
          <div><p class="contact-row-value">${escapeHtml(business.phone)}</p></div>
        </div>
      </li>
      <li>
        <p>WhatsApp</p>
        <div class="contact-row-inner">
          <i class="fa-solid fa-message"></i>
          <div><button class="contact-row-value" id="contactRowWhatsapp">Chat with us</button></div>
        </div>
      </li>
      <li>
        <p>Email</p>
        <div class="contact-row-inner">
          <i class="fa-solid fa-envelope"></i>
          <div><p class="contact-row-value">${escapeHtml(business.email)}</p></div>
        </div>
      </li>
      <li>
        <p>Location</p>
        <div class="contact-row-inner">
          <i class="fa-solid fa-location-dot"></i>
          <div>
            <p class="contact-row-value">${escapeHtml(business.location)}</p>
            <p class="contact-row-sub">${escapeHtml(business.locationNote)}</p>
          </div>
        </div>
      </li>`;
    document.getElementById('contactRowWhatsapp').addEventListener('click', () => openWhatsApp(generalEnquiryMessage()));

    const socialsWrap = document.getElementById('contactSocials');
    const socials = [
      { name: 'TikTok', icon: 'fa-tiktok', brand: true, url: business.social.tiktok },
      { name: 'Facebook', icon: 'fa-facebook-f', brand: true, url: business.social.facebook },
      { name: 'Instagram', icon: 'fa-instagram', brand: true, url: business.social.instagram },
    ];
    socialsWrap.innerHTML = socials
      .map((s) => `<a href="${s.url}" target="_blank" rel="noopener noreferrer" aria-label="${s.name}"><i class="fa-brands ${s.icon}"></i></a>`)
      .join('');

    const hours = document.getElementById('contactHours');
    hours.innerHTML = business.hours
      .map(
        (h) => `
      <li>
        <i class="fa-solid fa-clock"></i>
        <div>
          <p class="contact-hours-day">${escapeHtml(h.day)}</p>
          <p class="contact-hours-time">${escapeHtml(h.time)}</p>
        </div>
      </li>`
      )
      .join('');
  }

  /* ============================================================
     FOOTER
     ============================================================ */
  function renderFooter() {
    const linksWrap = document.getElementById('footerLinks');
    linksWrap.innerHTML = navLinks.map((l) => `<li><button data-href="${l.href}">${l.label}</button></li>`).join('');
    linksWrap.querySelectorAll('button').forEach((btn) => btn.addEventListener('click', () => scrollToSelector(btn.dataset.href)));

    document.getElementById('footerContact').innerHTML = `
      <li><i class="fa-solid fa-phone"></i> <span>${escapeHtml(business.phone)}</span></li>
      <li><i class="fa-solid fa-envelope"></i> <span>${escapeHtml(business.email)}</span></li>
      <li><i class="fa-solid fa-location-dot"></i> <span>${escapeHtml(business.location)}</span></li>`;

    document.getElementById('footerHours').innerHTML = business.hours
      .map((h) => `<li><i class="fa-solid fa-clock"></i> <span><span class="footer__hours-day">${escapeHtml(h.day)}</span>${escapeHtml(h.time)}</span></li>`)
      .join('');

    document.getElementById('footerYear').textContent = String(new Date().getFullYear());
  }

  /* ============================================================
     REVEAL ON SCROLL (mirrors useReveal hook)
     ============================================================ */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  function observeReveal(nodeList) {
    nodeList.forEach((el) => revealObserver.observe(el));
  }

  /* ============================================================
     FLOATING WHATSAPP VISIBILITY
     ============================================================ */
  function initFloatingWhatsapp() {
    const btn = document.getElementById('floatingWhatsapp');
    function onScroll() {
      btn.classList.toggle('visible', window.scrollY > 400);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    btn.addEventListener('click', () => openWhatsApp(generalEnquiryMessage()));
  }

  /* ============================================================
     CART DRAWER open/close wiring
     ============================================================ */
  function initCartDrawer() {
    document.getElementById('cartCloseBtn').addEventListener('click', () => cart.close());
    document.getElementById('cartBackdrop').addEventListener('click', () => cart.close());
  }

  /* ============================================================
     INIT
     ============================================================ */
  document.addEventListener('DOMContentLoaded', () => {
    cart.load();

    initNavbar();
    initScrollButtons();
    initCartDrawer();
    initFloatingWhatsapp();
    initGalleryLightbox();

    renderCategories();
    document.querySelectorAll('.reveal').forEach((el) => observeReveal([el]));
    renderFeaturedProducts();
    initMenu();
    renderEventTypes();
    renderPackages();
    initEnquiryForm();
    renderGalleryFilters();
    renderGalleryGrid();
    renderContact();
    renderFooter();

    updateCartBadge();
    renderCart();
  });
})();
