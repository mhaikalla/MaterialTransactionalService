import BaseRoutes from "../BaseRoutes";
import { TransactionalService } from "../../services/TransactionalService";
import { TransactionalController } from "../../controllers/TransactionalController";
import { TransactionalRoutes } from "./TransactionalRoutes";
import { TransactionalRepository } from "../../repositories/TransactionalRepository";


//Menu CRM total
const transactionalRepository = new TransactionalRepository();
const transactionalService = new TransactionalService(transactionalRepository);
const transactionalController = new TransactionalController(transactionalService);
const transactionalRoutes = new TransactionalRoutes(transactionalController);
transactionalRoutes.routes();
//End menu CRM total

export class ApiV1 extends BaseRoutes {
    constructor() {
        super()
    }
    
    
    public routes(): void {
        const appname = String(process.env.APP_NAME) ?? 'transactional_managements'
        this.router.use(`/v1/${appname}`, transactionalRoutes.router)
    }
}
