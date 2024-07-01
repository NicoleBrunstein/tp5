import event_enrollmentsRepository from '../repositories/event_enrollments-repository.js';

export default class event_enrollamentsRepository {
  // Clase con lógica de negocio.

  createAsync = async (entity) => {
    const repo = new event_categoriesRepository();
    const returnrowsAffected = await repo.createAsync(entity);
    return returnrowsAffected;
  }
  
  deleteByIdAsync = async (id) => {
    const repo = new event_categoriesRepository();
    const returnrowsAffected = await repo.deleteByIdAsync(id);
    return returnrowsAffected;
  }

  getByLastName = async (id, first_name, last_name,username, attended, rating) => {
    const repo = new event_enrollmentsRepository();
    const returnArray = await repo.getByLastName(id, first_name, last_name,username, attended, rating);
    return returnArray;
  }
}