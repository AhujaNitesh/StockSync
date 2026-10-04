// StockSync Dashboard Complete Logic (Pure Standard JS - 100% Reliable)
const userRoleAccounts = {
  admin: { role: 'admin', name: 'Sri Ganesh (Owner/Admin)', email: 'admin@sriganeshstore.com', password: 'admin123', badge: 'Owner (Full Access)', badgeClass: 'bg-danger', icon: 'fa-shield-halved' },
  manager: { role: 'manager', name: 'Suresh Rao (Supervisor/Manager)', email: 'manager@sriganeshstore.com', password: 'manager123', badge: 'Supervisor (Revenue Redacted)', badgeClass: 'bg-warning text-dark', icon: 'fa-user-gear' },
  employee: { role: 'employee', name: 'Rahul V. (Cashier/Employee)', email: 'staff@sriganeshstore.com', password: 'staff123', badge: 'Cashier (POS Counter Only)', badgeClass: 'bg-success', icon: 'fa-user' }
};

let products = [
  { id: 1, name: 'Aashirvaad Atta 5kg', sku: 'ATT-5K', category: 'Atta & Flour', price: 245, cost: 220, qty: 25, reorder: 15, supplier: 'Ganesh Wholesalers' },
  { id: 2, name: 'Fortune Sunflower Oil 1L', sku: 'OIL-1L', category: 'Edible Oils', price: 155, cost: 135, qty: 18, reorder: 20, supplier: 'Lakshmi Distributors' },
  { id: 3, name: 'Amul Butter 500g', sku: 'BUT-500', category: 'Dairy & Eggs', price: 275, cost: 240, qty: 12, reorder: 10, supplier: 'Sri Ram Suppliers' },
  { id: 4, name: 'Tata Salt 1kg', sku: 'SLT-1K', category: 'Spices & Salt', price: 28, cost: 22, qty: 85, reorder: 30, supplier: 'Ganesh Wholesalers' },
  { id: 5, name: 'Maggi Noodles 4-Pack', sku: 'MAG-4P', category: 'Packaged Food', price: 56, cost: 46, qty: 6, reorder: 15, supplier: 'Lakshmi Distributors' },
  { id: 6, name: 'Surf Excel 1kg', sku: 'DET-1K', category: 'Household Care', price: 195, cost: 165, qty: 30, reorder: 8, supplier: 'Ganesh Wholesalers' },
  { id: 7, name: 'Taj Mahal Tea 500g', sku: 'TEA-500', category: 'Beverages', price: 340, cost: 290, qty: 24, reorder: 10, supplier: 'Sri Ram Suppliers' }
];

let sales = [
  { id: 101, bill_no: 'INV-2026-001', customer_name: 'Ramesh Kumar', total_amount: 555, cashier_name: 'Rahul (Staff)', sale_date: '2026-10-04 10:15 AM', payment_mode: 'UPI', items: [{ name: 'Aashirvaad Atta 5kg', price: 245, qty: 2 }, { name: 'Maggi Noodles 4-Pack', price: 56, qty: 1 }] },
  { id: 102, bill_no: 'INV-2026-002', customer_name: 'Priya Sharma', total_amount: 1240, cashier_name: 'Suresh (Manager)', sale_date: '2026-10-04 11:30 AM', payment_mode: 'Cash', items: [{ name: 'Amul Butter 500g', price: 275, qty: 4 }, { name: 'Tata Salt 1kg', price: 28, qty: 5 }] },
  { id: 103, bill_no: 'INV-2026-003', customer_name: 'Anand Verma', total_amount: 328, cashier_name: 'Sri Ganesh (Admin)', sale_date: '2026-10-04 12:45 PM', payment_mode: 'Card', items: [{ name: 'Taj Mahal Tea 500g', price: 340, qty: 1 }] }
];

