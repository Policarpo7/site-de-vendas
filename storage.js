class Storage {
  static getCart() {
    return localStorage.getItem('cart')
        ? JSON.parse(localStorage.getItem('cart'))
        : [];
  }

  static addToCart(item) {
    const cart = this.getCart();
    const existingItem = cart.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  }

  static removeFromCart(itemId) {
    const cart = this.getCart();
    const updatedCart = cart.filter(cartItem => cartItem.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }

  static updateItemQuantity(itemId, newQuantity) {
    const cart = this.getCart();
    const cartItem = cart.find(item => item.id === itemId);

    if (cartItem) {
      cartItem.quantity = newQuantity;
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }
}
