# FoodiesApi.UsersApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiUsersFollowingGet**](UsersApi.md#apiUsersFollowingGet) | **GET** /api/users/following | Get users that the current user is following
[**apiUsersMeAvatarPost**](UsersApi.md#apiUsersMeAvatarPost) | **POST** /api/users/me/avatar | Update current user&#39;s avatar
[**apiUsersMeGet**](UsersApi.md#apiUsersMeGet) | **GET** /api/users/me | Get current user information
[**apiUsersRecipesGet**](UsersApi.md#apiUsersRecipesGet) | **GET** /api/users/recipes | Get recipes of the logged-in user
[**apiUsersUserIdFollowersDelete**](UsersApi.md#apiUsersUserIdFollowersDelete) | **DELETE** /api/users/{userId}/followers | Unfollow a user
[**apiUsersUserIdFollowersGet**](UsersApi.md#apiUsersUserIdFollowersGet) | **GET** /api/users/{userId}/followers | Get followers of a user
[**apiUsersUserIdFollowersPost**](UsersApi.md#apiUsersUserIdFollowersPost) | **POST** /api/users/{userId}/followers | Follow a user
[**apiUsersUserIdGet**](UsersApi.md#apiUsersUserIdGet) | **GET** /api/users/{userId} | Get detailed info about another user
[**apiUsersUserIdRecipesGet**](UsersApi.md#apiUsersUserIdRecipesGet) | **GET** /api/users/{userId}/recipes | Get recipes of a specific user



## apiUsersFollowingGet

> [ApiUsersFollowingGet200ResponseInner] apiUsersFollowingGet()

Get users that the current user is following

Returns a list of users the authenticated user follows, including total recipes count for each user

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

[**[ApiUsersFollowingGet200ResponseInner]**](ApiUsersFollowingGet200ResponseInner.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiUsersMeAvatarPost

> apiUsersMeAvatarPost(avatar)

Update current user&#39;s avatar

### Example

```javascript
import FoodiesApi from 'foodies_api';
let defaultClient = FoodiesApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new FoodiesApi.UsersApi();
let avatar = "/path/to/file"; // File | 
apiInstance.apiUsersMeAvatarPost(avatar).then(() => {
  console.log('API called successfully.');
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **avatar** | **File**|  | 

### Return type

null (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: Not defined


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


## apiUsersRecipesGet

> ApiUsersRecipesGet200Response apiUsersRecipesGet(opts)

Get recipes of the logged-in user

Returns a paginated list of recipes created by the authenticated user

### Example

```javascript
import FoodiesApi from 'foodies_api';
let defaultClient = FoodiesApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new FoodiesApi.UsersApi();
let opts = {
  'page': 1, // Number | Page number
  'limit': 12 // Number | Number of recipes per page
};
apiInstance.apiUsersRecipesGet(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **page** | **Number**| Page number | [optional] [default to 1]
 **limit** | **Number**| Number of recipes per page | [optional] [default to 12]

### Return type

[**ApiUsersRecipesGet200Response**](ApiUsersRecipesGet200Response.md)

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

Returns a list of users who follow the specified user, including total recipes count for each follower

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


## apiUsersUserIdGet

> ApiUsersUserIdGet200Response apiUsersUserIdGet(userId)

Get detailed info about another user

### Example

```javascript
import FoodiesApi from 'foodies_api';
let defaultClient = FoodiesApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new FoodiesApi.UsersApi();
let userId = "userId_example"; // String | ID of the user
apiInstance.apiUsersUserIdGet(userId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **String**| ID of the user | 

### Return type

[**ApiUsersUserIdGet200Response**](ApiUsersUserIdGet200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiUsersUserIdRecipesGet

> ApiUsersUserIdRecipesGet200Response apiUsersUserIdRecipesGet(userId, opts)

Get recipes of a specific user

Returns a paginated list of recipes created by the specified user

### Example

```javascript
import FoodiesApi from 'foodies_api';

let apiInstance = new FoodiesApi.UsersApi();
let userId = "userId_example"; // String | ID of the user
let opts = {
  'page': 1, // Number | Page number
  'limit': 12 // Number | Number of recipes per page
};
apiInstance.apiUsersUserIdRecipesGet(userId, opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **String**| ID of the user | 
 **page** | **Number**| Page number | [optional] [default to 1]
 **limit** | **Number**| Number of recipes per page | [optional] [default to 12]

### Return type

[**ApiUsersUserIdRecipesGet200Response**](ApiUsersUserIdRecipesGet200Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