let purchases = [
  { id: 881, po_no: 'PO-2026-881', supplier: 'Ganesh Wholesalers', items: 'Aashirvaad Atta 5kg (50 bags)', cost: 11000, status: 'Delivered', date: '2026-10-02' },
  { id: 882, po_no: 'PO-2026-882', supplier: 'Lakshmi Distributors', items: 'Fortune Sunflower Oil (30 tins)', cost: 4050, status: 'In Transit', date: '2026-10-03' }
];

let suppliers = [
  { id: 1, name: 'Ganesh Wholesalers', contact: 'Ramesh Shah', phone: '9845011223', email: 'ganesh@wholesale.in', city: 'Bangalore Market' },
  { id: 2, name: 'Lakshmi Distributors', contact: 'Venkatesh Rao', phone: '9880122334', email: 'lakshmi@dist.com', city: 'Yeshwanthpur' },
  { id: 3, name: 'Sri Ram Suppliers', contact: 'Manjunath B', phone: '9900233445', email: 'sriram@suppliers.net', city: 'APMC Yard' }
];

let currentRoleKey = 'admin';
let isSidebarCollapsed = false;
let currentCart = [];
let chartInstances = {};

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const roleParam = urlParams.get('role');
  if (roleParam && userRoleAccounts[roleParam]) {
    currentRoleKey = roleParam;
  }

  setupSidebar();
  setupNavigationTabs();
  applyRoleSecurity();
  renderAllViews();
});

// SIDEBAR TOGGLING
function setupSidebar() {
  const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
  const sidebarChevronBtn = document.getElementById('sidebarChevronBtn');
  const sidebarWrapper = document.getElementById('sidebarWrapper');
  const sidebarToggleText = document.getElementById('sidebarToggleText');
  const sidebarChevronIcon = document.getElementById('sidebarChevronIcon');

  function toggleSidebar() {
    isSidebarCollapsed = !isSidebarCollapsed;
    if (isSidebarCollapsed) {
      sidebarWrapper.classList.add('collapsed');
      sidebarToggleText.textContent = 'Expand';
      sidebarChevronIcon.className = 'fa-solid fa-angles-right text-info fs-6';
    } else {
      sidebarWrapper.classList.remove('collapsed');
      sidebarToggleText.textContent = 'Collapse';
      sidebarChevronIcon.className = 'fa-solid fa-angles-left text-secondary fs-6';
    }
  }

  if (sidebarToggleBtn) sidebarToggleBtn.addEventListener('click', toggleSidebar);
  if (sidebarChevronBtn) sidebarChevronBtn.addEventListener('click', toggleSidebar);
}

// TAB NAVIGATION
function setupNavigationTabs() {
  const sidebarItems = document.querySelectorAll('.sidebar-item');
  sidebarItems.forEach(item => {
    item.addEventListener('click', () => {
      sidebarItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      const tabName = item.getAttribute('data-tab');
      document.querySelectorAll('.dashboard-view-section').forEach(sec => sec.classList.add('d-none'));

      const targetSec = document.getElementById(`view-${tabName}`);
      if (targetSec) targetSec.classList.remove('d-none');

      const moduleTitles = {
        overview: 'OVERVIEW MODULE',
        products: 'PRODUCTS & STOCK MANAGEMENT',
        sales: 'SALES (POS) TRANSACTIONS',
        purchases: 'PURCHASES & SUPPLIER ORDERS',
        suppliers: 'SUPPLIERS DIRECTORY',
        alerts: 'STOCK ALERTS & REORDER',
        reports: 'REPORTS & FINANCIAL INSIGHTS'
      };
      document.getElementById('currentModuleTitle').textContent = moduleTitles[tabName] || 'DASHBOARD';

      if (tabName === 'reports' || tabName === 'overview') {
        renderCharts();
      }
    });
  });
}

