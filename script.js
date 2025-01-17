<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employment Equity Deviation Record</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <img src="logo.png" alt="Company Logo">
        <h1>Employment Equity Deviation Record</h1>
    </header>

    <form id="ee-form">
        <h3>Purpose:</h3>
        <p>The purpose of this tool is to document all relevant information and evidence in the situation where an appointment is made that is not in alignment with the EE Plan and Targets.</p>
        <h3>Procedure:</h3>
        <p>Prior to making an offer for employment and/ or promotion where the selected candidate is not the number 1 preferred candidate based on the EE analysis and Ministerial Targets, complete the questions below and add in relevant supporting information.</p>
        <h3>Reason:</h3>
        <p>In the event that there is a DG Review and/ or other inspection and/ or litigation, the designated employer may be requested to present evidence in respect of the 7 justifiable reasons for not meeting specific targets.</p>

        <label>Date of Completion:</label>
        <input type="date" id="date-completion" required>

        <label>Department or Division:</label>
        <input type="text" id="department" required>

        <label>Job Title and Job Profile:</label>
        <input type="text" id="job-title" required>

        <label>Occupational Level:</label>
        <select id="occupational-level" required>
            <option value="Top Management">Top Management</option>
            <option value="Senior Management">Senior Management</option>
            <option value="Middle Management">Middle Management</option>
            <option value="Junior Management">Junior Management</option>
            <option value="Semi-skilled">Semi-skilled</option>
            <option value="Unskilled">Unskilled</option>
        </select>

        <label>Urgency Level for Appointment:</label>
        <input type="text" id="urgency-level" required>

        <label>New Position or Replacement Position:</label>
        <input type="text" id="position-type" required>

        <label>Targeted Sub-Race and Gender Groups (Highest Priority):</label>
        <input type="text" id="priority-highest" required>

        <label>Targeted Sub-Race and Gender Groups (Next Highest):</label>
        <input type="text" id="priority-next-highest">

        <label>Targeted Sub-Race and Gender Groups (Third Highest):</label>
        <input type="text" id="priority-third-highest">

        <label>Preferred Candidate Aligned to Highest Priority Sub-Race and Gender Group:</label>
        <input type="text" id="preferred-alignment" required>

        <h4>Assessment of Candidate:</h4>
        <label>Qualifications:</label>
        <textarea id="qualifications"></textarea>

        <label>Prior Learning:</label>
        <textarea id="prior-learning"></textarea>

        <label>Relevant Experience:</label>
        <textarea id="experience"></textarea>

        <label>Acquirable Competencies:</label>
        <textarea id="competencies"></textarea>

        <h4>Evidence:</h4>
        <label>Job Profile:</label>
        <textarea id="evidence-job-profile"></textarea>

        <label>Advertising Channels:</label>
        <textarea id="advertising-channels"></textarea>

        <label>Response Numbers:</label>
        <textarea id="response-numbers"></textarea>

        <label>Short-list Demographics:</label>
        <textarea id="shortlist-demographics"></textarea>

        <label>Reasons for Not Selecting Highest Priority Candidate:</label>
        <textarea id="reasons-not-selected"></textarea>

        <h4>Sign-Off:</h4>
        <label>Recruiting Line Manager:</label>
        <input type="text" id="recruiting-manager">

        <label>Senior Manager Responsible for EE:</label>
        <input type="text" id="senior-manager">

        <label>CEO or Designated Appointee:</label>
        <input type="text" id="ceo">

        <h4>Upload and Safekeeping:</h4>
        <label>Upload Evidence:</label>
        <input type="file" id="evidence-upload">

        <button type="submit">Submit</button>
    </form>

    <footer>
        <p>© 2025 Your Company Name. All rights reserved.</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>
