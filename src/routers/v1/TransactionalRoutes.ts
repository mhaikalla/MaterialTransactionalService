import BaseRoutes from "../BaseRoutes";
import validate from "../../middlewares/ValidatorMiddleware";
import { createTransactionalValidator, getTransactionalValidator, updateTransactionalValidator } from "../../validations/TransactionalValidator";
import { TransactionalController } from "../../controllers/TransactionalController";

export class TransactionalRoutes extends BaseRoutes {
  private _TransactionalController: TransactionalController;

  constructor(TransactionalController: TransactionalController) {
    super();
    this._TransactionalController = TransactionalController;
  }


  public routes(): void {
    // this.router.post('/login', this._TransactionalController.login);
    // this.router.post('/logout', this._TransactionalController.logout);
    // this.router.get('/refresh-token', this._TransactionalController.refreshToken);


    this.router.get('/', this._TransactionalController.findAll);
    this.router.get('/:transactional_id', validate(getTransactionalValidator), this._TransactionalController.findById);
    this.router.put('/:transactional_id', validate(updateTransactionalValidator), this._TransactionalController.update);
    this.router.delete('delete', validate(getTransactionalValidator),this._TransactionalController.delete);
    this.router.post('/create',validate(createTransactionalValidator), this._TransactionalController.create);
  }
}
