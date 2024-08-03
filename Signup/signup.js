import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCmL8qcjg4S6NeY3erraq_XhlDJ7Ek2s_E",
    authDomain: "palestine-web.firebaseapp.com",
    projectId: "palestine-web",
    storageBucket: "palestine-web.appspot.com",
    messagingSenderId: "35190212487",
    appId: "1:35190212487:web:0a699bb1fa7b1a49113522",
    measurementId: "G-8TE04Z9ZFW"
  };
const app = initializeApp(firebaseConfig);
const dp = getFirestore(app);
const auth = getAuth(app);

let name = document.getElementById("name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let confirm_password = document.getElementById("confirm-password");
let Register_button = document.getElementById("Register_button");
let toggle_password = document.getElementById("toggle-password");
let toggle_confirm_password = document.getElementById("toggle-confirm-password");
let Register_form = document.getElementById("Register_form");

let registerUser = async (evt) => {
    evt.preventDefault();

    var object = {
        username: name.value,
        useremail: email.value,
        user_password: password.value,
        userCon_pass: confirm_password.value,
    };

    try {
        if (object.user_password === object.userCon_pass) {

            createUserWithEmailAndPassword(auth, object.useremail, object.user_password)
                .then(async (userCredential) => {
                    await   sendEmailVerification(userCredential.user);
                    const ref = doc(dp, "user_information", userCredential.user.uid);
                    await setDoc(ref, {
                        Name: object.username,
                        email: object.useremail,
                        profilePictureURL: "https://firebasestorage.googleapis.com/v0/b/q-a-database-bb349.appspot.com/o/green_picture.png?alt=media&token=90839950-ec70-4c76-af30-480fb10faf3d",
                    });

                    alert("please conform email verification link")
                    window.location.href ="./Palestine/Palestine.html";
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorCode);
                    alert(errorMessage);
                });

        } else {
            alert("Your password and confirm password do not match.");
        }
    } catch (error) {
        alert("An unexpected error occurred.");
        console.error(error);
    }
};

// Attach the submit event to the form, not the button
Register_form.addEventListener("submit", registerUser);

async function sendingVerifyEmail(user) {
    try {
        await user.sendEmailVerification();
        console.log("Verification email sent successfully.");
    } catch (error) {
        console.error("Error sending verification email:", error.message);
    }
}

function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    const eyeIcon = passwordInput.nextElementSibling.querySelector('i');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
    eyeIcon.classList.toggle('ri-eye-off-fill');
    eyeIcon.classList.toggle('ri-eye-fill');
}

toggle_password.addEventListener('click', function () {
    togglePassword('password');
})
toggle_confirm_password.addEventListener('click', function () {
    togglePassword('confirm-password');
});