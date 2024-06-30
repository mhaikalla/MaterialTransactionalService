export interface TransactionalResponse {
    category : string
    price  : number
    stock : number
    description : string
    unit : string
    unit_count : number
  } 

  export interface ErrorResponse {
    code : number
    description : string
  }