# FoodiesApi.TestimonialsApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiTestimonialsGet**](TestimonialsApi.md#apiTestimonialsGet) | **GET** /api/testimonials | Get all testimonials



## apiTestimonialsGet

> [ApiTestimonialsGet200ResponseInner] apiTestimonialsGet()

Get all testimonials

### Example

```javascript
import FoodiesApi from 'foodies_api';

let apiInstance = new FoodiesApi.TestimonialsApi();
apiInstance.apiTestimonialsGet().then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

This endpoint does not need any parameter.

### Return type

[**[ApiTestimonialsGet200ResponseInner]**](ApiTestimonialsGet200ResponseInner.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

