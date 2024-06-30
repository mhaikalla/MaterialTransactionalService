import { QueryFilter,QueryFilterParam } from "./QueryFilter"

export interface Transactionals extends BaseEntity {
  name : string,
  user_id : number,
  vendor_user_id : number,
  material_id : number,
  status : number,
} 


export interface BaseEntity {
  id  :  number,
  created_at : Date,
  updated_at : Date,
  deleted_at : Date | null
}

export class TransactionalFilter extends QueryFilter<Transactionals> {
  name? :  string | null
  user_id? :  string | null
  vendor_user_id?:   string | null
  material_id? :  string | null
  status? :  string | null
  constructor(
    filter: QueryFilterParam<Transactionals>,
    name? : string,
    user_id? : string,
    vendor_user_id?:  string,
    material_id?: string,
    status? : string
  ) {
    super(filter);
    this.name = name ? String(name) : null,
    this.user_id = user_id ? String(user_id) : null,
    this.vendor_user_id = vendor_user_id ? String(vendor_user_id) : null,
    this.material_id = material_id ? String(material_id) : null,
    this.status = status ? String(status) : null
  }
}

