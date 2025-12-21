import MainTitle from '../../components/ui/main-title';
import Subtitle from '../../components/ui/subtitle';
import PathInfo from '../../components/ui/path-info';
import RecipeForm from '../../components/add-recipe/addRecipeForm';

import '../../css/add-recipe.css'


export default function AddRecipePage() {
    return (

       
        <section className="add-recipe-page">
            <div className="add-recipe-page-container">
                <PathInfo current="Add Recipe" />
                <div className="add-recipe-page-content">

                    <div className="add-recipe-left-side">
                        <MainTitle>Add Recipe</MainTitle>

                        <Subtitle>Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces with us.</Subtitle>
                    

                    </div>

                    
                    <div className="add-recipe-right-side">
                        <RecipeForm />
                        </div>
                </div>

                </div>
        </section>
    );
}