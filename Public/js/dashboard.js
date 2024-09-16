document.addEventListener('DOMContentLoaded', async function () {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('You must be logged in to view this page.');
        window.location.href = '/Public/login.html'; // Redirect to login if no token
        return; 
    }

    try {
        // Fetch user information
        const userResponse = await fetch('http://localhost:3000/api/me', {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const userResult = await userResponse.json();
        if (userResponse.ok) {
            document.getElementById('userName').textContent = userResult.name;
            document.getElementById('userrole').textContent = userResult.role;
        } else {
            console.error('Error fetching user info:', userResult.message);
            alert(`Error: ${userResult.message}`);
            window.location.href = '/Public/login.html'; // Redirect to login if error
            return;
        }

        // Fetch contracts
        // const contractsResponse = await fetch('http://localhost:3000/api/contracts', {
        //     headers: { 'Authorization': `Bearer ${token}` }
        // });

    //     const contractsResult = await contractsResponse.json();
    //     if (contractsResponse.ok) {
    //         const contractsList = document.getElementById('contractsList');
    //         if (contractsResult.length === 0) {
    //             contractsList.innerHTML = '<p>No contracts found.</p>';
    //         } else {
    //             contractsList.innerHTML = contractsResult.map(contract => `
    //                 <div class="p-4 mb-4 bg-gray-200 rounded shadow">
    //                     <h3 class="text-lg font-bold">${contract.title}</h3>
    //                     <p><strong>Description:</strong> ${contract.description}</p>
    //                     <p><strong>Terms:</strong> ${contract.terms}</p>
    //                     <p><strong>Start Date:</strong> ${new Date(contract.startDate).toLocaleDateString()}</p>
    //                     <p><strong>End Date:</strong> ${new Date(contract.endDate).toLocaleDateString()}</p>
    //                 </div>
    //             `).join('');
    //         }
    //     } else {
    //         console.error('Error fetching contracts:', contractsResult.message);
    //         alert(`Error: ${contractsResult.message}`);
    //     }
     } 
     catch (error) {
         console.error('Error connecting to server:', error);
        alert('Failed to connect to server. Please try again later.');
     }

    document.getElementById('logout').addEventListener('click', function (e) {
        e.preventDefault(); // Prevent the default link behavior
        localStorage.removeItem('token');
        window.location.href = '/Public/login.html'; // Redirect to login page on logout
    });
});
