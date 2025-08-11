import { ChevronDown, HelpCircle } from 'lucide-react';
import React, { useState } from 'react';
// import { ChevronDown, HelpCircle } from 'lucide-react';

const faqData = [
  {
    id: 1,
    question: "What is WIFELIKE?",
    answer: "WIFE4LIFE is an Islamic matrimonial platform dedicated to helping practicing Muslims find their life partners in alignment with Islamic principles. Our focus is on upholding Islamic values, encouraging family involvement, and ensuring guardian supervision in all interactions."
  },
  {
    id: 2,
    question: "Who can join WIFELIKE?",
    answer: "Practicing Sunni Muslims who are serious about marriage in line with Islamic principles are welcome. We embrace both reverts and those born into the faith, as long as they are dedicated to upholding Islamic values."
  },
  {
    id: 3,
    question: "How does guardian (Wali) involvement work?",
    answer: "The Wali can communicate with the third-party Wali by making a respectful introduction."
  },
  {
    id: 4,
    question: "How do I create a profile?",
    answer: "Click Sign Up and fill out our comprehensive Islamic-focused form. You’ll need to provide personal details, Islamic background, guardian information, and your expectations for marriage."
  },
  {
    id: 5,
    question: "Why do I need guardian information?",
    answer: "Islamic marriage requires guardian (wali) involvement, especially for women. This ensures proper Islamic procedures are followed and maintains the dignity and protection that Islam provides in the marriage process."
  },
  {
    id: 6,
    question: "How long does profile approval take?",
    answer: "Profile approval usually takes 24–48 hours. We manually review each profile to ensure authenticity and sincerity in line with Islamic values. Payment is required before your profile becomes visible to other members and before you can reach out to their respective wali."
  },
  {
    id: 7,
    question: "How do I contact someone I'm interested in?",
    answer: "All communication is conducted through guardians. If you find a profile that interests you, click Contact Guardian to obtain the guardian’s contact information. The guardian will facilitate a proper Islamic introduction and communication. You must have created a profile and account before reaching out to a wali."
  },
  {
    id: 8,
    question: "Can I talk directly to potential matches?",
    answer: "Direct communication between non-mahram without guardian supervision is not permitted to maintain Islamic guidelines. All initial contact and arrangements are made through guardians to ensure proper Islamic conduct."
  },
  {
    id: 9,
    question: "What if I don't have a guardian?",
    answer: "If you don’t have a natural guardian, you can appoint a trusted Islamic scholar, imam, or righteous male relative. We can also help connect you with community leaders who can serve as guardians."
  },
  {
    id: 10,
    question: "What behavior is not allowed?",
    answer: "Prohibited: Non-Islamic behavior, inappropriate messages, bypassing guardian involvement, false information, non-serious intentions, requesting photos before proper introduction, and any conduct that violates Islamic principles."
  },
  {
    id: 11,
    question: "What happens if Islamic guidelines are violated?",
    answer: "Profiles violating Islamic guidelines will be immediately suspended or permanently banned. We take Islamic compliance very seriously and have zero tolerance for inappropriate behavior."
  },
  {
    id: 12,
    question: "How much does WIFELIKE cost?",
    answer: "Each member pays a fee of £50 to create and list their profile on our website, which also allows you to view the contact details of other members. This fee ensures that all profiles represent real individuals, and there are no additional charges beyond this initial amount."
  },
  {
    id: 13,
    question: "Is there a refund policy?",
    answer: "No refunds are provided once payment is made and profile is activated. This policy ensures commitment and prevents misuse. Please ensure you understand this before making payment."
  },
  {
    id: 14,
    question: "What payment methods are accepted?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All transactions are secured with industry-standard encryption for your safety."
  },
  {
    id: 15,
    question: "How can I get help?",
    answer: "Our support team is available 24/7 through live chat, email (support@wifelike.com), or phone. We also have an extensive help center with guides and tutorials for common questions."
  },
  {
    id: 16,
    question: "Online Istishar Service",
    answer: "Our Online Istishar (consultation) service connects you with qualified Islamic counselors and scholars who can provide guidance on marriage-related questions, compatibility concerns, and religious matters. Please note that the only payment method we accept is PayPal."
  },
  {
    id: 17,
    question: "How can I get help?",
    answer: "For assistance, please contact us at <a class='text-red-600' href='mailto:wife4life@mail.co.uk'>wife4life@mail.co.uk</a>. We’re here to help with profile setup, technical issues, payment problems, and general platform questions. Our typical response time is 24–48 hours."
  },
  {
    id: 18,
    question: "Online Nikah Service",
    answer: "We may be able to offer an online Nikah service, depending on availability. For more information, please email us at wife4life@mail.co.uk."
  }
];

const FAQ = () => {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <>
    <div id='faq' className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div  className="bg-[#C31F1F] rounded-lg p-4 text-center shadow-lg mb-6">
          <div className="flex items-center justify-center mb-1">
            <HelpCircle className="w-6 h-6 text-white mr-2" />
            <h1 className="text-xl font-bold text-white">FAQ</h1>
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqData.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-4 py-3 text-left bg-[#C31F1F] hover:bg-red-700 text-white font-medium transition-colors duration-200 flex items-center justify-between group focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-inset rounded-lg text-base"
                aria-expanded={openItems.has(item.id)}
              >
                <span className="pr-4">{item.question}</span>
                <ChevronDown 
                  className={`w-4 h-4 transition-transform duration-300 flex-shrink-0 ${
                    openItems.has(item.id) ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openItems.has(item.id) && (
                <div className="px-4 py-3 text-gray-700 bg-gray-50 border-t">
                  {/* Render HTML if answer contains HTML, else render as text */}
                  {/<[a-z][\s\S]*>/i.test(item.answer) ? (
                    <span dangerouslySetInnerHTML={{ __html: item.answer }} />
                  ) : (
                    <span>{item.answer}</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default FAQ;
