# FoodiesApi.IngredientsApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiIngredientsGet**](IngredientsApi.md#apiIngredientsGet) | **GET** /api/ingredients | Get list of ingredients



## apiIngredientsGet

> ApiIngredientsGet200Response apiIngredientsGet(opts)

Get list of ingredients

### Example

```javascript
import FoodiesApi from 'foodies_api';

let apiInstance = new FoodiesApi.IngredientsApi();
let opts = {
  'page': 1, // Number | 
  'limit': 12, // Number | 
  'name': "Tomato" // String | 
};
apiInstance.apiIngredientsGet(opts).then((data) => {
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
 **name** | **String**|  | [optional] 

### Return type

[**ApiIngredientsGet200Response**](ApiIngredientsGet200Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