// ROLE SECURITY & ABSTRACTION
function applyRoleSecurity() {
  const acc = userRoleAccounts[currentRoleKey];
  document.getElementById('currentUserLabel').textContent = acc.name;
  document.getElementById('currentRoleDesc').textContent = `Active: ${currentRoleKey.toUpperCase()}`;

  ['admin', 'manager', 'employee'].forEach(r => {
    const btn = document.getElementById(`roleBtn${r.charAt(0).toUpperCase() + r.slice(1)}`);
    if (btn) btn.classList.toggle('active', r === currentRoleKey);
  });

  const isOwner = (currentRoleKey === 'admin');
  const isEmployee = (currentRoleKey === 'employee');

  // Hide / show POS quick button
  const btnOpenPOS = document.getElementById('btnOpenPOS');
  if (btnOpenPOS) btnOpenPOS.classList.toggle('d-none', isEmployee);

  // Overview cards and charts
  const overviewChartsArea = document.getElementById('overviewChartsArea');
  const overviewLockCard = document.getElementById('overviewLockCard');
  if (overviewChartsArea && overviewLockCard) {
    if (isOwner) {
      overviewChartsArea.classList.remove('d-none');
      overviewLockCard.classList.add('d-none');
    } else {
      overviewChartsArea.classList.add('d-none');
      overviewLockCard.classList.remove('d-none');
    }
  }

  // Reports view lock
  const reportsContentArea = document.getElementById('reportsContentArea');
  const reportsLockCard = document.getElementById('reportsLockCard');
  if (reportsContentArea && reportsLockCard) {
    if (isOwner) {
      reportsContentArea.classList.remove('d-none');
      reportsLockCard.classList.add('d-none');
    } else {
      reportsContentArea.classList.add('d-none');
      reportsLockCard.classList.remove('d-none');
    }
  }

  // Add Product button restricted to admin
  const btnOverviewAddProd = document.getElementById('btnOverviewAddProd');
  const btnProdAddProd = document.getElementById('btnProdAddProd');
  if (btnOverviewAddProd) btnOverviewAddProd.classList.toggle('d-none', !isOwner);
  if (btnProdAddProd) btnProdAddProd.classList.toggle('d-none', !isOwner);

  // Re-render tables to hide cost prices
  renderAllViews();
}

// ROLE SWITCH MODAL
let targetSwitchRoleKey = 'admin';
function handleRoleClick(roleKey) {
  if (roleKey === currentRoleKey) return;
  targetSwitchRoleKey = roleKey;
  const acc = userRoleAccounts[roleKey];

  document.getElementById('targetRoleInput').value = roleKey;
  document.getElementById('switchRoleName').textContent = acc.name;
  document.getElementById('switchRoleBadge').textContent = acc.badge;
  document.getElementById('switchRoleBadge').className = `badge ${acc.badgeClass}`;
  document.getElementById('switchRoleHint').textContent = acc.password;
  document.getElementById('switchPasswordInput').value = '';
  document.getElementById('switchRoleError').classList.add('d-none');

  const modal = new bootstrap.Modal(document.getElementById('switchRoleModal'));
  modal.show();
}

function confirmRoleSwitch(e) {
  e.preventDefault();
  const inputPwd = document.getElementById('switchPasswordInput').value;
  const expectedPwd = userRoleAccounts[targetSwitchRoleKey].password;

  if (inputPwd !== expectedPwd) {
    const err = document.getElementById('switchRoleError');
    err.textContent = `Incorrect password for ${userRoleAccounts[targetSwitchRoleKey].name}!`;
    err.classList.remove('d-none');
    return;
  }

  bootstrap.Modal.getInstance(document.getElementById('switchRoleModal')).hide();
  currentRoleKey = targetSwitchRoleKey;
  applyRoleSecurity();
}

