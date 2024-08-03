import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, collection, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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
const auth = getAuth(app);
const dp = getFirestore(app);


let email = document.getElementById("email");
let password = document.getElementById("password");
let toggle_password = document.getElementById("toggle-password1");
let login_form = document.getElementById("login_form");

let login_here = async evt => {
    evt.preventDefault();

    var object = {
        useremail: email.value,
        user_password: password.value,
    };

    try {
        if (object.user_password.length > 6) {
            signInWithEmailAndPassword(auth, object.useremail, object.user_password)
                .then(async (userCredential) => {
                    const user = userCredential.user;
                    console.log("User logged in:", user);


                    var ref = doc(dp, "user_information", user.uid);
                    const docsnap = await getDoc(ref);

                    if (docsnap.exists()) {
                        const userName = docsnap.data().Name;
                        alert("Welcome, " + userName);
                        sessionStorage.setItem("user-info", JSON.stringify({
                            Name: userName
                        }));
                    }
                    onAuthStateChanged(auth, (user) => {
                        if (user) {
                            window.location.href = "./Palestine/Palestine.html";
                            console.log("welcom")
                        }
                    })
                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            alert(errorCode);
                            alert(errorMessage);
                        });
                } else {
                    alert("Password should be at least 6 characters long.");
                }
    } catch (error) {
            alert("An unexpected error occurred.");
            console.error(error);
        }
    }


login_form.addEventListener("submit", login_here);




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