const fs = require('fs');
const path = require('path');
const { Command } = require('commander');

const program = new Command(); // Instance of commander
const filePath = path.join(__dirname, 'expenses.json');

// Function to load existing expenses from the file
const loadExpenses = () => {
    if (fs.existsSync(filePath)) {
        try {    //try and catch used beacase if file exist but it is empty then JSON.parse data will throw an error
            const data = fs.readFileSync(filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error reading or parsing expenses file. Initializing empty expenses array.');
            return []; // Return an empty array if there's an error
        }
    }
    return [];
};

let expenses = loadExpenses(); // Loading the expenses in expenses var

// Saving expense
const saveExpenses = (expenses) => {
    fs.writeFileSync(filePath, JSON.stringify(expenses, null, 2)); // 2 is for spacing, null is for reducer function
};


//updating expenses
const updateExpenses=(id,amount,description,category)=>{
expenses=loadExpenses();



// expenses.forEach(expense=>{
//     if(expense.id===parseInt(id)){
//         expense.amount=expense.amount+parseInt(amount);
//         found=true;
//         if(description){
//             expense.description=description;
//         }
       
//     }
    
    
// })

// if(found){
//     saveExpenses(expenses);
//     console.log("task updated successfully")
// }else{
//     console.error("EXPENSE ID NOT FOUND");
// }}


// .find if better as once id is found it will stop searching

const expense=expenses.find(exp => exp.id===parseInt(id));
if(expense){
    expense.amount+=parseFloat(amount);
    if(description){
        expense.description=description;
    }
    if(category){
        expense.category=category;
        
    }
    saveExpenses(expenses);  
    console.log("Expense updated successfully.");
    found = true;
}else
{
    console.log("ERROR, ID not found");
}





}




// Adding an expense
const addExpenses = (description, amount,category) => {
//valitde input
const parsedAmount=parseFloat(amount);
if(isNaN(parsedAmount) || parsedAmount<=0){
    console.error("Invalid amount");
    return;

}


    let maxId = expenses.length > 0 ? Math.max(...expenses.map(exp => exp.id)) : 0;

    // Creating an expense object
    const expense = {
        id: maxId + 1,
        date: new Date().toISOString().split('T')[0],
        description,
        category,
        amount: parsedAmount,
    };

    expenses.push(expense);
    try{
        saveExpenses(expenses);
        console.log(`Expense added successfully with ID ${expense.id}`);

    } catch(error){
        console.error('Error saving expense',error);
    }

};

// Listing all expenses
const listExpenses = (category) => {
    expenses = loadExpenses(); // Reload expenses for up-to-date data
    if (expenses.length === 0) {
        console.log("No Expenses found");
        return;
    }
    if (category) {
        const filteredExp = expenses.filter(expense => {
            return expense.category.toLowerCase() === category.toLowerCase();
        });
        filteredExp.forEach(expense => {
            console.log(`ID: ${expense.id}, Date: ${expense.date}, Description: ${expense.description}, Amount: $${expense.amount}`);
        });
    } else {
        console.log("All expenses:");
        expenses.forEach(expense => {
            console.log(`ID: ${expense.id}, Date: ${expense.date}, Description: ${expense.description}, Amount: $${expense.amount}`);
        });
    }
};

// Deleting an expense
const deleteExpense = (id) => {
    expenses = loadExpenses();
    const index = expenses.findIndex(expense => expense.id === parseInt(id, 10));

    // If index is found, delete it
    if (index !== -1) {
        expenses.splice(index, 1); // Remove the item at the found index
        saveExpenses(expenses);
        console.log(`Expense with ID ${id} deleted successfully.`);
    } else {
        console.log(`Expense with ID ${id} not found.`);
    }
};

// Summarizing expenses
const summary = (month) => {
    expenses = loadExpenses();
    let total = 0;

    const filteredExpenses = month
        ? expenses.filter(expense => expense.date.startsWith(month))
        : expenses;

    filteredExpenses.forEach(expense => {
        total += expense.amount;
    });

    const message = month
        ? `Total expense for ${month}: ${total}`
        : `Total expense: ${total}`;
    console.log(message);
};

// CLI commands
program
    .command('add')
    .option('--description <description> ')
    .option('--amount <amount>')
    .option('--category <category>')
    
    .description('Add a new expense')
    .action((options) => { // The action method receives an options object, which contains all the options passed to the command. You can destructure it to get the values for description, amount, and category.
        const { description, amount, category } = options;
        addExpenses(description, amount, category);
    });

program
    .command('list')
    .option('--category <category>')
    .description('List all expenses')
    .action((options) => {
        const{category}=options;
        listExpenses(category);
    });

    program
    .command('delete')
    .option('--id <id>')
    .description('Delete an expense by ID')
    .action((options) => { 
        const { id } = options;
        deleteExpense(id); 
    });

program
    .command('summary [month]') // Square brackets mean it's optional
    .description('Show total expense for a given month or overall total expense')
    .action((month) => {
        summary(month);// we did not destrucutred options here as we did not used .options here..
    });

program
.command('update')
.description('Update an expense')
.option('--id <id>')
.option('--amount <amount>')
.option('--description <description>')
.option('--category <category>')
.action((options)=>{
    const{description,amount,id,category}=options;
    updateExpenses(id,amount,description,category);
}
);
  


// Parse the command-line arguments
program.parse(process.argv);
