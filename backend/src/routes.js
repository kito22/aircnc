import { Router } from 'express';
import multer from 'multer';

import UserController from './app/controllers/UserController';
import SpotController from './app/controllers/SpotController';
import DashboardController from './app/controllers/DashboardController';
import BookingController from './app/controllers/BookingController';
import ApprovalController from './app/controllers/ApprovalController';
import RejectionController from './app/controllers/RejectionController';

import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/session', UserController.store);

routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);

routes.get('/dashboard', DashboardController.show);

routes.post('/spot/:spot_id/booking', BookingController.store);

routes.post('/bookings/:booking_id/approvals', ApprovalController.store);
routes.post('/bookings/:booking_id/rejections', RejectionController.store);

export default routes;
