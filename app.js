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


    app.delete('/v1/soundhub/musica/:id', cors(), async (request, response, next)=>{

        let idMusica = request.params.id
    
        let dadosMusica = await controllerMusicas.setExcluirMusica(idMusica)
    
        response.status(dadosMusica.status_code)
        response.json(dadosMusica)
        
      
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







    //*********************************************************************************************GENERO*********************************************************************************************//

app.get('/v1/soundhub/genero/:id', cors(), async function(request, response, next){


    //recebe o ID da requisição
    let idGenero = request.params.id


    //encaminha o ID para a controller buscar o filme
    let dadosGenero = await controllerMusicas.getBuscarGeneroId(idGenero)

    response.status(dadosGenero.status_code)
    response.json(dadosGenero)
})

app.post('/v1/soundhub/genero', cors(), bodyParserJSON, async function(request, response){
    //recebe o contente-type da requisição
    let contentType = request.headers['content-type']


    
    //recebe todos os daoos encaminhados na requisição pelo body
    let dadosBody = request.body


    //encaminha os dados para o controller enviar para DAO
    let resultDadosNovoGenero = await controllerMusicas.setNovoGenero(dadosBody, contentType)
    response.status(resultDadosNovoGenero.status_code)

    response.json(resultDadosNovoGenero)
})

app.delete('/v1/soundhub/genero/:id', cors(), async (request, response, next)=>{

    let idGenero = request.params.id

    let dadosGenero = await controllerMusicas.setExcluirGenero(idGenero)

    response.status(dadosGenero.status_code)
    response.json(dadosGenero)
    
  
})

app.put('/v1/soundhub/genero/:id', cors(), bodyParserJSON, async function (request, response) {
    let idGenero = request.params.id

    let contentType=request.headers['content-type']
    let dadosBody = request.body
    
    let resultDadosNovoGenero = await controllerMusicas.setAtualizarGenero(idGenero,dadosBody,contentType)

    response.status(resultDadosNovoGenero.status_code)
    response.json(resultDadosNovoGenero)
})

app.get('/v1/soundhub/generos', cors(), async function (_request, response) {
    let dadosGeneros = await controllerMusicas.getListarGeneros()

    response.json(dadosGeneros)
    response.status(200)
})



    //*********************************************************************************************ARTISTAS*********************************************************************************************//
    app.get('/v1/soundhub/artistas', cors(),async function (request,response,next){

        // chama a função da controller para retornar os filmes;
        let dadosArtista = await controllerMusicas.getListarArtista()
    
        // validação para retornar o Json dos filmes ou retornar o erro 404;
       response.status(dadosArtista.status_code)
       response.json(dadosArtista)
    });


    
app.get('/v1/soundhub/artista/:id', cors(), async function(request,response,next){

    // recebe o id da requisição
    let idArtista = request.params.id

    //encaminha o id para a acontroller buscar o Ator
    let dadosArtista = await controllerMusicas.getListarArtistaByID(idArtista)

    response.status(dadosArtista.status_code);
    response.json(dadosArtista);
})

    app.listen('8080', function(){
        console.log('API FUNCIONANDO')
    })