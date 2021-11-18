import React, {
  createContext,
  useState,
  useContext,
} from "react";
import PropTypes from "prop-types";


export const AuthContext = createContext(null);

const initialState = {
  isLoggedIn: false,
  isLoginPending: false,
  loginError: null,
  user: { userid: null },
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(initialState);


  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
