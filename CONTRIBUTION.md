## Contribution guidelines

### System prerequisites
```
gulp-cli >= 1.3.0
```

##### Fork the project, and then go:
```
git clone https://github.com/<yourgithubprofile>/container-ioc

cd container-ioc
```
##### Install packages:
```
npm install
```
##### Gulp tasks:
```
gulp compile // compiles src files
gulp test // compiles src and runs unit tests
gulp tslint // tslints :)
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