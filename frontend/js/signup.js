
const signUpForm = document.getElementById("sign-up-form");

signUpForm.addEventListener("submit", async(e) => {
    e.preventDefault();

    const formData = new FormData(signUpForm);
    const data = Object.fromEntries(formData);

    await signUp(data);
    signUpForm.reset();

})

async function signUp(data){
    try{

        const res = await fetch('http://localhost:3000/api/users/register',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const result = await res.json();
        if(res.status === 201){
            alert("User registered successfully");
            window.location.href = "/html/login.html";
        } 
        
        else if(res.status === 409) {
            alert("User already exists");
        }
        
        else {
            alert(result.message);
        }


    } catch (error) {
        console.error('Error:', error);
    }
}