const fs = require('fs');
const path = require('path');

// Minimal valid PDF generator
function createResumePdf(outputPath) {
  const content = `BT
/F1 22 Tf
50 780 Td
(JAIHARISH D) Tj
/F1 12 Tf
0 -24 Td
(Computer Science Engineering | Rajalakshmi Engineering College (2024-2028)) Tj
0 -16 Td
(CGPA: 8.75 / 10 | Chennai, India | jaiharishd3010@gmail.com) Tj
0 -16 Td
(GitHub: github.com/JaiharishD | LinkedIn: linkedin.com/in/jaiharish-d-a4967932a) Tj
0 -28 Td
/F1 16 Tf
(CORE CONCEPT: I BUILD IDEAS INTO SYSTEMS) Tj
/F1 11 Tf
0 -22 Td
(Software * AI/ML * Full-Stack * Cloud * Mobile * Geospatial Visualization) Tj
0 -26 Td
/F1 14 Tf
(FEATURED PROJECTS) Tj
/F1 10 Tf
0 -18 Td
(01. RoBridge - Industrial Automation & Warehouse Management (React, FastAPI, Node, ESP32)) Tj
0 -16 Td
(02. AegisGrid - Geospatial AI & Fraud Prevention (React, Deck.gl, MapLibre GL JS, FastAPI)) Tj
0 -16 Td
(03. Arbor - AI & Smart Cultivation Mobile Platform (React Native, Expo, Supabase, Vision AI)) Tj
0 -16 Td
(04. Dropout Prediction & Counseling System (Python, Flask, Scikit-learn, React, Supabase)) Tj
0 -16 Td
(05. AI-Movie-Director - AI Reasoning & Decision Systems (Python, FastAPI, React)) Tj
0 -16 Td
(06. ChatIQ - Communication & WhatsApp Integration Platform (React, APIs, WhatsApp)) Tj
0 -16 Td
(07. FloodGuard - Hydrological Data Visualization & Hazard Prediction (React, Telemetry)) Tj
0 -26 Td
/F1 14 Tf
(TECHNICAL SKILLS) Tj
/F1 10 Tf
0 -18 Td
(Languages: Python, JavaScript, C, Java) Tj
0 -16 Td
(Web & Mobile: React.js, React Native, Expo, HTML5, CSS3, REST APIs) Tj
0 -16 Td
(Backend & Cloud: Node.js, Express.js, Flask, FastAPI, AWS S3, Lambda, API Gateway, Supabase) Tj
0 -16 Td
(AI/ML & Data: PyTorch, Scikit-learn, Pandas, NumPy, Deck.gl, MapLibre GL JS) Tj
0 -16 Td
(Core Competencies: Data Structures, Algorithms, OOP, DBMS, UI/UX Design) Tj
0 -26 Td
/F1 14 Tf
(LEADERSHIP & RECOGNITION) Tj
/F1 10 Tf
0 -18 Td
(Chief Operating Officer (COO) - InovX REC) Tj
0 -14 Td
(Coordinate operations, execution, technical events and initiatives across members.) Tj
0 -16 Td
(Smart India Hackathon (SIH 2026) - Internal Winner) Tj
ET`;

  const streamLength = Buffer.byteLength(content, 'utf8');

  const pdf = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length ${streamLength} >>
stream
${content}
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>
endobj
xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000060 00000 n 
0000000117 00000 n 
0000000234 00000 n 
0000000${(300 + streamLength).toString().padStart(3, '0')} 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
${400 + streamLength}
%%EOF`;

  fs.writeFileSync(outputPath, pdf, 'binary');
  console.log('Resume PDF generated successfully at:', outputPath);
}

const target = path.join(__dirname, '..', 'public', 'resume', 'Jaiharish_D_Resume.pdf');
createResumePdf(target);
