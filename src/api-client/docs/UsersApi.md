# FoodiesApi.UsersApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiUsersFollowingGet**](UsersApi.md#apiUsersFollowingGet) | **GET** /api/users/following | Get users that the current user is following
[**apiUsersMeGet**](UsersApi.md#apiUsersMeGet) | **GET** /api/users/me | Get current user information
[**apiUsersUserIdFollowersDelete**](UsersApi.md#apiUsersUserIdFollowersDelete) | **DELETE** /api/users/{userId}/followers | Unfollow a user
[**apiUsersUserIdFollowersGet**](UsersApi.md#apiUsersUserIdFollowersGet) | **GET** /api/users/{userId}/followers | Get followers of a user
[**apiUsersUserIdFollowersPost**](UsersApi.md#apiUsersUserIdFollowersPost) | **POST** /api/users/{userId}/followers | Follow a user



## apiUsersFollowingGet

> [ApiUsersUserIdFollowersGet200ResponseInner] apiUsersFollowingGet()

Get users that the current user is following

### Example

```javascript
import FoodiesApi from 'foodies_api';
let defaultClient = FoodiesApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new FoodiesApi.UsersApi();
apiInstance.apiUsersFollowingGet().then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

This endpoint does not need any parameter.

### Return type

[**[ApiUsersUserIdFollowersGet200ResponseInner]**](ApiUsersUserIdFollowersGet200ResponseInner.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiUsersMeGet

> ApiUsersMeGet200Response apiUsersMeGet()

Get current user information

Returns the authenticated user&#39;s profile information including avatar, name, email, and various counts (recipes, favorites, followers, following)

### Example

```javascript
import FoodiesApi from 'foodies_api';
let defaultClient = FoodiesApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new FoodiesApi.UsersApi();
apiInstance.apiUsersMeGet().then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

This endpoint does not need any parameter.

### Return type

[**ApiUsersMeGet200Response**](ApiUsersMeGet200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiUsersUserIdFollowersDelete

> apiUsersUserIdFollowersDelete(userId)

Unfollow a user

### Example

```javascript
import FoodiesApi from 'foodies_api';
let defaultClient = FoodiesApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new FoodiesApi.UsersApi();
let userId = "userId_example"; // String | ID of the user to unfollow
apiInstance.apiUsersUserIdFollowersDelete(userId).then(() => {
  console.log('API called successfully.');
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **String**| ID of the user to unfollow | 

### Return type

null (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## apiUsersUserIdFollowersGet

> [ApiUsersUserIdFollowersGet200ResponseInner] apiUsersUserIdFollowersGet(userId)

Get followers of a user

### Example

```javascript
import FoodiesApi from 'foodies_api';
let defaultClient = FoodiesApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new FoodiesApi.UsersApi();
let userId = "userId_example"; // String | ID of the user whose followers are requested
apiInstance.apiUsersUserIdFollowersGet(userId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **String**| ID of the user whose followers are requested | 

### Return type

[**[ApiUsersUserIdFollowersGet200ResponseInner]**](ApiUsersUserIdFollowersGet200ResponseInner.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiUsersUserIdFollowersPost

> apiUsersUserIdFollowersPost(userId)

Follow a user

### Example

```javascript
import FoodiesApi from 'foodies_api';
let defaultClient = FoodiesApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new FoodiesApi.UsersApi();
let userId = "userId_example"; // String | ID of the user to follow
apiInstance.apiUsersUserIdFollowersPost(userId).then(() => {
  console.log('API called successfully.');
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **String**| ID of the user to follow | 

### Return type

null (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined

