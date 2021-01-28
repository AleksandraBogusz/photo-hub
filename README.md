# PhotoHub

It is a photo sharing social networking service. 

##General Info
The goal of this project is to create a fully functionig photo sharing social networking service that allows to:
* create accounts
* share photos
* explore photos
* comment posts

## Technologies:
* Node.js 15
* React.js 17
* Bootstrap 4
* MongoDB 4
* Docker 20.10.2
* Solr 7
* [Fronted Libraries](https://github.com/AleksandraBogusz/photo-hub/blob/main/frontend/package.json)
* [Authentication Service Libraries](https://github.com/AleksandraBogusz/photo-hub/blob/main/authentication-service/package.json)
* [Search Service Libraries ](https://github.com/AleksandraBogusz/photo-hub/tree/main/search-service)
* [Shared Libraries ](https://github.com/AleksandraBogusz/photo-hub/blob/main/shared/package.json)


## Instalation
Use the node package manager to install PhotoHub:

```bash
npm install
```

## Setup
1. Clone the project
2. Install dependencies in each service
3. Start docker containers by command:
4. Start PhotoHub by command:
```bash
npm run dev
```
```bash
npm start
```

## How it works?
App starts with a login page to sign in with credentials. The credentials teporararily are: Login: login1 Password: pass
![image](https://user-images.githubusercontent.com/43926545/106159529-2db03780-6185-11eb-868c-65ec041774dc.png)

By typing the search term users can find photos that they are intrested in. Photos are displayed as covers. Pictures are find by tags signed to each photo. 
![image](https://user-images.githubusercontent.com/43926545/106159782-6f40e280-6185-11eb-8ded-03ce9129fba1.png)

After searching for "furnitures"
![image](https://user-images.githubusercontent.com/43926545/106161499-5fc29900-6187-11eb-9978-d2e14529b998.png)

When the background is clicked the post dissapears.

After clicking on the photo there is displaied a post wit a full size photo and comments.
![image](https://user-images.githubusercontent.com/43926545/106159917-97304600-6185-11eb-8c63-28778d8c69f5.png)

The Infinite scroll is implemented. After all photos  are fetched or there are no results with given tag message "No results" is showed.

![image](https://user-images.githubusercontent.com/43926545/106162388-5685fc00-6188-11eb-8464-ab33edc9cb92.png)

After clicking logout button user comebacks to the login page.

## Features:
* Visual appeal
* Simple UI
* Security of the data
* Responsive
* Search options
* Easy to maintain and develop
* Scalable


#### To do:
* adding comments
* uploading photos
* creating new accounts









