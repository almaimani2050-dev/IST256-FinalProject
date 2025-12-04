import React from 'react';

function initArticlePublicationForm() {
   const { useState, useEffect } = React;

   function ArticlePublicationForm() {
      const [formData, setFormData] = useState({
         title: "",
         publicationDate: "",
         distribution: [],
         reviewStatus: "",
         notes: ""
      });

      const [articles, setArticles] = useState([]);
      const [errors, setErrors] = useState({});

      useEffect(() => {
         const stored = JSON.parse(localStorage.getItem("articles")) || [];
         setArticles(stored);
      }, []);

      const handleChange = (e) => {
         const { name, value, checked } = e.target;
         if (name === "distribution") {
            setFormData(prev => ({
               ...prev,
               distribution: checked
                  ? [...prev.distribution, value]
                  : prev.distribution.filter(d => d !== value)
            }));
         } else {
            setFormData(prev => ({ ...prev, [name]: value }));
         }
      };

      const validate = () => {
         const newErrors = {};
         if (!formData.title) newErrors.title = "Article title is required";
         if (!formData.publicationDate) newErrors.publicationDate = "Publication date is required";
         if (formData.distribution.length === 0) newErrors.distribution = "Select at least one distribution channel";
         if (!formData.reviewStatus) newErrors.reviewStatus = "Select review status";
         setErrors(newErrors);
         return Object.keys(newErrors).length === 0;
      };

      const handleSubmit = (e) => {
         e.preventDefault();
         if (!validate()) return;

         const newArticle = {
            id: Date.now(),
            articleTitle: formData.title,
            publicationDate: formData.publicationDate,
            channel: formData.distribution.join(", "),
            status: formData.reviewStatus,
            notes: formData.notes
         };

         const updatedArticles = [...articles, newArticle];
         setArticles(updatedArticles);
         localStorage.setItem("articles", JSON.stringify(updatedArticles));

         setFormData({
            title: "",
            publicationDate: "",
            distribution: [],
            reviewStatus: "",
            notes: ""
         });
         setErrors({});
      };

      return (
         <div className="container my-4">
            <h1>Article Publication</h1>
            <form onSubmit={handleSubmit} className="mb-4">
               <div className="mb-3">
                  <label htmlFor="articleTitle" className="form-label">Article Title</label>
                  <input
                     type="text"
                     className="form-control"
                     id="articleTitle"
                     name="title"
                     value={formData.title}
                     onChange={handleChange}
                  />
                  {errors.title && <small className="text-danger">{errors.title}</small>}
               </div>
               <div className="mb-3">
                  <label htmlFor="publicationDate" className="form-label">Publication Date</label>
                  <input
                     type="date"
                     className="form-control"
                     id="publicationDate"
                     name="publicationDate"
                     value={formData.publicationDate}
                     onChange={handleChange}
                  />
                  {errors.publicationDate && <small className="text-danger">{errors.publicationDate}</small>}
               </div>
               <div className="mb-3">
                  <label className="form-label">Distribution Channel</label>
                  {["Website", "Email Newsletter", "Social Media"].map(channel => (
                     <div className="form-check" key={channel}>
                        <input
                           className="form-check-input"
                           type="checkbox"
                           name="distribution"
                           value={channel}
                           checked={formData.distribution.includes(channel)}
                           onChange={handleChange}
                        />
                        <label className="form-check-label">{channel}</label>
                     </div>
                  ))}
                  {errors.distribution && <div className="text-danger">{errors.distribution}</div>}
               </div>
               <div className="mb-3">
                  <label htmlFor="reviewStatus" className="form-label">Review Status</label>
                  <select
                     className="form-select"
                     id="reviewStatus"
                     name="reviewStatus"
                     value={formData.reviewStatus}
                     onChange={handleChange}
                  >
                     <option value="">Select Review Status</option>
                     <option value="Pending Review">Pending Review</option>
                     <option value="Under Review">Under Review</option>
                     <option value="Approved">Approved</option>
                     <option value="Rejected">Rejected</option>
                  </select>
                  {errors.reviewStatus && <small className="text-danger">{errors.reviewStatus}</small>}
               </div>
               <button type="submit" className="btn btn-primary">Add Article</button>
            </form>
         </div>
      );
   }

   const root = ReactDOM.createRoot(document.getElementById("root"));
   root.render(<ArticlePublicationForm />);
}
