import { GET_STOCKS, GET_POSITION, GET_DASHBOARD_DATA } from '../types/actionTypes'
import StockService from '../../services/stockService'

export const getStocks = () => async (dispatch) => {
  const { data } = await StockService.getStocks()

  return dispatch({ type: GET_STOCKS, payload: data })
}

export const getPosition = () => async (dispatch) => {
  const { data } = await StockService.getPosition()

  return dispatch({ type: GET_POSITION, payload: data })
}

export const getDashboardData = () => async (dispatch) => {
  const { data } = await StockService.getDashboardData()

  return dispatch({ type: GET_DASHBOARD_DATA, payload: data })
}
