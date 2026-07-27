export type SupportedResumeMimeType =
  | "application/pdf"
  | "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export interface UploadedResumeFile {
  originalName: string;
  mimeType: SupportedResumeMimeType;
  size: number;
  buffer: Buffer;
}

export interface ExtractedResumeData {
  fileName: string;
  mimeType: SupportedResumeMimeType;
  size: number;
  text: string;
  characterCount: number;
  wordCount: number;
}
