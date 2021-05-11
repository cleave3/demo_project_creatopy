import { Redirect, Route } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

const ProtectedRoute = (props) => {

    const { auth } = useAppSelector((state) => state.user);
    if (!auth) {
        return (
            <Route {...props}>
                <Redirect to={`/auth`} />
            </Route>
        )
    } else {
        return <Route {...props}>{props.children}</Route>
    }
};

export default ProtectedRoute;