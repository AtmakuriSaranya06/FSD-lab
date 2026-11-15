const url = "http://localhost:8000/api/v1/movies";


// CREATE MOVIE
const createMovie = (payload) => {

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
        .then((res) => res.json())
        .then((result) => {

            console.log(result);

        })
        .catch((err) => {

            console.log("Error while creating movie", err);

        });

};

createMovie({
    title: "RRR",
    director: "S. S. Rajamouli",
    category: "Action",
    price: 250
});


const readMovie = (id) => {

    fetch(`${url}/${id}`, {
        method: "GET"
    })
        .then((response) => response.json())
        .then((result) => {

            console.log(result);

        })
        .catch((err) => {

            console.log("Error while fetching movie", err);

        });

};

//readMovie();
// UPDATE MOVIE
const updateMovie = (id, payload) => {

    fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
        .then((res) => res.json())
        .then((result) => {

            console.log(result);

        })
        .catch((err) => {

            console.log("Error while updating movie", err);

        });

};

updateMovie("6acdc8ebad00236e85938cae",{price:300});
// DELETE MOVIE
const deleteMovie = (id) => {

    fetch(`${url}/${id}`, {
        method: "DELETE"
    })
        .then((res) => res.json())
        .then((result) => {

            console.log(result);

        })
        .catch((err) => {

            console.log("Error while deleting movie", err);

        });

};
deleteMovie();