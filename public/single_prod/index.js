console.log("js running");

// get the id from the URL
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
let id = params.id; 

console.log(id);

let searchButton = document.getElementById("search-button");
let searchInput = document.getElementById("product-search");

searchButton.addEventListener("click", async () => {
    console.log("search button clicked");
    
    let searchValue = searchInput.value;
    console.log(searchValue);
    let response = await fetch(`/search_product/?product=${searchValue}`);
    console.log(response);
    let finalData = await response.json();
    console.log(finalData);
    console.log(finalData._id)
    if (finalData._id === undefined) {
        alert("Product not found");
    }else {
        window.location.href = `/single_prod/?id=${finalData._id}`;
    }
  
});
    
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
    let deleteButton = document.getElementById("delete-button");
    let quantity = document.getElementById("amt-in-stock");
    let buyButton = document.getElementById("buy-button");
    
    deleteButton.addEventListener("click", async () => {
        let result = confirm("Want to delete?");
        if (result) {
            let response = await fetch(`http://localhost:5000/delete_product/?id=${id}`, {
                method: "DELETE"
            })
            if (response.status === 200) {
                console.log("delete successful");
                window.location.href = "../index.html";
            } else {
                console.log("delete failed");
            }
        }    
    })
    const disableButttonCheck = () => {
        if (finalData.productAmt === 0) {
            buyButton.disabled = true;
            quantity.textContent = "Out of Stock";
            return;
        }  
    }
    disableButttonCheck();
   
    buyButton.addEventListener("click", async () => {
        let response = await fetch(`http://localhost:5000/update_product/?id=${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({productAmt: finalData.productAmt -= 1})
        })
        if (response.status === 200) {
            // finalData.productAmt -= 1;
            console.log("purchase successful");
            quantity.innerHTML = `Quantity: ${finalData.productAmt}`;
            console.log(finalData.productAmt)
        } else {
            console.log("purchase failed");
        }   
        disableButttonCheck();  
    })
}


getSingleProd();


homeButton.addEventListener("click", () => {
    window.location.href = "../index.html";
});


 
