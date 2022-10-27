import { Component } from 'react'
import { CCol, CRow } from '@coreui/react'
import FormMaker from '@r/components/FormMaker'
import withRouter from '@r/components/WithRouter'
import { session } from '@r/service/axios'

class ObjectDetail extends Component {
  constructor(props) {
    super(props)

    this.model = new props.model()
    this.id = this.props.id
    this.state = {
      model: null,
    }

    this.request().then((response) => {
      this.setState({ model: response.data.data })
    })
  }

  request = () => {
    return new Promise((resolve, reject) => {
      session
        .get(this.model.getRoute() + '?where[user.name]=' + this.id)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  render() {
    return <FormMaker model={this.props.model} />
  }
}

export default withRouter(ObjectDetail)
