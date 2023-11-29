const loadBreeds = async () => {
    const breedSelect = document.getElementById("breedSelect");
    const loadBreedsBtn = document.getElementById("loadBreedsBtn");
    loadBreedsBtn.disabled = true;

    try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all");
        const data = await response.json();
        breedSelect.innerHTML = '<option value="">Select a breed</option>';
        Object.keys(data.message).forEach((breed) => {
            const option = document.createElement("option");
            option.value = breed;
            option.textContent = breed;
            breedSelect.appendChild(option);
        });
        document.getElementById("breedSection").style.display = "block";
        loadBreedsBtn.style.display = "none";
    } catch (error) {
        console.error("Error fetching breeds:", error);
    } finally {
        loadBreedsBtn.disabled = false;
    }
};

const loadDogImages = async () => {
    const breedSelect = document.getElementById("breedSelect");
    const imageCountInput = document.getElementById("imageCount");
    const loadDogImagesBtn = document.getElementById("loadDogImagesBtn");
    const dogImagesContainer = document.getElementById("dogImages");

    const selectedBreed = breedSelect.value;
    const imageCount = parseInt(imageCountInput.value, 10);

    if (selectedBreed && imageCount > 0) {
        loadDogImagesBtn.disabled = true;
        try {
            const response = await fetch(
                `https://dog.ceo/api/breed/${selectedBreed}/images/random/${imageCount}`
            );
            const data = await response.json();
            dogImagesContainer.innerHTML = "";
            data.message.forEach((imageUrl, index) => {
                const card = document.createElement("div");
                card.className = "card m-2";
                card.style = "width: 200px; height: 200px; background-size: cover; background-image: url('" + imageUrl + "');";

                const cardBody = document.createElement("div");
                cardBody.className = "card-body";

                card.appendChild(cardBody);

                dogImagesContainer.appendChild(card);
                if ((index + 1) % 4 === 0) {
                    const clearfix = document.createElement("div");
                    clearfix.className = "clearfix";
                    dogImagesContainer.appendChild(clearfix);
                }
            });
        } catch (error) {
            console.error("Error fetching images:", error);
        } finally {
            loadDogImagesBtn.disabled = false;
        }
    }
};
document.getElementById("loadBreedsBtn").addEventListener("click", loadBreeds);
document.getElementById("loadDogImagesBtn").addEventListener("click", loadDogImages);
