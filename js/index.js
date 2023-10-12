// Firebase configuration containing API keys and other settings
var firebaseConfig = {
    apiKey: "AIzaSyAgAtwWKzLxuw-UzKcFTXyBEOYMJMs585c",
    authDomain: "fir-webapp-f0bc9.firebaseapp.com",
    projectId: "fir-webapp-f0bc9",
    storageBucket: "fir-webapp-f0bc9.appspot.com",
    messagingSenderId: "136024059491",
    appId: "1:136024059491:web:04af94ea1d50d102b39256",
    measurementId: "G-DF99YNYSY1",
    databaseURL : "https://fir-webapp-f0bc9-default-rtdb.firebaseio.com/"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.auth.Auth.Persistence.LOCAL;  // Set the authentication persistence
  // Event handler for the login button
  $("#btn-login").click(function(){
    var email = $("#email").val();      // Get email and password from the input fields
    var password = $("#password").val();
    if(email != "" && password != ""){             // Check if email and password are not empty
       var result = firebase.auth().signInWithEmailAndPassword(email,password);       // Attempt to sign in with the provided email and password
       result.catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;          // Handle authentication error
        console.log(errorCode);
        console.log(errorMessage);
        window.alert("Message:" + errorMessage);
       })
    }
    else{
        window.alert("Form is incomplete .Please fill out fields")
    }
  })
  // Event handler for the signup button
  $("#btn-signup").click(function(){
    // Get email, password, and confirmPassword from the input fields
    var email = $("#email").val();
    var password = $("#password").val();
    var confirmPassword = $("#confirmPassword").val();
    // Check if email, password, and confirmPassword are not empty
    if(email != "" && password != "" && confirmPassword != ""){    // Check if the password matches the confirmPassword
      if(password == confirmPassword){
        var result = firebase.auth().createUserWithEmailAndPassword(email,password);       // Create a new user with the provided email and password
        result.catch(function(error){
         var errorCode = error.code;
         var errorMessage = error.message;
         console.log(errorCode);
         console.log(errorMessage);
         window.alert("Message:" + errorMessage);
        })
      }
      else{
        window.alert("Password do not match with the Confirm Password")
      }
    }
    else{
        window.alert("Form is incomplete .Please fill out fields")
    }
  })
  // Event handler for the reset password button
  $("#btn-resetPassword").click(function(){
   var auth = firebase.auth();
   var email = $("#email").val();
   if(email != ""){
    auth.sendPasswordResetEmail(email).then(function(){
        window.alert("Email has been sent to you,Please check and verify");
    })
    .catch(function(error){
        var errorCode = error.code;
         var errorMessage = error.message;
         console.log(errorCode);
         console.log(errorMessage);
         window.alert("Message:" + errorMessage);
    });
   }
   else{
    window.alert("Please write your email first")
   }
   })
   $("#btn-logout").click(function(){
    firebase.auth().signOut().then(function() {
      // Sign-out successful, redirect to signin.html
      window.location.href = "signin.html";
  }).catch(function(error) {
      // An error occurred during sign-out
      console.error(error);
  });
   })
   // Event handler for the logout button
  $("#btn-update").click(function(){
    var phone = $("#phone").val();
    var address = $("#address").val();
    var bio = $("#bio").val();
    var firstName = $("#firstName").val();
    var secondName = $("#secondName").val();
    var gender = $("#gender").val();
    var country = $("#country").val();
    var rootRef = firebase.database().ref().child("Users");
    var userID = firebase.auth().currentUser.uid;
    var usersRef = rootRef.child(userID);
    if(firstName != "" && secondName != "" && bio != "" && phone != "" && address != "" && bio != "" && gender != "" && country != "" ){
     var userData = {
        "phone": phone,
        "address": address,
        "bio": bio,
        "firstName": firstName,
        "secondName": secondName,
        "gender": gender,
        "country": country,

     };
     usersRef.set(userData, function(error) 
     {
      if(error)
      {
       var errorCode = error.code;
       var errorMessage = error.message;
       console.log(errorCode);
       console.log(errorMessage);
       window.alert("Message:" + errorMessage);
     }
     else
     {
        window.location.href = "MainPage.html";
     }
   });
   
    }
    else{
        window.alert("User is not authenticated.")
    }
  })
  // Function to switch the view by loading content from a URL
  function switchView(view){
    $.get({
      url:view,
      cache:false,

    })
    .then(function(data){
     $("#container").html(data);
    });
  }
  