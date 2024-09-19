document.addEventListener('DOMContentLoaded', async function () {
    const token = localStorage.getItem('token');
    let status = `<span class="text-green-600 font-bold" style="border-radius: 5px; padding: 2px 5px; background-color: #c6f7d0;">Accepted</span>`;
    if (!token) {
        alert('You must be logged in to view this page.');
        window.location.href = '/Public/login.html';
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
            window.location.href = '/Public/login.html';
            return;
        }

        // Fetch accepted contracts
        const contractsResponse = await fetch('http://localhost:3000/contracts/accepted', {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const contractsResult = await contractsResponse.json();
        if (contractsResponse.ok) {
            const contractsList = document.getElementById('contractsList');
            if (contractsResult.length === 0) {
                contractsList.innerHTML = '<tr><td colspan="4" class="text-center py-4">No accepted contracts found.</td></tr>';
            } else {
                contractsList.innerHTML = contractsResult.map(contract => `
                    <tr>
                        <td class="py-2 px-4 pr-4 pl-0 border-b">${contract.companyName}</td>
                        <td class="py-2 px-4 pr-4 pl-0 border-b">${contract.contractDetails}</td>
                        <td class="py-2 px-4 pr-4 pl-4 border-b">${new Date(contract.startDate).toLocaleDateString()}</td>
                        <td class="py-2 px-4 pr-4 pl-4 border-b">${new Date(contract.endDate).toLocaleDateString()}</td>
                        <td class="py-2 px-4 pr-4 pl-4 border-b">${status}</td>


                    </tr>
                `).join('');
            }
        } else {
            console.error('Error fetching contracts:', contractsResult.message);
            alert(`Error: ${contractsResult.message}`);
        }
    } catch (error) {
        console.error('Error connecting to server:', error);
        alert('Failed to connect to server. Please try again later.');
    }

    // Logout functionality
    document.getElementById('logout').addEventListener('click', function (e) {
        e.preventDefault();
        localStorage.removeItem('token');
        window.location.href = '/Public/login.html';
    });
});
