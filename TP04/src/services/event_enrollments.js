import event_enrollamentsRepository from '../repositories/event_enrollments-repository';

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
}