import DocumentCard from './DocumentCard';
import { toOk, isOk } from '../types/result';
import { JobHazardDocument } from '../types/jha';
import { useEffect, useState } from 'react';
import { fetchAllDocuments } from '../services/jha-service';
import DocumentDataForm from './DocumentDataForm';
import { Stack, Typography } from '@mui/material';

const DocumentList = (): JSX.Element => {

  const [allDocuments, setAllDocuments] = useState<JobHazardDocument[]>([]);
  
  const getDocuments = async (): Promise<JobHazardDocument[]> => {
    const documents = await fetchAllDocuments();
    return isOk(documents) ? toOk(documents) : [];
  };

  const refreshDocumentList = () => { getDocuments().then((docs) => { setAllDocuments(docs) }); };
  
  useEffect(() => { refreshDocumentList(); }, []);

  return (
    <>
      <Stack margin={3} spacing={3}>
        <Typography align='center' variant='h2'>Job Hazard Analysis Documents</Typography>
        <DocumentDataForm refreshCallBackFn={refreshDocumentList}/>
      </Stack>
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