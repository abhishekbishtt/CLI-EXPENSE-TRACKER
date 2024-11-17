
# CLI Expense Tracker

This is a command-line interface (CLI) application that helps you track your expenses. It allows you to add, update, delete, list, and summarize your expenses. The data is saved locally in a JSON file.

## Features

- **Add Expenses**: Add a new expense with description, amount, and category.
- **Update Expenses**: Update the amount, description, or category of an existing expense by ID.
- **Delete Expenses**: Delete an expense by its unique ID.
- **List Expenses**: List all expenses or filter by category.
- **Summary**: View the total expenses for a specific month or overall.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm (Node Package Manager)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/abhishekbishtt/CLI-EXPENSE-TRACKER.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd CLI-EXPENSE-TRACKER
   ```

3. **Install dependencies**:
   Run the following command to install the necessary packages:
   ```bash
   npm install
   ```

## Usage

### Available Commands

1. **Add a new expense**:
   ```bash
   node expenseTracker.js add --description "<description>" --amount "<amount>" --category "<category>"
   ```
   Example:
   ```bash
   node expenseTracker.js add --description "Groceries" --amount 50 --category "Food"
   ```

2. **List all expenses**:
   ```bash
   node expenseTracker.js list
   ```

3. **Delete an expense by ID**:
   ```bash
   node expenseTracker.js delete --id <id>
   ```
   Example:
   ```bash
   node expenseTracker.js delete --id 1
   ```

4. **View the total expense summary**:
   ```bash
   node expenseTracker.js summary [<month>]
   ```
   Example for all expenses:
   ```bash
   node expenseTracker.js summary
   ```
   Example for expenses in a specific month:
   ```bash
   node expenseTracker.js summary 2024-11
   ```

5. **Update an existing expense**:
   ```bash
   node expenseTracker.js update --id <id> --amount <amount> --description "<description>" --category "<category>"
   ```
   Example:
   ```bash
   node expenseTracker.js update --id 1 --amount 10 --description "Updated Grocery" --category "Food"
   ```

### Data Storage

The expenses are stored in a `expenses.json` file in the project directory. Each expense has the following attributes:

- `id`: Unique identifier for each expense.
- `date`: Date of the expense (ISO format).
- `description`: Description of the expense.
- `category`: Category of the expense.
- `amount`: Amount spent.

## Contributing

If you'd like to contribute to this project, feel free to fork it, submit issues, and make pull requests.

1. Fork the repository.
2. Create your branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
