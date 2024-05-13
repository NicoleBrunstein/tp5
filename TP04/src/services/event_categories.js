import event_categoriesRepository from '../repositories/event_categories-repository.js';

export default class event_categoriesService {
  // Clase con lógica de negocio.
  getAllAsync = async () => {
    const repo = new event_categoriesRepository();
    const returnArray = await repo.getAllAsync();
    return returnArray;
  }
 
  getByIdAsync = async (id) => {
    const repo = new event_categoriesRepository();
    const returnEntity = await repo.getByIdAsync(id);
    return returnEntity;

  }
  createAsync = async (entity) => {
    const repo = new event_categoriesRepository();
    const returnrowsAffected = await repo.createAsync(entity);
    return returnrowsAffected;
  }
  updateAsync = async (entity) => {
    const repo = new event_categoriesRepository();
    const returnrowsAffected = await repo.updateAsync(entity);
    return returnrowsAffected;
  }
  deleteByIdAsync = async (id) => {
    const repo = new event_categoriesRepository();
    const returnrowsAffected = await repo.deleteByIdAsync(id);
    return returnrowsAffected;
  }
}