const path = require('path')
const express = require('express')
const hbs = require('hbs')
const cotacoes = require('./util/cotacao')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index',{
        title: `Cotações`,
        author: `Luiz Otávio`
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: `Sobre`,
        author: `Luiz Otávio`
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: `Ajuda`,
        author: `Luiz Otávio`
    })
})


app.get('/cotacoes', (req, res) =>{
    if(!req.query.ativo){
        return res.status(400).json({
            error:{
                mensage: `O ativo deve ser informado como query parameter`,
                code: 400
            }
        })
    }

    const symbol = req.query.ativo.toUpperCase()

    cotacoes(symbol, (err, body) =>{
        if(err){
            return res.status(err.code).json({error: {
                mensage: err.mensage,
                code: err.code
            }})
        }
        res.status(200).json(body)
    })
})

app.get('/help/*', (req, res) =>{
    //res.send('404 do help')
    res.render('404', {
        title: '404',
        errorMessage: `Não existe página após o /help`,
        author: `Luiz Otávio`
    })
})

app.get('*', (req, res) =>{
    res.render('404',{ 
        title: '404',
        errorMessage: `Página não encontrada`,
        author: `Luiz Otávio`
    })
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`server is up on port ${port} `)
})