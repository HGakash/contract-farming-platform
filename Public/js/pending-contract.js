document.addEventListener('DOMContentLoaded', async () => {
    const contractsList = document.getElementById('contractsList');

    // Fetch JWT token from localStorage
    const token = localStorage.getItem('token'); //authtoken
    console.log(token);
    if (!token) {
        alert("Please log in first.");
        window.location.href = '/login';  // Redirect to login if no token found
        return;
    }

    // Fetch pending contracts for the farmer
    try {
        const response = await fetch('http://localhost:3000/contracts/farmer/contracts', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,  // Include token in request headers
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch contracts');
        }

        const contracts = await response.json();

        if (contracts.length === 0) {
            contractsList.innerHTML = '<p class="text-gray-500">No pending contracts available.</p>';
            return;
        }

        // Display each contract
        contracts.forEach(contract => {
            const contractDiv = document.createElement('div');
            contractDiv.className = "bg-white p-6 rounded-lg shadow-lg mb-6 border border-gray-200 floating-box";

            contractDiv.innerHTML = `
                <div class="bg-green-100 p-4 rounded-t-lg rounded-b-lg">
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mr-4">
                            <i class="fas fa-building text-green-700"></i>
                        </div>
                        <div>
                            <p class="text-lg font-semibold">${contract.companyName}</p>
                            <p class="text-sm text-gray-500">Dealer</p>
                        </div>
                    </div>
                </div>
                <div class="p-4">
                    <p class="mb-2"><strong>Contract Details:</strong> ${contract.contractDetails}</p>
                    <p class="mb-2"><strong>Price Per Unit:</strong> ${contract.pricePerUnit}</p>
                    <p class="mb-2"><strong>Start Date:</strong> ${new Date(contract.startDate).toLocaleDateString()}</p>
                    <p class="mb-2"><strong>End Date:</strong> ${new Date(contract.endDate).toLocaleDateString()}</p>
                    <p class="mb-4"><strong>Duration:</strong> ${contract.duration} years</p>

                    <div class="flex justify-between items-center">
                        <div class="flex space-x-4">
                            <button onclick="acceptContract('${contract._id}')" class="bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600 transition duration-200 flex items-center">
                                <i class="fas fa-check mr-2"></i> Accept
                            </button>
                            <button onclick="rejectContract('${contract._id}')" class="bg-red-500 text-white px-6 py-2 rounded-lg shadow hover:bg-red-600 transition duration-200 flex items-center">
                                <i class="fas fa-times mr-2"></i> Reject
                            </button>
                        </div>
                        <button class="bg-gray-500 text-white px-6 py-2 rounded-lg shadow hover:bg-gray-600 transition duration-200 flex items-center">
                            <i class="fas fa-arrow-left mr-2"></i> Back
                        </button>
                    </div>
                </div>
            `;

            contractsList.appendChild(contractDiv);
        });
    } catch (error) {
        console.error('Error fetching contracts:', error);
        contractsList.innerHTML = '<p class="text-red-500">Failed to load contracts. Please try again later.</p>';
    }
});