// RENDER ALL VIEWS
function renderAllViews() {
  const isOwner = (currentRoleKey === 'admin');
  const totalPurchaseSum = purchases.reduce((sum, p) => sum + Number(p.cost), 0);
  const totalSalesSum = sales.reduce((sum, s) => sum + Number(s.total_amount), 0);
  const lowStockItems = products.filter(p => p.qty <= p.reorder);

  // KPIs
  document.getElementById('kpiTotalPurchases').textContent = isOwner ? `₹${totalPurchaseSum.toLocaleString()}` : '🔒 Hidden';
  document.getElementById('kpiTotalSales').textContent = isOwner ? `₹${totalSalesSum.toFixed(0)}` : '🔒 Hidden';
  document.getElementById('kpiTotalSkus').textContent = products.length;
  document.getElementById('sidebarAlertBadge').textContent = lowStockItems.length;

  // Overview Table
  const overviewTbody = document.getElementById('overviewProductsTbody');
  if (overviewTbody) {
    overviewTbody.innerHTML = products.map(p => `
      <tr>
        <td><code class="px-2 py-1 bg-dark rounded border border-secondary text-info fw-bold">${p.sku}</code></td>
        <td class="fw-bold">${p.name}</td>
        <td>${p.category}</td>
        <td class="${p.qty <= p.reorder ? 'text-danger fw-bold' : 'text-success fw-bold'}">${p.qty} units</td>
        <td class="text-info fw-bold">₹${p.price.toFixed(2)}</td>
        <td>${isOwner ? `₹${p.cost.toFixed(2)}` : '<span class="badge bg-secondary"><i class="fa-solid fa-lock"></i> Hidden</span>'}</td>
        <td>
          <div class="d-flex gap-2">
            <button class="btn btn-sm btn-outline-info d-flex align-items-center gap-1" onclick="openEditProductModal(${p.id})"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
            <button class="btn btn-sm btn-outline-warning text-warning d-flex align-items-center gap-1" onclick="openReorderModal(${p.id})"><i class="fa-solid fa-cart-plus"></i> Reorder</button>
            ${isOwner ? `<button class="btn btn-sm btn-outline-danger d-flex align-items-center" onclick="deleteProduct(${p.id})"><i class="fa-solid fa-trash-can"></i></button>` : ''}
          </div>
        </td>
      </tr>
    `).join('');
  }

  // Full Products Table
  const fullProdTbody = document.getElementById('fullProductsTbody');
  if (fullProdTbody) {
    fullProdTbody.innerHTML = products.map(p => `
      <tr>
        <td class="fw-bold">${p.name}</td>
        <td><code class="px-2 py-1 bg-dark rounded border border-secondary text-info fw-bold">${p.sku}</code></td>
        <td>${p.category}</td>
        <td>${p.supplier}</td>
        <td class="${p.qty <= p.reorder ? 'text-danger fw-bold' : 'text-success fw-bold'}">${p.qty} units</td>
        <td class="text-info fw-bold">₹${p.price.toFixed(2)}</td>
        <td>${isOwner ? `₹${p.cost.toFixed(2)}` : `<span class="text-secondary"><i class="fa-solid fa-lock"></i> Hidden for ${currentRoleKey.toUpperCase()}</span>`}</td>
        <td>
          <div class="d-flex gap-2">
            <button class="btn btn-sm btn-outline-info d-flex align-items-center gap-1" onclick="openEditProductModal(${p.id})"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
            <button class="btn btn-sm btn-outline-warning text-warning d-flex align-items-center gap-1" onclick="openReorderModal(${p.id})"><i class="fa-solid fa-cart-plus"></i> Reorder</button>
            ${isOwner ? `<button class="btn btn-sm btn-outline-danger d-flex align-items-center" onclick="deleteProduct(${p.id})"><i class="fa-solid fa-trash-can"></i></button>` : ''}
          </div>
        </td>
      </tr>
    `).join('');
  }

  // Sales Table
  const salesTbody = document.getElementById('salesTbody');
  if (salesTbody) {
    salesTbody.innerHTML = sales.map(s => `
      <tr>
        <td><code>${s.bill_no}</code></td>
        <td>${s.sale_date}</td>
        <td>${s.customer_name}</td>
        <td><span class="badge bg-info text-dark">${s.payment_mode}</span></td>
        <td>${s.cashier_name}</td>
        <td class="text-success fw-bold">${isOwner ? `₹${Number(s.total_amount).toFixed(2)}` : '<span class="text-secondary"><i class="fa-solid fa-lock"></i> Restricted</span>'}</td>
      </tr>
    `).join('');
  }

  // Purchases Table
  const purchasesTbody = document.getElementById('purchasesTbody');
  if (purchasesTbody) {
    purchasesTbody.innerHTML = purchases.map(po => `
      <tr>
        <td><code>${po.po_no}</code></td>
        <td>${po.date}</td>
        <td class="fw-bold">${po.supplier}</td>
        <td>${po.items}</td>
        <td><span class="badge ${po.status === 'Delivered' ? 'bg-success' : 'bg-warning text-dark'}">${po.status}</span></td>
        <td class="fw-bold">${isOwner ? `₹${po.cost.toFixed(2)}` : '<span class="text-secondary"><i class="fa-solid fa-lock"></i> Restricted</span>'}</td>
      </tr>
    `).join('');
  }

  // Suppliers Table
  const suppliersTbody = document.getElementById('suppliersTbody');
  if (suppliersTbody) {
    suppliersTbody.innerHTML = suppliers.map(s => `
      <tr>
        <td class="fw-bold">${s.name}</td>
        <td>${s.contact}</td>
        <td>${s.phone}</td>
        <td>${s.email}</td>
        <td>${s.city}</td>
      </tr>
    `).join('');
  }

  // Stock Alerts Table
  const alertsTbody = document.getElementById('alertsTbody');
  if (alertsTbody) {
    document.getElementById('stockAlertsTitle').innerHTML = `<i class="fa-solid fa-triangle-exclamation me-2"></i>Stock Alerts List (${lowStockItems.length} Low Items)`;
    alertsTbody.innerHTML = lowStockItems.map(p => `
      <tr>
        <td class="fw-bold text-danger">${p.name}</td>
        <td class="fw-bold text-danger">${p.qty} units</td>
        <td>${p.reorder} units</td>
        <td>${p.supplier}</td>
        <td>
          <button class="btn btn-warning btn-sm text-dark fw-bold d-inline-flex align-items-center gap-1" onclick="openReorderModal(${p.id})">
            <i class="fa-solid fa-cart-plus me-1"></i> Instant Reorder PO
          </button>
        </td>
      </tr>
    `).join('');
  }

  // Reports Ledger
  document.getElementById('repTotalSkus').textContent = `${products.length} items`;
  document.getElementById('repTotalSales').textContent = `₹${totalSalesSum.toFixed(2)} (${sales.length} transactions)`;
  document.getElementById('repTotalPurchases').textContent = `₹${totalPurchaseSum.toFixed(2)}`;
  document.getElementById('repNetProfit').textContent = `₹${(totalSalesSum - 11000 - 3200).toFixed(2)}`;

  renderCharts();
}

