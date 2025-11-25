import { sql } from "./sql";

async function criarTabela(){
    try{
        await sqL`
            CREATE TABLE IF NOT EXIXTS VIDEO(
                id UUID PRIMARY KEY,
                title TEXT NOT NULL,
                description TEXT NOT NULL,
                duration INTEGER NOT NULL, 
            );
        `;
        console.log("Tabela 'videos' criada com sucesso");
    }catch(err) {
        console.log("Erro ao criar a tabela 'videos' :" .err);    
    }finally{
        process.exit();
    }
}

criarTabela();