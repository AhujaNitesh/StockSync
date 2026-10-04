// Login Page Authentication Handler
const userRoleAccounts = {
  admin: { role: 'admin', name: 'Sri Ganesh (Owner/Admin)', email: 'admin@sriganeshstore.com', password: 'admin123', badge: 'Owner (Full Access)', badgeClass: 'bg-danger' },
  manager: { role: 'manager', name: 'Suresh Rao (Supervisor/Manager)', email: 'manager@sriganeshstore.com', password: 'manager123', badge: 'Supervisor (Revenue Redacted)', badgeClass: 'bg-warning text-dark' },
  employee: { role: 'employee', name: 'Rahul V. (Cashier/Employee)', email: 'staff@sriganeshstore.com', password: 'staff123', badge: 'Cashier (POS Counter Only)', badgeClass: 'bg-success' }
};

document.addEventListener('DOMContentLoaded', () => {
  const roleSelect = document.getElementById('loginRoleSelect');
  const emailInput = document.getElementById('loginEmail');
  const passwordInput = document.getElementById('loginPassword');
  const hintPassword = document.getElementById('hintPassword');
  const roleBadge = document.getElementById('roleBadge');
  const loginForm = document.getElementById('loginForm');
  const loginError = document.getElementById('loginError');

  if (!roleSelect) return;

  const urlParams = new URLSearchParams(window.location.search);
  const roleParam = urlParams.get('role');
  if (roleParam && userRoleAccounts[roleParam]) {
    roleSelect.value = roleParam;
  }

  function updateFields() {
    const roleKey = roleSelect.value;
    const acc = userRoleAccounts[roleKey];
    emailInput.value = acc.email;
    passwordInput.value = acc.password;
    hintPassword.textContent = acc.password;
    roleBadge.textContent = acc.badge;
    roleBadge.className = `badge ${acc.badgeClass} fs-6`;
    loginError.classList.add('d-none');
  }

  roleSelect.addEventListener('change', updateFields);
  updateFields();

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const roleKey = roleSelect.value;
    const expected = userRoleAccounts[roleKey];
    if (passwordInput.value !== expected.password) {
      loginError.textContent = `Incorrect password for ${expected.name}! (Hint: ${expected.password})`;
      loginError.classList.remove('d-none');
      return;
    }
    window.location.href = `dashboard.html?role=${roleKey}`;
  });
});
