import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthUseCaseFactory } from "../../use-cases/@factories/AuthUseCaseFactory";
import { CreateUserData } from "../../domain/User";
import { LoginData } from "../../domain/User";

export class AuthController {
  constructor(private prisma: PrismaClient) {}

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password }: CreateUserData = req.body;

      // Validações básicas
      if (!name || !email || !password) {
        res.status(400).json({ error: "Nome, email e senha são obrigatórios" });
        return;
      }

      if (password.length < 6) {
        res
          .status(400)
          .json({ error: "Senha deve ter pelo menos 6 caracteres" });
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({ error: "Email inválido" });
        return;
      }

      const registerUserUseCase = AuthUseCaseFactory.createRegisterUserUseCase(
        this.prisma
      );
      const result = await registerUserUseCase.execute({
        name,
        email,
        password,
      });

      res.status(201).json(result);
    } catch (error: any) {
      console.error("Erro no registro:", error);
      res
        .status(400)
        .json({ error: error.message || "Erro interno do servidor" });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password }: LoginData = req.body;

      // Validações básicas
      if (!email || !password) {
        res.status(400).json({ error: "Email e senha são obrigatórios" });
        return;
      }

      const loginUserUseCase = AuthUseCaseFactory.createLoginUserUseCase(
        this.prisma
      );
      const result = await loginUserUseCase.execute({ email, password });

      res.json(result);
    } catch (error: any) {
      console.error("Erro no login:", error);
      res
        .status(401)
        .json({ error: error.message || "Erro interno do servidor" });
    }
  }

  async getMe(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ error: "Usuário não autenticado" });
        return;
      }

      const getUserUseCase = AuthUseCaseFactory.createGetUserUseCase(
        this.prisma
      );
      const user = await getUserUseCase.execute(userId);

      if (!user) {
        res.status(404).json({ error: "Usuário não encontrado" });
        return;
      }

      // Remover senha da resposta
      const { password, ...userWithoutPassword } = user;
      
      // Retorna no formato esperado pelo frontend
      res.json({
        data: userWithoutPassword,
        message: 'Usuário autenticado com sucesso'
      });
    } catch (error: any) {
      console.error("Erro ao buscar usuário:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}
