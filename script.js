const employees = [
    {
        name: "Lawrence Mahlangu",
        loans: [
            { amount: 12850, remainingInstallments: 2, installmentAmount: 3350, paid: 10441, balance: 2409 }
        ]
    },
    {
        name: "Hamilton Nkosi",
        loans: [
            { amount: 44850, remainingInstallments: 5, installmentAmount: 5606, paid: 16818, balance: 28032 }
        ]
    },
    {
        name: "Ishmael Ncgobo",
        loans: [
            { amount: 25100, remainingInstallments: 3, installmentAmount: 3333.33, paid: 9999.99, balance: 10000.01}
        ]
    },
    {
        name: "Luzuko Komani",
        loans: [
            { amount: 5000, remainingInstallments: 2, installmentAmount: 1000, paid: 3000, balance: 2000 }
        ]
    },
    {
        name: "Sipho Gumede",
        loans: [
            { amount: 20000, remainingInstallments: 1, installmentAmount: 5000, paid: 15000, balance: 5000 }
        ]
    },
    {
        name: "Thokozani Mahlangu",
        loans: [
            { amount: 63000, remainingInstallments: 12, installmentAmount: 5000, paid: 5000, balance: 58000 }
        ]
    },
    {
        name: "Tshwarelo Ndala",
        loans: [
            { amount: 12850, remainingInstallments: 1, installmentAmount: 3350, paid: 10050, balance: 2800 }
        ]
    },
    {
        name: "William Moshupye",
        loans: [
            { amount: 50000, remainingInstallments: 2, installmentAmount: 10000, paid: 31000, balance: 19000 }
        ]
    },
    {
        name: "Nomvula Nkosi",
        loans: [
            { amount: 1000, remainingInstallments: 1, installmentAmount: 500, paid: 500, balance: 500 }
        ]
    },
    {
        name: "Nkosinathi Mdoka",
        loans: [
            { amount: 10000, remainingInstallments: 4, installmentAmount: 2500, paid: 0, balance: 10000 }
        ]
    },
    
    // Add more employees as needed
    //NO DEDUCTIONS FOR LEON
];

let currentEmployee = '';

function displayEmployees() {
    const employeeList = document.getElementById('employee-list');
    employeeList.innerHTML = '';

    employees.forEach((employee, index) => {
        const total = employee.loans.reduce((sum, loan) => sum + loan.amount, 0);
        const li = document.createElement('li');
        li.textContent = `${employee.name} - Loan: R${total}`;
        li.addEventListener('click', () => showDetails(index));
        employeeList.appendChild(li);
    });
}

function showDetails(index) {
    const employee = employees[index];
    currentEmployee = employee.name;
    document.getElementById('employee-name').textContent = employee.name;

    const loanDetailsBody = document.getElementById('loan-details-body');
    loanDetailsBody.innerHTML = '';  // Clear previous data

    employee.loans.forEach(loan => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>R${loan.amount}</td>
            <td>${loan.remainingInstallments}</td>
            <td>R${loan.installmentAmount}</td>
            <td>R${loan.paid}</td>
            <td>R${loan.balance}</td>
        `;
        loanDetailsBody.appendChild(row);
    });

    document.getElementById('employee-list').classList.add('hidden');
    document.getElementById('loan-details').classList.remove('hidden');
}

function goBack() {
    document.getElementById('employee-list').classList.remove('hidden');
    document.getElementById('loan-details').classList.add('hidden');
}
function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Get current employee data
    const employee = employees.find(emp => emp.name === currentEmployee);

    // Add basic info
    doc.setFontSize(18);
    doc.text("Loan Statement", 20, 20);
    doc.setFontSize(14);
    doc.text(`Employee: ${employee.name}`, 20, 30);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 40);

    // Add table headers
    doc.setFontSize(12);
    doc.text("Loan Amount", 20, 50);
    doc.text("Remaining Installments", 60, 50);
    doc.text("Installment Amount", 110, 50);
    doc.text("Amount Paid", 160, 50);
    doc.text("Remaining Balance", 210, 50);

    // Add loan details
    let yOffset = 60;
    employee.loans.forEach(loan => {
        doc.text(`R${loan.amount}`, 20, yOffset);
        doc.text(`${loan.remainingInstallments}`, 60, yOffset);
        doc.text(`R${loan.installmentAmount}`, 110, yOffset);
        doc.text(`R${loan.paid}`, 160, yOffset);
        doc.text(`R${loan.balance}`, 210, yOffset);
        yOffset += 10;
    });

    // Save the PDF
    doc.save(`${employee.name}_Loan_Statement.pdf`);
}

displayEmployees();
