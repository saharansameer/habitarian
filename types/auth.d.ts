export type AuthMode = "sign-in" | "sign-up";

export interface AuthActionState {
  success: boolean;
  email?: string;
  rootError?: string;
  fieldError?: {
    email?: string;
    password?: string;
  };
}