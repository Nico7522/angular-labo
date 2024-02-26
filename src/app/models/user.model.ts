export interface UserInfo {
    id: number;
    fullName: string;
    role: string;
    tokenLimitDate: Date
}

export interface User {
    userId: number,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: number,
    role: string,
    isActive: boolean,
    adresses: any[]
}