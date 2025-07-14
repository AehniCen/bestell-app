function renderAll() {
    renderBasket();
    renderOffer();
    renderFinish();
}

function renderOffer() {
    let ripsRef = document.getElementById('rips-section');
    let burgerRef = document.getElementById('burger-section');
    let steakRef = document.getElementById('steak-section');
    let supplRef = document.getElementById('suppl-section');
    let dipsRef = document.getElementById('dips-section');

    ripsRef.innerHTML += offerTemplate('Spare Rips', myRips, './assets/img/spare-ribs_640.jpg')
    burgerRef.innerHTML += offerTemplate('Burger', myBurger, './assets/img/burger_640.jpg')
    steakRef.innerHTML += offerTemplate('Steaks', mySteak, './assets/img/steak_640.jpg')
    supplRef.innerHTML += offerTemplate('Beilagen', mySuppl, './assets/img/fries_640.jpg')
    dipsRef.innerHTML += offerTemplate('Dips', myDip, './assets/img/sauce_640.jpg')
}

function toggleBasketOverlay() {
    let orderOverlay = document.getElementById('order-section');

    if (orderOverlay.style.display === 'none' || orderOverlay.style.display === '') {
        orderOverlay.style.display = 'block';
    } else {
        orderOverlay.style.display = 'none';
    }
}

function toggleOverlay() {
    let basketOverlay = document.getElementById('basket-section');
    const overlay = document.getElementById('order-overlay-section');
    if (overlay.style.display === 'none' || overlay.style.display === '') {
      overlay.style.display = 'flex';
    } else {
      overlay.style.display = 'none';

      if (paymentDone) {
            myBasket = [];
            renderFinish();
            updateBasketAmount();
            basketOverlay.innerHTML= '<p id="empty-basket-line">Der Warenkorb ist leer.</p>';
            paymentDone = false; 
        }
    }
}

function renderBasket() {
    let basketOverlay = document.getElementById('basket-section');
    basketOverlay.innerHTML= '';

    if (myBasket.length === 0) {
        basketOverlay.innerHTML= '<p id="empty-basket-line">Der Warenkorb ist leer.</p>';
        return;
    }
    myBasket.forEach((item, index) => {
        basketOverlay.innerHTML += basketTemplate(item, index);
    });

    let total = myBasket.reduce((sum, item) => sum + item.price * item.amount, 0);
    basketOverlay.innerHTML += `<p id="p-total"><str>Gesamt: ${total.toFixed(2)} €</str></p><button class="complete-order" id="basket-button" onclick="toggleOverlay()">Bestellung<br>abschließen</button>` 
}

function addToBasket(name, price) {
    let item = myBasket.find(i => i.name === name);

    if (item) {
        item.amount++;
    } else {
        myBasket.push({
            name: name,
            price: price,
            amount: 1
        });
    }

    renderBasketFinish();
    updateBasketAmount();
}

function increaseAmount(index) {
    myBasket[index].amount ++;

    renderBasketFinish();
    updateBasketAmount();
}

function decreaseAmount(index) {
    if (myBasket[index].amount > 1) {
        myBasket[index].amount --;
    } else {
        myBasket.splice(index, 1);
    }

    renderBasketFinish();
    updateBasketAmount();
}

function deleteItem(index) {
   myBasket.splice(index, 1);

   renderBasketFinish();   
   updateBasketAmount();
}

function updateBasketAmount() {
    let amountCounterRef = document.getElementById("amount-counter");
    let countNumberRef = document.getElementById("count-number");
    let basketAmount = myBasket.reduce((sum, item) => sum + item.amount, 0);

    if (basketAmount === 0) {
        amountCounterRef.style.display = "none";
    } else {
        amountCounterRef.style.display = "flex";
        countNumberRef.innerText = basketAmount;
    }
}

function renderFinish() {
    let finishOverlay = document.getElementById('order-overlay-content');
    
    finishOverlay.innerHTML= '';

    if (myBasket.length === 0) {
        finishOverlay.innerHTML+= '<div id="order-overlay-empty"><p>Der Warenkorb ist leer.</p></div>';
        return;
    } 
    myBasket.forEach((item, index) => {
        finishOverlay.innerHTML += finishTemplate(item, index);
    });

    let total = myBasket.reduce((sum, item) => sum + item.price * item.amount, 0);
    finishOverlay.innerHTML += `<div id="finish-total-button"><p id="p-total-finish">Gesamt: ${total.toFixed(2)} €</p><button class="complete-order" id="finish-button" onclick="finishPayment()">Bestellen</button>`
}

function addToFinish(name, price) {
    let item = myBasket.find(i => i.name === name);
    if (item) {
        item.amount ++;
    } else {
        myBasket.push({
            name: name,
            price: price, 
            amount: 1
        });
    }

    renderBasketFinish();
}

function finishPayment() {
    let basketOverlay = document.getElementById('basket-section');
    let finishOverlay = document.getElementById('order-overlay-content');
    let amountCounterRef = document.getElementById("amount-counter");

    basketOverlay.innerHTML= '';
    finishOverlay.innerHTML= '';
    amountCounterRef.style.display = "none";

    finishOverlay.innerHTML= `
    <div id="finish-payment">
        <img id="success-gif" src="./assets/gifs/success-self.gif">
        <p>Bestellung erfolgreich</p>
    </div>
    `;

    paymentDone = true;
}

function renderBasketFinish() {
    renderBasket();
    renderFinish();
}