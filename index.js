const config = require('./config.js')
const express = require('express')
const request = require('request')
var app = express()
//defininmos a rota publica do nosso frontend
app.use('/public', express.static(__dirname +
    '/public'))
//caso o usuário aponte para o raiz, abrimos o index.html
app.get('/', function (req, res) {
    res.sendFile('index.html', {
        root: __dirname +
            '/public'
    })
})
// configurando a busca do CEP no ViaCEP
app.get('/cep', function (req, res) {
    var cep = req.query.cep
    if (cep) {
        var url = `https://viacep.com.br/ws/${cep}/json/`
        request(url, function (err, response, body) {
            res.status(200).send(body)
        })
    } else {
        res.status(500).json({ status: 'Erro' })
    }
})
//configurando a busca do clima via openWeatherMap
app.get('/clima', function (req, res) {
    var localidade = req.query.localidade
    if(localidade) {
        var url = `http://api.openweathermap.org/data/2.5/weather?q=${localidade},br&lang=pt&units=metric&appid=83b092131fbde6cc7591dd9cf87002d8`
        request(url, function (err, response, body) {
            res.status(200).send(body)
        })
    } else {
        res.status(500).json({ status: 'Erro'})
    }
})
//vamos prever as demais rotas
app.get('*', function (req, res) {
    res.status(404).send('Página não encontrada!')
})
//vamos ouvir o servidor na porta configurada
app.listen(config.portaServidor, function () {
    console.log(`${config.nomeAPI} rodando na porta ${config.portaServidor}`)
})