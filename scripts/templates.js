function offerTemplate(title, myArray, image) {
    let staticContent = `
        <div class="selection-img">
            <img src=${image} alt= "offer-image">
        </div>
        <div class="meal-headline">
            <h2>${title}</h2>
        </div>
    `;

    for (let i = 0; i < myArray.length; i++) {
        let indexArray = myArray[i];

        staticContent += `
        <div class="order-section">
            <div class="meal-details">
                <p class="name">${indexArray.name}</p>
                <p class="description">${indexArray.description}</p>
            </div>
            <div class="price-section">
            <p>${indexArray.price.toFixed(2)}</p><button onclick="decreaseAmount(${i})"><img id=minus-button src="./assets/icons/minus.png"></button><button onclick="addToBasket('${indexArray.name}', ${indexArray.price})","addToFinish('${indexArray.name}', ${indexArray.price})"><img id=plus-button src="./assets/icons/plus.png"></button>
            </div>
        </div>
        `;   
    }
    return staticContent;
}

function basketTemplate(item, index) {
    return `
    <div id="basket-order">
        <div id="basket-order-name">
        <h3>${item.name}</h3>
        </div>
        <div class="order-detail">
            <button class="button-down" onclick="decreaseAmount(${index})">-</button>
            <p class="basket-amount">${item.amount}</p>
            <button class="button-up" onclick="increaseAmount(${index})">+</button>
            <p>x</p>
            <p class="basket-price"> ${item.price.toFixed(2)} €</p> 
        </div>  
        <div class="basket-button-total">
            <p class="basket-total">= ${(item.price * item.amount).toFixed(2)} €</p>
            <button class="button-delete" onclick="deleteItem(${index})"><img class="trashcan" src="./assets/icons/bin.png" alt=""></button>
        </div>
    </div>
    `
}

function finishTemplate(item, index) {
    return `
    <div id="finish-order">
        <div id="finish-order-name">
            <div id="finish-order-details">    
                <button onclick="increaseAmount(${index})">+</button>
                <button onclick="decreaseAmount(${index})">-</button>
                <p>${item.amount} x</p>
                <h3>${item.name}</h3>
            </div>
                <p id="is-the-same"> =</p>
                <p>${(item.price * item.amount).toFixed(2)} €</p>
        </div>
    </div>
    `
}