// CHARTS RENDERING (CHART.JS)
function renderCharts() {
  if (currentRoleKey !== 'admin') return;

  Object.keys(chartInstances).forEach(k => {
    if (chartInstances[k]) chartInstances[k].destroy();
  });

  // Top Selling Products Chart
  ['chartFastSelling', 'chartFastSellingRep'].forEach(id => {
    const ctx = document.getElementById(id);
    if (ctx) {
      chartInstances[id] = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Aashirvaad Atta 5kg', 'Fortune Oil 1L', 'Amul Butter 500g', 'Tata Salt 1kg', 'Maggi Noodles 4P'],
          datasets: [{ data: [42, 38, 29, 25, 20], backgroundColor: ['#38bdf8', '#10b981', '#f59e0b', '#6366f1', '#ec4899'], borderWidth: 2, borderColor: '#1f293d' }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right', labels: { color: '#e2e8f0', font: { family: 'Plus Jakarta Sans', size: 11 } } } } }
      });
    }
  });

  // Stock Value by Category Chart
  ['chartStockValueCategory', 'chartStockValueCatRep'].forEach(id => {
    const ctx = document.getElementById(id);
    if (ctx) {
      chartInstances[id] = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Atta & Flour', 'Edible Oils', 'Dairy & Eggs', 'Spices & Salt', 'Household Care', 'Beverages'],
          datasets: [{ label: 'Asset Value (₹)', data: [28500, 24300, 18200, 11400, 8950, 4100], backgroundColor: 'rgba(56, 189, 248, 0.85)', borderRadius: 6 }]
        },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { ticks: { color: '#e2e8f0' }, grid: { color: '#334155' } }, x: { ticks: { color: '#e2e8f0' }, grid: { display: false } } }, plugins: { legend: { display: false } } }
      });
    }
  });

  // Sales Trend Chart
  const ctxTrend = document.getElementById('chartSalesTrend');
  if (ctxTrend) {
    chartInstances['chartSalesTrend'] = new Chart(ctxTrend, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{ label: 'Turnover (₹)', data: [1240, 1580, 1350, 1890, 2450, 3120, 2850], borderColor: '#38bdf8', backgroundColor: 'rgba(56, 189, 248, 0.15)', fill: true, tension: 0.35, pointRadius: 4 }]
      },
      options: { responsive: true, maintainAspectRatio: false, scales: { y: { ticks: { color: '#e2e8f0' }, grid: { color: '#334155' } }, x: { ticks: { color: '#e2e8f0' }, grid: { display: false } } }, plugins: { legend: { labels: { color: '#e2e8f0' } } } }
    });
  }

  // Supplier Wholesale Price Comparison
  const ctxSupp = document.getElementById('chartSupplierPrices');
  if (ctxSupp) {
    chartInstances['chartSupplierPrices'] = new Chart(ctxSupp, {
      type: 'bar',
      data: {
        labels: ['Atta 5kg', 'Oil 1L', 'Butter 500g', 'Tata Salt 1kg'],
        datasets: [
          { label: 'Ganesh Wholesalers', data: [220, 135, 245, 21.0], backgroundColor: '#38bdf8', borderRadius: 4 },
          { label: 'Lakshmi Distributors', data: [228, 132, 240, 24.5], backgroundColor: '#f59e0b', borderRadius: 4 },
          { label: 'Sri Ram Suppliers', data: [225, 138, 238, 22.0], backgroundColor: '#10b981', borderRadius: 4 }
        ]
      },
      options: { responsive: true, maintainAspectRatio: false, scales: { y: { ticks: { color: '#e2e8f0' }, grid: { color: '#334155' } }, x: { ticks: { color: '#e2e8f0' }, grid: { display: false } } }, plugins: { legend: { labels: { color: '#e2e8f0' } } } }
    });
  }
}

