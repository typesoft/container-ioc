## Contribution guidelines

##### Fork the project, and then go:
```
git clone https://github.com/<yourgithubprofile>/container-ioc

cd container-ioc
```
##### Install packages:
```
npm install
```
##### Npm scripts:
```
npm start // lints, compiles and tests source code
npm run dev // runs dev workflow, lints, compiles, tests source code and watches source files.
npm run dist // compiles src code and puts everything into dist folder
```

##### Set up your fork to point to original repository:
```
git remote add upstream https://github.com/thohoh/container-ioc
```

##### Update your master branch with the latest upstream version:
```
git pull --ff upstream master
```

#### Create a new branch:
```
git checkout -b '#<issue_number>_some_info'
```
#### Commit your changes:
```
git commit -m '#<issue_number> changes message'
```

#### Push your changes:
```
git push origin
```
#### Hit "submit pull request" button on your fork's page