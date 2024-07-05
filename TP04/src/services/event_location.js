import event_locationsRepository from "../repositories/event_locations-repositry.js";

export default class event_locationService {
  // Clase con lógica de negocio.
  getAllAsync = async () => {
    const repo = new event_locationRepository();
    const returnArray = await repo.getAllAsync();
    return returnArray;
  }
 
  getByIdAsync = async (id) => {
    const repo = new event_locationsRepository();
    const returnEntity = await repo.getByIdAsync(id);
    return returnEntity;

  }
  createAsync = async (entity) => {
    const repo = new event_locationRepository();
    const returnrowsAffected = await repo.createAsync(entity);
    return returnrowsAffected;
  }
  updateAsync = async (entity) => {
    const repo = new event_locationRepository();
    const returnrowsAffected = await repo.updateAsync(entity);
    return returnrowsAffected;
  }
  deleteByIdAsync = async (id_location) => {
    const repo = new event_locationRepository();
    const returnrowsAffected = await repo.deleteByIdAsync(id_location);
    return returnrowsAffected;
  }
}