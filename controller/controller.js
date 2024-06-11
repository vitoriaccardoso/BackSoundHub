/**************************************************
 * Objetivo: Arquivo responsável pelas validações e consistencias de dados de músicas
 * Data: 04/06/2024
 * Autora: Vitória
 * Versão: 1.0
 */

//Import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

//Import do arquivo responsável pela 
const musicasDAO = require('../model/DAO/musicasDAO.js')


const getListarMusicas = async function(){

    let musicasJSON = {}


    //Chama a função do DAO que retorna os filmes do BD
    let dadosMusicas = await musicasDAO.selectAllMusicas()


    //Validação para verificar se o DAO retornou dados
    if(dadosMusicas){

        //cria o JSON
        musicasJSON.Músicas = dadosMusicas
        musicasJSON.Artistas = dadosMusicas.length
        musicasJSON.status_code = 200

        return musicasJSON
    }else{
        return false
    }
}

const getMusicaByID = async function(id){
    let idMusica = id

    //cria o objeto JSON
    let musicasJSON = {}


    //Validação para verificar se o id é válido (vazio, indefinido e não numerico)
    if(id == '' || idMusica == undefined || isNaN(idMusica)){
        return message.ERROR_INVALID_ID//400
    }else{
        
        //Encaminha para o DAO localizar o ID do filme
        let dadosMusicas = await musicasDAO.selectMusicaByID(idMusica)
        

        //Validação para verificar se existem dados de retorno
        if(dadosMusicas){

            if(dadosMusicas.length > 0){

            //cria o JSON de retorno
            musicasJSON.Musica = dadosMusicas
            musicasJSON.status_code = 200

            return musicasJSON
            }else{
                return message.ERROR_NOT_FOUND
            }
        }else{
        return message.ERROR_INTERNAL_SERVER_DB//500
    }
    }
}

const setExcluirMusica = async function (id) {
    let idMusica = parseInt(id);

    if (isNaN(idMusica) || idMusica <= 0) {
        return message.ERROR_INVALID_ID; 
    } else {
        let dadosMusicas = await musicasDAO.selectMusicaByID(idMusica);
        if (dadosMusicas.length > 0) {
            let sucesso = await musicasDAO.deleteMusica(idMusica);
            if (sucesso) {
                return message.SUCCESS_DELETED_ITEM;
            } else {
                return message.ERROR_INTERNAL_SERVER_DB; // 500 Internal Server Error
            }
        } else {
            return message.ERROR_NOT_FOUND; // 404 Not Found
        }
    }
}

