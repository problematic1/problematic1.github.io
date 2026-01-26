class CustomSidebar extends HTMLElement {
  constructor() {
    super();
    this.collapsed = false;
  }

  connectedCallback() {
    // Default collapsed on mobile, open on desktop
    if (window.innerWidth <= 768) {
      this.collapsed = true;
      document.body.classList.add('sidebar-collapsed');
    } else {
      this.collapsed = false;
      document.body.classList.remove('sidebar-collapsed');
    }
    this.attachShadow({ mode: 'open' });
    this.render();
    this.setupEventListeners();
    // Listen for resize to update collapsed state if needed
    window.addEventListener('resize', () => {
      const shouldCollapse = window.innerWidth <= 768;
      if (shouldCollapse !== this.collapsed) {
        this.collapsed = shouldCollapse;
        document.body.classList.toggle('sidebar-collapsed', this.collapsed);
        this.render();
      }
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css');
        :host {
          display: block;
          font-family: 'Overpass', sans-serif;
        }
        .condensed + :host {
          .sidebar {
            height: calc(100vh - 68px);
            top: 68px;
          }
        }
            
        .sidebar {
          background: white;
          position: fixed;
          left: 0;
          top: 170px;
          height: calc(100vh - 170px);
          box-shadow: 2px 0 10px rgba(0,0,0,0.1);
          transition: all 0.3s ease, top 0.3s, height 0.3s;
          z-index: 10;
          overflow-y: auto;
          overflow-x: hidden;
        }
        
        .sidebar.collapsed {
          width: 60px;
        }
        .toggle-btn {
          position: absolute;
          right: -7px;
          top: 20px;
          width: 30px;
          height: 30px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 5px rgba(0,0,0,0.2);
          cursor: pointer;
          border: none;
          z-index: 20;
        }
        .sidebar-content {
          padding: 20px;
        }
        .sidebar-header {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
          padding-bottom: 15px;
          border-bottom: 1px solid #eee;
        }
        .sidebar-header.mt-8 {
          margin-top: 2rem;
        }
        .sidebar-header span {
          font-weight: bold;
          color: #094673;
          font-size: 1.2rem;
          white-space: nowrap;
        }
        .nav-item {
          display: flex;
          align-items: center;
          padding: 10px 0;
          color: #676767;
          text-decoration: none;
          transition: all 0.2s;
        }
        .nav-item:hover {
          color: #f6931e;
        }
        .nav-item i {
          margin-right: 10px;
          width: 20px;
          text-align: center;
        }
        .collapsed .nav-item span {
          display: none;
        }
        .collapsed .hide-collapsed {
          display: none;
        }
        .collapsed .sidebar-header span  {
          display: none;
        }
        .collapsed .sidebar-header {
          justify-content: center;
          padding-bottom: 10px;
        }
        .collapsed .nav-item {
          justify-content: center;
          padding: 15px 0;
        }

        @media (min-width: 768px) {
          .sidebar {
            top: 142px;
            height: calc(100vh - 142px);
          }
        }
      </style>
      <div class="sidebar ${!this.collapsed ? '' : 'collapsed'}">
        <button class="toggle-btn">
          <i class="fas ${this.collapsed ? 'fa-chevron-right' : 'fa-chevron-left'}"></i>
        </button>
        <div class="sidebar-content">
          <div class="sidebar-header">
            <span>
              <i class="fas fa-user"></i>
              Account
            </span>
          </div>
          <a href="#" class="nav-item">
            <i class="fas fa-id-card"></i>
            <span>My Account Information</span>
          </a>
          <a href="#" class="nav-item">
            <i class="fas fa-credit-card"></i>
            <span>Billing Information</span>
          </a>
          <a href="#" class="nav-item">
            <i class="fas fa-cog"></i>
            <span>User Settings</span>
          </a>
          <a href="#" class="nav-item">
            <i class="fas fa-boxes-stacked"></i>
            <span>Inventory Defaults</span>
          </a>
          <a href="#" class="nav-item">
            <i class="fas fa-file-import"></i>
            <span>Import Settings</span>
          </a>
          <a href="#" class="nav-item">
            <i class="fas fa-image"></i>
            <span>Banner</span>
          </a>
          <div class="sidebar-header mt-8">
            <span>
              <i class="fas fa-globe"></i>
              Website
            </span>
          </div>
          <a href="#" class="nav-item">
            <i class="fas fa-file-lines"></i>
            <span>Content</span>
          </a>
          <a href="#" class="nav-item">
            <i class="fas fa-star"></i>
            <span>Specials</span>
          </a>
          <a href="#" class="nav-item">
            <i class="fas fa-ticket"></i>
            <span>Coupons</span>
          </a>
          <a href="#" class="nav-item">
            <i class="fas fa-sliders"></i>
            <span>Settings</span>
          </a>
          <div class="hide-collapsed">
            <div class="sidebar-header mt-8">
              <span>
                <i class="fas fa-file-export"></i>
                Listing Exports
              </span>
            </div>
            <a href="#" class="nav-item">
              <i class="fas fa-peace"></i>
              <span>Craigslist</span>
            </a>
            <a href="#" class="nav-item">
              <i class="fas fa-gavel"></i>
              <span>eBay</span>
            </a>
            <a href="#" class="nav-item">
              <i class="fas fa-newspaper"></i>
              <span>Classifieds</span>
            </a>
            <div class="sidebar-header mt-8">
              <span>
                <i class="fas fa-file-export"></i>
                Inventory Tools
              </span>
            </div>
            <a href="#" class="nav-item">
              <i class="fas fa-tag"></i>
              <span>Stickers & Buyers Guide</span>
            </a>
            <a href="#" class="nav-item">
              <i class="fas fa-dollar-sign"></i>
              <span>Pricing Manager</span>
            </a>
            <a href="#" class="nav-item">
              <i class="fas fa-asterisk"></i>
              <span>Specials</span>
            </a>
          </div>
        </div>
      </div>
    `;
    this.setupEventListeners();
  }
  setupEventListeners() {
    const btn = this.shadowRoot.querySelector('.toggle-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        this.collapsed = !this.collapsed;
        document.body.classList.toggle('sidebar-collapsed', this.collapsed);
        this.render();
      });
    }
  }
}

customElements.define('custom-sidebar', CustomSidebar);