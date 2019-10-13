import React from 'react'
import json from '../../../../package.json'
import moment from 'moment'

export default () => (<span>
                         <i className="fa fa-copyright"></i> Busca Aéreo v{json.version} - {moment().year()}
                      </span>);
