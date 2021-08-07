import React from 'react';
import { GetServerSideProps } from 'next';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
import { parseCookies } from 'nookies'

import inputStyles from '../../styles/input.module.css';
import pageStyles from '../../styles/page.module.css';

import { Frame, Button, Form, Input } from '../../components';
import { registerSchema } from '../../services/validation';
import { useApiCall, getGardensApi, insertGardenApi, InsertGardenParams } from '../../services';
import { AuthContext } from '../../contexts/auth.context';
import { CookieNames } from '../../constants/names.enum';

interface FormValues {
  name: string;
  description: string;
  deviceCount: number;
}

const Jardins = (): JSX.Element => {

  // const [gardens, setGardens] = React.useState([]);
  const { user } = React.useContext(AuthContext);
  const { 
    apiCall: getGardens, 
    loading: getGardensLoading, 
    response: gardensResponse 
  } = useApiCall<number, any[]>(getGardensApi);
  const { 
    apiCall: insertGarden, 
    errors: insertGardensError, 
    loading: insertGardenLoading 
  } = useApiCall<InsertGardenParams, any>(insertGardenApi);

  const handleSubmit = React.useCallback(async (formData: FormValues) => {
    await insertGarden({...formData, userId: user.id});
    await getGardens(Number(user.id));
  },[insertGarden]);

  const fetchUserGardens = React.useCallback(async () => {
    if(user) await getGardens(Number(user.id));
  }, [getGardens, user]);

  React.useEffect(() => {
    fetchUserGardens();
  }, [getGardens, user]);

  return (
    <div className={pageStyles.totalCenterContainer}>
      <Container fluid>
        <Row >
          <Col xs={12} sm={8} md={6}>
            <h3>Seus jardins</h3>
            <div style={{maxHeight: '80vh', overflow: "scroll"}}>
              {gardensResponse?.data ? gardensResponse.data.map((garden, i) => (
                <Col  key={i} xs={12} sm={8} md={{offset: 3, span: 6}}>
                  <Card>
                    <Card.Header>Jardim {garden.id}</Card.Header>
                    <Card.Body>
                      <Card.Title>{garden.name}</Card.Title>
                      <Card.Text>
                        {garden.description || "Não há uma descrição para este jardim."}
                      </Card.Text>
                      <Card.Text>
                        {/* {garden.devices.length} */}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  <br/>
                </Col>
                )) 
              : getGardensLoading ? 
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div> : "Você não tem jardins."}
            </div>
          </Col>
          <Col xs={12} sm={8} md={4}>
            <h3>Novo jardim</h3>
            <Frame>
              <Form onSubmit={handleSubmit}
                schema={registerSchema} styles={inputStyles}
              >
                <Input name='name' placeholder="Nome do seu jardim" />
                <Input name='deviceNum' type="number" placeholder="Quantos sensores há no jardim" />
                <Input name='description' inputType="textarea" placeholder="Descrição do jardim" />
                <Button loading={insertGardenLoading}>Salvar</Button>
              </Form>
            </Frame>
          </Col>
        </Row>
      </Container>
    </div>
  )
};

export default Jardins;

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { [CookieNames.REFRESH_TOKEN]: token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  return { props: {}}
}