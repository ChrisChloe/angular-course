/* eslint-disable no-nested-ternary */
import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { formatMoney } from 'accounting'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import ArrowDropUp from '@material-ui/icons/ArrowDropUp'

class ShareListItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      style: {
        subtitle: {
          marginTop: '-5px',
          marginBottom: '20px',
        },
      },
      screenWidth: '',
    }
  }

  componentDidMount() {
    this.updateDimensions()
    window.addEventListener('resize', this.updateDimensions.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this))
  }

  updateDimensions() {
    this.setState({ screenWidth: window.innerWidth })
  }

  render() {
    const { style, screenWidth } = this.state
    const { stock } = this.props
    return (
      <Grid item xs={12} sm={6} md={6} lg={4} style={screenWidth > 599 ? { padding: '8px' } : { paddingTop: '8px' }}>
        <Card style={style}>
          <CardContent>
            <Grid container spacing={8}>
              <Grid item xs={6}>
                <Typography component="h2" variant="h5" align="left" gutterBottom>
                  {stock.code.toUpperCase()}
                </Typography>
                <Typography variant="caption" align="left" gutterBottom style={style.subtitle}>
                  {stock.name.toUpperCase()}
                </Typography>
                <Typography variant="body2" align="left" gutterBottom>
                  Posição:
                  {' '}
                  {formatMoney(stock.position.total, 'R$', 2, '.', ',')}
                </Typography>
                <Typography variant="body2" align="left" gutterBottom style={{ marginTop: '-7px' }}>
                  Quantidade:
                  {' '}
                  {stock.position.amount}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" align="right" gutterBottom>
                  {formatMoney(stock.position.income.price, 'R$', 2, '.', ',')}
                </Typography>
                <Typography variant="subtitle1" align="right" gutterBottom style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  {stock.position.income.percent === 0
                    ? ''
                    : stock.position.income.percent > 0
                      ? <ArrowDropUp style={{ fontSize: '30px', color: '#48cc92' }} />
                      : <ArrowDropDown style={{ fontSize: '30px', color: '#cc554c' }} />}
                  {stock.position.income.percent}
%
                </Typography>
                <Typography variant="body2" align="right" gutterBottom>
                  Preço médio:
                  {' '}
                  {formatMoney(stock.position.price, 'R$', 2, '.', ',')}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    )
  }

  // renderCard(stock, name, key) {
  //   const { style } = this.state;
  //   return (
  //     <Grid key={key} item xs={12} sm={6} md={4}>
  //       <Card style={style}>
  //         <CardContent>
  //           <Grid container spacing={8}>
  //             <Grid item xs={7}>
  //               <Typography component="h2" variant="h5" align="left" gutterBottom>
  //                 {stock.code.toUpperCase()}
  //               </Typography>
  //               <Typography variant="caption" align="left" gutterBottom style={style.subtitle}>
  //                 {name.toUpperCase()}
  //               </Typography>
  //               <Typography variant="body2" align="left" gutterBottom>
  //                 Posição: {formatMoney(stock.position.total, "R$", 2, ".", ",")}
  //               </Typography>
  //               <Typography variant="body2" align="left" gutterBottom style={{marginTop: '-7px'}}>
  //                 Quantidade: {stock.position.amount}
  //               </Typography>
  //             </Grid>
  //             <Grid item xs={5}>
  //               <Typography variant="h6" align="right" gutterBottom>
  //                 {formatMoney(stock.position.income.price, "R$", 2, ".", ",")}
  //               </Typography>
  //               <Typography variant="subtitle1" align="right" gutterBottom style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
  //                   {stock.position.income.percent > 0 ? <ArrowDropUp style={{fontSize: '30px', color: '#48cc92'}}/> : <ArrowDropDown style={{fontSize: '30px', color: '#cc554c'}}/>}
  //                   {stock.position.income.percent}%
  //               </Typography>
  //               <Typography variant="body2" align="right" gutterBottom>
  //                 Preço médio: {formatMoney(stock.position.price, "R$", 2, ".", ",")}
  //               </Typography>
  //             </Grid>
  //           </Grid>
  //         </CardContent>
  //       </Card>
  //     </Grid>
  //   )
  // }

  // console.log(item);
  // render() {
  //   const { style } = this.state;
  //   const { agent } = this.props;

  //   return  (
  //     <Grid container justify="center" spacing={16}>
  //       {
  //         agent
  //         ? agent.stocks.map((stock, key) => this.renderCard(stock, agent.name, key))
  //         : <Grid item xs={12} sm={6} md={4}>
  //             <Card style={style}>
  //               <CardContent>
  //                 <Typography component="h2" variant="h5" align="left" gutterBottom>
  //                   Carregando...
  //                 </Typography>
  //               </CardContent>
  //             </Card>
  //           </Grid>
  //       }
  //     </Grid>
  //   )
  // }
}

export default ShareListItem
