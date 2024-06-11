//Import da biblioteca do prisma client
const { PrismaClient } = require ('@prisma/client')



//Instância da classe prisma client 
const prisma = new PrismaClient()



var musicas = {
    "musicas": [
      {
		"id": 1,  
        "nome": "O Segredo do Vale",

     
      },
      {
		"id": 2,  
        "nome": "A Herança Perdida",
       
      }
    ]
  }


  