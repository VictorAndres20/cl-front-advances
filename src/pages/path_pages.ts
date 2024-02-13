interface PathType {
    path: string,
    full_path: string
};

export const login_page_path: PathType = {
    path: '',
    full_path: `/`,
}

export const login_admin_path: PathType = {
    path: 'admin-login',
    full_path: `/admin-login`,
}

/**
 * Admin section
 */
export const admin_path: PathType = {
    path: 'admin',
    full_path: `/admin`,
}

export const enterprises_path: PathType = {
    path: 'enterprises',
    full_path: `${admin_path.full_path}/enterprises`,
}

export const users_path: PathType = {
    path: 'users',
    full_path: `${admin_path.full_path}/users`,
}

export const ranges_path: PathType = {
    path: 'ranges',
    full_path: `${admin_path.full_path}/ranges`,
}

export const amounts_path: PathType = {
    path: 'amounts',
    full_path: `${admin_path.full_path}/amounts`,
}

export const employees_path: PathType = {
    path: 'employees',
    full_path: `${admin_path.full_path}/employees`,
}

export const advances_inbox_path: PathType = {
    path: 'advances-inbox',
    full_path: `${admin_path.full_path}/advances-inbox`,
}

export const advances_path: PathType = {
    path: 'advances',
    full_path: `${admin_path.full_path}/advances`,
}

/**
 * Employee section
 */
export const content_path: PathType = {
    path: 'content',
    full_path: `/content`,
}

export const advance_path: PathType = {
    path: 'advance',
    full_path: `${content_path.full_path}/advance`,
}

export const history_path: PathType = {
    path: 'history',
    full_path: `${content_path.full_path}/history`,
}

// More paths