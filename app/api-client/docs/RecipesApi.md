# FoodiesApi.RecipesApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiRecipesFavoritesGet**](RecipesApi.md#apiRecipesFavoritesGet) | **GET** /api/recipes/favorites | Get favorite recipes of the authenticated user
[**apiRecipesGet**](RecipesApi.md#apiRecipesGet) | **GET** /api/recipes | Get list of recipes
[**apiRecipesIdDelete**](RecipesApi.md#apiRecipesIdDelete) | **DELETE** /api/recipes/{id} | Delete a recipe
[**apiRecipesIdFavoriteDelete**](RecipesApi.md#apiRecipesIdFavoriteDelete) | **DELETE** /api/recipes/{id}/favorite | Remove recipe from favorites
[**apiRecipesIdFavoritePost**](RecipesApi.md#apiRecipesIdFavoritePost) | **POST** /api/recipes/{id}/favorite | Add recipe to favorites
[**apiRecipesIdGet**](RecipesApi.md#apiRecipesIdGet) | **GET** /api/recipes/{id} | Get recipe by ID
[**apiRecipesPopularGet**](RecipesApi.md#apiRecipesPopularGet) | **GET** /api/recipes/popular | Get popular recipes
[**apiRecipesPost**](RecipesApi.md#apiRecipesPost) | **POST** /api/recipes | Create a new recipe



## apiRecipesFavoritesGet

> ApiRecipesFavoritesGet200Response apiRecipesFavoritesGet(opts)

Get favorite recipes of the authenticated user

Returns a paginated list of recipes added to favorites by the authenticated user

### Example

```javascript
import FoodiesApi from 'foodies_api';
let defaultClient = FoodiesApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new FoodiesApi.RecipesApi();
let opts = {
  'page': 1, // Number | Page number
  'limit': 12 // Number | Number of recipes per page
};
apiInstance.apiRecipesFavoritesGet(opts).then((data) => {
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

[**ApiRecipesFavoritesGet200Response**](ApiRecipesFavoritesGet200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiRecipesGet

> ApiRecipesGet200Response apiRecipesGet(opts)

Get list of recipes

### Example

```javascript
import FoodiesApi from 'foodies_api';

let apiInstance = new FoodiesApi.RecipesApi();
let opts = {
  'page': 1, // Number | 
  'limit': 12, // Number | 
  'categoryid': "6462a6cd4c3d0ddd28897f8d", // String | 
  'areaid': "6462a6f04c3d0ddd28897f9b", // String | 
  'ingredient': "640c2dd963a319ea671e367e" // String | 
};
apiInstance.apiRecipesGet(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **page** | **Number**|  | [optional] 
 **limit** | **Number**|  | [optional] 
 **categoryid** | **String**|  | [optional] 
 **areaid** | **String**|  | [optional] 
 **ingredient** | **String**|  | [optional] 

### Return type

[**ApiRecipesGet200Response**](ApiRecipesGet200Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiRecipesIdDelete

> apiRecipesIdDelete(id)

Delete a recipe

### Example

```javascript
import FoodiesApi from 'foodies_api';
let defaultClient = FoodiesApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new FoodiesApi.RecipesApi();
let id = "id_example"; // String | 
apiInstance.apiRecipesIdDelete(id).then(() => {
  console.log('API called successfully.');
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 

### Return type

null (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## apiRecipesIdFavoriteDelete

> ApiRecipesIdFavoriteDelete200Response apiRecipesIdFavoriteDelete(id)

Remove recipe from favorites

Removes the specified recipe from the authenticated user&#39;s favorites list

### Example

```javascript
import FoodiesApi from 'foodies_api';
let defaultClient = FoodiesApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new FoodiesApi.RecipesApi();
let id = "id_example"; // String | Recipe ID
apiInstance.apiRecipesIdFavoriteDelete(id).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**| Recipe ID | 

### Return type

[**ApiRecipesIdFavoriteDelete200Response**](ApiRecipesIdFavoriteDelete200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiRecipesIdFavoritePost

> ApiRecipesIdFavoritePost201Response apiRecipesIdFavoritePost(id)

Add recipe to favorites

Adds the specified recipe to the authenticated user&#39;s favorites list

### Example

```javascript
import FoodiesApi from 'foodies_api';
let defaultClient = FoodiesApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new FoodiesApi.RecipesApi();
let id = "id_example"; // String | Recipe ID
apiInstance.apiRecipesIdFavoritePost(id).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**| Recipe ID | 

### Return type

[**ApiRecipesIdFavoritePost201Response**](ApiRecipesIdFavoritePost201Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiRecipesIdGet

> ApiRecipesIdGet200Response apiRecipesIdGet(id)

Get recipe by ID

### Example

```javascript
import FoodiesApi from 'foodies_api';

let apiInstance = new FoodiesApi.RecipesApi();
let id = "id_example"; // String | 
apiInstance.apiRecipesIdGet(id).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 

### Return type

[**ApiRecipesIdGet200Response**](ApiRecipesIdGet200Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiRecipesPopularGet

> [ApiRecipesPopularGet200ResponseInner] apiRecipesPopularGet(opts)

Get popular recipes

### Example

```javascript
import FoodiesApi from 'foodies_api';

let apiInstance = new FoodiesApi.RecipesApi();
let opts = {
  'page': 1, // Number | 
  'limit': 4 // Number | 
};
apiInstance.apiRecipesPopularGet(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **page** | **Number**|  | [optional] 
 **limit** | **Number**|  | [optional] 

### Return type

[**[ApiRecipesPopularGet200ResponseInner]**](ApiRecipesPopularGet200ResponseInner.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiRecipesPost

> ApiRecipesPost201Response apiRecipesPost(apiRecipesPostRequest)

Create a new recipe

### Example

```javascript
import FoodiesApi from 'foodies_api';
let defaultClient = FoodiesApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new FoodiesApi.RecipesApi();
let apiRecipesPostRequest = new FoodiesApi.ApiRecipesPostRequest(); // ApiRecipesPostRequest | 
apiInstance.apiRecipesPost(apiRecipesPostRequest).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **apiRecipesPostRequest** | [**ApiRecipesPostRequest**](ApiRecipesPostRequest.md)|  | 

### Return type

[**ApiRecipesPost201Response**](ApiRecipesPost201Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

