const products = [
    {
      id: 1,
      category: 'pizza',
      title: 'Пепперони',
      description: 'Классическая пицца с томатным соусом, сыром и пепперони',
      fullDescription: 'Настоящая итальянская пицца Пепперони с томатным соусом, моцареллой и пикантной пепперони. Готовится в дровяной печи для идеальной хрустящей корочки.',
      ingredients: ['Тесто', 'Томатный соус', 'Сыр моцарелла', 'Пепперони', 'Орегано'],
      price: 599,
      image: 'images/pizza/peperoni.avif'
    },
    {
      id: 2,
      category: 'pizza',
      title: 'Маргарита',
      description: 'Традиционная пицца с томатами, моцареллой и базиликом',
      fullDescription: 'Традиционная итальянская пицца Маргарита с сочными помидорами, нежным сыром моцарелла и свежим базиликом. Простая и в то же время изысканная классика.',
      ingredients: ['Тесто', 'Томатный соус', 'Сыр моцарелла', 'Помидоры', 'Базилик', 'Оливковое масло'],
      price: 499,
      image: 'images/pizza/margarita.avif'
    },
    {
      id: 3,
      category: 'pizza',
      title: '4 сыра',
      description: 'Сырная пицца с 4 видами премиальных сыров',
      fullDescription: 'Восхитительное сочетание четырех премиальных сыров: моцарелла, горгонзола, пармезан и чеддер, на хрустящем тесте с легким чесночным соусом.',
      ingredients: ['Тесто', 'Сливочный соус', 'Моцарелла', 'Горгонзола', 'Пармезан', 'Чеддер'],
      price: 649,
      image: 'images/pizza/4sir.avif'
    },
    {
      id: 4,
      category: 'pizza',
      title: 'Гавайская',
      description: 'Легкая пицца с ветчиной и ананасами',
      fullDescription: 'Популярная гавайская пицца с сочетанием нежной ветчины и сладких ананасов на основе томатного соуса и тянущейся моцареллы. Прекрасный баланс сладкого и соленого.',
      ingredients: ['Тесто', 'Томатный соус', 'Сыр моцарелла', 'Ветчина', 'Ананасы'],
      price: 549,
      image: 'images/pizza/hagawai.avif'
    },
    {
      id: 5,
      category: 'sushi',
      title: 'Филадельфия',
      description: 'Классический ролл с лососем и сыром',
      fullDescription: 'Знаменитый ролл Филадельфия с нежным лососем, сливочным сыром, огурцом и авокадо, обернутый в рис и нори. Подается с соевым соусом, имбирем и васаби.',
      ingredients: ['Рис', 'Нори', 'Лосось', 'Сливочный сыр', 'Огурец', 'Авокадо'],
      price: 449,
      image: 'images/products/philadelphia.jpg'
    },
    {
      id: 6,
      category: 'sushi',
      title: 'Калифорния',
      description: 'Ролл с крабовым мясом, авокадо и огурцом',
      fullDescription: 'Популярный ролл Калифорния с крабовым мясом, свежим авокадо и хрустящим огурцом, украшенный икрой тобико. Легкий и освежающий вкус.',
      ingredients: ['Рис', 'Нори', 'Крабовое мясо', 'Авокадо', 'Огурец', 'Тобико'],
      price: 399,
      image: 'images/products/california.jpg'
    },
    {
      id: 7,
      category: 'sushi',
      title: 'Дракон',
      description: 'Запеченный ролл с угрем и авокадо',
      fullDescription: 'Изысканный ролл Дракон с начинкой из креветки темпура и огурца, обернутый тонкими ломтиками авокадо и угря. Подается с фирменным соусом унаги.',
      ingredients: ['Рис', 'Нори', 'Креветка темпура', 'Огурец', 'Авокадо', 'Угорь', 'Соус унаги'],
      price: 599,
      image: 'images/products/dragon.jpg'
    },
    {
      id: 8,
      category: 'sets',
      title: 'Семейный',
      description: 'Большой набор пиццы и роллов для всей семьи',
      fullDescription: 'Большой набор для всей семьи, включающий пиццу Пепперони (30 см), пиццу Маргарита (30 см), роллы Филадельфия (8 шт) и Калифорния (8 шт). Идеально для семейного ужина!',
      ingredients: ['Пицца Пепперони', 'Пицца Маргарита', 'Ролл Филадельфия', 'Ролл Калифорния'],
      price: 1699,
      image: 'images/products/family-set.jpg'
    },
    {
      id: 9,
      category: 'sets',
      title: 'Суши сет',
      description: 'Набор популярных роллов и суши',
      fullDescription: 'Разнообразный суши сет, включающий роллы Филадельфия (8 шт), Калифорния (8 шт), Дракон (8 шт), а также нигири с лососем (4 шт) и тунцом (4 шт). Подается с соевым соусом, имбирем и васаби.',
      ingredients: ['Ролл Филадельфия', 'Ролл Калифорния', 'Ролл Дракон', 'Нигири с лососем', 'Нигири с тунцом'],
      price: 1499,
      image: 'images/products/sushi-set.jpg'
    }
  ];
  
  // Отображение продуктов на странице
  function displayProducts(category = 'all') {
    const productsGrid = document.querySelector('.products-grid');
    productsGrid.innerHTML = '';
    
    const filteredProducts = category === 'all' 
      ? products 
      : products.filter(product => product.category === category);
    
    filteredProducts.forEach(product => {
      // Создание карточки товара
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.dataset.id = product.id;
      
      // Используем заглушку для изображений, так как нет реальных файлов
      const imgSrc = product.image || '/api/placeholder/400/300';
      
      productCard.innerHTML = `
        <img src="${imgSrc}" alt="${product.title}" class="product-image">
        <div class="product-info">
          <h3 class="product-title">${product.title}</h3>
          <p class="product-description">${product.description}</p>
          <div class="product-footer">
            <span class="product-price">${product.price} ₽</span>
            <button class="add-to-cart">+</button>
          </div>
        </div>
      `;
      
      productsGrid.appendChild(productCard);
      
      // Добавление обработчика для открытия модального окна
      productCard.addEventListener('click', (e) => {
        // Если клик был не по кнопке добавления в корзину, открываем модальное окно
        if (!e.target.classList.contains('add-to-cart')) {
          openProductModal(product.id);
        }
      });
      
      // Добавление обработчика для кнопки добавления в корзину
      const addToCartBtn = productCard.querySelector('.add-to-cart');
      addToCartBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Предотвращаем открытие модального окна
        addToCart(product.id, 1);
      });
    });
  }
  
  // Открытие модального окна с деталями продукта
  function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.querySelector('.modal');
    const modalContent = document.querySelector('.modal-content');
    
    // Используем заглушку для изображений, так как нет реальных файлов
    const imgSrc = product.image || '/api/placeholder/600/400';
    
    modalContent.innerHTML = `
      <div class="modal-header">
        <h2 class="modal-title">${product.title}</h2>
        <span class="modal-close">&times;</span>
      </div>
      <div class="modal-body">
        <div class="modal-image">
          <img src="${imgSrc}" alt="${product.title}">
        </div>
        <div class="modal-details">
          <p class="modal-description">${product.fullDescription}</p>
          <div class="modal-ingredients">
            <h4>Состав:</h4>
            <ul class="ingredients-list">
              ${product.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
          </div>
          <div class="modal-price">${product.price} ₽</div>
          <div class="modal-actions">
            <div class="quantity">
              <button class="qty-btn minus">-</button>
              <input type="text" class="qty-value" value="1" readonly>
              <button class="qty-btn plus">+</button>
            </div>
            <button class="add-btn">В корзину</button>
          </div>
        </div>
      </div>
    `;
    
    modal.style.display = 'block';
    
    // Закрытие модального окна по клику на крестик
    const closeBtn = modalContent.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
    
    // Закрытие модального окна по клику вне модального окна
    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
    
    // Обработчики для изменения количества
    const minusBtn = modalContent.querySelector('.minus');
    const plusBtn = modalContent.querySelector('.plus');
    const qtyInput = modalContent.querySelector('.qty-value');
    
    minusBtn.addEventListener('click', () => {
      let qty = parseInt(qtyInput.value);
      if (qty > 1) {
        qtyInput.value = qty - 1;
      }
    });
    
    plusBtn.addEventListener('click', () => {
      let qty = parseInt(qtyInput.value);
      qtyInput.value = qty + 1;
    });
    
    // Обработчик для кнопки "В корзину"
    const addBtn = modalContent.querySelector('.add-btn');
    addBtn.addEventListener('click', () => {
      const qty = parseInt(qtyInput.value);
      addToCart(product.id, qty);
      modal.style.display = 'none';
    });
  }
  
  // Добавление товара в корзину
  function addToCart(productId, quantity) {
    // Здесь будет логика добавления товара в корзину
    console.log(`Добавлено в корзину: продукт ID ${productId}, количество: ${quantity}`);
    
    // Можно добавить анимацию или уведомление
    showNotification(`Товар добавлен в корзину!`);
  }
  
  // Показать уведомление
  function showNotification(message) {
    // Проверяем, существует ли уже элемент уведомления
    let notification = document.querySelector('.notification');
    
    if (!notification) {
      // Создаем элемент уведомления, если его нет
      notification = document.createElement('div');
      notification.className = 'notification';
      document.body.appendChild(notification);
      
      // Добавляем стили для уведомления
      const style = document.createElement('style');
      style.textContent = `
        .notification {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background-color: #e63946;
          color: white;
          padding: 12px 20px;
          border-radius: 4px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          z-index: 1000;
          transform: translateY(100px);
          opacity: 0;
          transition: transform 0.3s, opacity 0.3s;
        }
        .notification.show {
          transform: translateY(0);
          opacity: 1;
        }
      `;
      document.head.appendChild(style);
    }
    
    // Устанавливаем текст сообщения
    notification.textContent = message;
    
    // Показываем уведомление
    notification.classList.add('show');
    
    // Скрываем уведомление через 3 секунды
    setTimeout(() => {
      notification.classList.remove('show');
    }, 3000);
  }
  
  // Инициализация страницы меню
  function initMenuPage() {
    // Создание модального окна, если его нет
    if (!document.querySelector('.modal')) {
      const modal = document.createElement('div');
      modal.className = 'modal';
      modal.innerHTML = '<div class="modal-content"></div>';
      document.body.appendChild(modal);
    }
    
    // Добавление обработчиков для кнопок категорий
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Удаление активного класса у всех кнопок
        categoryBtns.forEach(b => b.classList.remove('active'));
        // Добавление активного класса к нажатой кнопке
        btn.classList.add('active');
        // Отображение продуктов выбранной категории
        displayProducts(btn.dataset.category);
      });
    });
    
    // Отображение всех продуктов при загрузке страницы
    displayProducts();
  }
  
  // Инициализация при загрузке документа
  document.addEventListener('DOMContentLoaded', () => {
    // Если мы на странице меню
    if (document.querySelector('.products-grid')) {
      initMenuPage();
    }
  });