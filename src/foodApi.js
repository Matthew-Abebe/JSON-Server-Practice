//This function has two parameters. The first parameter, 'foodItem' passes the objects within the database.json. The second parameter 'productItem' passes the ojbects from the world.openfoodfacts.org/api.//

foodFactory = (foodItem, productItem) => {

    //The body of the function has a variable called 'ingredientList' which is set equal to an empty string. The ingredient arrays from the world.openfoodfacts.org/api. is found using dot notation and then a forEach loop is made to loop through the ingredients. The ingredient arrays are passed as an argument for the forEach function as 'ingredient'. The variable 'ingredientList' is set plus equal to the argument's text as a tempelate literal formatted with list tags.//

    let ingredientList = "";
    productItem.product.ingredients.forEach(ingredient => {
        ingredientList += `<li>${ingredient.text}</li>`
    })

    //The return statement uses tempelate literals, tags, and dot notation to return the relevant information.//
    return `<h1>${foodItem.name}</h1>
    <h2>Country of Origin: ${productItem.product.countries}</h2>
    <h3>Calories: ${productItem.product.nutriments.energy}
    <h3>Sugar: ${productItem.product.nutriments.sugars}
    <h3>Fat: ${productItem.product.nutriments.fat}
    <ul>Ingredients: ${ingredientList}</ul>
    `
}

//This function has one argument, 'foodAsHTML'. The variable 'el' contains a reference to the ID 'container' which exists as an ID to a div in the index.html. The inner.HTML of 'el' is set plus equal to the argument foodAsHTML.//
addFoodToDom = (foodAsHTML) => {
    el.innerHTML += foodAsHTML;
}

//The function 'getData' has a parameter of 'resource'. The function has a variable named 'el' and its innerHTML is set equal to an empty string.//
function getData(resource) {
    el.innerHTML = "";

    //This fetch call accesses the database.json and the '.then' passes the raw data as 'foodResult'. 'foodResult' is then returned.//
    fetch(`http://localhost:8088/${resource}`)
        .then(foodResult => {
            console.log(foodResult)
            return foodResult
        })

        //This '.then' passes the raw data as foods to the function 'foods.json()' which formats the strings into objects.//
        .then(foods => foods.json())

        //This '.then' passes the data that has been formatted to a forEach loop 'parsedFoods.forEach' and passes the data as the parameter 'food'.//
        .then(parsedFoods => {
            parsedFoods.forEach(food => {

                //This fetch call accesses the world.openfoodfacts.org/api which is possible because the barcode is used as a reference in link by string interpolation.//
                fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)

                    //This '.then' passes the raw data as 'response' to the 'response.json()' function, which formats the data into objects.//
                    .then(response => response.json())
                    //This '.then' passes the formatted data as the parameter 'productInfo'. The variable 'foodAsHTML' is set equal to the function 'foodFactory' which has two parameters, 'food' and 'productInfo'.//
                    .then(productInfo => {
                        const foodAsHTML = foodFactory(food, productInfo);
                        //The function 'addFoodToDom' has the parameter 'foodAsHTML'.//
                        addFoodToDom(foodAsHTML);
                        console.log(productInfo);
                    })

            })
        })
}

//The variable 'el' is set equal to a reference of the ID 'container' which exists as an ID to a div element in the index.html.//
const el = document.querySelector("#container");

//The variable 'getDataButton' is set equal to a reference of the class 'btn-getData' which exists as an ID to a button element in the index.html. An event listener of 'click' is added to the variable 'getDataButton' ...?// 
const getDataButton = document.getElementById("btn-getData");
getDataButton.addEventListener("click", () => getData("drinks"));

//The variable 'getDataButton' is set equal to a reference of the class 'btn-getData2' which exists as an ID to a button element in the index.html. An event listener of 'click' is added to the variable 'getDataButton2' ...?// 
const getDataButton2 = document.getElementById("btn-getData2");
getDataButton2.addEventListener("click", () => getData("food"));

