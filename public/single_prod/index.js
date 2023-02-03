console.log("js running");

// get the id from the URL
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
let id = params.id; 

console.log(id);

let container = document.getElementById("product-info")

// use that ID to get info from collection
const getSingleProd = async () => {
    let response = await fetch(`http://localhost:5000/get_specific_product/${id}`);
    
    let finalData = await response.json();
// use this finalData to make some tags, etc.
    console.log(finalData);
//build the HTML and place data in it
    container.innerHTML = `
    <div class="single-product">
        <h1>${finalData.product}</h1>
        <img src="${finalData.imgUrl}">
        <p>${finalData.description}</p>
        <p>Price: ${finalData.price}</p>
        <p id="amt-in-stock">Quantity: ${finalData.productAmt}</p>
        <button id="buy-button">BUY NOW!</button>
        <a href="/edit_prod?id=${id}">Edit this produdct</a>
    </div>
    <div id="delete-div">
        <button id="delete-button">DELETE</button>
    </div>
    `
}


getSingleProd();


homeButton.addEventListener("click", () => {
    window.location.href = "../index.html";
});
 

