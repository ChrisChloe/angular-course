export function totalPrice(flight, suffix, additionalBaggage, sameFareType, sameCompany) {

    let total = 0;

    if(!flight) return 0;

    if(flight.adult_miles_price === 0) {

        if(flight.adults){
            total += calcPrice(flight, 'adult', additionalBaggage, sameFareType, sameCompany, false);
        }

        if(flight.children){
            total += calcPrice(flight, 'child', additionalBaggage, sameFareType, sameCompany, false);
        }

        if(flight.babies){
            total += (flight['baby_price'+suffix] * flight.babies);
        }

    } else {

        if(flight.adults){
            total += calcPrice(flight, 'adult', additionalBaggage, sameFareType, sameCompany, true);
        }

        if(flight.children){
            total += calcPrice(flight, 'child', additionalBaggage, sameFareType, sameCompany, true);
        }

        if(flight.babies){
            total += (flight['baby_miles_price'+suffix] * flight.babies);
        }
    }

    if(flight.babies){
        total += (flight.company.additional_baby_tax * flight.babies);
    }

    if(flight.company.additional_tax){
        total += (flight.company.additional_tax * flight.adults);
        total += (flight.company.additional_tax * flight.children);
    }

    if(additionalBaggage){
        const tax = flight.company.additional_baggage_tax;
        total += (tax * additionalBaggage)
    }

    return total;
}

export const calcAdditionalBaggage = (passengers, isBack = false) => {
    let total = 0;

    for(let i = 0 ; i < passengers.totalAdults; i++) {
        if (isBack) {
            if (passengers.adults[i].baggage_return) total++;
        } else {
            if (passengers.adults[i].baggage_departure) total++;
        }
    }

    for(let i = 0 ; i < passengers.totalChildren; i++) {
        if (isBack) {
            if(passengers.children[i] !== undefined) {
                if (passengers.children[i].baggage_return) total++;
            }
        } else {
            if(passengers.children[i] !== undefined) {
                if (passengers.children[i].baggage_departure) total++;
            }
        }
    }

    return total;

};

export const calcFlightPriceWithBaggage = (flight, additionalBaggage) => {

    if(additionalBaggage){
        const tax = flight.company.additional_baggage_tax;
        return flight.total + (tax * (flight.adults + flight.children))
    }

    return flight.total;

};

export const isValidFlight = flight => {
    return flight.adult_miles_price !== 0;
};

export function itsWorthConsiderCompanyPrice(flight, otherFlight){
    if(!otherFlight || !flight) return false;
    return (flight.company_id === otherFlight.company_id && flight.adult_miles_price_company < flight.adult_miles_price);
}

function isRoundTripPrices (flight, type, sameFareType, sameCompany) {

    const milesPrice         = flight[`${type}_miles_price`];
    const milesPriceCompany  = flight[`${type}_miles_price_company`];

    return ((milesPriceCompany > 0) && (milesPriceCompany < milesPrice)) && sameFareType && sameCompany
}

function calcPrice (flight, type, additionalBaggage, sameFareType, sameCompany, isMiles) {

    let total = 0;
    let typePrice = isMiles ? `${type}_miles_price` : `${type}_price`;
    let typeTax   = `${type}_shipping_rate`;
    const passengers = type === 'adult' ? 'adults' : 'children';

    if (isRoundTripPrices(flight, type, sameFareType, sameCompany)) {
        typePrice = isMiles ? `${type}_miles_price_company` : `${type}_price_company`;
        typeTax   = `${type}_shipping_rate_company`;
    }

    total += flight[typePrice] * flight[passengers];
    total += (flight[typeTax]  * flight[passengers]);

    return total;

}