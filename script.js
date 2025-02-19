// VALIDAÇÃO DO FORMULÁRIO-HELP-ALGORITHM


let form_helpAlgorithm = document.querySelector('#form-helpAlgorithm')

form_helpAlgorithm.onsubmit = function(evento) {
  evento.preventDefault()

  temErro = false

  let inputNome = document.forms['form-helpAlgorithm']['nome']
  let inputEmail = document.forms['form-helpAlgorithm']['email']
  let inputCPF = document.forms['form-helpAlgorithm']['CPF']
  let inputGender = document.forms['form-helpAlgorithm']['genero']
  let genderError = document.querySelector('#genderError')

  if (!inputNome.value) {
    temErro = true
    inputNome.classList.add('inputError')

    inputNome.placeholder = " Digite o nome corretamente"

  } else {
    inputNome.classList.remove('inputError')

    inputNome.placeholder = ""
  }

  if (!inputEmail.checkValidity() | !inputEmail.value) {
    temErro = true
    inputEmail.classList.add('inputError')

    inputEmail.placeholder = " Digite um e-mail válido!"

  } else {
    inputEmail.classList.remove('inputError')

    inputEmail.placeholder = ""
  }

  if (!inputCPF.value | (inputCPF.value).length !== 11) {
    temErro = true
    inputCPF.classList.add('inputError')

    inputCPF.value = ''

    inputCPF.placeholder = " Digite um CPF válido!"

  } else {
    inputCPF.classList.remove('inputError')
    
    inputCPF.placeholder = ""
  }

  if (inputGender.value === "") {
    temErro = true

    genderError.innerText = "Selecione um gênero!"

  } else {
    genderError.innerText = ""
  }  

  if (!temErro) {
    form_helpAlgorithm.submit()
  }
}


// VALIDAÇÃO DO FORMULÁRIO-SHARE


let form_share = document.querySelector('#form-share') 

form_share.onsubmit = function(evento) {
  evento.preventDefault()

  temErro = false

  let inputNomeFriend = document.forms['form-share']['nameFriend']
  let inputEmailFriend = document.forms['form-share']['emailFriend']
  
  if (!inputNomeFriend.value) {
    temErro = true
    inputNomeFriend.classList.add('inputError')
  
    inputNomeFriend.placeholder = " Digite o nome corretamente"
  
  } else {
    inputNomeFriend.classList.remove('inputError')
  
    inputNomeFriend.placeholder = ""
  }
  
  if (!inputEmailFriend.checkValidity() | !inputEmailFriend.value) {
    temErro = true
    inputEmailFriend.classList.add('inputError')
  
    inputEmailFriend.placeholder = " Digite um e-mail válido!"
  
  } else {
    inputEmailFriend.classList.remove('inputError')
  
    inputEmailFriend.placeholder = ""
  }

  if (!temErro) {
    form_share.submit()
  }
}


// REQUISIÇÃO DA API E CARDS DOS PRODUTOS

let nextPage = null;

function requestApi() {
  const url = `https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1`
  
  const configs = {
    method: 'GET',
    headers: {}
  }

  fetch(url, configs)
  .then((response) => response.json())
  .then((data) => {
    displayProduct(data.products);
    nextPage = data.nextPage; 
  })
  .catch(displayError)
}

let productCard = document.querySelector('#productCard')

function displayProduct(products) {

  let htmlProducts = ''

  for (let product of products) {
    htmlProducts += `
      <div class="selectProducts-product"> 
        <div class="box-teste">
          <img src="${product.image}" alt="" class="selectProducts-product__img">
        </div>
        
        <div class="selectProducts-product__content">
          <div class="selectProducts-product__text">
            <span class="product-name">${product.name}</span>
            <span class="product-descrition">${product.description}</span>
          </div>
    
          <div class="selectProducts-product__prices">
            <span>De: ${product.oldPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            <span class="product-price">Por: ${product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            <span>ou ${product.installments.count}x de ${product.installments.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          </div>
    
          <button class="selectProducts-product__button">Comprar</button>
        </div>  
      </div>   
    `
  }
  productCard.innerHTML += htmlProducts
}

function displayError() {
  productCard.innerText = 'Ops, ocorreu erro na requisição da API...'
  console.log('Ops, ocorreu erro na requisição da API...')
}


// BUTTON "AINDA MAIS PRODUTOS AQUI!" FUNCIONAL


const moreProducts_button = document.querySelector('#moreProducts_button')

moreProducts_button.onclick = function () {
      
  let next_url = `https://${nextPage}`

  fetch(next_url)
    .then((response) => response.json())
    .then(data => {
      displayProduct(data.products);
      nextPage = data.nextPage; 
    })
    .catch(displayError)  
};


requestApi()