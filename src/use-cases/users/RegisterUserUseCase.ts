import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUserRepository } from '../../repositories/IUserRepository';
import { IRegisterUserUseCase } from '../../repositories/IAuthUseCases';
import { CreateUserData, AuthResponse } from '../../domain/User';

export class RegisterUserUseCase implements IRegisterUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userData: CreateUserData): Promise<AuthResponse> {
    // Verificar se o usuário já existe
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email já está em uso');
    }

    // Hash da senha
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    // Criar usuário
    const user = await this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    // Gerar token JWT
    const token = this.generateToken(user.id);

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      message: 'Usuário registrado com sucesso',
    };
  }

  private generateToken(userId: number): string {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET não está definido');
    }

    return jwt.sign({ userId }, jwtSecret, { expiresIn: '7d' });
  }
}