import React from 'react';
import { ApiError } from '../services/api/api-call.hook';
import Alert from 'react-bootstrap/Alert';

interface AlertsProps {
  errors?: ApiError;
  success?: {
    status: number;
    message: string;
  }
}


export const Alerts: React.FC<AlertsProps> = ({errors, success}) => {

  const [displayedAlerts, setDisplayedAlerts] = React.useState([]);
  const counter = React.useRef(0);

  const handleAlerts = React.useCallback((id: number, message: string, status: number, variant: string) => {
    setDisplayedAlerts(alerts => [...alerts, {
      message: `(${status}) ${message}`,
      variant,
      id
    }]);
    setTimeout(() => {
      setDisplayedAlerts(alerts => alerts.filter(alert => alert.id !== id))
    }, 8000);
  }, [setDisplayedAlerts]);
  
  React.useEffect(() => {
    if(errors.status) {
      for(const e of errors.errors) {
        handleAlerts(counter.current, e.message, errors.status, "danger");
        counter.current++;
      }
    }
  }, [errors.errors]);

   React.useEffect(() => {
    if (success) {
      handleAlerts(counter.current, success.message, success.status, "success");
      counter.current++;
    }
  }, [success]);

  const handleAlertClose = (id: number) => () => {
    setDisplayedAlerts(alerts => alerts.filter(a => a.id !== id));
  }
  
  return (
    <>
      {displayedAlerts.map((alert,i) => <Alert key={i} onClose={handleAlertClose(alert.id)} variant={alert.variant} dismissible >{alert.message}</Alert>)}
    </>
  )
}