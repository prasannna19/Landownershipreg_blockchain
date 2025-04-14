import React, { useState } from "react";
import "../styles/Help.css";

const Help = () => {
  const [faqs, setFaqs] = useState([
    {
      question: "How do I request a land?",
      answer: "Go to 'View Lands' and click the 'Request' button. Wait for seller approval.",
    },
    {
      question: "Why isn't my land showing in Make Payment?",
      answer: "Only approved requests appear there. Make sure the seller approved your request.",
    },
    {
      question: "How can I transfer my purchased land?",
      answer: "Go to 'Transfer Ownership' and enter the recipient's wallet address.",
    },
  ]);

  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  const handleAddFaq = () => {
    if (!newQuestion.trim() || !newAnswer.trim()) {
      alert("❌ Please fill out both question and answer.");
      return;
    }

    const updatedFaqs = [...faqs, { question: newQuestion, answer: newAnswer }];
    setFaqs(updatedFaqs);
    setNewQuestion("");
    setNewAnswer("");
  };

  return (
    <div className="help-container">
      <h2>❓ Help & FAQs</h2>

      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <p><strong>Q:</strong> {faq.question}</p>
            <p><strong>A:</strong> {faq.answer}</p>
            <hr />
          </div>
        ))}
      </div>

      <h3>📝 Ask a New Question</h3>
      <input
        type="text"
        placeholder="Your question..."
        value={newQuestion}
        onChange={(e) => setNewQuestion(e.target.value)}
      />
      <input
        type="text"
        placeholder="Answer..."
        value={newAnswer}
        onChange={(e) => setNewAnswer(e.target.value)}
      />
      <button onClick={handleAddFaq}>➕ Add FAQ</button>
    </div>
  );
};

export default Help;
