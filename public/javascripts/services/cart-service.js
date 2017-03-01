angular.module('app')
  .factory('CartService', CartService);

CartService.$inject = ['UserService'];

function CartService(UserService) {
  var service = {
    removeItem,
    clearCart,
    addItem,
    getCart,
    decreaseItem
  };

  function removeItem(item) {
    var cart = getCart();
    var itemIdx = cart.findIndex(i => i._id === item._id);
    if(itemIdx != -1) {
       cart.splice(itemIdx, 1);
    }
    updateCart(cart);
    return cart;
  }

  function clearCart() {
    var key = getCartKey();
    localStorage.removeItem(key);
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

    function decreaseItem(item) {
    var cart = getCart();
    var existingItem = cart.find(i => i._id === item._id);
    if(existingItem && existingItem.qty > 1) {
      existingItem.qty--;
    }else if(existingItem && existingItem.qty >= 1) {
      cart.splice(existingItem, 1);
    }else{
      console.log('nothing');
    }
    updateCart(cart);
    console.log(cart);
    return cart;
  }

  // function getTotal() {
  //   var total = 0;
  //   var cart = getCart();
  //   for(var i = 0; i < cart.length; i++){
  //       var product = cart[i];
  //       total += (product.price * product.qty);
  //   }
  //   return total;
  // }

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
