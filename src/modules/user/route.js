import Controller from './controller.js'
import { Router } from "express";
import authentification  from '../../middleware/authentification.js'
import { get_redis, get_redis_by_id }  from '../../middleware/redis_guard.js'
const router = Router();

router.post('/register', Controller.register);
router.patch('/update/:id', authentification, Controller.update);
router.delete('/delete', authentification, Controller.delete);
router.get('/list', authentification, get_redis, Controller.list);
router.get('/detailsById/:id', authentification, get_redis_by_id, Controller.details_by_id);
router.get('/detailsByAccountNumber/:accountNumber', authentification, get_redis_by_id, Controller.details_by_account_number);
router.get('/detailsByIdentityNumber/:identityNumber', authentification, get_redis_by_id, Controller.details_by_identity_number);
router.get('/generate_token_by_identity_number/:identityNumber', Controller.generate_token_by_identity_number);

export default router