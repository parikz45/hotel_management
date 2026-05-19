import React, { useState } from "react";

function Terms({ onAgree, onClose }) {
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreed) return;
    onAgree(); // ✅ tell parent (Payments) that user agreed
    onClose(); // ✅ close modal
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Terms & Conditions
          </h1>
          <button onClick={onClose} className="text-gray-500 cursor-pointer hover:text-gray-700">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Sections */}
          <div className="space-y-6">
            {[
              {
                title: "1. Acceptance of Terms",
                desc: "By using our services, you confirm that you have read, understood, and agree to be bound by these terms.",
              },
              {
                title: "2. Use of Services",
                desc: "Users are expected to use our services responsibly and lawfully. Misuse, including interference with service functionality, is prohibited.",
              },
              {
                title: "3. Intellectual Property",
                desc: "All content, trademarks, and intellectual property on this platform are owned or licensed by us. Unauthorized use is prohibited.",
              },
              {
                title: "4. Limitation of Liability",
                desc: "We are not liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use our services.",
              },
              {
                title: "5. Modifications",
                desc: "We reserve the right to update or modify these terms at any time. Continued use implies acceptance of changes.",
              },
              {
                title: "6. Governing Law",
                desc: "These terms are governed by the laws of [Your Country/State], and disputes will be resolved in the appropriate courts.",
              },
              {
                title: "7. Refund Policy",
                desc: "Refunds are available for cancellations made at least 48 hours before the scheduled service. Processed within 7–10 business days.",
              },
            ].map((section, i) => (
              <div key={i}>
                <h2 className="text-xl font-semibold text-gray-900">
                  {section.title}
                </h2>
                <p className="text-gray-700">{section.desc}</p>
              </div>
            ))}
          </div>

          {/* Checkbox */}
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded"
            />
            <span className="text-gray-700">
              I have read and agree to the Terms & Conditions
            </span>
          </label>

          {/* Button */}
          <button
            disabled={!agreed}
            type="submit"
            className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition ${
              agreed
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default Terms;
