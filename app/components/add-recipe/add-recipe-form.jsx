import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import ApiClient from '../../api-client/src/ApiClient';
import AreasApi from '../../api-client/src/api/AreasApi';
import CategoriesApi from '../../api-client/src/api/CategoriesApi';
import IngredientsApi from '../../api-client/src/api/IngredientsApi';
import Loader from '../ui/loader';

import { useAuth } from '../../features/auth/AuthProvider';

const API_BASE_URL = 'https://goit-node-final-task-backend.onrender.com';

const validationSchema = Yup.object().shape({
  photo: Yup.mixed().required('A photo is required'),
  title: Yup.string().required('Required'),
  description: Yup.string()
    .max(200, 'Maximum length is 200 characters')
    .required('Required'),
  areaId: Yup.string().required('Required'),
  categoryId: Yup.string().required('Required'),
  cookingTime: Yup.number()
    .typeError('Must be a number')
    .min(1, 'Minimum of cooking time is 1 minute')
    .required('Required'),
  ingredients: Yup.array()
    .min(1, 'At least one ingredient is required')
    .of(
      Yup.object({
        id: Yup.string().required('Required'),
        name: Yup.string().required('Required'),
        quantity: Yup.string().required('Required'),
      })
    ),
  instructions: Yup.string()
    .max(1000, 'Maximum length is 1000 characters')
    .required('Required'),
});

const initialValues = {
  photo: null,
  title: '',
  description: '',
  areaId: '',
  categoryId: '',
  cookingTime: 10,
  ingredientId: '',
  ingredientQuantity: '',
  ingredients: [],
  instructions: '',
};

