# Threejs

## Usage
[Threejs] is a nodejs package around the threejs framework to create 2d and 3d shapes.
The package utilizes threejs version r84 and is locking down to this version.
The @types/three can be any version above 0.83.x


## NOTE
This package is not yet configured for es5 or es6 conversion and is a purely typscript pacakge. If using the package in another typescript project, there is no need to compile the package into es5 or es6 before using it. Simply just install and use.

index.ts is needed or else threejs will not be able to be referenced


## Local Installation
	npm install .../pathToPackage/threejs


## Uninstallation
	npm uninstall @dew/threejs


## Dependencies
- three
- @types/three
- @types/es6-promise


## package.json
- main : has no affect yet
- typings : has no effect yet
- files : the folders to include on npm install
- run `npm run lint --silent` to lint all ts files

### Links
- [Markdown syntax for readme files](http://daringfireball.net/projects/markdown/basics)

## Testing Setup
Threejs uses the jasmine and karma testing framework. The tedious setup is already in place.
You only need to perform some global installs and you should be able to run tests.
- some global installs
- npm install -g typings jasmine@2.5.3 karma@1.5.0
- you also need the 'typings' folder drop on root level inside threejs
- get this from other dev if needed
- 'npm test' or 'karma start'