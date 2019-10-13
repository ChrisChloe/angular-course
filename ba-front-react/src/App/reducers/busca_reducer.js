import {
    GET_AIRPORTS,
    GET_COMPANIES,
    SELECT_AIRPORT_ORIGIN,
    SELECT_AIRPORT_DESTINATION,
    SHARE_AIRPORTS,
    SEARCH_FLIGHTS,
    START_SEARCHING_COMPANY,
    END_SEARCHING_COMPANY,
    ERROR_SEARCHING_COMPANY,
    SHARE_REQUEST_FLIGHT_DATA,
    IS_SEARCHING,
    SELECT_FLIGHT,
    SELECT_FLIGHT_BACK,
    SORT_FLIGHTS,
    CLEAR_SEARCHING_DATA,
    CLEAR_FLIGHTS,
    CLEAR_SEARCHING_RESULTSET,
    SET_SEARCH_TIMEOUT,
    SET_END_SEARCHING,
    RESEARCH,
    SET_PREVENT_SEARCH,
    SET_HASH_TRACKER,
    GET_UUID,
    GET_BEST_PRICES,
    CLEAR_BEST_PRICES,
    LOGOUT,
    CHANGE,
    SHOW_FINANCIAL_CONFIG,
    UPDATE_SERVICE_CHARGE
} from '../actions/types';
import _ from 'lodash'
import { isValidFlight }          from "../components/search/Financial";

const DEFAULT_STATE = {
    airports: null,
    companiesToSearch: null,
    flightsData: [],
    companies: [],
    flight: null,
    flightBack: null,
    airportOrigin: null,
    airportDestination: null,
    requestData: null,
    sort: null,
    timeModalTimeOut: null,
    doneSearch: null,
    bestPrices: null,
    uuid: null,
    hashTracker: null,
    preventSearch: null,
    research: null,
    isOpenFinancialConfig: false
};

export default (state = DEFAULT_STATE, action) => {
    console.log(action);

    switch (action.type) {

        case GET_AIRPORTS:
            return {...state, airports: _.filter(action.payload.data.data.data, f => f.status === 1)};

        case GET_COMPANIES:
            return {...state, companiesToSearch: _.filter(action.payload.data.data, f => f.status === 0)};

        case IS_SEARCHING:
            const searching = action.payload;
            const startSearchMoment = (searching)? new Date().getTime(): state.startSearchMoment;

            return {...state, searching, startSearchMoment};

        case SEARCH_FLIGHTS:
            const flightsData = [...state.flightsData || [], action.payload.data.data];

            const filteredFlightData = _(flightsData).map(flightData => {

                const flights = _(flightData.flights).filter(isValidFlight).value();
                const flights_back = _(flightData.flights_back).filter(isValidFlight).value();

                return {...flightData, flights, flights_back};

            }).value();

            return {...state, flightsData: filteredFlightData};

        case START_SEARCHING_COMPANY:
            return {...state, companies: [...state.companies || [], action.payload], flightsData: [], flight:null, flightBack:null};

        case END_SEARCHING_COMPANY:
            return {...state, companies: [...state.companies.filter(c => c.id !== action.payload.id ) || [], action.payload]};

        case ERROR_SEARCHING_COMPANY:
            return {...state, companies: [...state.companies.filter(c => c.id !== action.payload.id ) || [], action.payload]};

        case CLEAR_SEARCHING_RESULTSET:
            return {...state, flightsData: [], flight: null, flightBack: null};

        case CLEAR_FLIGHTS:
            return {...state, flight:null, flightBack: null};

        case SELECT_AIRPORT_ORIGIN:
            return {...state, airportOrigin:      action.payload};

        case SELECT_AIRPORT_DESTINATION:
            return {...state, airportDestination: action.payload};

        case SHARE_AIRPORTS:
            return {...state, airports:           action.payload};

        case CLEAR_SEARCHING_DATA:
            return {...state, companies:          action.payload};

        case SHARE_REQUEST_FLIGHT_DATA:
            return {...state, requestData:        action.payload};

        case SELECT_FLIGHT:
            return {...state, flight:             action.payload};

        case SELECT_FLIGHT_BACK:
            return {...state, flightBack:         action.payload};

        case SORT_FLIGHTS:
            return {...state, sort:               action.payload};

        case SET_SEARCH_TIMEOUT:
            return {...state, timeModalTimeOut:   action.payload};

        case SET_END_SEARCHING:
            return {...state, doneSearch:         action.payload};

        case RESEARCH:
            return {...state, research:           action.payload};

        case SET_PREVENT_SEARCH:
            return {...state, preventSearch:      action.payload};

        case SET_HASH_TRACKER:
            return {...state, hashTracker:        action.payload};

        case GET_UUID:
            const uuid =  action.payload.data.data.uuid;
            return {...state, uuid:               uuid};

        case GET_BEST_PRICES:
            let segments = state.bestPrices ? state.bestPrices : [];

            try{

                const bestPrices = action.payload.data.data;

                segments = segments.concat(bestPrices);

            }
            catch (e) {
                segments = [];
            }

            return {...state, bestPrices: segments};

        case CLEAR_BEST_PRICES:
            return {...state, bestPrices:         null};

        case LOGOUT:
            return {};

        case SHOW_FINANCIAL_CONFIG:
            return {...state, isOpenFinancialConfig: action.payload};

        case UPDATE_SERVICE_CHARGE:
            return {...state, serviceCharge: action.payload};

        default: return state;
    }

};
