# User API Spec

## REGISTER USER
Endpoint : POST  /user/register

Request Body :
```json
{
    "userName": "antonmedan123", // must
    "accountNumber": "123456782100123", // must
    "emailAddress": "antonm123@gmail.com", // must
    "identityNumber": "1234567890100123" // must
}
```
Response (Succes) :
```json
{
    "status": 200,
    "message": "success",
    "data": [
        {
            "userName": "antonmedan123",
            "accountNumber": "123456782100123",
            "emailAddress": "antonm123@gmail.com",
            "identityNumber": "1234567890100123",
            "_id": "66373556d4c18a5fa7a8c40c",
            "__v": 0
        }
    ]
}
```
Response (Failed) :
```json
{
   "status": 412,
   "message": "username is required"
}
```
```json
{
   "status": 412,
   "message": "email is required"
}
```
```json
{
   "status": 412,
   "message": "identity number is required"
}
```
```json
{
   "status": 412,
   "message": "account number is required"
}
```
```json
{
   "status": 409,
   "message": "username/account number/identity number exists"
}
```
```json
{
   "status": 500,
   "message": "error"
}
```

## UPDATE USER
Endpoint : PATCH  user/update/:id

Headers:
- Authorization : Bearer token

Request Param :
```json
{
    "id": "663722fa5de4cd317833c921" // must
}
```
Request Body :
```json
{
    "userName": "antonmedan123", // optional
    "accountNumber": "123456782100123", // optional
    "emailAddress": "antonm123@gmail.com", // optional
    "identityNumber": "1234567890100123" // optional
}
```
Response (Succes) :
```json
{
   "status": 200,
   "message": "succes"
}
```
Response (Failed) :
```json
{
   "status": 412,
   "message": "id is required"
}
```
```json
{
   "status": 404,
   "message": "id not found"
}
```
```json
{
   "status": 500,
   "message": "error"
}
```

## DELETE USER
Endpoint : DEL  user/delete

Headers:
- Authorization : Bearer token

Request Body :
```json
{
    "id": "663722fa5de4cd317833c921"
}
```
Response (Succes) :
```json
{
   "status": 200,
   "message": "succes"
}
```
Response (Failed) :
```json
{
   "status": 404,
   "message": "id not found"
}
```
```json
{
   "status": 500,
   "message": "error"
}
```

## GET USER
Endpoint : GET  user/list

Headers:
- Authorization : Bearer token

Response (Succes):
```json
{
    "status": 200,
    "message": "sukses",
    "data": [
        {
            "_id": "66373533d4c18a5fa7a8c409",
            "userName": "antonmedan",
            "accountNumber": "123456782100",
            "emailAddress": "antonm123@gmail.com",
            "identityNumber": "1234567890100",
            "__v": 0
        },
        {
            "_id": "66373556d4c18a5fa7a8c40c",
            "userName": "antonmedan123",
            "accountNumber": "123456782100123",
            "emailAddress": "antonm123@gmail.com",
            "identityNumber": "1234567890100123",
            "__v": 0
        }
    ]
}
```
Response (failed) :
```json
{
   "status": 500,
   "message": "error"
}
```

## DETAIL USER BY ID
Endpoint : GET  /user/detailsById/:id

Headers:
- Authorization : Bearer token

Request Params :
```json
{
    "id": "66373556d4c18a5fa7a8c40c"
}
```
Response (Succes) :
```json
{
    "status": 200,
    "message": "sukses",
    "data": [
        {
            "_id": "66373556d4c18a5fa7a8c40c",
            "userName": "antonmedan123",
            "accountNumber": "123456782100123",
            "emailAddress": "antonm123@gmail.com",
            "identityNumber": "1234567890100123",
            "__v": 0
        }
    ]
}
```
Response (Failed) :
```json
{
   "status": 404,
   "message": "id not found"
}
```
```json
{
   "status": 500,
   "message": "error"
}
```

## DETAIL USER BY ACCOUNT NUMBER
Endpoint : GET  /user/detailsByAccountNumber/:accountNumber

Headers:
- Authorization : Bearer token

Request Params :
```json
{
    "accountNumber": "123456782100"
}
```
Response (Succes) :
```json
{
    "status": 200,
    "message": "success",
    "data": [
        {
            "_id": "66373533d4c18a5fa7a8c409",
            "userName": "antonmedan",
            "accountNumber": "123456782100",
            "emailAddress": "antonm123@gmail.com",
            "identityNumber": "1234567890100",
            "__v": 0
        }
    ]
}
```
Response (Failed) :
```json
{
   "status": 404,
   "message": "account number not found"
}
```
```json
{
   "status": 500,
   "message": "error"
}
```

## DETAIL USER BY IDENTITY NUMBER
Endpoint : GET  /user/detailsByIdentityNumber/:identityNumber

Headers:
- Authorization : Bearer token

Request Params :
```json
{
    "identityNumber": "1234567890100"
}
```
Response (Succes) :
```json
{
    "status": 200,
    "message": "success",
    "data": [
        {
            "_id": "66373533d4c18a5fa7a8c409",
            "userName": "antonmedan",
            "accountNumber": "123456782100",
            "emailAddress": "antonm123@gmail.com",
            "identityNumber": "1234567890100",
            "__v": 0
        }
    ]
}
```
Response (Failed) :
```json
{
   "status": 404,
   "message": "identity number not found"
}
```
```json
{
   "status": 500,
   "message": "error"
}
```

## GENERATE TOKEN BY IDENTITY NUMBER
Endpoint : GET  /user/generate_token_by_identity_number/:identityNumber

Request Params :
```json
{
    "id": "1234567890100"
}
```
Response (Succes) :
```json
{
    "status": 200,
    "message": "success",
    "data": [
        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MzczNTMzZDRjMThhNWZhN2E4YzQwOSIsInVzZXJOYW1lIjoiYW50b25tZWRhbiIsImFjY291bnROdW1iZXIiOiIxMjM0NTY3ODIxMDAiLCJlbWFpbEFkZHJlc3MiOiJhbnRvbm0xMjNAZ21haWwuY29tIiwiaWRlbnRpdHlOdW1iZXIiOiIxMjM0NTY3ODkwMTAwIiwiaWF0IjoxNzE0OTE3MjIyfQ.RT0bJMX3IuqSjccVq14OUP1d4JcYEV8XYF6orIpjJrw"
        }
    ]
}
```
Response (Failed) :
```json
{
   "status": 404,
   "message": "identity number not found"
}
```
```json
{
   "status": 500,
   "message": "error"
}
```