import { SD_Status } from "./SD";
import { COLORS } from "./theme";

const getStatusColor = (status: SD_Status) => {
  return status === SD_Status.CONFIRMED
    ? COLORS.primary
    : status === SD_Status.PENDING
    ? COLORS.secondary
    : status === SD_Status.CANCELLED
    ? COLORS.red
    : status === SD_Status.COMPLETED
    ? COLORS.green
    : status === SD_Status.BEING_COOKED
    ? COLORS.tertiary
    : status === SD_Status.READY_FOR_PICKUP && "warning";
};

export default getStatusColor;