// EDIT PRODUCT
function openEditProductModal(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;

  document.getElementById('editProdId').value = p.id;
  document.getElementById('editProdName').value = p.name;
  document.getElementById('editProdSku').value = p.sku;
  document.getElementById('editProdCat').value = p.category;
  document.getElementById('editProdPrice').value = p.price;
  document.getElementById('editProdCost').value = p.cost;
  document.getElementById('editProdQty').value = p.qty;
  document.getElementById('editProdReorder').value = p.reorder;

  const select = document.getElementById('editProdSupplier');
  select.innerHTML = suppliers.map(s => `<option value="${s.name}" ${s.name === p.supplier ? 'selected' : ''}>${s.name}</option>`).join('');

  new bootstrap.Modal(document.getElementById('editProductModal')).show();
}

function saveEditedProduct() {
  const id = Number(document.getElementById('editProdId').value);
  products = products.map(p => {
    if (p.id !== id) return p;
    return {
      ...p,
      name: document.getElementById('editProdName').value,
      sku: document.getElementById('editProdSku').value,
      category: document.getElementById('editProdCat').value,
      price: Number(document.getElementById('editProdPrice').value),
      cost: Number(document.getElementById('editProdCost').value),
      qty: Number(document.getElementById('editProdQty').value),
      reorder: Number(document.getElementById('editProdReorder').value),
      supplier: document.getElementById('editProdSupplier').value
    };
  });

  bootstrap.Modal.getInstance(document.getElementById('editProductModal')).hide();
  renderAllViews();
}

function deleteProduct(id) {
  if (confirm("Are you sure you want to remove this product from inventory?")) {
    products = products.filter(p => p.id !== id);
    renderAllViews();
  }
}

