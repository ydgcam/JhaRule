import DocumentCard from './DocumentCard';
import { toOk, isOk, Result, toErr } from '../types/result';
import { JobHazardDocument, JobHazardDocumentError } from '../types/jha';
import { useEffect, useState } from 'react';
import { fetchAllDocuments } from '../services/jha-service';

const DocumentList = (): JSX.Element => {

  const [allDocuments, setAllDocuments] = useState<JobHazardDocument[]>([]);
  
  const getDocuments = async (): Promise<Result<JobHazardDocument[], JobHazardDocumentError>> => {
    const documents = await fetchAllDocuments();
    if (isOk(documents)) {
      return toOk(documents);
    } else {
      return toErr(documents);
    }
  };

  const refreshDocumentList = (): void => {
    getDocuments().then((docs) => {
      if (isOk(docs)) {
        setAllDocuments(toOk(docs));
      }
      else {
        setAllDocuments([]);
      }
    });
  };

  useEffect(() => {
    refreshDocumentList();
  }, []);

  return (
    <>
      {
        allDocuments.map((doc, index) => {
          return (
            <DocumentCard
              key={index.toString()}
              jha={doc}
              refreshCallbackFn={refreshDocumentList}
            />
          );
        })
      }
    </>
  );
};

export default DocumentList;