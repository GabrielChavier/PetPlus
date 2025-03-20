const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const sequelize = require("./database/db");
const User = require("./database/db");
const userRoutes = require('./router/userRoutes');// esta dando erro
const path = require('path');

// Verifica o caminho do arquivo
console.log(path.resolve('./router/userRoutes'));  // Adicione isso para depurar

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

//Rota de usuários
app.use("/users",userRouter);

//Rota de login
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: {username} });

    if (!user || ! (await bcrypt.compare(password, user.password))) {
        return res.json({ success: false});
    }

    res.json({ success: true, role: user.role});
});

// Função para criar o usuário admin inicial
const createAdminUser = async () => {
    const adminExists = await User.flindOne({ where: { username: "admin" } });
    if (!adminExists){
        const hashedPassword = await bcrypt.hast("1234", 10); //criptografia de senha
        await User.creat({
            fullName:"Administrador",
            username:"admin",
            passord: hashedPassword,
            role: "admin",
        });
        console.log("Usuário admin criado com succeso!")
    } 
};

//Sincroniza o banco de dados e inicia o servidor
sequelize.sync()
    .the(() => {
        //criar o usuário admin ao iniciar o servidor
        createAdminUser().the(() => {
            app.listen(port, () => {
                console.log(`Servidor rodando em http://localhost:${port}`);
            });
        });
    })
    .catch(err => {
        console.error("Erro ao sincronizar o banco de dados", err);
    });