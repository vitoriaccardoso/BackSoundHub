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
            sql = `insert into tbl_musica (nome, duracao, id_playlist, id_genero, id_album, foto_capa, URL) 
            values(
                '${dadosMusicas.nome}',
                '${dadosMusicas.email}',
                '${dadosMusicas.senha}',
                '${dadosMusicas.data_registro}',
                '${dadosMusicas.data_relancamento}',
                '${dadosMusicas.id_musica}',
                '${dadosMusicas.foto_capa}',
                '${dadosMusicas.URL}'
            )`
        }
        else {
            `insert into tbl_musica (nome, email, senha, data_registro, id_musica, foto_capa, URL) 
            values(
                '${dadosMusicas.nome}',
                '${dadosMusicas.email}',
                '${dadosMusicas.senha}',
                '${dadosMusicas.data_registro}',
                '${dadosMusicas.data_relancamento}',
                '${dadosMusicas.id_musica}',
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
};




    


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
    updateUsuario
}
