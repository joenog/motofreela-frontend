interface IsLoggedIn {
  loginRequest?: {
    email: string;
    password: string;
  };
  isLoggedIn?: boolean;
  user?: {
    id?: number;
    name: string;
    email: string;
  };
}
interface LoginAction {
  type: string;
  payload?: string | IsLoggedIn;
}
interface LoginState {
  isLoggedin: IsLoggedIn;
  error: string | null;
  loading: boolean;
}
