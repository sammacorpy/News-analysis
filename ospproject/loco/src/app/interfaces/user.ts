export interface User{
    uid: string,
    email: string,
    displayName?: string,
    photoURL?: string;
    somethingCustom?: string;
    isAnonymous?:boolean;
}