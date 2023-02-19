import DocumentCard from './DocumentCard';
import { toOk, isOk } from '../types/result';
import { JhaFE } from '../types/jha';
import { useEffect, useState } from 'react';
import { readAll } from '../services/jha-service';
import DocumentForm from './DocumentForm';
import { Stack, Typography } from '@mui/material';

const DocumentList = (): JSX.Element => {

  const [allDocuments, setAllDocuments] = useState<JhaFE[]>([]);
  
  const getDocuments = async (): Promise<JhaFE[]> => {
    const documents = await readAll();
    return isOk(documents) ? toOk(documents) : [];
  };

  const refreshDocumentList = () => { getDocuments().then((docs) => { setAllDocuments(docs) }); };
  
  useEffect(() => { refreshDocumentList(); }, []);

  return (
    <>
      <Stack margin={3} spacing={3}>
        <Typography align='center' variant='h2'>Job Hazard Analysis Documents</Typography>
        <DocumentForm refreshCallBackFn={refreshDocumentList}/>
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