import { JobHazardDocument, JobHazardDocumentError } from "../types/jha";
import { Result } from "../types/result";

/**
 * Needs work
 * @returns 
 */
export async function fetchAllDocuments(): 
  Promise<Result<JobHazardDocument[], JobHazardDocumentError>> {
    let ans: JobHazardDocument[] = [];
    try {
      const res = await fetch('http://localhost:8000/api/jhas/');
      const jhasObj = await res.json();
      const jhasDocs = JSON.parse(jhasObj);
      for (const obj of jhasDocs) {
        ans.push(obj as JobHazardDocument);
      }
      return ans; 
    } catch (e) {
      return new JobHazardDocumentError('fetchAllJhas', 'document-not-found');
    }
}
