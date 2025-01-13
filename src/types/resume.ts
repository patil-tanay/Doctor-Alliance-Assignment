export interface Resume {
  id: number;
  name: string;
  submission_date: string;
  file_name: string;
  upload_date: string;
}

export interface ResumeForm {
  name: string;
  submissionDate: string;
  resume: FileList;
}