export interface LoginForm {
    email: string;
    password: string;
}

export interface RegisterForm {
    firstName: string;
    lastName: string;
    phoneNumber: number;
    email: string;
    password: string;
}

export interface TokenResponse {
    token: string;
}