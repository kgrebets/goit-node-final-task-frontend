# FoodiesApi.RecipesApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiRecipesGet**](RecipesApi.md#apiRecipesGet) | **GET** /api/recipes | Get list of recipes
[**apiRecipesIdGet**](RecipesApi.md#apiRecipesIdGet) | **GET** /api/recipes/{id} | Get recipe by id



## apiRecipesGet

> ApiRecipesGet200Response apiRecipesGet(opts)

Get list of recipes

### Example

```javascript
import FoodiesApi from 'foodies_api';

let apiInstance = new FoodiesApi.RecipesApi();
let opts = {
  'page': 1, // Number | 
  'limit': 10, // Number | 
  'category': "Beef", // String | 
  'area': "Italian", // String | 
  'ingredient': "Tomato" // String | 
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
 **category** | **String**|  | [optional] 
 **area** | **String**|  | [optional] 
 **ingredient** | **String**|  | [optional] 

### Return type

[**ApiRecipesGet200Response**](ApiRecipesGet200Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiRecipesIdGet

> RecipeDetails apiRecipesIdGet(id)

Get recipe by id

### Example

```javascript
import FoodiesApi from 'foodies_api';

let apiInstance = new FoodiesApi.RecipesApi();
let id = "64c8d958249fae54bae90bb7"; // String | 
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

[**RecipeDetails**](RecipeDetails.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