// REORDER PO
function openReorderModal(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;

  document.getElementById('reorderProdId').value = p.id;
  document.getElementById('reorderProdName').textContent = p.name;
  document.getElementById('reorderProdStock').textContent = `${p.qty} units`;
  document.getElementById('reorderQtyInput').value = Math.max(30, p.reorder * 2);

  new bootstrap.Modal(document.getElementById('reorderModal')).show();
}

function confirmReorderPO() {
  const id = Number(document.getElementById('reorderProdId').value);
  const qtyToOrder = Number(document.getElementById('reorderQtyInput').value);
  const p = products.find(x => x.id === id);
  if (!p) return;

  const newPO = {
    id: Date.now(),
    po_no: `PO-2026-${purchases.length + 883}`,
    supplier: p.supplier,
    items: `${p.name} (${qtyToOrder} units)`,
    cost: p.cost * qtyToOrder,
    status: 'Ordered',
    date: new Date().toISOString().split('T')[0]
  };

  products = products.map(prod => prod.id === id ? { ...prod, qty: prod.qty + qtyToOrder } : prod);
  purchases.unshift(newPO);

  bootstrap.Modal.getInstance(document.getElementById('reorderModal')).hide();
  renderAllViews();
  alert(`Reorder Purchase Order (${newPO.po_no}) successfully placed with ${newPO.supplier}! Stock updated.`);
}

// POS BILLING
function openPOSModal() {
  currentCart = [];
  document.getElementById('posCustomerName').value = 'Walk-in Customer';
  document.getElementById('posDiscount').value = '0';
  document.getElementById('posQtyInput').value = '1';

  const select = document.getElementById('posProductSelect');
  select.innerHTML = '<option value="">-- Select Product Item --</option>' + 
    products.map(p => `<option value="${p.id}">${p.name} - ₹${p.price} (Stock: ${p.qty})</option>`).join('');

  renderCartTable();
  new bootstrap.Modal(document.getElementById('posModal')).show();
}

function addItemToCart() {
  const prodId = Number(document.getElementById('posProductSelect').value);
  const qty = Number(document.getElementById('posQtyInput').value) || 1;
  const p = products.find(x => x.id === prodId);
  if (!p) return;

  const existing = currentCart.find(i => i.product_id === p.id);
  if (existing) {
    existing.qty += qty;
  } else {
    currentCart.push({ product_id: p.id, name: p.name, price: p.price, qty });
  }

  document.getElementById('posQtyInput').value = '1';
  renderCartTable();
}

function removeCartItem(prodId) {
  currentCart = currentCart.filter(i => i.product_id !== prodId);
  renderCartTable();
}

function renderCartTable() {
  const tbody = document.getElementById('posCartTbody');
  const discount = Number(document.getElementById('posDiscount').value) || 0;
  const subtotal = currentCart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const payable = Math.max(0, subtotal - discount);

  tbody.innerHTML = currentCart.map(i => `
    <tr>
      <td>${i.name}</td>
      <td>₹${i.price}</td>
      <td>${i.qty}</td>
      <td>₹${(i.price * i.qty).toFixed(2)}</td>
      <td><button class="btn btn-sm btn-outline-danger" onclick="removeCartItem(${i.product_id})"><i class="fa-solid fa-trash-can"></i></button></td>
    </tr>
  `).join('');

  document.getElementById('posTotalPayable').textContent = `₹${payable.toFixed(2)}`;
  document.getElementById('btnCompleteSale').disabled = (currentCart.length === 0);
}

