export function buildObjectOP (fullOp, method) {

    const formPayment =  {
        "billet": 1,
        "pagseguro": 2,
        "debit": 3, "cielo": 3,
        "redpay": 4,
        "transfer": 5,

    };

    let op = {};

    return ({
        ...op,
        adults: fullOp.adults.data,
        children: fullOp.children.data,
        babies: fullOp.babies.data,
        form_payment: method ? formPayment[method] : null,
        flight_id: fullOp.flight.id,
        search_id: fullOp.search_id,
        flight_back_id: fullOp.flight_back ? fullOp.flight_back.id : null,
        search_back_id: fullOp.flight_back ? fullOp.search_back_id : null,
        observation: fullOp.observation,
        coupon: fullOp.coupon ? fullOp.coupon : null,
        send: fullOp.send ? fullOp.send : 0
    })
}