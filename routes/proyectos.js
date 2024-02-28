import express from 'express';
import { getClientes, search, searchTelefono } from '../controllers/proyecto.js';

const router = express.Router();

router.get('/get', getClientes);
router.post('/search', search);

export default router;
