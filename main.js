document.addEventListener('DOMContentLoaded', function () {
  const toggleSidebarButton = document.querySelector('.toggle-sidebar-button');
  const sidebar = document.getElementById('sidebar');

  toggleSidebarButton.addEventListener('click', function () {
    // Toggle the visibility of the sidebar
    sidebar.style.display = (sidebar.style.display === 'none' || sidebar.style.display === '') ? 'block' : 'none';
  });
});

var products;
function fetchData() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // Parse the JSON response
      products = JSON.parse(xhr.responseText);

      // Call function to display products
      displayProducts(products);
    }
  };
  xhr.open("GET", "https://fakestoreapi.com/products", true);
  xhr.send();
}

// Function to display products on the webpage
function displayProducts(products) {
  var container = document.getElementById("productContainer");
  container.innerHTML = "";


  // Loop through the products and create a card for each
  products.forEach(function (product) {
    var card = document.createElement("div");
    card.className = "card";

    // Display product information in the card
    card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" style="max-width: 100%;">
            <h3>${product.title}</h3>
            <p>Price: $${product.price}</p>
        `;

    // Add an onclick event listener to each card
    card.onclick = function () {
      openModal(product);
    };

    // Append the card to the container
    container.appendChild(card);
  });
}

// Fetch data when the page loads
window.onload = fetchData;
// Function to open the modal and display detailed product information
function openModal(product) {
  var modalContent = document.getElementById("modalContent");
  modalContent.innerHTML = `
      <img src="${product.image}" alt="${product.title}" style="max-width: 100%; max-height: 300px;">
      <h2>${product.title}</h2>
      <p>Description: ${product.description}</p>
      <p>Price: $${product.price}</p>
      <p>Category: ${product.category}</p>
      <p>Rating: ${getRatingStars(product.rating.rate)} (${product.rating.rate.toFixed(1)}) based on ${product.rating.count} ratings</p>
    `;

  var modal = document.getElementById("myModal");
  modal.style.display = "flex";
}

function getRatingStars(rate) {
  const roundedRate = Math.round(rate);
  const starIcon = '★';
  const emptyStarIcon = '☆';

  return starIcon.repeat(roundedRate) + emptyStarIcon.repeat(5 - roundedRate);
}

// Function to close the modal
function closeModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}

function showCategory(category) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // Parse the JSON response
      var products = JSON.parse(xhr.responseText);

      // Call function to display products
      displayProducts(products);
    }
  };
  if (category === 'all') {
    fetchData()
  }
  else {
    xhr.open("GET", `https://fakestoreapi.com/products/category/${category}`, true);
    xhr.send();
  }

}

function searchProducts() {
  var searchTerm = document.getElementById("searchInput").value.toLowerCase();

  if (searchTerm.trim() === "") {
    // If search term is empty, display all products
    displayProducts(products);
  } else {
    // Filter products based on the search term
    var filteredProducts = products.filter(function (product) {
      return (
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
      );
    });

    // Display the filtered products
    displayProducts(filteredProducts);
  }
}