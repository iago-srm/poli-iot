import React from 'react';
import { Form } from "@iago-srm/nextjs-components.ui.form";
import { Input } from "@iago-srm/nextjs-components.ui.form-input";
import inputStyles from '../../styles/input.module.css';
import pageStyles from '../../styles/page.module.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Frame, Button, Alerts } from '../../components';
import { loginSchema } from '../../services/validation';
// import Alert from 'react-bootstrap/Alert';
import { AuthContext } from '../../contexts/auth.context';

interface FormValues {
  email: string;
  password: string;
}

const defaultValues = {
  email: '',
  password: ''
}

const success = {
  status: 200,
  message: "Login realizado com sucesso!"
};

const Login = (): JSX.Element => {

  // const [alerts, setAlerts] = React.useState<IAlert[]>([]);
  const { login, loginLoading, loginErrors, loginResponse } = React.useContext(AuthContext);

  // const handleAlert = React.useCallback((rawAlert: IAlert) => {
  //   const id = alerts.length;
  //   setAlerts(alerts => [...alerts, {
  //     id,
  //     message: rawAlert.message,
  //     variant: rawAlert.variant
  //   }]);
  //   setTimeout(() => setAlerts(alerts => alerts.filter(alert => alert.id !== id)), 5000);
  // }, [alerts.length, setAlerts]);

  const handleSubmit = React.useCallback(async (formData: FormValues) => {
    await login(formData);
    // if(errors.status) {
    //   errors.errors.forEach(error => {
    //     setAlerts(alerts => [...alerts, {
    //       message: `(${errors.status}) ${error.message}`,
    //       variant: "danger"
    //     }]);
    //   });
    // } else {
    //   setAlerts(_ => [{
    //     message: `(${response.status}) `,
    //     variant: "danger"
    //   }])
    // }
  }, [login]);

  return (
    <div className={pageStyles.totalCenterContainer}>
      <h2>Acesse sua conta</h2>
      <Container>
        <Row>
          <Col>
            <Alerts errors={loginErrors} success={loginResponse ?  success : undefined}/>
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row >
          <Col xs={{ span: 10, offset: 1 }} sm={{ span: 8, offset: 2 }} md={{ span: 6, offset: 3 }}>
            <Frame>
              <Form defaultValues={defaultValues} onSubmit={handleSubmit}
                schema={loginSchema} styles={inputStyles}
              >
                <Input name='email' placeholder="e-mail" />
                <Input name='password' placeholder="senha" />
                <Button loading={loginLoading}>Entrar</Button>
              </Form>
            </Frame>
          </Col>
        </Row>
      </Container>
    </div>
  )
};

export default Login;