document.querySelector(".form").addEventListener("submit", async function(event) {
    event.preventDefault(); 
      const formData = {
        fullName: document.getElementById("fullName").value.trim(),
        email: document.getElementById("email").value.trim(),
        gender: document.getElementById("gender").value,
        branch: document.getElementById("branch").value.trim(),
        phone: document.getElementById("phone").value.trim()
    };

    try {
        const response = await fetch("/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        if (response.ok) {
            alert("Registration Successful!");
                 document.querySelector(".form").reset(); 
        } else {
            alert("Error: " + result.error);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
    }



    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!emailRegex.test(formData.email)) {
        alert("Please enter a valid email address.");
        event.preventDefault();
        return;
    }

    if (!phoneRegex.test(formData.phone)) {
        alert("Phone number must be exactly 10 digits.");
         event.preventDefault();
        return;
    }

    if (gender === "") {
        alert("Please select a gender.");
    }



});



    