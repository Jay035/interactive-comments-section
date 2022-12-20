import { Navigate } from 'react-router-dom';
// import { UserAuth } from '../context/AuthContext';
import { auth } from '../config/firebase';

export default function ProtectedRoute({children}) {
    // const { user } = UserAuth();

    if(auth.currentUser){
        return <Navigate to="/login" />
    }
  return children;
}
