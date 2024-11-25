import event_enrollmentsRepository from '../repositories/event_enrollments-repository.js';

export default class event_enrollamentsRepository {
  // Clase con lógica de negocio.

  createAsync = async (entity) => {
    const repo = new event_enrollmentsRepository();
    const returnrowsAffected = await repo.createAsync(entity);
    return returnrowsAffected;
  }
  
  deleteByIdAsync = async (id) => {
    const repo = new event_enrollmentsRepository();
    const returnrowsAffected = await repo.deleteByIdAsync(id);
    return returnrowsAffected;
  }

  getByLastName = async (id, first_name, last_name,username, attended, rating) => {
    const repo = new event_enrollmentsRepository();
    const returnArray = await repo.getByLastName(id, first_name, last_name,username, attended, rating);
    return returnArray;
  }

  updateAsync = async (eventId, entity, rating) => {
    const repo = new event_enrollamentsRepository();
    const returnArray = await repo.updateAsync(eventId, entity, rating);
    return returnArray;
  }

  getByEventId = async (id_event, first_name, last_name, username, attended, rating) => {
    const repo = new event_enrollmentsRepository();
    const response = await repo.getByEventId(id_event, first_name, last_name, username, attended, rating);
    if (response === null) {
        return [{ success: false, message: 'No existe un evento con ese ID' }, 404];
    }
    
    return response.length > 0
        ? [{ success: true, response: response }, 200]
        : [{ success: false, message: 'No existe un evento con ese ID' }, 404];
}
}