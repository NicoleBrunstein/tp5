import eventsRepository from "../repositories/events-repository.js";

export default class eventsService {
  // Clase con lógica de negocio.
  getAllAsync = async () => {
    const repo = new eventsRepository();
    const returnArray = await repo.getAllAsync();
    return returnArray;
  }
 

  getByAsync = async (name, category, tags,startDate) => {
    const repo = new eventsRepository();
    const returnArray = await repo.getByAsync(name, category, tags,startDate);
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
  
  updateAsync = async (entity) => {
    const repo = new eventsRepository();
    const returnArray = await repo.updateAsync(entity);
    return returnArray;
  }

  deleteAsync = async (id) => {
    const repo = new eventsRepository();
    const returnArray = await repo.deleteAsync(id);
    return returnArray;
  }

  registrationAsync = async (id) => {
    const repo = new EventRepository();
    const registeredUsers = await repo.registrationAsync(id);
    return registeredUsers;
  }

   ifAlreadyRegistered = async (id) => {
    const repo = new EventRepository();
    const returnArray = await repo.ifAlreadyRegistered(id);
    return returnArray;
  }
}