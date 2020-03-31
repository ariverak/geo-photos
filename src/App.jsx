import React,{ lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Layout from 'layout';
import useLocalstorage from '@rooks/use-localstorage';
import Loading from 'components/shared/Loading';
import { ToastProvider } from 'react-toast-notifications'

export const AuthContext = React.createContext('auth');

const LoginPage = lazy( ()=> import('./pages/LoginPage'));
const HomePage = lazy( ()=> import('./pages/HomePage'));
const PhotosPage = lazy( ()=> import('./pages/PhotosPage'));
const ConfigurationPage = lazy( ()=> import('./pages/HomePage'));

function App() {
  const { value : token, set: setToken, remove: removeToken } = useLocalstorage('accessToken', '');
  const { value : refreshToken, set: setRefreshToken, remove: removeRefreshToken } = useLocalstorage('refreshToken', '');

  let routes = (
    <Switch>
      <Suspense fallback={<Loading />}>
        <Route path="/" exact component={LoginPage} />
        <Redirect to="/" />
      </Suspense>
    </Switch>
  );

  if(token){
    routes = (
      <Switch>
        <Layout>
          <Suspense fallback={<Loading />}>
            <Route path="/" exact component={HomePage} />
            <Route path="/fotos" component={PhotosPage} />
            <Route path="/configuracion" component={ConfigurationPage} />
            <Redirect to="/" />
          </Suspense>
        </Layout>
      </Switch>
    );
  }
  return (
      <AuthContext.Provider value={{ 
          token, setToken, removeToken,
          refreshToken, setRefreshToken, removeRefreshToken
        }}>
          <ToastProvider autoDismissTimeout={2200}>
            <Router>
              {/* <StrictMode> */}
                { routes }
              {/* </StrictMode> */}
            </Router>
          </ToastProvider>
      </AuthContext.Provider>
  );
}

export default App;
