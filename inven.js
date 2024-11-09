// script.js

// Product data (initially empty)
let inventory = [];

// Function to render the inventory table
function renderInventory() {
    const tableBody = document.querySelector("#inventoryTable tbody");
    tableBody.innerHTML = ''; // Clear current table rows

    // Populate the table with current inventory
    inventory.forEach((product, index) => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = product.name;

        const priceCell = document.createElement("td");
        priceCell.textContent = `$${product.price.toFixed(2)}`;

        const quantityCell = document.createElement("td");
        quantityCell.textContent = product.quantity;

        const actionCell = document.createElement("td");

        // Create update and delete buttons
        const updateButton = document.createElement("button");
        updateButton.textContent = "Update";
        updateButton.onclick = () => updateProduct(index);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteProduct(index);

        actionCell.appendChild(updateButton);
        actionCell.appendChild(deleteButton);

        row.appendChild(nameCell);
        row.appendChild(priceCell);
        row.appendChild(quantityCell);
        row.appendChild(actionCell);

        tableBody.appendChild(row);
    });
}

// Function to add a new product
function addProduct() {
    const name = document.querySelector("#productName").value.trim();
    const price = parseFloat(document.querySelector("#productPrice").value);
    const quantity = parseInt(document.querySelector("#productQuantity").value);

    if (name && price > 0 && quantity > 0) {
        // Create a new product object
        const newProduct = {
            name,
            price,
            quantity
        };

        // Add the product to the inventory
        inventory.push(newProduct);

        // Clear input fields
        document.querySelector("#productName").value = '';
        document.querySelector("#productPrice").value = '';
        document.querySelector("#productQuantity").value = '';

        // Re-render the inventory table
        renderInventory();
    } else {
        alert("Please provide valid product details.");
    }
}

// Function to update product stock (edit quantity)
function updateProduct(index) {
    const newQuantity = prompt("Enter new quantity:", inventory[index].quantity);
    const parsedQuantity = parseInt(newQuantity);

    if (parsedQuantity && parsedQuantity >= 0) {
        inventory[index].quantity = parsedQuantity;
        renderInventory();
    } else {
        alert("Invalid quantity!");
    }
}

// Function to delete a product from the inventory
function deleteProduct(index) {
    const confirmDelete = confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
        inventory.splice(index, 1); // Remove the product
        renderInventory(); // Re-render the inventory
    }
}

// Initial render of the inventory
renderInventory();
