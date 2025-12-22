import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import ApiClient from '../../api-client/src/ApiClient';
import Loader from '../ui/loader';

import { useAuth } from '../../features/auth/AuthProvider';
import toast from 'react-hot-toast';
import Icon from '../Icon/index.js';
import InputAdvanced from '../ui/input-advanced.jsx';
import TextareaAdvanced from '../ui/textarea-advanced.jsx';
import {
  useGetAreasQuery,
  useGetCategoriesQuery,
  useGetIngredientsListQuery,
} from '../../redux/slices/optionsApiSlice/optionsApiSlice.js';
import Select from '../ui/select.jsx';

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
  const { data: ingredientsData, isError: ingredientsLoadFailed } =
    useGetIngredientsListQuery();
  const { data: areasData, isError: areasLoadFailed } = useGetAreasQuery();
  const { data: categoriesData, isError: categoriesLoadFailed } =
    useGetCategoriesQuery();
  const [photoPreview, setPhotoPreview] = useState(null);
  const [loadingOptions, setLoadingOptions] = useState(true);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (ingredientsLoadFailed || areasLoadFailed || categoriesLoadFailed) {
      toast.error('Failed to load select options');
      setLoadingOptions(true);
    } else {
      setLoadingOptions(false);
    }
  }, [
    ingredientsData,
    areasData,
    categoriesData,
    ingredientsLoadFailed,
    areasLoadFailed,
    categoriesLoadFailed,
  ]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData();

      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('instructions', values.instructions);
      formData.append('time', String(values.cookingTime));
      formData.append('categoryid', values.categoryId);
      formData.append('areaid', values.areaId);

      const ingredientsPayload = (values.ingredients || []).map((item) => ({
        id: item.id,
        measure: item.quantity,
      }));
      formData.append('ingredients', JSON.stringify(ingredientsPayload));

      if (values.photo) {
        formData.append('thumb', values.photo);
      }
      const res = await fetch(`${ApiClient.instance.basePath}/api/recipes`, {
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
        navigate(`/recipe/${newId}`);
      } else {
        alert('Recipe created, but no id in response');
        resetForm();
        setPhotoPreview(null);
      }
    } catch (e) {
      console.error(e);
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
      enableReinitialize={false}
      validateOnBlur={true}
      validateOnChange={false}
    >
      {({ values, errors, setFieldValue, isSubmitting, resetForm }) => (
        <Form className="grid grid-cols-1 lg:grid-cols-12 lg:gap-20">
          <div className="flex justify-center flex-col items-center w-full rounded-7.5 border border-dashed h-80 lg:col-span-5">
            <div
              className="cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="preview"
                  className="photo-upload-preview max-w-max max-h-max"
                  width={480}
                  height={320}
                />
              ) : (
                <div className="flex justify-center flex-col items-center gap-2">
                  <span className="">
                    <Icon
                      name="photo-capture"
                      size={50}
                      className="text-tertiary"
                    />
                  </span>
                  <span className="underline text-sm text-primary">
                    Upload a photo
                  </span>
                </div>
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

          <div className="lg:col-span-7">
            <div className="mt-8 md:mt-10 lg:mt-0">
              <Field
                type="text"
                name="title"
                placeholder="The name of the recipe"
                className="border-0 focus:border-0 ring-0 focus:outline-0 uppercase font-extrabold p-0 text-lg w-full rounded-none"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="field-error"
              />

              <TextareaAdvanced
                showMinMaxChars={true}
                maxChars="200"
                mainWrapperClasses="mt-8 md:mt-10"
                inputClasses="text-sm placeholder:text-tertiary"
                counterClasses="text-sm"
                placeholder="Enter a description of the dish"
                name="description"
                onChange={(e) => {
                  setFieldValue('description', e.target.value);
                }}
                rows="1"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="field-error"
              />
            </div>

            <div className="mt-5 md:mt-14">
              <div className="">
                <div className="mt-8 md:mt-0 grid grid-cols-1 md:grid-cols-12 md:gap-5">
                  <div className="col-span-6">
                    <label className="flex flex-col">
                      <span>CATEGORY</span>
                      <Select
                        name="categoryId"
                        className="field-select"
                        value={values.categoryId}
                        optionPlaceholderText="Select a category"
                        options={categoriesData ?? []}
                        onChange={(e) =>
                          setFieldValue('categoryId', e.target.value)
                        }
                      />
                    </label>
                    <ErrorMessage
                      name="categoryId"
                      component="div"
                      className="field-error"
                    />
                  </div>

                  <div className="mt-5 md:mt-0 col-span-6">
                    <label htmlFor="cookingTime">
                      <span>COOKING TIME</span>
                      <div className="flex items-center gap-3">
                        <button
                          className="px-3 md:px-3.5"
                          type="button"
                          onClick={() =>
                            setFieldValue(
                              'cookingTime',
                              Math.max(1, Number(values.cookingTime) - 1)
                            )
                          }
                        >
                          <Icon name="minus" />
                        </button>
                        <div className="flex text-sm text-tertiary">
                          <Field
                            id="cookingTime"
                            name="cookingTime"
                            type="number"
                            min={1}
                            readOnly
                            className="border-0 focus:border-0 ring-0 focus:outline p-0 rounded-none sr-only"
                          />
                          <span className="font-medium mb-0">
                            {values.cookingTime} min
                          </span>
                        </div>
                        <button
                          className="px-3 md:px-3.5"
                          type="button"
                          onClick={() =>
                            setFieldValue(
                              'cookingTime',
                              Number(values.cookingTime) + 1
                            )
                          }
                        >
                          <Icon name="plus" />
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
              </div>

              <div className="mt-5 md:mt-14 grid grid-cols-1 md:grid-cols-6">
                <div className="flex flex-col md:col-span-3">
                  <label>
                    <span>Area</span>
                    <Select
                      name="areaId"
                      className="w-full"
                      options={areasData ?? []}
                      optionPlaceholderText="Area"
                      value={values.areaId}
                      onChange={(e) => setFieldValue('areaId', e.target.value)}
                    />
                  </label>
                  <ErrorMessage
                    name="areaId"
                    component="div"
                    className="field-error"
                  />
                </div>
              </div>

              <div className="mt-8 md:mt-14">
                <label className="block">
                  <span>Ingredients</span>
                  <div className="grid grid-cols-1 md:grid-cols-12 place-items-center md:gap-5 md:mb-10">
                    <Select
                      name="ingredientId"
                      wrapperClassName="field-select md:col-span-6 w-full"
                      value={values.ingredientId}
                      options={ingredientsData?.results ?? []}
                      optionPlaceholderText="Add the ingredient"
                      onChange={(e) => {
                        setFieldValue('ingredientId', e.target.value);
                      }}
                    />

                    <InputAdvanced
                      mainWrapperClasses="md:col-span-6 w-full"
                      name="ingredientQuantity"
                      placeholder="Enter quantity (e.g. 400 g, 3 pcs)"
                      inputClasses="mt-5 mb-8 text-sm md:my-0"
                      value={values.ingredientQuantity}
                      onChange={(e) => {
                        setFieldValue('ingredientQuantity', e.target.value);
                      }}
                    />
                  </div>
                </label>

                <button
                  type="button"
                  className="btn-primary"
                  onClick={async () => {
                    if (!values.ingredientId || !values.ingredientQuantity) {
                      toast.error('Choose ingredient and quantity');
                      return;
                    }

                    const ingredient = ingredientsData.results.find(
                      (ingredient) => ingredient.id === values.ingredientId
                    );

                    if (!ingredient) {
                      toast.error('Ingredient not found');
                      return;
                    }

                    const nextList = [
                      ...(values.ingredients || []),
                      {
                        id: ingredient.id,
                        name: ingredient.name,
                        image: ingredient.img,
                        quantity: values.ingredientQuantity,
                      },
                    ];

                    await setFieldValue('ingredients', nextList);
                    await setFieldValue('ingredientId', '');
                    await setFieldValue('ingredientQuantity', '');
                  }}
                >
                  ADD INGREDIENT <Icon name="plus" />
                </button>

                {values.ingredients.length > 0 && (
                  <ul className="flex flex-wrap mt-8 gap-4">
                    {values.ingredients.map((item, index) => (
                      <li key={item.id} className="flex gap-1.5 items-center">
                        <div className="flex gap-2.5 items-center">
                          {item.image && (
                            <div className="min-w-18.75 min-h-18.75 md:min-w-24 md:min-h-24 border rounded-3.75 grid place-items-center">
                              <img
                                src={item.image}
                                alt={item.name}
                                width="60"
                                height="60"
                              />
                            </div>
                          )}

                          <div className="">
                            <div className="text-sm md:text-base">
                              {item.name}
                            </div>
                            <div className="text-sm md:text-base text-tertiary">
                              {item.quantity}
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="border-0 focus:border-0 ring-0 focus:outline p-0 rounded-none hover:bg-transparent hover:text-primary self-start"
                          onClick={() => {
                            const updated = values.ingredients.filter(
                              (_, i) => i !== index
                            );
                            setFieldValue('ingredients', updated);
                          }}
                        >
                          <Icon name="close" size={16} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                {typeof errors.ingredients === 'string' && (
                  <div className="field-error">{errors.ingredients}</div>
                )}
              </div>

              <div className="mt-16">
                <label>
                  <span>RECIPE PREPARATION</span>
                  <TextareaAdvanced
                    showMinMaxChars={true}
                    maxChars={1000}
                    placeholder="Enter recipe preparation"
                    name="instructions"
                    rows={5}
                    inputClasses="text-sm font-medium"
                    counterClasses="text-sm font-medium"
                    onChange={(e) => {
                      setFieldValue('instructions', e.target.value);
                    }}
                  />
                </label>
                <ErrorMessage
                  name="instructions"
                  component="div"
                  className="field-error"
                />
              </div>

              <div className="mt-8 flex items-center gap-2">
                <button
                  type="button"
                  className="px-3"
                  onClick={() => {
                    resetForm();
                    setPhotoPreview(null);
                  }}
                >
                  <Icon name="trash" />
                </button>

                <button
                  type="submit"
                  className="btn-secondary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Publishing...' : 'Publish'}
                </button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
