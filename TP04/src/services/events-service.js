import eventsRepository from "../repositories/events-repository.js";

export default class eventsService {
  // Clase con lógica de negocio.
  getAllAsync = async (name, category, tags,startDate) => {
    const repo = new eventsRepository();
    const returnArray = await repo.getAllAsync(name, category, tags,startDate);
    return returnArray;
  }
 
  getByIdAsync = async (id) => {
    const repo = new eventsRepository();
    const returnEntity = await repo.getByIdAsync(id);
    return returnEntity;

  }
  createAsync = async (entity) => {
    const repo = new eventsRepository();
    const returnrowsAffected = await repo.createAsync(entity);
    return returnrowsAffected;
  }
  getByInfo = async (entity) => {
    const repo = new eventsRepository();
    const returnrowsAffected = await repo.getByInfo(entity);
    return returnrowsAffected;
  }
 
}