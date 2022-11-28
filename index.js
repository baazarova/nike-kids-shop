let data = [
  {
    id: 1,
    img: "./img/brown.webp",
    name: "Nike Kids Wear",
    price: 75,
    count: 15,
  },
  {
    id: 2,
    img: "./img/green.webp",
    name: "Nike Kids Wear",
    price: 65,
    count: 12,
  },
  {
    id: 3,
    img: "./img/orange.webp",
    name: "Nike Kids Wear",
    price: 70,
    count: 14,
  },
];

let proList = document.querySelector(".products__list");
let basList = document.querySelector(".basket__list");
let basketArr = [];

let elPrice = document.querySelector('.total__price');

let totalPrice = ()=> {
  let price = basketArr.reduce((a,b)=> a + b.total, 0);
  elPrice.textContent = `${price} $`
  
}



function renderProduct(item) {
    proList.innerHTML = '';
  for (let i of item) {
    if (i.count > 0) {
      let item = document.createElement("li");
      item.className = "products__item";
      item.innerHTML = `
            <div class="products__img-div">
            <img class="img" src="${i.img}" alt="brown-nike" />
          </div>
          <div class="products__content-div">
            <h2 class="products__title">${i.name}</h2>
            <p class="products__price">${i.price} $</p>
            <button id="${i.id}" class="plus">+</button>
            <span class="products__count">${i.count}</span>
            <button id="${i.id}" class="minus">-</button>
          </div>
            `;
            proList.append(item);
    }
  }
}

renderProduct(data);


function renderBasket(item) {
  totalPrice();
    basList.innerHTML = '';
    for (let i of item) {
      if (i.count > 0) {
        let item = document.createElement("li");
        item.className = "products__item";
        item.innerHTML = `
              <div class="products__img-div">
              <img class="img" src="${i.img}" alt="brown-nike" />
            </div>
            <div class="products__content-div">
              <h2 class="products__title">${i.name}</h2>
              <p class="products__price">${i.total} $</p>
              <button id="${i.id}" class="plus">+</button>
              <span class="products__count">${i.count}</span>
              <button id="${i.id}" class="minus">-</button>
            </div>
              `;
              basList.append(item);
      }
    }
  }
  

proList.addEventListener('click', (e) => {
    if(e.target.className === 'plus'){
        for(let i of data){
            if(i.id === Number(e.target.id)){
                i.count -= 1;
                let obj = basketArr.some((l) => l.id == e.target.id);
                if(!obj){
                    basketArr.push({...i,total:i.price,count:1});
                }
                else{
                    for(let j of basketArr){
                        if(e.target.id == j.id){
                            j.count += 1;
                            j.total = j.price * j.count;
                        }
                    }
                }
            }
        }
       
    }
    if(e.target.className === 'minus'){
        for(let i of basketArr){
            if(e.target.id == i.id && i.count > 0){
                i.count -= 1;
                i.total = i.price * i.count;
                for(let a of data){
                    if(a.id == e.target.id){
                        a.count += 1;
                    }
                }
            }

        }
    
    }
    renderBasket(basketArr);
    renderProduct(data);
    
})

