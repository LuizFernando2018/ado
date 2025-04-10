import { connection } from './db.js'; // Ajustado para named import

const mensagemService = {
    async enviarMensagem(nome, telefone, animal, mensagem) {
        const [result] = await (await connection).execute(
            'INSERT INTO Mensagens (nome, telefone, animal_id, mensagem) VALUES (?, ?, ?, ?)',
            [nome, telefone, null, mensagem]
        );
        return { id: result.insertId, nome, telefone, animal, mensagem };
    }
};

export { mensagemService };