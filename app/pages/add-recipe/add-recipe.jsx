import MainTitle from '../../components/ui/main-title';
import Subtitle from '../../components/ui/subtitle';
import RecipeForm from '../../components/add-recipe/add-recipe-form.jsx';
import PathInfo from '../../components/path-info/index.js';

export default function AddRecipePage() {
  return (
    <section className="container">
      <div className="">
        <PathInfo current="Add Recipe" />
        <div className="mt-8">
          <div className="">
            <MainTitle>Add Recipe</MainTitle>

            <Subtitle>
              Reveal your culinary art, share your favorite recipe and create
              gastronomic masterpieces with us.
            </Subtitle>
          </div>

          <div className="mt-8 md:mt-10">
            <RecipeForm />
          </div>
        </div>
      </div>
    </section>
  );
}
