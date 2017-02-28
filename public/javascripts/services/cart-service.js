angular.module('app')
  .factory('CartService', CartService);

CartService.$inject = ['UserService'];

function CartService(UserService) {
  var service = {
    removeItem,
    clearCart,
    addItem,
    getCart,
    changeItemQty
  };

  function removeItem(item) {
    var cart = getCart();
    var itemIdx = cart.findIndex(i => i._id === item._id);
    if(itemIdx != -1) {
      cart.splice(itemIdx, 1);
      // item.qty--;
    };
    updateCart(cart);
    console.log(cart);
    return cart;
  }

  function changeItemQty(item, newQty) {
    var cart = getCart();
    var existingItem = cart.find(i => i._id === item._id);
    if(existingItem) {
      existingItem.qty = newQty;
    };
    updateCart(cart);
    return cart;
  }

  function clearCart() {
  }

  function addItem(item) {
    var cart = getCart();
    var existingItem = cart.find(i => i._id === item._id);
    if(existingItem) {
      existingItem.qty++;
    } else {
      item.qty = 1;
      cart.push(item);
    }
    updateCart(cart);
    console.log(cart);
    return cart;
  }

  function getCart() {
    var key = getCartKey();
    var cart = localStorage.getItem(key);
    if (cart) {
      return JSON.parse(cart);
    } else {
      localStorage.setItem(key, JSON.stringify([]));
      return [];
    }
  }


  // Helper Functions
  function getCartKey() {
    var user = UserService.getUser();
    return user ? "cart:" + user._id : "cart:anonymous";
  }
  function updateCart(cart) {
    var key = getCartKey();
    localStorage.setItem(key, JSON.stringify(cart));
  }
  return service;
}
