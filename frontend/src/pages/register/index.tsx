import React from 'react';
import { Form } from "@iago-srm/nextjs-components.ui.form";
import { Input } from "@iago-srm/nextjs-components.ui.form-input";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import inputStyles from '../../styles/input.module.css';
import pageStyles from '../../styles/page.module.css';

import { Frame, Button, Alerts } from '../../components';
import { registerSchema } from '../../services/validation';
import { register } from '../../services';
import { useApiCall } from '../../services';

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const defaultValues = {
  email: '',
  password: ''
}

const success = {
  status: 200,
  message: "Cadastro realizado com sucesso!"
};

const Cadastro = (): JSX.Element => {

  const { apiCall, errors, loading, response } = useApiCall(register);

  const handleSubmit = React.useCallback(async (formData: FormValues) => {
    console.log(formData);
    await apiCall(formData);
  },[apiCall]);

  return (
    <div className={pageStyles.totalCenterContainer}>
      <h2>Crie uma nova conta</h2>
      <Container>
        <Row>
          <Col>
            <Alerts errors={errors} success={response ? success : undefined}/>
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row>
          <Col xs={{ span: 10, offset: 1 }} sm={{ span: 8, offset: 2 }} md={{ span: 6, offset: 3 }}>
            <Frame>
              <Form defaultValues={defaultValues} onSubmit={handleSubmit}
                schema={registerSchema} styles={inputStyles}
              >
                <Input name='email' placeholder="E-mail" />
                <Input name='password' placeholder="Senha" />
                <Input name='confirmPassword' placeholder="Confirme a senha" />
                <Button loading={loading}>Cadastrar</Button>
              </Form>
            </Frame>
          </Col>
        </Row>
      </Container>
    </div>
  )
};

export default Cadastro;