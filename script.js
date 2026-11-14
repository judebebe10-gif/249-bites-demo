
document.addEventListener('DOMContentLoaded', () => {

  // MENU FILTERS
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.menu-card');
  const count = document.getElementById('menu-count');

  buttons.forEach(button => {
    button.type = 'button';

    button.addEventListener('click', () => {
      const category = button.dataset.filter;
      let visible = 0;

      buttons.forEach(btn => {
        btn.classList.toggle('active', btn === button);
      });

      cards.forEach(card => {
        const name = card.querySelector('h3')
          ?.textContent.trim().toLowerCase();

        const show = category === 'all' || name === category;
        card.hidden = !show;

        if (show) visible++;
      });

      if (count) {
        count.textContent = category === 'all'
          ? 'Showing all menu items'
          : `Showing ${visible} ${category} item${visible === 1 ? '' : 's'}`;
      }
    });
  });

  // DEMO ORDER CART
  const cart = {};
  const cartItems = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const clearButton = document.getElementById('clear-cart');

  function renderCart() {
    cartItems.innerHTML = '';

    const names = Object.keys(cart);
    const total = names.reduce((sum, name) => sum + cart[name], 0);

    if (names.length === 0) {
      cartItems.innerHTML =
        '<p class="empty-cart">Your order is empty for now.</p>';
    }

    names.forEach(name => {
      const row = document.createElement('div');
      row.className = 'cart-item';

      const title = document.createElement('strong');
      title.textContent = name;

      const controls = document.createElement('div');
      controls.className = 'quantity-controls';

      const minus = document.createElement('button');
      minus.type = 'button';
      minus.textContent = '−';
      minus.setAttribute('aria-label', `Remove one ${name}`);
      minus.addEventListener('click', () => {
        cart[name]--;
        if (cart[name] <= 0) delete cart[name];
        renderCart();
      });

      const quantity = document.createElement('span');
      quantity.textContent = cart[name];

      const plus = document.createElement('button');
      plus.type = 'button';
      plus.textContent = '+';
      plus.setAttribute('aria-label', `Add one ${name}`);
      plus.addEventListener('click', () => {
        cart[name]++;
        renderCart();
      });

      controls.append(minus, quantity, plus);
      row.append(title, controls);
      cartItems.appendChild(row);
    });

    cartCount.textContent =
      `${total} item${total === 1 ? '' : 's'} selected`;
  }

  document.querySelectorAll('.add-to-order').forEach(button => {
    button.addEventListener('click', () => {
      const name = button.dataset.item;
      cart[name] = (cart[name] || 0) + 1;
      renderCart();

      button.textContent = 'Added ✓';
      setTimeout(() => {
        button.textContent = 'Add to order +';
      }, 1000);
    });
  });

  clearButton?.addEventListener('click', () => {
    Object.keys(cart).forEach(name => delete cart[name]);
    renderCart();
  });

  renderCart();

  // DEMO CHECKOUT
  const checkoutForm = document.getElementById('checkout-form');

  checkoutForm?.addEventListener('submit', event => {
    event.preventDefault();

    const selectedItems = Object.entries(cart)
      .map(([name, quantity]) => `${name} x ${quantity}`)
      .join(', ');

    if (!selectedItems) {
      alert('Please add at least one item to your order first.');
      return;
    }

    const customerName =
      document.getElementById('customer-name').value.trim();

    alert(
      `Demo order preview\n\nCustomer: ${customerName}\nItems: ${selectedItems}\n\nThis is a demonstration. Your order has not been sent.`
    );
  });

});
