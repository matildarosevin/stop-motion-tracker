export type ShotStatus =
  | "NotStarted"
  | "SetBuild"
  | "Shooting"
  | "Editing"
  | "SoundDesign"
  | "Done"; //a ShotStatus can only be one of these things 

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
} //a shot object has these properties.
