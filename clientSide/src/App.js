import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import PasswordManagerUser from './components/PasswordManager';
import NotFound from './components/NotFound';
import RegisterForm from './components/RegisterForm'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LoginForm} />
        <Route exact path="/register" component={RegisterForm} />
        <Route exact path="/user/:userId/details" component={PasswordManagerUser} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
