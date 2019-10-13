import moment from 'moment';
import _ from 'lodash';

function calculateAge(birthdayStr, flightDate) {

    let birthday  = moment(birthdayStr, 'DD/MM/YYYY');
    let limitDate = moment();

    if(flightDate){
        limitDate = moment(flightDate);
    }

    return limitDate.diff(birthday, 'years');
}


//Check
export function validadePassengerAges(flight, op) {

    let flightDate = flight.date_boarding;

    let errors = [];

    // Validar ADULTO com idade inferior a 11 anos ou superior a 120 anos
    _.forEach(op.adults.data, adult => {
        if(!moment(adult.birthday, 'DD/MM/YYYY').isValid()) {
            const error = {desc: 'Data de nascimento do adulto ' + adult.fullname + ' é inválida.', title: 'Data de nascimento inválida!'};
            errors = [...errors, error];
        }
        if(calculateAge(adult.birthday, flightDate) < 12) {
            const error = {desc: 'O Adulto ' + adult.fullname + ' está abaixo da idade permitida.', title: 'Idade mínima de 12 anos!'};
            errors = [...errors, error];
        }
        if(calculateAge(adult.birthday, flightDate) > 120) {
            const error = {desc: 'O Adulto ' + adult.fullname + ' está acima da idade permitida.', title: 'Idade máxima de 120 anos!'};
            errors = [...errors, error];
        }
    });

    _.forEach(op.babies.data, baby => {
        if(!moment(baby.birthday, 'DD/MM/YYYY').isValid()) {
            const error = {desc: 'Data de nascimento do bebê ' + baby.fullname + ' é inválida.', title: 'Data de nascimento inválida!'};
            errors = [...errors, error];
        }
        if(moment(baby.birthday, 'DD/MM/YYYY').isAfter(moment())){
            const error = {desc: 'O bebê ' + baby.fullname + ' não pode ter a idade superior ao dia de hoje.', title:'Data de nascimento inválida.'};
            errors = [...errors, error];
        }
        if(calculateAge(baby.birthday, flightDate) > 2) {
            const error = {desc: 'O bebê ' + baby.fullname + ' está acima da idade permitida.', title:'Idade máxima até 2 anos!'};
            errors = [...errors, error];
        }
    });

    _.forEach(op.children.data, child => {
        if(!moment(child.birthday, 'DD/MM/YYYY').isValid()) {
            const error = {desc: 'Data de nascimento da criança ' + child.fullname + ' é inválida.', title: 'Data de nascimento inválida!'};
            errors = [...errors, error];
        }
        if(calculateAge(child.birthday, flightDate) > 11) {
            const error = {desc: 'A criança ' + child.fullname + ' está acima da idade permitida.', title:'Idade máxima até 11 anos!'};
            errors = [...errors, error];
        }
        if(calculateAge(child.birthday, flightDate) < 2) {
            const error = {desc: 'A criança ' + child.fullname + ' está abaixo da idade permitida.', title:'Idade mínima de 2 anos!'};
            errors = [...errors, error];
        }
    });

    return errors;

}