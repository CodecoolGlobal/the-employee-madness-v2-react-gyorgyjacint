# The employee madness (Codecool project)

## Description

The goal of this project is to practice the MERN stack.<br>
It has several features, such as:
- pagination,
- sorting,
- filters,
- creating equipments (working with database),
- attendance,
- favourites

### Tech
- Frontend: React
- Backend: Express.js

### Reference images
![image](https://github.com/CodecoolGlobal/the-employee-madness-v2-react-gyorgyjacint/assets/55077329/2eb0d690-8bf2-4441-bf0b-7a1bc55c1da3)
![image](https://github.com/CodecoolGlobal/the-employee-madness-v2-react-gyorgyjacint/assets/55077329/d643456f-095c-46a8-80c7-6a9f90d3a9e2)
![image](https://github.com/CodecoolGlobal/the-employee-madness-v2-react-gyorgyjacint/assets/55077329/5b0c9f4e-933c-496e-aea8-b293bcec0095)
![image](https://github.com/CodecoolGlobal/the-employee-madness-v2-react-gyorgyjacint/assets/55077329/83376e6f-abd3-477f-8aa7-ce7c799bcfc8)
![image](https://github.com/CodecoolGlobal/the-employee-madness-v2-react-gyorgyjacint/assets/55077329/5bfbb13d-ee48-46eb-b44a-dd6b5fe8e7c3)


## Usage

### Server side

#### Install dependencies
```bash
cd ./server
npm install
```

#### .env file
Copy the .env.sample as .env and fill up the environment variable for your personal mongodb connecttion url.

#### Prepare the database

```bash
cd ./server
npm run populate
```

**populate command** will run the populate.js file as a script and it will generate a buch of starter data for your database. 

#### Running the code

```bash
cd ./server
npm run dev
```

It will start the server with nodemon. So it will watch the changes and restart the server if some ot the files changed.

#### Testing with test.http

If you like to try the endpoints of the rest api, you can check the test.http file for urls are should work on your environment as well. And if you install the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extenstion for vscode you can actually run those in your editor.



### Client side

#### Install dependencies

```bash
cd ./client
npm install
```

#### Proxy

Watch for the port of your rest api. By default it will bind on port 8080 and the frontend proxy settings also depend on this configuration. If you for some reasons change the port of the backend, don't forget to change the ./client/package.json proxy settings as well.

#### Runnig the code

```bash
cd ./client
npm start
```

And the create-react-app react-scripts package will start your frontend on the 3000 port and you can visit the http://localhost:3000 on your preferred browser.
