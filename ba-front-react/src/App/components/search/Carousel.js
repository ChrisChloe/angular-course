import React from 'react';

export default () => (<section className="conteudo" id="box-banner">
                        <div id="carousel-busca-aereo" className="carousel slide hidden-xs" data-ride="carousel">
                            {/*<!-- Indicators -->*/}
                            <ol className="carousel-indicators">

                                <li data-target="#carousel-busca-aereo"
                                    data-slide-to="0"
                                    className="active border-ball-banner"/>

                                <li data-target="#carousel-busca-aereo"
                                    data-slide-to="1"
                                    className=" border-ball-banner"/>
                            </ol>

                            {/*<!-- Wrapper for slides -->*/}
                            <div className="carousel-inner" role="listbox">
                                <div className="item active">
                                    <img src="assets/img/banner_comunicado_latam.png"
                                         className="img-responsive"
                                    />
                                    <div className="carousel-caption"/>
                                </div>
                                <div className="item">
                                    <img src="assets/img/Banner_Site.png"
                                         className="img-responsive"
                                    />
                                    <div className="carousel-caption"/>
                                </div>
                            </div>

                            {/*<!-- Controls -->*/}
                            <a className="left carousel-control" href="#carousel-busca-aereo" role="button" data-slide="prev">
                                <i className="fa fa-chevron-left left-banner" aria-hidden="true"/>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="right carousel-control" href="#carousel-busca-aereo" role="button" data-slide="next">
                                <span className="fa fa-chevron-right right-banner" aria-hidden="true"/>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>

                    </section>)