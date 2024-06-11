const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();

const bodyParserJSON = bodyParser.json()
 

app.use((_request,response,next) =>{
    response.header('Acess-Control-Allow-Origin','*');
    response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    app.use(cors())
    
    next();
})

const controllerMusicas = require('./controller/controller.js')



/***********************************************MUSICAS**********************************************************/
    //http://localhost:8080/v1/soundhub/musicas
    app.get('/v1/soundhub/musicas', cors(),async function (request,response,next){

        // chama a função da controller para retornar os filmes;
        let dadosMusicas = await controllerMusicas.getListarMusicas();
    
        // validação para retornar o Json dos filmes ou retornar o erro 404;
        if(dadosMusicas){
            response.json(dadosMusicas);
            response.status(200);
        }else{
            response.json({message: 'Nenhum registro foi encontrado'});
            response.status(404);
        }
    })


    app.get('/v1/soundhub/musicas/:id', cors(), async function(request, response) {

        //Recebe o ID da requisição
        let idMusica = request.params.id
    
        //Encaminha o ID para a controller buscar o Filme
        let dadosMusicas = await controllerMusicas.getMusicaByID(idMusica)
    
        response.status(dadosMusicas.status_code)
        response.json(dadosMusicas)
    })

    app.post('/v1/soundhub/musicas',  cors(), bodyParserJSON, async (request, response, next) =>{

        let contentType = request.headers['content-type']
    
        //Recebe os dados encaminhados no Body da requisição
        let dadosBody = request.body
    
        //Encaminha os dados para cotroller inserir no BD
        let resultDados = await controllerMusicas.setInserirNovaMusica(dadosBody, contentType)
    
        response.status(resultDados.status_code)
        response.json(resultDados)
    
    })



    /***********************************************USUARIOS**********************************************************/
    //GET
    app.get('/v1/soundhub/usuarios', cors(),async function (request,response,next){

        // chama a função da controller para retornar os filmes;
        let dadosUsuarios = await controllerMusicas.getListarUsuarios()
    
        // validação para retornar o Json dos filmes ou retornar o erro 404;
        if(dadosUsuarios){
            response.json(dadosUsuarios);
            response.status(200);
        }else{
            response.json({message: 'Nenhum registro foi encontrado'});
            response.status(404);
        }
    })


    //INSERT
    app.post('/v1/soundhub/usuarios',  cors(), bodyParserJSON, async (request, response, next) =>{

        let contentType = request.headers['content-type']
    
        //Recebe os dados encaminhados no Body da requisição
        let dadosBody = request.body
    
        //Encaminha os dados para cotroller inserir no BD
        let resultDados = await controllerMusicas.setInserirNovoUsuario(dadosBody, contentType)
    
        response.status(resultDados.status_code)
        response.json(resultDados)
    
    })


        //DELETE
    app.delete('/v1/soundhub/usuarios/:id', cors(), async function(request, response, next){

        let idUsuario = request.params.id
    
        let resultDados = await controllerMusicas.setExcluirUsuario(idUsuario)
    
        response.status(resultDados.status_code);
        response.json(resultDados);
    });


    //UPDATE
    app.put('/v1/soundhub/usuarios/:id', cors(), bodyParserJSON, async function (request, response, next) {
    
        let contentType = request.headers['content-type']
        let idUsuario = request.params.id
        let dadosBody = request.body
    
        let resultUpdateUsuario = await controllerMusicas.setAtualizarUsuario(idUsuario, dadosBody, contentType)
    
        response.status(resultUpdateUsuario.status_code)
        response.json(resultUpdateUsuario)
    })


    //ID
    app.get('/v1/soundhub/usuarios/:id', cors(), async function(request, response) {

        //Recebe o ID da requisição
        let contentType = request.headers['content-type']

        let idUsuario = request.params.id
    
        //Encaminha o ID para a controller buscar o Filme
        let dadosUsuario = await controllerMusicas.getBuscarUsuario(idUsuario, contentType)
    
        response.status(dadosUsuario.status_code)
        response.json(dadosUsuario)
    })

    app.listen('8080', function(){
        console.log('API FUNCIONANDO')
    })