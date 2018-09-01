import React from 'react';
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import SvgIcon from '@material-ui/core/SvgIcon'

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  name:{
    verticalAlign: 'top',
    lineHeight: '24px'
  },
  svgIcon:{
    verticalAlign: 'middle',
    fontSize: '20px'
  },
  login_info:{
    textAlign: 'right',
  }
})

class LoginedUserInfo extends React.Component {
  render(){
    const { classes } = this.props
    const svnHuman = "M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
    return(
      <div className={classes.login_info}>
        <span className={classes.name}>Welcome, Victoria</span>
        <SvgIcon><path d={svnHuman}/></SvgIcon>
      </div>
    )
  }
}

LoginedUserInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}
export default withStyles(styles, { withTheme: true })(LoginedUserInfo)