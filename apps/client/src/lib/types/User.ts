interface UserAuth {
  email: string
  profilePicture: string
}

export interface User {
  id: string
  userAuthId: string
  studentId: string
  firstname: string
  lastname: string
  nickname: string
  telephoneNumber: string
  guardianTelephoneNumber: string
  userAuth: UserAuth
}