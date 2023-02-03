console.log("Stockroom");

let containerElement = document.getElementById('storeFront')

const getData = async () => {
    // parse data from the database
    let data = await fetch("/get_products");
    data.json().then((parsedData) => {
        console.log(parsedData); 
        // loop through the data and create tags for each product
        for (let i = 0; i < parsedData.length; i++) {
            let div = document.createElement("div");
            let img = document.createElement("img");
            let p = document.createElement("p");
            let h4 = document.createElement("h4");
            h4.textContent = parsedData[i].product;
            p.textContent = `Price: $${parsedData[i].price}`;
            img.src = parsedData[i].imgUrl;
            containerElement.appendChild(div);
            div.appendChild(h4);
            div.appendChild(img);
            div.appendChild(p);
            div.classList = "product";
            img.setAttribute("id", `img${i}`);
            // add click event to each image
            let imgTag = document.getElementById(`img${i}`);
            imgTag.addEventListener("click", () => {
                console.log(parsedData[i]._id)
                window.location.href = `/single_prod?id=${parsedData[i]._id}`
            }) 
        }
        
                  
        })
}

let addStockbtn = document.getElementById("add-new");
addStockbtn.addEventListener("click", () => {
    window.location.href = "/create_prod";
})

getData();