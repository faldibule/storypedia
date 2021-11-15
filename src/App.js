import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useReducer } from 'react';
import { UserContext } from './Context/UserContext'
import { UserReducer } from './Reducer/UserReducer'
import { NavbarComponent } from './Component/Reuse/NavbarComponent';
import { Login } from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Welcome from './Pages/Welcome';
import NotFoundPage from './Pages/NotFoundPage';
import MainApp from './Pages/MainApp/MainApp';

function App() {
  const [state, dispatch] = useReducer(UserReducer.reducer, UserReducer.initialize)

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userState: state, userDispatch: dispatch }}>
      <NavbarComponent />
        <Switch>
        
          <Route exact path="/" component={Welcome} />
          <Route exact path="/home" component={MainApp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route path="*" component={NotFoundPage} />

        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
