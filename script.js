document.addEventListener("DOMContentLoaded", () => {
    const loadBreedsBtn = document.getElementById("loadBreedsBtn");
    const dogForm = document.getElementById("dogForm");
    const loadDogImagesBtn = document.getElementById("loadDogImagesBtn");
    const dogImagesContainer = document.getElementById("dogImages");

    loadBreedsBtn.addEventListener("click", async () => {
        loadBreedsBtn.disabled = true;

        try {
            const response = await fetch("https://dog.ceo/api/breeds/list/all");
            const data = await response.json();
            const breedSelect = document.getElementById("breedSelect");
            breedSelect.innerHTML = '<option value="">Select a breed</option>';
            
            Object.keys(data.message).forEach((breed) => {
                const option = document.createElement("option");
                option.value = breed;
                option.textContent = breed;
                breedSelect.appendChild(option);
            });

            dogForm.style.display = "block";
            loadBreedsBtn.style.display = "none";
        } catch (error) {
            console.error("Error fetching breeds:", error);
        } finally {
            loadBreedsBtn.disabled = false;
        }
    });

    loadDogImagesBtn.addEventListener("click", async () => {
        const breedSelect = document.getElementById("breedSelect");
        const imageCountInput = document.getElementById("imageCount");

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
                    const img = document.createElement("img");
                    img.className = "img-dog m-2";
                    img.src = imageUrl;
                    img.alt = `Dog ${index + 1}`; 
                    dogImagesContainer.appendChild(img);
                });
            } catch (error) {
                console.error("Error fetching images:", error);
            } finally {
                loadDogImagesBtn.disabled = false;
            }
        }
    });
});
