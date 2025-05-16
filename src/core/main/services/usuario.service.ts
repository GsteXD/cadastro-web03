import { UsuarioRepository } from "../repositories/usuario.repository";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

interface cadastroUsuarioDTO {
    nome: string;
    email: string;
    ddd: string;
    telefone: string;
    senha: string;
    documento: string;
    documento_id: string;
}

export class UsuarioService {
    constructor(private repo = new UsuarioRepository()) {}

    // TODO: Futuramente colocar um email real?
    private async enviarEmailReset(email: string, link: string) {

        try {
            const testAccount = await nodemailer.createTestAccount();

            const transporter = nodemailer.createTransport({
                host: testAccount.smtp.host,
                port: testAccount.smtp.port,
                secure: testAccount.smtp.secure,
                auth: {
                    user: testAccount.user,
                    pass: testAccount.pass
                }
            });

            //Envia um email(falso)
            const info = await transporter.sendMail({
                from: '"QMask!" <no-reply@qmask.com>',
                to: email,
                subject: "Redefinição de senha",
                html: `<p>Para redefinir sua senha, clique no link: <a href="${link}">${link}</a></p>`
            })
            //Mostra o link do email
            console.log('Preview URL:' + nodemailer.getTestMessageUrl(info));

        } catch (err) {
            throw new Error('Erro no envio do email:');
        }
    }

    async resetarSenha(email: string) {
        const user = await this.repo.getByEmail(email);

        if (!user) {
            return { sucesso: false, message: 'Usuário não encontrado' }
        }

        const usuario = user.get({ plain: true });
        console.log('(resetarSenha)Usuário encontrado:', usuario);
        // Gera uma sequencia aleatório para um link
        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 3600 * 1000); //1h

        await this.repo.setResetToken(usuario.id, token, expiresAt);

        const link = `http://localhost:4200/new-senha?token=${token}`;

        await this.enviarEmailReset(email, link);

        return { sucesso: true, message: 'Email enviado'}
    }

    async autenticarUsuario(email: string, senha: string) {
        const user = await this.repo.getByEmail(email);

        if (!user) {
            return { sucesso: false, message: 'Usuário não encontrado' };
        }

        const usuario = user.get({ plain: true });
        console.log('(autenticarUsuario)Usuário encontrado:', usuario);

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return { sucesso: false, message: 'Senha inválida' };
        }

        //Cria um token para persistir o login
        const token = jwt.sign(
            { id: usuario.id, email: usuario.email }, //Payload para gerar o token
            'Banana', //chave secreta
            { expiresIn: '1h' }
        )

        return { sucesso: true, usuario, token };
    }

    async criarUsuario(dados: any) {
        const validarCampos: cadastroUsuarioDTO = {
            nome: dados.fullName,
            email: dados.email,
            ddd: dados.ddd,
            telefone: dados.telefone,
            senha: dados.senha,
            documento: dados.documento,
            documento_id: dados.documento_id
        }

        //Verificação de como os dados estão chegando
        console.log(validarCampos);

        //Validador simples
        if(!validarCampos.nome || !validarCampos.email || !validarCampos.senha || !validarCampos.documento || !validarCampos.documento_id) {
            throw new Error('Dados obrigatórios faltando.');
        }

        let hideSenha;
        try {
            hideSenha = await bcrypt.hash(validarCampos.senha, 10);
        } catch (error) {
            throw new Error("Falha ao criptografar a senha.");
        }

        const novoUsuario = await this.repo.criarUsuario({
            ...validarCampos,
            senha: hideSenha
        });

        return novoUsuario;
    }

    buscarId(id: number) {
        const usuario = this.repo.getById(id);

        if (!usuario) {
            throw new Error('(service)Usuário não encontrado.');
        }

        return usuario;
    }
}