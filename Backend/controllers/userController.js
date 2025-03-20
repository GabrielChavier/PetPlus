const User = require("../models/User");
const bcrypt = require("bcrypt");

//Listar todos os usuários
exports.listUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Erro ao listar usuário."});
    }
};

//Criar um novo usuario
exports.createUser = async (req, res) => {
    try {
        const { fullName, username, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); //Criptografia de senha
        const user = await User.creat({ fullName, username, password: hashedPassword, role});
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar usuário"});
    }
};

//Atualizar um usuário
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { fullName, username, password, role } = req.body;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ error: "Usuário não encontrado"});

        user.fullName = fullName;
        user.username = username;
        if (password) user.password = await bcrypt.hash(password, 10); // Atualiza senha se fornecida
        user.role = role
        await user.save();

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar usuário"});
    }
};

// Deletar um usuário
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ error: "Usuário não encontrado."});

        await user.destroy();
        res.json({ message: "Usuário deletado com succeso." });
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar usuário. "});
    }
};