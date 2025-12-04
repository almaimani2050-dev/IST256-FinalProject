document.addEventListener("DOMContentLoaded", function () {
   const form = document.getElementById("signUpForm");
   const emailInput = document.getElementById("email");

   function validateEmail(email) {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
   }

   function renderSubscribers() {
      const container = document.getElementById("subscribersList");
      if (!container) return;

      container.innerHTML = "";
      const subscribers = JSON.parse(localStorage.getItem("subscribers")) || [];

      subscribers.forEach(sub => {
         const div = document.createElement("div");
         div.classList.add("subscriber");
         div.innerHTML = `
            <strong>${sub.fullName}</strong><br>
            Email: ${sub.email}<br>
            Address: ${sub.address}<br>
            Age: ${sub.age}
            <hr>
         `;
         container.appendChild(div);
      });
   }

   if (!form || !emailInput) {
      renderSubscribers();
      loadSubscribersFromJSON();
      return;
   }

   renderSubscribers();

   form.addEventListener("submit", function (e) {
      e.preventDefault();

      const firstName = document.getElementById("firstName").value.trim();
      const lastName = document.getElementById("lastName").value.trim();
      const email = document.getElementById("email").value.trim();
      const address = document.getElementById("address").value.trim();
      const ageValue = document.getElementById("age").value.trim();
      const age = parseInt(ageValue, 10);

      if (!firstName || !lastName || !email || !address || !ageValue) {
         alert("Please fill out all fields.");
         return;
      }

      if (!validateEmail(email)) {
         alert("Invalid email. Please enter a valid email address.");
         return;
      }

      if (isNaN(age) || age < 1) {
         alert("Please enter a valid age.");
         return;
      }

      const outputMessage = document.getElementById("ageOutput");
      const freeContent = document.getElementById("freeContent");

      if (age < 16) {
         if (outputMessage) {
            outputMessage.textContent =
               "Sorry. You are under 16 and not allowed to sign up for more content.";
            outputMessage.style.color = "red";
         }
         if (freeContent) freeContent.style.display = "block";
         form.style.display = "none";
         return;
      }

      alert("Sign-up successful!");

      let subscribers = JSON.parse(localStorage.getItem("subscribers")) || [];
      const newSubscriber = {
         id: subscribers.length + 1,
         fullName: `${firstName} ${lastName}`,
         email,
         address,
         age
      };

      subscribers.push(newSubscriber);
      localStorage.setItem("subscribers", JSON.stringify(subscribers));

      renderSubscribers();
      form.reset();
   });

   function loadSubscribersFromJSON() {
      const container = document.getElementById("subscribersList");
      if (!container) return;

      const xhr = new XMLHttpRequest();
      xhr.addEventListener("load", function () {
         if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            const jsonsubscribers = data.subscribers;

            let output = "";
            for (let i = 0; i < jsonsubscribers.length; i++) {
               const sub = jsonsubscribers[i];
               output += `
                  <div class="border rounded p-3 mb-3 bg-light">
                     <strong>${sub.fullName}</strong><br>
                     <em>${sub.email}</em><br>
                     Address: ${sub.address}<br>
                     Age: ${sub.age}<br>
                     Paid: ${sub.paid}<br>
                  </div>
               `;
            }
            container.innerHTML = output;
         } else {
            container.innerHTML = "Error loading data";
         }
      });

      xhr.open("GET", "subscribers.json");
      xhr.send();
   }
});
