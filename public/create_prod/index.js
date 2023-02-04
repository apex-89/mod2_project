console.log("js file connected");

let submitButton = document.getElementById('submit-button');

submitButton.addEventListener('click', async () => {


    let productString = document.getElementById('name-input').value;
    let urlString = document.getElementById('img-input').value;
    let descriptionString = document.getElementById('description-input').value;
    let priceNumber = +document.getElementById('price-input').value;
    let inventoryNumber = +document.getElementById('quantity-input').value;

    const item = {
        productString, 
        urlString, 
        descriptionString,
        priceNumber, 
        inventoryNumber
    }

    let response = await fetch('http://localhost:5000/create_product', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
    })

    let uploadStatusTag = document.getElementById('upload-status');
        console.log(response.status);
        if (response.status === 200) {
            console.log(response);
            console.log("upload complete!!!");
            uploadStatusTag.textContent = "Upload Completed";
            uploadStatusTag.style.color = "green";

        } else {
            console.log(response);
            console.log("upload failed");
            console.log;
            uploadStatusTag.textContent = "Upload Failed";
            uploadStatusTag.style.color = "red";
        }
        setTimeout(() => {
            window.location.reload();
        }, 750);
});