function completeSale() {
  if (currentCart.length === 0) return;

  const customer = document.getElementById('posCustomerName').value || 'Walk-in Customer';
  const paymentMode = document.getElementById('posPaymentMode').value;
  const discount = Number(document.getElementById('posDiscount').value) || 0;
  const subtotal = currentCart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const finalTotal = Math.max(0, subtotal - discount);
  const billNo = `INV-2026-0${sales.length + 1}`;

  const newSale = {
    id: Date.now(),
    bill_no: billNo,
    customer_name: customer,
    total_amount: finalTotal,
    cashier_name: userRoleAccounts[currentRoleKey].name,
    sale_date: new Date().toLocaleString(),
    payment_mode: paymentMode,
    items: [...currentCart]
  };

  // Reduce product quantities
  products = products.map(p => {
    const cartItem = currentCart.find(c => c.product_id === p.id);
    return cartItem ? { ...p, qty: Math.max(0, p.qty - cartItem.qty) } : p;
  });

  sales.unshift(newSale);
  bootstrap.Modal.getInstance(document.getElementById('posModal')).hide();
  renderAllViews();
  showInvoice(newSale);
}

// INVOICE THERMAL RECEIPT
function showInvoice(saleObj) {
  const paper = document.getElementById('invoicePaper');
  paper.innerHTML = `
    <div class="text-center mb-3">
      <h5 class="fw-bold mb-0">SRI GANESH GENERAL STORES</h5>
      <div class="small">APMC Yard, Bangalore Market #12</div>
      <div class="small">GSTIN: 29AABCS1429B1Z0 | Ph: +91 98200 11223</div>
      <div class="my-1">----------------------------------------</div>
      <div><strong>RECEIPT #${saleObj.bill_no}</strong></div>
      <div>Date: ${saleObj.sale_date}</div>
      <div>Customer: ${saleObj.customer_name}</div>
      <div>Cashier: ${saleObj.cashier_name}</div>
      <div>Mode: ${saleObj.payment_mode}</div>
      <div class="my-1">----------------------------------------</div>
    </div>
    <table class="w-100 mb-2">
      <thead><tr><th class="text-start">Item</th><th class="text-center">Qty</th><th class="text-end">Amount</th></tr></thead>
      <tbody>
        ${saleObj.items.map(i => `
          <tr>
            <td class="text-start">${i.name}</td>
            <td class="text-center">${i.qty}</td>
            <td class="text-end">₹${(i.price * i.qty).toFixed(2)}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    <div class="text-center my-1">----------------------------------------</div>
    <div class="d-flex justify-content-between fw-bold fs-6">
      <span>GRAND TOTAL:</span>
      <span>₹${Number(saleObj.total_amount).toFixed(2)}</span>
    </div>
    <div class="text-center mt-3">
      <small>Thank you for shopping at Sri Ganesh Stores!</small>
    </div>
  `;

  new bootstrap.Modal(document.getElementById('invoiceModal')).show();
}

// ADD NEW PRODUCT
function openAddProductModal() {
  document.getElementById('newProdName').value = '';
  document.getElementById('newProdSku').value = '';
  document.getElementById('newProdCat').value = 'General';
  document.getElementById('newProdPrice').value = '';
  document.getElementById('newProdCost').value = '';
  document.getElementById('newProdQty').value = '10';
  document.getElementById('newProdReorder').value = '10';

  const select = document.getElementById('newProdSupplier');
  select.innerHTML = suppliers.map(s => `<option value="${s.name}">${s.name}</option>`).join('');

  new bootstrap.Modal(document.getElementById('addProductModal')).show();
}

function saveNewProduct() {
  const name = document.getElementById('newProdName').value.trim();
  const price = Number(document.getElementById('newProdPrice').value);
  if (!name || !price) {
    alert("Please enter product name and selling price!");
    return;
  }

  const sku = document.getElementById('newProdSku').value.trim() || `SKU-${Date.now().toString().slice(-4)}`;
  const cost = Number(document.getElementById('newProdCost').value) || (price * 0.8);
  const qty = Number(document.getElementById('newProdQty').value) || 0;
  const reorder = Number(document.getElementById('newProdReorder').value) || 10;
  const supplier = document.getElementById('newProdSupplier').value || 'Ganesh Wholesalers';
  const category = document.getElementById('newProdCat').value.trim() || 'General';

  const newProd = {
    id: Date.now(),
    name, sku, category, price, cost, qty, reorder, supplier
  };

  products.push(newProd);
  bootstrap.Modal.getInstance(document.getElementById('addProductModal')).hide();
  renderAllViews();
}
