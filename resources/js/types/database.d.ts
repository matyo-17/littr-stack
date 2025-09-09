export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    roles?: Role[];
    [key: string]: unknown;
}

export interface Role {
    id: string;
    name: string;
    permissions?: Permission[];
    [key: string]: unknown;
}

export interface Permission {
    id: string;
    name: string;
    group?: string;
    [key: string]: unknown;
}
