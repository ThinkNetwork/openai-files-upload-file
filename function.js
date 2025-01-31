window.function = async function(api_key, file, purpose) {
    // Validate API Key
    if (!api_key.value) {
        return "Error: OpenAI API Key is required.";
    }

    // Validate Required Parameters
    if (!file.value) {
        return "Error: File is required.";
    }
    if (!purpose.value) {
        return "Error: Purpose is required.";
    }

    // Construct request payload
    const formData = new FormData();
    formData.append("file", file.value);
    formData.append("purpose", purpose.value);

    // API endpoint URL
    const apiUrl = "https://api.openai.com/v1/files";

    // Make API request
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${api_key.value}`
            },
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            return `Error ${response.status}: ${errorData.error?.message || "Unknown error"}`;
        }

        // Parse and return the response
        const responseData = await response.json();
        return JSON.stringify(responseData, null, 2);

    } catch (error) {
        return `Error: Request failed - ${error.message}`;
    }
};
