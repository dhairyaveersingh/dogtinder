import { connectSocket } from '../utils/socket';

// ... inside your login success handler:
const handleLoginSuccess = (userJwtToken) => {
  connectSocket(userJwtToken);
  // ...any other post-login logic
};
