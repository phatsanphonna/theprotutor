import type { ModalComponent } from "@skeletonlabs/skeleton";
import AppointmentInfo from "./AppointmentInfo.svelte";

export const modalComponentRegistry: Record<string, ModalComponent> = {
  appointmentInfo: {
    ref: AppointmentInfo,
  },
};
