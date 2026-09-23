//Union Types (TypeScript catches typos)
//Optional fields can be null or undefined
//Exactly matches C# Shot class


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
  assignedAnimator?: string; //optional
  soundNotes?: string; //optional
  frameCount?: number; //optional
  updatedAt: string; //ISO datetime string 
} //a shot object has these properties.
