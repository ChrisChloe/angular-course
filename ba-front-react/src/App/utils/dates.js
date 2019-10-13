import { mask } from "./utils";
import moment   from 'moment';

export const createDates = (roundTrip, callbackIda, callbackVolta) => {

    jQuery('.btn-dp').on('click' , function(){
        jQuery(this).siblings("input").trigger('focus');
    });

    if(roundTrip){
        $('#date_back' ).datepicker("destroy");
        $('#date_back' ).datepicker({
            numberOfMonths: 1,
            showAnim: "slideDown",
            minDate: $('#date_starting').val() && $('#date_starting').val().length >= 0 ? $('#date_starting').val() : moment().format('DD/MM/YYYY'),
            onSelect: (dateText, inst) => { callbackVolta(dateText) }
        });
    }

    $('#date_starting').datepicker({
        numberOfMonths: 1,
        showAnim: "slideDown"
        , minDate: moment().format('DD/MM/YYYY')
        , onSelect: (dateText, inst) => {
            // setTimeout(function(){
            //     $('#date_back').datepicker('show')
            // }, 200);
            callbackIda(dateText)
        }
    });

    mask();

};

export const validate = dateString => {
    let resultDate = '';
    
    if (dateString === 'Invalid date') return resultDate;

    const formatedDate = `${dateString.slice(3, 5)}/${dateString.slice(0, 2)}/${dateString.slice(6, dateString.length)}`;
    const newDate = new Date(formatedDate);

    if ( newDate !== 'Invalid date') {
        
        const newDateFromNow = moment(newDate).fromNow();
        const isPass = newDateFromNow.slice(-3) === 'ago' ||  newDateFromNow.slice(-5) === 'atrás';
        
        if (isPass) {
            resultDate = moment().locale('pt-br').format('L');
        } else {
            resultDate = moment(newDate).locale('pt-br').format('L');
        }

    }
    
    return resultDate;
                         
};