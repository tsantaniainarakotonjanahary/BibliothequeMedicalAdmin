// ** React Imports
import { useContext } from 'react'

// ** Context
import { AbilityContext } from '@src/utility/context/Can'

// ** Reactstrap Imports
import { Row, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap'

const AccessControl = () => {
  // ** Context

  return (
    <Row>
      <Col md='6' sm='12'>
        <Card>
          <CardBody>
            <CardTitle tag='h4'>Common</CardTitle>
            <CardText>No ability is required to view this card</CardText>
            <CardText className='text-primary'>This card is visible to 'user' and 'admin' both</CardText>
          </CardBody>
        </Card>
      </Col>
      
    </Row>
  )
}

export default AccessControl
