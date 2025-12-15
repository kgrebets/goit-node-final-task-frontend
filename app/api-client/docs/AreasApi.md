# FoodiesApi.AreasApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiAreasGet**](AreasApi.md#apiAreasGet) | **GET** /api/areas | Get all areas



## apiAreasGet

> [ApiAreasGet200ResponseInner] apiAreasGet()

Get all areas

### Example

```javascript
import FoodiesApi from 'foodies_api';

let apiInstance = new FoodiesApi.AreasApi();
apiInstance.apiAreasGet().then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

This endpoint does not need any parameter.

### Return type

[**[ApiAreasGet200ResponseInner]**](ApiAreasGet200ResponseInner.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

