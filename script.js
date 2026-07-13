// ===========================================
// Earth HR - Employee Management System
// ===========================================

// Employee Array

let employees = JSON.parse(localStorage.getItem("employees")) || [];

// Form Elements

const employeeForm = document.getElementById("employeeForm");

const employeeTable = document.getElementById("employeeTable");

const searchInput = document.getElementById("searchInput");

const filterDepartment = document.getElementById("filterDepartment");

// Dashboard

const employeeCount = document.getElementById("employeeCount");

const departmentCount = document.getElementById("departmentCount");

const averageSalary = document.getElementById("averageSalary");

// ===========================================
// Save Employees
// ===========================================

function saveEmployees() {

    localStorage.setItem(
        "employees",
        JSON.stringify(employees)
    );

}

// ===========================================
// Dashboard
// ===========================================

function updateDashboard() {

    employeeCount.textContent = employees.length;

    const departments =
        [...new Set(employees.map(emp => emp.department))];

    departmentCount.textContent = departments.length;

    if (employees.length === 0) {

        averageSalary.textContent = "₹0";
        return;

    }

    const totalSalary =
        employees.reduce(
            (sum, emp) => sum + emp.salary,
            0
        );

    averageSalary.textContent =
        "₹" +
        Math.round(totalSalary / employees.length).toLocaleString();

}

// ===========================================
// Render Employees
// ===========================================

function renderEmployees(list = employees) {

    employeeTable.innerHTML = "";

    list.forEach((employee, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>${employee.id}</td>

            <td>${employee.name}</td>

            <td>${employee.email}</td>

            <td>${employee.department}</td>

            <td>${employee.position}</td>

            <td>₹${employee.salary.toLocaleString()}</td>

            <td>

                <button onclick="deleteEmployee(${index})">

                    Delete

                </button>

            </td>

        `;

        employeeTable.appendChild(row);

    });

    updateDashboard();

}

// ===========================================
// Initial Load
// ===========================================

renderEmployees();
// ===========================================
// Register Employee
// ===========================================

employeeForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const employee = {

        id: Date.now(),

        name: document.getElementById("name").value.trim(),

        email: document.getElementById("email").value.trim(),

        department: document.getElementById("department").value,

        position: document.getElementById("position").value.trim(),

        salary: Number(document.getElementById("salary").value)

    };

    employees.push(employee);

    saveEmployees();

    renderEmployees();

    employeeForm.reset();

});

// ===========================================
// Delete Employee
// ===========================================

function deleteEmployee(index) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) {

        return;

    }

    employees.splice(index, 1);

    saveEmployees();

    renderEmployees();

}

// ===========================================
// Search & Filter
// ===========================================

function filterEmployees() {

    const searchValue = searchInput.value
        .toLowerCase()
        .trim();

    const departmentValue = filterDepartment.value;

    const filteredEmployees = employees.filter((employee) => {

        const matchName =
            employee.name
                .toLowerCase()
                .includes(searchValue);

        const matchDepartment =
            departmentValue === "All" ||
            employee.department === departmentValue;

        return matchName && matchDepartment;

    });

    renderEmployees(filteredEmployees);

}

// ===========================================
// Event Listeners
// ===========================================

searchInput.addEventListener(
    "input",
    filterEmployees
);

filterDepartment.addEventListener(
    "change",
    filterEmployees
);

// ===========================================
// Initial Dashboard Update
// ===========================================

updateDashboard();

// ===========================================
// Theme Changer
// ===========================================

const theme = document.getElementById("theme");

const savedTheme =
    localStorage.getItem("theme") || "green";

if(savedTheme !== "green"){

    document.body.classList.add(savedTheme);

}

theme.value = savedTheme;

theme.addEventListener("change",function(){

    document.body.className="";

    if(this.value!=="green"){

        document.body.classList.add(this.value);

    }

    localStorage.setItem(
        "theme",
        this.value
    );

});