const setInserirNovaMusica = async function(dadosMusica, contentType) {
    try {
        if (String(contentType).toLowerCase() === 'application/json') {
            // Validação dos dados da música
            if (
                dadosMusica.nome == '' || dadosMusica.nome == undefined || dadosMusica.nome.length > 80 ||
                dadosMusica.duracao == '' || dadosMusica.duracao == undefined ||
                dadosMusica.foto_capa == '' || dadosMusica.foto_capa == undefined || dadosMusica.foto_capa.length > 200 ||
                dadosMusica.id_playlist == '' || dadosMusica.id_playlist == undefined || isNaN(dadosMusica.id_playlist) ||
                dadosMusica.id_genero == '' || dadosMusica.id_genero == undefined || isNaN(dadosMusica.id_genero) ||
                dadosMusica.URL == '' || dadosMusica.URL == undefined || dadosMusica.URL.length > 45
            ) {
                return message.ERROR_REQUIRE_FIELDS; // 400
            } else {
                // Inserção da música no banco de dados
                let novaMusica = await musicasDAO.insertMusica(dadosMusica);
                
                // Obtendo o último ID inserido
                let idSelect = await musicasDAO.selectMusicaByID();
                dadosMusica.id_musica = Number(idSelect[0].id);

                if (novaMusica) {
                    let resultdadosMusica = {
                        status: message.SUCCESS_CREATED_ITEM.status,
                        status_code: message.SUCCESS_CREATED_ITEM.status_code,
                        message: message.SUCCESS_CREATED_ITEM.message,
                        musica: dadosMusica
                    };
                    return resultdadosMusica; // 201
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB; // 500
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE; // 415
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER; // 500
    }
};



    /***********************************************USUARIOS**********************************************************/


const getListarUsuarios = async function(){

    let usuariosJSON = {}


    //Chama a função do DAO que retorna os filmes do BD
    let dadosUsuarios = await musicasDAO.selectAllUsuarios()


    //Validação para verificar se o DAO retornou dados
    if(dadosUsuarios){

        //cria o JSON
        usuariosJSON.usuarios = dadosUsuarios
        usuariosJSON.status_code = dadosUsuarios.length
        usuariosJSON.status_code = 200

        return usuariosJSON
    }else{
        return false
    }
}
const setInserirNovoUsuario = async function(dadosUsuarios, contentType) {

    try {

        //Validação de content-type (apenas application/json)
        if (String(contentType).toLowerCase() == 'application/json') {

            //Cria o objeto JSON para devolver os dados criados na requisição
            let novoUsuarioJSON = {}

            //Validação de campos obrigatórios ou com digitação inválida
            if( dadosUsuarios.nome == ''             || dadosUsuarios.nome == undefined           || dadosUsuarios.nome == null               || dadosUsuarios.nome.length > 80               ||
                dadosUsuarios.email == ''            || dadosUsuarios.email == undefined          || dadosUsuarios.email == null            || dadosUsuarios.email.length > 65000                 ||
                dadosUsuarios.senha == ''            || dadosUsuarios.senha == undefined          || dadosUsuarios.senha == null            || dadosUsuarios.senha.length > 8                     
            ){
                return message.ERROR_REQUIRE_FIELDS //400

            }else {

                let validateStatus = false

                //Validação da data de relançamento, já que ela não é obrigatória no Banco de Dados

                if (dadosUsuarios.foto_capa != null   &&
                    dadosUsuarios.foto_capa  != ''     &&
                    dadosUsuarios.foto_capa  != undefined ) {

                    //Validação para verificar se a data está com a quantidade de digitos corretos
                    if (dadosUsuarios.foto_capa.length != 500){
                        return message.ERROR_REQUIRE_FIELDS //400
                    } else {
                        validateStatus = true
                    }
                } else {
                    validateStatus = true
                }

                //Validação para verificar se a variável booleana é verdadeira
                if(validateStatus){

                    //Encaminha os dados do Filme para o DAO inserir no Banco de Dados
                    let novoUsuario = await musicasDAO.insertUsuario(dadosUsuarios)
                    //Validação para verificar se DAO inseriu os dados do Banco
                    if(novoUsuario){

                        
                        //Cria o JSON de retorno dos dados (201)
                    novoUsuarioJSON.nome        = dadosUsuarios
                    novoUsuarioJSON.email       = dadosUsuarios
                    novoUsuarioJSON.senha       = dadosUsuarios
                    novoUsuarioJSON.status      = message.SUCCESS_CREATED_ITEM.status
                    novoUsuarioJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    novoUsuarioJSON.message     = message.SUCCESS_CREATED_ITEM.message

                        return novoUsuarioJSON //201
                    } else {
                        return message.ERROR_INTERNAL_SERVER_DB //500
                    }
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch(error) {
        return message.ERROR_INTERNAL_SERVER //500 - Erro na controller
    }
}
const setExcluirUsuario = async function(id) {

    let idUsuario = id

    if (idUsuario == '' || idUsuario == undefined || idUsuario == isNaN(idUsuario) || idUsuario == null) {
        return message.ERROR_INVALID_ID
    } else {

        let dadosUsuario = await musicasDAO.selectusuarioByID(idUsuario)
        let validarId = dadosUsuario.length 

        if (validarId > 0) {

        dadosUsuario = await musicasDAO.deleteUsuario(idUsuario)
        
        return message.SUCCESS_DELETED_ITEM

        } else {
            return message.ERROR_NOT_FOUND
        }
    }
}
 const getBuscarUsuario = async function(id) {

    //Recebe o ID do Filme
    let idUsuario = id

    //Cria o objeto JSON
    let usuariosJSON = {}

    //Validação para verificar se ID é válido (vazio, indefinido e não numérico)
    if(idUsuario == '' || idUsuario == undefined || isNaN(idUsuario)) {
        return message.ERROR_INVALID_ID
    } else {

        let dadosUsuario = await musicasDAO.selectusuarioByID(idUsuario)

        //Validação para verificar se existem dados de retorno
        if(dadosUsuario) {

            //Validação para verificar a quantidade de itens encontrados
            if(dadosUsuario.length > 0) {

                //Cria o JSON de retorno
                usuariosJSON.usuario =  dadosUsuario
                usuariosJSON.status_code = 200

                return usuariosJSON
            } else {
                return message.ERROR_NOT_FOUND
            }
        } else {
            return message.ERROR_INTERNAL_SERVER_DB
        }
    }
}
const setAtualizarUsuario = async function(id, dadosUsuarios, contentType) {
    try {
        let idUsuario = id;

        console.log(dadosUsuarios);
        if (idUsuario == '' || idUsuario == undefined || isNaN(idUsuario)) {
            return message.ERROR_INVALID_ID;
        }

        if (String(contentType).toLowerCase() !== 'application/json') {
            return message.ERROR_CONTENT_TYPE;
            
        }

        if (dadosUsuarios.nome == '' || dadosUsuarios.nome == undefined || dadosUsuarios.nome == null || dadosUsuarios.nome.length > 80 ||
            dadosUsuarios.email == '' || dadosUsuarios.email == undefined || dadosUsuarios.email == null || dadosUsuarios.email.length > 65000 ||
            dadosUsuarios.senha == '' || dadosUsuarios.senha == undefined || dadosUsuarios.senha == null || dadosUsuarios.senha.length > 800 ||
            dadosUsuarios.foto_capa != null || dadosUsuarios.foto_capa != '' || dadosUsuarios.foto_capa != undefined || dadosUsuarios.foto_capa.length != 100) {
            return message.ERROR_REQUIRE_FIELDS;
        }

        let validateStatus = true;

        if (validateStatus) {
            let updateSuccess = await musicasDAO.updateUsuario(idUsuario, dadosUsuarios);

            if (updateSuccess) {
                return {
                    usuario: dadosUsuarios,
                    status: message.SUCESS_UPDATE_ITEM.status,
                    status_code: message.SUCESS_UPDATE_ITEM.status_code,
                    message: message.SUCESS_UPDATE_ITEM.message
                };
            } else {
                return message.ERROR_NOT_FOUND;
            }
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        return message.ERROR_INTERNAL_SERVER;
    }
}










module.exports = {
getListarMusicas,
getMusicaByID,
setExcluirMusica,
setInserirNovaMusica,



//usuarios
getListarUsuarios,
setInserirNovoUsuario,
setExcluirUsuario,
getBuscarUsuario,
setAtualizarUsuario

}
