import { Box, CircularProgress } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export type FeedbackImgType = 'loading' | 'alert' | 'success';

const feedbackComponents: { [key in FeedbackImgType]: JSX.Element } = {
  loading: (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress color="primary" />
    </Box>
  ),
  alert: <InfoIcon color="warning" fontSize="large" />,
  success: <CheckCircleIcon color="success" fontSize="large" />
};

interface FeedbackComponentProps {
  feedbackImg: FeedbackImgType;
}

const FeedbackComponent: React.FC<FeedbackComponentProps> = ({ feedbackImg }) => {
  return feedbackComponents[feedbackImg] || feedbackComponents.success;
};

export default FeedbackComponent;
