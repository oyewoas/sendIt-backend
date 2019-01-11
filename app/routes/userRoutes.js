import { createUser } from '../controller/usersController';
// import verifyAuth from '../middleware/verifyAuth';

export default function route(app) {
  app.post('/api/v1/user/signup', createUser);
  
  // app.post('/api/v1/user/login', logIn);
  
  // app.get('/api/v1/user/profile', checkAuth, getProfile);
  
  // app.put('/api/v1/user/profile', checkAuth, updateProfile);
  
  // app.put('/api/v1/user/updatename', checkAuth, updateName);
}
