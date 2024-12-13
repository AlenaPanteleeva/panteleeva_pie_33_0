const categoryData = {
    beauty: [],
    fragrances: [],
    furniture: [],
    groceries: [],
    all: []
};
const productsContainer = document.getElementById('products-container');
const categoriesContainer = document.getElementById('categories-container');

const createCategoryButton = (text, onClick) => {
    const button = document.createElement('button');
    button.textContent = text;
    button.className = 'category-button';
    button.addEventListener('click', onClick);
    categoriesContainer.appendChild(button);
};

const displayProducts = (products) => {
    productsContainer.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product-card';

        const imageElement = document.createElement('img');
        imageElement.src = product.thumbnail;
        imageElement.alt = product.title;

        const titleElement = document.createElement('h2');
        titleElement.textContent = product.title;

        const categoryElement = document.createElement('p');
        categoryElement.textContent = `Категория: ${product.category}`;

        const priceElement = document.createElement('p');
        priceElement.textContent = `Цена: $${product.price}`;

        productDiv.appendChild(imageElement);
        productDiv.appendChild(titleElement);
        productDiv.appendChild(categoryElement);
        productDiv.appendChild(priceElement);

        // Добавляем карточку в контейнер продуктов
        productsContainer.appendChild(productDiv);
    });
};
fetch('https://dummyjson.com/products')
    .then(response => response.json())
    .then(data => {
        const products = data.products;

        // Распределяем продукты по категориям
        products.forEach(product => {
            switch (product.category) {
                case 'beauty':
                    categoryData.beauty.push(product);
                    break;
                case 'fragrances':
                    categoryData.fragrances.push(product);
                    break;
                case 'furniture':
                    categoryData.furniture.push(product);
                    break;
                case 'groceries':
                    categoryData.groceries.push(product);
                    break;
                default:
                    categoryData.all.push(product);
                    break;
            }
        });
        const categoryButtons = [
            { name: 'Все', categories: ['beauty', 'fragrances', 'furniture', 'groceries'] },
            { name: 'Красота', categories: ['beauty'] },
            { name: 'Ароматы', categories: ['fragrances'] },
            { name: 'Мебель', categories: ['furniture'] },
            { name: 'Продукты', categories: ['groceries'] }
        ];
        categoryButtons.forEach(({ name, categories }) => {
            createCategoryButton(name, () => {
                let selectedProducts = [];
                if (name === 'Все') {
                    // Фильтруем все продукты
                    selectedProducts = categories.flatMap(category => categoryData[category]);
                } else {
                    selectedProducts = categories.flatMap(category => categoryData[category]);
                }
                displayProducts(selectedProducts);
            });
        });
        displayProducts(categoryData.all);
    })

