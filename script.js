const platypusImages = ["platypus1.jpg", "platypus2.jpg", "platypus3.jpg"];
const factParagraph = document.getElementById("fact-paragraph");
const platypusImage = document.getElementById("platypus-image");
const factButton = document.getElementById("fact-button");

const gptApiKey = "YOUR_GPT_API_KEY"; // Replace with your actual GPT-3 API key.

const getRandomFact = async () => {
    try {
        // Call the GPT-3 API to generate a random platypus fact.
        const response = await fetch("https://api.openai.com/v1/engines/davinci/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${gptApiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: "Generate a random fact about platypuses.",
                max_tokens: 50, // Adjust as needed.
            }),
        });
        
        if (response.ok) {
            const data = await response.json();
            factParagraph.innerText = data.choices[0].text;
        } else {
            factParagraph.innerText = "Failed to fetch a fact. Please try again later.";
        }
    } catch (error) {
        console.error(error);
        factParagraph.innerText = "An error occurred. Please try again later.";
    }
};

factButton.addEventListener("click", () => {
    // Change the platypus image to a random one from the array.
    const randomImage = platypusImages[Math.floor(Math.random() * platypusImages.length)];
    platypusImage.src = randomImage;

    // Get a new random fact about platypuses.
    getRandomFact();
});

// Initial call to get a random fact when the page loads.
getRandomFact();
