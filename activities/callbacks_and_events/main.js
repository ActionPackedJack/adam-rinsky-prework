const myFunction = function(event) {
  console.log('Hooray!!')
}

// Use `document.querySelector()` to obtain a reference to the `#test` element.
const test = document.querySelector('#test');
test.addEventListener("mouseenter", function(event){
  myFunction();
})
// Add an event listener that triggers `myFunction` when the mouse enters the `#test` element.
