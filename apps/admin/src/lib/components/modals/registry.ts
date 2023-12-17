import type { ModalComponent } from "@skeletonlabs/skeleton";
import DisplayPlaylist from './DisplayPlaylist.svelte';

export const modalComponentRegistry: Record<string, ModalComponent> = {
  addVideoToPlaylist: {
    ref: DisplayPlaylist,
  },
};
