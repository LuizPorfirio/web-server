console.log(`javascript no frontend`)

const cotacoesForm = document.querySelector('form')
const mainMensage = document.querySelector('h3')
const price = document.querySelector('#price')

cotacoesForm.addEventListener('submit', (event) => {
    mainMensage.innerText = 'Buscando....'
    event.preventDefault()
    const ativo = document.querySelector('input').value

    if(!ativo){
        mainMensage.innerText = 'O ativo deve ser informado'
        return;
    }

    fetch(`http://localhost:3000/cotacoes?ativo=${ativo}`).then((Response) => {
        response.json().then((data) => {
            if(data.error){
                mainMensage.innerText = `Alguma coisa deu errado`
                price.innerHTML = `${data.error.mensage} | código ${data.error.code}`
            }else{
                console.log(data)
            }
        })
    })
})