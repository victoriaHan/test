import React, { Component } from 'react'
import Axios from '../Lib/Axios'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import classNames from 'classnames'
import Message from '../components/ErrorMessage'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0 auto',
    maxWidth: '1920px'
  },
  wrapContent: {
    padding: '30px',
  },
  h2 : {
    margin: '50px 0 20px 0',
    padding: 0
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: '200px',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  colourChip : {
    display : 'inline-block',
    width: '50px',
    height: '13px',
    marginRight: '10px',
    border: '1px solid #efefef',
    borderRadius: '4px'
  },
  btnDelete : {
    width: '30px',
    height: '30px',
    minHeight: '30px',
  },
  scroll : {
    paddingBottom : '10px',
    overflowX : 'auto'
  },
  btnArea : {
    marginTop: '20px',
    paddingRight: '30px',
    textAlign: 'right'
  },
  btnAreaBottom : {
    marginTop: '20px'
  },
  btnBack : {
    marginRight: '10px'
  },
  progress: {
    margin: theme.spacing.unit * 2,
  }
})

class ProductView extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      "name" : '',
      "suburb" : '',
      "material" : '',
      "colour" : '',
      "room" : '',
      "length" : '',
      "width" : '',
      "Pleats" : '',
      "style" : '',
      "notes" : '',
      "dataRows" : {},
      "dataSubDetails" : [],
      "dataMaterials" : [],
      "dataSuburbs" : [],
      "dataColours" : [],
      "errorMessage" : '',
      "dataMaterialLoaded" : false,
      "success" : "",
      "reload" : false,
      "dataLoaded" : false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAddRow = this.handleAddRow.bind(this)
    this.handleDeleteRow = this.handleDeleteRow.bind(this)
  }

  componentDidMount() {
    this.getDataRows()
    this.getMaterials()
    this.getSuburbs()
    this.getColours()
  }

  getDataRows(){
    Axios
      .get('/data')
      .then(response => {
        const data = response.data

        this.setState({
          dataLoaded: true,
          dataRows:data,
          dataSubDetails : data.dataSubDetails
        })
      })
      .catch(error => {
        console.log('Error: ', error)

        if(error.response && error.response.data.status === 400) {
          const message = error.response.data !== undefined ? error.response.data : 'Data not found.'
          this.setState({errorMessage: message})
        }else{
          this.setState({errorMessage: error.message})
        }

        this.setState({ 
          error: true,
          dataLoaded: false
        })
      })      
  }

  setDataRows(){
    Axios
      .post('/data', this.state.dataRows)
      .then(response => {
        const res = response

        this.setState({
          success: "Successfully saving..."
        }, () => {
          console.log("YAY! Saved!")
          setTimeout(() => {
            this.setState({success: ""})
          }, 1000)
        })
      })
      .catch(error => {
        console.log('Error: ', error)

        if(error.response && error.response.data.status === 400) {
          const message = error.response.data !== undefined ? error.response.data : 'Data not found.'
          this.setState({errorMessage: message})
        }else{
          this.setState({errorMessage: error.message})
        }
      })
  }

  getSuburbs(){
    Axios
      .get('/suburbs')
      .then(response => {
        const data = response.data

        this.setState({
          dataSuburbLoaded: true,
          dataSuburbs:data,
        })
      })
      .catch(error => {
        console.log('Error: ', error)

        if(error.response && error.response.data.status === 400) {
          const message = error.response.data !== undefined ? error.response.data : 'Data not found.'
          this.setState({errorMessage: message})
        }else{
          this.setState({errorMessage: error.message})
        }

        this.setState({ 
          error: true,
          dataSuburbLoaded: false,
        })
      })
  }

  getMaterials(){
    Axios
      .get('/materials')
      .then(response => {
        const data = response.data

        this.setState({
          dataMaterialLoaded: true,
          dataMaterials:data,
        })
      })
      .catch(error => {
        console.log('Error: ', error)

        if(error.response && error.response.data.status === 400) {
          const message = error.response.data !== undefined ? error.response.data : 'Data not found.'
          this.setState({errorMessage: message})
        }else{
          this.setState({errorMessage: error.message})
        }

        this.setState({ 
          error: true,
          dataMaterialLoaded: false,
        })
      })
  }

  getColours(){
    Axios
      .get('/colours')
      .then(response => {
        const data = response.data

        this.setState({
          dataColoursLoaded: true,
          dataColours:data,
        })
      })
      .catch(error => {
        console.log('Error: ', error)

        if(error.response && error.response.data.status === 400) {
          const message = error.response.data !== undefined ? error.response.data : 'Data not found.'
          this.setState({errorMessage: message})
        }else{
          this.setState({errorMessage: error.message})
        }

        this.setState({ 
          error: true,
          dataColoursLoaded: false,
        })
      })
  }

  handleSubmit(e){
    this.setDataRows();
  } 

  handleAddRow(){
    let oDataRows = this.state.dataRows ? this.state.dataRows : {}
    let aSubDetails = this.state.dataSubDetails ? this.state.dataSubDetails : [] 
    const oDataSet = {"room" : "", "length" : "", "width" : "", "pleats" : "", "style" : "", "notes" : ""}
    const dataSubDetails = this.state.dataSubDetails
    
    aSubDetails.push(oDataSet)
    oDataRows["dataSubDetails"] = aSubDetails

    this.setState({
      dataRows : oDataRows,
      dataSubDetails : aSubDetails
    }, () => console.log("YAY! Added!"))
  }

  handleDeleteRow(idx){
    let oDataRows = this.state.dataRows ? this.state.dataRows : {}
    let aSubDetails = this.state.dataSubDetails ? this.state.dataSubDetails : [] 

    aSubDetails = this.state.dataSubDetails.filter((s, sidx) => idx !== sidx)
    oDataRows["dataSubDetails"] = aSubDetails

    this.setState({ 
      dataRows : oDataRows,
      dataSubDetails : aSubDetails
    }, () => console.log("YAY! deleted!"))
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })

    const dataRows = this.state.dataRows ? this.state.dataRows : {}
    dataRows[e.target.name] = e.target.value
    this.setState({dataRows},() => console.log("YAY! changed!"))
  }

  handleChangeRowsValue(idx, e){
    let oDataRows = this.state.dataRows ? this.state.dataRows : {}
    let aSubDetails = this.state.dataSubDetails ? this.state.dataSubDetails : [] 

    const newData = aSubDetails.map((detail, sidx) => {
      if (idx !== sidx) return detail

      detail[e.target.name] = e.target.value
      return { ...detail }
    })

    this.setState({ [oDataRows["dataSubDetails"]] : newData }, () => console.log("YAY! changed!"))
  }

  handleMessageClose(type){
    this.setState({[type]: false})
  }

  render(){
    const {classes} = this.props
    
    const dataMaterials = this.state.dataMaterials
    const dataSuburbs = this.state.dataSuburbs
    const dataColours = this.state.dataColours

    const dataRows = this.state.dataRows
    const dataSubDetails = this.state.dataSubDetails

    return(
      <div className={classes.wrapContent}>
        <h1>Product View</h1>
        <React.Fragment>
        {!this.state.error ? this.state.dataLoaded ?
          <React.Fragment>
            <div>
              <FormControl className={classes.formControl}>
                <TextField 
                  placeholder="Customer"
                  id="name"
                  name="name"
                  label="Customer Name"
                  className={classes.textField}
                  value={dataRows.name ? dataRows.name : this.state.name}
                  onChange={this.handleChange}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="suburb">Suburb</InputLabel>
                <Select
                  value={dataRows.suburb ? dataRows.suburb : this.state.suburb}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'suburb',
                    id: 'suburb',
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {dataSuburbs && dataSuburbs.map((data) => 
                    <MenuItem key={data.id} value={data.id}>{data.name}, {data.city}</MenuItem>
                  )}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="material">Material</InputLabel>
                <Select
                  value={dataRows.material ? dataRows.material : this.state.material}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'material',
                    id: 'material',
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {dataMaterials && dataMaterials.map((data) => 
                    <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                  )}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="colour">Colour</InputLabel>
                <Select
                  value={dataRows.colour ? dataRows.colour :  this.state.colour}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'colour',
                    id: 'colour',
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {dataColours && dataColours.map((data) => 
                    <MenuItem key={data.id} value={data.id}>
                      <span 
                        className={classes.colourChip} 
                        style={{"background" : 'rgb('+ data.red + ','+ data.green + ','+data.blue}}>
                      </span>
                      {data.name} 
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
            </div>

            <h2 className={classes.h2}>Curtains</h2>
            <div className={classes.scroll}>
              <table className="dataTable">
                <thead>
                  <tr>
                    <th>Room</th>
                    <th>Length</th>
                    <th>Width</th>
                    <th>Pleats</th>
                    <th>Style</th>
                    <th>Notes</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                {dataRows && dataRows.dataSubDetails && dataRows.dataSubDetails.length > 0 ? dataRows.dataSubDetails.map((data, i) => 
                  <tr key={i}>
                    <td>
                      <Input
                        placeholder="Room"
                        className={classes.input}
                        id="room"
                        name="room"
                        label="room"
                        className={classes.textField}
                        value={data.room}
                        inputProps={{
                          'aria-label': 'Room',
                        }}
                        onChange={this.handleChangeRowsValue.bind(this, i)}
                      />
                    </td>
                    <td>
                      <Input
                        placeholder="Length"
                        className={classes.input}
                        id="length"
                        name="length"
                        label="length"
                        className={classes.textField}
                        value={data.length}
                        inputProps={{
                          'aria-label': 'Length',
                        }}
                        onChange={this.handleChangeRowsValue.bind(this, i)}
                      />
                    </td>
                    <td>
                      <Input
                        placeholder="Width"
                        className={classes.input}
                        id="width"
                        name="width"
                        label="width"
                        className={classes.textField}
                        value={data.width}
                        inputProps={{
                          'aria-label': 'Width',
                        }}
                        onChange={this.handleChangeRowsValue.bind(this, i)}
                      />
                    </td>
                    <td>
                      <Input
                        placeholder="Pleats"
                        className={classes.input}
                        id="pleats"
                        name="pleats"
                        label="pleats"
                        className={classes.textField}
                        value={data.pleats}
                        inputProps={{
                          'aria-label': 'Width',
                        }}
                        onChange={this.handleChangeRowsValue.bind(this, i)}
                      />
                    </td>
                    <td>
                      <Input
                        placeholder="Style"
                        className={classes.input}
                        id="style"
                        name="style"
                        label="style"
                        className={classes.textField}
                        value={data.style}
                        inputProps={{
                          'aria-label': 'Style',
                        }}
                        onChange={this.handleChangeRowsValue.bind(this, i)}
                      />
                    </td>
                    <td>
                      <Input
                        placeholder="Notes"
                        className={classes.input}
                        id="notes"
                        name="notes"
                        label="notes"
                        className={classes.textField}
                        value={data.notes}
                        inputProps={{
                          'aria-label': 'Notes',
                        }}
                        onChange={this.handleChangeRowsValue.bind(this, i)}
                      />
                    </td>
                    <td>
                      <Button variant="fab" mini color="secondary" aria-label="Delete row" className={classes.btnDelete} 
                            onClick={() => this.handleDeleteRow(i)} >
                        <DeleteIcon />
                      </Button>
                    </td>
                  </tr>
                ) : <tr><td colSpan="7">No data. Please add new row</td></tr>
                }
                </tbody>
              </table>
              <div className={classes.btnArea}>
                <Button variant="fab" mini color="primary" aria-label="Add row" className={classes.btnAdd} onClick={this.handleAddRow} >
                  <AddIcon />
                </Button>
              </div>
            </div>
          <div className={classes.btnAreaBottom}>
            <Button variant="contained" color="secondary" aria-label="Go to back" 
                    className={classNames(classes.button, classes.btnBack)}
                    onClick={() => this.props.history.goBack()}>
              Back
            </Button>
            <Button variant="contained" color="primary" aria-label="Go to back" 
                    className={classNames(classes.button, classes.btnSubmit)}
                    onClick={this.handleSubmit}>
              Save all changes
            </Button>
          </div>
          </React.Fragment>
        : <CircularProgress className={classes.progress} />
        : <div></div>
        }
        </React.Fragment>
        {this.state.errorMessage && <Message onClose={() => this.handleMessageClose('error')} type="red" message={this.state.errorMessage} />}
        {this.state.success && <Message onClose={() => this.handleMessageClose('success')} type="green" message={this.state.success} />}
      </div>
    )
  }
}

ProductView.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}
export default withStyles(styles, { withTheme: true })(ProductView)
