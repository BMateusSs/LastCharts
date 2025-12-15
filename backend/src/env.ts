import dotenv from 'dotenv';
import path from 'path';

// Configura o dotenv para procurar o .env na raiz do projeto (backend)
// __dirname = pasta src
// .. = pasta backend (raiz)
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Verifica se a chave existe. Se não, explode o erro antes do app iniciar.
if (!process.env.LASTFM_API_KEY) {
    throw new Error('FATAL: A variável LASTFM_API_KEY não está definida no .env');
}

// Exporta as variáveis limpas para o resto do app
export const env = {
    LASTFM_API_KEY: process.env.LASTFM_API_KEY,
    PORT: process.env.PORT || 3000
};