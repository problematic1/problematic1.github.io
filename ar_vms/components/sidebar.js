class CustomSidebar extends HTMLElement {
  constructor() {
    super();
    this.collapsed = false;
  }

  connectedCallback() {
    // Default collapsed on mobile, open on desktop
    this.collapsed = true;
    document.body.classList.add('sidebar-collapsed');
    this.attachShadow({ mode: 'open' });
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
      @import url('style_sidebar.css');
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