export default function AddRecipeForm() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [loadingOptions, setLoadingOptions] = useState(true);

  const fileInputRef = useRef(null);

  const fetchAllIngredients = async (ingredientsApi) => {
    const limit = 50;
    let page = 1;
    let totalPages = 1;
    const all = [];

    do {
      const resp = await ingredientsApi.apiIngredientsGet({ page, limit });
      const pageData = resp?.data || resp || {};
      const { results = [], totalPages: respTotalPages = 1 } = pageData;

      all.push(...results);
      totalPages = respTotalPages || 1;
      page += 1;
    } while (page <= totalPages);

    return all;
  };

  useEffect(() => {
    async function setupAndLoad() {
      try {
        setLoadingOptions(true);

        ApiClient.instance.basePath = API_BASE_URL;
        ApiClient.instance.authentications.bearerAuth.accessToken =
          token || null;

        const areasApi = new AreasApi();
        const categoriesApi = new CategoriesApi();
        const ingredientsApi = new IngredientsApi();

        const [areasData, categoriesData, ingredientsArray] = await Promise.all(
          [
            areasApi.apiAreasGet(),
            categoriesApi.apiCategoriesGet(),
            fetchAllIngredients(ingredientsApi),
          ]
        );

        setAreas(Array.isArray(areasData) ? areasData : []);
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
        setAllIngredients(
          Array.isArray(ingredientsArray) ? ingredientsArray : []
        );
      } catch (error) {
        console.error(error);
        alert('Failed to load select options');
      } finally {
        setLoadingOptions(false);
      }
    }

    setupAndLoad();
  }, [token]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('category', values.categoryId);
      formData.append('area', values.areaId);
      formData.append('time', String(values.cookingTime));
      formData.append('instructions', values.instructions);

      if (values.photo) {
        formData.append('image', values.photo);
      }

      const ingredientsPayload = values.ingredients.map((item) => ({
        ingredientsId: item.id,
        measure: item.quantity,
      }));
      formData.append('ingredients', JSON.stringify(ingredientsPayload));

      const res = await fetch(`${API_BASE_URL}/api/recipes`, {
        method: 'POST',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: formData,
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        console.error('Create recipe error', body);
        alert(
          body?.message || `Failed to create recipe (status ${res.status})`
        );
        return;
      }

      const data = await res.json();
      const newId = data?.id || data?._id;

      if (newId) {
        navigate(`/recipes/${newId}`);
      } else {
        alert('Recipe created, but no id in response');
        resetForm();
        setPhotoPreview(null);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to create recipe');
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingOptions) {
    return <Loader />;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnBlur={true}
      validateOnChange={false}
    >
      {({ values, setFieldValue, isSubmitting, resetForm }) => (
        <Form className="add-recipe-form">
          <div className="add-recipe-form-left">
            <div
              className="add-recipe-page-photo-placeholder"
              style={{ cursor: 'pointer' }}
              onClick={() => fileInputRef.current?.click()}
            >
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="preview"
                  className="photo-upload-preview"
                />
              ) : (
                <>
                  <span className="add-recipe-page__photo-icon">📷</span>
                  <span className="add-recipe-page__photo-text">
                    Upload a photo
                  </span>
                </>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                name="photo-file"
                style={{ display: 'none' }}
                onChange={(event) => {
                  const file = event.target.files?.[0] || null;
                  setFieldValue('photo', file);
                  if (file) {
                    setPhotoPreview(URL.createObjectURL(file));
                  } else {
                    setPhotoPreview(null);
                  }
                }}
              />
            </div>

            <ErrorMessage
              name="photo"
              component="div"
              className="field-error"
            />
          </div>

          <div className="add-recipe-form-right">
            <div className="field-group name-of-recipe">
              <label>
                <Field
                  name="title"
                  type="text"
                  placeholder="THE NAME OF THE RECIPE"
                  className="field-input"
                />
              </label>
              <ErrorMessage
                name="title"
                component="div"
                className="field-error"
              />
            </div>

            <div className="field-group description-dish">
              <label>
                <Field
                  as="textarea"
                  name="description"
                  maxLength={200}
                  className="field-textarea"
                  placeholder="Enter a description of the dish"
                />
              </label>
              <div className="field-counter">
                {values.description.length}/200
              </div>
              <ErrorMessage
                name="description"
                component="div"
                className="field-error"
              />
            </div>

            <div className="field-row">
              <div className="field-group category">
                <label>
                  <h3>CATEGORY</h3>
                  <select
                    name="categoryId"
                    className="field-select"
                    value={values.categoryId}
                    onChange={(e) =>
                      setFieldValue('categoryId', e.target.value)
                    }
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat, index) => (
                      <option
                        key={`${cat.id || cat.name}-${index}`}
                        value={cat.name}
                      >
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </label>
                <ErrorMessage
                  name="categoryId"
                  component="div"
                  className="field-error"
                />
              </div>

              <div className="field-group cooking-time">
                <label>
                  COOKING TIME
                  <div className="time-input">
                    <button
                      className="time-but"
                      type="button"
                      onClick={() =>
                        setFieldValue(
                          'cookingTime',
                          Math.max(1, Number(values.cookingTime) - 1)
                        )
                      }
                    >
                      -
                    </button>
                    <div className="time">
                      <Field
                        name="cookingTime"
                        type="number"
                        min={1}
                        className="field-input time-input-value"
                      />
                      <span>min</span>
                    </div>
                    <button
                      className="time-but"
                      type="button"
                      onClick={() =>
                        setFieldValue(
                          'cookingTime',
                          Number(values.cookingTime) + 1
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </label>
                <ErrorMessage
                  name="cookingTime"
                  component="div"
                  className="field-error"
                />
              </div>
            </div>

            <div className="field-group area">
              <label>
                <h3>Area</h3>
                <select
                  name="areaId"
                  className="field-select"
                  value={values.areaId}
                  onChange={(e) => setFieldValue('areaId', e.target.value)}
                >
                  <option value="">Area</option>
                  {areas.map((area, index) => (
                    <option
                      key={`${area.id || area.name}-${index}`}
                      value={area.name}
                    >
                      {area.name}
                    </option>
                  ))}
                </select>
              </label>
              <ErrorMessage
                name="areaId"
                component="div"
                className="field-error"
              />
            </div>

            <div className="field-group ingredients">
              <span className="field-label">INGREDIENTS</span>

              <div className="field-row add-ingredients">
                <div className="add-ingredients-row">
                  <select
                    name="ingredientId"
                    className="field-select"
                    value={values.ingredientId}
                    onChange={(e) =>
                      setFieldValue('ingredientId', e.target.value)
                    }
                  >
                    <option value="">Add the ingredient</option>
                    {allIngredients.map((ing, index) => (
                      <option key={`${ing.id}-${index}`} value={index}>
                        {ing.name}
                      </option>
                    ))}
                  </select>

                  <Field
                    name="ingredientQuantity"
                    type="text"
                    placeholder="Enter quantity (e.g. 400 g, 3 pcs)"
                    className="field-input enter-quantity"
                  />
                </div>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    if (!values.ingredientId || !values.ingredientQuantity) {
                      alert('Choose ingredient and quantity');
                      return;
                    }

                    const idx = Number(values.ingredientId);
                    const ing = allIngredients[idx];

                    if (!ing) return;

                    const nextList = [
                      ...(values.ingredients || []),
                      {
                        id: ing.id,
                        name: ing.name,
                        image: ing.img || ing.image,
                        quantity: values.ingredientQuantity,
                      },
                    ];

                    setFieldValue('ingredients', nextList);
                    setFieldValue('ingredientId', '');
                    setFieldValue('ingredientQuantity', '');
                  }}
                >
                  ADD INGREDIENT <img src="/images/plus.svg" alt="" />
                </button>
              </div>

              {values.ingredients.length > 0 && (
                <ul className="list-of-ingredients">
                  {values.ingredients.map((item, index) => (
                    <li key={index}>
                      {item.image && (
                        <div className="photo-of-ingredients">
                          <img src={item.image} alt={item.name} />
                        </div>
                      )}

                      <div className="ingredient-text">
                        <div className="ingredient-name">{item.name}</div>
                        <div className="ingredient-quantity">
                          {item.quantity}
                        </div>
                      </div>

                      <button
                        type="button"
                        className="delete-ingredients"
                        onClick={() => {
                          const updated = values.ingredients.filter(
                            (_, i) => i !== index
                          );
                          setFieldValue('ingredients', updated);
                        }}
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <ErrorMessage
                name="ingredients"
                component="div"
                className="field-error"
              />
            </div>

            <div className="field-group recipe-preparation">
              <label>
                <h3>RECIPE PREPARATION</h3>
                <Field
                  as="textarea"
                  name="instructions"
                  maxLength={1000}
                  className="field-textarea"
                  placeholder="Enter recipe"
                />
              </label>
              <div className="field-counter">
                {values.instructions.length}/1000
              </div>
              <ErrorMessage
                name="instructions"
                component="div"
                className="field-error"
              />
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn-trash"
                onClick={() => {
                  resetForm();
                  setPhotoPreview(null);
                }}
              >
                <img src="/images/trash.svg" alt="Clear" />
              </button>

              <button
                type="submit"
                className="btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Publishing...' : 'Publish'}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
