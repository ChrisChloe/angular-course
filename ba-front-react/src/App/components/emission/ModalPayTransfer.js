import React, {Component} from 'react';
import PayTransfer from "./PayTransfer";

class ModalPayTransfer extends Component {

    constructor(props) {
        super(props)
    }

    close (e) {
        this.props.close(e);

    }

    render() {

        const { showModal } = this.props;

        if (showModal) {window.scroll(0,0)}

        return (
            <div className={`${this.props.showModal ? 'modal-backdrop': '' }`} >
                <div className={`animated ${this.props.showModal ? 'modal-show fadeInDown' : 'modal-hide'}`}
                     id="modal-refund"
                     style={{top: '20px'}}>
                    <section className="box-conclusao-pedido">
                        <div className="modal-dialog">
                            <div className='modal-content'>
                                <div className='modal-header'>
                                    <button onClick={e => this.close(e)} type='button' className='close' data-dismiss='modal' aria-hidden='true'>
                                        <span aria-hidden='true'>&times;</span>
                                    </button>
                                    <h4 className='modal-title' id='myModalLabel'>Anexar comprovantes de transferência
                                        bancária</h4>
                                </div>
                                <div className='modal-body content-modal'>
                                    <div className='col-md-12'>
                                        <PayTransfer isTransfer={true}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );

    }

}


export default ModalPayTransfer;
