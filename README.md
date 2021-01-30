# PhotoHub

It is a photo sharing social networking service. 

## General Info
The goal of this project is to create a fully functionig photo sharing social networking service that allows to:
* create accounts
* share photos
* explore photos
* comment posts

## Technologies:
* Node.js 
* React.js 
* Bootstrap
* MongoDB
* Docker 
* Solr
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
3. Start PhotoHub by typing:
```bash
cd ./docker
./up-test.sh
```

## How it works?
App starts with a login page to sign in with credentials. The credentials temporarily are: Login: login1 Password: pass
![image](https://user-images.githubusercontent.com/43926545/106159529-2db03780-6185-11eb-868c-65ec041774dc.png)

By typing the search term users can find photos that they are intrested in. Photos are displayed as covers. Pictures are find by tags signed to each photo. 

![image](https://user-images.githubusercontent.com/43926545/106358975-a3480f00-630f-11eb-90a0-1de7da8ff7ac.png)

After searching for "fashion"
![image](https://user-images.githubusercontent.com/43926545/106359005-d12d5380-630f-11eb-9200-1e230e19dbef.png)

When the background is clicked the post dissapears.

After clicking on the photo there is displayed a post wit a full size photo and comments.
![image](https://user-images.githubusercontent.com/43926545/106159917-97304600-6185-11eb-8c63-28778d8c69f5.png)

The Infinite scroll is implemented. After all photos  are fetched or there are no results with given tag message "No results" is showed.

![image](https://user-images.githubusercontent.com/43926545/106162388-5685fc00-6188-11eb-8464-ab33edc9cb92.png)

In the Explore section are listed all tags used at PhotoHub. The url's size on the explore page depends on the number of photographs using this specyfic tag or in other words the more pictures uses the tag the tag is bigger. 

![image](https://user-images.githubusercontent.com/43926545/106358745-5879c780-630e-11eb-84cc-7fe78ba97dcd.png)

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









