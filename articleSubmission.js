document.addEventListener("DOMContentLoaded", function () {
    if (!localStorage.getItem("articles")) {
      localStorage.setItem("articles", JSON.stringify ([
         {
            "id": 1,
            "articleTitle": "PSU Falls to Oregon 45-37",
            "publicationDate": "2024-12-08",
            "channel": "PSU Clubs",
            "status": "Approved",
            "notes": "PSU falls to Oregon after a long arduous game"
         },
         {
            "id": 2,
            "articleTitle": "Whats Happening on Campus?",
            "publicationDate": "2010-08-05",
            "channel": "Website",
            "status": "Approved",
            "notes": "Let's talk about Old Main, and Campus Life!"
         }
      ]));
    }

    const form = document.getElementById("publicationForm");
    const filterBtn = document.getElementById("filterBtn");
    const resultsDiv = document.getElementById("results");

   form.addEventListener("submit", function (e) {
      e.preventDefault();

   let channels = [];
   if (document.getElementById("website").checked) channels.push("Website");
   if (document.getElementById("newsletter").checked) channels.push("Email Newsletter");
   if (document.getElementById("social").checked) channels.push("Social Media");

   const newArticle = {
      id: Date.now(),
      articleTitle: document.getElementById("articleTitle").value.trim(),
      publicationDate: document.getElementById("publicationDate").value,
      channel: channels.join(", "),
      status: document.getElementById("reviewStatus").value,
      notes: document.getElementById("editorNotes").value.trim()
   };
   let stored = JSON.parse(localStorage.getItem("articles")) || [];

   if (!Array.isArray(stored)) stored = [];
      stored.push(newArticle);
      localStorage.setItem("articles", JSON.stringify(stored));

      alert("Article Added Succesfully!");
      form.reset();

      submitArticleAjax(newArticle);

   });
   filterBtn.addEventListener("click", function () {
      let searchWord = document.getElementById("articleTitle").value.toLowerCase();
      let statusFilter = document.getElementById("reviewStatus").value;

      let stored = JSON.parse(localStorage.getItem("articles")) || [];;
      let output = "";

      stored.forEach(article => {
         let titleMatch = searchWord === "" || article.articleTitle.toLowerCase().includes(searchWord);
         let statusMatch = statusFilter === "" || article.status === statusFilter;

         if (titleMatch && statusMatch) {
            output += `
               <div class = "p-2 mb-2 border border-dark rounded bg-light">
               <strong>Title:</strong> ${article.articleTitle}<br>
               <strong>Date:</strong> ${article.publicationDate}<br>
               <strong>Status:</strong> ${article.status}<br>
               <strong>Channels:</strong> ${article.channel}<br>
               <strong>Notes:</strong> ${article.notes || "None"}<br>
            </div>
         `;
      }
   });
   resultsDiv.innerHTML = output || "<p>No matching articles.</p>";
});

   function submitArticleAjax(data) {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "https://xssyybmxzovn-8080.na.app.codingrooms.com/submit");
      xhr.responseType = "json";
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onload = function () {
         console.log("response", xhr.response);
      }
      console.log("AJAX RAN");
      xhr.onerror = function () {
         console.log("error with ajax");
      }
      xhr.send(JSON.stringify(data));
   }

   function submissionLoaderAjax() {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "https://xssyybmxzovn-8080.na.app.codingrooms.com/submissions");
      xhr.responseType = "json";
      xhr.onload = function () {
         console.log("submissions: ", xhr.response);
      }
      xhr.send();
   }
});