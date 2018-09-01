import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import SvgIcon from '@material-ui/core/SvgIcon'
import Paper from '@material-ui/core/Paper'
import classNames from 'classnames'

const styles = theme => ({
  errorBox:{
    margin: '30px 0 0 0',
    width: '90%',
    padding: '10px',

    '&.red':{
      backgroundColor: '#d32f2f !important',
    },
    '&.orange':{
      backgroundColor: '#FF7F32 !important',
    },
    '&.green':{
      backgroundColor: '#50A684 !important',
    },
    '&.transparent':{
      backgroundColor:'transparent !important',
      color:'#d32f2f',
      boxShadow: 'none',
      '& *': {
        color:'#d32f2f'
      }
    }
  },
  error:{
    padding: '10px'
  },
  svgIconError:{
    verticalAlign : 'middle',
    fontSize : '20px',
    width: '30px',
    height: '30px',
    marginRight: '10px',
    color: '#fff'
  },
  errorText:{
    verticalAlign: 'middle',
    color: '#fff'
  }
})

class ErrorMessage extends Component {
  render() {
    const { classes } = this.props
    const svgPathError = "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"

    return <Paper className={classNames(classes.errorBox, this.props.type)} role="alert">
      <div>
        <SvgIcon className={classes.svgIconError}><path d={svgPathError} /></SvgIcon> 
        <span className={classes.errorText}>{this.props.message}</span>
      </div>
    </Paper>
  }
}

export default withStyles(styles)(ErrorMessage)