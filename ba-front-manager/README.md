![alt tag](https://buscaaereo.com.br/img/logotipo-busca-aereo.png)

# BuscaAéreo Manager

BuscaAéreo manager build in [AngularJS](http://angularjs.org/)

## Conventions

All encoding must be written using the American English language

### 1. Git
The commits should follow the following format:

#### New functionality and Bugs:

1.Criar branch a partir da 'master', seguindo o padrão de nomenclatura:

 RF-BAM-id-short-description

```
git checkout master
git checkout -b RF-BAM-1-forgot-password
```

2.Commits Description:
```
commit -m "User | Recover password by email"
```

### 2. AngularJs

The following table shows the naming conventions for each element:

Element | Nomenclature | Example | Use
----|------|----|--------
Modules | lowerCamelCase  | angularApp |
Controllers | Funcionalidade + 'Ctrl'  | AdminCtrl |
Directives | lowerCamelCase  | userInfo |
Filters | lowerCamelCase | userFilter |
Services | UpperCamelCase | User | constructor
Factories | lowerCamelCase | dataFactory | others

[Full guide](https://github.com/mgechev/angularjs-style-guide/blob/master/README-pt-br.md)

## Installation

To get started, you can simply clone this repository and install the dependencies:

### Prerequisites

####Git
You will need git to clone the angular-seed repository.

```
sudo apt-get install git
```

### Clone

Clone the repository using [git]:

```
git clone https://github.com/Elomilhas_/ba-front-manager.git
cd ba-front-manager
```

####Node.js
You must have node.js and its package manager (npm) installed.

```
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Install Bower and Gulp

```
npm install -g bower
npm install -g gulp-cli
```



### Install dependencies

We have two kinds of dependencies in this project: tools and angular framework code.  The tools help
us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but
angular-seed changes this location through the `.bowerrc` file.  Putting it in the app folder makes
it easier to serve the files by a webserver.*

### Rodar aplicação em desenvolvimento

We have preconfigured the project with a simple development web server.  The simplest way to start
this server is:

```
npm start
```

Now browse to the app at `http://localhost:8000/index.html`.

## Update AngularJs

Previously we recommended that you merge in changes to angular-seed into your own fork of the project.
Now that the angular framework library code and tools are acquired through package managers (npm and
bower) you can use these tools instead to update the dependencies.

You can update the tool dependencies by running:

```
npm update
```

This will find the latest versions that match the version ranges specified in the `package.json` file.

You can update the Angular dependencies by running:

```
bower update
```

This will find the latest versions that match the version ranges specified in the `bower.json` file.


### Oficial Documentation

For more information on AngularJS please check out http://angularjs.org/
[bower]: http://bower.io
[git]: http://git-scm.com/
[http-server]: https://github.com/nodeapps/http-server
[jdk]: https://en.wikipedia.org/wiki/Java_Development_Kit
[jdk-download]: http://www.oracle.com/technetwork/java/javase/downloads/index.html
[node]: https://nodejs.org
[npm]: https://www.npmjs.org/