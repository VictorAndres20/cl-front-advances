import React from 'react';
import { getRol, getToken } from '../_utils/storage_handler';
import { Link } from 'react-router-dom';
import { roles_paths } from '../pages/roles_paths';

const AuthWrapper = (AuthComponent: React.FC): React.ComponentClass => (
    class extends React.Component{
        render(){
            if(!validateSession()){
                return(
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px 20px' }}>
                        <span>¡Ingreso no autorizado!</span>
                        <span>Debes iniciar sesión para ingresar</span>
                        <Link to={'/'}>
                            Ir a login
                        </Link>
                    </div>
                );
            } else if(!validateAccess()) {
                return(
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px 20px' }}>
                        <span>¡Ingreso no autorizado!</span>
                        <span>Notificación enviada</span>
                    </div>
                );
            } else {
                return(<AuthComponent {...this.props} />);
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

const validateAccess = (): Boolean => {
    const rol = getRol();
    const path = window.location.pathname;
    if(rol === null || rol === undefined || path === null || path === undefined){
        return false;
    }
    
    const rolePath = roles_paths[path];

    // Means this path is not secured
    if(!rolePath) return true;

    return rolePath.includes(rol);
}

export default AuthWrapper;