export const baseUrl = "https://85be-202-28-123-199.ngrok-free.app"
export const baseUrlAPI = baseUrl + '/api/';

//export const userTest = '7f374c43-c519-48b7-8ac7-c2b3565a711c';

export enum SD_Roles {
    ADMIN = "admin",
    CUTOMER = "customer",
}

export enum SD_Status {
    PENDING = "Pending",
    CONFIRMED = "Confirmed",
    BEING_COOKED = "Being Cooked",
    READY_FOR_PICKUP = "Ready for Pickup",
    COMPLETED = "Completed",
    CANCELLED = "Cancelled",
  }