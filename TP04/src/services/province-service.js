import ProvinceRepository from '../repositories/province-repository.js';

export default class ProvinceService {
  // Clase con lógica de negocio.
  getAllAsync = async () => {
    const repo = new ProvinceRepository();
    const returnArray = await repo.getAllAsync();
    return returnArray;
  }
 
  getByIdAsync = async (id) => {
    const repo = new ProvinceRepository();
    const returnEntity = await repo.getByIdAsync(id);
    return returnEntity;

  }
  createAsync = async (entity) => {
    const repo = new ProvinceRepository();
    const returnrowsAffected = await repo.createAsync(entity);
    return returnrowsAffected;
  }
  updateAsync = async (entity) => {
    const repo = new ProvinceRepository();
    const returnrowsAffected = await repo.updateAsync(entity);
    return returnrowsAffected;
  }
  deleteByIdAsync = async (id) => {
    const repo = new ProvinceRepository();
    const returnrowsAffected = await repo.deleteByIdAsync(id);
    return returnrowsAffected;
  }
}
