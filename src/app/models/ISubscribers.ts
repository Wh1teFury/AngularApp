interface Login {
  email: string,
  password: string,
}
export interface ISubscriber {
  login?: Login,
  role?: string,
  url?: string,
  id?: string,
  fullname: string,
  address: {
    city: string,
    street: string,
    number: string,
    apartment: string,
  },
  tel: string,
  description: string,
  date: string,
}