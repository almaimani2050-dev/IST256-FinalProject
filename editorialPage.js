document.addEventListener("DOMContentLoaded", function() {
   const form = document.getElementById("submitArt");
   const titleInput = document.getElementById("title");
   const approveBox = document.querySelector(".approve + input");
   const rejectBox = document.querySelector(".reject + input");
   const reviseBox = document.querySelector(".reviseNow + input");
   const reviseNotes = document.querySelector(".revisions + input");

   function enforceSingleSelection(clickedBox) {
      [approveBox, rejectBox, reviseBox].forEach(box => {
         if (box !== clickedBox) box.checked = false;
      });
   }
   approveBox.addEventListener("change", () => enforceSingleSelection(approveBox));
   rejectBox.addEventListener("change", () => enforceSingleSelection(rejectBox));
   reviseBox.addEventListener("change", () => enforceSingleSelection(reviseBox));

   form.addEventListener("submit", function (e) {
      e.preventDefault();

      const title = titleInput.value.trim();
      const decision = approveBox.checked ? "Approved" :
                       rejectBox.checked ? "Rejected" :
                       reviseBox.checked ? "Revise" : null;
      if (!title) {
         alert("You must enter an article title.");
         return;
      }
      if (!decision) {
         alert("You must select one of the following Approve, Reject, or Revise.");
         return;
      }
      if (decision === "Revise" && reviseNotes.value.trim() === "") {
         alert("Please provide revision notes before submitting.");
         return;
      }
      const newDecision = {
         title: title,
         decision: decision,
         notes: reviseNotes.value.trim(),
         timestamp: new Date().toLocaleString()
      };
      const stored = JSON.parse(localStorage.getItem("editorDecisions")) || [];
      stored.push(newDecision);
      localStorage.setItem("editorDecisions", JSON.stringify(stored));

      alert(`Decision saved: ${decision} for "${title}"`);
      form.reset();
   });
   function submitArticalAjax(data) {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "https://xssyybmxzovn-8080.na.app.codingrooms.com/submit")
      xhr.responseType = "json"
      xhr.setRequestHeader("Content-Type", "application.json")
      xhr.onload = function () {
         console.log("response", xhr.response)
      }
      xhr.onerror = function () {
         console.log("error with ajax");
      }
      xhr.send(JSON.stringify(data))
   }

   function submissionLoaderAjax() {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "https://xssyybmxzovn-8080.na.app.codingrooms.com/submissions")
      xhr.responseType = "json"
      xhr.onload = function () {
         console.log("submissions: ", xhr.response)
      }
      xhr.send()
   }
   function putAjax(id,newData){
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", `https://xssyybmxzovn-8080.na.app.codingrooms.com/update/${id}`)
      xhr.setRequestHeader("Content-Type","application/json")
      xhr.onload = function () {
         console.log("reply: ", xhr.responseText)
      }
      xhr.send(JSON.stringify(newData)) 
   }
});