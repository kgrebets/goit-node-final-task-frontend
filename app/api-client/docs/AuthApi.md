# FoodiesApi.AuthApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiAuthCurrentGet**](AuthApi.md#apiAuthCurrentGet) | **GET** /api/auth/current | Get current authenticated user and refresh token
[**apiAuthLoginPost**](AuthApi.md#apiAuthLoginPost) | **POST** /api/auth/login | Login user
[**apiAuthLogoutPost**](AuthApi.md#apiAuthLogoutPost) | **POST** /api/auth/logout | Logout current user
[**apiAuthRegisterPost**](AuthApi.md#apiAuthRegisterPost) | **POST** /api/auth/register | Register a new user



## apiAuthCurrentGet

> ApiAuthCurrentGet200Response apiAuthCurrentGet()

Get current authenticated user and refresh token

### Example

```javascript
import FoodiesApi from 'foodies_api';
let defaultClient = FoodiesApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new FoodiesApi.AuthApi();
apiInstance.apiAuthCurrentGet().then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

This endpoint does not need any parameter.

### Return type

[**ApiAuthCurrentGet200Response**](ApiAuthCurrentGet200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiAuthLoginPost

> ApiAuthLoginPost200Response apiAuthLoginPost(apiAuthLoginPostRequest)

Login user

### Example

```javascript
import FoodiesApi from 'foodies_api';

let apiInstance = new FoodiesApi.AuthApi();
let apiAuthLoginPostRequest = new FoodiesApi.ApiAuthLoginPostRequest(); // ApiAuthLoginPostRequest | 
apiInstance.apiAuthLoginPost(apiAuthLoginPostRequest).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **apiAuthLoginPostRequest** | [**ApiAuthLoginPostRequest**](ApiAuthLoginPostRequest.md)|  | 

### Return type

[**ApiAuthLoginPost200Response**](ApiAuthLoginPost200Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiAuthLogoutPost

> apiAuthLogoutPost()

Logout current user

### Example

```javascript
import FoodiesApi from 'foodies_api';
let defaultClient = FoodiesApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new FoodiesApi.AuthApi();
apiInstance.apiAuthLogoutPost().then(() => {
  console.log('API called successfully.');
}, (error) => {
  console.error(error);
});

```

### Parameters

This endpoint does not need any parameter.

### Return type

null (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## apiAuthRegisterPost

> ApiAuthRegisterPost201Response apiAuthRegisterPost(apiAuthRegisterPostRequest)

Register a new user

### Example

```javascript
import FoodiesApi from 'foodies_api';

let apiInstance = new FoodiesApi.AuthApi();
let apiAuthRegisterPostRequest = new FoodiesApi.ApiAuthRegisterPostRequest(); // ApiAuthRegisterPostRequest | 
apiInstance.apiAuthRegisterPost(apiAuthRegisterPostRequest).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **apiAuthRegisterPostRequest** | [**ApiAuthRegisterPostRequest**](ApiAuthRegisterPostRequest.md)|  | 

### Return type

[**ApiAuthRegisterPost201Response**](ApiAuthRegisterPost201Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

