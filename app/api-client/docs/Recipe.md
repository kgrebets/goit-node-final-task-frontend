# FoodiesApi.Recipe

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** |  | [optional] 
**title** | **String** |  | [optional] 
**time** | **Number** | Cooking time in minutes | [optional] 
**description** | **String** |  | [optional] 
**instructions** | **String** |  | [optional] 
**thumb** | **String** |  | [optional] 
**isFavorite** | **Boolean** | Flag whether recipe is in the user&#39;s favorites. Appears only for authenticated users. | [optional] 
**creator** | [**RecipeCreator**](RecipeCreator.md) |  | [optional] 
**category** | [**RecipeCategory**](RecipeCategory.md) |  | [optional] 
**area** | [**RecipeArea**](RecipeArea.md) |  | [optional] 
**recipeIngredients** | [**[RecipeIngredientItem]**](RecipeIngredientItem.md) |  | [optional] 


