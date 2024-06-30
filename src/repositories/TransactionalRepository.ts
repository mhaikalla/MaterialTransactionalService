import {Op} from 'sequelize'
import {
  TransactionalFilter,
  Transactionals
} from '../models'; 
import {
  TransactionalLoginRequest
} from '../models/request'; 
import { TransactionalsTable  } from '../db/sequelize/table';
import {QueryFilter} from '../models/QueryFilter'
export interface ITransactionalRepository {
  findById(id  :number): Promise<Transactionals | null>
  findAll(filter : TransactionalFilter): Promise<Transactionals[]> 
  create(Transactional : Transactionals) : Promise<Transactionals | null>
  delete(id : number) : Promise<boolean> 
  update(Transactional:Transactionals, id : number) : Promise<boolean>
  getLogin(request:TransactionalLoginRequest) : Promise<Transactionals | null>
}


export class TransactionalRepository implements ITransactionalRepository {
  getLogin = async (request:TransactionalLoginRequest): Promise<Transactionals | null> => {
    const result = await TransactionalsTable.findOne({
      where: {
        email: request.email,
        password : request.password
      },
    })
    if(!result) return null
    return result.get({plain : true}) 
  }

  findById = async (id :number): Promise<Transactionals | null> => {
    const result = await TransactionalsTable.findByPk(id)
    if(!result) return null
    return result.get({plain : true})
  };
  findAll = async (filter : TransactionalFilter): Promise<Transactionals[]> => {
    const {keyword, page, limit} = filter
    const offset = limit * (page - 1) 
    let where = {}
    if(keyword){
      where = {
        [Op.or] :{
          title :{ [Op.like] : keyword},
          description :{ [Op.like] : keyword},
        }
      }
    }
    const result = await  TransactionalsTable.findAll({
      where,
      limit,
      offset
    })
    if(result.length == 0) return []

    return result.map(m => m.get({plain : true}))
  };
  create = async(Transactional : Transactionals) : Promise<Transactionals | null> => {
    try{
      const result = await TransactionalsTable.create(Transactional)
      return result.get({plain : true})
    }
    catch(ex)
    {
      
      return null
    }
  }
  update = async(Transactional:Transactionals, id : number) : Promise<boolean> => {
    try{
      await TransactionalsTable.update(Transactional, {where: {id}})
      return true 
    }
    catch(ex){
      return false
    }
  }
  delete = async(id : number) : Promise<boolean> => {
    try{
      await TransactionalsTable.destroy({where: {id}})
      return true
    }
    catch(ex){
      return false
    }
  }
}
