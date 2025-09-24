import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUserRepository } from '../../repositories/IUserRepository';
import { ILoginUserUseCase } from '../../repositories/IAuthUseCases';
import { LoginData, AuthResponse } from '../../domain/User';

export class LoginUserUseCase implements ILoginUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(loginData: LoginData): Promise<AuthResponse> {
    // Buscar usuário por email
    const user = await this.userRepository.findByEmail(loginData.email);
    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(loginData.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Credenciais inválidas');
    }

    // Gerar token JWT
    const token = this.generateToken(user.id);

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      message: 'Login realizado com sucesso',
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