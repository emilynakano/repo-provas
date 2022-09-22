<div align="center"> 
	<h1> RepoProvas </h1>
<div />

20th project project at Driven Education.

A system for sharing tests between students.

 ### Technologies
<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=ts,express,postgres,prisma,nodejs,jest" />
  </a>
</p>

<br>	

	
<div align="start"> 

	
<div />
	
<br>

## 🧑🏻‍🏭 Working Flow

<div align="start"> 

1. User creates a login (email, password).

2. User logs in and receives a token.

3. User can post a test or get all tests group by discipline or teacher.


</div>

<br>

## 🚀 Routes

<div align="start"> 

  ### User Registration
  
  POST /sign-up
  
  Send a request body in this format:
  

```
{
    email: 'fulano@gmail.com',
    password: '1234567890',
    confirmPassword: '1234567890'
}
```
#### Request:

|body| type | description
|--|--|--|
| email | string | valid email  |
| password | string |  at least 10 characters |
| confirmPassword | string |  equal to password  |

#### Response:

|code| description | 
|--|--|
| 422 | request body is invalid | 
| 409 | email already registred | 
| 201 | created | 

 
<div />

<div align="start"> 

  ### User Login
  
  POST /sign-in
  
  Send a request body in this format
  

```
{
    email: fulano@gmail.com,
    password: 1234567890
}
```

#### Request:

|body| type | description
|--|--|--|
| email | string | valid email  |
| password | string |  valid password |

#### Response:

|code| description | 
|--|--|
| 422 | request body is invalid | 
| 401 | email doesn't exist or password doesn't match | 
| 200 | ok, returns a token |

```
{
    token: jyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
}
```
<div />

<div align="start"> 

  ### Test Creation</h2>
  
  POST /tests
  
  Send a Authorization Header with format Bearer Token, and  a Request Body in this format:
  

```
{
  "name": "globo.com",
  "pdfUrl": "https://globo.com",
  "categoryId": 1,
  "teacherId": 2,
  "disciplineId": 1
}
```

#### Request:

|body| type | description
|--|--|--|
| name | string | valid name  |
| pdfUrl | string |  valid url |
| categoryId | number |  id of category |
| teacherId | number |  id of teacher |
| disciplineId | number |  id of discipline |


#### Response:

|code| description | 
|--|--|
| 422 | request body is invalid | 
| 401 | invalid or non-existent token | 
| 404 | teacher, category, discipline or teacher-discipline-relation not found |
| 201 | created | 


If statusCode is 201 an email will be sent to all registered users notifying the new test added.


<div />

<div align="start"> 
   
   ### Get Tests Group By Disciplines
   
  GET /tests/disciplines
  
  Send a Authorization Header with format Bearer Token.
  
  #### Response:

|code| description | 
|--|--|
| 401 | invalid or non-existent token | 
| 200 | ok | 


  If statusCode is 200, the server will respond with an array in this format:
  

```
[
  {
    "term": 1,
    "disciplines": [
      {
        "id": 1,
        "name": "HTML e CSS",
        "categories": [
          {
            "id": 1,
            "name": "Projeto",
            "tests": [
              {
                "id": 3,
                "name": "globo.com",
                "teacherName": "Diego Pinho",
                "teacherId": 2,
                "pdfUrl": "https://globo.com"
              }
            ]
          }
        ]
      }
    ]
  }
]
```


<div />

<div align="start"> 
  
  ### Get Tests Group By Teachers
 
  GET /tests/teachers
  
  Send a Authorization Header with format Bearer Token.
  
  #### Response:

|code| description | 
|--|--|
| 401 | invalid or non-existent token | 
| 200 | ok | 


  If statusCode is 200, the server will respond with an array in this format:
  
```
[
  {
    "id": 1,
    "name": "Bruna Hamori",
    "categories": [
      {
        "id": 1,
        "name": "Projeto",
        "tests": [
          {
            "id": 1,
            "name": "parrots",
            "disciplineName": "JavaScript",
            "disciplineId": 2
          }
        ]
      }
    ]
  }
]
```
<div />



## 🏁 Running this project
	
Before starting, you will need to have the following tools installed on your machine: Postgres, Node.js.

Besides, it's good to have an editor to work with the code like VSCode.
	
```
	
# First, clone this repository.
$ git clone https://github.com/emilynakano/repo-provas.git

# Acces this repository.
$ cd repo-provas

# Go to the '.env.example' in your code editor.
	
# Put your DATABASE_URL, which must be a url that follows the example: 'postgres://youruser:yourpassword@localhost:5432/yourdatabase'
# Put your PORT, which must be a port of the aplication.
# Put your JWT_SECRET_KEY, which is a key that must be a string.
# Put your SENDGRID_API_KEY, which is a key that must be a string and provided by sendGgrid
# Put your SENDGRID_EMAIL, which is a email that you provided to sendGgrid
	
# Finally, make a copy of '.env.example' to '.env'.
$ cp .env.example .env

# Install dependencies.
$ npm i -y

# create database with prisma
$ npx prisma migrate dev
	
# Run the project in the developer mode.
$ npm run dev	
	
```

**NOTE:** There is a Thunder Client collection in this project's folder, it contains all the project routes with an example request body. To use it you will need to import it into your Thunder Client and put the url you are using.
	
