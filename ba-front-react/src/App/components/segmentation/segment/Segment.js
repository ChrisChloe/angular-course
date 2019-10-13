import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {formatMoney} from 'accounting';
import {
    findFlightsWithCache
    , startSearchingInCompany
    , endSearchingInCompany
    , errorSearchingInCompany
    , shareRequestFlightData
    , clearSearchingData
    , setSearching
    , getBestPrices
    , clearBestPrices
} from '../../../actions/busca_actions';

class Segment extends Component {

    componentWillReceiveProps(nextProps) {
        const {requestData} = this.props;
        const request = {...requestData};
        const {selectedCompanies} = request;

        let counter = selectedCompanies.length;

        let finishedSearches = nextProps.companies.filter((company) => company.done || company.error);

        console.log("finishedSearches.length :",finishedSearches.length);
        console.log("counter: ",counter);

        if (finishedSearches.length === counter) {
            this.props.clearSearchingData();
            this.props.setSearching(false);
        }
    }

    reSearch(event, day) {

        event.preventDefault();

        const {requestData} = this.props;

        const request = {...requestData, date_starting: day};

        const {selectedCompanies} = request;

        this.props.shareRequestFlightData({...request, selectedCompanies});
        this.props.clearBestPrices();
        this.props.clearSearchingData();
        // let counter = selectedCompanies.length;

        this.props.setSearching(true);

        selectedCompanies.forEach(company => {
            try {
                delete request.selectedCompanies;

                const companyId = company['id'];
                let flightForm = {company_id: companyId, ...request};

                this.props.findFlightsWithCache(flightForm, company);

                const optionsBestPrices = {
                    company_id: company.id,
                    start_date: moment(day, 'DD/MM/YYYY').subtract(3, 'days').format('YYYY-MM-DD'),
                    end_date: moment(day, 'DD/MM/YYYY').add(3, 'days').format('YYYY-MM-DD'),
                    origin_id: requestData.origin_id,
                    destination_id: requestData.destination_id
                };

                this.props.getBestPrices(optionsBestPrices)
                    .then((bestPrices) => {

                        if (bestPrices.error) throw bestPrices;

                    })
                    .catch((error) => {
                        const bestPriceError = error.payload.response.data;

                        if (bestPriceError.error) {
                            this.props.show({
                                position: 'tr',
                                title: 'Error',
                                message: bestPriceError.message,
                                autoDismiss: 15
                            }, 'error');
                        }

                        console.log(error);

                    });

            } catch (e) {
                console.log(e);
                this.props.errorSearchingInCompany(company);

                // if (--counter === 0) {
                //     this.props.clearSearchingData();
                //     this.props.setSearching(false)
                // }

            }
        });
    };

    render() {
        try {
            if(!this.props.segmentData) return null;
            const {tripDay, date, company, price, day, loading} = this.props.segmentData;

            const isValidDate = moment().format('YYYY-MM-DD') <= date;

            let dateOfFlight = moment(day, 'DD/MM/YYYY').format('DD/MM/YYYY');
            let currentTime = moment().format('DD/MM/YYYY');

            if (!date || !isValidDate) {

                let isBeforeFlight = moment(dateOfFlight,'DD/MM/YYYY').isBefore(moment(currentTime,'DD/MM/YYYY'));

                return (<div className={`box-preco col-md-1-2 ${(isBeforeFlight) ? 'bg-preco-indis remove-pointer' : 'bg-preco-flex'} `}
                             // onClick={(e) => this.reSearch(e, dateOfFlight)}
                             onClick={(e) => {!isBeforeFlight && this.reSearch(e, dateOfFlight)}}>
                        <span>
                            <p>
                                {(!isBeforeFlight)  && dateOfFlight}
                            </p>
                        </span>
                    {(!isBeforeFlight) &&
                    <div className="logoCompany" style={{maxWidth: '25%'}}>
                        <img className="img-responsive"
                             src={`assets/img/magnifying-glass-white.svg`}/>
                    </div>}

                    {(!isBeforeFlight) &&
                    <span className="company-melhorPreco">
                        <p className="">Pesquisar</p>
                </span>}

                </div>)
            }

            return (
                <div className={`box-preco col-md-1-2 ${tripDay ? 'bg-preco-dia' : 'bg-preco-flex'}`}
                     onClick={(e) => this.reSearch(e, day)}>
                    <span>
                        <p>
                            {moment(date).format('DD/MM/YYYY')}
                        </p>
                    </span>
                    <div className="logoCompany">
                        <img className="img-responsive"
                             src={`assets/img/logotipo-${company.title.toLocaleLowerCase()}.png`}/>
                    </div>
                    <span className="company-melhorPreco">
                        <p className="">{this.format(price)}</p>
                </span>
                </div>
            )
        }
        catch (err) {
            console.log(err);
        }
    }

    format(number) {
        return formatMoney(number, "R$", 2, ".", ",")
    }
}

const mapStateToProps = state => {
    return {
        requestData: state.busca.requestData,
        companies: state.busca.companies,
        research: state.busca.research,
        change: state.busca.change
    }
};

export default connect(mapStateToProps, {
    findFlightsWithCache
    , startSearchingInCompany
    , endSearchingInCompany
    , errorSearchingInCompany
    , clearSearchingData
    , shareRequestFlightData
    , setSearching
    , getBestPrices
    , clearBestPrices
},null,{pure:false})(Segment);
