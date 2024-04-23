import { Container } from 'inversify';
import ioCTypes from './ioCTypes';
import { ITransactionHandlerService, TransactionHandlerService } from '../services/handler/transaction/TransactionHandlerService';
import { IMetadataHandlerService, MetadataHandlerService } from '../services/handler/MetadataHandlerService';
import { IUserHandlerService, UserHandlerService } from '../services/handler/user/UserHandlerService';

const container = new Container();
//Services
container.bind<IUserHandlerService>(ioCTypes.IUserHandlerService).to(UserHandlerService);
container.bind<ITransactionHandlerService>(ioCTypes.ITransactionHandlerService).to(TransactionHandlerService);
container.bind<IMetadataHandlerService>(ioCTypes.IMetadataHandlerService).to(MetadataHandlerService);

export default container;
