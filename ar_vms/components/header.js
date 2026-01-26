class CustomHeader extends HTMLElement {
  connectedCallback() {
    // Mobile utility toggle state
    this._utilityOpen = false;
    // Sync sidebar top and main padding with header height on scroll
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
      const isMobile = window.innerWidth <= 768;
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
      }
    });
  this.attachShadow({ mode: 'open' });
  this.shadowRoot.innerHTML = `
      <style>
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css');
        :host {
          display: block;
          font-family: 'Overpass', sans-serif;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: white;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          transition: height 0.3s, padding 0.3s;
          overflow: hidden;
          height: 142px !important;
        }
        .header-container {
          display: flex;
          flex-direction: column;
          padding: 0.25rem 0.5rem;
          transition: padding 0.3s;
        }
        .top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.25rem 0;
          transition: padding 0.3s;
        }
        /* Utility toggle button for mobile */
        .utility-toggle-btn {
          display: inline-flex;
          align-items: center;
          background: none;
          border: none;
          color: #094673;
          font-size: 1.5rem;
          margin-left: 1rem;
          cursor: pointer;
        }
        .logo {
          font-weight: 700;
          color: #094673;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          transition: font-size 0.3s;
          text-decoration: none;
        }
        .logo img {
          height: 28px;
          margin-right: 10px;
          transition: height 0.3s;
        }
        .logo span {
          position: relative;
          top: 6px;
          font-style: italic;
        }
        .user-details .dealership {
          font-weight: 600;
          color: #094673;
          font-size: 0.75rem;
        }
        .user-details .welcome {
          font-size: 0.6rem;
          color: #676767;
        }
        .logout-btn {
          display: inline-flex;
          background: none;
          border: none;
          color: #f6931e;
          cursor: pointer;
          font-size: 0.8rem;
          vertical-align: middle;
        }
        .utility-section {
          display: none;
          align-items: center;
          gap: 2rem;
        }
        .utility-section.mobile-open {
          display: flex !important;
          flex-direction: column;
          gap: 1rem;
          background: #fff;
          position: absolute;
          top: 48px;
          left: 0;
          right: 0;
          z-index: 200;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
          padding: 1rem;
        }
        .utility-section.mobile-hidden {
          display: none !important;
        }
        .notifications {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .notification-badge {
          background: #f6931e;
          color: white;
          border-radius: 50%;
          width: 14px;
          height: 14px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 0.6rem;
          font-weight: bold;
          margin-left: 4px;
          padding-top: 1px;
          line-height: 0;
        }
        .utility-link {
          color: #094673;
          font-size: 0.8rem;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }
        .utility-link:hover {
          color: #f6931e;
        }
        .user-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;  
        }
        .search-section {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .search-input {
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          min-width: 140px;
        }
        .search-btn {
          background: #f6931e;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.8rem;
        }
        .quick-links select {
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          background: white;
          font-size: 0.8rem;
          color: #094673;
        }
        .nav-rows {
          display: flex;
          flex-direction: column;
          margin-top: 0.5rem;
          border-top: 1px solid #eee;
          padding-top: 0.5rem;
        }
        .nav-row {
          display: flex;
          gap: 1rem;
          padding: 0.25rem 0;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .nav-row::-webkit-scrollbar {
          display: none;
        }
        .nav-link {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          justify-content: center;
          color: #094673;
          text-decoration: none;
          font-size: 0.9rem;
          padding: 0.3rem 0;
          position: relative;
          white-space: nowrap;
        }
        .nav-link:hover {
          color: #f6931e;
        }
        .nav-link.active {
          color: #f6931e;
          font-weight: 600;
        }
        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: #f6931e;
        }
        :host(.condensed) {
          height: 72px !important;
        }
        :host(.condensed) .nav-rows {
          display: none !important;
        }
        :host(.condensed) .header-container {
          padding: 0.25rem 0.5rem;
        }
        :host(.condensed) .top-row {
          padding: 0.25rem 0;
        }
        :host(.condensed) .logo {
          font-size: 1.1rem;
        }
        :host(.condensed) .logo img {
          height: 28px;
        }
        @media (min-width: 768px) {
          :host {
            height: 166px !important;
          }
          .header-container {
            padding: 0.5rem 1rem;
          }
          .top-row {
            padding: 0.5rem 0;
          }
          .logo {
            font-size: 2rem;
          }
          .logo img {
            height: 40px;
          }
          .utility-toggle-btn {
            display: none;
          }
          .utility-section {
            display: flex !important;
            flex-direction: row;
            gap: 2rem;
            position: static;
            box-shadow: none;
            padding: 0;
            background: none;
          }
          .utility-section.mobile-open,
          .utility-section.mobile-hidden {
            display: flex !important;
            flex-direction: row;
            gap: 2rem;
            position: static;
            box-shadow: none;
            padding: 0;
            background: none;
          }
          .user-details .dealership {
            font-size: 0.75rem;
          }
          .user-details .welcome {
            font-size: 0.6rem;
          }
        }
      </style>
      <div class="header-container">
        <div class="top-row">
          <a href="/" class="logo">
            <img src="images/autorevo_logo.svg" alt="AR Logo">
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
            <a href="#" class="nav-link">Showroom</a>
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