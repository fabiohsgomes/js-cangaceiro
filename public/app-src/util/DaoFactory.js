import {ConnectionFactory} from './ConnectionFactory.js';
import {NegociacaoDao} from '../domain/negociacao/NegociacaoDao.js';

export let DaoFactory = {
    async getNegociacaoDao(){
        return await ConnectionFactory.getConnection().then(conn => new NegociacaoDao(conn));
    }
}