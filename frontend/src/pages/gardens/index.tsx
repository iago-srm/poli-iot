import React from 'react';
import { GetServerSideProps } from 'next';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
import { parseCookies } from 'nookies'

import inputStyles from '../../styles/input.module.css';
import { Frame, Button, Form, Input, LoadingErrorData } from '../../components';
import { newGardenSchema } from '../../services/validation';
import { useApiCall, getGardensApi, insertGardenApi, InsertGardenParams } from '../../services';
import { AuthContext } from '../../contexts/auth.context';
import { CookieNames } from '../../constants/names.enum';

interface FormValues {
  name: string;
  description: string;
  deviceCount: number;
}

const Gardens = (): JSX.Element => {

  const { user } = React.useContext(AuthContext);

  const { 
    apiCall: getGardens, 
    loading: getGardensLoading, 
    errors: getGardensError,
    response: gardensResponse 
  } = useApiCall<number, any[]>(getGardensApi);

  const { 
    apiCall: insertGarden, 
    loading: insertGardenLoading 
  } = useApiCall<InsertGardenParams, any>(insertGardenApi);

  const handleSubmit = React.useCallback(async (formData: FormValues) => {
    await insertGarden({...formData, userId: user.id});
    await getGardens(Number(user.id));
  },[insertGarden]);


  React.useEffect(() => {

    const fetchUserGardens = async () => {
      if(user) await getGardens(Number(user.id));
    };

    fetchUserGardens();
  }, [getGardens, user]);

  return (
    <Container fluid>
      <Row >
        <Col xs={{offset: 1, span: 10}} sm={{offset: 2, span: 8}} md={{offset: 1, span: 5}}>
          <h3>Your gardens</h3>
          <LoadingErrorData
            loading={getGardensLoading}
            error={getGardensError.status}
            data={gardensResponse?.data}
          >
            <div style={{overflowY: 'scroll', maxHeight: '70vh'}}>
            {gardensResponse?.data.map((garden, i) => (
              <>
              <Card key={i}>
                <Card.Header>Garden {garden.id}</Card.Header>
                <Card.Body>
                  <Card.Title>{garden.name}</Card.Title>
                  <Card.Text>
                    <strong>{`(${garden.deviceNum} devices)\n\n`}</strong>
                    {garden.description || "There is no description for this garden."}
                  </Card.Text>
                  <Card.Text>
                  </Card.Text>
                </Card.Body>
              </Card>
              <br/>
              </>
            ))}
            </div>
            <br/>
          </LoadingErrorData>
        </Col>
        <Col xs={{offset: 1, span: 10}} sm={{offset: 2, span: 8}} md={{offset: 0, span: 5}}>
          <h3>New Garden</h3>
          <Frame>
            <Form onSubmit={handleSubmit}
              schema={newGardenSchema} styles={inputStyles}
            >
              <Input name='name' placeholder="Name of your garden" />
              <Input name='deviceNum' type="number" placeholder="Number of devices in the garden" />
              <Input name='description' inputType="textarea" placeholder="Garden description" />
              <Button loading={insertGardenLoading}>Save</Button>
            </Form>
          </Frame>
        </Col>
      </Row>
    </Container>
  )
};

export default Gardens;

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