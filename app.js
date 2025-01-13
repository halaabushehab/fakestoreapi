function Product(title, price, description, image, id) {
  this.title = title;
  this.price = price;
  this.description = description;
  this.image = image;
  this.id = id;
}
// READ PTODUCRT==================================================

const productURL = "https://6784de3b1ec630ca33a61161.mockapi.io/Products";

async function fetchProduct() {
  try {
    const response = await fetch(productURL);
    const data = await response.json();

    const mainSection = document.querySelector("main");
    // mainSection.innerHTML = ""; 
    data.map((product) => {
      renderCustomerCard(product);
    });
  } catch (error) {
    console.log("Error fetching products:", error);
  }
}

// CREATED CARD==================================================
function renderCustomerCard(product) {
  const card = document.createElement("div");
  card.classList.add("card");

  const img = document.createElement("img");
  img.src = product.image;  
  img.alt = product.title; 
  

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const title = document.createElement("h5");
  title.textContent = product.title;

  const price = document.createElement("p");
  price.textContent = `Price: $${product.price}`;

  const description = document.createElement("p");
  description.classList.add("card-text");
  description.textContent = product.description;

  // ADD BUTTON
  const buttonsContainer = document.createElement("div");
  const updateButton = document.createElement("button");
  updateButton.textContent = "Update";
  // updateButton.classList.add("btn", "btn-primary");
  updateButton.onclick = () => updateProduct(product.id);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  // deleteButton.classList.add("btn", "btn-danger");
  deleteButton.onclick = () => deleteProduct(product.id);

  buttonsContainer.appendChild(updateButton);
  buttonsContainer.appendChild(deleteButton);

  cardBody.appendChild(title);
  cardBody.appendChild(price);
  cardBody.appendChild(description);
  cardBody.appendChild(buttonsContainer);
  card.appendChild(img);
  card.appendChild(cardBody);

  const main = document.querySelector("main");
  main.appendChild(card);
}
// PUT PRODUCT============================================

async function updateProduct(id) {
  const newTitle = prompt("Enter new title:");
  if (!newTitle) return;

  try {
    const response = await fetch(`${productURL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTitle }), 
    });

    if (response.ok) {
      alert("Product updated successfully!");
      fetchProduct(); 
    } else {
      alert("Failed to update product.");
    }
  } catch (error) {
    console.error("Error updating product:", error);
  }
}
// DELETE PRODUCT============================================

async function deleteProduct(id) {
  try {
    const response = await fetch(`${productURL}/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Product deleted successfully!");
      fetchProduct();  
    } else {
      alert("Failed to delete product.");
    }
  } catch (error) {
    console.error("Error deleting product:", error);
  }
}
// POST PRODUCT============================================

  const Add_btn = document.createElement("button");
  Add_btn.textContent = "Add";
  Add_btn.onclick = () => createProduct("btn", "btn-success");
  const nav = document.querySelector("nav");
  nav.appendChild(Add_btn);

async function createProduct() {
  const title = prompt("Enter product title:");
  const price = prompt("Enter product price:");
  const description = prompt("Enter product description:");
  const image = prompt("Enter product image URL:");

  if (!title || !price || !description || !image) return;

  const newProduct = new Product(title, price, description, image);

  try {
    const response = await fetch(productURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    if (response.ok) {
      alert("Product created successfully!");
      fetchProduct(); // إعادة تحميل البيانات بعد الإضافة
    } else {
      alert("Failed to create product.");
    }
  } catch (error) {
    console.error("Error creating product:", error);
  }
}

// استدعاء fetchProduct لتحميل المنتجات عند فتح الصفحة
fetchProduct();

// const products = "https://6784de3b1ec630ca33a61161.mockapi.io/Products";

// // get fetch
// async function fetchProducts() {
//   try {
//     const response = await fetch(products);
//     const data = await response.json();

//     const main = document.querySelector("main");
//     // main.innerHTML = ""; 

//     data.map((product) => {
//       renderCustomerCard(product);
//     });
//   } catch (error) {
//     console.error("Error fetching products:", error);
//   }
// }

// // Render individual product card
// function renderCustomerCard(product) {
//   const card = document.createElement("div");
//   card.classList.add("card");

//   const img = document.createElement("img");
//   img.src = product.Image;

//   const cardBody = document.createElement("div");
//   cardBody.classList.add("card-body");

//   const title = document.createElement("h5");
//   title.textContent = product.Title;

//   const price = document.createElement("p");
//   price.textContent = `Price: $${product.Price}`;

//   const description = document.createElement("p");
//   description.textContent = product.Description;

//   // Update button
//   const updateButton = document.createElement("button");
//   updateButton.textContent = "Update";
//   updateButton.classList.add("update-btn");
//   updateButton.addEventListener("click", () => updateProduct(product.id));

//   // Delete button
//   const deleteButton = document.createElement("button");
//   deleteButton.textContent = "Delete";
//   deleteButton.classList.add("delete-btn");
//   deleteButton.addEventListener("click", () => deleteProduct(product.id));


// //main to be container for all cards
//   const main = document.querySelector("main");

//   card.appendChild(img);
//   cardBody.appendChild(title);
//   cardBody.appendChild(price);
//   cardBody.appendChild(description);
//   cardBody.appendChild(updateButton);
//   cardBody.appendChild(deleteButton);
//   card.appendChild(cardBody);
//   main.appendChild(card);
// }

// // Create a new product
// async function createProduct() {
//   const newProduct = {
//     Title: "New Product",
//     Price: 25.99,
//     Description: "This is a description for the new product.",
//     Image: "https://via.placeholder.com/150",
//   };

//   try {
//     const response = await fetch(apiUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newProduct),
//     });
//     const createdProduct = await response.json();
//     console.log("Product created:", createdProduct);
//     fetchProducts();
//   } catch (error) {
//     console.error("Error creating product:", error);
//   }
// }


// // Update a product
// async function updateProduct(id) {
//   const updatedTitle = prompt("Enter the new title:");

//   if (!updatedTitle) {
//     alert("Title cannot be empty!");
//     return;
//   }

//   const updatedData = {
//     Title: updatedTitle,
//   };

//   try {
//     const response = await fetch(`${product}/${id}`, { // Use the correct variable name for API URL
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(updatedData),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to update the product.");
//     }

//     const updatedProduct = await response.json();
//     console.log("Product updated:", updatedProduct);

//     // Update the DOM directly if the product card exists
//     const productCard = document.querySelector(`.card[data-id="${id}"]`);
//     if (productCard) {
//       const titleElement = productCard.querySelector("h5");
//       if (titleElement) {
//         titleElement.textContent = updatedProduct.Title;
//       }
//     }

//   } catch (error) {
//     console.error("Error updating product:", error);
//     alert("Failed to update the product. Please try again.");
//   }
// }
// // Delete a product
// async function deleteProduct(id) {
//   try {
//     await fetch(`${apiUrl}/${id}`, {
//       method: "DELETE",
//     });
//     console.log(`Product with id ${id} deleted`);
//     fetchProducts();
//   } catch (error) {
//     console.error("Error deleting product:", error);
//   }
// }

// // Add a button for creating a new product
// function addCreateButton() {
//   const createButton = document.createElement("button");
//   createButton.textContent = "Add New Product";
//   createButton.classList.add("create-btn");
//   createButton.addEventListener("click", createProduct);

//   const main = document.querySelector("main");
//   main.appendChild(createButton);
// }

// // Initialize the app
// fetchProducts();
// addCreateButton();
