export type ShotStatus =
  | "NotStarted"
  | "SetBuild"
  | "Shooting"
  | "Editing"
  | "SoundDesign"
  | "Done";

export interface Shot {
  id: number;
  sceneNumber: string;
  shotNumber: string;
  description: string;
  status: ShotStatus;
  assignedAnimator?: string;
  soundNotes?: string;
  frameCount?: number;
  updatedAt: string;
}
