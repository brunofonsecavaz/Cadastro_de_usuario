import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors()); // permite que o express receba requisicoes de outros dominios
app.use(express.json()); // permite que o express entenda JSON


 // definindo a rota que cria o usuario
app.post('/usuarios', async (request, response) => {

    // validacao dos dados recebidos
    const user = await prisma.user.create({
        data: {
            email: request.body.email, 
            name: request.body.name,
            age: request.body.age, 
        }
    });

    response.status(201).send(user); // aqui estava o erro
});


// definindo a rota que lista os usuarios
app.get('/usuarios', async (request, response) => {

    let users = [];
    if (request.query) {
        // filtra os usuarios por nome, email e idade
        users = await prisma.user.findMany( {
            where: {
                name: request.query.name,
                email: request.query.email,
                age: request.query.age 
            }
        });        
    }
    // se nao houver query, retorna todos os usuarios
    else { 
        users = await prisma.user.findMany();
    }
    
    response.status(200).send(users) // envia o array de usuarios

});


app.put('/usuarios/:id', async (request, response) => {

    //  altera o usuario pelo ID
   await prisma.user.update({
        where: {
            id: request.params.id 
        },
        data: {
            email: request.body.email, 
            name: request.body.name,
            age: request.body.age, 
        }
    })
    response.status(200).json(request.body);
});

app.delete('/usuarios/:id', async (request, response) => {

    // deleta o usuario pelo ID
   await prisma.user.delete({
        where: {
            id: request.params.id 
        }
    })

    response.status(200).json({message: "usuario deletado!"});

});

// inicia o servidor
app.listen(3000, () => {

    console.log("Servidor rodando");

}); 