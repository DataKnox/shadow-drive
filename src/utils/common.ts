import { PublicKey } from "@solana/web3.js";
/**
 * Returns true if being run inside a web browser,
 * false if in a Node process
 */
export const isBrowser =
  process.env.SHDW_BROWSER ||
  (typeof window !== "undefined" && !window.process?.hasOwnProperty("type"));

export const programAddress = new PublicKey(
  "2e1wdyNhUvE76y6yUCvah2KaviavMJYKoRun8acMRBZZ"
);
export const tokenMint = new PublicKey(
  "SHDWyBxihqiCj6YekG2GUr7wqKLeLAMK1gHZck9pL6y"
);
export const uploader = new PublicKey(
  "972oJTFyjmVNsWM4GHEGPWUomAiJf2qrVotLtwnKmWem"
);
export const emissions = new PublicKey(
  "SHDWRWMZ6kmRG9CvKFSD7kVcnUqXMtd3SaMrLvWscbj"
);
export const SHDW_DRIVE_ENDPOINT = "https://shadow-storage.genesysgo.net";
