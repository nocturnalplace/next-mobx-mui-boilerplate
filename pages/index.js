import { observer, inject } from 'mobx-react';
import withStyles from "@material-ui/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


const styles = {
    root: {
        backgroundColor: 'pink',
        padding: 20
    },
};

@withStyles(styles)
@inject('AuthStore')
@observer
class Home extends React.Component {

    static async getInitialProps(appContext) {
        return { }
    }

    render() {
        const { AuthStore, classes } = this.props
        return (
            <div className={classes.root}> 
                <Grid>
                    <Button onClick={AuthStore.toggleTeemo}>{AuthStore.teemoVisible ? 'TEEMO' : 'CLICK HERE TO SEE THE AMAZING'}</Button>
                    {AuthStore.teemoVisible && <img src='/img/teemo.png'/>}
                </Grid>
            </div>
        )
    }
}

export default Home;