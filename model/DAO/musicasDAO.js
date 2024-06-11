const { PrismaClient } = require ('@prisma/client')



//Instância da classe prisma client 
const prisma = new PrismaClient()


/***************************************MUSICAS**********************************************************/
const selectAllMusicas = async function(){


    let sql = 'select * from tbl_musica'

    let rsMusicas = await prisma.$queryRawUnsafe(sql)

    if(rsMusicas.length > 0)
        return rsMusicas
    else 
        return false
}

const selectMusicaByID = async function(id){
    try {
        let sql = `select * from tbl_musica where id_musica = ${id}`
    
        let rsMusica = await prisma.$queryRawUnsafe(sql)
        return rsMusica
        
    } catch (error) {
        return false
        
    }

}

const insertMusica = async function(dadosMusicas){
    
    let sql;
    try {
        if (dadosMusicas.foto_capa != '' && dadosMusicas.foto_capa != null && dadosMusicas.foto_capa != undefined) {
            sql = `insert into tbl_musica (nome, duracao, foto_capa, id_playlist, id_genero, id_album, URL) 
            values(
                '${dadosMusicas.nome}',
                '${dadosMusicas.duracao}',
                '${dadosMusicas.foto_capa}',
                '${dadosMusicas.id_playlist}',
                '${dadosMusicas.id_genero}',
                '${dadosMusicas.id_album}',
                '${dadosMusicas.URL}'
            )`
        }
        else {
            `insert into tbl_musicainsert into tbl_musica (nome, duracao, foto_capa, id_playlist, id_genero, id_album, URL) 

            values(
                '${dadosMusicas.nome}',
                '${dadosMusicas.duracao}',
                '${dadosMusicas.foto_capa}',
                '${dadosMusicas.id_playlist}',
                '${dadosMusicas.id_genero}',
                null,
                '${dadosMusicas.URL}'
                )`
        }
        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        }
        else {
            return false
        }
    } catch (error) {
        return false
    }

}

const deleteMusica = async function (id) {
    try {
        const sql = `DELETE FROM tbl_musica WHERE id_musica = ${id}`
        let rsMusica = await prisma.$executeRawUnsafe(sql)
        return rsMusica > 0
    } catch (error) {
        console.error(error)
        return false
    }
}







    


/***************************************USUARIOS**********************************************************/


const selectAllUsuarios = async function(){
    let sql = 'select * from tbl_usuario'

    let rsUsuarios = await prisma.$queryRawUnsafe(sql)

    if(rsUsuarios.length > 0)
        return rsUsuarios
    else 
        return false
}

const insertUsuario = async function(dadosUsuarios){
    
    let dadosMusicas = dadosUsuarios

    try {
        
        let sql;

        if (dadosMusicas.nome == ''      || dadosMusicas.nome == undefined      || dadosMusicas.nome == null      || dadosMusicas.nome.length > 80 ||
            dadosMusicas.email == ''     || dadosMusicas.email == undefined     || dadosMusicas.email == null     || dadosMusicas.email.length > 65000 ||
            dadosMusicas.senha == ''     || dadosMusicas.senha == undefined     || dadosMusicas.senha == null     || dadosMusicas.senha.length > 8 ||
            dadosMusicas.id_musica == '' || dadosMusicas.id_musica == undefined || dadosMusicas.id_musica == null || dadosMusicas.id_musica > 200||
            dadosMusicas.foto_capa == '' || dadosMusicas.foto_capa == undefined || dadosMusicas.foto_capa == null || dadosMusicas.foto_capa > 2000) 
        {
            
            sql = `insert into tbl_usuario (nome, email, senha, id_musica, foto_capa) 
            values(
                '${dadosUsuarios.nome}',
                '${dadosUsuarios.email}',
                '${dadosUsuarios.senha}',
                '${dadosUsuarios.id_musica}',
                '${dadosUsuarios.foto_capa}'
                
            )`
        }
        else {
            sql = `insert into tbl_usuario (nome, email, senha, id_musica, foto_capa) 
                values(
                    '${dadosUsuarios.nome}',
                    '${dadosUsuarios.email}',
                    '${dadosUsuarios.senha}',
                    null,
                    null
                
                )`
        }
        


        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        }
        else {
            return false
        }
    } catch (error) {
        console.log(error)
    }

}


