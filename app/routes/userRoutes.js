<<<<<<< HEAD
<<<<<<< HEAD
import { createUser, logIn } from '../controller/usersController';
=======
import { createUser, logIn, updateProfile } from '../controller/usersController';
import verifyAuth from '../middlewares/verifyAuth';
>>>>>>> 4232cec42e32e7fb9ac78671ac12929ff77ecb55
// import verifyAuth from '../middleware/verifyAuth';

export default function route(app) {
  app.post('/api/v1/user/signup', createUser);
  
  app.post('/api/v1/user/login', logIn);
  
  // app.get('/api/v1/user/profile', verifyAuth, getProfile);
  
  app.put('/api/v1/user/profile', verifyAuth, updateProfile);
  
  // app.put('/api/v1/user/updatename', checkAuth, updateName);
}
=======
export default function route(app) {
    // const badRequest = { status: 400, message: 'Bad Request' };
  
    // Get Request for a single entry 
    // app.get('/api/v1/entries/:id', checkAuth, getEntry);
  
  
    // // Get request for all entries in the array
    // app.get('/api/v1/entries', checkAuth, getEntries);
  
  
    // // Post Request for an entry
    // app.post('/api/v1/entries', checkAuth, createEntry);
  
  
    // // Put Request to modify the content of an entryRoutes
    // app.put('/api/v1/entries/:id', checkAuth, updateEntry);
  
  
    // // Delete Request to delete an entry
    // app.delete('/api/v1/entries/:id', checkAuth, deleteEntry);
  }
  
>>>>>>> develop
