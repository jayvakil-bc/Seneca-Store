module.exports.getAllProducts = function() {
  return new Promise(function(resolve, reject) {
      fetch('https://fakestoreapi.com/products')
          .then(response => {
              if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json();
          })
          .then(data => resolve(data))
          .catch(error => reject(error));
  });
};
