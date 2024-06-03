import UsersRepository from '../repositories/users-repository.js';

export default class UsersService {
  // Clase con lógica de negocio.
 
  getByUsername = async (entity) => {
    const repo = new UsersRepository();
    const returnEntity = await repo.getByUsername(entity);
    return returnEntity;

  }
  createAsync = async (entity) => {
    const repo = new UsersRepository();
    const returnrowsAffected = await repo.createAsync(entity);
    return returnrowsAffected;
  }
}