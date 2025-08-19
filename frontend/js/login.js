const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData);
    await login(data);
    loginForm.reset();
})

async function login(data) {

    try {
        const res = await fetch('http://localhost:3000/api/users/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const result = await res.json();

        if(res.status === 200) {
            sessionStorage.setItem('userId', result.userId);
            window.location.href = "/html/products.html";

        } else {
            const error = await result;
            alert(`Login failed: ${error.message}`);
        }

    } catch (error) {
        console.error('Error:', error);
    }


}