const deleteUsuario = async function (id) {
    try {
        const sql = `DELETE FROM tbl_usuario WHERE id_usuarios = ${id}`; 
        let rsUsuarios = await prisma.$executeRawUnsafe(sql);
        return rsUsuarios > 0; 
    } catch (error) {
        
        return false;
    }
}

const selectusuarioByID = async function(id){
    try {

        //ScriptSQL para buscar um filme pelo ID
        let sql = `select * from tbl_usuario where id_usuarios=${id}`

        //Encaminha o script SQL para o Banco de Dados
        let rsUsuario = await prisma.$queryRawUnsafe(sql)

        return rsUsuario

    } catch (error) {

        return false
    }
}
const updateUsuario = async function(id_usuario, dadosUsuarios) {
    let sql;
    try {
        if (dadosUsuarios.foto_capa != '' && dadosUsuarios.foto_capa != null && dadosUsuarios.foto_capa != undefined) {
            sql = `UPDATE tbl_usuario
                    SET nome = '${dadosUsuarios.nome}',
                        email = '${dadosUsuarios.email}',
                        senha = '${dadosUsuarios.senha}',
                        foto_capa = '${dadosUsuarios.foto_capa}'
                    WHERE id_usuarios = ${id_usuario}`;
        }
        else {
            sql = `UPDATE tbl_usuario
                    SET nome = '${dadosUsuarios.nome}',
                        email = '${dadosUsuarios.email}',
                        senha = '${dadosUsuarios.senha}'
                    WHERE id_usuarios = ${id_usuario}`;
        }

     
    } catch (error) {
     console.error(error);
        throw error
    }
}








/***************************************GENERO**********************************************************/

const selectGeneroById = async function (id) {
    try {
        let sql = `select * from tbl_genero where id_genero = ${id}`
    
        let rsGenero= await prisma.$queryRawUnsafe(sql)
        return rsGenero
        
    } catch (error) {
        return false
        
    }

}

const insertGenero = async function(dadosGenero){
    let sql;
    try {
        
            sql = `insert into tbl_genero (nome) 
            values(
                '${dadosGenero.nome}'
          )`
        
       
        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        }
        else {
            return false
        }
    } catch (error) {
        return false
    }

}


const deleteGenero = async function(id){
    try {
        const sql = `delete from tbl_genero where id_genero = ${id}`
        let rsGenero = await prisma.$executeRawUnsafe(sql)
        
        return rsGenero

    } catch (error) {
        return false
    }

}

const updateGenero = async function (id, dadoAtualizado) {
    let sql;

    try {
        sql = `UPDATE tbl_genero
                SET
                    nome = '${dadoAtualizado.nome}'
                WHERE
                    id_genero = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result) {
            return true
        }
        else {
            return false
        }
    } catch (error) {
        return false
    }
}

const selectAllGenero = async function (){
    let sql = 'select * from tbl_genero'

    //$queryRawUnsafe(sql)
    //$queryRaw('select * from tbl_filme')

    let rsGenero = await prisma.$queryRawUnsafe(sql)

    if(rsGenero.length > 0)
        return rsGenero
    else 
        return false

}



/*******************************************ARTISTA************************************************************** */
const selectAllArtista = async function(){
    let sql = 'select * from tbl_artista'

    let rsArtista = await prisma.$queryRawUnsafe(sql)

    if(rsArtista.length > 0)
        return rsArtista
    else 
        return false


}


const selectByIdArtista = async function(id){

    //encaminha o script sql par o bd
    try {

        //ScriptSQL para buscar um ator pelo ID
        let sql = `select * from tbl_artista where id_artista=${id}`

        //Encaminha o script SQL para o Banco de Dados
        let rsArtista = await prisma.$queryRawUnsafe(sql)

        return rsArtista

    } catch (error) {

        return false
    }

}




module.exports = {
    selectAllMusicas,
    selectMusicaByID,
    insertMusica,
    deleteMusica,

    //usuarios
    selectAllUsuarios,
    insertUsuario,
    deleteUsuario,
    selectusuarioByID,
    updateUsuario,


    //genero
selectGeneroById,
selectAllGenero,
insertGenero,
deleteGenero,
updateGenero,


//artista
selectAllArtista,
selectByIdArtista

}
