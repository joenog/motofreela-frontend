interface IsLoggedIn {
  loginRequest?: {
    email: string;
    password: string;
    business: boolean;
  };
  isLoggedIn?: boolean;
  user?: {
    id?: number;
    name: string;
    email: string;
    business: boolean;
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
