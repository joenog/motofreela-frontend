export interface State {
  login: {
    isLoggedin: IsLoggedIn;
    error?: string;
    loading: boolean;
  };
}
