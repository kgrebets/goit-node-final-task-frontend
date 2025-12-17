# FoodiesApi.CategoriesApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiCategoriesGet**](CategoriesApi.md#apiCategoriesGet) | **GET** /api/categories | Get all recipe categories



## apiCategoriesGet

> [ApiCategoriesGet200ResponseInner] apiCategoriesGet()

Get all recipe categories

### Example

```javascript
import FoodiesApi from 'foodies_api';

let apiInstance = new FoodiesApi.CategoriesApi();
apiInstance.apiCategoriesGet().then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

This endpoint does not need any parameter.

### Return type

[**[ApiCategoriesGet200ResponseInner]**](ApiCategoriesGet200ResponseInner.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

