import locationRepository from '../repositories/location-repository.js';

export default class locationService {
  // Clase con lógica de negocio.
  getAllAsync = async () => {
    const repo = new locationRepository();
    const returnArray = await repo.getAllAsync();
    return returnArray;
  }
 
  getByIdAsync = async (id) => {
    const repo = new locationRepository();
    const returnEntity = await repo.getByIdAsync(id);
    return returnEntity;

  }

  getByLocation = async (id) => {
    const repo = new locationRepository();
    const returnEntity = await repo.getByLocation(id);
    return returnEntity;

  }
  
}