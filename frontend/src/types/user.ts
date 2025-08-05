export interface User {
  _id: string
  name: string
  username: string
  email: string
  role: string
}

export interface RegisterUserForm {
  name: string
  username: string
  email: string
  password: string
}

export interface LoginUserForm {
  email: string
  password: string
}
