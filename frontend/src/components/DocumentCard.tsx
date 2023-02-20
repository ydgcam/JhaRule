import { Card, CardContent, CardActions, Collapse, CardHeader } from '@mui/material';
import { useState } from 'react';
import { JhaFE } from '../types/jha';
import { ConfirmationDialog, DoButton } from './Inputs';
import { CardStyles, DeleteButton, ExpandMoreComp, AlertDialog } from './Inputs';
import { StringFunctions } from '../types/utils';
import DocumentDataView from './DocumentDataView';
import { isOk } from '../types/result';
import StepList from './StepList';
import { deleteJha } from '../services/jha-service';
import DocumentForm from './DocumentForm';

interface DocumentCardProps {
  key: string,
  jha: JhaFE,
  refreshCallbackFn: () => void;
}

const DocumentCard = (props: DocumentCardProps): JSX.Element => {

  const [dataExpanded, setdataExpanded] = useState(false);
  const [stepsExpanded, setStepsExpanded] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [alertDetails, setAlertDetails] = useState<string | null>(null);
  
  const handleDelete = () => { setOpenDeleteModal(true); }
  const doDelete = () => { 
    setSubmitting(true);
    deleteJha(props.jha.uid).then((res) => {
      setSubmitting(false);
      if (isOk(res)) {
        props.refreshCallbackFn(); 
      }
      setOpenDeleteModal(false);
    });
  }

  return (
    <>
      <Card sx={CardStyles.card}>
        <CardHeader title={props.jha.title} subheader={'Author: ' + StringFunctions.formatName(props.jha.author)}
          action={<ExpandMoreComp expand={dataExpanded} onClick={() => setdataExpanded(!dataExpanded)}/>}
        />
        <Collapse in={dataExpanded} timeout='auto' unmountOnExit sx={CardStyles.collapse}>
          <CardContent sx={CardStyles.cardContentCard}>
            <DocumentDataView values={props.jha}/>
          </CardContent>
        </Collapse>
        <CardActions>
          <DoButton text={stepsExpanded ? 'Hide Steps' : 'Show Steps'} fn={() => setStepsExpanded(!stepsExpanded)}/>
          <DocumentForm jha={props.jha} refreshCallbackFn={props.refreshCallbackFn}/>
          <DeleteButton fn={handleDelete} text={'this job hazard analysis document'}/>
        </CardActions>
        <Collapse in={stepsExpanded} timeout='auto' unmountOnExit sx={CardStyles.collapse}>
          <CardContent sx={CardStyles.cardContentCollapse}>
            <StepList jha={props.jha} refreshCallbackFn={props.refreshCallbackFn}/>
          </CardContent>
        </Collapse>
      </Card>

      <ConfirmationDialog title={'Delete Job Hazard Analysis'} isSubmitting={isSubmitting} open={openDeleteModal}
        text={'Are you sure you want to delete this Job Hazard Analysis?'}
        closeFn={() => setOpenDeleteModal(false)} action={doDelete}
      />

      <AlertDialog title={'Error occured deleting document'} details={alertDetails || ''} 
        open={alertDetails !== null} onClose={() => setAlertDetails(null)}
      />
    </>
  );
};

export default DocumentCard; 