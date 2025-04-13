// backend/config/config.js
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ⬇️ Correctly point to .env in Chatter root
dotenv.config({ path: path.resolve(__dirname, '../../.env') }); 
