console.log("js running");

let homeButton = document.getElementById('homeButton');

homeButton.addEventListener('click', () => {
    window.location.href = "../index.html";
})

// get the id from the URL
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

let id = params.id; 

const nameInput = document.getElementById('name-input');
const imgInput = document.getElementById('img-input');
const descriptionInput = document.getElementById('description-input');
const priceInput = document.getElementById('price-input');
const quantityInput = document.getElementById('quantity-input');

const putPlaceholder = async () => { // SHOULD CHANGE THE FUNCTION NAME
    let response = await fetch(`http://localhost:5000/get_specific_product/${id}`);
    
    let finalData = await response.json();
    // use this finalData to make some tags, etc.
    //build the HTML and place data in it
    nameInput.setAttribute('value', `${finalData.product}`)
    imgInput.setAttribute('value', `${finalData.imgUrl}`)
    descriptionInput.value=('value', `${finalData.description}`)
    priceInput.setAttribute('value', `${finalData.price}`)
    quantityInput.setAttribute('value', `${finalData.productAmt}`)
    
    // button to update the product
    let updateButton = document.getElementById("update-button");
    updateButton.addEventListener("click", async () => {
        let product = nameInput.value;
        let imgUrl = imgInput.value;
        let description = descriptionInput.value;
        let price = +priceInput.value;
        let productAmt = +quantityInput.value;
    
        const item = {
            product, 
            imgUrl, 
            description,
            price, 
            productAmt
        }

        let response = await fetch(`http://localhost:5000/update_product/?id=${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(item)
        })
        
        
        if (response.status === 200) {
            console.log("update successful");
            window.location.href = "../index.html";
        } else {
            console.log("update failed");
        }
    })
}

putPlaceholder();