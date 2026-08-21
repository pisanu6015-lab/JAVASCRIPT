const budgetArray = [];
const budgetForm = document.getElementById('budgetform');

budgetForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.querySelector('#ProgramName').value;
    const amount = Number(document.querySelector('#number').value);
    const date = document.querySelector('#date').value;
    const time = document.querySelector('#time').value;
    const incomeExpense = document.getElementById('IncomeAndExpense').value;

    const budgetData = {
        name: name,
        amount: amount,
        date: date,
        time: time,
        incomeExpense: incomeExpense
    };

    budgetArray.push(budgetData);

    renderTransactions();
    updateSummary();

    budgetForm.reset();
});

function renderTransactions(filteredData = budgetArray) {
    const incomeList = document.getElementById('Incomelist');
    const expensesList = document.getElementById('Expenseslist');

    incomeList.innerHTML = '';
    expensesList.innerHTML = '';

    filteredData.forEach((transaction) => {
        const originalIndex = budgetArray.indexOf(transaction);

        const listItem = document.createElement('li');
        listItem.textContent = `${transaction.name} - ${transaction.amount} บาท `;

        if (transaction.incomeExpense === 'Income') {
            listItem.style.color = 'green';
        } else {
            listItem.style.color = 'red';
        }

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'ลบ';
        deleteBtn.type = 'button';
        
        // เมื่อกดลบ จะทำการลบทันทีโดยไม่มี confirm
        deleteBtn.addEventListener('click', function () {
            deleteTransaction(originalIndex);
        });

        listItem.appendChild(deleteBtn);

        if (transaction.incomeExpense === 'Income') {
            incomeList.appendChild(listItem);
        } else {
            expensesList.appendChild(listItem);
        }
    });
}

function deleteTransaction(index) {
    budgetArray.splice(index, 1);
    filterTransactions();
    updateSummary();
}

function filterTransactions() {
    const filterValue = document.getElementById('filterType').value;
    
    if (filterValue === 'all') {
        renderTransactions(budgetArray);
    } else {
        const filtered = budgetArray.filter(item => item.incomeExpense === filterValue);
        renderTransactions(filtered);
    }
}

function updateSummary() {
    const totalIncome = budgetArray
        .filter(item => item.incomeExpense === 'Income')
        .reduce((sum, item) => sum + item.amount, 0);

    const totalExpenses = budgetArray
        .filter(item => item.incomeExpense === 'Expenses')
        .reduce((sum, item) => sum + item.amount, 0);

    const totalBalance = totalIncome - totalExpenses;

    document.getElementById('TotalIncome').textContent = `ยอดรวมรายรับ: ${totalIncome}`;
    document.getElementById('TotalExpenses').textContent = `ยอดรวมรายจ่าย: ${totalExpenses}`;
    
    const totalBalanceElem = document.getElementById('TotalBalance');
    if (totalBalanceElem) {
        totalBalanceElem.textContent = `ยอดคงเหลือ: ${totalBalance}`;
    }
}