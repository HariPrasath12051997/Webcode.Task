const searchInput = document.querySelector('#search');
const searchButton = document.querySelector('#search-btn');
const resultsContainer = document.querySelector('#results');

async function getMakeupData() {
    try {
      const response = await fetch('https://makeup-api.herokuapp.com/api/v1/products.json');
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  function displayResults(products) {
    resultsContainer.innerHTML = '';
    products.forEach(product => {
      const div = document.createElement('div');
      div.innerHTML = `
        <img src="${product.image_link}" alt="${product.name}">
        <h2>${product.brand} - ${product.name}</h2>
        <p>Price: ${product.price}</p>
        <p>Description: ${product.description}</p>
        <a href="${product.product_link}" target="_blank">View product</a>
      `;
      resultsContainer.appendChild(div);
    });
  }

  searchButton.addEventListener('click', async () => {
    const searchTerm = searchInput.value.toLowerCase();
    const data = await getMakeupData();
    const filteredData = data.filter(product => {
      return product.brand.toLowerCase().includes(searchTerm) || product.name.toLowerCase().includes(searchTerm);
    });
    displayResults(filteredData);
  });

  