import { EntityManager } from "@mikro-orm/postgresql";
import { VehicleController } from "./api/controllers/vehicle.controller";
import { IVehicleRepository } from "./application/repositories/vehicle.repository";
import { VehiclePgRepository } from "./data/mikro-orm/repositories/vehicle.pg.repository";
import { CreateVehicleUseCase } from "./application/usecases/create-vehicle.usecase";
import { UpdateVehicleUseCase } from "./application/usecases/update-vehicle.usecase";
import { DetailVehicleUseCase } from "./application/usecases/detail-vehicle.usecase";
import { VehicleLogPgRepository } from "./data/mikro-orm/repositories/vehicle-log.pg.repository";
import { IVehicleLogRepository } from "./application/repositories/vehicle-log.repository";
import { ListVehicleUseCase } from "./application/usecases/list-vehicle.usecase";
import { IUserRepository } from "@/users/application/repositories/user.repository";
import { UserPgRepository } from "@/users/data/mikro-orm/repositories/user.pg.repository";
import { ToggleActiveVehicleUseCase } from "./application/usecases/toggle-vehicle-active.usecase";
import { ListVehicleLogUseCase } from "./application/usecases/list-vehicle-log.usecase";
import { VehicleHistoryController } from "./api/controllers/vehicle-history.controller";
import { GetVehicleStatusSummaryUseCase } from "./application/usecases/get-vehicle-status-summary.usecase";
import { DeleteVehicleUseCase } from "./application/usecases/delete-vehicle.usecase";

export interface VehicleModuleDependencies {
  vehicleController: VehicleController;
  vehicleHistoryController: VehicleHistoryController;
}

export const createVehicleModule = (
  em: EntityManager
): VehicleModuleDependencies => {
  // Repositories
  const userRepository: IUserRepository = new UserPgRepository(em);
  const vehicleRepository: IVehicleRepository = new VehiclePgRepository(em);
  const vehicleLogRepository: IVehicleLogRepository =
    new VehicleLogPgRepository(em);

  // UseCases
  const createVehicleUseCase = new CreateVehicleUseCase(
    userRepository,
    vehicleRepository,
    vehicleLogRepository
  );
  const detailVehicleUseCase = new DetailVehicleUseCase(vehicleRepository);
  const listVehicleUseCase = new ListVehicleUseCase(vehicleRepository);
  const getVehicleStatusSummaryUseCase = new GetVehicleStatusSummaryUseCase(
    vehicleRepository
  );
  const updateVehicleUseCase = new UpdateVehicleUseCase(
    userRepository,
    vehicleRepository,
    vehicleLogRepository
  );
  const toggleActiveVehicleUseCase = new ToggleActiveVehicleUseCase(
    userRepository,
    vehicleRepository,
    vehicleLogRepository
  );
  const deleteVehicleUseCase = new DeleteVehicleUseCase(
    userRepository,
    vehicleRepository,
    vehicleLogRepository
  );
  const listVehicleLogUseCase = new ListVehicleLogUseCase(vehicleLogRepository);

  // Controllers
  const vehicleController = new VehicleController(
    createVehicleUseCase,
    detailVehicleUseCase,
    listVehicleUseCase,
    getVehicleStatusSummaryUseCase,
    updateVehicleUseCase,
    toggleActiveVehicleUseCase,
    deleteVehicleUseCase
  );
  const vehicleHistoryController = new VehicleHistoryController(
    listVehicleLogUseCase
  );

  return {
    vehicleController,
    vehicleHistoryController,
  };
};
