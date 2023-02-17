import { Card, CardContent, CardActions, Collapse, CardHeader } from '@mui/material';
import { useState } from 'react';
import { JobHazardDocument } from '../types/jha';
import { ConfirmationDialog } from './Inputs';
import { CardStyles, DeleteButton, EditButton, ExpandMoreComp, AlertDialog } from './Inputs';
import { useNavigate } from 'react-router-dom';
import { StringFunctions } from '../types/utils';
import DocumentDataView from './DocumentDataView';
import { isOk } from '../types/result';
import StepList from './StepList';
import { deleteJobHazardDocument } from '../services/jha-service';

interface DocumentCardProps {
  key: string,
  jha: JobHazardDocument,
  refreshCallbackFn: () => void;
}

const DocumentCard = (props: DocumentCardProps): JSX.Element => {

  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [alertDetails, setAlertDetails] = useState<string | null>(null);

  //TODO
  const handleEdit = () => { setIsEdit(true); }
  const handleDelete = () => { setOpenDeleteModal(true); }

  return (
    <>
      <Card sx={CardStyles.card}>
        <CardHeader title={props.jha.title} subheader={'Author: ' + StringFunctions.formatName(props.jha.author)}/>
        <CardContent sx={CardStyles.cardContentCard}>
          <DocumentDataView values={props.jha}/>
          <Collapse in={expanded} timeout='auto' unmountOnExit sx={CardStyles.collapse}>
            <StepList jha={props.jha}/>
          </Collapse>
        </CardContent>
        <CardActions>
          <EditButton fn={handleEdit} text={'this job hazard analysis document'}/>
          <DeleteButton fn={handleDelete} text={'this job hazard analysis document'}/>
          <ExpandMoreComp expand={expanded} onClick={() => {setExpanded(!expanded);}} aria-expanded={expanded}/>
        </CardActions>
      </Card>
      <ConfirmationDialog 
        title={'Delete Document'}
        text={'Are you sure you want to delete this document?'}
        isSubmitting={isSubmitting}
        open={openDeleteModal}
        closeFn={() => setOpenDeleteModal(false)}
        action={() => { 
          setSubmitting(true);
          deleteJobHazardDocument(props.jha.uid).then((res) => {
            setSubmitting(false);
            if (isOk(res)) {
              props.refreshCallbackFn(); 
            }
            setOpenDeleteModal(false);
          });
        }}/>
      <AlertDialog
        title={'Error occured deleting document'} 
        details={alertDetails || ''} 
        open={alertDetails !== null} 
        onClose={() => setAlertDetails(null)}
      />
    </>
  );
};

export default DocumentCard; 