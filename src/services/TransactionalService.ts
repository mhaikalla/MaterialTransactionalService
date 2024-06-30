import { TransactionalFilter, Transactionals } from '../models/index';
import { v4 as uuidv4 } from 'uuid';
import { ITransactionalRepository } from '../repositories/TransactionalRepository'
import {QueryFilter} from '../models/QueryFilter'
import { HttpResponse } from '../utils/ApiJsonResponse';
import { ControllerBase } from '../controllers/ControllerBase';

export interface ITransactionalService {
  findAllTransactional(filter : TransactionalFilter): Promise<[Transactionals[], HttpResponse | null]>
  findTransactionalById(id :number): Promise<[Transactionals | null, HttpResponse | null]>
  create(Transactional :Transactionals): Promise<[Transactionals | null, HttpResponse | null]>
  update(Transactional: Transactionals, id:number): Promise<[boolean, HttpResponse | null]>
  delete(id : number): Promise<[boolean, HttpResponse | null]>
}

export class TransactionalService implements ITransactionalService {
  private _TransactionalRepository: ITransactionalRepository;
  
  constructor(
    TransactionalRepository: ITransactionalRepository,
  ) {
    this._TransactionalRepository = TransactionalRepository
  }


  findAllTransactional = async (filter : TransactionalFilter): Promise<[Transactionals[], HttpResponse | null]> => {
    const result = this._TransactionalRepository.findAll(filter)
    if (result != null) {
      let err : HttpResponse = {
        message : "transactional not found",
        code  :404,
      }
      return [[], err] 
    }
    return [result, null]
  }

  findTransactionalById = async (id :number):  Promise<[Transactionals | null, HttpResponse | null]> => {
    const result = this._TransactionalRepository.findById(id)
    if (result != null) {
      let err : HttpResponse = {
        message : "transactional not found",
        code  :404,
      }
      return [null, err] 
    }
    return [result, null]
  }
  create = async (Transactional :Transactionals): Promise<[Transactionals | null, HttpResponse | null]> => {
    const result = this._TransactionalRepository.create(Transactional)
    if (result != null) {
      let err : HttpResponse = {
        message : "Create Transactional Failed",
        code  :500,
      }
      return [null, err] 
    }
    return [result, null]
  }

  update = async (Transactional: Transactionals, id : number): Promise<[boolean, HttpResponse | null]> => {
    let resp : HttpResponse 
    let currentData = await this._TransactionalRepository.findById(id)
    if(!currentData)
    {
      resp = {
        message : "Transactional Not Found",
        code  :404,
      }
      return [false, resp] 
    }
    else{
      currentData = {...Transactional}
      const result = await this._TransactionalRepository.update(currentData,id)
      if (!result) {
        resp = {
          message : "update Transactional failed",
          code  :500,
        }
        return [false, resp] 
      }
      return [result, null]
    }
  }
  delete = async (id : number):Promise<[boolean, HttpResponse | null]> => {
    let err : HttpResponse 
    let currentData = await this._TransactionalRepository.findById(id)
    if(!currentData)
    {
      err = {
        message : "Transactional not Found",
        code  :404,
      }
      return [false, err] 
    }
    else{
      const result = await this._TransactionalRepository.delete(id)
      return [true, null] 
    }
  }
}
