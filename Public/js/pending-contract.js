document.addEventListener('DOMContentLoaded', async () => {
    const contractsList = document.getElementById('contractsList');

    // Fetch JWT token from localStorage
    const token = localStorage.getItem('authToken');
    if (!token) {
        alert("Please log in first.");
        window.location.href = '/login';  // Redirect to login if no token found
        return;
    }

    // Fetch pending contracts for the farmer
    try {
        const response = await fetch('/api/farmer/contracts', {
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
            contractDiv.className = "bg-white shadow-md rounded-lg p-6";

            contractDiv.innerHTML = `
                <p><strong>Company Name:</strong> ${contract.companyName}</p>
                <p><strong>Contract Details:</strong> ${contract.contractDetails}</p>
                <p><strong>Price Per Unit:</strong> $${contract.pricePerUnit}</p>
                <p><strong>Start Date:</strong> ${new Date(contract.startDate).toLocaleDateString()}</p>
                <p><strong>End Date:</strong> ${new Date(contract.endDate).toLocaleDateString()}</p>
                <p><strong>Duration:</strong> ${contract.duration} years</p>

                <div class="mt-4">
                    <button onclick="acceptContract('${contract._id}')" class="bg-green-500 text-white px-4 py-2 rounded">Accept</button>
                    <button onclick="rejectContract('${contract._id}')" class="bg-red-500 text-white px-4 py-2 rounded ml-2">Reject</button>
                </div>
            `;

            contractsList.appendChild(contractDiv);
        });
    } catch (error) {
        console.error('Error fetching contracts:', error);
        contractsList.innerHTML = '<p class="text-red-500">Failed to load contracts. Please try again later.</p>';
    }
});

// Function to accept a contract
async function acceptContract(contractId) {
    const token = localStorage.getItem('authToken');

    try {
        const response = await fetch(`/api/contracts/${contractId}/accept`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            alert('Contract accepted successfully!');
            location.reload();  // Reload the page to refresh the contract list
        } else {
            const errorData = await response.json();
            alert('Error: ' + errorData.error);
        }
    } catch (error) {
        console.error('Error accepting contract:', error);
        alert('An error occurred while accepting the contract.');
    }
}

// Function to reject a contract
async function rejectContract(contractId) {
    const token = localStorage.getItem('authToken');

    try {
        const response = await fetch(`/api/contracts/${contractId}/reject`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            alert('Contract rejected successfully!');
            location.reload();  // Reload the page to refresh the contract list
        } else {
            const errorData = await response.json();
            alert('Error: ' + errorData.error);
        }
    } catch (error) {
        console.error('Error rejecting contract:', error);
        alert('An error occurred while rejecting the contract.');
    }
}