import React from 'react';
import { getToken } from '../_utils/storage_handler';
import { Link } from 'react-router-dom';

const AuthWrapper = (AuthComponent: React.FC): React.ComponentClass => (
    class extends React.Component{
        render(){
            if(validateSession()){
                return(<AuthComponent {...this.props} />);
            } else {
                return(
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px 20px' }}>
                        <span>¡Ingreso no autorizado!</span>
                        <span>Debes iniciar sesión para ingresar</span>
                        <Link to={'/'}>
                            Ir a login
                        </Link>
                    </div>
                );
            }
        }
    }
);

const validateSession = (): Boolean => {
    let token = getToken();
    if(token == null){
        return false;
    }
    return true;
}

export default AuthWrapper;