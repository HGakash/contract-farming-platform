// farmer-list.js

document.addEventListener("DOMContentLoaded", async () => {
    const farmerList = document.getElementById("farmerList");

    try {
        const response = await fetch("http://localhost:3000/api/farmers");
        const farmers = await response.json();

        farmers.forEach(farmer => {
            const farmerCard = `
            <div class="bg-white shadow-md rounded-lg p-4">
                <h2 class="text-xl font-semibold mb-2">Farmer Name: ${farmer.name}</h2>
                <p><strong>Location:</strong> ${farmer.location}</p>
                <p><strong>Produce:</strong> ${farmer.produce}</p>
                <p><strong>Experience:</strong> ${farmer.experience} years</p>
                <p><strong>Contact:</strong> ${farmer.contact}</p>
                <button class="mt-4 bg-blue-500 text-white px-4 py-2 rounded" 
                    onclick="createContract('${farmer._id}', '${farmer.name}', '${farmer.produce}')">
                    Create Contract
                </button>
            </div>`;
            farmerList.innerHTML += farmerCard;
        });
    } catch (error) {
        console.error("Error fetching farmers:", error);
    }
});

function createContract(farmerId, farmerName, farmerProduce) {
    // Redirect to contract creation page with farmer details in the query string
    window.location.href = `create-contract.html?farmerId=${farmerId}&farmerName=${encodeURIComponent(farmerName)}&farmerProduce=${encodeURIComponent(farmerProduce)}`;
}

