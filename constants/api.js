// ==============================================
// CONFIGURAÇÃO DA API - App JEMI
// ==============================================
// Para usar o MockAPI:
// 1. Acesse https://mockapi.io e crie uma conta gratuita
// 2. Crie um projeto chamado "jemi-app"
// 3. Crie um recurso "users" com campos:
//    - name (String)
//    - email (String)
//    - password (String)
//    - phone (String)
// 4. Copie a URL base e cole abaixo
//
// Exemplo: 'https://SEU_ID.mockapi.io/api/v1'
// ==============================================

export const API_BASE_URL = 'https://6846a1c7b070ac2b.mockapi.io/api/v1';

// Endpoints
export const ENDPOINTS = {
  users: `${API_BASE_URL}/users`,
};
