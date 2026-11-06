// ── State ──────────────────────────────────────────
let employees = [];
let nextId = 1;
let statusTimer = null;

// ── Add Employee ───────────────────────────────────
function addEmployee() {
  const nameInput = document.getElementById('name');
  const professionInput = document.getElementById('profession');
  const ageInput = document.getElementById('age');
  const statusMsg = document.getElementById('statusMsg');

  const name = nameInput.value.trim();
  const profession = professionInput.value.trim();
  const age = ageInput.value.trim();

  // Clear any existing timer
  if (statusTimer) clearTimeout(statusTimer);

  // Validate — all fields required
  if (!name || !profession || !age) {
    statusMsg.textContent =
      'Error : Please Make sure All the fields are filled before adding in an employee !';
    statusMsg.className = 'status-msg error';
    return;
  }

  // Build employee object
  const employee = {
    id: nextId++,
    name: name,
    profession: profession,
    age: parseInt(age, 10),
  };

  // Push into array
  employees.push(employee);

  // Clear inputs
  nameInput.value = '';
  professionInput.value = '';
  ageInput.value = '';

  // Show success message, auto-clear after 3 s
  statusMsg.textContent = 'Success : Employee Added!';
  statusMsg.className = 'status-msg success';

  statusTimer = setTimeout(() => {
    statusMsg.textContent = '';
    statusMsg.className = 'status-msg';
  }, 3000);

  renderList();
}

// ── Delete Employee ────────────────────────────────
function deleteEmployee(id) {
  employees = employees.filter((emp) => emp.id !== id);
  renderList();
}

// ── Render List ────────────────────────────────────
function renderList() {
  const list = document.getElementById('employeeList');
  const emptyMsg = document.getElementById('emptyMsg');

  if (employees.length === 0) {
    emptyMsg.textContent = 'You have 0 Employees.';
    emptyMsg.hidden = false;
    list.innerHTML = '';
    return;
  }

  emptyMsg.hidden = true;

  list.innerHTML = employees
    .map(
      (emp, index) => `
      <div class="employee-card" id="card-${emp.id}">
        <div class="employee-info">
          <span class="employee-num">${index + 1}.</span>
          <span class="employee-field"><span>Name : </span>${emp.name}</span>
          <span class="employee-field"><span>Profession: </span>${emp.profession}</span>
          <span class="employee-field"><span>Age:</span>${emp.age}</span>
        </div>
        <button class="delete-btn" onclick="deleteEmployee(${emp.id})">Delete User</button>
      </div>
    `
    )
    .join('');
}

// ── Enter key support ──────────────────────────────
document.querySelectorAll('input').forEach((input) => {
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addEmployee();
  });
});
