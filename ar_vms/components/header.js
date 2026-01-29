class CustomHeader extends HTMLElement {
  connectedCallback() {
    this._utilityOpen = false;
    const updateNavRowsDisplay = () => {
      const isCondensed = this.classList.contains('condensed');
      const isMobile = window.innerWidth <= 768;
      const navRows = this.shadowRoot.querySelector('.nav-rows');
      if (navRows) {
        if (isMobile) {
          navRows.style.display = isCondensed ? 'none' : 'flex';
        } else {
          navRows.style.display = 'flex';
        }
      }
    };
    window.addEventListener('scroll', () => {
      const isCondensed = window.scrollY > 20;
      this.classList.toggle('condensed', isCondensed);
      updateNavRowsDisplay();
      /*const isMobile = window.innerWidth <= 768;
      const topPx = isCondensed ? (isMobile ? '70px' : '68px') : (isMobile ? '164x' : '164px');
      const topPad = isCondensed ? (isMobile ? '70px' : '84px') : (isMobile ? '186px' : '186px');
      document.querySelector('main').style.paddingTop = topPad;
      const sidebar = document.querySelector('custom-sidebar');
      if (sidebar && sidebar.shadowRoot) {
        const sidebarEl = sidebar.shadowRoot.querySelector('.sidebar');
        if (sidebarEl) {
          sidebarEl.style.top = topPx;
          sidebarEl.style.height = `calc(100vh - ${topPx})`;
        }
      }*/
    });
  this.attachShadow({ mode: 'open' });
  this.shadowRoot.innerHTML = `
      <style>
        @import url('style_header.css');
      </style>
      <div class="header-container">
        <div class="top-row">
          <a href="/" class="logo">
            <img src="images/autorevo_logo_v2.svg" alt="AR Logo">
            <span>VMS</span>
          </a>
          <button class="utility-toggle-btn" aria-label="Open Utility" tabindex="0">
            <i class="fas fa-bars"></i>
          </button>
          <div class="utility-section">
            <div class="quick-links">
              <select>
                <option>Quick Links</option>
                <option>Auto Lot Sheet</option>
                <option>Motorcycle Lot Sheet</option>
                <option>RV Lot Sheet</option>
                <option>Print Inventory</option>
              </select>
            </div>
            <div class="search-section">
              <input type="text" placeholder="Search Inventory..." class="search-input">
              <button class="search-btn">Search</button>
            </div>
          </div>
          <div class="user-info">
            <div class="user-details">
              <div class="dealership">Sunrise Auto Group</div>
              <div class="welcome">
                <span>Welcome, John Doe</span>
                <button class="logout-btn">
                  <i class="fas fa-sign-out-alt"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="nav-rows">
          <div class="nav-row">
            <a href="#" class="nav-link active">
            <i class="fas fa-car"></i>
              Inventory
            </a>
            <a href="#" class="nav-link">
              <i class="fas fa-user"></i>
              Leads
            </a>
            <a href="#" class="nav-link">
              <i class="fas fa-file-import"></i>
              Imports
            </a>
            <a href="#" class="nav-link">
              <i class="fas fa-certificate"></i>
              <span>Titles</span>
              <span class="notification-badge">5</span>
            </a>
            <a href="#" class="nav-link">
              <i class="fas fa-calendar"></i>
              <span>ShowUp</span>
              <span class="notification-badge">1</span>
            </a>
            <a href="#" class="nav-link">
              <i class="fas fa-globe"></i>
              <span>Website</span>
            </a>
            <a href="#" class="nav-link">
              <i class="fas fa-headset"></i>
              <span>Support</span>
            </a>
            <a href="#" class="nav-link">
              <i class="fas fa-file"></i>
              <span>Reports</span>
            </a>
          </div>
          <div class="nav-row">
            <a href="#" class="nav-link">Appraisals</a>
            <a href="#" class="nav-link">Working</a>
            <a href="showroom_sample.html" class="nav-link">Showroom</a>
            <a href="#" class="nav-link">Sold</a>
            <a href="#" class="nav-link">Archived</a>
            <a href="#" class="nav-link">Featured</a>
          </div>
        </div>
      </div>
    `;
    // Utility section toggle for mobile
    const utilityToggleBtn = this.shadowRoot.querySelector('.utility-toggle-btn');
    const utilitySection = this.shadowRoot.querySelector('.utility-section');
    const updateUtilitySection = () => {
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        if (this._utilityOpen) {
          utilitySection.classList.add('mobile-open');
          utilitySection.classList.remove('mobile-hidden');
        } else {
          utilitySection.classList.remove('mobile-open');
          utilitySection.classList.add('mobile-hidden');
        }
      } else {
        utilitySection.classList.remove('mobile-open');
        utilitySection.classList.remove('mobile-hidden');
      }
    };
    if (utilityToggleBtn) {
      utilityToggleBtn.addEventListener('click', () => {
        this._utilityOpen = !this._utilityOpen;
        updateUtilitySection();
      });
    }
    window.addEventListener('resize', () => {
      updateUtilitySection();
      updateNavRowsDisplay();
    });
    updateUtilitySection();
    updateNavRowsDisplay();
  }
}

customElements.define('custom-header', CustomHeader);