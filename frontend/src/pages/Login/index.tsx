import React from 'react';
import { Form, Input } from "@iago-srm/nextjs-components.ui.form";
import inputStyles from '../../styles/input.module.css';
import pageStyles from '../../styles/page.module.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Frame, Button } from '../../components';
import { loginSchema } from '../../services/validation';
// import { login } from '../../services';
import Alert from 'react-bootstrap/Alert';
import { AuthContext } from '../../contexts/auth.context';

interface IAlert {
  id?: number;
  message: string;
  variant: "danger" | "success";
}

interface FormValues {
  email: string;
  password: string;
}

const defaultValues = {
  email: '',
  password: ''
}

const Login = (): JSX.Element => {

  const [alerts, setAlerts] = React.useState<IAlert[]>([]);
  const [loading, setLoading] = React.useState(false);
  const { login } = React.useContext(AuthContext);

  const handleAlert = React.useCallback((rawAlert: IAlert) => {
    const id = alerts.length;
    setAlerts(alerts => [...alerts, {
      id,
      message: rawAlert.message,
      variant: rawAlert.variant
    }]);
    setTimeout(() => setAlerts(alerts => alerts.filter(alert => alert.id !== id)), 3000);
  }, [alerts.length, setAlerts]);

  const handleSubmit = async (formData: FormValues) => {
    setLoading(true);
    try{
      await login(formData);
      // handleAlert({
      //   message: response.data,
      //   variant: "success"
      // });
      setLoading(false);
    } catch (error) {
      error.response ? error.response.data.errors.forEach(error => {
        handleAlert({
          message: error.message,
          variant: "danger"
        });
      }) : handleAlert({message: error.message, variant: "danger"});
      setLoading(false);
    }
  }

  const handleAlertClose = (alert: IAlert) => {
    setAlerts(alerts => alerts.filter(a => a.id !== alert.id));
  };

  return (
    <div className={pageStyles.container}>
      <Container>
        <Row>
          <Col>
            {alerts.map((alert, i) => <Alert onClose={() => handleAlertClose(alert)} key={i} variant={alert.variant} dismissible>{alert.message}</Alert>)}
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row >
          <Col xs={{span: 10, offset: 1}} sm={{span: 8, offset: 2}} md={{span: 6, offset: 3}}>
            <Frame>

              <Form defaultValues={defaultValues} onSubmit={handleSubmit} 
              schema={loginSchema} styles={inputStyles} 
              >
                <Input name='email' placeholder="e-mail"/>
                <Input name='password' placeholder="senha"/>
                <Button loading={loading}>Entrar</Button>
              </Form>
            </Frame>
          </Col>
        </Row>
      </Container>
    </div>
  )
};

export default Login;
