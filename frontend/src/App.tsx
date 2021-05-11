import { Fragment } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import ProtectedRoute from './components/Protectedroute';
import TopNav from "./components/TopNav";
import UnProtectedRoute from './components/UnprotectedRoute';
import Auth from './pages/Auth/Auth';
import Dashboard from './pages/Dashboard/Dashboard';
import Home from './pages/Home/Home';
import NotFound from './pages/notfound/NotFound';
// import Forgotpassword from './pages/forgotpassword/Forgotpassword';

const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <TopNav />
        <div style={{ marginTop: "60px" }}>
          <Switch>
            <Route exact path="/" component={Home} />
            <UnProtectedRoute exact path="/auth">
              <Auth />
            </UnProtectedRoute>
            <ProtectedRoute exact path="/dashboard">
              <Dashboard />
            </ProtectedRoute>
            <Route exact path='*' component={NotFound} />
            {/* <Route exact path="/forgotpassword" component={Forgotpassword} /> */}
          </Switch>
        </div>
      </BrowserRouter>
    </Fragment>
  );
}

window.addEventListener("close", () => sessionStorage.clear())

export default App