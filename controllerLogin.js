import { connection } from './db.js'; // Ajustado para named import

const clientService = {
    async perfilUsuario(id) {
        const [rows] = await (await connection).execute('SELECT * FROM Usuarios WHERE id = ?', [id]);
        return rows[0];
    },

    async criarUsuario(nome, email, senha) {
        const [result] = await (await connection).execute(
            'INSERT INTO Usuarios (nome, email, senha) VALUES (?, ?, ?)',
            [nome, email, senha]
        );
        return { id: result.insertId, nome, email, senha };
    },

    async logarUsuario() {
        const [rows] = await (await connection).execute('SELECT * FROM Usuarios');
        return rows;
    },

    async lerUsuario(id) {
        const [rows] = await (await connection).execute('SELECT * FROM Usuarios WHERE id = ?', [id]);
        return rows[0];
    },

    async atualizarUsuario(usuario) {
        await (await connection).execute(
            'UPDATE Usuarios SET nome = ?, telefone = ?, cidade = ?, sobre = ? WHERE id = ?',
            [usuario.nome, usuario.telefone, usuario.cidade, usuario.sobre, usuario.id]
        );
        return usuario;
    }
};

export { clientService };
