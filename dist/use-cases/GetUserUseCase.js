"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserUseCase = void 0;
class GetUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(userId) {
        return await this.userRepository.findById(userId);
    }
}
exports.GetUserUseCase = GetUserUseCase;
//# sourceMappingURL=GetUserUseCase.js.map