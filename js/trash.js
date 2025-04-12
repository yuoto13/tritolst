// Объект для хранения данных о продуктах
const products = {
    1: { id: 1, name: 'Пепперони', price: 599, image: 'images/peperoni.avif', description: 'Классическая пицца с томатным соусом, сыром и пепперони' },
    2: { id: 2, name: 'Четыре сыра', price: 649, image: '/api/placeholder/400/300', description: 'Пицца с сырами: моцарелла, горгонзола, пармезан и рикотта' },
    3: { id: 3, name: 'Маргарита', price: 549, image: '/api/placeholder/400/300', description: 'Традиционная пицца с томатным соусом, моцареллой и базиликом' },
    4: { id: 4, name: 'Гавайская', price: 599, image: '/api/placeholder/400/300', description: 'Пицца с ветчиной и ананасами' },
    5: { id: 5, name: 'Филадельфия', price: 449, image: '/api/placeholder/400/300', description: 'Классический ролл с лососем и сыром' },
    6: { id: 6, name: 'Калифорния', price: 399, image: '/api/placeholder/400/300', description: 'Ролл с крабовым мясом, авокадо и огурцом' },
    7: { id: 7, name: 'Дракон', price: 499, image: '/api/placeholder/400/300', description: 'Ролл с угрём, огурцом и авокадо' },
    8: { id: 8, name: 'Семейный сет', price: 1699, image: '/api/placeholder/400/300', description: 'Большой набор пиццы и роллов для всей семьи' },
    9: { id: 9, name: 'Суши-сет', price: 1299, image: '/api/placeholder/400/300', description: 'Набор из популярных роллов и суши' }
  };
  
  // Создаем класс Cart для работы с корзиной
  class Cart {
    constructor() {
      this.items = {};
      this.total = 0;
      this.count = 0;
      this.init();
    }
  
    // Инициализация корзины
    init() {
      // Создаем элементы корзины
      this.createCartElements();
      
      // Загружаем корзину из localStorage если она там есть
      this.loadFromLocalStorage();
      
      // Обновляем отображение корзины
      this.updateCartDisplay();
      
      // Навешиваем обработчики событий
      this.setupEventListeners();
    }
  
    // Создание элементов корзины
    createCartElements() {
      // Создаем контейнер корзины
      const cartContainer = document.createElement('div');
      cartContainer.className = 'cart-container';
      
      // Создаем оверлей (затемнение заднего фона)
      const cartOverlay = document.createElement('div');
      cartOverlay.className = 'cart-overlay';
      
      // Формируем HTML структуру корзины
      cartContainer.innerHTML = `
        <div class="cart-header">
          <h2>Корзина</h2>
          <button class="cart-close">&times;</button>
        </div>
        <div class="cart-items">
          <div class="cart-empty">Корзина пуста</div>
        </div>
        <div class="cart-footer">
          <div class="cart-total">
            <span class="cart-total-label">Итого:</span>
            <span class="cart-total-value">0 ₽</span>
          </div>
          <button class="cart-checkout">Оформить заказ</button>
        </div>
      `;
      
      // Добавляем элементы на страницу
      document.body.appendChild(cartOverlay);
      document.body.appendChild(cartContainer);
      
      // Обновляем иконку корзины в навигации
      const navCartLink = document.querySelector('header nav a[href="#"]');
      if (navCartLink) {
        navCartLink.innerHTML = `
          <span class="cart-icon">Корзина <span class="cart-count">0</span></span>
        `;
        navCartLink.href = 'javascript:void(0)';
      }
    }
  
    // Настройка обработчиков событий
    setupEventListeners() {
      // Открытие корзины при клике на ссылку корзины
      const cartLink = document.querySelector('header nav a[href="javascript:void(0)"]');
      if (cartLink) {
        cartLink.addEventListener('click', () => this.openCart());
      }
      
      // Закрытие корзины при клике на кнопку закрытия
      const closeBtn = document.querySelector('.cart-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => this.closeCart());
      }
      
      // Закрытие корзины при клике на оверлей
      const overlay = document.querySelector('.cart-overlay');
      if (overlay) {
        overlay.addEventListener('click', () => this.closeCart());
      }
      
      // Обработка клика на кнопку "Оформить заказ"
      const checkoutBtn = document.querySelector('.cart-checkout');
      if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => this.checkout());
      }
    }
  
    // Открытие корзины
    openCart() {
      document.querySelector('.cart-container').classList.add('open');
      document.querySelector('.cart-overlay').classList.add('open');
      document.body.style.overflow = 'hidden'; // Предотвращаем скролл страницы
    }
  
    // Закрытие корзины
    closeCart() {
      document.querySelector('.cart-container').classList.remove('open');
      document.querySelector('.cart-overlay').classList.remove('open');
      document.body.style.overflow = ''; // Разрешаем скролл страницы
    }
  
    // Добавление товара в корзину
    addItem(productId, quantity = 1) {
      const product = products[productId];
      if (!product) return;
      
      if (this.items[productId]) {
        this.items[productId].quantity += quantity;
      } else {
        this.items[productId] = {
          product,
          quantity
        };
      }
      
      this.updateCartData();
      this.updateCartDisplay();
      this.saveToLocalStorage();
      this.animateCartIcon();
    }
  
    // Удаление товара из корзины
    removeItem(productId) {
      if (this.items[productId]) {
        delete this.items[productId];
        this.updateCartData();
        this.updateCartDisplay();
        this.saveToLocalStorage();
      }
    }
  
    // Изменение количества товара
    updateQuantity(productId, quantity) {
      if (!this.items[productId]) return;
      
      if (quantity <= 0) {
        this.removeItem(productId);
      } else {
        this.items[productId].quantity = quantity;
        this.updateCartData();
        this.updateCartDisplay();
        this.saveToLocalStorage();
      }
    }
  
    // Обновление данных корзины (итоговая сумма и количество)
    updateCartData() {
      this.total = 0;
      this.count = 0;
      
      for (const id in this.items) {
        const item = this.items[id];
        this.total += item.product.price * item.quantity;
        this.count += item.quantity;
      }
    }
  
    // Обновление отображения корзины
    updateCartDisplay() {
      // Обновляем счетчик товаров в иконке корзины
      const cartCount = document.querySelector('.cart-count');
      if (cartCount) {
        cartCount.textContent = this.count;
      }
      
      // Обновляем список товаров в корзине
      const cartItemsContainer = document.querySelector('.cart-items');
      if (!cartItemsContainer) return;
      
      // Если корзина пуста
      if (this.count === 0) {
        cartItemsContainer.innerHTML = '<div class="cart-empty">Корзина пуста</div>';
        return;
      }
      
      // Формируем список товаров
      let itemsHTML = '';
      for (const id in this.items) {
        const item = this.items[id];
        const subtotal = item.product.price * item.quantity;
        
        itemsHTML += `
          <div class="cart-item" data-id="${item.product.id}">
            <img src="${item.product.image}" alt="${item.product.name}" class="cart-item-image">
            <div class="cart-item-details">
              <h4 class="cart-item-title">${item.product.name}</h4>
              <p class="cart-item-price">${item.product.price} ₽ × ${item.quantity} = ${subtotal} ₽</p>
              <div class="cart-item-controls">
                <div class="cart-item-quantity">
                  <button class="cart-qty-btn cart-qty-minus" data-id="${item.product.id}">-</button>
                  <input type="text" class="cart-qty-value" value="${item.quantity}" readonly>
                  <button class="cart-qty-btn cart-qty-plus" data-id="${item.product.id}">+</button>
                </div>
                <button class="cart-item-remove" data-id="${item.product.id}">Удалить</button>
              </div>
            </div>
          </div>
        `;
      }
      
      cartItemsContainer.innerHTML = itemsHTML;
      
      // Обновляем итоговую сумму
      const totalValue = document.querySelector('.cart-total-value');
      if (totalValue) {
        totalValue.textContent = `${this.total} ₽`;
      }
      
      // Навешиваем обработчики событий на элементы управления
      this.setupCartItemsEvents();
    }
  
    // Настройка обработчиков событий для элементов корзины
    setupCartItemsEvents() {
      // Обработчики для кнопок увеличения/уменьшения количества
      const minusBtns = document.querySelectorAll('.cart-qty-minus');
      const plusBtns = document.querySelectorAll('.cart-qty-plus');
      const removeBtns = document.querySelectorAll('.cart-item-remove');
      
      minusBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const id = parseInt(btn.getAttribute('data-id'));
          const currentQty = this.items[id].quantity;
          this.updateQuantity(id, currentQty - 1);
        });
      });
      
      plusBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const id = parseInt(btn.getAttribute('data-id'));
          const currentQty = this.items[id].quantity;
          this.updateQuantity(id, currentQty + 1);
        });
      });
      
      removeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const id = parseInt(btn.getAttribute('data-id'));
          this.removeItem(id);
        });
      });
    }
  
    // Анимация иконки корзины при добавлении товара
    animateCartIcon() {
      const cartIcon = document.querySelector('.cart-icon');
      if (cartIcon) {
        cartIcon.classList.remove('cart-bounce');
        // Триггер для перезапуска анимации
        void cartIcon.offsetWidth;
        cartIcon.classList.add('cart-bounce');
      }
    }
  
    // Сохранение корзины в localStorage
    saveToLocalStorage() {
      const cartData = {
        items: this.items,
        total: this.total,
        count: this.count
      };
      localStorage.setItem('cart', JSON.stringify(cartData));
    }
  
    // Загрузка корзины из localStorage
    loadFromLocalStorage() {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const cartData = JSON.parse(savedCart);
        this.items = cartData.items;
        this.total = cartData.total;
        this.count = cartData.count;
      }
    }
  
    // Очистка корзины
    clearCart() {
      this.items = {};
      this.updateCartData();
      this.updateCartDisplay();
      this.saveToLocalStorage();
    }
  
    // Оформление заказа
    checkout() {
      // Здесь будет логика оформления заказа
      alert('Спасибо за заказ! Общая сумма: ' + this.total + ' ₽');
      this.clearCart();
      this.closeCart();
    }
  }
  
  // Функция для добавления товара в корзину (будет вызываться из HTML)
  function addToCart(productId, quantity = 1) {
    window.cart.addItem(productId, quantity);
  }
  
  // Инициализация корзины при загрузке страницы
  document.addEventListener('DOMContentLoaded', () => {
    // Создаем экземпляр корзины и сохраняем его в глобальной переменной
    window.cart = new Cart();
    
    // Инициализация модальных окон для товаров (если они есть на странице)
    initProductModals();
  });
  
  // Инициализация модальных окон товаров
  function initProductModals() {
    // Предполагаем, что в HTML есть карточки товаров и модальное окно
    const productCards = document.querySelectorAll('.product-card');
    const modal = document.querySelector('.modal');
    const modalContent = document.querySelector('.modal-content');
    
    if (!modal || !modalContent) return;
    
    // Открытие модального окна при клике на карточку товара
    productCards.forEach(card => {
      card.addEventListener('click', event => {
        // Если клик был на кнопке добавления в корзину, не открываем модальное окно
        if (event.target.classList.contains('add-to-cart')) return;
        
        const productId = parseInt(card.getAttribute('data-id'));
        const product = products[productId];
        
        if (!product) return;
        
        // Формируем содержимое модального окна
        modalContent.innerHTML = `
          <div class="modal-header">
            <h2>${product.name}</h2>
            <span class="modal-close">&times;</span>
          </div>
          <div class="modal-body">
            <div class="modal-image">
              <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="modal-details">
              <p class="modal-description">${product.description}</p>
              <div class="modal-ingredients">
                <h4>Состав:</h4>
                <ul class="ingredients-list">
                  <li>Ингредиент 1</li>
                  <li>Ингредиент 2</li>
                  <li>Ингредиент 3</li>
                </ul>
              </div>
              <div class="modal-price">${product.price} ₽</div>
              <div class="modal-actions">
                <div class="quantity">
                  <button class="qty-btn qty-minus">-</button>
                  <input type="text" class="qty-value" value="1" readonly>
                  <button class="qty-btn qty-plus">+</button>
                </div>
                <button class="add-btn" data-id="${product.id}">В корзину</button>
              </div>
            </div>
          </div>
        `;
        
        // Показываем модальное окно
        modal.style.display = 'block';
        
        // Настраиваем обработчики событий
        const closeBtn = modalContent.querySelector('.modal-close');
        const qtyMinus = modalContent.querySelector('.qty-minus');
        const qtyPlus = modalContent.querySelector('.qty-plus');
        const qtyInput = modalContent.querySelector('.qty-value');
        const addBtn = modalContent.querySelector('.add-btn');
        
        // Закрытие модального окна
        closeBtn.addEventListener('click', () => {
          modal.style.display = 'none';
        });
        
        // Закрытие модального окна при клике вне его содержимого
        modal.addEventListener('click', event => {
          if (event.target === modal) {
            modal.style.display = 'none';
          }
        });
        
        // Уменьшение количества
        qtyMinus.addEventListener('click', () => {
          let qty = parseInt(qtyInput.value);
          if (qty > 1) {
            qtyInput.value = qty - 1;
          }
        });
        
        // Увеличение количества
        qtyPlus.addEventListener('click', () => {
          let qty = parseInt(qtyInput.value);
          qtyInput.value = qty + 1;
        });
        
        // Добавление в корзину
        addBtn.addEventListener('click', () => {
          const productId = parseInt(addBtn.getAttribute('data-id'));
          const quantity = parseInt(qtyInput.value);
          addToCart(productId, quantity);
          modal.style.display = 'none';
        });
      });
    });
  }