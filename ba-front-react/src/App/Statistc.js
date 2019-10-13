
export const collectFlightStatistic = payload =>{

    try{

        return { cia: (payload.flights[0])? payload.flights[0].company_id:0
               , qtd_f:payload.flights.length
               , qtd_fb:payload.flights_back.length
               , time: new Date().getTime()}

    }catch(e){
        console.log('collectFlightStatistic:',e)
    }
}