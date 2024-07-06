const Validate = [
    {id: 'First-Name', error_id : 'first-name-required', type : 'text'},
    {id: 'Last-Name', error_id : 'last-name-required', type : 'text'},
    {id: 'Email-Address', error_id:'email-address-required', type : 'email'},
    {id: 'queryType', error_id:'query-type-required', type : 'radio'},
    {id:'Message', error_id:'message-required', type : 'text'},
    {id: 'consent-check', error_id:'consent-check-required', type : 'checkbox'},
]

 function validateField(field) {
    let value = document.getElementById(field.id).value;
    return new Promise((resolve, reject) => {
        if(field.type === 'text' || field.type === 'email') {
            if(value === '') {
                console.log(document.getElementById(field.error_id).style.border)
                document.getElementById(field.error_id).style.display = 'block';
                document.getElementById(field.id).style.border = '1px solid red'
                reject('error');
            }
            else {
                document.getElementById(field.error_id).style.display = 'none';
                document.getElementById(field.id).style.border = '1px solid #6c757d'
                resolve('valid');
            }
        }
        else if(field.type === 'radio') {
            let radios = document.getElementsByName(field.id);
            let isChecked = Array.from(radios).some(radio => radio.checked);
            if(!isChecked) {
                document.getElementById(field.error_id).style.display = 'block';
                reject('error');
            }
            else {
                document.getElementById(field.error_id).style.display = 'none';
                resolve('valid');
            }
        }
        else if(field.type === 'checkbox') {
            let checkbox = document.getElementById(field.id);
            if (!checkbox.checked) {
                document.getElementById(field.error_id).style.display = 'block';
                reject('error');
            } else {
                document.getElementById(field.error_id).style.display = 'none';
                resolve('valid');
            }
        }
    })
 }


let formValidation = async (event) => {
    event.preventDefault();

    try {
        for(let field of Validate) {
            await validateField(field);
        }

        const toastLiveExample = document.getElementById('liveToast');
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
        toastBootstrap.show()
        
        setTimeout(()=>{
            location.reload();
        }, 2000);
    }
    catch(e) {
        console.log(e);
    }
}

let blurValidation = async (event) => {
    const field = Validate.find(f => f.id === event.target.id || f.id === event.target.name);
    let emailValue = document.getElementById(field.id).value;
    if (field) {
        try {
            await validateField(field);
            if(field.type === 'email') {
                let emailValidation = validator.isEmail(emailValue);
                console.log(emailValidation);
                if(!emailValidation) {
                    document.getElementById(field.error_id).style.display = 'block';
                    document.getElementById(field.error_id).textContent = `Please enter a valid email address`;
                    document.getElementById(field.id).style.border = '1px solid red'
                }
                else {
                    document.getElementById(field.error_id).style.display = 'none';
                    document.getElementById(field.id).style.border = '1px solid #6c757d'
                }
            }
        } catch (e) {
            console.log(e);
        }
    }
};

Validate.forEach((value) => {
    if (value.type === 'radio') {
        document.getElementsByName(value.id).forEach(radio => {
            radio.addEventListener('blur', blurValidation);
        });
    } else {
        document.getElementById(value.id).addEventListener('blur', blurValidation);
    }
})

let submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', formValidation);