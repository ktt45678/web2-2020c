import { AuthenticationService } from '../../services/authentication.service';

export function appInitializer(auth: AuthenticationService) {
  if (auth.accessTokenValue) {
    return () => new Promise(resolve => {
      // Attempt to refresh token on app start up to auto authenticate
      auth.refreshToken().subscribe().add(resolve);
    });
  }
  // No token so continue
  return () => new Promise(resolve => {
    resolve();
  });
}