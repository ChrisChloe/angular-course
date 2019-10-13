
## Instalação

 - Instale o node v8.2.1 (https://nodejs.org/en/)  
 - Instale o webpack globalmente: 
    - ``` sudo npm install webpack -g ```
 - Instale o webpack-dev-server*: 
    - ``` npm install webpack-dev-server --save-dev ```
 - Instale as dependencias: 
    - ``` npm install ```
 
 *Não obrigatório para produção.   
 

## Execução
 - Para executar em ambiente de desenvolvimento execute:
    - ``` npm run dev ```
 - Para fazer o build para produção execute: 
     - ``` npm install && npm run build:prod ```
 - Para fazer o build para homologação execute: 
     - ``` npm install && npm run build:hmg ```
 - O Servidor deve direcionar para a pasta public.
 
## Criação do script de automação de deploy;
 
 - Crie um arquivo com o nome ```deploy.sh``` na raiz do sistema operacional.
 - Copy/Paste do conteúdo a seguir no .sh criado. 
        
    ```
       #!/bin/bash
       clear
       
       echo "Hi, starting scripted deploy."
       cd /usr/share/nginx/html
       git pull origin master
       npm install && npm run build:$1
       echo "Done." 
    ```
 - Para conceder permissão de execução para o script, execute.
    - ```chmod u+x deploy.sh```
 
## deploy.sh usage.
 - Para realizar o deploy, na raiz do sistema execute o seguinte comando.
     - ``` ./deploy.sh hmg ```
     - Onde ```hmg``` indica qual script de build será usado pelo npm.

## Webpack and babel-preset configurations
[https://willianjusten.com.br/configurando-o-webpack-para-rodar-react-e-es6/](https://willianjusten.com.br/configurando-o-webpack-para-rodar-react-e-es6/)

## React Redux Code Structure - Domain-style
[http://redux.js.org/docs/faq/CodeStructure.html](http://redux.js.org/docs/faq/CodeStructure.html)

## Performing ajax requests
[https://github.com/mzabriskie/axios](https://github.com/mzabriskie/axios)

## Autocomplete input
[https://github.com/reactjs/react-autocomplete](https://github.com/reactjs/react-autocomplete)

## Notification Component
[https://github.com/igorprado/react-notification-system](https://github.com/igorprado/react-notification-system)
